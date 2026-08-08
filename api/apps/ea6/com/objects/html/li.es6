//------------------------------------------------------------------------------------------------
//SuperMnu Html Structure
//------------------------------------------------------------------------------------------------
//DIV_01
//NAV_01
//UL_01
//HID_01 - START REPEAT
//   LI_01  - START REPEAT
//A_01
//DIV_02
//DIV_03
//IMG_01
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html LI  Class  [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- reload_fields  : Reload field attributes
//- load_file      : Load dat file from system
//- build_contents : Build html final code for object
//- create_a_01    : Crate A dhtml link object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Objects
//block js of slide
//Drupal Node object
//Drupal Node related
//Html subclass
//Fields
//Color of slide
//Background color of slide
//Border background of Slide
//Image of slide
//Load file for Li styles && contents
//Class used in tags
class li extends html_style {
    constructor(file_in = "", node = "", slide_num = "", slide_name = "", view_name = "", view_args = "", slide_color = "", slide_img_fid = "", slide_class = "", screen_width = "") //El constructor debe cargar las propiedades del archivo
    //$puting_contents.='li :Node:Id - ' . $this->node->id .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
        this.js_block = "";
        this.slide_num = "";
        this.tx_slide_num = "";
        this.slide_name = "";
        this.view_name = "";
        this.view_args = "";
        this.color = "";
        this.bkcolor = "";
        this.border_bk = "";
        this.img_fid = "";
        this.input_file = "";
        this.slide_class = "";
        this.screen_width = "";
        this.tag_type = "li";
        this.input_file = file_in;
        this.node = node;
        this.load_file(file_in);
        this.reload_fields(slide_num, slide_name, view_name, view_args, slide_color, slide_img_fid, slide_class, screen_width);
    }

    reload_fields(slide_num = "", slide_name = "", view_name = "", view_args = "", slide_color = "", slide_img_fid = "", slide_class = "", screen_width = "") //El constructor debe cargar las propiedades del archivo
    {
        this.slide_num = slide_num;
        this.tx_slide_num = "" + slide_num;
        this.slide_name = slide_name;
        this.view_name = view_name;
        this.view_args = view_args;
        this.color = slide_color;
        this.img_fid = slide_img_fid;
        this.slide_class = slide_class;
        this.screen_width = screen_width;
    }

    load_file() //El constructor debe cargar las propiedades del archivo
    {
        if (this.input_file != "") //Hay que iterar el array obteniendo los datos
            //End foreach
            {
                var contents = file(this.input_file);

                for (var sLinea of Object.values(contents)) //Cada linea tiene el formato
                //htmlname    @    class    @    style    @   id
                //El separador debe serl la arroba pues las clases css tienen dos puntos y almoadillas
                //Habra que estar muy atento a estos valores
                //Obtiene el CN
                //echo "Len Array: " . count($html_arr) . "\n";
                {
                    var html_arr = sLinea.split("@");
                    var name = html_arr[0].trim();
                    var class = "";
                    var style = "";
                    var id = "";
                    var len_arr = html_arr.length;
                    if (len_arr > 1) class = html_arr[1].trim();
                    if (len_arr > 2) style = html_arr[2].trim();
                    if (len_arr > 3) id = html_arr[3].trim();
                    var html_code = "";
                    if (name == "div_02") this.div_02 = new html_style("div", name, class, style, id);
                    if (name == "div_03") this.div_03 = new html_style("div", name, class, style, id);
                    if (name == "img_01") this.img_01 = new html_style("img", name, class, style, id);
                    if (name == "a_01") this.a_01 = new html_style("a", name, class, style, id);

                    if (name == "li_01") //Auto load properties. In Li is not needed
                        {
                            this.reload("li", name, class, style, id);
                        }
                }
            }
    }

    create_a_01() //$puting_contents='li :Before create A: - ' . $this->slide_name . ' : ' .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //Here empty contents for following adds
    {
        this.a_01.code = "";
        this.a_01.prepare();
        this.a_01.f_id = this.tx_slide_num;
        this.a_01.f_class = this.slide_name;
        this.a_01.f_style += this.node.main_color + ";";
        this.a_01.f_href = "#";
        this.a_01.create();
        this.content += this.a_01.code;
    }

    create_div_03() //$puting_contents='View: Node Id - ' . $this->node->id   . '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //Create view ouput. If comment don't show view
    ////    $view->code       = 'RRRR';
    {
        var view = new view(this.node.id, this.view_name, this.view_args);
        this.div_03.prepare();
        this.div_03.create(view.code);
    }

    create_img_01() {
        set_image_path(this.img_fid, this.node.id, this.node.site_url, this.img_01.f_src);
        this.img_01.create();
    }

    create_div_02() //Correct style div03 create
    //$puting_contents='PHP: Div_03 code code:' . $this->div_03->code . '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //$puting_contents='PHP: Div_02 code code:' . $this->div_02>code . '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
        this.div_02.prepare();
        this.div_02.f_class = " " + this.div_02.class;
        this.div_02.f_class += this.tx_slide_num + "  " + this.slide_class;
        if (!this.color) this.border_bk = this.node.main_color;else this.border_bk = this.color;
        this.div_02.f_style = this.div_02.style + this.border_bk + "; ";
        this.div_02.f_style += "border:2px solid #";
        if (this.node.border_color != "") this.div_02.f_style += this.node.border_color;
        this.div_02.f_style += ";";
        this.div_02.content = this.div_03.code + this.img_01.code;
        this.div_02.create();
        this.content += this.div_02.code;
    }

    build_contents() //Added to code
    //Added to code
    //$puting_contents='li :if: - ' . $this->js_code_if . ' : ' .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //Method to debug - disabling dinamic generation code
    ////    $this->code = $this->content;
    {
        this.content = "";
        this.create_a_01();
        this.create_div_03();
        this.create_img_01();
        this.create_div_02();
        this.pcreate();
    }

};
