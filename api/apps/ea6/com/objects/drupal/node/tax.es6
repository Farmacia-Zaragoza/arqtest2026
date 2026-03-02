//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js Html Div Class  [V.0.0.1]  (2017-10-20)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
//Taxonomy object - Taxonomy Class
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

class tax {
	constructor(name = "", tid = "", path = "") 
	{
		this.name = "";
		this.tid = "";
		this.path = "";
		this.tax_string = "";
		this.sep = "@";
		this.name = name;
		this.tid = tid;
		this.path = path;
		this.tax_string = this.name + sep + this.tid + sep + this.path;
	}

};

exports.tax = tax