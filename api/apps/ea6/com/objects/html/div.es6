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
//Div Class  [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- reload_contents  : Load initial object contents
//- load_file        : Load system dat file
//- build_contents   : Build SuperMnu object dhtml code
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Objects
//- Drupal Node
//- Nav class
//Fields
//Class for slides less than half menu
//Class for slides more than half menu
class div extends html_style {
    constructor(file_in = "", node = "", screen_width = "", process = "", slide_left_class = "", slide_right_class = "") //El constructor debe cargar las propiedades del archivo
    //$puting_contents='Div :Node Id - ' . $this->node->id .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //Must to create others html objects
    //parent::__construct($this->tag_type , $this->tag_name  , $this->class , $this->style , $this->id);
    {
        this.tag_type = "div";
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

    load_file() //Load File - Create Objects
    {
        if (this.input_file != "") //Hay que iterar el array obteniendo los datos
            //End Foreach
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

                    if (name == "nav_01") //Auto load properties
                        {
                            this.nav_01 = new nav(this.input_file, this.node);
                            this.nav_01.reload("nav", name, class, style, id);
                        }

                    if (name == "div_01") //Auto load properties
                        {
                            this.reload("div", name, class, style, id);
                        }
                }
            }
    }

    build_contents() //Nav contents
    //$puting_contents='div:nav_01 style ' . $this->nav_01->f_style . ':' .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //Method to debug - disabling dinamic generation code
    ////    $this->code = $this->content;
    //$puting_contents='div :Content: - ' . $this->code  . ':' .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //$puting_contents='div :END : -------------------------- ' .   '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    {
        this.nav_01.reload_contents(this.screen_width, this.process, this.slide_left_half, this.slide_right_half);
        this.nav_01.build_contents();
        this.content = this.nav_01.code;
        this.prepare();
        this.create();
    }

};

