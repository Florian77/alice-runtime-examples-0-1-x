const dc = require("node-dev-console");
const expect = require('chai').expect;
const R = require("ramda");

dc.activate();

const {
    reduceJournal,
    defaultState,
} = require('../reduce-journal');


describe('app/_THIS_CONTEXT_/_lib/reduce-journal', function () {

    // -----------------------------------------------------------------------------------------------------------------------------
    beforeEach(async function () {
        dc.l("---------------", this.currentTest.title, "---------------");
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    it('missing reducer for given event', function () {
        try {
            reduceJournal([
                require("./event/_NotExistingEventType.json"),
            ]);
        } catch (e) {
            dc.j(e.message, "caught error:");
            expect(e.message).to.be.equal("reducer for event [NotExistingEventType] missing");
        }
    });


    // -----------------------------------------------------------------------------------------------------------------------------
    it('empty event list, default order state', function () {
        const result = reduceJournal([]);
        dc.j(result, "test result");
        expect(result).to.be.deep.equal(defaultState);
    });


    // -----------------------------------------------------------------------------------------------------------------------------
    it('happy path of Created', function () {
        const result = reduceJournal([
            require("./event/Created.json"),
        ]);
        dc.j(result, "test result");
        expect(result).to.be.deep.equal(
            R.mergeRight(defaultState, require("./result/Created.json"))
        );
    });

    // -----------------------------------------------------------------------------------------------------------------------------
    it('Created is not first event', function () {
        // todo -> implement
    });


});
