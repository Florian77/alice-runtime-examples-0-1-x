const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");


const makeAggregate_Command = async (command, env) => {
    // dc.j(command, "command");

    const {_THIS_ITEM_ID_FIELD_} = u.parseInvokeId(command);
    // dc.t(_THIS_ITEM_ID_FIELD_, "_THIS_ITEM_ID_FIELD_");

    // ---------------------------------------------------------------------------------
    // Load -> parent Aggregate
    const parent_DataEvent = await env.getLastDataEvent({
        context: "_PARENT_CONTEXT_",
        aggregate: "_PARENT_AGGREGATE_",
        aggregateId: u.getInvokeId(command),
    });
    if (!parent_DataEvent) { // -> u.aggregateExists()
        return u.returnCmdError("Aggregate [parent] not exists");
    }
    const parent_Payload = u.getPayload(parent_DataEvent);


    // ---------------------------------------------------------------------------------
    // store -> new Data
    const result = await env.storeDataEventOnPayloadChange({
        context: "_THIS_CONTEXT_",
        aggregate: "_THIS_AGGREGATE_",
        aggregateId: u.getInvokeId(command),
        payload: {
            ...parent_Payload
        },
        index: {
            _THIS_ITEM_ID_FIELD_
        }
    });

    return u.returnCmdSuccess({
        dataHasChanged: result,
    });

};


module.exports = makeAggregate_Command;
