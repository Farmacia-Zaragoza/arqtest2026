//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Drupal View Class  [V.0.0.2]  (2016-11-11)
//------------------------------------------------------------------------------------
//Methods:
//- Create : Create Drupal view embed model
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Tag name of html object
//Example : node_id_one
class view extends getset {
  constructor(node_id = "", name = "", args = "", elements = "4") //Node ID to recheck field args
  //Views Name
  //Views Args string
  //Number of elements of view
  {
    this.name = "";
    this.args = "";
    this.node_id = "";
    this.elements = "";
    this.node_id = node_id;
    this.name = name;
    this.args = args;
    this.elements = elements;
    this.create();
  }

  create() //Clean fields
  //node_loaded is an array
  //View :Name - s21_ccp05_image_rnd
  //$puting_contents='View :Name - ' . $this->name .  '>' ;
  //$GLOBALS['putcont'].=$puting_contents;
  {
    this.code = "";
    this.args = str_replace("\"", "", this.args);
    this.args = str_replace("'", "", this.args);
    var vals = this.args.split(",");
    var c = 0;
    var tokenarray = Array();
    var node_loaded = node_load(this.node_id);

    for (var token of Object.values(vals)) {
      if (strstr(token, "[")) {
        tokenarray[c] = token_replace(token, "node", node_loaded);
      } else {
        tokenarray[c] = token;
      }

      c++;
    }

    this.args = tokenarray;
    this.view = views_get_view(this.name);
    this.code = views_build_view("embed", this.view, this.args, false, this.elements);
  }

};
