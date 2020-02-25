let Zone = require("./zone")

let World = module.exports = () => ({
    zones: new Map(),
    objects: new Set()
})

World.getZone = (world, tile) => {
    // get the cords for the zone based of the tiles
    let cord = getZoneCords(tilePosition)

    // get the id for the asked for zone
    let id = makeZoneId(cord)

    // if the map has the zone then return it
    if ( world.zones.has(id) ) return world.zones.get(id)
    
    // make new zone
    let zone = Zone(cord)

    // add it to the map
    world.zones.set(id, zone)

    // return it
    return zone
}

World.getTile = (world, position) => Zone.getTile(World.getZone(world, position), position)

World.getZonesInBoundingBox = (world, {minX, maxX, minY, maxY}) => {
    let zones = []

    for (let x = toZoneCord(minX); x < maxX; x += ZoneSize) {
        for (let y = toZoneCord(minY); y < maxY; y += ZoneSize) {
            zones.push( World.getZone(world, position) )
        }
    }

    return zones
}