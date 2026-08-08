//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Span Span Structure  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//	<span class="link-description">
//<span class="inverse-skew">
//A very long line is a link to actual Flat page. A very long line is a link to actual Flat page.
//-------------------------------------------------------------------------------------
// SPAN
//SPAN
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Internal html structures
//Strings
class spa01_span_span extends html_style {
		constructor() {
				super(...arguments);
				this.n = "spa01_span_span::";
				this.cookies_msg = "";
		}

		constructor(class_spa_01 = "", class_spa_02 = "", span_msg = "") //El constructor debe cargar las propiedades del archivo
		//<span class="inverse-skew">
		//<div class="container text-center">
		{
				this.tag_type = "span";
				this.class = class_spa_01;
				super.constructor(this.tag_type);
				this.span_01 = new html_style("span");
				this.span_01.class = class_spa_02;
				this.span_01.content = span_msg;
				this.span_01.pcreate();
				this.content = this.span_01.code;
				this.pcreate();
		}

};

