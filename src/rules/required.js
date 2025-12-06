export default function required(message = "This field is required") {
  return function (value) {
    if(String(value).trim() === '' || value === null || value === undefined) {
        return message
      }
    return null
  }
}