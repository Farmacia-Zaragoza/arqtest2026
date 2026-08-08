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

