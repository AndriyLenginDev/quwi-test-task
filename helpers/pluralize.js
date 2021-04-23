export default function (count, noun, ending = 's') {
  return `${count} ${noun}${count === 1 ? '' : ending}`
}
