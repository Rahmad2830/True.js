export default function min_num(value, param) {
  if(Number(value) < parseInt(param)) {
    return `Minimum value is ${param}`
  }
  return null
}