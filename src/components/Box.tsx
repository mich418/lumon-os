import './Box.scss'
import type { BoxStatistic } from '../services'
import BoxStatistics from './BoxStatistics'

type BoxProps = {
  number: number,
  selected: boolean,
  showStatistics: boolean,
  statistics: BoxStatistic[]
}

export default function Box(props: BoxProps) {
  return (
    <div
      className={`box${props.selected ? ' box--open' : ''}`}
      data-box-number={props.number}
    >
      <div className="box__flap box__flap--left"></div>
      <div className="box__flap box__flap--right"></div>
      <div className="box__back"></div>
      <div className="box__front">
        {`0${props.number}`}
      </div>
      <div className={`box__statistics${props.showStatistics ? ' box__statistics--show' : ''}`}>
        <div>
          <BoxStatistics
            id={props.number}
            statistics={props.statistics}
          />
        </div>
      </div>
    </div>
  )
}