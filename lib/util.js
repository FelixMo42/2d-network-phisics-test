module.exports = {

    arr2d = (width, height, callback) =>
        new Array(width).map(x => new Array(height).map(y => callback(x, y)))

}