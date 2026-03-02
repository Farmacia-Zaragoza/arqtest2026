//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Drupal Node Class  [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- set_node_details        : Set all node details
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Full content of html object or other code
//Drupal NID - Node ID
//NID - Drupal Node ID
//SuperMnu String parameters
//Example : node_id_one
//Example : menu_name_one
//Drupal Node Load
//Drupal Node details class
class node {
    constructor(node_id_text = "", menu_name_text = "") //$puting_contents='Node:: Contruct : ' . $node_id_tex .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
        this.code = "";
        this.node_id = "";
        this.str_node_id = "";
        this.str_name_text = "";
        this.site_url = "";
        this.global_site_url = "";
        this.main_color = "";
        this.slides_color = "";
        this.border_color = "";
        this.str_node_id = node_id_text;
        this.str_name_text = menu_name_text;
        this.set_node_details();
    }

    set_node_details() //this is for global url (http://domain )
    //$this->site_url         = $base_url . '/';
    //Is needed to use relative url for images
    //this is for relative url  ( / )
    //$puting_contents='Node :Id - ' . $this->id . ' : '   . '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
        if (!("base_url" in global)) base_url = undefined;
        this.site_url = GLOBALS.base_path;
        this.global_site_url = base_url;
        this.node_id = variable_get(this.str_node_id, "");
        this.menu_name_text = variable_get(this.str_name_text, "");
        this.details = node_load(this.node_id);
        this.slides_color = this.details.field_slides_colour_mnu[0].value;
        this.main_color = this.details.field_main_colour_mnu[0].value;
        this.border_color = this.details.field_border_colour_mnu[0].value;
    }

    __get(property) {
        if (this in property) {
            return this[property];
        }
    }

    __set(var, valor) {
        if ("node___set" in var) {
            this[var] = valor;
        } else {
            echo(`No existe el atributo ${var}.`);
        }
    }

    show() {
        echo(this.code);
    }

    shon() {
        echo(this.code + "\n");
    }

};
