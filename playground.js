let polygone = require("./lib/polygone")
let vector = require("./lib/vector")

let Tile = () => ({ ground: true })

let TileMap = () => {
    let tiles = []

    for (let x = 0; x < 5; x++) {
        tiles[x] = []

        for (let y = 0; y < 5; y++) {
            tiles[x][y] = Tile()
        }
    }

    return tiles
}

let Zone = (x, y) => ({
    x, y,
    id: makeZoneId(x, y),
    tiles: TileMap(),
    objects: new Set()
})

let makeZoneId = (x, y) => `(${x}, ${y})`

let getZoneCords = ({x, y}) => vector(x - x % ZoneSize, y - y % ZoneSize)

let getZone = (tilePosition) => {
    // get the x and y cords for the zone based of the tiles
    let {x, y} = getZoneCords(tilePosition)

    // get the id for the asked for zone
    let id = makeZoneId(x, y)

    // if the map has the zone then return it
    if ( map.has(id) ) return map.get(id)
    
    // make new zone
    let zone = Zone(x, y)

    // add it to the map
    map.set(id, zone)

    // return it
    return zone
}

let getTile = (position) => getZone(position).tiles[position.x % ZoneSize][position.y % ZoneSize]

let Object = (verticies) => ({verticies})

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

let getZonesObjectIsIn = (object) => {
    let zones = new Set()

    // get all the zones the verticies are in
    // TODO: this does not get zones the edges pass throught
    object.verticies.forEach(verticie => zones.add( getZone(verticie) ) )

    return zones
}

let getCollision = object => {
    let zones = getZonesObjectIsIn(object)

    return !zones.some(zone => zone.objects.all( not(collidesWith(object)) ) )
}

// set up

const ZoneSize = 5
const map = new Map()
const objects = new Set()
