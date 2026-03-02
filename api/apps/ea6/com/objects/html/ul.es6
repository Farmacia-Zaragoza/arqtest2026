//------------------------------------------------------------------------------------------------
//SuperMnu Html Structure
//------------------------------------------------------------------------------------------------
//DIV_01
//NAV_01
//  UL_01
//HID_01 - START REPEAT
//LI_01  - START REPEAT
//A_01
//DIV_02
//DIV_03
//DIV_04
//IMG_02
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html UL (Database Structure 01)  Class  [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- reload_contents  : Reload field attributes
//- load_file        : Load dat file from system
//- build_contents   : Build html final code for object
//- create_hidden_01 : Create hidden dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Objects
//Ul class
//Fields
//Class for slides less than half menu
//Class for slides less than half menu
//If width Js code branch
//Else width Js code branch
//End Build Contents
class ul extends html_style {
    constructor(file_in = "", node = "", screen_width = "", process = "", slide_left_class = "", slide_right_class = "") //El constructor debe cargar las propiedades del archivo
    //$puting_contents='UL :Node Id - ' . $this->node->id .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //build Ul object
    //parent::__construct($this->tag_type , $this->tag_name  , $this->class , $this->style , $this->id);
    {
        this.js_block = "";
        this.js_code = "";
        this.js_code_if = "";
        this.js_code_el = "";
        this.num_elements_menu = "";
        this.tag_type = "ul";
        this.input_file = file_in;
        this.node = node;
        this.load_file();
        this.reload_contents(screen_width, process, slide_left_class, slide_right_class);
    }

    reload_contents(screen_width = "", process = "", slide_left_class = "", slide_right_class = "") //El constructor debe cargar las propiedades del archivo
    {
        this.screen_width = screen_width;
        this.process = process;
        this.slide_left_half = slide_left_class;
        this.slide_right_half = slide_right_class;
    }

    load_file() //El constructor debe cargar las propiedades del archivo
    {
        if (this.input_file != "") //Hay que iterar el array obteniendo los datos
            {
                var contents = file(this.input_file);

                for (var sLinea of Object.values(contents)) //Cada linea tiene el formato
                //htmlname    @    class    @    style    @   id
                //El separador debe serl la arroba pues las clases css tienen dos puntos y almoadillas
                //Habra que estar muy atento a estos valores
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

                    if (name == "ul_01") //Auto load properties
                        {
                            this.reload("ul", name, class, style, id);
                        }

                    if (name == "li_01") {
                        this.li_01 = new li(this.input_file, this.node);
                        this.li_01.reload("li", name, class, style, id);
                    }

                    if (name == "hidden_01") this.hidden_01 = new html_style("hidden", name, class, style, id);
                }
            }
    }

    create_hidden_01(slide_name = "") //Create Hidden
    //$puting_contents='ul :hidden: - ' . $this->hidden_01->code . ' : ' .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
        this.hidden_01.code = "";
        this.hidden_01.prepare();
        this.hidden_01.f_name = "kk";
        this.hidden_01.f_id = slide_name + "-kk";
        this.hidden_01.f_value = slide_name;
        this.hidden_01.create();
        this.content += this.hidden_01.code;
    }

    js_screen_create() {
        var str = "<script>";
        str += "var width=screen.width;";
        str += "if(width<=" + this.screen_width + "){" + "\n";
        str += this.js_code_if;
        str += "} ";
        str += "else {";
        str += this.js_code_el;
        str += "}";
        str += "</script>";
        this.js_code = str;
    }

    create_js_block(slide_name) //Create JS Block (must be placed after code generation)
    //Create If and else branch fro Js Block
    {
        this.js_block = new js_style();
        this.js_block.name = slide_name + "-kk";
        this.js_block.width = this.screen_width;
        this.js_block.js_screen_script_create();
        this.js_code += this.js_block.js_code;
    }

    create_js_block_fully(slide_name) //Create JS Block (must be placed after code generation)
    //Create If and else branch fro Js Block
    {
        this.js_block = new js_style();
        this.js_block.name = slide_name + "-kk";
        this.js_block.width = this.screen_width;
        this.js_block.js_screen_create_if_else();
        this.js_code_if += this.js_block.js_code_if;
        this.js_code_el += this.js_block.js_code_el;
    }

    build_contents() //Clean al JS Code
    //end for
    //Method to debug - disabling dinamic generation code
    ////    $this->code = $this->content;
    //$puting_contents='UL: code:' . $this->code . '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    ////      $this->code       .=    $this->js_code;
    //Create al JS Code
    {
        this.code = "";
        this.js_code = "";
        this.num_elements_menu = this.process.menu_color.length;
        var half = num_elements_menu / 2;

        for (var slide_num = 0; slide_num < this.num_elements_menu; slide_num++) //Is needed to have an string slide num for comparations
        //Remove Strings in slide name
        //Set Slide class
        //'cbp-hrsub';
        //Create Hidden
        {
            var slide_name = this.process.menu_name[slide_num];
            var slide_color = this.process.menu_color[slide_num];
            var view_name = this.process.menu_view_name[slide_num];
            var view_args = this.process.menu_view_args[slide_num];
            var slide_img_fid = this.process.menu_img_fid[slide_num];
            slide_name = str_replace("\"", "", slide_name);
            slide_name = str_replace("'", "", slide_name);
            slide_name = str_replace(" ", "_", slide_name);
            if (slide_num < half) var class = this.slide_left_half;else class = this.slide_right_half;
            var puting_contents = "UL: Slide:" + slide_num + " : " + slide_name + ">";
            GLOBALS.putcont += puting_contents;
            this.create_hidden_01(slide_name);

            if (!!slide_name) //$puting_contents.='ul ::00' . $slide_name . ' - Start Build Tag 182 v1.03 - ' . $this->content  . ':' .  '>' ;
                //$GLOBALS['putcont'].=$puting_contents;
                //Empty code for every slide
                //Build both dhtml code and js code
                //Insertamos el codigo Js en la generacion del tag LI
                //Better Create If an Else branch
                //$this->create_js_block($slide_name);
                {
                    this.li_01.content = "";
                    this.li_01.code = "";
                    this.li_01.reload_fields(slide_num, slide_name, view_name, view_args, slide_color, slide_img_fid, class, this.screen_width);
                    this.li_01.build_contents();
                    this.content += this.li_01.code;
                    this.create_js_block_fully(slide_name);
                }
        }

        this.prepare();
        this.create();
        this.js_screen_create();
    }

};
