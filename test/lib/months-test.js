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
  }
}
