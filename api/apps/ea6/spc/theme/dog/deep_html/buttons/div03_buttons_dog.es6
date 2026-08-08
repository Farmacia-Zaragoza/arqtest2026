//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Helper Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//* <div class="row links align-items-center">
//	  <div class="col desktop button-container"> (external)
// 	  <div class="col-12 col-lg-8"> (external)
//	  <div class="col text-right desktop button-container"> (external)
//-------------------------------------------------------------------------------------
//* DIV
//    DIV (external)
//    DIV (external)
//    DIV (external)
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents  : Reload field attributes
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 					= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));
		const { div01_button_circle_dog }		= 	require( 	path.join(JS_BASE, 'spc/theme/dog/deep_html/buttons/div01_button_circle_dog.es6'));
		const { div02_buttons_dog }			= 	require( 	path.join(JS_BASE, 'spc/theme/dog/deep_html/buttons/div02_buttons_dog.es6'));

class div03_buttons_dog extends html_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"div03_buttons_dog::"
		this.num_elements_menu 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"row links align-items-center"
		this.thm 					= 	thm


		this.miv_01					=	new div01_button_circle_dog(this.thm)

		this.miv_02					=	new div02_buttons_dog(this.thm)

		this.fnode 					= 	this.thm.arr['fnode']['flag_list']

		this.build_data()
	}

	create_div_01()
	{
		let class_01				=	'col desktop button-container'

		let url_01					=	'http://dog.dbrqx.com/index2/social_01'

		let tit_01					=	'Page name Social 01'

		let txt_01					=	'Click to go to Social 01'

		this.miv_01.reload_contents(
							class_01		,
							url_01 			,
							tit_01 			,
							txt_01			)

		this.content				+=	this.miv_01.code
		//this.content				+=	'DIV_01>'

	}

	create_div_02()
	{
		this.content				+=	this.miv_02.code
		// this.content				+=	'DIV_02>'

	}

	create_div_03()
	{
		let class_02				=	'col text-right desktop button-container'

		let url_02					=	'http://dog.dbrqx.com/index2/social_02'

		let tit_02					=	'Page name Social 02'

		let txt_02					=	'Click to go to Social 02'

		// class_name, link, title, text)
		this.miv_01.reload_contents(
					class_02		,
					url_02 			,
					tit_02 			,
					txt_02			)

		this.content				+=	this.miv_01.code

		// this.content				+=	'DIV_03>'

	}


	build_data()
	{
		this.content = ""

		this.create_div_01()

		this.create_div_02()

		this.create_div_03()

		this.pcreate()

		//Ok [18-02-05]
		// this.p('btn3_Code > ' +  this.code)

	}

}

exports.div03_buttons_dog = div03_buttons_dog
