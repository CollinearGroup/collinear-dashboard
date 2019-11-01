import dateFormat from "dateformat"

export function getDate(date) {
  return dateFormat(date, "dddd, mmm dS")
}

export function getTime(date) {
  return dateFormat(date, "h:MM TT")
}
