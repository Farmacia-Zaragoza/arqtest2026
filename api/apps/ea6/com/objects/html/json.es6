//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Json Style Class  [V.0.0.1]  (2016-03-17)
//------------------------------------------------------------------------------------
//"image_name": ["h.jpg","v.jpg","v.jpg","h.jpg","h.jpg","h.jpg","v.jpg","h.jpg"],
//Methods:
//- event_create             : Create event jquery method
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Symbol for fast debug Enable | Disable
//protected $deb					= 	'>' 						;
//Full content of html object or other code
//Json add content
//"image_name": ["h.jpg","v.jpg","v.jpg","h.jpg","h.jpg","h.jpg","v.jpg","h.jpg"],
class json {
	constructor() {
		this.n = "json::";
		this.deb = "";
		this.tame = "";
		this.code = "";
		this.content = "";
	}

	create(name = "") {
		this.code = "{";
		this.code += this.content;
		this.code += "} " + this.deb;
	}

	create_attribute(name) {
		this.code += "\"" + name + "\": " + "[";
		this.code += this.content;
		this.code += "]";
	}

	add_value(name) {
		this.content += "" + name + ", ";
	}

	add_strvalue(name) {
		this.content += "\"" + name + "\",";
	}

	add_lastvalue(name) {
		this.content += "" + name;
	}

	add_laststrvalue(name) {
		this.content += "\"" + name + "\"";
	}

	__get(property) {
		if (this in property) {
			return this[property];
		}
	}

	__set(var, valor) {
		if ("json___set" in var) {
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

