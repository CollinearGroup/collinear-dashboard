import React from "react"
import axios from "axios"

import "./npm-metrics.scss"

const SMART_DEEP_SORT_NAME = "smart-deep-sort"
const LICENSE_VALIDATOR_NAME = "license-validator"
const PCAP_NAME = "pcap-ng-parser"
const NPM_URL = "https://api.npmjs.org/downloads/point/last-month"
const ONE_HOUR = 60 * 60 * 1000

class NpmMetrics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      smartDeepSort: null,
      licenseValidator: null,
      pcap: null
    }
  }

  async componentDidMount() {
    this.updateData()
    this.fetchInterval = setInterval(() => {
      this.updateData()
    }, ONE_HOUR)
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval)
  }

  async updateData() {
    let smartPromise = getModuleDownloads(SMART_DEEP_SORT_NAME)
    let licensePromise = getModuleDownloads(LICENSE_VALIDATOR_NAME)
    let pcapPromise = getModuleDownloads(PCAP_NAME)
    this.setState({
      smartDeepSort: await smartPromise,
      licenseValidator: await licensePromise,
      pcap: await pcapPromise
    })
  }

  render() {
    return (
    <div id="nm-root">
        <div><b></b></div>
        <div></div>
    <table>
      <th><b>Collinear Open Source Libraries</b></th>
      <th style={{textAlign:"right"}}>Downloads per month</th>
    </table>
    <br/>
    <div class='container'>
        <div class='filler'></div>
        <span class='label'>Smart Deep Sort: </span>
        <span class='text'>{this.state.smartDeepSort}</span>
    </div>
    <br/>
    <div class='container'>
        <div class='filler'></div>
        <span class='label'>License Validator: </span>
        <span class='text'>{this.state.licenseValidator}</span>
    </div>
    <br/>
    <div class='container'>
        <div class='filler'></div>
        <span class='label'>PCAP: </span>
        <span class='text'>{this.state.pcap}</span>
    </div>
    </div>
    )
  }
}

async function getModuleDownloads(name) {
  let response = await axios.get(`${NPM_URL}/${name}`)
  return response.data.downloads
}

export default NpmMetrics
