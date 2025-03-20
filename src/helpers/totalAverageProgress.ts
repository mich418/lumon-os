import type { BoxData } from '../services';
import boxAverageProgress from "./boxAverageProgress";

export default function totalAverageProgress(boxes: BoxData[]) {
  const total = boxes.reduce((total, box) => (total + boxAverageProgress(box)), 0)
  return total / boxes.length
}