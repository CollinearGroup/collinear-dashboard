import React from "react"
import axios from "axios"

import "./npm-metrics.css"

const SMART_DEEP_SORT_NAME = "smart-deep-sort"
const LICENSE_VALIDATOR_NAME = "license-validator"
const PCAP_NAME = "pcap-ng-parser"
const NPM_URL = "https://api.npmjs.org/downloads/point/last-week"
const ONE_HOUR = 60 * 60 * 1000

class NpmMetrics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      smartDeepSort: null,
      licenseValidator: null,
      pcap: null,
    }
  }

  async componentDidMount() {
    await this.updateData()
    this.fetchInterval = setInterval(() => {
      this.updateData()
    }, ONE_HOUR)
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval)
  }

  async updateData() {
    this.setState({
      smartDeepSort: await getModuleDownloads(SMART_DEEP_SORT_NAME),
      licenseValidator: await getModuleDownloads(LICENSE_VALIDATOR_NAME),
      pcap: await getModuleDownloads(PCAP_NAME),
    })
  }

  render() {
    return (
      <div id="nm-root">
        <div>Smart Deep Sort: {this.state.smartDeepSort}</div>
        <div>License Validator: {this.state.licenseValidator}</div>
        <div>PCAP: {this.state.pcap}</div>
      </div>
    )
  }
}

async function getModuleDownloads(name) {
  let response = await axios.get(`${NPM_URL}/${name}`)
  return response.data.downloads
}

export default NpmMetrics
