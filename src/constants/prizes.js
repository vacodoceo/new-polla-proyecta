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
      min: 0,
      max: '350k',
      amount: '15k',
      extra: ''
    },
    {
      min: '350k',
      max: '600k',
      amount: '20k',
      extra: '+ premio sorpresa'
    },
    {
      min: '600k',
      max: '850k',
      amount: '20k',
      extra: '+ 1% del pozo total'
    },
    {
      min: '850k',
      max: '1.2m',
      amount: '30k',
      extra: '+ 2% del pozo total'
    },
    {
      min: 1200000,
      max: 'inf',
      amount: '30k',
      extra: '+ 3% del pozo total'
    }
  ],
  [
    {
      min: 0,
      max: '350k',
      amount: '30k',
      extra: ''
    },
    {
      min: '350k',
      max: '600k',
      amount: '40k',
      extra: '+ 2% del pozo total'
    },
    {
      min: '600k',
      max: '850k',
      amount: '40k',
      extra: '+ 4% del pozo total'
    },
    {
      min: '850k',
      max: '1.2m',
      amount: '45k',
      extra: '+ 5% del pozo total'
    },
    {
      min: '1.2m',
      max: 'inf',
      amount: '50k',
      extra: '+ 6% del pozo total'
    }
  ],
  [
    {
      min: 0,
      max: '350k',
      amount: '5k',
      extra: ''
    },
    {
      min: '350k',
      max: '600k',
      amount: '10k',
      extra: ''
    },
    {
      min: '600k',
      max: '850k',
      amount: '10k',
      extra: '+ premio sorpresa'
    },
    {
      min: '850k',
      max: '1.2m',
      amount: '15k',
      extra: '+ premio sorpresa'
    },
    {
      min: '1.2m',
      max: 'inf',
      amount: '20k',
      extra: '+ 1% del pozo total'
    }
  ]
]

