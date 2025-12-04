export default function min_num(value, param) {
  if(Number(value) > parseInt(param)) {
    return `Maximum value is ${param}`
  }
  return null
}