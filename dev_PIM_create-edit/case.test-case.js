const dc = require("node-dev-console");
const expect = require('chai').expect;
const R = require('ramda');
const aliceTestEnv = require("alice-runtime/test-environment");
const alice = require("alice-runtime");
const triggerList = require("../../install_trigger_list");
const {resolve} = require("path");

dc.activate();


describe('dev PIM create edit', function () {

    this.timeout(0);
    const functionPath = resolve(__dirname, "../../app");

    // -----------------------------------------------------------------------------------------------------------------------------
    before(async () => {
        // aliceTestEnv.loadRuntimeConfig(__dirname, dc.or("test-case", "unit-test"));
        aliceTestEnv.loadRuntimeConfig(__dirname, "test-case");
        await aliceTestEnv.connect();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    after(async () => {
        await aliceTestEnv.disconnect();
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    beforeEach(async function () {
        dc.l("---------------", this.currentTest.title, "---------------");
        // await aliceTestEnv.clearDatabase({createIndexAfterClear: true});
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    it('prepare ENV', async function () {

        // todo -> delete context ???

        await aliceTestEnv.clearDatabase({createIndexAfterClear: true});

        dc.l("----------");
        dc.l("TRIGGER:");
        dc.l("----------");
        const useTriggerList = R.filter(
            R.complement(R.propEq("context", "AKENEO")),
            triggerList
        );
        // dc.j(useTriggerList, "useTriggerList");
        // return;
        for (const _MODULE of useTriggerList) {
            try {
                const result = await alice.createTrigger(_MODULE);
                dc.l(
                    R.pipe(
                        R.pick(["type", "streamType", "context", "aggregate", "trigger"]),
                        R.values,
                        R.join("/")
                    )(result)
                );

            } catch (e) {
                // dc.l("ERROR: %s", e.message);
                console.error(e);
            }
        }
        dc.l("----------");

        const multiCommandList = [
            // {
            //     context: "EBAY",
            //     aggregate: "item",
            //     command: "ebayApiGetItem",
            //     invokeId: "sellerId=tectake24&itemId=261634303415",
            // },
            {
                context: "EBAY",
                aggregate: "item",
                command: "ebayApiGetItem",
                invokeId: "sellerId=tectake24&itemId=264868562952",
            },
            {
                context: "EBAY",
                aggregate: "item",
                command: "ebayApiGetItem",
                invokeId: "sellerId=tectake-austria&itemId=174471339456",
            },
            // {
            //     context: "AKENEO",
            //     aggregate: "import",
            //     command: "attributeList",
            //     invokeId: "",
            //     priority: 290,
            // },
            // {
            //     context: "AKENEO",
            //     aggregate: "import",
            //     command: "familyList",
            //     invokeId: "option=filter&filterCodeList=bike_panniers",
            //     priority: 290,
            // },
            // {
            //     context: "AKENEO",
            //     aggregate: "import",
            //     command: "productList",
            //     invokeId: "option=sku&sku=401003",
            //     priority: 250,
            // },
            // {
            //     context: "AKENEO",
            //     aggregate: "import",
            //     command: "productModelList",
            //     invokeId: "option=search",
            //     payload: {
            //         search: {"family": [{"operator": "IN", "value": ["bike_panniers"]}]}
            //     },
            //     priority: 250,
            // },
        ];
        dc.l("MULTI COMMAND:");
        dc.l("----------");
        for (const command of multiCommandList) {
            try {
                const result = await alice.emitMultiCommand(command);
                dc.l(
                    R.pipe(
                        R.pick(["context", "aggregate", "command", "invokeId"]),
                        R.values,
                        R.join("/")
                    )(result)
                );
            } catch (e) {
                // dc.l("ERROR: %s", e.message);
                console.error(e);
            }
        }
        dc.l("----------");
        await alice.process({functionPath});

    });

    // -----------------------------------------------------------------------------------------------------------------------------
    it('update item', async function () {

        await alice.emitMultiCommand({
            context: "EBAY",
            aggregate: "listing",
            command: "setData",
            invokeId: "sellerId=auktionberlin2013&sku=401002-x-103",
            payload: {
                format: "ebayXML",
                data: {
                    StartPrice: 53.78,
                    Quantity: 2,

                },
            }
        });
        await alice.process({functionPath});

    });


});
