//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flag03 Mobile Div Class Dog  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//*<div class="mobile-langs">
//	<div class="lang-scroll lang-scroll-up">
//		<i class="fa fa-arrow-up fa-5x" aria-hidden="true"></i>
//	<div class="langs-list">
//		<div class="lang-wrapper">
//			<img lang="bg" src="img/flags/brqx_flag_bangladesh_2016_320_200.svg"
//			alt="" class="mobile-lang-item">  REPEAT
//	<div class="lang-scroll lang-scroll-down">
//		<i class="fa fa-arrow-down fa-5x" aria-hidden="true"></i>
//-------------------------------------------------------------------------------------
//DIV
//  DIV
//   I
//  DIV - (external)
//  DIV
//   I
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')),
		{ div02_mobile_langs_dog }	= 	require( 	path.join(JS_BASE, 'spc/theme/dog/deep_html/flags/div02_mobile_langs_dog.es6'));


class div03_mobile_langs_dog extends html_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"
		super(tag_type)
		this.n 						= 	"flg03_div_flags::"

		this.tag_type 				= 	"div"
		this.class 					= 	"mobile-langs"
		this.thm 					= 	thm
		this.fnode 					= 	this.thm.arr['fnode']['flag_list']

		this.div_01					=	new html_style('div')
		this.i_01					=	new html_style('i')

		this.i_01.aria_hidden		=	'true'

		this.miv_01 				= 	new div02_mobile_langs_dog(this.thm)

		this.build_data()
	}

	create_div_01()
	{
		this.div_01.class			= 	'lang-scroll lang-scroll-up'
		this.i_01.class				=	'fa fa-arrow-up fa-5x'
		this.i_01.pcreate()

		this.div_01.content			=	this.i_01.code
		this.div_01.pcreate()

		this.content 				+= 	this.div_01.code
	}

	create_div_02()
	{
		this.content 				+= 	this.miv_01.code

	}

	create_div_03()
	{
		this.div_01.class			= 	'lang-scroll lang-scroll-down'
		this.i_01.class				=	'fa fa-arrow-down fa-5x'
		this.i_01.pcreate()

		this.div_01.content			=	this.i_01.code
		this.div_01.pcreate()

		this.content 				+= 	this.div_01.code
	}


	// Works

	build_data()
	{
		this.content = ""
		this.create_div_01()
		this.create_div_02()
		this.create_div_03()
		this.pcreate()

		//Ok [18-01-22]
		//this.p('flag:code > ' + this.code)
	}

}

exports.div03_mobile_langs_dog = div03_mobile_langs_dog
