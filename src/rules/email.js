export default function email(message = "Email is not valid") {
  return function (value) {
    if(value === null || value === undefined) return null
    
    const val = String(value).trim()
    if(val === "") return null
    
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(val)) {
      return message
    }
    return null
  }
}