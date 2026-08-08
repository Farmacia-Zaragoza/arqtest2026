//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Truck Phone Icon Class  [V.0.1.7]  (2017-07-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//<div class="icon">
//<svg >
//-------------------------------------------------------------------------------------
//DIV
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const	{ svg_style } 		= 	require(path.join(JS_BASE, 'com/objects/html/svg_style.es6'))


class phn02_div_phone_icon extends svg_style {

	constructor(thm)
	{
		let tag_type = "div"

		super(tag_type)
		this.n = "phn02_div_phone_icon_truck::"

		this.tag_type = "div"
		this.thm = thm
		this.fnode = this.thm.arr['fnode']['site_info_lang']
		this.class = "icon"
		this.build_data()
	}

	create_svg()
	{
		this.svg_path				= 	'r_img/phone/'
		this.svg_name 				= 	"phone_icon_white.svg"

		this.svg_class				=	"email_icon_white"

		this.svg_alt				=	''	 // Pending to compose

		this.create_svg_base()
		// this will call to svg_inline or svg_external depends of site options
		// file_get_svg_code
	}


	build_data()
	{
		this.content = ""
		this.create_svg()
		this.pcreate()

		// Ok [17-11-02]
		// this.p('code >' + this.code)

	}

}

exports.phn02_div_phone_icon = phn02_div_phone_icon
