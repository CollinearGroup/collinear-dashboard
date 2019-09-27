import React from "react"
import "./App.scss"
import _ from "lodash"

// Import your plugin
import NpmMetrics from "./npm-metrics"
import Info from "./info"

// Add your plugin
export default function App() {
  let componentList = [
    <Info />,
    <NpmMetrics />,
    getPlaceholder(),
    getPlaceholder(),
    getPlaceholder(),
    getPlaceholder(),
    getPlaceholder()
  ]

  function getPlaceholder() {
    return <span> Hi Brian, Your're app here!</span>
  }

  return <GridContainer componentList={componentList} />
}

export class GridContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.getShuffledList()
    }
  }
  componentDidMount() {
    // TODO: rename
    this.fetchInterval = setInterval(() => {
      this.setState({
        list: this.getShuffledList()
      })
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval)
  }

  getShuffledList() {
    return _.shuffle(this.props.componentList).map(el => {
      return <div className="box">{el}</div>
    })
  }

  render() {
    return <div className="wrapper"> {this.state.list} </div>
  }
}

// export function Grid() {
//   function getShuffledList() {
//     return _.shuffle(this.props.componentList).map(el => {
//       return <div className="box">{el}</div>
//     })
//   }

//   return <div className="wrapper"> {this.getShuffledList()} </div>
// }
