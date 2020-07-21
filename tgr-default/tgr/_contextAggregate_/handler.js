const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");


const _contextAggregate__Trigger = async (event, env) => {
    // dc.j(event, "event");

    await env.emitMultiCommand({
        context: "_THIS_CONTEXT_",
        aggregate: "_THIS_AGGREGATE_",
        command: "_THIS_COMMAND_",
        invokeId: u.getAggregateId(event),
        // priority: 0,
        // paused: true,
        // payload: {
        //     ...(u.parseAggregateId(event))
        // },
    });

    return true;
};


module.exports = _contextAggregate__Trigger;
