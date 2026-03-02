//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Sql Queries Class (Database Structure 01) [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- create_sql_id        : Create main SQL query Drupal Node ID related for both structures
//- create_db_queries    : Create Queries for Database Structure 01
//- foreach_array        : Foreach Array for  Database Structure 01
//- db_set_array_fields  : Set arrat fields for both database structures
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Drupal NID Node Id
//Database queries
//Full content of html object or other code
//Dinamic SQL of current node_id
//Function to make foreach
class sql {
  constructor(node_id) {
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

  create_db_queries() //SQL to query fields Name ( is not used )
  //$exist_id="select * from content_type_supermnu  where nid='$node_id'";
  //IS not used
  //$foto_title = $general . "'field_foto_mnu_0%_title' ";
  //$foto_title .= "or Field like 'field_foto_mnu_%%_title' ";
  {
    this.general = "SHOW COLUMNS FROM content_type_supermnu where Field like ";
    this.name = this.general + "'field_name_mnu_0%_value' ";
    this.name += "or Field like 'field_name_mnu_%%_value' ";
    this.color = this.general + "'field_colour_mnu_0%_value'";
    this.color += " or Field like 'field_colour_mnu_%%_value' ";
    this.foto_fid = this.general + "'field_foto_mnu_0%_fid' ";
    this.foto_fid += "or Field like 'field_foto_mnu_%%_fid' ";
    this.view_name = this.general + "'field_view_mnu_0%_vname' or Field like 'field_view_mnu_%%_vname' ";
    this.view_args = this.general + "'field_view_mnu_0%_vargs' or Field like 'field_view_mnu_%%_vargs' ";
  }

  create_sql_id() {
    this.exist_id = "select * from content_type_supermnu  where nid='" + this.node_id + "'";
  }

  foreach_array(field_name_int, rowSet_int, output_array_int) //don't work
  //$this->empty_array($output_array_int)      ;
  //Is needed to create a new array
  {
    output_array_int = Array();

    for (var menus_int of Object.values(field_name_int)) {
      output_array_int.push(rowSet_int[menus_int]);
    }
  }

  db_set_array_fields(sql_pasado, field_name_int) //$sqlc = "SHOW COLUMNS FROM content_type_supermnu where Field like 'field_colour_mnu_0%_value'
  {
    var row_int;
    var result_int = mysql_query(sql_pasado);

    while (row_int = mysql_fetch_array(result_int)) {
      field_name_int.push(row_int.Field);
    }
  }

  empty_array(array_pased) {
    for (var i of Object.values(array_pased)) {
      delete array_pased[i];
    }
  }

  __get(property) {
    if (this in property) {
      return this[property];
    }
  }

  __set(var, valor) {
    if ("sql___set" in var) {
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
