export default function min(value, param) {
  if(value.length > parseInt(param)) {
    return `Maximum length is ${param}`
  }
  return null
}