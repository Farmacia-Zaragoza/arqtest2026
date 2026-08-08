//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Sql Queries Class (Database Structure 02) [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- get_sql_num_columns  : Method to know if is database model 01 or 02
//- create_sql_id        : Create main SQL query Drupal Node ID related
//- create_db_queries_02 : Create Queries for Database Structure 02
//- foreach_array_02     : Foreach Array for  Database Structure 02
//- db_set_array_fields  : Set arrat fields for both database structures
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Drupal NID Node Id
//Database queries
//Full content of html object or other code
//Dinamic SQL of current node_id
//Function to make foreach
//Function to make foreach
//Function to make foreach
//No funciona - It's not working correctly
class sql_02 {
  constructor(node_id = "") {
    this.node_id = "";
    this.code = "";
    this.exist_id = "";
    this.general = "";
    this.name = "";
    this.color = "";
    this.foto_fid = "";
    this.view_name = "";
    this.view_args = "";
    this.node_id = node_id;
  }

  get_sql_num_columns(table_name = "") //Get current drupal database
  //$puting_contents='DB:: : ' . $activeDBName .  '>' ;
  //$GLOBALS['putcont'].=$puting_contents;
  //'content_type_supermnu'
  //$puting_contents='SLC:: Query : ' . $query_str .  '>' ;
  //$GLOBALS['putcont'].=$puting_contents;
  {
    var rowSet;
    var activeDBName = db_result(db_query("select database()"));
    var num_columns = "";
    var str = "";
    str += "SELECT COUNT( * ) ";
    str += "FROM information_schema.columns ";
    str += "WHERE table_name = '" + table_name + "' ";
    str += "AND table_schema = '" + activeDBName + "'";
    var query = mysql_query(str);

    if (rowSet = mysql_fetch_array(query)) {
      num_columns = rowSet[0];
    }

    return num_columns;
  }

  create_db_queries_02() //I think is the same for both databases
  //field_foto_mnu_01_fid field_foto_mnu_02_fid
  //SQL to query fields Name ( is not used )
  //$exist_id="select * from content_type_supermnu  where nid='$node_id'";
  //IS not used
  //$foto_title = $general . "'field_foto_mnu_0%_title' ";
  //$foto_title .= "or Field like 'field_foto_mnu_%%_title' ";
  {
    this.general = "SHOW TABLES LIKE ";
    this.name = this.general + "'%field_name_mnu_%' ";
    this.color = this.general + "'%field_colour_mnu_%'";
    this.foto_fid = this.general + "'%field_foto_mnu_%' ";
    this.view_name = this.general + "'%field_view_mnu_%' ";
    this.view_args = this.general + "'%field_view_mnu_%' ";
  }

  create_sql_id() //In database structure 01 get :
  //vid nid field_border_colour_mnu_value field_colour_mnu_01_value
  //745 623   D1DADB                         D7DBD1
  //In database structure 02 get only :
  //vid nid
  //745 623
  {
    this.exist_id = "select * from content_type_supermnu  where nid='" + this.node_id + "'";
  }

  foreach_array_02(tables_name, nid, output_array_int) //SELECT `field_name_mnu_01_value` FROM `content_field_name_mnu_01` where `nid`=172
  //$query_exist_id = mysql_query($this->exist_id);
  //give me invalid argument
  //$puting_contents='SLC:: Starting Foreach' . ':' .  '>' ;
  //$GLOBALS['putcont'].=$puting_contents;
  //Is needed to create a new array
  //$output_array_int = array();
  //End Foreach
  {
    output_array_int = Array();

    for (var table_name of Object.values(tables_name)) //Database structure 01
    //Devuelve tuplas : menus_int - Valor
    //field_view_mnu_01_vargs-[field_tematica_articulo-term],p01:
    //Database structure 02
    //Devuelve tuplas : menus_int
    //content_field_name_mnu_01
    //$puting_contents='SLN:: Query : ' . $query_str .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
      var rowSet;
      var field_name = this.get_last_occurences(table_name);
      if (preg_match("/name/", field_name)) field_name += "_value";else if (preg_match("/colour/", field_name)) field_name += "_value";else if (preg_match("/foto/", field_name)) field_name += "_fid";
      var query_str = "SELECT " + field_name + " FROM " + table_name + " where nid=" + nid;
      var query = mysql_query(query_str);

      if (rowSet = mysql_fetch_array(query)) {
        output_array_int.push(rowSet[field_name]);
      }
    }
  }

  foreach_array_02_view(tables_name, nid, output_array_int) //Is needed to create a new array
  {
    output_array_int = Array();

    for (var table_name of Object.values(tables_name)) //$puting_contents='SLV:: Query : ' . $query_str .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
      var rowSet;
      var field_name = this.get_last_occurences(table_name);
      var field_name_view = field_name + "_vname";
      var query_str = "SELECT " + field_name_view + " FROM " + table_name + " where nid=" + nid;
      var query = mysql_query(query_str);

      if (rowSet = mysql_fetch_array(query)) {
        output_array_int.push(rowSet[field_name_view]);
      }
    }
  }

  foreach_array_02_varg(tables_name, nid, output_array_int) //Is needed to create a new array
  {
    output_array_int = Array();

    for (var table_name of Object.values(tables_name)) //$puting_contents='SLC:: Query Args : ' . $query_str .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
      var rowSet;
      var field_name = this.get_last_occurences(table_name);
      var field_name_args = field_name + "_vargs";
      var query_str = "SELECT " + field_name_args + " FROM " + table_name + " where nid=" + nid;
      var query = mysql_query(query_str);

      if (rowSet = mysql_fetch_array(query)) {
        output_array_int.push(rowSet[field_name_args]);
      }
    }
  }

  db_set_array_fields(sql_pasado, field_name_int) //$sqlc = "SHOW COLUMNS FROM content_type_supermnu where Field like 'field_colour_mnu_0%_value'
  //$field_name_int = array() ;
  {
    var row_int;
    var result_int = mysql_query(sql_pasado);

    while (row_int = mysql_fetch_array(result_int)) //Partinos de la estructura : Database Structure 01
    //[Field] Type  Null  Key Default Extra
    //field_name_mnu_01_value longtext  YES   NULL
    //Database Structure 02
    //We have : content_field_name_mnu_01
    {
      field_name_int.push(row_int[0]);
    }
  }

  printResultSet(rowset, i) {
    for (var row of Object.values(rowset)) {
      for (var col of Object.values(row)) {
        var puting_contents = "SQL Rset :: " + col + ":" + ">";
        GLOBALS.putcont += puting_contents;
      }
    }
  }

  __get(property) {
    if (this in property) {
      return this[property];
    }
  }

  __set(var, valor) {
    if ("sql_02___set" in var) {
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

  get_last_occurences(str_in) //We have : field_name_mnu_01_value
  //We search    field_name_mnu_01
  {
    var sep_int = "_";
    var string_sep = "/[" + sep_int + "]+/";
    var split_arr = preg_split(string_sep, str_in);
    var len_arr = split_arr.length;
    var clean_str_int = "";
    var c = 1;

    while (c < len_arr) //echo 'adding - ' . $c . ' : ' .  $split_arr[$c] . "- \n";
    {
      clean_str_int += split_arr[c];
      c++;
      if (c < len_arr) clean_str_int += "_";
    }

    return clean_str_int;
  }

};

