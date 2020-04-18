// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:cmd-sync-view:VERSION:0.1.0
// -------------------------------------------------------------------------
const dc = require("node-dev-console");
const aliceTestEnv = require("alice-runtime/test-environment");
const testHandler = require('./handler');

dc.activate();


(async () => {
    aliceTestEnv.loadRuntimeConfig(__dirname, "test-case");
    await aliceTestEnv.connect();
    // await aliceTestEnv.clearDatabase();
    const env = aliceTestEnv.commandTestEnvironment();
    // await env.storeDataEvent(require("./test-data/item-123456"));
    // env.log.clear();

    const result = await testHandler({
        invokeId: "_THIS_ITEM_ID_FIELD_=value"
    }, env);

    dc.j(result, "Test result");
    env.log.displayAll();


    await aliceTestEnv.disconnect();
})();