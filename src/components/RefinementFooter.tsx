import { useEffect, useState } from 'react';
import Box from './Box'
import BoxProgress from './BoxProgress';
import type {SelectedNumber} from './RefinementNumbers';
import type { BoxData } from '../services';
import { boxAverageProgress } from '../helpers';
import './RefinementFooter.scss'

type RefinementFooterProps = {
  boxes: BoxData[]
  selectedBox: number,
  selectedNumbers: SelectedNumber[]
  onUpdateBox: (boxData: BoxData) => void,
  onStatisticsShown: () => void
}

type SelectedNumberWithOffsetPath = SelectedNumber & {offsetPath: string}

export default function RefinementFooter(props: RefinementFooterProps) {
  const [selectedNumbersWithOffsetPath, setSelectedNumbersWithOffsetPath] = useState<SelectedNumberWithOffsetPath[]>([])
  const [showBoxStatistics, setShowBoxStatistics] = useState(false)

  useEffect(() => {
    if (props.selectedBox > -1) {
      const selectedBoxElement = document.querySelector(`.box[data-box-number="${props.selectedBox}"]`)

      if (!selectedBoxElement) {
        throw new Error('Selected box element not found')
      }

      const refinementNumbersElement = document.querySelector('.refinement-numbers')

      if (!refinementNumbersElement) {
        throw new Error('Refinement numbers element not found')
      }

      const boxRect = selectedBoxElement.getBoundingClientRect()
      const refinementNumbersRect = refinementNumbersElement.getBoundingClientRect()
      const boxCenter = [boxRect.left + boxRect.width / 2, boxRect.top + boxRect.height / 2]

      setSelectedNumbersWithOffsetPath(props.selectedNumbers.map(selectedNumber => {
        const endPosition = [boxCenter[0] - selectedNumber.size[0] / 2, boxCenter[1] - selectedNumber.size[1] / 2]
        const quadPos = [endPosition[0], endPosition[1] - refinementNumbersRect.height / 3]
        const offsetPath = `path('M ${selectedNumber.position[0]} ${selectedNumber.position[1]} Q ${quadPos[0]} ${quadPos[1]} ${endPosition[0]} ${endPosition[1]}')`
        return {...selectedNumber, offsetPath}
      }))
 
      const removeNumbersTimeout = setTimeout(() => {
        setSelectedNumbersWithOffsetPath([])
        const newBoxData = structuredClone(props.boxes.find(box => box.id === props.selectedBox))

        if (!newBoxData) {
          throw new Error('Selected box data not found')
        }

        for (const selectedNumber of props.selectedNumbers) {
          const factor = newBoxData!.statistics.find(statistic => statistic.key === selectedNumber.factor)
          factor!.value = factor!.value + selectedNumber.number
        }

        props.onUpdateBox(newBoxData)
      }, 1000)

      return () => {
        clearTimeout(removeNumbersTimeout)
      }
    }
  }, [props.selectedNumbers])

  useEffect(() => {
    setShowBoxStatistics(true)

    const showStatisticsTimeout = setTimeout(() => {
      setShowBoxStatistics(false)
      props.onStatisticsShown()
    }, 2000)

    return () => {
      clearTimeout(showStatisticsTimeout)
    }
  }, [props.boxes])

  return (
    <footer className="refinement-footer">
      {selectedNumbersWithOffsetPath.map(selectedNumber => (
        <div
          key={selectedNumber.id}
          className="refinement-footer__selected-number"
          style={{
            left: selectedNumber.size[0] / 2,
            top: selectedNumber.size[1] / 2,
            width: selectedNumber.size[0],
            height: selectedNumber.size[1],
            transform: `scale(${selectedNumber.scale})`,
            offsetPath: selectedNumber.offsetPath
          }}
        >
          <span>{selectedNumber.number}</span>
        </div>
      ))}
      <div className="refinement-footer__boxes">
        {props.boxes.map(box => (
          <div
            className="refinement-footer__box"
            key={box.id}
          >
            <Box
              number={box.id}
              selected={props.selectedBox === box.id}
              showStatistics={props.selectedBox === box.id && showBoxStatistics}
              statistics={box.statistics}
            />
            <BoxProgress progress={boxAverageProgress(box)} />
          </div>
        ))}
      </div>
      <div className="refinement-footer__range">
        0x089D135 : 0x140EC59
      </div>
    </footer>
  )
}