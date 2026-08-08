//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//JavaScript Stype Class  [V.0.0.1]  (2016-02-18)
//------------------------------------------------------------------------------------
//Methods:
//- event_create             : Create event jquery method
//- toggle_event_create      : Create toggle style javascript method
//- js_screen_script_create  : create javascripth width comparation
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Full content of html object or other code
//Event Code example
//    $("li.hov2").mouseover(function(){
//    
//    $(this).css("cssText", "background-color: #5f396f !important;");
//    $(this).find('a').css("color", "#000000");
//    });
//Example Toggle Event Creation 
//     $(".toggle-icon").click(function(){
//        $(".cbp-hrmenu").toggle();
//    });
//Example Style Creation
//    $(".menuborder").css("border","2px solid #5e5e5e");
class js_style {
  constructor(id = "", name = "", css = "", style = "", event = "", color = "", bkcolor = "", bordercolor = "", width = "") {
    this.js_code = "";
    this.js_content = "";
    this.js_code_if = "";
    this.js_code_el = "";
    this.id = "";
    this.name = "";
    this.css = "";
    this.style = "";
    this.event = "";
    this.color = "";
    this.bkcolor = "";
    this.bordercolor = "";
    this.width = "";
    this.id = "" + id;
    this.name = "" + name;
    this.css = "" + css;
    this.style = "" + style;
    this.event = "" + event;
    this.color = "" + color;
    this.bkcolor = "" + bkcolor;
    this.bordercolor = "" + bordercolor;
    this.width = "" + width;
  }

  event_create() //Is not aply this effect
  {
    var str = "";
    var poner_coma = false;

    if (this.style != "") {
      str += "$(\"" + this.style + "\").";

      if (this.event != "") {
        str += this.event + "(function(){ \n";

        if (this.css != "") {
          str += "$(this).css(\"" + this.css + "\"";

          if (this.bkcolor != "") {
            str += ",";
            str += "\"background-color: #" + this.bkcolor + " !important;\"";
          }

          str += "  );\n";
        }

        if (this.color != "") {
          str += "$(this).find('a').css(\"color\", \"#" + this.color + "\"); ";
        }

        str += "});\n";
      }

      this.js_code = str;
    }
  }

  toggle_event_create() {
    var str = "";

    if (this.style != "") {
      str += "$(\"" + this.style + "\")";

      if (this.event != "") {
        str += "." + this.event + "(function(){\n";

        if (this.name != "") {
          str += "$(\"" + this.name + "\").toggle();";
        }

        str += "});\n";
      }

      this.js_code = str;
    }
  }

  bordercolor_style_create() {
    var str = "";

    if (this.style != "") //if ( $this->bordercolor != '' )
      //{
      //}
      {
        str += "$(\"" + this.style + "\")";
        str += ".css(\"border\",\"2px solid #" + this.bordercolor + "\")";
        str += ";\n";
        this.js_code += str;
      }
  }

  js_screen_script_create() //$js_screen_width='480';
  {
    var str = "<script>";
    str += "var width=screen.width;";
    str += "if(width<=" + this.width + "){ " + "\n";
    str += "var mnu =$(\"#" + this.name + "\").val(); . \"\n\" ";
    str += "$(\".\"+mnu).html(mnu.slice(0, mnu.indexOf(\"_\")));";
    str += "}";
    str += "else{" + "\n";
    str += "var mnu =$(\"#" + this.name + "\").val(); . \"\n\" ";
    str += "$(\".\"+mnu).html(mnu);";
    str += "}";
    str += "</script>";
    this.js_code = str;
  }

  js_screen_create_if_else() //$js_screen_width='480';
  {
    var str_if = "";
    str_if += "var mnu =$(\"#" + this.name + "\").val();" + "\n";
    str_if += "$(\".\"+mnu).html(mnu.slice(0, mnu.indexOf(\"_\")));" + "\n";
    var str_el = "";
    str_el += "var mnu =$(\"#" + this.name + "\").val();" + "\n";
    str_el += "$(\".\"+mnu).html(mnu);";
    this.js_code_if = str_if;
    this.js_code_el = str_el;
  }

  jquery_create() {
    var str = "jQuery(function($){ ";
    str += this.js_code;
    str += "});";
    this.js_code = str;
  }

  __get(property) {
    if (this in property) {
      return this[property];
    }
  }

  __set(var, valor) {
    if ("js_style___set" in var) {
      this[var] = valor;
    } else {
      echo(`No existe el atributo ${var}.`);
    }
  }

  show() {
    echo(this.js_code);
  }

  shon() {
    echo(this.js_code + "\n");
  }

};
