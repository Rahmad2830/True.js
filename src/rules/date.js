export default function date(value) {
  const d = new Date(value)
  if(isNaN(d.getTime())) {
    return "Date is not valid"
  }
  return null
}