// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:cmd-sync-view:VERSION:0.1.0
// -------------------------------------------------------------------------
const dc = require("node-dev-console");
const {utility: u} = require("alice-runtime");
const R = require("ramda");


const _syncViewCommand__Command = async (command, env) => {
    // dc.j(command, "command");

    const {_THIS_ITEM_ID_FIELD_} = u.parseInvokeId(command);

    const filter = {
        _id: _THIS_ITEM_ID_FIELD_,
    };

    const collectionView = env.getCollectionView("_VIEW_NAME_");


    // ---------------------------------------------------------------------------------
    // Load -> this Aggregate
    const dataEvent = await env.getLastDataEvent({
        context: "_THIS_CONTEXT_",
        aggregate: "_THIS_AGGREGATE_",
        aggregateId: u.getInvokeId(command),
    });


    // ---------------------------------------------------------------------------------
    // delete data
    if (!dataEvent) { // -> u.aggregateExists()
        const result = await collectionView.deleteOne(filter);
        // dc.j(result, "DELETE result");

        const dataDeleted = {
            action: "deleted",
            ok: R.pathOr(-1, ["result", "ok"], result),
            deletedCount: R.propOr(-1, "deletedCount", result), // verify ???
        };
        // dc.j(dataChanged, "dataChanged");

        return u.returnCmdSuccess({
            ...dataDeleted,
        });
    }


    // ---------------------------------------------------------------------------------
    // replace data
    const payload = u.getPayload(dataEvent);
    // dc.j(payload, "payload");

    // Store Data in Mongo
    const replace = {
        ...payload
    };
    const options = {
        upsert: true
    };
    // dc.l("replaceOne(filter:%s, replace:%s, options:%s)", dc.stringify(filter), dc.stringify(replace), dc.stringify(options));
    const result = await collectionView.replaceOne(filter, replace, options);
    // dc.j(result, "REPLACE result");
    // dc.l("replaceOne()", ftDev.mongoReplaceOne(result), dc.stringify(result));


    // ---------------------------------------------------------------------------------
    const dataReplaced = {
        action: "replaced",
        ok: R.pathOr(-1, ["result", "ok"], result),
        modifiedCount: R.propOr(-1, "modifiedCount", result),
        upsertedId: R.propOr(-1, "upsertedId", result),
        upsertedCount: R.propOr(-1, "upsertedCount", result),
        matchedCount: R.propOr(-1, "matchedCount", result),
    };
    // dc.j(dataChanged, "dataChanged");

    return u.returnCmdSuccess({
        ...dataReplaced,
    });

};


module.exports = _syncViewCommand__Command;
