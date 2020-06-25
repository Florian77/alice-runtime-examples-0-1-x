const dc = require("node-dev-console");
const R = require("ramda");

const {
    STATE_CREATED,
} = require("./helper/defines");


const reducer = {
    Created: require("./reducer/Created"),
};


// default order object
const defaultState = {
    id: null,
    createdAt: null,
    state: STATE_CREATED,
    lastEvent: "Created",
};

const reduceJournal = eventList => {
    // dc.j(eventList, "eventList");

    if (R.isEmpty(eventList)) {
        return R.clone(defaultState);
    }

    // todo -> sort events by date

    // todo -> sort events by logic

    // ---------------------------------------------------------------------------------
    const state = R.reduce(
        (state, {event, payload}) => {
            // dc.j(event, "event");
            // dc.j(payload, "payload");

            if (!R.has(event, reducer)) {
                throw Error(`reducer for event [${event}] missing`);
            }

            return reducer[event](state, payload);
        },
        R.clone(defaultState),
        eventList
    );
    // dc.j(state, "reduced state");

    // ---------------------------------------------------------------------------------
    state.lastEvent = R.pipe(
        R.last,
        R.propOr(null, "event")
    )(eventList);

    // ---------------------------------------------------------------------------------
    return state;
};

module.exports = {
    reduceJournal,
    defaultState,
};
