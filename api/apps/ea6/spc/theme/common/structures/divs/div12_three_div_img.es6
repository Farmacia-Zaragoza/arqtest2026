//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Div Img Class  [V.0.1.1]  (2017-09-27)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <div class="col-md-2 upper-photo-item">
//<div
//<div class="dark-container bordered-small">
//<img alt="" class="top-row-img dark-img img-responsive img-random"></div>
//-------------------------------------------------------------------------------------
// DIV
//DIV
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Internal html structures
class div12_three_div_img extends html_style {
		constructor() {
				super(...arguments);
				this.n = "div12_three_div_img::";
		}

		constructor(div_01_class = "", div_02_class = "", div_03_class = "", img_01_class = "", img_01_alt = "") //Check Ok [17-09-29]
		//$this->dd('Code > ' . $this->code)										;
		{
				this.tag_type = "div";
				super.constructor(this.tag_type);
				this.class = div_01_class;
				this.div_01 = new div11_two_div_img(div_02_class, div_03_class, img_01_class, img_01_alt);
				this.content = this.div_01.code;
				this.pcreate();
		}

};

