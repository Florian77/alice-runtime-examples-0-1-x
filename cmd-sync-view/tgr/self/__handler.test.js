// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:tgr-sync-view:VERSION:0.1.0
// -------------------------------------------------------------------------
const dc = require("node-dev-console");
const expect = require('chai').expect;
const aliceTestEnv = require("alice-runtime/test-environment");
const testHandler = require('./handler');

dc.activate();


describe('app/_THIS_CONTEXT_/_THIS_AGGREGATE_/trg/_syncViewCommand_/handler', function () {

    // -----------------------------------------------------------------------------------------------------------------------------
    before(async () => {
        // aliceTestEnv.loadRuntimeConfig(__dirname, "unit-test");
        // await aliceTestEnv.connect();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    after(async () => {
        // await aliceTestEnv.disconnect();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    beforeEach(async function () {
        dc.l("---------------", this.currentTest.title, "---------------");
        // await aliceTestEnv.clearDatabase();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    it('happy path', async function () {
        const env = aliceTestEnv.triggerTestEnvironment({
            dryRun: true
        });

        const result = await testHandler({
            aggregateId: "id=value"
        }, env);

        dc.j(result, "Test result");
        env.log.displayAll();

        expect(result).to.equal(true);
        expect(env.log.emitMultiCommand()).to.deep.equal([
            {
                "context": "_THIS_CONTEXT_",
                "aggregate": "_THIS_AGGREGATE_",
                "command": "_syncViewCommand_",
                "invokeId": "id=value",
                "payload": {
                    "id": "value"
                }
            }
        ]);
    });


});
