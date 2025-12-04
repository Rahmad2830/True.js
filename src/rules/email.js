export default function email(value) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  if(!emailRegex.test(value)) {
    return "Email is not valid"
  }
  return null
}