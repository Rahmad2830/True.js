export default function bool(value) {
  const val = String(value).toLowerCase()
  const validValues = ["true", "false", "1", "0", "on", "off", "yes", "no"]
  if(!validValues.includes(val)) {
    return "Value must be a boolean"
  }
  return null
}