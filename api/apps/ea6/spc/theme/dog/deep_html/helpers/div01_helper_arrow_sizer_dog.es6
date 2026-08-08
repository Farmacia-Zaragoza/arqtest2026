//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Helper Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//*<div data-toggle="popover"
//		data-trigger="focus"
//		title="Font size"
//		data-content="Click to increase|decrease text's font size."
//		class="info-cloud-bot-row-button text-button">
//	 <img src="img/symbols/brqx_plus_symbol_040_2017.svg" class="change-text-size size-plus" alt="+">
//	 <img src="img/symbols/brqx_minus_symbol_040_2017.svg" class="change-text-size size-minus" alt="-">
//-------------------------------------------------------------------------------------
//* DIV
//    IMG
//    IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 				= 	require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const empty = require(	'is_empty'														);

class div01_helper_dog extends svg_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"div01_helper_dog::"
		this.num_elements_menu 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"info-cloud-bot-row-button text-button"

		this.thm					=	thm

		this.data_toggle			=	"popover"
		this.data_trigger			=	"focus"
		this.data_content			=	this.thm.s.nfo_font_resize

		this.title					=	this.thm.s.nfo_font_size

		this.fnode 					= 	this.thm.arr['fnode']['flag_list']
		this.build_data()
	}

	create_svg_01()
	{
		this.svg_path				= 	'r_img/symbols/'
		this.svg_name 				= 	'brqx_plus_symbol_040_2017.svg'

		this.svg_alt				=	'+'

		this.svg_class				= 	'change-text-size size-plus'

		this.create_svg_base()

		this.zone_01					=	this.content
	}

	create_svg_02()
	{
		this.svg_name 				= 	'brqx_minus_symbol_040_2017.svg'

		this.svg_class				= 	'change-text-size size-plus'

		this.svg_alt				=	'-'

		this.create_svg_base()

		this.content				=	this.zone_01  +	 this.content

	}

	build_data()
	{
		this.content = ""

		this.create_svg_01()
		this.create_svg_02()

		this.pcreate()

		//Ok [17-06-24]
		this.p('flg1_Code > ' +  this.code)

	}

}

exports.div03_helper_dog = div03_helper_dog
