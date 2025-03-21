import { useEffect, useState } from 'react';
import RefinementHeader from './RefinementHeader';
import RefinementNumbers, {SelectedNumber} from './RefinementNumbers';
import RefinementFooter from './RefinementFooter';
import { boxesService } from '../services';
import type { BoxData } from '../services';
import { boxAverageProgress, totalAverageProgress } from '../helpers';
import './RefinementScreen.scss';

type RefinementScreenProps = {
  onOpenHelp: () => void,
  onProjectCompleted: () => void
}

export default function RefinementScreen(props: RefinementScreenProps) {
  const [selectedBox, setSelectedBox] = useState<number>(-1)
  const [selectedNumbers, setSelectedNumbers] = useState<SelectedNumber[]>([])
  const [boxes, setBoxes] = useState(boxesService.getBoxesData())
  const [selectionBlocked, setSelectionBlocked] = useState(false)
  const [totalProgress, setTotalProgress] = useState(0)
  const [availableBoxes, setAvailableBoxes] = useState<number[]>([])

  useEffect(() => {
    setAvailableBoxes(boxes.filter(box => boxAverageProgress(box) < 100).map(box => box.id))
    const totalProgress = totalAverageProgress(boxes)
    setTotalProgress(totalProgress)

    if (totalProgress >= 100) {
      props.onProjectCompleted()
    }
  }, [boxes])

  const onUpdateBox = (boxData: BoxData) => {
    const newBoxes = boxes.map(box => {
      if (box.id === boxData.id) {
        return boxData
      } else {
        return box
      }
    })

    boxesService.saveBoxesData(newBoxes)
    setBoxes(newBoxes)
  }

  const onBoxSelect = (payload: {selectedBoxNumber: number, selectedNumbers: SelectedNumber[]}) => {
    setSelectedBox(payload.selectedBoxNumber)
    setSelectedNumbers(payload.selectedNumbers)
    setSelectionBlocked(true)
  }

  const onStatisticsShown = () => {
    setSelectedBox(-1)
    setSelectedNumbers([])
    setSelectionBlocked(false)
  }

  return (
    <div className="refinement-screen">
      <RefinementHeader
        totalProgress={totalProgress}
        onOpenHelp={props.onOpenHelp}
      />
      <RefinementNumbers
        availableBoxes={availableBoxes}
        onBoxSelect={onBoxSelect}
        selectionBlocked={selectionBlocked}
      />
      <RefinementFooter
        boxes={boxes}
        selectedBox={selectedBox}
        selectedNumbers={selectedNumbers}
        onUpdateBox={onUpdateBox}
        onStatisticsShown={onStatisticsShown}
      />
    </div>
  )
}