import { describe, it, expect } from 'vitest'
import validation from '../main.js'

describe('Validation Function', () => {
  describe('required rule', () => {
    it('should return error when field is empty string', () => {
      const data = { name: '' }
      const rules = { name: ['required'] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
    })

    it('should return error when field is null', () => {
      const data = { name: null }
      const rules = { name: ['required'] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
    })

    it('should return error when field is undefined', () => {
      const data = {}
      const rules = { name: ['required'] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
    })

    it('should not return error when field has value', () => {
      const data = { name: 'John' }
      const rules = { name: ['required'] }
      const result = validation(data, rules)
      
      expect(result.name).toHaveLength(0)
    })
  })

  describe('number rule', () => {
    it('should return error when value is not a number', () => {
      const data = { age: 'abc' }
      const rules = { age: ['number'] }
      const result = validation(data, rules)
      
      expect(result.age).toContain('Value must be a number')
    })

    it('should not return error when value is a valid number', () => {
      const data = { age: '25' }
      const rules = { age: ['number'] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })

    it('should not return error when value is numeric', () => {
      const data = { age: 25 }
      const rules = { age: ['number'] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })
  })

  describe('min rule', () => {
    it('should return error when length is less than minimum', () => {
      const data = { name: 'Jo' }
      const rules = { name: ['min:3'] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('minimum length 3 characters')
    })

    it('should not return error when length meets minimum', () => {
      const data = { name: 'John' }
      const rules = { name: ['min:3'] }
      const result = validation(data, rules)
      
      expect(result.name).toHaveLength(0)
    })
  })

  describe('max rule', () => {
    it('should return error when length exceeds maximum', () => {
      const data = { name: 'JohnDoe' }
      const rules = { name: ['max:5'] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('maximum length 5 characters')
    })

    it('should not return error when length is within maximum', () => {
      const data = { name: 'John' }
      const rules = { name: ['max:5'] }
      const result = validation(data, rules)
      
      expect(result.name).toHaveLength(0)
    })
  })

  describe('email rule', () => {
    it('should return error for invalid email', () => {
      const data = { email: 'invalid-email' }
      const rules = { email: ['email'] }
      const result = validation(data, rules)
      
      expect(result.email).toContain('Email not valid')
    })

    it('should not return error for valid email', () => {
      const data = { email: 'user@example.com' }
      const rules = { email: ['email'] }
      const result = validation(data, rules)
      
      expect(result.email).toHaveLength(0)
    })

    it('should validate email with subdomain', () => {
      const data = { email: 'user@mail.example.com' }
      const rules = { email: ['email'] }
      const result = validation(data, rules)
      
      expect(result.email).toHaveLength(0)
    })
  })

  describe('url rule', () => {
    it('should return error for invalid url', () => {
      const data = { website: 'not-a-url' }
      const rules = { website: ['url'] }
      const result = validation(data, rules)
      
      expect(result.website).toContain('Url not valid')
    })

    it('should not return error for valid url with https', () => {
      const data = { website: 'https://example.com' }
      const rules = { website: ['url'] }
      const result = validation(data, rules)
      
      expect(result.website).toHaveLength(0)
    })

    it('should not return error for valid url without protocol', () => {
      const data = { website: 'example.com' }
      const rules = { website: ['url'] }
      const result = validation(data, rules)
      
      expect(result.website).toHaveLength(0)
    })
  })

  describe('phone rule', () => {
    it('should return error for invalid phone number', () => {
      const data = { phone: '123' }
      const rules = { phone: ['phone'] }
      const result = validation(data, rules)
      
      expect(result.phone).toContain('Phone number is not valid')
    })

    it('should not return error for valid phone number', () => {
      const data = { phone: '081234567890' }
      const rules = { phone: ['phone'] }
      const result = validation(data, rules)
      
      expect(result.phone).toHaveLength(0)
    })

    it('should validate international phone format', () => {
      const data = { phone: '+6281234567890' }
      const rules = { phone: ['phone'] }
      const result = validation(data, rules)
      
      expect(result.phone).toHaveLength(0)
    })
  })

  describe('bool rule', () => {
    it('should return error for invalid boolean', () => {
      const data = { active: 'invalid' }
      const rules = { active: ['bool'] }
      const result = validation(data, rules)
      
      expect(result.active).toContain('This field must be a boolean')
    })

    it('should not return error for valid boolean values', () => {
      const validValues = ['true', 'false', '1', '0', 'on', 'off', 'yes', 'no']
      
      validValues.forEach(val => {
        const data = { active: val }
        const rules = { active: ['bool'] }
        const result = validation(data, rules)
        
        expect(result.active).toHaveLength(0)
      })
    })
  })

  describe('date rule', () => {
    it('should return error for invalid date', () => {
      const data = { birthdate: 'not-a-date' }
      const rules = { birthdate: ['date'] }
      const result = validation(data, rules)
      
      expect(result.birthdate).toContain('Invalid date format')
    })

    it('should not return error for valid date', () => {
      const data = { birthdate: '2024-01-01' }
      const rules = { birthdate: ['date'] }
      const result = validation(data, rules)
      
      expect(result.birthdate).toHaveLength(0)
    })

    it('should not return error for ISO date format', () => {
      const data = { birthdate: '2024-01-01T10:30:00Z' }
      const rules = { birthdate: ['date'] }
      const result = validation(data, rules)
      
      expect(result.birthdate).toHaveLength(0)
    })
  })

  describe('min_num rule', () => {
    it('should return error when number is less than minimum', () => {
      const data = { age: 15 }
      const rules = { age: ['min_num:18'] }
      const result = validation(data, rules)
      
      expect(result.age).toContain('Min value is 18')
    })

    it('should not return error when number meets minimum', () => {
      const data = { age: 20 }
      const rules = { age: ['min_num:18'] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })
  })

  describe('max_num rule', () => {
    it('should return error when number exceeds maximum', () => {
      const data = { age: 100 }
      const rules = { age: ['max_num:99'] }
      const result = validation(data, rules)
      
      expect(result.age).toContain('Max value is 99')
    })

    it('should not return error when number is within maximum', () => {
      const data = { age: 50 }
      const rules = { age: ['max_num:99'] }
      const result = validation(data, rules)
      
      expect(result.age).toHaveLength(0)
    })
  })

  describe('same rule', () => {
    it('should return error when fields do not match', () => {
      const data = { password: 'secret123', password_confirmation: 'secret456' }
      const rules = { password_confirmation: ['same:password'] }
      const result = validation(data, rules)
      
      expect(result.password_confirmation).toContain('This field value must match password')
    })

    it('should not return error when fields match', () => {
      const data = { password: 'secret123', password_confirmation: 'secret123' }
      const rules = { password_confirmation: ['same:password'] }
      const result = validation(data, rules)
      
      expect(result.password_confirmation).toHaveLength(0)
    })
  })

  describe('multiple rules', () => {
    it('should validate multiple rules on single field', () => {
      const data = { email: 'ab' }
      const rules = { email: ['required', 'email', 'min:5'] }
      const result = validation(data, rules)
      
      expect(result.email).toContain('Email not valid')
      expect(result.email).toContain('minimum length 5 characters')
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
        age: ['number']
      }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
      expect(result.email).toContain('Email not valid')
      expect(result.age).toContain('Value must be a number')
    })
  })

  describe('edge cases', () => {
    it('should handle empty data object', () => {
      const data = {}
      const rules = { name: ['required'] }
      const result = validation(data, rules)
      
      expect(result.name).toContain('This field is required')
    })

    it('should handle empty rules object', () => {
      const data = { name: 'John' }
      const rules = {}
      const result = validation(data, rules)
      
      expect(Object.keys(result)).toHaveLength(0)
    })

    it('should initialize error array for each field in rules', () => {
      const data = { name: 'John' }
      const rules = { name: ['min:5'], email: ['required'] }
      const result = validation(data, rules)
      
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('email')
      expect(Array.isArray(result.name)).toBe(true)
      expect(Array.isArray(result.email)).toBe(true)
    })

    it('should handle numeric zero as valid value for required', () => {
      const data = { count: 0 }
      const rules = { count: ['required'] }
      const result = validation(data, rules)
      
      expect(result.count).toHaveLength(0)
    })
  })
})