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

polygone.shift = (shape, cord) => shape.map(vertex => add(vertex, cord))

let isSeparatingAxis = (edge, shape1, shape2) => {
    let min1 = Infinity
    let max1 = -Infinity

    let min2 = Infinity
    let max2 = -Infinity

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

polygone.collidsWith = (shape1, shape2) => {
    let edges = []

    // get all the edges possible edges
    polygone.edges(shape1).forEach(edge => edges.push( orthogonal(edge) ))
    polygone.edges(shape2).forEach(edge => edges.push( orthogonal(edge) ))

    for (let edge of edges) {
        // if there projections on the edge doent overlap that they done collide
        if ( isSeparatingAxis(edge, shape1, shape2) ) return true
    }

    // there are no seprate axis, so the polygons are colliding
    return false
}

polygone.boundingBox = shape => {
    let minX = Infinity
    let maxX = -Infinity

    let minY = Infinity
    let maxY = -Infinity

    shape.forEach(vertex => {
        minX = Math.min( vertex.x, minX )
        maxX = Math.max( vertex.x, maxX )

        minY = Math.min( vertex.y, minY )
        maxY = Math.max( vertex.y, maxY )
    })

    return {minX, maxX, minY, maxY}
}