const dc = require("node-dev-console");
const R = require("ramda");
const {utility: u} = require("alice-runtime");
const {reduceJournal} = require('../reduce-journal');

const loadState = async (journalId, env) => {

    // ---------------------------------------------------------------------------------
    // Load -> event stream
    const eventStream = await env.getDataEventStream({
        context: "_THIS_CONTEXT_",
        aggregate: "journal",
        aggregateId: u.stringifyId("journalId", {journalId}),
    });
    if (R.isEmpty(eventStream)) {
        // dc.j(eventStream, "EMPTY Event Stream");
        return null;
        // return u.returnCmdError("Empty event stream");
    }
    // dc.j(eventStream, "eventStream");

    // ---------------------------------------------------------------------------------
    const state = reduceJournal(eventStream);
    // dc.j(state, "state");

    return state;
};

module.exports = {
    loadState,
};
