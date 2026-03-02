//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Div Div Class  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <div class="cookies">
//<div class="container text-center">
//This website uses cookies to enhance browsing experience. By continuing using this website you accept cookies.
//-------------------------------------------------------------------------------------
// DIV
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Internal html structures
//Strings
class div01_div_div extends html_style {
	constructor() {
		super(...arguments);
		this.n = "cok01_cookies::";
		this.cookies_msg = "";
	}

	constructor(div_01_class = "", div_02_class = "", cookies_msg = "") //El constructor debe cargar las propiedades del archivo
	//<div class="container text-center">
	{
		this.tag_type = "div";
		this.class = div_01_class;
		super.constructor(this.tag_type);
		this.div_01 = new html_style("div");
		this.div_01.class = div_02_class;
		this.div_01.content = cookies_msg;
		this.div_01.pcreate();
		this.content = this.div_01.code;
		this.pcreate();
	}

};
