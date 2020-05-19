let Zone = require("./zone")

let World = module.exports = () => ({
    zones: new Map(),
    objects: new Set()
})

// Object Functions //

let addObject = (world, object) => {
    // add object to each of the zones its in
    getZonesObjectIsIn(object).forEach(zone => zone.objects.add(object))
    
    // add object to master list of objects
    objects.add(object)

    // return the object
    return object
}

// Zone Functions //

World.getZone = (world, position) => {
    // get the cords for the zone based of the tiles
    let cord = Zone.getZoneCords(position)

    // get the id for the asked for zone
    let id = Zone.makeZoneId(cord)

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

    for (let x = Zone.toZoneCord(minX); x < maxX; x += ZoneSize) {
        for (let y = Zone.toZoneCord(minY); y < maxY; y += ZoneSize) {
            zones.push( World.getZone(world, position) )
        }
    }

    return zones
}