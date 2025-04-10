
export function getScaledX(p, val) {
    return (val / 100) * p.width;
}
export function getScaledY(p, val) {
    return (val / 100) * p.height;
}
export function getScaledZ(p, val) {
    // Lol idfk
    const averageDimension = (p.width - p.height);
    return (val / 100) * averageDimension;
}