//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Events Style Class  [V.0.0.6]  (2016-03-13)
//------------------------------------------------------------------------------------
//- First match          : Drupal 5
//- Next match           : Magento - Drupal 7-8
//------------------------------------------------------------------------------------
//Methods:
//- reload               : Reload dhtml object properties
//- create               : Build html final code for event dhtml code
//- load_file            : Load brqx tags static file
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//The idea is to add event properties to html style
//
//onfocus="if(this.value==this.defaultValue)this.value='';"
//onblur="if(this.value=='')this.value=this.defaultValue;"
//

//Imported html styles from files
//Full content of html object or other code
//Load file for Li styles and contents
//Our html properties
//Tag name (theme_div_01 , slide_div_02 ...)
//Create Event string. There isn't delimiters
class events_style {
    constructor(tame = "", file_in = "") {
        this.onfocus = "";
        this.onblur = "";
        this.code = "";
        this.input_file = "";
        this.tame = "";
        this.reload(tame, file_in);
    }

    reload(tame = "", file_in = "") {
        if (file_in != "") this.input_file = file_in;
        if (tame != "") this.tame = tame;
        this.load_file();
    }

    create() {
        var str = " ";
        if (this.onfocus != "") str += "onfocus=\"" + this.onfocus + "\" ";
        if (this.onblur != "") str += "onblur=\"" + this.onblur + "\" ";
        this.code = str + " ";
    }

    load_file() //El constructor debe cargar las propiedades del archivo
    {
        if (this.input_file != "") //Hay que iterar el array obteniendo los datos
            //End foreach
            {
                var contents = file(this.input_file);

                for (var sLinea of Object.values(contents)) //Every line have the following format
                //tag_name    @    event_name    @    event_value
                //Get TAG Name (tame)
                //echo "Len Array: " . count($html_arr) . "\n";
                {
                    var html_arr = sLinea.split("@");
                    var tame = html_arr[0].trim();
                    var event_name = "";
                    var event_value = "";
                    var len_arr = html_arr.length;
                    if (len_arr > 1) event_name = html_arr[1].trim();
                    if (len_arr > 2) event_value = html_arr[2].trim();
                    if (tame == this.tame) this.load(event_name, event_value);
                }
            }
    }

    load(event_name = "", event_value) {
        if (event_name == "onfocus") this.onfocus = event_value;
        if (event_name == "onblur") this.onblur = event_value;
    }

    __get(property) {
        if (this in property) {
            return this[property];
        }
    }

    __set(var, valor) {
        if ("events_style___set" in var) {
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
