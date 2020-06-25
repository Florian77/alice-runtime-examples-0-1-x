const dc = require("node-dev-console");
const R = require("ramda");

const Created = (state, payload) => {
    // dc.j(state, "OrderCreated.state");
    // dc.j(payload, "OrderCreated.payload");

    state = R.mergeRight(state, payload);

    return state;
};

module.exports = Created;
