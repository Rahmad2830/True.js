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