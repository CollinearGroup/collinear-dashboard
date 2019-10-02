import React, { Component } from 'react';
import './ConfRoomSchedule.css'

let CONF_RM_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_CONF_RM_URL
    : 'http://localhost:8010/schedule'

//Sample schedule data
 /*{
        'Giant Room': [
          null,
          null,
          '9',
          '9',
          '10',
          '10',
          null,
          'b',
          null,
          null,
          '1',
          '1:30',
          null,
          '2:30',
          '3',
          '3:30',
          null,
        ],
        'East Room': [
          1, 0, 
          0, 0, 
          0, 0, 
          0, 0, 
          0, 0, 
          0, 0, 
          0, 0, 
          0, 0, 
          0, 0, 
          0, 1, 
        ],
        'West Room': [
          '8',
          '.',
          '9',
          '.',
          '10',
          '.',
          '11',
          '.',
          '12',
          '.',
          '1',
          '.',
          '2',
          '.',
          '3',
          '.',
          '4',
          '.',
          '5',
          '.',
        ] 
      }*/
 

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
    this.setState({scheduleData})
  }

  async componentDidMount() {
    this.updateSchedule()
    setInterval(() => {
      this.updateSchedule()
    }, 15 * 60 * 1000)
  }

  askForAuth = () => {
    return <div>
      <p>Enter Authentication</p>
      <form>
        <input type="text" onChange={this.updateAuth}/>
        <button onClick={this.authenticate}>Log In</button>
      </form>
    </div>
  }

  buildMeetingDiv = (data) => {
    let divs = []
    for(let i=0; i<20; i++) {
      if(data[i]) {
        divs.push(
          <div className="conf-room-meeting-busy">&nbsp;</div>
        )
      } else {
        divs.push(
          <div className="conf-room-meeting-free">&nbsp;</div>
        )
      }
    }
    return divs
  }

  buildRoomColumn = (name, roomData = []) => {
    return <div className="conf-schedule-col">
      <div className="conf-schedule-name">{name}</div>
      <div className="conf-schedule-meetings">
        {this.buildMeetingDiv(roomData)}
      </div>
    </div>
  }

  showCalendar = () => {
    let hoursArray = [' 8 AM', ' 9 AM', '10 AM', '11 AM', '12 PM', ' 1 PM', ' 2 PM', ' 3 PM', ' 4 PM', ' 5 PM']
    let rooms = Object.keys(this.state.scheduleData).map (roomName => 
      this.buildRoomColumn(roomName, this.state.scheduleData[roomName])
    )
    return <div className="conf-schedule-content">
      <div className='conf-schedule-hours'>
        {hoursArray.map(n => <div>{n}</div>)}
      </div>

      <div className="conf-schedule-names"> 
        {rooms}
      </div>
    </div>
  }

  render() {
    return (
      <div>
        <div className="dashboard-title">Conference Room Schedule</div>
        <div className="dashboard-content">
          {this.showCalendar()}
        </div>
      </div>
    );
  }
}

export default ConfRoomSchedule;