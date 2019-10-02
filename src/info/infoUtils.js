import dateFormat from "dateformat"

export function getDate(date) {
  return dateFormat(date, "dddd mmm. dd, yyyy")
}

export function getTime(date) {
  return (
    date
      .toLocaleTimeString()
      .split(":")
      .slice(0, 2)
      .join(":") + " PST"
  )
}
