//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Process Sql Class (Database Structure 02) [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- db_set_all_array_fields        :
//- db_process_all_fields    :
//- db_set_all_menu_names        :
//- db_set_array_fields  :
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Ul class
//Menus
//Fields
class process_sql_02 extends sql_02 {
    constructor(node_id) //El constructor debe cargar las propiedades del archivo
    //parent::__construct($node_id);
    {
        this.node_id = node_id;
        this.create_db_queries_02();
        this.create_sql_id();
        this.db_process_all_fields();
    }

    db_set_all_array_fields() //Process Database Arrays (sql - field)
    //Reload arrays with fields
    //$puting_contents='SQL::001 - Sql Name - ' . $this->name  . ':' .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //$puting_contents='SQL::001 - count Sql  - ' . count($this->field_name)  . ':' .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
        this.db_set_array_fields(this.name, this.field_name);
        this.db_set_array_fields(this.color, this.field_color);
        this.db_set_array_fields(this.foto_fid, this.field_img_fid);
        this.db_set_array_fields(this.view_name, this.field_view_name);
        this.db_set_array_fields(this.view_args, this.field_view_args);
    }

    db_set_all_menu_names() //$puting_contents='SQL ID :: ' . $this->exist_id .':' .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //End If Else
    {
        var query_exist_id = mysql_query(this.exist_id);

        if (!query_exist_id) {
            throw die("Invalid query: " + mysql_error());
        } else //End While
            {
                var rowSet;

                while (rowSet = mysql_fetch_array(query_exist_id)) //With DB Sructures 01 : 196 records
                //Accesing content rowSet we get $rowSet[field_name_mnu_01_value] : Left_Vertical
                //We get tuples :  field_view_mnu_01_vargs-[field_tematica_articulo-term],p01:
                //With DB Sructures 02 : 4 records
                //Accesing content rowSet we get white string
                //We get tuples :
                //SELECT `field_name_mnu_01_value` FROM `content_field_name_mnu_01` where `nid`=172
                //Field name es un array de tablas a las que vamos a hacer query
                //menu es un array de resultados
                {
                    var nid = rowSet[nid];
                    var vid = rowSet[vid];
                    this.foreach_array_02(this.field_name, nid, this.menu_name);
                    this.foreach_array_02(this.field_color, nid, this.menu_color);
                    this.foreach_array_02(this.field_img_fid, nid, this.menu_img_fid);
                    this.foreach_array_02_view(this.field_view_name, nid, this.menu_view_name);
                    this.foreach_array_02_varg(this.field_view_args, nid, this.menu_view_args);
                }
            }
    }

    db_process_all_fields() //End If
    {
        this.db_set_all_array_fields();
        var query_int = mysql_query(this.exist_id);

        if (!query_int) {
            throw die("Invalid query: " + mysql_error());
        } else {
            this.db_set_all_menu_names();
        }
    }

};

