// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:cmd-import-payload:VERSION:0.1.0
// -------------------------------------------------------------------------
const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");


const updateOnChange_Command = async (command, env) => {
    // dc.l("command data", dc.stringify(command));

    const {_THIS_ITEM_ID_FIELD_} = u.parseInvokeId(command);
    // dc.t(_THIS_ITEM_ID_FIELD_, "_THIS_ITEM_ID_FIELD_");

    // ---------------------------------------------------------------------------------
    // store -> Data
    const result = await env.storeDataEventOnPayloadChange({
        context: "_THIS_CONTEXT_",
        aggregate: "_THIS_AGGREGATE_",
        // use this notation - if more only 1 id field exists
        aggregateId: u.stringifyId("_THIS_ITEM_ID_FIELD_", _THIS_ITEM_ID_FIELD_),
        // use this notation - if more than 1 id field exists
        // aggregateId: u.stringifyId(["_THIS_ITEM_ID_FIELD_"], {_THIS_ITEM_ID_FIELD_}),
        payload: {
            ...u.getPayload(command)
        },
        index: {
            _THIS_ITEM_ID_FIELD_
        }
    });

    return u.returnCmdSuccess({
        dataHasChanged: result,
    });

};


module.exports = updateOnChange_Command;