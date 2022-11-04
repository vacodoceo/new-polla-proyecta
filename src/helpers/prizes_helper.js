import { PRIZES } from '../constants/prizes';
import thirdPlaceImage from '../assets/images/thirdPlace.png';
import secondPlaceImage from '../assets/images/secondPlace.png';
import firstPlaceImage from '../assets/images/firstPlace.png';

const prizeCssData = (classes) => ([
  {
    title: 'Segundo lugar',
    className: classes.prizeImage,
    image: secondPlaceImage
  },
  {
    title: 'Primer lugar',
    className: classes.biggerPrizeImage,
    image: firstPlaceImage
  },
  {
    title: 'Tercer lugar',
    className: classes.prizeImage,
    image: thirdPlaceImage
  },
])

export const getPrizes = (bounty, classes) => {
  const cssData = prizeCssData(classes)
  const prize = PRIZES.find((prize) => (prize.min <= bounty && prize.max > bounty))

  const parsedPrize = prize.details.map((prizeDetail, index) => {
    return {
      ...prizeDetail,
      ...cssData[index]
    }
  })

  return parsedPrize
}
