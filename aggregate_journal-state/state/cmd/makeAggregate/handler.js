// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:cmd-make-aggregate-1-on-1:VERSION:0.0.2
// -------------------------------------------------------------------------
const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");
const {loadState} = require('../../../_lib');


const makeAggregate_Command = async (command, env) => {
    // dc.j(command, "command");

    const {journalId} = u.parseInvokeId(command);
    // dc.t(journalId, "journalId");

    // ---------------------------------------------------------------------------------
    // Load -> current state
    const state = await loadState(journalId, env);
    // dc.j(state, "state");

    if (R.isNil(state)) {
        return u.returnCmdError("Empty event stream");
    }


    // ---------------------------------------------------------------------------------
    // store -> new Data
    const result = await env.storeDataEventOnPayloadChange({
        context: "_THIS_CONTEXT_",
        aggregate: "state",
        aggregateId: u.getInvokeId(command),
        payload: {
            ...state
        },
        index: {
            journalId
        }
    });

    return u.returnCmdSuccess({
        dataHasChanged: result,
    });

};


module.exports = makeAggregate_Command;
