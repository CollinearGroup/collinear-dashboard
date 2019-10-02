import { connect } from "react-redux"
import Info from "./info"

const mapStateToProps = state => {
  return { time: state.time, date: state.date }
}

export default connect(mapStateToProps)(Info)
