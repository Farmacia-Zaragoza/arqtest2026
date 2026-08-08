//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//JavaScript Stype Class  [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- event_create             : Create event jquery method
//- toggle_event_create      : Create toggle style javascript method
//- js_screen_script_create  : create javascripth width comparation
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Full content of html object or other code
//Full content of html object or other code
class jquery_style {
    constructor(content = "") {
        this.code = "";
        this.content = "";
        this.tag = "";
        this.content = "" + content;
    }

    create(content = "") {
        if (content != "") this.content += content;
        var str = "jQuery(function($){ ";
        str += this.content;
        str += "});";
        this.code = str;
    }

    __get(property) {
        if (this in property) {
            return this[property];
        }
    }

    __set(var, valor) {
        if ("jquery_style___set" in var) {
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

