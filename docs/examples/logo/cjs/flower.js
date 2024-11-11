
const PI = Math.PI
const step = 2 * PI / 5

const angles = [
    PI / 2 - step,
    PI / 2,
    PI / 2 + step,
    PI / 2 + 2 * step,
    PI / 2 + 3 * step
]
const way = [3, 1, 4, 2, 0]

module.exports = function (diameter, petal, lwidth) {

    const radius = diameter / 2
    const center = radius + lwidth

    const coords = angles.map(function (angle) {
        return [
            center + Math.cos(angle) * radius, 
            center - Math.sin(angle) * radius
        ]
    })

    let path = ['M', coords[0][0], coords[0][1]]
    way.forEach(function (point) {
        path = path.concat('A', petal, petal, 0, 0, 0, coords[point][0], coords[point][1])
    })
    path.push('Z')

    return path.join(' ')
}