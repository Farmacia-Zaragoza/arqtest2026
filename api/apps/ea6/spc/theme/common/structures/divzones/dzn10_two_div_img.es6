//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Two Div Class  [V.0.1.1]  (2017-09-27)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//DIVZONE
//<div class="dogs-background-container desktop-bigrow"
//<div class="col-xs-1 background-image-holder empty"></div>      x (Foreach N times)
//<div class="col-xs-1 background-image-holder filled">[c]</div>
//-------------------------------------------------------------------------------------
//div
// zone
//DIV
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Internal html structures
class dzn10_two_div_img extends getset {
	constructor() {
		super(...arguments);
		this.n = "dzn10_two_div_img::";
		this.num_items = 1;
	}

	constructor(div_01_class = "", div_02_class = "", div_03_class = "", num_items = 1) //El constructor debe cargar las propiedades del archivo
	//<div class="container text-center">
	//Create Zone object --- Directly code
	{
		this.class = div_01_class;
		this.num_items = num_items;
		this.zne_01 = new div02_two_div(div_02_class, div_03_class);

		for (var i = 0; i < this.num_items; i++) this.content += this.zne_01.code;

		this.pcreate();
	}

};
