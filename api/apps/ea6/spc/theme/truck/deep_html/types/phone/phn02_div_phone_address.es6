// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Phone Svg Address Truck Class  [V.0.1.2]  (2017-07-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// <div class="address">
//<img src="svg/phone-no.svg">
//-------------------------------------------------------------------------------------
//DIV
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const	{ svg_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/svg_style.es6')));


class phn02_div_phone_address extends svg_style {

	constructor(thm)
	{
		let tag_type = "div"

		super(tag_type)
		this.n 						= "phn02_div_phone_address_truck::"

		this.tag_type 				= "div"
		this.thm 					= thm
		this.fnode 					= this.thm.arr['fnode']['email_phone_common']
		this.class 					= "address"
		this.build_data()
	}

	create_phone_svg()
	{
		this.svg_code_path 			= this.fnode.phone_svg_absolute_path
		this.svg_code_url 			= this.fnode.phone_svg_absolute_url

		// http://lucas-rivera.com/cache/nsu/lucas-rivera.com/nouser/truck/svg/open_sans_new/blue/22/human/a/common/689435077_svgdata_fr_code.svg
		// /ram/brqx/base/react/node/cache/nsu/lucas-rivera.com/nouser/truck/svg/open_sans_new/blue/22/human/a/common/689435077_svgdata_fr_code.svg

		// this.p('PHONE_PATH ' + this.fnode.phone_svg_absolute_path )
		// this.p('PHONE_URL '  + this.fnode.phone_svg_absolute_url )

		this.svg_alt				=	''	 // Pending to compose

		this.create_svg_base_with_full_path()
		// this will call to svg_inline or svg_external depends of site options
		// file_get_svg_code
	}

	build_data()
	{
		this.content 				= ""
		this.create_phone_svg()
		this.pcreate()

		// ok [17-11-02]
		// this.p('code >' + this.code)
	}

}

exports.phn02_div_phone_address = phn02_div_phone_address
