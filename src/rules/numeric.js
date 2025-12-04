export default function numeric(value) {
  if(isNaN(Number(value))) {
    return "Value must be a number"
  }
  return null
}