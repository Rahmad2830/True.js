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

export {
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

export function validation(data = {}, rules = {}) {
  let error = {}
  
  for(const key in rules) {
    error[key] = []
    for(const func of rules[key]) {
      if(typeof func !== "function") {
        error[key].push(null)
        continue
      }
      const result = func(data[key], data)
      if(result !== null) error[key].push(result)
    }
  }
  return error
}

// export default function bool(message = "Value must be a boolean") {
//   return function (value) {
//     if(value === null || value === undefined) return null
    
//     const val = String(value).trim().toLowerCase()
//     if(val === "") return null
    
//     const validValues = ["true", "false", "1", "0", "on", "off", "yes", "no"]
//     if(!validValues.includes(val)) {
//       return message
//     }
//     return null
//   }
// }

// export default function date(message = "Date is not valid") {
//   return function (value) {
//     if (value === null || value === undefined) {
//       return null
//     }
    
//     const str = String(value).trim()
//     if (str === "") {
//       return null
//     }
    
//     const d = new Date(str)
//     if (isNaN(d.getTime())) {
//       return message
//     }
//     return null
//   }
// }

// export default function email(message = "Email is not valid") {
//   return function (value) {
//     if(value === null || value === undefined) return null
    
//     const val = String(value).trim()
//     if(val === "") return null
    
//     const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     if(!emailRegex.test(val)) {
//       return message
//     }
//     return null
//   }
// }

// export default function max(max_val, message = `Maximum length is ${max_val}`) {
//   return function (value) {
//     if(value === null || value === undefined) return null
    
//     const val = String(value).trim()
//     if(val === "") return null
    
//     if(val.length > Number(max_val)) {
//       return message
//     }
//     return null
//   }
// }

// export default function max_num(max_numb, message = `Maximum value is ${max_numb}`) {
//   return function (value) {
//     if(value === null || value === undefined) return null
    
//     const val = String(value).trim()
//     if(val === "") return null
    
//     const num = Number(val)
//     if(isNaN(num)) return "Value must be a number"
    
//     if(num > Number(max_numb)) {
//       return message
//     }
//     return null
//   }
// }

// export default function min(min_val, message = `Minimum length is ${min_val}`) {
//   return function (value) {
//     if(value === null || value === undefined) return null
    
//     const val = String(value).trim()
//     if(val === "") return null
    
//     if(val.length < Number(min_val)) {
//       return message
//     }
//     return null
//   }
// }

// export default function min_num(min_numb, message = `Minimum value is ${min_numb}`) {
//   return function (value) {
//     if(value === null || value === undefined) return null
    
//     const val = String(value).trim()
//     if(val === "") return null
    
//     const num = Number(val)
//     if(isNaN(num)) return "Value must be a number"
    
//     if(num < Number(min_numb)) {
//       return message
//     }
//     return null
//   }
// }

// export default function numeric(message = "Value must be a number") {
//   return function (value) {
//     if(value === null || value === undefined) return null
    
//     const val = String(value).trim()
//     if(val === "") return null
    
//     const num = Number(val)
//     if(isNaN(num)) {
//       return message
//     }
//     return null
//   }
// }

// export default function regex(pattern, message = "Invalid Format") {
//   return function (value) {
//     if(value === null || value == undefined) return null
    
//     const val = String(value).trim()
//     if(val === "") return null
    
//     try {
//     const regex = new RegExp(pattern)
//       if(!regex.test(val)) {
//         return message
//       }
//       return null
//     } catch (err) {
//       return "Invalid regex pattern"
//     }
//   }
// }

// export default function required(message = "This field is required") {
//   return function (value) {
//     if(String(value).trim() === '' || value === null || value === undefined) {
//         return message
//       }
//     return null
//   }
// }

// export default function same(field, message = `This value must match ${String(field)}`) {
//   return function (value, data) {
//     if(value === null || value === undefined) return null
    
//     if(value !== data?.[field]) {
//       return message
//     }
//     return null
//   }
// }