import { describe, it, expect } from 'vitest'
import validation from '../main.js'
import required from '../rules/required.js'
import numeric from '../rules/numeric.js'
import min from '../rules/min.js'
import max from '../rules/max.js'
import email from '../rules/email.js'
import regex from '../rules/regex.js'
import date from '../rules/date.js'
import bool from '../rules/bool.js'
import min_num from '../rules/min_num.js'
import max_num from '../rules/max_num.js'
import same from '../rules/same.js'

describe('Validation Function', () => {
  describe('required rule', () => {
    it('should return error when value is empty string', () => {
      const data = { name: '' }
      const rules = { name: ['required'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toContain('This field is required')
    })

    it('should return error when value is null', () => {
      const data = { name: null }
      const rules = { name: ['required'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toContain('This field is required')
    })

    it('should return error when value is undefined', () => {
      const data = { name: undefined }
      const rules = { name: ['required'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toContain('This field is required')
    })

    it('should pass when value is provided', () => {
      const data = { name: 'John' }
      const rules = { name: ['required'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toHaveLength(0)
    })
  })

  describe('numeric rule', () => {
    it('should return error when value is not numeric', () => {
      const data = { age: 'abc' }
      const rules = { age: ['numeric'] }
      const errors = validation(data, rules)
      
      expect(errors.age).toContain('Value must be a number')
    })

    it('should pass when value is numeric string', () => {
      const data = { age: '25' }
      const rules = { age: ['numeric'] }
      const errors = validation(data, rules)
      
      expect(errors.age).toHaveLength(0)
    })

    it('should pass when value is number', () => {
      const data = { age: 25 }
      const rules = { age: ['numeric'] }
      const errors = validation(data, rules)
      
      expect(errors.age).toHaveLength(0)
    })
  })

  describe('min rule', () => {
    it('should return error when length is less than minimum', () => {
      const data = { name: 'Jo' }
      const rules = { name: ['min:3'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toContain('Minimum length is 3')
    })

    it('should pass when length meets minimum', () => {
      const data = { name: 'John' }
      const rules = { name: ['min:3'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toHaveLength(0)
    })

    it('should pass when length exceeds minimum', () => {
      const data = { name: 'Jonathan' }
      const rules = { name: ['min:3'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toHaveLength(0)
    })
  })

  describe('max rule', () => {
    it('should return error when length exceeds maximum', () => {
      const data = { name: 'Jonathan' }
      const rules = { name: ['max:5'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toContain('Maximum length is 5')
    })

    it('should pass when length is within maximum', () => {
      const data = { name: 'John' }
      const rules = { name: ['max:5'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toHaveLength(0)
    })

    it('should pass when length equals maximum', () => {
      const data = { name: 'Johns' }
      const rules = { name: ['max:5'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toHaveLength(0)
    })
  })

  describe('email rule', () => {
    it('should return error for invalid email', () => {
      const data = { email: 'invalid-email' }
      const rules = { email: ['email'] }
      const errors = validation(data, rules)
      
      expect(errors.email).toContain('Email is not valid')
    })

    it('should return error for email without @', () => {
      const data = { email: 'testexample.com' }
      const rules = { email: ['email'] }
      const errors = validation(data, rules)
      
      expect(errors.email).toContain('Email is not valid')
    })

    it('should pass for valid email', () => {
      const data = { email: 'test@example.com' }
      const rules = { email: ['email'] }
      const errors = validation(data, rules)
      
      expect(errors.email).toHaveLength(0)
    })

    it('should pass for email with subdomain', () => {
      const data = { email: 'user@mail.example.com' }
      const rules = { email: ['email'] }
      const errors = validation(data, rules)
      
      expect(errors.email).toHaveLength(0)
    })
  })

  describe('regex rule', () => {
    it('should return error when value does not match pattern', () => {
      const data = { username: 'user@123' }
      const rules = { username: ['regex:^[a-zA-Z0-9]+$:Only alphanumeric allowed'] }
      const errors = validation(data, rules)
      
      expect(errors.username).toContain('Only alphanumeric allowed')
    })

    it('should pass when value matches pattern', () => {
      const data = { username: 'user123' }
      const rules = { username: ['regex:^[a-zA-Z0-9]+$:Only alphanumeric allowed'] }
      const errors = validation(data, rules)
      
      expect(errors.username).toHaveLength(0)
    })

    it('should return error for invalid regex pattern', () => {
      const data = { username: 'user123' }
      const rules = { username: ['regex:[invalid:Invalid pattern'] }
      const errors = validation(data, rules)
      
      expect(errors.username).toContain('Invalid regex pattern')
    })
  })

  describe('date rule', () => {
    it('should return error for invalid date', () => {
      const data = { birthdate: 'invalid-date' }
      const rules = { birthdate: ['date'] }
      const errors = validation(data, rules)
      
      expect(errors.birthdate).toContain('Date is not valid')
    })

    it('should pass for valid date string', () => {
      const data = { birthdate: '2024-01-15' }
      const rules = { birthdate: ['date'] }
      const errors = validation(data, rules)
      
      expect(errors.birthdate).toHaveLength(0)
    })

    it('should pass for Date object', () => {
      const data = { birthdate: new Date() }
      const rules = { birthdate: ['date'] }
      const errors = validation(data, rules)
      
      expect(errors.birthdate).toHaveLength(0)
    })
  })

  describe('bool rule', () => {
    it('should return error for invalid boolean', () => {
      const data = { active: 'maybe' }
      const rules = { active: ['bool'] }
      const errors = validation(data, rules)
      
      expect(errors.active).toContain('Value must be a boolean')
    })

    it('should pass for "true"', () => {
      const data = { active: 'true' }
      const rules = { active: ['bool'] }
      const errors = validation(data, rules)
      
      expect(errors.active).toHaveLength(0)
    })

    it('should pass for "false"', () => {
      const data = { active: 'false' }
      const rules = { active: ['bool'] }
      const errors = validation(data, rules)
      
      expect(errors.active).toHaveLength(0)
    })

    it('should pass for "1" and "0"', () => {
      const data1 = { active: '1' }
      const data2 = { active: '0' }
      const rules = { active: ['bool'] }
      
      expect(validation(data1, rules).active).toHaveLength(0)
      expect(validation(data2, rules).active).toHaveLength(0)
    })

    it('should pass for "yes" and "no"', () => {
      const data1 = { active: 'yes' }
      const data2 = { active: 'no' }
      const rules = { active: ['bool'] }
      
      expect(validation(data1, rules).active).toHaveLength(0)
      expect(validation(data2, rules).active).toHaveLength(0)
    })
  })

  describe('min_num rule', () => {
    it('should return error when value is less than minimum', () => {
      const data = { price: 5 }
      const rules = { price: ['min_num:10'] }
      const errors = validation(data, rules)
      
      expect(errors.price).toContain('Minimum value is 10')
    })

    it('should pass when value meets minimum', () => {
      const data = { price: 10 }
      const rules = { price: ['min_num:10'] }
      const errors = validation(data, rules)
      
      expect(errors.price).toHaveLength(0)
    })

    it('should pass when value exceeds minimum', () => {
      const data = { price: 15 }
      const rules = { price: ['min_num:10'] }
      const errors = validation(data, rules)
      
      expect(errors.price).toHaveLength(0)
    })
  })

  describe('max_num rule', () => {
    it('should return error when value exceeds maximum', () => {
      const data = { age: 100 }
      const rules = { age: ['max_num:90'] }
      const errors = validation(data, rules)
      
      expect(errors.age).toContain('Maximum value is 90')
    })

    it('should pass when value is within maximum', () => {
      const data = { age: 50 }
      const rules = { age: ['max_num:90'] }
      const errors = validation(data, rules)
      
      expect(errors.age).toHaveLength(0)
    })

    it('should pass when value equals maximum', () => {
      const data = { age: 90 }
      const rules = { age: ['max_num:90'] }
      const errors = validation(data, rules)
      
      expect(errors.age).toHaveLength(0)
    })
  })

  describe('same rule', () => {
    it('should return error when values do not match', () => {
      const data = { password: 'secret123', password_confirmation: 'secret456' }
      const rules = { password_confirmation: ['same:password'] }
      const errors = validation(data, rules)
      
      expect(errors.password_confirmation).toContain('This field value must match password')
    })

    it('should pass when values match', () => {
      const data = { password: 'secret123', password_confirmation: 'secret123' }
      const rules = { password_confirmation: ['same:password'] }
      const errors = validation(data, rules)
      
      expect(errors.password_confirmation).toHaveLength(0)
    })
  })

  describe('multiple rules', () => {
    it('should validate multiple rules for one field', () => {
      const data = { name: 'Jo' }
      const rules = { name: ['required', 'min:3', 'max:20'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toContain('Minimum length is 3')
      expect(errors.name).not.toContain('This field is required')
    })

    it('should validate multiple fields', () => {
      const data = {
        name: '',
        email: 'invalid',
        age: 'abc'
      }
      const rules = {
        name: ['required'],
        email: ['email'],
        age: ['numeric']
      }
      const errors = validation(data, rules)
      
      expect(errors.name).toContain('This field is required')
      expect(errors.email).toContain('Email is not valid')
      expect(errors.age).toContain('Value must be a number')
    })

    it('should return empty errors when all validations pass', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
      }
      const rules = {
        name: ['required', 'min:3', 'max:50'],
        email: ['required', 'email'],
        age: ['required', 'numeric', 'min_num:18', 'max_num:100']
      }
      const errors = validation(data, rules)
      
      expect(errors.name).toHaveLength(0)
      expect(errors.email).toHaveLength(0)
      expect(errors.age).toHaveLength(0)
    })
  })

  describe('edge cases', () => {
    it('should handle empty data object', () => {
      const data = {}
      const rules = { name: ['required'] }
      const errors = validation(data, rules)
      
      expect(errors.name).toContain('This field is required')
    })

    it('should handle empty rules object', () => {
      const data = { name: 'John' }
      const rules = {}
      const errors = validation(data, rules)
      
      expect(errors).toEqual({})
    })

    it('should handle field not in data', () => {
      const data = { name: 'John' }
      const rules = { email: ['required'] }
      const errors = validation(data, rules)
      
      expect(errors.email).toContain('This field is required')
    })

    it('should initialize error array for each field', () => {
      const data = { name: 'John' }
      const rules = { name: ['required'] }
      const errors = validation(data, rules)
      
      expect(Array.isArray(errors.name)).toBe(true)
    })
  })
})