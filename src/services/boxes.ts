import { FACTORS } from '../constants'

export type BoxStatistic = {key: typeof FACTORS[number], value: number}

export type BoxData = {
  id: number,
  statistics: BoxStatistic[]
}

const getRandomInitialValue = () => Math.floor(Math.random() * 100)

export default {
  getBoxesData: (): BoxData[] => {
    const localStorageBoxData = localStorage.getItem('boxesData')

    if (localStorageBoxData) {
      return JSON.parse(localStorageBoxData)
    } else {
      return Array(5).fill(null).map((_, index) => ({
        id: index + 1,
        statistics: [
          {key: 'WO', value: getRandomInitialValue()},
          {key: 'FC', value: getRandomInitialValue()},
          {key: 'DR', value: getRandomInitialValue()},
          {key: 'MA', value: getRandomInitialValue()}
        ]  
      }))
    }
  },
  saveBoxesData: (boxesData: BoxData[]) => {
    localStorage.setItem('boxesData', JSON.stringify(boxesData))
  }
}