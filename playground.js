let polygone = require("./lib/polygone")
let vector = require("./lib/vector")

let addObject = (object) => {
    // add object to each of the zones its in
    getZonesObjectIsIn(object).forEach(zone => zone.objects.add(object))
    
    // add object to master list of objects
    objects.add(object)

    // return the object
    return object
}

let removeObject = (object) => {
    // delete object to each of the zones its in
    getZonesObjectIsIn(object).forEach(verticie => getZone(verticie).objects.delete(object))

    // delete object to master list of objects
    objects.delete(object)

    // return the object
    return object
}

let getObjectsInZone = position => getZone(position).objects

let toZoneCord = n => n - n % ZoneSize


let getZonesObjectIsIn = object =>
    getZonesInBoundingBox( polygone.boundingBox(object.verticies) )
        .filter(zone => polygone.collidsWith(object, zoneToPolygone(zone)))


let getCollision = object => {
    let zones = getZonesObjectIsIn(object)

    return !zones.some(zone => zone.objects.all(object2 =>
        polygone.collidsWith(object.verticies, object2.verticies)
    ) )
}

// configuration

const TileSize = 20
const TilesPerZone = 5
const ZoneSize = TileSize * TilesPerZone



const map = new Map()
const objects = new Set()
