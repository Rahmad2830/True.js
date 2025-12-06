export default function min(min_val, message = `Minimum length is ${min_val}`) {
  return function (value) {
    if(value === null || value === undefined) return null
    
    const val = String(value).trim()
    if(val === "") return null
    
    if(val.length < Number(min_val)) {
      return message
    }
    return null
  }
}