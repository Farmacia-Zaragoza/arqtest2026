//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Buttons Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//* <div class="col-12 col-lg-8">
//	  <div class="row text-center links-container no-gutters">
//		<div class="col-lg-2 col-4 link-container"> (External) (repeat)
//-------------------------------------------------------------------------------------
//* DIV
//   DIV
//    DIV (repeat) (external)
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents  : Reload field attributes
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 						= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.es6"					);

const 	{ html_style } 				= 	require(	cons.JS_BASE  + 'com/objects/html/html_style.es6'						),
		empty 						= 	require(	cons.NODE_MOD + 'is_empty'												),
		{ div01_button_dog }		= 	require( 	cons.JS_BASE  + 'spc/theme/dog/deep_html/buttons/div01_button_dog.es6'	);

class div02_buttons_dog extends html_style {

	constructor(thm) 
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"div02_buttons_dog::"
		this.num_elements_menu 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"col-12 col-lg-8"
		this.thm 					= 	thm
		this.fnode 					= 	this.thm.arr['fnode']['site_info_lang']
		this.fcommon				=	this.thm.arr['fnode']['site_info_common']
		
		this.div_01					=	new html_style('div')
		this.div_01.class			= 	
			'row text-center links-container no-gutters'
		
		this.miv_01 				= 	new div01_button_dog ()

		this.build_data()
	}

	build_data() 
	{
		this.content = ""

		// 13
		// this.p ('DIV02_BTN_LEN ' + this.fnode.arr['btn'].length )
		 
		for (var slide_num in this.fnode.arr['btn']) 
		{
			var current_title 	= this.fnode.arr['btn'][slide_num]

			// Links Comunes para los botones
			// Igual hay que mezclar. Policy no es comun
			var current_link 	= this.fcommon.arr['btn'][slide_num]

			// this.p('Title ' + current_title)

			if (!empty(current_title)) 
			{
				// Every Lang will have different order
				// then is not needed active parameter in dog
		
				this.miv_01.reload_contents(current_title)

				this.div_01.content 	+= this.miv_01.code
			}
		}

		this.div_01.pcreate()
		
		this.content 			= 	this.div_01.code

		this.pcreate()

		//Ch [18-01-02]
		// this.p('btns_Code > ' +  this.code)												
	}

}

exports.div02_buttons_dog = div02_buttons_dog