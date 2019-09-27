import React from "react"
import "./App.scss"
import _ from "lodash"

// Import your plugin
import NpmMetrics from "./npm-metrics"
import Info from "./info"

// Add your plugin
export default function App() {
  let info = (
    <div className="theme1-box">
      <Info />
    </div>
  )
  let npmMetrics = (
    <div className="theme1-box">
      <NpmMetrics />,
    </div>
  )

  let componentList = [
    info,
    npmMetrics,
    getPlaceholder(),
    getPlaceholder(),
    getPlaceholder()
  ]

  function getPlaceholder() {
    return <div className="theme2-box"> Hi Brian, Your're app here!</div>
  }

  return <GridContainer componentList={componentList} />
}

export class GridContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.props.componentList
    }
  }
  componentDidMount() {
    this.updateDisplayInterval = setInterval(() => {
      this.setState({
        // list: this.getShuffledList()
        list: this.getRotatedList()
      })
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.updateDisplayInterval)
  }

  getShuffledList() {
    return _.shuffle(this.props.componentList)
  }

  getRotatedList() {
    console.log(this.state.list)
    let list = [...this.state.list]
    let el = list.shift()
    list.push(el)
    return list
  }

  renderWithFeature(list) {
    // First element is "featured"
    let result = []
    result.push(<div className="featured-grid">{list[0]}</div>)
    let wrapper = <div className="summary-grid"> {list.slice(1)} </div>
    return result.concat(wrapper)
  }

  render() {
    return this.renderWithFeature(this.state.list)
  }
}
