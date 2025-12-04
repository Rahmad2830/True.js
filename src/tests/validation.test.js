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
  it('should return empty error arrays when no rules are provided', () => {
    const data = { name: 'John' }
    const rules = {}
    const result = validation(data, rules)
    
    expect(result).toEqual({})
  })

  it('should return empty error arrays when all validations pass', () => {
    const data = { name: 'John', age: '25' }
    const rules = { 
      name: ['required'],
      age: ['numeric']
    }
    const result = validation(data, rules)
    
    expect(result.name).toEqual([])
    expect(result.age).toEqual([])
  })

  it('should collect multiple errors for a single field', () => {
    const data = { password: 'abc' }
    const rules = { 
      password: ['required', 'min:8', 'regex:^(?=.*[A-Z]):Must contain uppercase']
    }
    const result = validation(data, rules)
    
    expect(result.password.length).toBeGreaterThan(0)
  })

  it('should handle multiple fields with different rules', () => {
    const data = { 
      username: 'john',
      email: 'invalid-email',
      age: 'not-a-number'
    }
    const rules = { 
      username: ['required', 'min:3'],
      email: ['required', 'email'],
      age: ['required', 'numeric']
    }
    const result = validation(data, rules)
    
    expect(result).toHaveProperty('username')
    expect(result).toHaveProperty('email')
    expect(result).toHaveProperty('age')
  })
})

describe('Required Rule', () => {
  it('should pass when value is provided', () => {
    expect(required('John')).toBeNull()
    expect(required('0')).toBeNull()
    expect(required(0)).toBeNull()
  })

  it('should fail when value is empty string', () => {
    expect(required('')).toBe('This field is required')
    expect(required('   ')).toBe('This field is required')
  })

  it('should fail when value is null or undefined', () => {
    expect(required(null)).toBe('This field is required')
    expect(required(undefined)).toBe('This field is required')
  })
})

describe('Numeric Rule', () => {
  it('should pass for valid numbers', () => {
    expect(numeric('123')).toBeNull()
    expect(numeric('0')).toBeNull()
    expect(numeric('-45')).toBeNull()
    expect(numeric('3.14')).toBeNull()
  })

  it('should fail for non-numeric values', () => {
    expect(numeric('abc')).toBe('Value must be a number')
    expect(numeric('12abc')).toBe('Value must be a number')
  })
})

describe('Min Rule', () => {
  it('should pass when length is greater than or equal to minimum', () => {
    expect(min('hello', '5')).toBeNull()
    expect(min('hello world', '5')).toBeNull()
  })

  it('should fail when length is less than minimum', () => {
    expect(min('hi', '5')).toBe('Minimum length is 5')
    expect(min('test', '10')).toBe('Minimum length is 10')
  })
})

describe('Max Rule', () => {
  it('should pass when length is less than or equal to maximum', () => {
    expect(max('hello', '10')).toBeNull()
    expect(max('test', '4')).toBeNull()
  })

  it('should fail when length is greater than maximum', () => {
    expect(max('hello world', '5')).toBe('Maximum length is 5')
    expect(max('testing', '4')).toBe('Maximum length is 4')
  })
})

describe('Email Rule', () => {
  it('should pass for valid email formats', () => {
    expect(email('user@example.com')).toBeNull()
    expect(email('john.doe@company.co.uk')).toBeNull()
    expect(email('test+tag@domain.com')).toBeNull()
    expect(email('user123@test-domain.org')).toBeNull()
  })

  it('should fail for invalid email formats', () => {
    expect(email('invalid')).toBe('Email is not valid')
    expect(email('user@')).toBe('Email is not valid')
    expect(email('@domain.com')).toBe('Email is not valid')
    expect(email('user@domain')).toBe('Email is not valid')
    expect(email('user domain@test.com')).toBe('Email is not valid')
    expect(email('')).toBe('Email is not valid')
  })
})

describe('Regex Rule', () => {
  it('should pass when value matches regex pattern', () => {
    expect(regex('ABC123', '^[A-Z0-9]+$', 'Must be alphanumeric uppercase')).toBeNull()
    expect(regex('test@example.com', '^[\\w.]+@[\\w.]+$', 'Invalid email')).toBeNull()
  })

  it('should fail when value does not match regex pattern', () => {
    expect(regex('abc', '^[0-9]+$', 'Must be numbers only')).toBe('Must be numbers only')
    expect(regex('test', '^[A-Z]+$', 'Must be uppercase')).toBe('Must be uppercase')
  })

  it('should handle invalid regex patterns', () => {
    expect(regex('test', '[', 'Invalid pattern')).toBe('Invalid regex pattern')
  })
})

describe('Date Rule', () => {
  it('should pass for valid date formats', () => {
    expect(date('2024-01-01')).toBeNull()
    expect(date('December 25, 2024')).toBeNull()
    expect(date(new Date())).toBeNull()
  })

  it('should fail for invalid date formats', () => {
    expect(date('invalid-date')).toBe('Date is not valid')
    expect(date('2024-13-45')).toBe('Date is not valid')
    expect(date('abc')).toBe('Date is not valid')
  })
})

