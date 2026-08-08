//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Helper Zone Dog Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//* <div class="mini-edu desktop">
//	  <img class="mini-edu-img-1" src="img/round_square/edu_footprint_dark_200_2017.svg" alt="mini-dog-helper">
//	  <img class="mini-edu-img-2" src="img/round_square/mini_edu_100_2017.svg" alt="mini-dog-helper">
//* <div class="page-information">
//	  <a href="#" class="texted">PAGE INFORMATION (CLICK TO EXPAND)</a>
//* <div class="helper"> (external)
//-------------------------------------------------------------------------------------
//* DIV
//    IMG
//	  IMG
//* DIV
//    A
//  DIV  (external)
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		const { svg_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6'),
		const { getset } 					= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'),
		const { a01_mobile_langs_dog }	= 	require( 	path.join(JS_BASE, 'spc/theme/dog/deep_html/flags/a01_mobile_langs_dog.es6'));

class zne04_helper_dog extends getset {

	constructor(thm)
	{
		super()
		this.n 						= 	"flg02_div::"

		this.thm 					= 	thm

		this.fnode 					= 	this.thm.arr['fnode']['flag_list']

		this.a_01					=	new html_style('a')

		this.div_01					=	new svg_style('div')
		this.div_01.fnode			=	this.fnode

		// Variable to manage multiple img content
		this.zone_01				=	''

		// Pending
		// this.miv_01 				= 	new div02_helper_dog (this.thm)

		this.build_data()
	}

	create_svg_01()
	{
		this.div_01.svg_path				= 	'r_img/round_square/'
		this.div_01.svg_name 				= 	'edu_footprint_dark_200_2017.svg'

		this.div_01.svg_alt					=	'mini-dog-helper'

		this.div_01.svg_class				= 	'mini-edu-img-1'

		this.div_01.create_svg_base()

		this.zone_01						=	this.div_01.content

		this.div_01.content					=	''
	}

	create_svg_02()
	{
		this.div_01.svg_path				= 	'r_img/round_square/'
		this.div_01.svg_name 				= 	'mini_edu_100_2017.svg'

		this.div_01.svg_class				= 	'mini-edu-img-2'

		this.div_01.create_svg_base()

		this.div_01.content 				=	this.zone_01 +	this.div_01.content

	}

	create_div_01()
	{

		this.create_svg_01()
		this.create_svg_02()

		this.div_01.class					=	'mini-edu desktop'

		this.div_01.pcreate()

		this.code							=	this.div_01.code
	}

	// <div class="page-information">
	create_div_02()
	{

		this.a_01.href						=	'#'
		this.a_01.class						=	'texted'
		this.a_01.content					=	this.thm.s.nfo_in

		this.a_01.pcreate()

		this.div_01.content					=	this.a_01.code
		this.div_01.class					=	'page-information'
		this.div_01.pcreate()

		this.code							+=	this.div_01.code
	}


	build_data()
	{
		// Is a zone. Only have code

		this.create_div_01()
		this.create_div_02()

		//Ok [18-02-06]
		// this.p('zne_Code > ' +  this.code)

	}

}

exports.zne04_helper_dog = zne04_helper_dog
