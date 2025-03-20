import './BoxProgress.scss'

type BoxProgressProps = {
  progress: number
}

export default function BoxProgress({progress}: BoxProgressProps) {
  return (
    <div className="box-progress">
      {progress}%
      <div
        className="box-progress__bar"
        style={{
          clipPath: `inset(0 ${100 - progress}% 0 0)`
        }}
      >
        {progress}%
      </div>
    </div>
  )
}