export default function regex(pattern, message = "Invalid Format") {
  return function (value) {
    if(value === null || value == undefined) return null
    
    const val = String(value).trim()
    if(val === "") return null
    
    try {
    const regex = new RegExp(pattern)
      if(!regex.test(val)) {
        return message
      }
      return null
    } catch (err) {
      return "Invalid regex pattern"
    }
  }
}