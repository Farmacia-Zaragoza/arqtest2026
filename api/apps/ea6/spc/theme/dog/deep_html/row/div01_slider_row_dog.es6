//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Row Class  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//*<div class="row">
//  <div class="col-2 edu-letters-container-left desktop"></div>
//	<div id="slider-container" page="main" class="col-12 col-lg-8"
//		pathToImgFolder="edu/0935x0700/"
//		imgExtension=".jpg"
//		numresolutions="6,6,4,4,4"
// <div class="col-2 edu-letters-container-right desktop"></div>
//-------------------------------------------------------------------------------------
//DIV
// DIV
// DIV
// DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 					= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.es6"	);

const	{ html_style } 			= 	require(	cons.JS_BASE  + 'com/objects/html/html_style.es6'		);

class div01_slider_row_dog extends html_style {

	constructor(thm) 
	{
		let tag_type 			= 	"div"

		super(tag_type)
		this.n 					= 	"row01_div_slider_dog::"
		this.tag_type 			= 	"div"
		this.class 				= 	"row"

		this.thm				=	thm

		this.div_01 			= 	new html_style("div")
		this.div_01.class 		= 	"col-2 edu-letters-container-left desktop"
		this.div_01.pcreate()

		this.div_03 			= 	new html_style("div")
		this.div_03.class 		= 	"col-2 edu-letters-container-right desktop"
		this.div_03.pcreate()

		this.div_02 			= 	new html_style("div")

		this.div_01.class 		= 	"col-2 edu-letters-container-left desktop"
		this.div_01.pcreate()
		
		this.build_data()
	}

	// <div id="slider-container" page="main" class="col-12 col-lg-8"
	create_div_02()
	{
		this.div_02.id			= 	'slider-container'

		this.div_02.class		= 	'col-12 col-lg-8'
		this.div_02.page		= 	'main'

		this.div_02.resnumbers	= 	'6,6,4,4,4'

		// La resolucion que tengo de desktop es 1600
		this.div_02.path		= 	this.thm.u.http_domainbar +
			this.thm.s.img_url_word + '/' + this.thm.s.img_resDesktop + '/'

//		this.div_02.path		= 	
//			this.thm.s.img_url_folder + '/' + '0935x0700' + '/'

		this.div_02.ext			= 	'.' + this.thm.s.img_extension

		this.div_02.pcreate()
		this.content 			+= 	this.div_02.code
		
	}


	build_data() 
	{
		this.content 			= 	""

		this.content 			+= 	this.div_01.code
		this.create_div_02()
		this.content 			+= 	this.div_03.code
		this.pcreate()

		// CK [17-11-02]
		// this.p('row_code >' + this.code)														

	}

}

exports.div01_slider_row_dog = div01_slider_row_dog