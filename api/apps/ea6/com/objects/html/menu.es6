//------------------------------------------------------------------------------------------------
//SuperMnu Html Structure
//------------------------------------------------------------------------------------------------
//DIV_01
//NAV_01
//UL_01
//HID_01 - START REPEAT
//LI_01  - START REPEAT
//A_01
//DIV_02
//DIV_03
//DIV_04
//IMG_02
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Menu Class  [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- load_file        : Load system dat file
//- build_contents   : Build SuperMnu object dhtml code
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Objects
//Fields
//Dat file for javascript static properties
//Dat file for dhtml static properties
//Class for slides less than half menu
//Class for slides less than half menu
class menu extends getset {
  constructor(num_menu = "", node_name = "", menu_name = "", supermnu_libs = "", slide_left_class = "", slide_right_class = "") //El constructor debe cargar las propiedades del archivo
  //$puting_contents='Menu :Node Id - ' . $this->node->id .  '>' ;
  //$GLOBALS['putcont'].=$puting_contents;
  //Load DB Architecture
  //$puting_contents='menu: Starting - Db Architecture- '. $this->db_architecture .   '>' ;
  //$GLOBALS['putcont'].=$puting_contents;
  //Must to create others html objects
  //$this->build_contents();
  {
    this.num_menu = num_menu;
    this.node_name = node_name;
    this.menu_name = menu_name;
    this.node = new node(this.node_name, this.menu_name);
    this.slide_left_half = slide_left_class;
    this.slide_right_half = slide_right_class;
    this.file_input_html = supermnu_libs + "dats/supermnu_" + this.num_menu + "_html.dat";
    this.file_input_js = supermnu_libs + "dats/supermnu_" + this.num_menu + "_js.dat";
    super();
    this.num_menu = "";
    this.node_name = "";
    this.menu_name = "";
    this.file_input_js = "";
    this.file_input_html = "";
    this.slide_left_half = "";
    this.slide_right_half = "";
    this.js_events_code = "";
    this.load_file();
  }

  load_file() //Load File - Create Objects
  {
    if (this.file_input_html != "") //Hay que iterar el array obteniendo los datos
      //End Foreach
      {
        var contents = file(this.file_input_html);

        for (var sLinea of Object.values(contents)) //Every line have following format :
        //htmlname    @    class    @    style    @   id
        //Separador must be "@" so styles have colon and pad
        //Obtiene el CN
        {
          var html_arr = sLinea.split("@");
          var name = html_arr[0].trim();
          var class = "";
          var style = "";
          var id = "";
          if (html_arr.length > 1) class = html_arr[1].trim();
          if (html_arr.length > 2) style = html_arr[2].trim();
          if (html_arr.length > 3) id = html_arr[3].trim();

          if (name == "div_01") //Auto load properties
            {
              this.div_01 = new div(this.file_input_html, this.node);
              this.div_01.reload("div", name, class, style, id);
            }
        }
      }
  }

  build_contents() //Build Menu Contents
  //$puting_contents='Menu :PreSql Id - ' . $this->node->id .  '>' ;
  //$GLOBALS['putcont'].=$puting_contents;
  //Create Dhtml Code
  //Create JS code
  //$puting_contents='Menu: Code' . $this->code   . '>' ;
  //$GLOBALS['putcont'].=$puting_contents;
  //We put JS Code at bottom
  {
    this.code = "";
    this.js_code = "";
    this.js_events_code = "";
    if (this.db_architecture == 2) this.process = new process_sql_02(this.node.id);else this.process = new process_sql(this.node.id);
    this.js_events = new js_events(this.file_input_js, this.node);
    this.div_01.reload_contents(this.js_events.screen.width, this.process, this.slide_left_half, this.slide_right_half);
    this.div_01.build_contents();
    this.code += this.div_01.code;
    this.js_events.create();
    this.js_events.document_ready_create();
    this.js_events_code = this.js_events.js_code;
    this.js_code = this.div_01.nav_01.ul_01.js_code;
    this.code += this.js_events_code;
    this.code += this.js_code;
  }

};
