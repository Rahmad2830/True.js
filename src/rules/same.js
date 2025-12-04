export default function same(value, param) {
  const otherField = String(param)
  if(value !== otherField) {
    return `This field value must match ${otherField}`
  }
}