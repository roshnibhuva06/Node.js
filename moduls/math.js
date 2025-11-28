//area of circle

function areaOfCircle(radius) {
    return Math.PI * radius * radius;
}

//area of rectangle

function areaOfRectangle(length, width) {
    return length * width;

}
//area of triangle

function areaOfTriangle(base, height) {
    return 0.5 * base * height;
}

//area of square

function areaOfSquare(side) {
    return side * side;
}

module.exports = {
    areaOfCircle,
    areaOfRectangle,
    areaOfTriangle,
    areaOfSquare
}
