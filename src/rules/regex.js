export default function regex(value, param, comment) {
  try {
    const Regex = new RegExp(param)
    if(!Regex.test(value)) {
      return comment
    }
    return null
  } catch (err) {
    return "Invalid regex pattern"
  }
}