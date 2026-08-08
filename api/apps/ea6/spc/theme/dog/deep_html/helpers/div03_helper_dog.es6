//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Helper Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
<div class="helper">
	<img src="img/dogs/edu_version_03_real_dog.svg" alt="" class="img-fluid">
	<div class="info-cloud"> (external)
	<img src="img/bones/gold_dog_bone_2017.svg" alt="" class="helper-bone">
	<div class="info-cloud-helper-block">
		<span class="info-cloud-helper-title">Lorem ipsum dolor sit amet</span><br>
		<span class="info-cloud-helper-text">consectetur adipisicingelit.
//-------------------------------------------------------------------------------------
//* DIV
//    IMG
//    DIV (external)
//    IMG (
//    DIV
//      SPAN * 2
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents  : Reload field attributes
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'))),
		{ svg_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6'))),
		{ div02_helper_dog }		= 	require( 	path.join(JS_BASE, 'spc/theme/dog/deep_html/helpers/div02_helper_dog.es6')));

class div03_helper_dog extends svg_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"div03_helper_dog::"
		this.num_elements_menu 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"helper"
		this.thm 					= 	thm

		this.div_01					=	new html_style('div')

		this.span_01				=	new html_style('span')

		this.miv_01					=	new div02_helper_dog(this.thm)

		this.fnode 					= 	this.thm.arr['fnode']['flag_list']
		this.build_data()
	}

	create_svg_01()
	{
		this.svg_path				= 	'r_img/dogs/'
		this.svg_name 				= 	'edu_version_03_real_dog.svg'

		this.svg_alt				=	''

		this.svg_class				= 	'img-fluid'

		this.create_svg_base()

		this.zone_01					=	this.content
	}

	create_div_01()
	{
		this.content				+=	this.miv_01.code
	}

	create_div_02()
	{
		// Vertical marquee

		this.div_01.class			= 	'info-cloud-helper-block'

		this.span_01.class			=	'info-cloud-helper-title'
		this.span_01.content		=	this.thm.s.nfo_

		this.span_01.class			=	'info-cloud-helper-title'

		this.content				+=	this.miv_01.code
	}

	build_data()
	{
		this.content = ""

		// 10

		this.div_01.pcreate()

		this.content 			= 	this.div_01.code

		this.pcreate()

		//Ok [17-06-24]
		this.p('flg_Code > ' +  this.code)

	}

}

exports.div03_helper_dog = div03_helper_dog
