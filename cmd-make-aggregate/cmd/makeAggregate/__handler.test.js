// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:cmd-make-aggregate:VERSION:0.1.0
// -------------------------------------------------------------------------
const dc = require("node-dev-console");
const expect = require('chai').expect;
const aliceTestEnv = require("alice-runtime/test-environment");
const testHandler = require('./handler');

dc.activate();


describe('app/_THIS_CONTEXT_/_THIS_AGGREGATE_/cmd/makeAggregate/handler', function () {

    // -----------------------------------------------------------------------------------------------------------------------------
    before(async () => {
        aliceTestEnv.loadRuntimeConfig(__dirname, "unit-test");
        await aliceTestEnv.connect();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    after(async () => {
        await aliceTestEnv.disconnect();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    beforeEach(async function () {
        dc.l("---------------", this.currentTest.title, "---------------");
        await aliceTestEnv.clearDatabase();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    // optional test happy path if not in use case
    /*it('happy path', async function () {
        const env = aliceTestEnv.commandTestEnvironment();
        await env.storeDataEvent(require("./test-data/item-123456"));
        env.log.clear();

        const result = await testHandler({
            invokeId: "_THIS_ITEM_ID_FIELD_=value"
        }, env);

        dc.j(result, "Test result");
        env.log.displayAll();

        expect(env.log.storeDataEventOnPayloadChange()).to.deep.equal(require('./test-data/happy-path_result'));
    });*/

    // -----------------------------------------------------------------------------------------------------------------------------
    it('error: Aggregate [parent] not exists', async function () {
        const env = aliceTestEnv.commandTestEnvironment();

        const result = await testHandler({
            invokeId: "_THIS_ITEM_ID_FIELD_=value"
        }, env);

        dc.j(result, "Test result");
        env.log.displayAll();

        expect(result.ok).to.be.false;
        expect(result.errorMsg[0]).to.deep.equal("Aggregate [parent] not exists");
    });


});
