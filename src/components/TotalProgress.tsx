import { useEffect, useState, useRef } from 'react'
import './TotalProgress.scss'

type ProgressSegment = {
  opacity: number,
  progress: number
}

type TotalProgressProps = {
  progress: number
}

export default function TotalProgress(props: TotalProgressProps) {
  const [segments, setSegments] = useState<ProgressSegment[]>([])
  const [segmentWidth, setSegmentWidth] = useState(0)
  const mainElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    createSegments()
    window.addEventListener('resize', createSegments)
    return () => window.removeEventListener('resize', createSegments)
  }, [props.progress])

  const createSegments = () => {
    if (!mainElement.current) return
    const mainElementRect = mainElement.current.getBoundingClientRect()
    const segmentCount = Math.ceil(mainElementRect.width / 22)
    setSegmentWidth(mainElementRect.width / segmentCount)

    setSegments(Array.from({ length: segmentCount }).map((_, index) => ({
      opacity: (index + 1) / segmentCount,
      progress: ((index + 1) / segmentCount) * 100
    })))
  }

  return (
    <div
      ref={mainElement}
      className="total-progress"
    >
      {segments.map((segment, index) => (
        <div
          className="total-progress__segment"
          key={index}
          style={{
            width: `${segmentWidth}px`,
            opacity: segment.opacity,
            visibility: segment.progress > props.progress ? 'hidden' : 'visible'
          }}
        />
      ))}
      <span className="total-progress__progress">{`${props.progress}% Completed`}</span>
    </div>
  )
}