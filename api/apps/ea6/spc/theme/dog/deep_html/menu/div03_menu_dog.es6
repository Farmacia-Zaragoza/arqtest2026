//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Menu Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//* <div class="row">
//	  <div class="col black-line-for-trigger"></div>
//	  <div class="col bottom-slider bottom-trigger"> (External)
//-------------------------------------------------------------------------------------
//* DIV
//    DIV
//    DIV (external)
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'))),
		{ div02_menu_dog }			= 	require( 	path.join(JS_BASE, 'spc/theme/dog/deep_html/menu/div02_menu_dog.es6')));

class div03_menu_dog extends html_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"div03_menu_dog::"
		this.num_elements_menu 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"row"
		this.thm 					= 	thm

		this.div_01					=	new html_style('div')
		this.div_01.class 			=	'col black-line-for-trigger'
		this.div_01.pcreate()

		this.miv_01					=	new div02_menu_dog(this.thm)


		this.build_data()
	}

	build_data()
	{
		this.content = ""

		this.content 			+= 	this.div_01.code
		this.content 			+= 	this.miv_01.code

		this.pcreate()

		//Ok [18-02-06]
		// this.p('mnu3_Code > ' +  this.code)
	}
}

exports.div03_menu_dog = div03_menu_dog
