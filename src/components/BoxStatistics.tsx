import { Fragment } from 'react'
import type { BoxStatistic } from '../services'
import { TOTAL_TO_COMPLETE } from '../constants'
import './BoxStatistics.scss'

type BoxStatisticsProps = {
  id: number,
  statistics: BoxStatistic[]
}

export default function BoxStatistics(props: BoxStatisticsProps) {
  return (
    <div className="box-statistics">
      <div className="box-statistics__header">{`0${props.id}`}</div>
      <div className="box-statistics__factors">
        {props.statistics.map(statistic => (
          <Fragment key={statistic.key}>
            <div className={`box-statistics__factor-name box-statistics__factor-name--${statistic.key}`}>{statistic.key}</div>
            <div className={`box-statistics__factor-progress box-statistics__factor-progress--${statistic.key}`}>
              <span style={{width: `${(statistic.value / TOTAL_TO_COMPLETE) * 100}%`}}></span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}