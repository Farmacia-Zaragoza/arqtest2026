//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Div Img Class  [V.0.1.1]  (2017-09-27)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <div class="col-xs-3 col-sm-2 upper-photo-item">
//<img alt="img" class="top-row-img img-random img-responsive bordered-small">
//-------------------------------------------------------------------------------------
// DIV
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- rebuild  	 : Build html changing only content- without get more memory
//- fill		 : Build html changin only external properties
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Internal html structures
class div10_div_img extends html_style {
		constructor() {
				super(...arguments);
				this.n = "div10_div_img::";
		}

		constructor(div_01_class = "", img_01_class = "", img_01_alt = "") {
				this.tag_type = "div";
				super.constructor(this.tag_type);
				this.class = div_01_class;
				this.img_01 = new html_style("img");
				this.img_01.class = img_01_class;
				this.img_01.alt = img_01_alt;
				this.img_01.pcreate();
				this.content = this.img_01.code;
				this.pcreate();
		}

		fill(div_01_class = "") {
				this.class = div_01_class;
				this.pcreate();
		}

		rebuild(div_01_class = "", img_01_class = "", img_01_alt = "") //We avoid to get more memory
		{
				this.class = div_01_class;
				this.img_01 = new html_style("img");
				this.img_01.class = img_01_class;
				this.img_01.alt = img_01_alt;
				this.img_01.pcreate();
				this.content = this.img_01.code;
				this.pcreate();
		}

};
