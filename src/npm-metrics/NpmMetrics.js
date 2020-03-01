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
        <div style={{fontSize: '22pt'}}>Open Source Libraries</div>
        <div class='description'>Collinear built and maintains the following libraries on NPM.  Count shows downloads in the past month</div>
    <br/>
    <div class='container'>
        <div class='label'>Smart Deep Sort </div>
        <div class='filler'></div>
        <div class='value'>{this.state.smartDeepSort}</div>
    </div>
    <br/>
    <div class='container'>
        <div class='label'>License Validator </div>
        <div class='filler'></div>
        <div class='value'>{this.state.licenseValidator}</div>
    </div>
    <br/>
    <div class='container'>
        <div class='label'>PCAP </div>
        <div class='filler'></div>
        <div class='value'>{this.state.pcap}</div>
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
