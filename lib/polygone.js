let {add, sub, cross, dot, orthogonal} = require("./vector")

let vector = require("./vector")

let polygone = module.exports = (...verticies) => verticies

polygone.makeConvex = shape => {
    // if it has less than three points its no good
    if (shape.length < 3) return false

    for (let i = 0; i < shape.length; i++) {
        // get the current point and the one on either side of it
        let prev = polygone.get(shape, i + 0)
        let curr = polygone.get(shape, i + 1)
        let next = polygone.get(shape, i + 2)

        if (i == 0) {
            // if its negative then the array is pointing the wrong dirrection
            if ( cross( sub(curr, prev), sub(next, curr) ) < 0 )
                shape = shape.reverse()

            // we cant fail on the first go
            continue
        }

        // get the cross product of the two sides to see if the angle is > 180
        if ( cross( sub(curr, prev), sub(next, curr) ) < 0 ) return false
    }

    // were all good, its convex
    return shape
}

polygone.get = (shape, index) => shape[index % shape.length]

polygone.edges = shape => shape.map((vertex, i) => sub( polygone.get(shape, i + 1), vertex ))

let isSeparatingAxis = (edge, shape1, shape2) => {
    let min1 = 999999999
    let max1 = -999999999

    let min2 = 999999999
    let max2 = -999999999

    for (let vertex of shape1) {
        let projection = dot(vertex, edge)

        min1 = Math.min(min1, projection)
        max1 = Math.max(max1, projection)
    }

    for (let vertex of shape2) {
        let projection = dot(vertex, edge)

        min2 = Math.min(min2, projection)
        max2 = Math.max(max2, projection)
    }

    return max1 >= min2 && max2 >= min1
}

polygone.shift = (shape, cord) => shape.map(vertex => add(vertex, cord))

polygone.collidsWith = (shape1, shape2) => {
    let edges = []

    // get all the edges possible edges
    polygone.edges(shape1).forEach(edge => edges.push( orthogonal(edge) ))
    polygone.edges(shape2).forEach(edge => edges.push( orthogonal(edge) ))

    for (let edge of edges) {
        // if there projections on the edge doent overlap that they done collide
        if ( isSeparatingAxis(edge, shape1, shape2) ) return true
    }

    // there are no seprate axis, the polygons are colliding
    return false
}

console.log(polygone.collidsWith(

    polygone.makeConvex(
        polygone(vector(0,0),
        vector(0,10),
        vector(10,10),
        vector(10,0))
    ),

    polygone.shift(
        polygone.makeConvex(
            polygone(vector(0,0),
            vector(0,10),                          
            vector(10,10),
            vector(10,0))
        ),
        vector(5, 5)
    )
))