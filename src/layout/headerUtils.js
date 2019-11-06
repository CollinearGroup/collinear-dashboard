import dateFormat from "dateformat"

export function getDate(date) {
  return dateFormat(date, "dddd, mmm dS")
}

export function getDay(date) {
  return dateFormat(date, "dddd")
}

export function getTime(date) {
  return dateFormat(date, "h:MM TT")
}
