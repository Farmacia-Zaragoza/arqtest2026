// [DOCHANGED_ES6]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flag Div Class  [V.0.0.6]  (2018-01-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//<div class="flags">
//<a class="pop-container-L active" href="#" data-caption="Click to go to Chienese site">
//DIV - bucle repeat
//A - (external)
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents  : Reload field attributes
//- load_file        : Load dat file from system
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 					= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"							)

const 	{ html_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		empty 					= 	require(	'is_empty'														),
		const { flg01_div_flags }		= 	require( 	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/flags/flg01_div_flags.es6'));

class flg02_div_flags extends html_style {

	constructor(thm)
	{
		let tag_type 				= "div"

		super(tag_type)
		this.n 						= "flg02_div::"
		this.num_elements_menu 		= ""

		this.tag_type 				= "div"
		this.class 					= "flags"
		this.thm 					= thm
		this.div_01 				= new flg01_div_flags(this.thm)

		this.fnode 					= this.thm.arr['fnode']['flag_list']
		this.build_data()
	}

	reload_contents()
	{
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_bucle_options() //end for
	{
		var options_content = ""
		var current_active = "active"
		var cont = 0
		{
			// 10
			// this.p ('LAN_LEN ' + this.fnode.arr['lan'].length )

			for (var slide_num in this.fnode.arr['lan'])
			{
				var current_lan 	= this.fnode.arr['lan'][slide_num]
				var current_title 	= this.fnode.arr['tit'][slide_num]

				if (!empty(current_lan))
				{
					if (cont > 0) current_active = ""
					this.div_01.reload_contents(	current_lan,
													current_title,
													current_active)
					options_content += this.div_01.code
					cont++
				}
			}
		}
		this.content = options_content
	}

	build_data()
	{
		this.content = ""
		this.create_bucle_options()
		this.pcreate()

		//Ok [17-06-24]
		// this.p('Code > ' +  this.code)

	}

}

exports.flg02_div_flags = flg02_div_flags
