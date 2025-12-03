export default function validation(data = {}, rules = {}) {
  let error = {}
  let fieldRules = []
  
  for(const key in rules) {
    error[key] = []
    fieldRules = rules[key]
    for(const rl of fieldRules) {
      if(rl === "required" && (data[key] === '' || data[key] === null || data[key] === undefined)) {
        error[key].push("This field is required")
      }
      if(rl === "number") {
        if(isNaN(Number(data[key]))) {
          error[key].push("Value must be a number")
        }
      }
      if(rl.startsWith("min:")) {
        const len = parseInt(rl.split(":")[1])
        if(String(data[key]).length < len) {
          error[key].push(`minimum length ${len} characters`)
        }
      }
      if(rl.startsWith("max:")) {
        const len = parseInt(rl.split(":")[1])
        if(String(data[key]).length > len) {
          error[key].push(`maximum length ${len} characters`)
        }
      }
      if(rl === "email") {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        if(!emailRegex.test(data[key])) {
          error[key].push("Email not valid")
        }
      }
      if(rl === "url") {
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
        if(!urlRegex.test(data[key])) {
          error[key].push("Url not valid")
        }
      }
      if(rl === "phone") {
        const phoneRegex = /^(?:\+?\d{10,15})$/
        if(!phoneRegex.test(data[key])) {
          error[key].push("Phone number is not valid")
        }
      }
      if (rl === "bool") {
        const val = String(data[key]).toLowerCase()
        const validValues = ["true", "false", "1", "0", "on", "off", "yes", "no"]
        if (!validValues.includes(val)) {
          error[key].push("This field must be a boolean")
        }
      }
      if (rl === "date" && data[key]) {
        const d = new Date(data[key]);
        if (isNaN(d.getTime())) {
          error[key].push("Invalid date format")
        }
      }
      if(rl.startsWith("min_num:")) {
        const val = parseInt(rl.split(":")[1])
        if(Number(data[key]) < val) {
          error[key].push(`Min value is ${val}`)
        }
      }
      if(rl.startsWith("max_num:")) {
        const val = parseInt(rl.split(":")[1])
        if(Number(data[key]) > val) {
          error[key].push(`Max value is ${val}`)
        }
      }
      if(rl.startsWith("same:")) {
        const otherField = rl.split(":")[1]
        if(data[key] !== data[otherField]) {
          error[key].push(`This field value must match ${otherField}`)
        }
      }
    }
  }
  return error
}