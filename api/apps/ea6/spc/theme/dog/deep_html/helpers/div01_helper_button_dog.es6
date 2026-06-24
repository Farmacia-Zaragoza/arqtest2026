//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Helper Dog Div Button Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------

//<div data-content="Some text about dev/live"
//	   data-header="Dev/live"
// 	<img src="img/box/brqx_2017_dev_live_green_050.svg"

//-------------------------------------------------------------------------------------
//* DIV
//    IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ svg_style } 				= 	require(	cons.JS_BASE  + 'com/objects/html/svg_style.es6'								)

class div01_helper_button_dog extends svg_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"div01_helper_button_dog::"

		this.tag_type 				= 	"div"

		this.thm					=	thm

		this.fnode 					= 	this.thm.arr['fnode']['flag_list']
	}

	create_svg_01()
	{
		this.svg_path				= 	'r_img/box/'
		this.svg_name 				= 	'brqx_2017_dev_live_green_050.svg'

		this.svg_alt				=	'+'

		this.svg_class				= 	'change-text-size size-plus'

		this.create_svg_base()

	}

	reload( path , name , class 	,	// Mandatory params
			text	=	''			,   // Optional params
			cont 	=	''			,
			tit		=	''			,
			toggle	=	''			,
			trigger	=	''			)
	{
		// Optional params

		this.data_header			=	text
		this.data_content			=	desc
		this.title					=	tit

		this.data_toggle			=	toggle
		this.data_trigger			=	trigger

		// Mandatory params

		this.class					= 	class

		this.svg_path				= 	path
		this.svg_name 				= 	name

		// this.svg_class				= 	class

		this.create_svg_base()

		this.pcreate()

		//Ok [17-06-24]
		this.p('btn1_Code > ' +  this.code)

	}


}

exports.div01_helper_button_dog = div01_helper_button_dog
