export default function max_num(max_numb, message = `Maximum value is ${max_numb}`) {
  return function (value) {
    if(value === null || value === undefined) return null
    
    const val = String(value).trim()
    if(val === "") return null
    
    const num = Number(val)
    if(isNaN(num)) return "Value must be a number"
    
    if(num > Number(max_numb)) {
      return message
    }
    return null
  }
}