import required from './rules/required.js'
import numeric from './rules/numeric.js'
import min from './rules/min.js'
import max from './rules/max.js'
import email from './rules/email.js'
import regex from './rules/regex.js'
import date from './rules/date.js'
import bool from './rules/bool.js'
import min_num from './rules/min_num.js'
import max_num from './rules/max_num.js'
import same from './rules/same.js'

const validators = {
  required,
  numeric,
  min,
  max,
  email,
  regex,
  date,
  bool,
  min_num,
  max_num,
  same
}

export default function validation(data = {}, rules = {}) {
  let error = {}
  
  for(const key in rules) {
    error[key] = []
    
    for(const rl of rules[key]) {
      const [ruleName, param, comment] = rl.split(":")
      const result = validators[ruleName]?.(data[key], param, comment)
      if(result) error[key].push(result)
    }
  }
  return error
}

// export default function bool(value) {
//   const val = String(value).toLowerCase()
//   const validValues = ["true", "false", "1", "0", "on", "off", "yes", "no"]
//   if(!validValues.includes(val)) {
//     return "Value must be a boolean"
//   }
//   return null
// }

// export default function date(value) {
//   const d = new Date(value)
//   if(isNaN(d.getTime())) {
//     return "Date is not valid"
//   }
//   return null
// }

// export default function email(value) {
//   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
//   if(!emailRegex.test(value)) {
//     return "Email is not valid"
//   }
//   return null
// }

// export default function min(value, param) {
//   if(value.length > parseInt(param)) {
//     return `Maximum length is ${param}`
//   }
//   return null
// }

// export default function min_num(value, param) {
//   if(Number(value) > parseInt(param)) {
//     return `Maximum value is ${param}`
//   }
//   return null
// }

// export default function min(value, param) {
//   if(value.length < parseInt(param)) {
//     return `Minimum length is ${param}`
//   }
//   return null
// }

// export default function min_num(value, param) {
//   if(Number(value) < parseInt(param)) {
//     return `Minimum value is ${param}`
//   }
//   return null
// }

// export default function numeric(value) {
//   if(isNaN(Number(value))) {
//     return "Value must be a number"
//   }
//   return null
// }

// export default function regex(value, param, comment) {
//   try {
//     const Regex = new RegExp(param)
//     if(!Regex.test(value)) {
//       return comment
//     }
//     return null
//   } catch (err) {
//     return "Invalid regex pattern"
//   }
// }

// export default function required(value) {
//   if(String(value).trim() === '' || value === null || value === undefined) {
//     return "This field is required"
//   }
//   return null
// }

// export default function same(value, param) {
//   const otherField = String(param)
//   if(value !== otherField) {
//     return `This field value must match ${otherField}`
//   }
// }