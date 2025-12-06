export default function same(field, message = `This value must match ${String(field)}`) {
  return function (value, data) {
    if(value === null || value === undefined) return null
    
    if(value !== data?.[field]) {
      return message
    }
    return null
  }
}