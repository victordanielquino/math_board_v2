const {suma} = require('./math');
const expect = require("expect");

describe('operaciones basicas:', () => {
    test('sumar 1 + 2 = 3', () => {
        expect(suma(1, 2))
    })
})
