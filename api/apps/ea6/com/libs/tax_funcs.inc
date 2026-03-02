//define('DRUPAL_ROOT', getcwd());

require("./includes/bootstrap.inc");

drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

function update_cck_terms(nid, node_type, cck_field, new_value) //To develop
//Update a node
//$node = new stdClass(); // Create a new node
//YOUR CODE HERE
//...
//YOUR CODE HERE
//Auto Node Title
{
    var node = node_load(nid);
    node = node_submit(node);
    node_save(node);
    auto_nodetitle_set_title(node);
    node_save(node);
};

function cck_update_taxo(nid, field_name, term_name) //
//add checking
//1. If the term name exists
//2. If the field is capable of holding the type[vocabulary] of the term
//
//
{
    var node = node_load(nid);
    var tx = taxonomy_get_term_by_name(term_name);
    var tempTid = 0;

    if (undefined !== node[field_name]) {
        var x = node[field_name];
        {
            let _tmp_0 = x[0];

            for (var xkey in _tmp_0) {
                var xval = _tmp_0[xkey];
                tempTid = xkey;
            }
        }
        delete node.taxonomy[tempTid];
    }

    node.taxonomy[tx[0].tid] = tx[0];
    var taxArr = Array();

    for (var nodekey in node) {
        var keyval = node[nodekey];

        if (strpos(nodekey, "field_") !== false) {
            for (var primary of Object.values(node[nodekey])) {
                for (var seckey in primary) {
                    var secondary = primary[seckey];

                    if (undefined !== secondary.tid) {
                        taxArr[nodekey].tid = secondary.tid;
                        taxArr[nodekey].vid = secondary.vid;
                    }
                }
            }
        }
    }

    delete node[field_name];
    node[field_name] = {
        0: {
            value: tx[0].tid
        }
    };
    delete taxArr[field_name];

    for (var taxkey in taxArr) {
        var taxVal = taxArr[taxkey];
        delete node[taxkey];
        node[taxkey] = {
            0: {
                value: taxVal.tid
            }
        };
    }

    node_save(node);
    drupal_set_message("Node updated successfully", "status");
};

function cck_update_taxonomy(nid, field_name, term_name) //echo "<pre>";
//    print_r($node);
//    echo "</pre>";
//$node = node_submit($node);
//resetTitle($nid);
{
    var node = node_load(nid);
    var counter = 0;

    for (var keyname in field_name) {
        var valname = field_name[keyname];
        var tx = taxonomy_get_term_by_name(term_name[counter]);
        var tempTid = 0;

        if (undefined !== node[field_name][counter]) //print_r($x);
            {
                var x = node[field_name][counter];

                for (var xkey in x) {
                    var xval = x[xkey];
                    tempTid = xkey;
                }

                delete node.taxonomy[tempTid];
            }

        node.taxonomy[tx[0].tid] = tx[0];
        var taxArr = Array();

        for (var nodekey in node) {
            var keyval = node[nodekey];

            if (strpos(nodekey, "field_") !== false) {
                for (var primary of Object.values(node[nodekey])) {
                    for (var seckey in primary) {
                        var secondary = primary[seckey];

                        if (undefined !== secondary.tid) {
                            taxArr[nodekey].tid = secondary.tid;
                            taxArr[nodekey].vid = secondary.vid;
                        }
                    }
                }
            }
        }

        delete node[field_name][counter];
        node[field_name][counter] = {
            [tx[0].tid]: {
                value: tx[0].tid
            }
        };
        delete taxArr[field_name[counter]];

        for (var taxkey in taxArr) {
            var taxVal = taxArr[taxkey];
            delete node[taxkey];
            node[taxkey] = {
                [taxVal.tid]: {
                    value: taxVal.tid
                }
            };
        }

        counter++;
    }

    auto_nodetitle_set_title(node);
    node_save(node);
    drupal_set_message("Node updated successfully", "status");
};
