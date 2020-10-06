const context = "PRODUCT";
const aggregate = "master-data-entity";

const entityId = {
    fieldList: [
        {
            code: "sku"
        }
    ],
};

const entityValue = {
    fieldList: [
        {
            code: "name",
            type: "pim_catalog_text",
        },
        {
            code: "shipping_carrier",
            type: "pim_catalog_simpleselect", // pim_catalog_simpleselect -> GLS / Spedition
            default: "GLS",
            valueList: [
                "GLS",
                "DHL",
                "Spedition",
            ]
        },
        {
            code: "package_count",
            type: "pim_catalog_simpleselect",
            default: 1,
            valueList: [
                1,
                2,
                3,
            ]
        },
        {
            code: "package_1_name",
            type: "pim_catalog_text",
        },
        {
            code: "package_1_individual_shipping",
            type: "pim_catalog_boolean",
        },
        {
            code: "package_2_name",
            type: "pim_catalog_text",
        },
        {
            code: "package_2_individual_shipping",
            type: "pim_catalog_boolean",
        },
        {
            code: "package_3_name",
            type: "pim_catalog_text",
        },
        {
            code: "package_3_individual_shipping",
            type: "pim_catalog_boolean",
        },
    ]
};

const calcCompleteness = (item) => {
    if(item.package_count) {

    }
    return 90;
}


module.exports = {
    context,
    aggregate,
    entityId,
    entityValue,
};
