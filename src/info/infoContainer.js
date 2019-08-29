import { connect } from "react-redux"
import Info from "./info"

const mapStateToProps = state => {
  return { time: state.value }
}

export default connect(mapStateToProps)(Info)
