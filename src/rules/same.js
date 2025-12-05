export default function same(value, param, otherField) {
  if(value !== otherField) {
    return `This field value must match ${String(param)}`
  }
}