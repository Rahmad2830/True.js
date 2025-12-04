export default function min(value, param) {
  if(value.length < parseInt(param)) {
    return `Minimum length is ${param}`
  }
  return null
}