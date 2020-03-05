const assert = require('assert')
const parse = require('../parse')

describe('Parse', function() {
  describe('formatData', function(){
    it('should format data', function() {
      let result = parse.formatData([{
        summary: 'Test',
        start: new Date('2019-09-29T08:30:00'),
        end: new Date('2019-09-29T09:30:00')
      }, {
        summary: 'Test 2',
        start: new Date('2019-09-29T10:00:00'),
        end: new Date('2019-09-29T11:00:00')
      }], new Date('2019-09-29T15:55:55'))
      assert.equal([], result)
    })
  })
})