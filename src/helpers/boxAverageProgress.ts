import type { BoxData } from '../services';
import { TOTAL_TO_COMPLETE } from '../constants';


export default function boxAverageProgress(box: BoxData): number {
  const total = box.statistics.reduce((total, factor) => (total + factor.value / TOTAL_TO_COMPLETE), 0)
  const average = total / box.statistics.length
  return average > 1 ? 100 : Math.round(average * 100)
}