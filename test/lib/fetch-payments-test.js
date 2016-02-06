var assert = require('assert')

module.exports = function() {
  var months = td.replace('../../lib/months'),
      paymentApi = td.replace('../../lib/wrapper/payment-api'),
      subject = require('../../lib/fetch-payments'),
      userId = 6

  td.when(months.thisMonth()).thenReturn({year: 1973, month: 8})
  td.when(months.lastMonth()).thenReturn({year: 1973, month: 7})
  td.when(paymentApi(userId, 1973, 8)).thenReturn('this month payments')
  td.when(paymentApi(userId, 1973, 7)).thenReturn('last month payments')

  var result = subject(userId)

  assert.deepStrictEqual(result, {
    thisMonth: 'this month payments',
    lastMonth: 'last month payments'
  })
}
