// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:tgr-default:VERSION:0.1.0
// -------------------------------------------------------------------------
const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");


const journal_Trigger = async (event, env) => {
    // dc.j(event, "event");

    await env.emitMultiCommand({
        context: "_THIS_CONTEXT_",
        aggregate: "state",
        command: "makeAggregate",
        invokeId: u.getAggregateId(event),
        // priority: 0,
        // paused: true,
        payload: {
            ...(u.parseAggregateId(event))
        },
    });

    return true;
};


module.exports = journal_Trigger;
