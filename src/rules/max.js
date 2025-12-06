export default function max(max_val, message = `Maximum length is ${max_val}`) {
  return function (value) {
    if(value === null || value === undefined) return null
    
    const val = String(value).trim()
    if(val === "") return null
    
    if(val.length > Number(max_val)) {
      return message
    }
    return null
  }
}