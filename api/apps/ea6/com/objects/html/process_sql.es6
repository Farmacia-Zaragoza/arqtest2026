//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Process Sql Class (Database Structure 01) [V.0.0.1]  (2016-02-18)
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
class process_sql extends sql {
    constructor(node_id) //El constructor debe cargar las propiedades del archivo
    //parent::__construct($node_id);
    {
        this.node_id = node_id;
        this.create_db_queries();
        this.create_sql_id();
        this.db_process_all_fields();
    }

    db_set_all_array_fields() //Process Database Arrays (sql - field)
    //Reload arrays with fields
    //$puting_contents='Proces:Select Name- '. $this->name .   '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //$puting_contents='Proces:Select View- '. $this->view_name .   '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //$puting_contents='Proces:Select Args- '. $this->view_args .   '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
        this.db_set_array_fields(this.name, this.field_name);
        this.db_set_array_fields(this.color, this.field_color);
        this.db_set_array_fields(this.foto_fid, this.field_img_fid);
        this.db_set_array_fields(this.view_name, this.field_view_name);
        this.db_set_array_fields(this.view_args, this.field_view_args);
    }

    db_set_all_menu_names() //$puting_contents='Proces::Query - ' . $this->exist_id . ':' .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //End If Else
    //Mitad de elementos
    {
        var query_exist_id_arr = mysql_query(this.exist_id);

        if (!query_exist_id_arr) {
            throw die("Invalid query: " + mysql_error());
        } else //$puting_contents='Proces::001 - count arr - ' . count($query_exist_id_arr) . ':' .  '>' ;
            //$GLOBALS['putcont'].=$puting_contents;
            //End While
            {
                var rowSet_externo;

                while (rowSet_externo = mysql_fetch_array(query_exist_id_arr)) //Must return only 1 row
                //Pass Select recover menu
                //$puting_contents='SQL: menu:' . $this->menu_name[0] . '>' ;
                //$GLOBALS['putcont'].=$puting_contents;
                {
                    this.foreach_array(this.field_name, rowSet_externo, this.menu_name);
                    this.foreach_array(this.field_color, rowSet_externo, this.menu_color);
                    this.foreach_array(this.field_img_fid, rowSet_externo, this.menu_img_fid);
                    this.foreach_array(this.field_view_name, rowSet_externo, this.menu_view_name);
                    this.foreach_array(this.field_view_args, rowSet_externo, this.menu_view_args);
                }
            }
    }

    db_process_all_fields() //End If
    //We retugn rowSet_result
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
