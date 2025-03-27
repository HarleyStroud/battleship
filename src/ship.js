export default function Ship(length) {
    let hitCount = 0;
    let sunk = false;

    const hit = () => {
        hitCount++;
        if(hitCount === length) {
            sunk = true;
        }
    };


    const isSunk = () => {
        return sunk;
    };


    return { hit, isSunk, length };
}
