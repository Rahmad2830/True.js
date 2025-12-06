export default function numeric(message = "Value must be a number") {
  return function (value) {
    if(value === null || value === undefined) return null
    
    const val = String(value).trim()
    if(val === "") return null
    
    const num = Number(val)
    if(isNaN(num)) {
      return message
    }
    return null
  }
}