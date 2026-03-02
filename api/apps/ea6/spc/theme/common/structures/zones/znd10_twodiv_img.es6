//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Two Div Class  [V.0.1.1]  (2017-09-27)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//ZONE
//<div class="col-xs-1 background-image-holder empty"></div>
//<div class="col-xs-1 background-image-holder filled"></div>
//<div class="col-xs-1 background-image-holder filled">[c]</div>
//-------------------------------------------------------------------------------------
// zone
//DIV
//DIV
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Internal html structures
//Strings
class dzn03_three_div extends getset {
		constructor() {
				super(...arguments);
				this.n = "cok01_cookies::";
				this.cookies_msg = "";
		}

		constructor(div_01_class = "", div_02_class = "", cookies_msg = "") //El constructor debe cargar las propiedades del archivo
		//<div class="container text-center">
		{
				this.div_01 = new html_style("div");
				this.div_01.class = div_01_class;
				this.div_01.pcreate();
				this.div_02 = new html_style("div");
				this.div_02.class = div_02_class;
				this.div_02.pcreate();
				this.div_03 = new html_style("div");
				this.div_03.class = div_03_class;
				this.div_03.content = cookies_msg;
				this.div_02.pcreate();
				this.code = this.div_01.code;
				this.code += this.div_02.code;
				this.code += this.div_03.code;
		}

};
