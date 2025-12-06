export default function date(message = "Date is not valid") {
  return function (value) {
    if (value === null || value === undefined) {
      return null
    }
    
    const str = String(value).trim()
    if (str === "") {
      return null
    }
    
    const d = new Date(str)
    if (isNaN(d.getTime())) {
      return message
    }
    return null
  }
}