//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flag Mobile Lang Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//* <div class="langs-list">
//   <div class="lang-wrapper">
//		<img lang="bg" src="img/flags/brqx_flag_bangladesh_2016_320_200.svg" REPEAT
//		alt="" class="mobile-lang-item">
//-------------------------------------------------------------------------------------
//* DIV
//   DIV
//      IMG (repeat) (external)
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents  : Reload field attributes
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));
		empty 						= 	require(	'is_empty'														),
		const { a01_mobile_langs_dog }	= 	require( 	path.join(JS_BASE, 'spc/theme/dog/deep_html/flags/a01_mobile_langs_dog.es6'));

class div02_mobile_langs_dog extends html_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"flg02_div::"
		this.num_elements_menu 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"lang-list"
		this.thm 					= 	thm

		this.div_01					=	new html_style('div')
		this.div_01.class			=	'lang-wrapper'


		this.a_01 					= 	new a01_mobile_langs_dog (this.thm)

		this.fnode 					= 	this.thm.arr['fnode']['flag_list']
		this.build_data()
	}


	build_data()
	{
		this.content = ""

		// 10
		this.p ('LAN_LEN ' + this.fnode.arr['lan'].length )

		for (var slide_num in this.fnode.arr['lan'])
		{
			var current_lan 	= this.fnode.arr['lan'][slide_num]
			var current_title 	= this.fnode.arr['tit'][slide_num]

			if (!empty(current_lan))
			{
				// Every Lang will have different order
				// then is not needed active parameter in dog

				this.a_01.reload_contents(	current_lan,
												current_title)

				this.div_01.content 	+= this.a_01.code
			}
		}

		this.div_01.pcreate()

		this.content 			= 	this.div_01.code

		this.pcreate()

		//Ok [17-06-24]
		// this.p('flg_Code > ' +  this.code)

	}

}

exports.div02_mobile_langs_dog = div02_mobile_langs_dog
