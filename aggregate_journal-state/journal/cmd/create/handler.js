const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");
const {v4: uuidv4} = require('uuid');


const create_Command = async (command, env) => {
    // dc.j(command, "command");
    // todo -> Add command schema check

    const {id} = u.parseInvokeId(command);
    // dc.t(id, "id");

    const cmdPayload = u.getPayload(command);

    // ---------------------------------------------------------------------------------
    // create journalId
    let journalId = uuidv4();
    // dc.t(journalId, "journalId");

    // ---------------------------------------------------------------------------------
    // return error if already exists
    // if (!journalId) {
    //     return u.returnCmdError("order already exists");
    // }

    // stringify order Id
    journalId = String(journalId);
    // dc.t(journalId, "journalId");

    const aggregateId = u.stringifyId("journalId", journalId);
    const context = u.getContext(command);
    const aggregate = u.getAggregate(command);

    // ---------------------------------------------------------------------------------
    // Create
    {
        const data = R.propOr("", "data", cmdPayload);
        // todo -> validate -> return error
        const eventData = {
            context, aggregate, aggregateId,
            event: "Created",
            payload: {
                journalId,
                id,
                createdAt: new Date(),
                data,
            }
        };
        // dc.l("eventData", dc.stringify(eventData));
        const result = await env.storeDataEvent(eventData);
        // dc.l("env.storeDataEvent(%s).result", dc.stringify(eventData), dc.stringify(result));
    }


    // ---------------------------------------------------------------------------------
    return u.returnCmdSuccess({journalId});

};


module.exports = create_Command;
