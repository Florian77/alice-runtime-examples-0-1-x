const dc = require("node-dev-console");
const expect = require('chai').expect;
const aliceTestEnv = require("alice-runtime/test-environment");
const alice = require("alice-runtime");
const {resolve} = require("path");

dc.activate();


describe('test case name 1', function () {

    this.timeout(0);
    const functionPath = resolve(__dirname, "../../app");

    // -----------------------------------------------------------------------------------------------------------------------------
    before(async () => {
        aliceTestEnv.loadRuntimeConfig(__dirname, dc.or("test-case", "unit-test"));
        await aliceTestEnv.connect();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    after(async () => {
        await aliceTestEnv.disconnect();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    beforeEach(async function () {
        dc.l("---------------", this.currentTest.title, "---------------");
        await aliceTestEnv.clearDatabase({createIndexAfterClear: true});
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    it('happy path', async function () {
        const env = aliceTestEnv.commandTestEnvironment();

        // insert AKENEO description test data
        env.storeDataEvent(require("./data/AKENEO_output-description_401002_de_DE"));

        // download ebay item list (ebay:getSellerList)
        await env.emitMultiCommand({
            "context": "EBAY",
            "aggregate": "seller-list",
            "command": "getSellerList",
            "invokeId": "sellerId=auktionberlin2013",
            "payload": {
                "sellerId": "auktionberlin2013"
            }
        });
        await alice.process({functionPath});

        // download ebay item details (ebay:getItem)
        await alice.createDataTrigger(require("../../app/EBAY/item/tgr/sellerListItem/module"));
        await alice.process({functionPath});

        // compose description
        await alice.createDataTrigger(require("../../app/EBAY/description/tgr/item/module"));
        await alice.process({functionPath});

        // upload new description to ebay (reviseItem)
        await alice.createDataTrigger(require("../../app/EBAY/description-update/tgr/description/module"));
        await alice.process({functionPath});

        // unpause updateEbayDescription command
        await alice.updateOneCommand({
            context: "EBAY",
            aggregate: "description-update",
            command: "updateEbayDescription",
            invokeId: "sellerId=auktionberlin2013&itemId=254569889664",
        }, {
            paused: false
        });
        await alice.process({functionPath});

        // check description composition
        {
            const dataEvent = await env.getLastDataEvent({
                context: "EBAY",
                aggregate: "description",
                aggregateId: "sellerId=auktionberlin2013&itemId=254569889664"
            });
            dc.j(dataEvent, "description dataEvent");
            expect(dataEvent.payload).to.be.deep.equal(require("./data/result-description-payload"))
        }

        // check ebay api description upload
        {
            const dataEvent = await env.getLastDataEvent({
                context: "EBAY",
                aggregate: "description-update",
                aggregateId: "sellerId=auktionberlin2013&itemId=254569889664"
            });
            dc.j(dataEvent, "description-update dataEvent");
            expect(dataEvent.payload.ebayAck).to.be.equal("Success");
        }


    });


});
