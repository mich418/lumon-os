import { useState, useEffect, useRef } from 'react'
import { generateRandomId } from '../helpers'
import { FACTORS, NUMBER_TILE_SIZE } from '../constants'
import './RefinementNumbers.scss'

export type Number = {
  id: string
  number: number
  fadeInDelay: number
  animationClass: string
  noFadeIn: boolean
  factor: typeof FACTORS[number]
}

export type NumbersRow = {
  id: string
  numbers: (Number)[]
}

export type SelectedNumber = {
  id: string,
  number: number,
  position: [number, number],
  size: [number, number],
  scale: number,
  factor: typeof FACTORS[number]
}

type RefinementNumbersProps = {
  onBoxSelect: (payload: {selectedBoxNumber: number, selectedNumbers: SelectedNumber[]}) => void,
  selectionBlocked: boolean,
  availableBoxes: number[]
}

const createNumber = (noFadeIn: boolean = false): Number => {
  return {
    id: generateRandomId(),
    number: Math.floor(Math.random() * 10),
    fadeInDelay: Math.random() * 2,
    animationClass: `refinement-numbers__number--animation-${Math.floor(Math.random() * 5) + 1}`,
    noFadeIn: noFadeIn,
    factor: FACTORS[Math.floor(Math.random() * FACTORS.length)]
  }
}

const createRow = (length: number, noFadeIn: boolean = false): NumbersRow => {
  return {
    id: generateRandomId(),
    numbers: Array.from({ length }, () => createNumber(noFadeIn))
  }
}

