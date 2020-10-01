const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");


const cron_TriggerName_interval_Trigger = async (trigger, env) => {
    // dc.j(trigger, "trigger");

    await env.setManyCommandsNotHandled({
        context: "_THIS_CONTEXT_",
        aggregate: "_THIS_AGGREGATE_",
        command: "_THIS_COMMAND_"
    });

    return true;
};


module.exports = cron_TriggerName_interval_Trigger;
