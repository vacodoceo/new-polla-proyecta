import thirdPlaceImage from '../assets/images/thirdPlace.png';
import secondPlaceImage from '../assets/images/secondPlace.png';
import firstPlaceImage from '../assets/images/firstPlace.png';

const prizesData = [
  {
    min: 0,
    max: 350000,
    details: [
      {
        amount: 15000,
        extra: ''
      },
      {
        amount: 30000,
        extra: ''
      },
      {
        amount: 5000,
        extra: ''
      }
    ]
  },
  {
    min: 350000,
    max: 600000,
    details: [
      {
        amount: 20000,
        extra: '+ premio sorpresa'
      },
      {
        amount: 40000,
        extra: '+ 2% del pozo total'
      },
      {
        amount: 10000,
        extra: ''
      }
    ]
  },
  {
    min: 600000,
    max: 850000,
    details: [
      {
        amount: 20000,
        extra: '+ 1% del pozo total'
      },
      {
        amount: 40000,
        extra: '+ 4% del pozo total'
      },
      {
        amount: 10000,
        extra: '+ premio sorpresa'
      }
    ]
  },
  {
    min: 850000,
    max: 1200000,
    details: [
      {
        amount: 30000,
        extra: '+ 2% del pozo total'
      },
      {
        amount: 45000,
        extra: '+ 5% del pozo total'
      },
      {
        amount: 15000,
        extra: '+ premio sorpresa'
      }
    ]
  },
  {
    min: 1200000,
    max: 999999999,
    details: [
      {
        amount: 30000,
        extra: '+ 3% del pozo total'
      },
      {
        amount: 50000,
        extra: '+ 6% del pozo total'
      },
      {
        amount: 20000,
        extra: '+ 1% del pozo total'
      }
    ]
  }
]

export const prizeCssData = (classes) => ([
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

export const getPrizes = (bounty, cssData) => {
  const prize = prizesData.find((prize) => (prize.min >= bounty && prize.max < bounty))

  const parsedPrizes = prize.details.map((index, prizeDetail) => {
    return {
      ...prizeDetail,
      ...cssData[index]
    }
  })

  return parsedPrizes
}
