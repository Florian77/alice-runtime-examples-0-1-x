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
        invokeId: "journalId=100"
    }, env);

    dc.j(result, "Test result");
    env.log.displayAll();


    await aliceTestEnv.disconnect();
})();
