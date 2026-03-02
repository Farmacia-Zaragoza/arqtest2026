//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Jquery Tag Stype Class  [V.0.0.1]  (2016-03-17)
//------------------------------------------------------------------------------------
//Methods:
//- event_create             : Create event jquery method
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Symbol for fast debug Enable | Disable
//protected $deb					= 	'>' 						;
//Full content of html object or other code
//window.addEventListener('DOMContentLoaded', function() {
//(function($) {
//$("#Sendas-pill-middle-tab").tableView({//
//});
//$.slideshow({
//});
//Jquery add content
//slide_interval          :   5000,   // Length between transitions
//{image : 'images/background/slideshow/01.jpg',},
class jquery_tag {
  constructor(tame = "") {
    this.n = "jquery_tag::";
    this.deb = "";
    this.tame = "";
    this.code = "";
    this.content = "";
    this.tame = "" + tame;
  }

  listener_create(name) {
    this.code = "";
    this.code += "window.addEventListener('" + name + "', function() {" + this.deb;
    this.code += "(function($) {" + this.deb;
    this.code += this.content;
    this.code += "})(jQuery);" + this.deb;
    this.code += "}); " + this.deb;
  }

  dolar_almocreate(name = "", view_type = "tableView") {
    this.code = "";
    this.code += "$(\"#" + name + "\")." + view_type + "({" + this.deb;
    this.code += this.content;
    this.code += "});" + this.deb;
  }

  dolar_create() {
    var str = "$.";
    str += this.tame;
    str += "({ ";
    str += this.content;
    str += " });";
    this.code = str;
  }

  add_pair(pair, content) {
    var str = "" + pair + " ";
    str += ":" + " \"";
    str += content + "\"" + "," + this.deb;
    this.content += str;
  }

  add_last_pair(pair, content) {
    var str = pair + " ";
    str += ":" + " ";
    str += content + " ";
    this.content += str;
  }

  make_image(content) {
    var str = "{image : '";
    str += content + "',}";
    return str;
  }

  __get(property) {
    if (this in property) {
      return this[property];
    }
  }

  __set(var, valor) {
    if ("jquery_tag___set" in var) {
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
