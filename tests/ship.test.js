const Ship = require('../src/ship');

test('Ship is not sunk before hits, but is sunk after correct number of hits', () => {
    const ship = Ship(3);
    expect(ship.isSunk()).toBe(false);

    // after 2 hits
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);

    // 3 hits
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});
