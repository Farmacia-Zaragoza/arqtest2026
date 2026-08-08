//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Two Div Class  [V.0.1.1]  (2017-09-27)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//ZONE
//<div class="col-xs-1 background-image-holder empty"></div>
//<div class="col-xs-1 background-image-holder filled">[c]</div>
//-------------------------------------------------------------------------------------
// zone
//DIV
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Internal html structures
//Strings
class znd02_two_div extends getset {
		constructor() {
				super(...arguments);
				this.n = "znd02_two_div::";
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
				this.div_02.content = cookies_msg;
				this.div_02.pcreate();
				this.code = this.div_01.code;
				this.code += this.div_02.code;
		}

};

