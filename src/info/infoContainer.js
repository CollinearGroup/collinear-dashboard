import { connect } from "react-redux"
import Info from "./info"

import appReducer from "./infoSlice"

const mapStateToProps = state => {
  return { time: state.value }
}

export const reducer = appReducer
export default connect(mapStateToProps)(Info)
