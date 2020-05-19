let Polygone = require("./polygone")
let Vector = require("./vector")

let utils = require("./util")

let tileSize = 10
let tilesPerZone = 5

let zoneSize = tileSize * tilesPerZone

let Tile = () => ({ ground: true })

let Zone = module.exports = position => ({
    position,
    id: zone.makeId(position),
    tiles: utils.arr2d(zoneSize, zoneSize, Tile),
    objects: new Set()
})

Zone.makeId = position => `(${position.x}, ${position.y})`

Zone.getZoneCord = position => Vector(
    Zone.toZoneCord( position.x ),
    Zone.toZoneCord( position.y )
)

Zone.toZoneCord = (num) => num - num % zoneSize

Zone.getTile = (zone, position) => zone.tiles[position.x % zoneSize][position.y % zoneSize]

Zone.toPolygone = (zone) => Polygone(
    vector(zone.x           , zone.y           ),
    vector(zone.x + zoneSize, zone.y           ),
    vector(zone.x + zoneSize, zone.y + zoneSize),
    vector(zone.x           , zone.y + zoneSize),
)

Zone.includesObject = (zone, shape) => Polygone.collidsWith(shape, Zone.toPolygone(zone))

Zone.forZoneCordsInBoundingBox = ({minX, maxX, minY, maxY}, callback) => {
    for (let x = minX - minX % zoneSize; x < maxX; x += ZoneSize) {
        for (let y = minY - minY % zoneSize; y < maxY; y += ZoneSize) {
            callback( Vector(x, y) )
        }
    }
}