import { describe, it, expect } from 'vitest'
import { 
  validation,
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
} from '../main.js'

describe('Validation Function', () => {
  describe('Basic Validation', () => {
    it('should return empty error arrays when no rules are provided', () => {
      const data = { name: 'John' }
      const rules = {}
      const result = validation(data, rules)
      
      expect(result).toEqual({})
    })

    it('should return error object with keys matching rules', () => {
      const data = { name: 'John', email: 'test@example.com' }
      const rules = {
        name: [required()],
        email: [required()]
      }
      const result = validation(data, rules)
      
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('email')
      expect(Array.isArray(result.name)).toBe(true)
      expect(Array.isArray(result.email)).toBe(true)
    })

    it('should skip non-function rules and add null', () => {
      const data = { name: 'John' }
      const rules = {
        name: ['not a function', required(), null, undefined, 123]
      }
      const result = validation(data, rules)
      
      expect(result.name).toHaveLength(4)
      expect(result.name.filter(e => e === null)).toHaveLength(4)
    })
  })

  describe('Required Rule', () => {
    it('should return error for empty string', () => {
      const data = { name: '' }
      const rules = { name: [required()] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
    })

    it('should return error for null value', () => {
      const data = { name: null }
      const rules = { name: [required()] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
    })

    it('should return error for undefined value', () => {
      const data = { name: undefined }
      const rules = { name: [required()] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
    })

    it('should return error for whitespace only', () => {
      const data = { name: '   ' }
      const rules = { name: [required()] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
    })

    it('should pass for valid value', () => {
      const data = { name: 'John' }
      const rules = { name: [required()] }
      const result = validation(data, rules)
      
      expect(result.name).toHaveLength(0)
    })

    it('should support custom error message', () => {
      const data = { username: '' }
      const rules = { username: [required('Username wajib diisi')] }
      const result = validation(data, rules)
      
      expect(result.username).toContain('Username wajib diisi')
    })
  })

  describe('Numeric Rule', () => {
    it('should return error for non-numeric string', () => {
      const data = { age: 'abc' }
      const rules = { age: [numeric()] }
      const result = validation(data, rules)
      
      expect(result.age).toContain('Value must be a number')
    })

    it('should pass for numeric string', () => {
      const data = { age: '25' }
      const rules = { age: [numeric()] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })

    it('should pass for decimal numbers', () => {
      const data = { price: '123.45' }
      const rules = { price: [numeric()] }
      const result = validation(data, rules)
      
      expect(result.price).toHaveLength(0)
    })

    it('should pass for negative numbers', () => {
      const data = { temperature: '-10' }
      const rules = { temperature: [numeric()] }
      const result = validation(data, rules)
      
      expect(result.temperature).toHaveLength(0)
    })

    it('should return null for empty string', () => {
      const data = { age: '' }
      const rules = { age: [numeric()] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })

    it('should return null for null value', () => {
      const data = { age: null }
      const rules = { age: [numeric()] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })
  })

  describe('Min Rule', () => {
    it('should return error when length is less than minimum', () => {
      const data = { username: 'ab' }
      const rules = { username: [min(3)] }
      const result = validation(data, rules)
      
      expect(result.username).toContain('Minimum length is 3')
    })

    it('should pass when length equals minimum', () => {
      const data = { username: 'abc' }
      const rules = { username: [min(3)] }
      const result = validation(data, rules)
      
      expect(result.username).toHaveLength(0)
    })

    it('should pass when length is greater than minimum', () => {
      const data = { username: 'abcdef' }
      const rules = { username: [min(3)] }
      const result = validation(data, rules)
      
      expect(result.username).toHaveLength(0)
    })

    it('should return null for empty string', () => {
      const data = { username: '' }
      const rules = { username: [min(3)] }
      const result = validation(data, rules)
      
      expect(result.username).toHaveLength(0)
    })

    it('should support custom error message', () => {
      const data = { password: 'ab' }
      const rules = { password: [min(8, 'Password harus minimal 8 karakter')] }
      const result = validation(data, rules)
      
      expect(result.password).toContain('Password harus minimal 8 karakter')
    })
  })

  describe('Max Rule', () => {
    it('should return error when length exceeds maximum', () => {
      const data = { username: 'verylongusername' }
      const rules = { username: [max(10)] }
      const result = validation(data, rules)
      
      expect(result.username).toContain('Maximum length is 10')
    })

    it('should pass when length equals maximum', () => {
      const data = { username: 'tenletters' }
      const rules = { username: [max(10)] }
      const result = validation(data, rules)
      
      expect(result.username).toHaveLength(0)
    })

    it('should pass when length is less than maximum', () => {
      const data = { username: 'short' }
      const rules = { username: [max(10)] }
      const result = validation(data, rules)
      
      expect(result.username).toHaveLength(0)
    })

    it('should return null for empty string', () => {
      const data = { username: '' }
      const rules = { username: [max(10)] }
      const result = validation(data, rules)
      
      expect(result.username).toHaveLength(0)
    })
  })

  describe('Email Rule', () => {
    it('should return error for invalid email format', () => {
      const data = { email: 'invalid-email' }
      const rules = { email: [email()] }
      const result = validation(data, rules)
      
      expect(result.email).toContain('Email is not valid')
    })

    it('should pass for valid email', () => {
      const data = { email: 'test@example.com' }
      const rules = { email: [email()] }
      const result = validation(data, rules)
      
      expect(result.email).toHaveLength(0)
    })

    it('should pass for email with subdomain', () => {
      const data = { email: 'user@mail.example.com' }
      const rules = { email: [email()] }
      const result = validation(data, rules)
      
      expect(result.email).toHaveLength(0)
    })

    it('should pass for email with plus sign', () => {
      const data = { email: 'user+tag@example.com' }
      const rules = { email: [email()] }
      const result = validation(data, rules)
      
      expect(result.email).toHaveLength(0)
    })

    it('should return error for email without @', () => {
      const data = { email: 'userexample.com' }
      const rules = { email: [email()] }
      const result = validation(data, rules)
      
      expect(result.email).toContain('Email is not valid')
    })

    it('should return error for email without domain', () => {
      const data = { email: 'user@' }
      const rules = { email: [email()] }
      const result = validation(data, rules)
      
      expect(result.email).toContain('Email is not valid')
    })

    it('should return null for empty string', () => {
      const data = { email: '' }
      const rules = { email: [email()] }
      const result = validation(data, rules)
      
      expect(result.email).toHaveLength(0)
    })
  })

  describe('Regex Rule', () => {
    it('should return error when pattern does not match', () => {
      const data = { phone: '123abc' }
      const rules = { phone: [regex('^[0-9]+$')] }
      const result = validation(data, rules)
      
      expect(result.phone).toContain('Invalid Format')
    })

    it('should pass when pattern matches', () => {
      const data = { phone: '1234567890' }
      const rules = { phone: [regex('^[0-9]+$')] }
      const result = validation(data, rules)
      
      expect(result.phone).toHaveLength(0)
    })

    it('should support custom error message', () => {
      const data = { phone: 'abc' }
      const rules = { phone: [regex('^[0-9]{10}$', 'Phone must be 10 digits')] }
      const result = validation(data, rules)
      
      expect(result.phone).toContain('Phone must be 10 digits')
    })

    it('should return error for invalid regex pattern', () => {
      const data = { test: 'value' }
      const rules = { test: [regex('[invalid(regex')] }
      const result = validation(data, rules)
      
      expect(result.test).toContain('Invalid regex pattern')
    })

    it('should return null for empty string', () => {
      const data = { phone: '' }
      const rules = { phone: [regex('^[0-9]+$')] }
      const result = validation(data, rules)
      
      expect(result.phone).toHaveLength(0)
    })
  })

  describe('Date Rule', () => {
    it('should return error for invalid date', () => {
      const data = { birthdate: 'invalid-date' }
      const rules = { birthdate: [date()] }
      const result = validation(data, rules)
      
      expect(result.birthdate).toContain('Date is not valid')
    })

    it('should pass for ISO date format', () => {
      const data = { birthdate: '2024-01-01' }
      const rules = { birthdate: [date()] }
      const result = validation(data, rules)
      
      expect(result.birthdate).toHaveLength(0)
    })

    it('should pass for slash date format', () => {
      const data = { birthdate: '01/01/2024' }
      const rules = { birthdate: [date()] }
      const result = validation(data, rules)
      
      expect(result.birthdate).toHaveLength(0)
    })

    it('should pass for full date string', () => {
      const data = { birthdate: 'January 1, 2024' }
      const rules = { birthdate: [date()] }
      const result = validation(data, rules)
      
      expect(result.birthdate).toHaveLength(0)
    })

    it('should return null for empty string', () => {
      const data = { birthdate: '' }
      const rules = { birthdate: [date()] }
      const result = validation(data, rules)
      
      expect(result.birthdate).toHaveLength(0)
    })

    it('should return null for null value', () => {
      const data = { birthdate: null }
      const rules = { birthdate: [date()] }
      const result = validation(data, rules)
      
      expect(result.birthdate).toHaveLength(0)
    })
  })

  describe('Bool Rule', () => {
    it('should return error for invalid boolean value', () => {
      const data = { active: 'maybe' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toContain('Value must be a boolean')
    })

    it('should pass for "true"', () => {
      const data = { active: 'true' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })

    it('should pass for "false"', () => {
      const data = { active: 'false' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })

    it('should pass for "1"', () => {
      const data = { active: '1' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })

    it('should pass for "0"', () => {
      const data = { active: '0' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })

    it('should pass for "yes"', () => {
      const data = { active: 'yes' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })

    it('should pass for "no"', () => {
      const data = { active: 'no' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })

    it('should pass for "on"', () => {
      const data = { active: 'on' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })

    it('should pass for "off"', () => {
      const data = { active: 'off' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })

    it('should be case insensitive', () => {
      const data = { active: 'TRUE' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })

    it('should return null for empty string', () => {
      const data = { active: '' }
      const rules = { active: [bool()] }
      const result = validation(data, rules)
      
      expect(result.active).toHaveLength(0)
    })
  })

  describe('Min Num Rule', () => {
    it('should return error when value is less than minimum', () => {
      const data = { age: '15' }
      const rules = { age: [min_num(18)] }
      const result = validation(data, rules)
      
      expect(result.age).toContain('Minimum value is 18')
    })

    it('should pass when value equals minimum', () => {
      const data = { age: '18' }
      const rules = { age: [min_num(18)] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })

    it('should pass when value is greater than minimum', () => {
      const data = { age: '25' }
      const rules = { age: [min_num(18)] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })

    it('should return error for non-numeric value', () => {
      const data = { age: 'abc' }
      const rules = { age: [min_num(18)] }
      const result = validation(data, rules)
      
      expect(result.age).toContain('Value must be a number')
    })

    it('should work with decimal numbers', () => {
      const data = { price: '9.99' }
      const rules = { price: [min_num(10)] }
      const result = validation(data, rules)
      
      expect(result.price).toContain('Minimum value is 10')
    })

    it('should return null for empty string', () => {
      const data = { age: '' }
      const rules = { age: [min_num(18)] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })
  })

  describe('Max Num Rule', () => {
    it('should return error when value exceeds maximum', () => {
      const data = { quantity: '150' }
      const rules = { quantity: [max_num(100)] }
      const result = validation(data, rules)
      
      expect(result.quantity).toContain('Maximum value is 100')
    })

    it('should pass when value equals maximum', () => {
      const data = { quantity: '100' }
      const rules = { quantity: [max_num(100)] }
      const result = validation(data, rules)
      
      expect(result.quantity).toHaveLength(0)
    })

    it('should pass when value is less than maximum', () => {
      const data = { quantity: '50' }
      const rules = { quantity: [max_num(100)] }
      const result = validation(data, rules)
      
      expect(result.quantity).toHaveLength(0)
    })

    it('should return error for non-numeric value', () => {
      const data = { quantity: 'abc' }
      const rules = { quantity: [max_num(100)] }
      const result = validation(data, rules)
      
      expect(result.quantity).toContain('Value must be a number')
    })

    it('should work with decimal numbers', () => {
      const data = { discount: '150.50' }
      const rules = { discount: [max_num(100)] }
      const result = validation(data, rules)
      
      expect(result.discount).toContain('Maximum value is 100')
    })

    it('should return null for empty string', () => {
      const data = { quantity: '' }
      const rules = { quantity: [max_num(100)] }
      const result = validation(data, rules)
      
      expect(result.quantity).toHaveLength(0)
    })
  })

  describe('Same Rule', () => {
    it('should return error when values do not match', () => {
      const data = { password: 'secret123', password_confirmation: 'secret456' }
      const rules = { password_confirmation: [same('password')] }
      const result = validation(data, rules)
      
      expect(result.password_confirmation).toContain('This value must match password')
    })

    it('should pass when values match', () => {
      const data = { password: 'secret123', password_confirmation: 'secret123' }
      const rules = { password_confirmation: [same('password')] }
      const result = validation(data, rules)
      
      expect(result.password_confirmation).toHaveLength(0)
    })

    it('should support custom error message', () => {
      const data = { password: 'secret', confirm: 'different' }
      const rules = { confirm: [same('password', 'Passwords do not match')] }
      const result = validation(data, rules)
      
      expect(result.confirm).toContain('Passwords do not match')
    })

    it('should return null when value is null', () => {
      const data = { password: 'secret', confirm: null }
      const rules = { confirm: [same('password')] }
      const result = validation(data, rules)
      
      expect(result.confirm).toHaveLength(0)
    })

    it('should return null when value is undefined', () => {
      const data = { password: 'secret', confirm: undefined }
      const rules = { confirm: [same('password')] }
      const result = validation(data, rules)
      
      expect(result.confirm).toHaveLength(0)
    })
  })

  describe('Multiple Rules', () => {
    it('should apply multiple rules to a single field', () => {
      const data = { email: 'a' }
      const rules = { email: [required(), email(), min(5)] }
      const result = validation(data, rules)
      
      expect(result.email.length).toBeGreaterThan(1)
      expect(result.email).toContain('Email is not valid')
      expect(result.email).toContain('Minimum length is 5')
    })

    it('should validate complex form', () => {
      const data = {
        username: 'johndoe',
        email: 'john@example.com',
        age: '25',
        password: 'secret123',
        password_confirmation: 'secret123',
        terms: 'true'
      }
      const rules = {
        username: [required(), min(3), max(20)],
        email: [required(), email()],
        age: [required(), numeric(), min_num(18), max_num(100)],
        password: [required(), min(8)],
        password_confirmation: [required(), same('password')],
        terms: [required(), bool()]
      }
      const result = validation(data, rules)
      
      expect(result.username.filter(e => e !== null)).toHaveLength(0)
      expect(result.email.filter(e => e !== null)).toHaveLength(0)
      expect(result.age.filter(e => e !== null)).toHaveLength(0)
      expect(result.password.filter(e => e !== null)).toHaveLength(0)
      expect(result.password_confirmation.filter(e => e !== null)).toHaveLength(0)
      expect(result.terms.filter(e => e !== null)).toHaveLength(0)
    })

    it('should collect all errors from multiple failing rules', () => {
      const data = { username: '' }
      const rules = { username: [required(), min(3), max(20)] }
      const result = validation(data, rules)
      
      expect(result.username).toContain('This field is required')
      expect(result.username.filter(e => e !== null)).toHaveLength(1)
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing fields in data', () => {
      const data = {}
      const rules = { name: [required()] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
    })

    it('should handle extra fields in data not in rules', () => {
      const data = { name: 'John', extra: 'field' }
      const rules = { name: [required()] }
      const result = validation(data, rules)
      
      expect(result).not.toHaveProperty('extra')
      expect(result).toHaveProperty('name')
    })

    it('should handle whitespace trimming', () => {
      const data = { name: '  John  ' }
      const rules = { name: [required(), min(10)] }
      const result = validation(data, rules)
      
      expect(result.name.filter(e => e !== null)).toHaveLength(1)
      expect(result.name).toContain('Minimum length is 10')
    })

    it('should return empty array for field with no failing rules', () => {
      const data = { name: 'John Doe' }
      const rules = { name: [required(), min(3), max(20)] }
      const result = validation(data, rules)
      
      expect(result.name).toHaveLength(0)
    })
  })
})