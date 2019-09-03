export default {
  schema: {
    types: [
      {
        kind: 'UNION',
        name: 'Incentive',
        possibleTypes: [
          {
            name: 'FreeMonths',
          },
          {
            name: 'MonthlyCostDeduction',
          },
        ],
      },
    ],
  },
}
