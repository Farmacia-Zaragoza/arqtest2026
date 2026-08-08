//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Descriptions Class  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// <div class="descriptions text-justified">
//<div class="flex-caption"> - Repeat - External
//Firts long description of the flat. Long lines of text. Multiple lines of text. Another text.
//-------------------------------------------------------------------------------------
//DIV
//P - Repeat
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	: Build html final code for object
//- create_div_NN    	: Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'))),
		{ des01_div_parragraph }	= require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/descriptions/des01_p_parragraph.es6')));

class des02_div_descriptions extends html_style {

	constructor(thm, alignment = "text-center")
	{
		let tag_type 				= "div"
		super(tag_type)

		this.n 						= "des02_div_descriptions_truck::"
		this.tag_type 				= "div"
		this.thm 					= thm

		this.fnode 					= this.thm.arr['fnode']['image_list']
		this.class 					= "descriptions " + alignment
		this.div_01 				= new des01_div_parragraph(thm)
		this.build_data()
	}

	build_data()
	{
		this.content = ""

		if (this.thm.b.page_product)
			this.content = this.div_01.code
		else
		{
			// Aqui queremos solo recorrer el bucle
			for (var slide_num in this.fnode.arr['oim'])
			{
				// var img_name = _fnode_arr_oim[slide_num]
				this.content += this.div_01.code
			}
		}

		this.pcreate()

		// Ok [17-11-02]
		// this.p('Code : > ' + this.code)

	}

}

exports.des02_div_descriptions = des02_div_descriptions
