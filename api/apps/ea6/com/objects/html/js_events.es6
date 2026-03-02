//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//JavaScript Events Class  [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- document_ready_create  : Create envelope or all javascript / jquery methods
//- create                 : Create js dhtml code
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Html subclass
//Drupal Node
class js_events extends js_style {
    constructor(file_in = "", node = "") //El constructor debe cargar las propiedades del archivo
    //Hay que iterar el array obteniendo los datos
    {
        this.node = node;
        var contents = file(file_in);

        for (var sLinea of Object.values(contents)) //Cada linea tiene el formato
        //htmlname    @    class    @    style    @   id
        //El separador debe serl la arroba pues las clases css tienen dos puntos y almoadillas
        //Habra que estar muy atento a estos valores
        //Obtiene el CN
        {
            var js_arr = sLinea.split("@");
            var js_id = js_arr[0].trim();
            var js_name = "";
            var js_css = "";
            var js_style = "";
            var js_event = "";
            var js_color = "";
            var js_bkcolor = "";
            var js_bordercolor = "";
            var js_width = "";
            var c = 1;
            var len_js_arr = js_arr.length;
            if (len_js_arr > 1) js_name = js_arr[1].trim();
            if (len_js_arr > 2) js_css = js_arr[2].trim();
            if (len_js_arr > 3) js_style = js_arr[3].trim();
            if (len_js_arr > 4) js_event = js_arr[4].trim();
            if (len_js_arr > 5) js_color = js_arr[5].trim();
            if (len_js_arr > 6) js_bkcolor = js_arr[6].trim();
            if (len_js_arr > 7) js_bordercolor = js_arr[7].trim();
            if (len_js_arr > 8) js_width = js_arr[8].trim();
            if (js_id == "click") this.click = new js_style(js_id, js_name, js_css, js_style, js_event, js_color, js_bkcolor, js_bordercolor, js_width);
            if (js_id == "mouseover") this.mouseover = new js_style(js_id, js_name, js_css, js_style, js_event, js_color, js_bkcolor, js_bordercolor, js_width);
            if (js_id == "mouseout") this.mouseout = new js_style(js_id, js_name, js_css, js_style, js_event, js_color, js_bkcolor, js_bordercolor, js_width);
            if (js_id == "menuborder") this.menuborder = new js_style(js_id, js_name, js_css, js_style, js_event, js_color, js_bkcolor, js_bordercolor, js_width);
            if (js_id == "screen") this.screen = new js_style(js_id, js_name, js_css, js_style, js_event, js_color, js_bkcolor, js_bordercolor, js_width);
        }
    }

    document_ready_create() {
        var str = "";
        str += "<script>";
        str += "$(document).ready(function(){" + "\n";
        str += this.js_content;
        str += "});" + "\n";
        str += "</script>";
        this.js_code = str;
    }

    create() //Dinamic properties
    //$puting_contents='Nod:: slides color : ' . $this->node->slides_color .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //$puting_contents='Nod:: main color : ' . $this->node->main_color .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //$puting_contents='Nod:: border color : ' . $this->node->border_color .  '>' ;
    //$GLOBALS['putcont'].=$puting_contents;
    //Create event click
    //Create event mouseover
    //Create event mouse out
    //Create styles MenuBorderl
    //We comment to include all JS Code
    //$this->document_ready_create();
    {
        this.mouseover.bkcolor = this.node.slides_color;
        this.mouseout.color = this.node.main_color;
        this.menuborder.bordercolor = this.node.border_color;
        this.js_content = "";
        this.js_code = "";
        this.click.toggle_event_create();
        this.js_content += this.click.js_code;
        this.mouseover.event_create();
        this.js_content += this.mouseover.js_code;
        this.mouseout.event_create();
        this.js_content += this.mouseout.js_code;
        this.menuborder.bordercolor_style_create();
        this.js_content += this.menuborder.js_code;
    }

};
