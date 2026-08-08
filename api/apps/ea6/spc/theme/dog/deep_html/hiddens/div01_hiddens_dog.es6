//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flag Option A Class  [V.0.0.4]  (2018-01-07)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Truck Structure Multi Language
//------------------------------------------------------------------------------------------------
// <div class="hiddendata bangladesh-link" data-link="dog.dbrqx.com/index2"></div>
//...
// DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 						= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.es6"	)

const	{ html_style } 				= 	require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))


class div01_hiddens_dog extends html_style {

	constructor() 
	{
		let tag_type 				= "div"

		super(tag_type)
		this.n 						= "div01_hiddens_dog::"

		this.tag_type 				= "div"
	}

	// <div class="hiddendata bangladesh-link" data-link="dog.dbrqx.com/index2"></div>
	reload_contents(class_lang = "", uri_lang = "") 
	{
		this.class 					= 	class_lang
		this.data_link				=	uri_lang
		this.pcreate()

		//Ok [18-02-09]
		// this.p('Code > ' + this.code.length)												
	}

}

exports.div01_hiddens_dog = div01_hiddens_dog