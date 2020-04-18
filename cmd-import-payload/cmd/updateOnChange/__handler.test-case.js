// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:cmd-import-payload:VERSION:0.1.0
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

    const result = await testHandler(
        require("./test-data/happy-path_command"), env);

    dc.j(result, "Test result");
    env.log.displayAll();


    await aliceTestEnv.disconnect();
})();

