let vector = module.exports = (x, y) => ({x, y})

vector.add = (u, v) => vector(u.x + v.x, u.y + v.y)
vector.sub = (u, v) => vector(u.x - v.x, u.y - v.y)

vector.cross = (u, v) => (u.x * v.y) - (u.y * v.x)
vector.dot = (u, v) => (u.x * v.x) + (u.y * v.y)

vector.orthogonal = (u) =>  vector( -u.y , u.x )