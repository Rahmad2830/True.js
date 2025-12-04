export default function required(value) {
  if(String(value).trim() === '' || value === null || value === undefined) {
    return "This field is required"
  }
  return null
}