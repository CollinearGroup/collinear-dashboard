import React, { Component } from "react"
import "./ConfRoomSchedule.css"

let CONF_RM_URL = process.env.REACT_APP_CONF_RM_URL || "https://dashboard.collineargroup.com/calendar/schedule"

//Sample schedule data
// let scheduleData = {
//   'Giant Room': [
//     null,
//     null,
//     '9',
//     '9',
//     '10',
//     '10',
//     null,
//     'b',
//     null,
//     null,
//     '1',
//     '1:30',
//     null,
//     '2:30',
//     '3',
//     '3:30',
//     null,
//   ],
//   'East Room': [
//     1, 0,
//     0, 0,
//     0, 0,
//     0, 0,
//     0, 0,
//     0, 0,
//     0, 0,
//     0, 0,
//     0, 0,
//     0, 1,
//   ],
//   'West Room': [
//     '7',
//     '.',
//     '8',
//     '.',
//     '9',
//     '.',
//     '10',
//     '.',
//     '11',
//     '.',
//     '12',
//     '.',
//     '1',
//     '.',
//     '2',
//     '.',
//     '3',
//     '.',
//     '4',
//     '.',
//     '5',
//     '.',
//   ],
//   'War Room': [
//     null,
//     null,
//     '9',
//     '9',
//     null,
//     '10',
//     null,
//     'b',
//     null,
//     null,
//     '1',
//     '1:30',
//     null,
//     '2:30',
//     '3',
//     null,
//     null,
//   ],
// }

let hoursArray = [
  " 7 AM",
  " 8 AM",
  " 9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  " 1 PM",
  " 2 PM",
  " 3 PM",
  " 4 PM",
  " 5 PM",
]

let busyColors = [
  "red-busy",
  "green-busy",
  "yellow-busy",
  "blue-busy"
]

let busyColorCount = 0

class ConfRoomSchedule extends Component {
  constructor() {
    super()
    this.state = {
      scheduleData: {}
    }
  }

  async updateSchedule() {
    let scheduleData = await (await fetch(CONF_RM_URL)).json()
    console.log("Updating data: ", scheduleData)
    this.setState({ scheduleData })
  }

  async componentDidMount() {
    this.updateSchedule()
    setInterval(() => {
      this.updateSchedule()
    }, 15 * 60 * 1000)
  }

  askForAuth = () => {
    return (
      <div>
        <p>Enter Authentication</p>
        <form>
          <input type="text" onChange={this.updateAuth} />
          <button onClick={this.authenticate}>Log In</button>
        </form>
      </div>
    )
  }

  hourFromPos = pos => {
    return [
      '7 AM',
      '7:30 AM',
      '8 AM',
      '8:30 AM',
      '9 AM',
      '9:30 AM',
      '10 AM',
      '10:30 AM',
      '11 AM',
      '11:30 AM',
      '12 AM',
      '12:30 AM',
      '1 PM',
      '1:30 PM',
      '2 PM',
      '2:30 PM',
      '3 PM',
      '3:30 PM',
      '4 PM',
      '4:30 PM',
      '5 PM'
    ][pos]
  }

  buildMeetingDiv = data => {
    let divs = []
    for (let i = 0; i < 20; i++) {
      let busyName = data[i] && data[i] !== data[i - 1] ? data[i] : ''

      let busyRect
      if (data[i]) {
        busyRect = (
          <div className={"busy-rect " + (busyColors[busyColorCount])}>
            <div className="label-div">{busyName ? this.hourFromPos(i) : ''}</div>
            <div className="label-div name-div">{busyName}</div>
          </div>
          )
      } 
      divs.push(<th className="conf-room-meeting-free border-col">{busyRect}</th>)
    }
    busyColorCount++
    if (busyColorCount === busyColors.length) {
      busyColorCount = 0
    }
    return divs
  }

  buildRoomRow = (name, roomData = [], busyColorCount) => {
    return (
      <tr>
        <th className="name-col">
          <span className="conf-schedule-name">{name}</span>
        </th>
        {this.buildMeetingDiv(roomData)}
      </tr>
    )
  }

  showCalendar = () => {
    let rooms = Object.keys(this.state.scheduleData).map(roomName =>
      this.buildRoomRow(roomName, this.state.scheduleData[roomName])
    )
    return (
      <table className="calendar-content">
        <tr>
          <th></th> {/* The first column for the time row should be blank */}
          {hoursArray.map((hour, index) => (   
            <th colSpan="2" className={"conf-schedule-hour"}>
              <span className="conf-shedule-hour-span">{hour}</span>
            </th>
          ))}
        </tr>
        {rooms}
      </table>
    )
  }

  render() {
    return (
      <div>
        <div className="dashboard-content">{this.showCalendar()}</div>
      </div>
    )
  }
}

export default ConfRoomSchedule
