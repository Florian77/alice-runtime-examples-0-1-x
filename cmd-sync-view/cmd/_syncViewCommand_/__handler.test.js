// -------------------------------------------------------------------------
// ALICE-RUNTIME:TEMPLATE:cmd-sync-view:VERSION:0.1.0
// -------------------------------------------------------------------------
const dc = require("node-dev-console");
const expect = require('chai').expect;
const aliceTestEnv = require("alice-runtime/test-environment");
const testHandler = require('./handler');

dc.activate();


describe('app/_THIS_CONTEXT_/_THIS_AGGREGATE_/cmd/_syncViewCommand_/handler', function () {

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
    it('insert data', async function () {
        const env = aliceTestEnv.commandTestEnvironment();
        await env.storeDataEvent(require("./test-data/item-123456"));
        env.log.clear();

        const result = await testHandler({
            invokeId: "_THIS_ITEM_ID_FIELD_=value"
        }, env);

        dc.j(result, "Test result");
        env.log.displayAll();

        const documentCountAfter = await env.getCollectionView("_VIEW_NAME_").countDocuments({});
        dc.j(documentCountAfter, "documentCountAfter");
        expect(documentCountAfter).to.be.equal(1);
        expect(result.ok).to.be.true;
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    it('delete data', async function () {
        const env = aliceTestEnv.commandTestEnvironment();
        await env.getCollectionView("_VIEW_NAME_").insertOne({
            _id: "value",
        });
        const documentCountBefore = await env.getCollectionView("_VIEW_NAME_").countDocuments({});
        dc.j(documentCountBefore, "documentCountBefore");
        expect(documentCountBefore).to.be.equal(1);

        const result = await testHandler({
            invokeId: "_THIS_ITEM_ID_FIELD_=value"
        }, env);

        dc.j(result, "Test result");
        env.log.displayAll();

        const documentCountAfter = await env.getCollectionView("_VIEW_NAME_").countDocuments({});
        dc.j(documentCountAfter, "documentCountAfter");
        expect(documentCountAfter).to.be.equal(0);
        expect(result.ok).to.be.true;
    });

});
