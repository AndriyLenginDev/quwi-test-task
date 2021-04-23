const COLORS = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d'
]

export default function (str = '') {
  if (!str) {
    return {}
  }
  const strSplit = str.split(' ').slice(0, 3) // only first 3 words
  const text = strSplit
    .map(c => c
      .charAt(0)
      .toUpperCase())
    .join('')

  const charIndex = text[0].charCodeAt(0) - 65
  const colourIndex = charIndex % 19

  return {
    text,
    color: COLORS[colourIndex]
  }
}
