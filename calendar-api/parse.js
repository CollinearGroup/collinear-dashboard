const request = require('request')
const ical = require('node-ical')

const calendars = require('./calendar_config.json')

let parseIcs = icsStr => {
  return new Promise((resolve, reject) => {
    ical.parseICS(icsStr, (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

let getEvents = icsData => {
  let events = []
  for(let k in icsData) {
    if(icsData.hasOwnProperty(k)) {
      if(icsData[k].type === 'VEVENT') {
        let ev = icsData[k]
        // console.log(`${ev.summary}`)
        events.push({
          summary: ev.summary,
          rrule: ev.rrule ? ev.rrule.options : null,
          start: new Date(ev.start),
          end: new Date(ev.end)
        })
      }
    }
  }
  return events
}

let getData = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res) => {
      if(err) {
        reject(err)
      } else {
        resolve(res.body)
      }
    })
  })
}

const expadSeries = (data = [], date) => {
  let ret = [...data]
  data.forEach( ev => {
    if(ev.rrule) {
      if (ev.rrule.dtstart <= date && ev.rrule.until >= date) {
        // console.log("SHOULD ADD?", date.getDay())
        if(ev.rrule.byweekday && ev.rrule.byweekday.includes(date.getDay() - 1)){
          let newStart = ev.start
          newStart.setFullYear(date.getFullYear())
          newStart.setMonth(date.getMonth())
          newStart.setDate(date.getDate())
          let newEnd = ev.end
          newEnd.setFullYear(date.getFullYear())
          newEnd.setMonth(date.getMonth())
          newEnd.setDate(date.getDate())
          ret.push({
            start: newStart,
            end: newEnd,
            summary: ev.summary
          })
        }
      }
      // console.log("EV: ", ev)
    }
  })
  return ret
}

const formatData = (rawData, date = Date.now()) => {
  let refDate = new Date(date)
  refDate.setHours(8)
  refDate.setMinutes(0)
  refDate.setSeconds(0)
  refDate.setMilliseconds(0)

  // console.log("Ref Date ", refDate.toLocaleString())

  let refMs = refDate.getTime()

  let data = expadSeries(rawData, date)

  const thirtyMin = 30*60*1000;

  let blocks = []
  for(i=0; i<20; i++) {
    let bStart = refMs + (i*thirtyMin)
    let bEnd = refMs + ((i+1)*thirtyMin)
    let message = null
    data.forEach(tb => {
      if (tb.start <= bStart && tb.end >= bEnd) {
        message = tb.summary
      }
    })
    blocks.push(message)
  }
  return blocks
}

let getFormattedDataForRoom = async () => {
  let returnData = {}
  let refDate =  new Date() //new Date('2019-10-03T00:00:00Z')
  // refDate =  new Date('2019-10-09T00:00:00Z')
  // console.log("REF DATE: ", refDate)
  let rooms = Object.keys(calendars)
  for(let roomName of rooms) {
    let data = await getData(calendars[roomName])
    let calData = await parseIcs(data)
    // console.log(`${roomName}: `, calData)
    let myData = getEvents(calData)
    // console.log(`${roomName}: `, myData)
    let formattedData = formatData(myData, refDate)
    returnData[roomName] = formattedData
  }
  // console.log("Return Data: ", returnData)
  return returnData
}

// doStuff()

module.exports = {
  formatData,
  getFormattedDataForRoom
}
