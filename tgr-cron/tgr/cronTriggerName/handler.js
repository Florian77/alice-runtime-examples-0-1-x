const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");


const cronTriggerName_Trigger = async (trigger, env) => {
    // dc.j(trigger, "trigger");

    await env.emitMultiCommand({
        context: "_THIS_CONTEXT_",
        aggregate: "_THIS_AGGREGATE_",
        command: "_THIS_COMMAND_",
        invokeId: "set id here",
        // priority: 0,
        // paused: true,
        // payload: {
        //     ...(u.parseAggregateId(event))
        // },
    });

    return true;
};


module.exports = cronTriggerName_Trigger;