describe('Bool Rule', () => {
  it('should pass for valid boolean values', () => {
    expect(bool('true')).toBeNull()
    expect(bool('false')).toBeNull()
    expect(bool('1')).toBeNull()
    expect(bool('0')).toBeNull()
    expect(bool('yes')).toBeNull()
    expect(bool('no')).toBeNull()
    expect(bool('on')).toBeNull()
    expect(bool('off')).toBeNull()
  })

  it('should be case insensitive', () => {
    expect(bool('TRUE')).toBeNull()
    expect(bool('False')).toBeNull()
    expect(bool('YES')).toBeNull()
  })

  it('should fail for invalid boolean values', () => {
    expect(bool('invalid')).toBe('Value must be a boolean')
    expect(bool('2')).toBe('Value must be a boolean')
    expect(bool('maybe')).toBe('Value must be a boolean')
  })
})

describe('Min_num Rule', () => {
  it('should pass when number is greater than or equal to minimum', () => {
    expect(min_num('10', '5')).toBeNull()
    expect(min_num('5', '5')).toBeNull()
    expect(min_num(100, '50')).toBeNull()
  })

  it('should fail when number is less than minimum', () => {
    expect(min_num('3', '5')).toBe('Minimum value is 5')
    expect(min_num('0', '10')).toBe('Minimum value is 10')
  })
})

describe('Max_num Rule', () => {
  it('should pass when number is less than or equal to maximum', () => {
    expect(max_num('5', '10')).toBeNull()
    expect(max_num('10', '10')).toBeNull()
    expect(max_num(3, '5')).toBeNull()
  })

  it('should fail when number is greater than maximum', () => {
    expect(max_num('15', '10')).toBe('Maximum value is 10')
    expect(max_num('100', '50')).toBe('Maximum value is 50')
  })
})

describe('Same Rule', () => {
  it('should pass when values match', () => {
    expect(same('password123', 'password123')).toBeUndefined()
    expect(same('test', 'test')).toBeUndefined()
  })

  it('should fail when values do not match', () => {
    const result = same('password123', 'different')
    expect(result).toBe('This field value must match different')
  })
})

describe('Integration Tests', () => {
  it('should validate a complete user registration form', () => {
    const data = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'Pass123!',
      confirmPassword: 'Pass123!',
      age: '25',
      terms: 'true'
    }

    const rules = {
      username: ['required', 'min:3', 'max:20'],
      email: ['required', 'email'],
      password: ['required', 'min:6'],
      confirmPassword: ['required', 'same:Pass123!'],
      age: ['required', 'numeric', 'min_num:18', 'max_num:100'],
      terms: ['required', 'bool']
    }

    const result = validation(data, rules)

    expect(result.username).toEqual([])
    expect(result.email).toEqual([])
    expect(result.password).toEqual([])
    expect(result.age).toEqual([])
    expect(result.terms).toEqual([])
  })

  it('should collect all validation errors for invalid data', () => {
    const data = {
      username: 'ab',
      email: 'invalid',
      password: '123',
      age: 'abc',
      terms: 'maybe'
    }

    const rules = {
      username: ['required', 'min:3'],
      email: ['required', 'email'],
      password: ['required', 'min:6'],
      age: ['required', 'numeric'],
      terms: ['required', 'bool']
    }

    const result = validation(data, rules)

    expect(result.username.length).toBeGreaterThan(0)
    expect(result.email.length).toBeGreaterThan(0)
    expect(result.password.length).toBeGreaterThan(0)
    expect(result.age.length).toBeGreaterThan(0)
    expect(result.terms.length).toBeGreaterThan(0)
  })

  it('should validate email with proper regex', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'first+last@company.org',
      'email123@test-domain.com'
    ]

    const invalidEmails = [
      'notanemail',
      'missing@domain',
      '@nodomain.com',
      'spaces in@email.com',
      'double@@domain.com'
    ]

    validEmails.forEach(emailValue => {
      const result = validation({ email: emailValue }, { email: ['email'] })
      expect(result.email).toEqual([])
    })

    invalidEmails.forEach(emailValue => {
      const result = validation({ email: emailValue }, { email: ['email'] })
      expect(result.email.length).toBeGreaterThan(0)
    })
  })

  it('should handle empty data gracefully', () => {
    const data = {}
    const rules = {
      username: ['required'],
      email: ['required', 'email']
    }

    const result = validation(data, rules)

    expect(result.username).toContain('This field is required')
    expect(result.email).toContain('This field is required')
  })

  it('should validate numeric boundaries', () => {
    const data = {
      age: '150',
      score: '5'
    }

    const rules = {
      age: ['numeric', 'min_num:18', 'max_num:100'],
      score: ['numeric', 'min_num:1', 'max_num:10']
    }

    const result = validation(data, rules)

    expect(result.age).toContain('Maximum value is 100')
    expect(result.score).toEqual([])
  })

  it('should validate string length boundaries', () => {
    const data = {
      username: 'ab',
      bio: 'This is a very long biography that exceeds the maximum allowed length for this field'
    }

    const rules = {
      username: ['min:3', 'max:20'],
      bio: ['max:50']
    }

    const result = validation(data, rules)

    expect(result.username).toContain('Minimum length is 3')
    expect(result.bio).toContain('Maximum length is 50')
  })
})