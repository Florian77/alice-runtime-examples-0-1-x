const dc = require("node-dev-console");
const expect = require('chai').expect;
const aliceTestEnv = require("alice-runtime/test-environment");
const testHandler = require('./handler');

dc.activate();


describe('app/_THIS_CONTEXT_/state/cmd/makeAggregate/handler', function () {

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
    it('error: Empty event stream', async function () {
        const env = aliceTestEnv.commandTestEnvironment();

        const result = await testHandler({
            invokeId: "journalId=100"
        }, env);

        dc.j(result, "Test result");
        env.log.displayAll();

        expect(result.ok).to.be.false;
        expect(result.errorMsg[0]).to.deep.equal("Empty event stream");
    });


});
