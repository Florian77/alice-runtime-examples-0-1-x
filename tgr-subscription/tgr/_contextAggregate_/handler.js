// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:tgr-subscription:VERSION:0.1.0
// -------------------------------------------------------------------------
const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");


const _contextAggregate__Trigger = async (event, env) => {
    // dc.j(event, "event");

    const {_THIS_ITEM_ID_FIELD_, _THIS_ITEM_ID_FIELD2_} = u.parseAggregateId(event);
    // dc.t(_THIS_ITEM_ID_FIELD_, "_THIS_ITEM_ID_FIELD_");
    // dc.t(_THIS_ITEM_ID_FIELD2_, "_THIS_ITEM_ID_FIELD2_");

    // use this notation - if more only 1 id field exists
    const aggregateId = u.stringifyId("_THIS_ITEM_ID_FIELD_", _THIS_ITEM_ID_FIELD_);
    // use this notation - if more than 1 id field exists
    // const aggregateId = u.stringifyId(["_THIS_ITEM_ID_FIELD_", "_THIS_ITEM_ID_FIELD2_"], {_THIS_ITEM_ID_FIELD_, _THIS_ITEM_ID_FIELD2_});
    // dc.t(aggregateId, "aggregateId");

    await env.reInvokeSubscription({
        context: "_THIS_CONTEXT_",
        aggregate: "_THIS_AGGREGATE_",
        command: "_THIS_COMMAND_",
        subscription: `_PARENT_AGGREGATE_?${aggregateId}`,
    });

    return true;
};


module.exports = _contextAggregate__Trigger;
