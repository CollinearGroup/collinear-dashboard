import React, { Component } from 'react';
import './ConfRoomSchedule.css'

const http = require('http')

class ConfRoomSchedule extends Component {
  constructor() {
    super()
    this.state = {
      credentials: null,
      authenticated: false,
      scheduleData: {} /*{
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
        'War Room': [],
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
    }
  }

  async componentDidMount() {
    let scheduleData = await(await fetch('http://localhost:8010/schedule')).json()
    console.log("DATA: ", scheduleData)
    // let scheduleData = {...this.state.scheduleData}
    // scheduleData['War Room'] = data
    this.setState({scheduleData})
  }

  updateAuth = e => {
    this.setState({credentials: e.target.value})
  }

  getContent = () => {
    return new Promise((resolve, reject) => {
      http.get(this.state.credentials, (res, err) => {
        if(err) {
          console.log("HTTP GET ERROR: ", err)
        }
        console.log("RES: ", res.statusCode)
      })
    })
  }

  authenticate = async (e) => {
    e.preventDefault()
    console.log("Getting CONTENT")
    let x = await this.getContent()
    console.log("X: ", x)
    // let resp = await fetch(this.state.credentials, {method: 'GET', mode: 'no-cors'})
    // console.log("RESPONSE: ", resp)
    // let content = await resp.text()
    // console.log("CONTENT: ", content)
    this.setState({authenticated: true})
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
      {/* <pre>{JSON.stringify(roomData)}</pre> */}
      {/* <div style={{
        position: 'relative',
        top: '.6em',
        height: '3em',
        background: 'red'
      }}>TEST</div> */}
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
          {/* {!this.state.authenticated && this.askForAuth()} */}
          {/* {this.state.authenticated && this.showCalendar()} */}
          {this.showCalendar()}
        </div>
      </div>
    );
  }
}

export default ConfRoomSchedule;