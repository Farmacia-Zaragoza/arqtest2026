//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Menu Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//* <div class="col bottom-slider bottom-trigger">
//	  <div class="bottom-hide bottom-hide-left text-center">HIDE</div>
//	  <div class="bottom-arrow-prev bottom-arrow text-center"><i class="fas fa-arrow-left"></i></div>
//	  <ul class="slides">
//		<li class="bottomli text-center">test 0</li>
//	  <div class="bottom-arrow-next bottom-arrow text-center"><i class="fas fa-arrow-right"></i></div>
//	  <div class="bottom-hide bottom-hide-right text-center">HIDE</div>
//-------------------------------------------------------------------------------------
//* DIV
//   DIV  * 2
//	 UL
//     LI
//	 DIV  * 2
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 						= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.es6"								)

const 	{ html_style } 				= 	require(	cons.JS_BASE  + 'com/objects/html/html_style.es6'					),
		empty 						= 	require(	cons.NODE_MOD + 'is_empty'											),
		{ li01_menu_dog }			= 	require( 	cons.JS_BASE  + 'spc/theme/dog/deep_html/menu/li01_menu_dog.es6'	);

class div02_menu_dog extends html_style {

	constructor(thm) 
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"flg02_div::"
		this.num_elements_menu 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"col bottom-slider bottom-trigger"
		this.thm 					= 	thm
		this.fnode 					= 	this.thm.arr['fnode']['site_info_lang']
		this.fcommon				= 	this.thm.arr['fnode']['site_info_common']

		this.div_01 				= 	new html_style ('div')
		this.i_01 					= 	new html_style ('i')

		this.ul_01 					= 	new html_style ('ul')

		this.li_01 					= 	new li01_menu_dog ()

		this.build_data()
	}

	create_div_01()
	{
		// HIDE option
		this.div_01.class			=	'bottom-hide bottom-hide-left text-center'
		this.div_01.content			=	this.thm.s.mnu_hide
		this.div_01.pcreate()
		this.content				+=	this.div_01.code
	}

	create_div_02()
	{
		this.div_01.class			=	'bottom-arrow-prev bottom-arrow text-center'
		this.i_01.class				=	'fas fa-arrow-left'
		this.i_01.pcreate()
		this.div_01.content			=	this.i_01.code

		this.div_01.pcreate()
		this.content				+=	this.div_01.code
	}

	create_ul()
	{

		this.p('UL_ELEMENTS ' + this.fnode.arr['mnu'].length )

		for (var slide_num in this.fnode.arr['mnu']) 
		{
			var current_link 		= 	this.fnode.arr['lnk'][slide_num]
			var current_mnu 		= 	this.fnode.arr['mnu'][slide_num]

			// this.p('Current mnu ' + current_mnu)
			if (!empty(current_mnu)) 
			{
				// Every Lang will have different order
				// then is not needed active parameter in dog
		
				this.li_01.reload_contents(	current_mnu			, 
											current_link		)

				this.ul_01.content	+= 	this.li_01.code
			}
		}

		this.ul_01.pcreate()

		this.content				+=	this.ul_01.code

	}

	create_div_04()
	{
		this.div_01.class			=	'bottom-arrow-next bottom-arrow text-center'
		this.i_01.class				=	'fas fa-arrow-right'
		this.i_01.pcreate()
		this.div_01.content			=	this.i_01.code

		this.div_01.pcreate()
		this.content				+=	this.div_01.code
	}
	
	create_div_05()
	{
		// HIDE option
		this.div_01.class					=	'bottom-hide bottom-hide-right text-center'
		this.div_01.content			=	this.thm.s.mnu_hide
		this.div_01.pcreate()
		this.content				+=	this.div_01.code
	}

	build_data() 
	{
		this.content = ""

		this.create_div_01()
		this.create_div_02()
		this.create_ul()
		this.create_div_04()
		this.create_div_05()

		this.pcreate()

		//Ok [18-02-06]
		// this.p('dv02_Code > ' +  this.code)												

	}

}

exports.div02_menu_dog = div02_menu_dog