export const PRIZES = [
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

export const PRIZES_INTERVALS = [
  [
    {
      min: '1.2 M',
      max: 'inf',
      amount: '30 K',
      extra: '+ 3% del pozo total'
    },
    {
      min: '850 K',
      max: '1.2 M',
      amount: '30 K',
      extra: '+ 2% del pozo total'
    },
    {
      min: '600 K',
      max: '850 K',
      amount: '20 K',
      extra: '+ 1% del pozo total'
    },
    {
      min: '350 K',
      max: '600 K',
      amount: '20 K',
      extra: '+ premio sorpresa'
    },
    {
      min: 0,
      max: '350 K',
      amount: '15 K',
      extra: ''
    }
  ],
  [
    {
      min: '1.2 M',
      max: 'inf',
      amount: '50 K',
      extra: '+ 6% del pozo total'
    },
    {
      min: '850 K',
      max: '1.2 M',
      amount: '45 K',
      extra: '+ 5% del pozo total'
    },
    {
      min: '600 K',
      max: '850 K',
      amount: '40 K',
      extra: '+ 4% del pozo total'
    },
    {
      min: '350 K',
      max: '600 K',
      amount: '40 K',
      extra: '+ 2% del pozo total'
    },
    {
      min: 0,
      max: '350 K',
      amount: '30 K',
      extra: ''
    }
  ],
  [
    {
      min: '1.2 M',
      max: 'inf',
      amount: '20 K',
      extra: '+ 1% del pozo total'
    },
    {
      min: '850 K',
      max: '1.2 M',
      amount: '15 K',
      extra: '+ premio sorpresa'
    },
    {
      min: '600 K',
      max: '850 K',
      amount: '10 K',
      extra: '+ premio sorpresa'
    },
    {
      min: '350 K',
      max: '600 K',
      amount: '10 K',
      extra: ''
    },
    {
      min: 0,
      max: '350 K',
      amount: '5 K',
      extra: ''
    },
  ]
]