export default function RefinementNumbers(props: RefinementNumbersProps) {
  const [numbers, setNumbers] = useState<NumbersRow[]>([])
  const [tileWidth, setTileWidth] = useState(0)
  const [tileHeight, setTileHeight] = useState(0)
  const [ready, setReady] = useState(false)
  const [hovered, setHovered] = useState<Number | null>(null)
  const [around, setAround] = useState<Number[]>([])
  const [mouseDown, setMouseDown] = useState(false)
  const [selected, setSelected] = useState<Number[]>([])
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState<[number, number]>([0, 0])
  const container = useRef<HTMLDivElement | null>(null)
  

  useEffect(() => {
    createNewNumbers()
    setReady(true)

    window.addEventListener('keydown', handleClearKey)

    return () => {
      window.removeEventListener('keydown', handleClearKey)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleMoveKey)

    return () => {
      window.removeEventListener('keydown', handleMoveKey)
    }
  }, [offset])

  useEffect(() => {
    window.addEventListener('keydown', handleBoxKey)

    return () => {
      window.removeEventListener('keydown', handleBoxKey)
    }
  }, [selected, props.selectionBlocked])

  const createNewNumbers = () => {
    if (!container.current) return

    const tilesInRow = Math.round(container.current!.clientWidth / NUMBER_TILE_SIZE)
    const tilesInColumn = Math.round(container.current!.clientHeight / NUMBER_TILE_SIZE)
    setTileWidth(container.current!.clientWidth / tilesInRow)
    setTileHeight(container.current!.clientHeight / tilesInColumn)
    setOffset([
      -(container.current!.clientWidth / tilesInRow),
      -(container.current!.clientHeight / tilesInColumn)
    ])

    const newNumbers: NumbersRow[] = Array.from({ length: tilesInColumn + 2 }, () => {
      return createRow(tilesInRow + 2)
    })

    setNumbers(newNumbers)
  }

  const handleClearKey = (event: KeyboardEvent) => {
    if (props.selectionBlocked) return

    if (event.key === 'Escape') {
      setSelected([])
    }
  }

  const handleBoxKey = (event: KeyboardEvent) => {
    if (props.selectionBlocked || !selected.length) return

    if (props.availableBoxes.includes(parseInt(event.key))) {
      props.onBoxSelect({selectedBoxNumber: Number(event.key), selectedNumbers: getSelectedNumbers()})

      setTimeout(replaceSelectedNumbers, 500)
    }
  }

  const handleMoveKey = (event: KeyboardEvent) => {
    if (props.selectionBlocked) return

    if (event.key === 'ArrowUp') {
      moveNumbers([0, tileHeight / 2])
    } else if (event.key === 'ArrowDown') {
      moveNumbers([0, -(tileHeight / 2)])
    } else if (event.key === 'ArrowLeft') {
      moveNumbers([tileWidth / 2, 0])
    } else if (event.key === 'ArrowRight') {
      moveNumbers([-(tileWidth / 2), 0])
    }
  }

  const moveNumbers = (move: [number, number]) => {
    let nextXOffset = offset[0] + move[0]
    let nextYOffset = offset[1] + move[1]


    if (nextXOffset >= tileWidth) {
      nextXOffset = nextXOffset - tileWidth
      appendNumbersColumn('left')
    } else if (nextXOffset < -tileWidth) {
      nextXOffset = nextXOffset + tileWidth
      appendNumbersColumn('right')
    }

    if (nextYOffset >= tileHeight) {
      nextYOffset = nextYOffset - tileHeight
      appendNumbersRow('top')
    } else if (nextYOffset < -tileHeight) { 
      nextYOffset = nextYOffset + tileHeight
      appendNumbersRow('bottom')
    }

    setOffset([nextXOffset, nextYOffset])
  }

  const getSelectedNumbers = (): SelectedNumber[] => {
    return selected.map((selectedNumber) => {
      const [rowIndex, columnIndex] = getNumberRowColumnPosition(selectedNumber)
      const selectedNumberElement = document.querySelector(`.refinement-numbers__number[data-number-position="${rowIndex}-${columnIndex}"]`)

      if (!selectedNumberElement) {
        throw new Error('Selected number element not found')
      }

      const numberSpanElement = selectedNumberElement.querySelector('span')

      if (!numberSpanElement) {
        throw new Error('Selected number has no number')
      }

      const elementRect = selectedNumberElement.getBoundingClientRect()
      const originalNumber = selectedNumber.number
      selectedNumber.number = -1

      return {
        id: selectedNumber.id,
        number: originalNumber,
        position: [elementRect.left, elementRect.top],
        size: [elementRect.width, elementRect.height],
        scale: zoom,
        factor: selectedNumber.factor
      }
    })
  }

  const replaceSelectedNumbers = () => {
    setNumbers(numbers.map(row => {
      return {
        ...row,
        numbers: row.numbers.map(number => {
          if (number.number === -1) {
            return createNumber()
          } else {
            return number
          }
        })
      }
    }))

    setSelected([])
  }

  const appendNumbersColumn = (side: 'left' | 'right') => {
    setNumbers((numbers) => {
      const newNumbers = numbers.map(row => {
        if (side === 'left') {
          return { ...row, numbers: [createNumber(true), ...row.numbers.slice(0, -1)] }
        } else {
          return { ...row, numbers: [...row.numbers.slice(1), createNumber(true)] }
        }
      })

      return newNumbers
    })
  }

  const appendNumbersRow = (side: 'top' | 'bottom') => {
    const length = numbers[0].numbers.length
    if (side === 'top') {
      setNumbers((numbers) => [createRow(length, true), ...numbers.slice(0, -1)])
    } else {
      setNumbers((numbers) => [...numbers.slice(1), createRow(length, true)])
    }
  }

  const onMouseEnter = (number: Number) => {
    if (mouseDown) {
      if (props.selectionBlocked) return
      if (!selected.includes(number)) {
        setSelected([...selected, number])
      }
    } else {
      const [rowIndex, columnIndex] = getNumberRowColumnPosition(number)

      setHovered(number)
      setAround([
        numbers[rowIndex - 1]?.numbers[columnIndex - 1],
        numbers[rowIndex - 1]?.numbers[columnIndex],
        numbers[rowIndex - 1]?.numbers[columnIndex + 1],
        numbers[rowIndex]?.numbers[columnIndex - 1],
        numbers[rowIndex]?.numbers[columnIndex + 1],
        numbers[rowIndex + 1]?.numbers[columnIndex - 1],
        numbers[rowIndex + 1]?.numbers[columnIndex],
        numbers[rowIndex + 1]?.numbers[columnIndex + 1]
      ])
    }
  }

  const onMouseDown = (number: Number) => {
    if (props.selectionBlocked) return
    setMouseDown(true)
    setSelected([number])
  }

  const onMouseWheel = (event: React.WheelEvent) => {
    if (props.selectionBlocked) return
    const { deltaY } = event

    if (deltaY < 0) {
      setZoom(zoom < 3 ? zoom + 0.1 : 3)
    } else {
      setZoom(zoom > 1 ? zoom - 0.1 : 1)
    }
  }
  
  const getAdditionalClasses = (number: Number) => {
    let classes = ''

    if (hovered == number) {
      classes += ' refinement-numbers__number--hovered'
    }

    if (around.some((aroundNumber) => aroundNumber === number)) {
      classes += ' refinement-numbers__number--around'
    }

    if (selected.some((selectedNumber) => selectedNumber === number)) {
      classes += ' refinement-numbers__number--selected'
    }

    if (number.noFadeIn) {
      classes += ' refinement-numbers__number--no-fade-in'
    }

    return classes ? ` ${classes}` : ''
  }

  const getNumberRowColumnPosition = (number: Number): [number, number] => {
    let rowIndex = -1
    let columnIndex = -1

    numbers.forEach((row, i) => {
      const foundIndex = row.numbers.findIndex(n => n.id === number.id)

      if (foundIndex !== -1) {
        rowIndex = i
        columnIndex = foundIndex
      }
    })

    return [rowIndex, columnIndex]
  }

  return (
    <main
      className={`refinement-numbers${ready ? ' refinement-numbers--ready' : ''}`}
      ref={container}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      onWheel={onMouseWheel}
      style={{transform: `scale(${zoom})`}}
    >
      <div className="refinement-numbers__inner">
        {numbers.map((row, rowIndex) => (
          <div
            className="refinement-numbers__row" key={row.id}
            style={{
              transform: `translate(${offset[0]}px, ${offset[1]}px)`
            }}
          >
            {row.numbers.map((number, columnIndex) => (
              <div
                key={number.id}
                data-number-position={`${rowIndex}-${columnIndex}`}
                className={`refinement-numbers__number ${number.animationClass}${getAdditionalClasses(number)}`}
                onMouseEnter={() => onMouseEnter(number)}
                onMouseDown={() => onMouseDown(number)}
                style={{
                  width: `${tileWidth}px`,
                  height: `${tileHeight}px`,
                  animationDelay: `${number.fadeInDelay}s`
                }}
              >
                {number.number > -1 && <span>{number.number}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}