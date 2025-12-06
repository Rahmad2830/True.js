export default function bool(message = "Value must be a boolean") {
  return function (value) {
    if(value === null || value === undefined) return null
    
    const val = String(value).trim().toLowerCase()
    if(val === "") return null
    
    const validValues = ["true", "false", "1", "0", "on", "off", "yes", "no"]
    if(!validValues.includes(val)) {
      return message
    }
    return null
  }
}