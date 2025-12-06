export default function min_num(min_numb, message = `Minimum value is ${min_numb}`) {
  return function (value) {
    if(value === null || value === undefined) return null
    
    const val = String(value).trim()
    if(val === "") return null
    
    const num = Number(val)
    if(isNaN(num)) return "Value must be a number"
    
    if(num < Number(min_numb)) {
      return message
    }
    return null
  }
}