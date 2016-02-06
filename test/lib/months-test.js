var assert = require('assert')
var subject = require('../../lib/months')

module.exports = {
  thisMonthIsThisMonth: function(){
    var now = new Date()

    var result = subject.thisMonth()

    assert.deepStrictEqual(result, {
      year: now.getFullYear(),
      month: now.getMonth() + 1
    })
  },
  lastMonthIsLastMonth: function(){
    var now = new Date(),
        lastMonth = new Date(now.setMonth(now.getMonth() - 1))

    var result = subject.lastMonth()

    assert.deepStrictEqual(result, {
      year: lastMonth.getFullYear(),
      month: lastMonth.getMonth() + 1
    })
  }

}
