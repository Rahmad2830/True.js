# JavaScript Validation Library

A lightweight, flexible validation library for JavaScript applications with support for common validation rules.

## Installation

Copy the validation library files into your project structure:

```
your-project/
├── validation/
│   ├── index.js
│   └── rules/
│       ├── required.js
│       ├── numeric.js
│       ├── min.js
│       ├── max.js
│       ├── email.js
│       ├── regex.js
│       ├── date.js
│       ├── bool.js
│       ├── min_num.js
│       ├── max_num.js
│       └── same.js
```

## Usage

### Basic Example

```javascript
import { validation, required, email, min } from './validation/index.js'

const data = {
  username: 'john',
  email: 'john@example.com',
  password: '12345'
}

const rules = {
  username: [required(), min(3)],
  email: [required(), email()],
  password: [required(), min(8)]
}

const errors = validation(data, rules)
console.log(errors)
// Output:
// {
//   username: [],
//   email: [],
//   password: ["Minimum length is 8"]
// }
```

## Available Validation Rules

### required(message)

Validates that a field has a value.

```javascript
import { required } from './validation/index.js'

const rules = {
  name: [required('Name is required')]
}
```

**Parameters:**
- `message` (optional): Custom error message. Default: `"This field is required"`

---

### email(message)

Validates that a field contains a valid email address.

```javascript
import { email } from './validation/index.js'

const rules = {
  email: [email('Please enter a valid email')]
}
```

**Parameters:**
- `message` (optional): Custom error message. Default: `"Email is not valid"`

---

### numeric(message)

Validates that a field contains a numeric value.

```javascript
import { numeric } from './validation/index.js'

const rules = {
  age: [numeric('Age must be a number')]
}
```

**Parameters:**
- `message` (optional): Custom error message. Default: `"Value must be a number"`

---

### min(min_val, message)

Validates the minimum length of a string.

```javascript
import { min } from './validation/index.js'

const rules = {
  username: [min(3, 'Username must be at least 3 characters')]
}
```

**Parameters:**
- `min_val`: Minimum length required
- `message` (optional): Custom error message. Default: `"Minimum length is {min_val}"`

---

### max(max_val, message)

Validates the maximum length of a string.

```javascript
import { max } from './validation/index.js'

const rules = {
  username: [max(20, 'Username cannot exceed 20 characters')]
}
```

**Parameters:**
- `max_val`: Maximum length allowed
- `message` (optional): Custom error message. Default: `"Maximum length is {max_val}"`

---

### min_num(min_numb, message)

Validates the minimum numeric value.

```javascript
import { min_num } from './validation/index.js'

const rules = {
  age: [min_num(18, 'You must be at least 18 years old')]
}
```

**Parameters:**
- `min_numb`: Minimum numeric value
- `message` (optional): Custom error message. Default: `"Minimum value is {min_numb}"`

---

### max_num(max_numb, message)

Validates the maximum numeric value.

```javascript
import { max_num } from './validation/index.js'

const rules = {
  age: [max_num(100, 'Age cannot exceed 100')]
}
```

**Parameters:**
- `max_numb`: Maximum numeric value
- `message` (optional): Custom error message. Default: `"Maximum value is {max_numb}"`

---

### date(message)

Validates that a field contains a valid date.

```javascript
import { date } from './validation/index.js'

const rules = {
  birthdate: [date('Please enter a valid date')]
}
```

**Parameters:**
- `message` (optional): Custom error message. Default: `"Date is not valid"`

---

### bool(message)

Validates that a field contains a boolean value. Accepts: `true`, `false`, `1`, `0`, `on`, `off`, `yes`, `no`.

```javascript
import { bool } from './validation/index.js'

const rules = {
  agreed: [bool('Please provide a valid boolean value')]
}
```

**Parameters:**
- `message` (optional): Custom error message. Default: `"Value must be a boolean"`

---

### regex(pattern, message)

Validates that a field matches a regular expression pattern.

```javascript
import { regex } from './validation/index.js'

const rules = {
  phone: [regex(/^\d{10}$/, 'Phone must be 10 digits')]
}
```

**Parameters:**
- `pattern`: Regular expression pattern
- `message` (optional): Custom error message. Default: `"Invalid Format"`

---

### same(field, message)

Validates that a field matches another field's value.

```javascript
import { same } from './validation/index.js'

const rules = {
  password: [required()],
  password_confirmation: [same('password', 'Passwords must match')]
}
```

**Parameters:**
- `field`: The field name to compare with
- `message` (optional): Custom error message. Default: `"This value must match {field}"`

## Complete Example

```javascript
import { 
  validation, 
  required, 
  email, 
  min, 
  max,
  numeric,
  min_num,
  max_num,
  same 
} from './validation/index.js'

const formData = {
  username: 'johndoe',
  email: 'john@example.com',
  password: 'secret123',
  password_confirmation: 'secret123',
  age: '25',
  bio: 'Hello, I am a developer'
}

const validationRules = {
  username: [
    required('Username is required'),
    min(3, 'Username must be at least 3 characters'),
    max(20, 'Username cannot exceed 20 characters')
  ],
  email: [
    required('Email is required'),
    email('Please provide a valid email address')
  ],
  password: [
    required('Password is required'),
    min(8, 'Password must be at least 8 characters')
  ],
  password_confirmation: [
    required('Please confirm your password'),
    same('password', 'Passwords do not match')
  ],
  age: [
    required('Age is required'),
    numeric('Age must be a number'),
    min_num(18, 'You must be at least 18 years old'),
    max_num(100, 'Age cannot exceed 100')
  ],
  bio: [
    max(500, 'Bio cannot exceed 500 characters')
  ]
}

const errors = validation(formData, validationRules)

// Check if there are any errors
const hasErrors = Object.values(errors).some(err => err.length > 0)

if (hasErrors) {
  console.log('Validation failed:', errors)
} else {
  console.log('Validation passed!')
}
```

## Error Handling

The `validation()` function returns an object where each key corresponds to a field in your rules, and the value is an array of error messages:

```javascript
{
  username: [],
  email: ["Email is not valid"],
  password: ["Minimum length is 8"],
  age: []
}
```

- Empty array `[]` means no errors for that field
- Array with strings means validation failed with those error messages

### Checking for Errors

```javascript
const errors = validation(data, rules)

// Check if a specific field has errors
if (errors.username.length > 0) {
  console.log('Username errors:', errors.username)
}

// Check if any field has errors
const hasErrors = Object.values(errors).some(err => err.length > 0)
if (hasErrors) {
  console.log('Form has errors')
}

// Get all error messages
const allErrors = Object.values(errors).flat().filter(err => err !== null)
console.log(allErrors)
```

## Features

- ✅ Lightweight with no dependencies
- ✅ Easy to use and integrate
- ✅ Customizable error messages
- ✅ Chainable validation rules
- ✅ Null/undefined safe
- ✅ Empty string handling
- ✅ ES6 module support

## Notes

- All validation rules skip validation for `null`, `undefined`, or empty string values (except `required()`)
- The `required()` rule should be used first if a field is mandatory
- Multiple validation rules can be chained for a single field
- Custom error messages are optional for all rules

## License

MIT