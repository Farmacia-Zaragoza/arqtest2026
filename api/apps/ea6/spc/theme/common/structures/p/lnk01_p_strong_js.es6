//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Span Span Structure  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//<p>
//<strong>Chrome - </strong><a href="https://support.google.com/chrome/answer/95647?hl=en">https://support.google.com/chrome/answer/95647?hl=en</a>
//-------------------------------------------------------------------------------------
// P
//A
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_data   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Internal html structures
//Strings
//<strong>Chrome - </strong><a href="https://support.google.com/chrome/answer/95647?hl=en">https://support.google.com/chrome/answer/95647?hl=en</a>
class lnk01_p_strong extends html_style {
	constructor() {
		super(...arguments);
		this.n = "lnk01_p_strong::";
		this.passed_name = "";
		this.passed_title = "";
		this.passed_url = "";
	}

	constructor() //El constructor debe cargar las propiedades del archivo
	//<span class="inverse-skew">
	//<div class="container text-center">
	{
		this.tag_type = "p";
		super.constructor(this.tag_type);
		this.a_01 = new html_style("a");
	}

	reload_data(name = "", title = "", url = "") {
		this.passed_name = name;
		this.passed_title = title;
		this.passed_url = url;
		this.build_data();
	}

	create_a() {
		this.a_01.content = this.passed_title;
		this.a_01.href = this.passed_url;
		this.a_01.pcreate();
		this.content += this.a_01.code;
	}

	build_data() {
		this.content = "<strong>" + this.passed_name + " - " + "</strong>";
		this.create_a();
		this.pcreate();
	}

};
