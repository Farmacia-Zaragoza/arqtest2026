// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Description Parragraph Class  [V.0.1.2]  (2018-01-13)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//<div class="flex-caption">
//<div class="backward"> (Inner)
//<div class="arrow up">
//<div class="marquee marquee-vertical" data-speed="50" data-direction="vertical" data-hover-method="toggleForward"> (External)
//<div class="forward">  (Inner)
//<div class="arrow down">
//Firts long description of the flat. Long lines of text. Multiple lines of text. Another text.
//More copy. Firts long description of the flat. Firts long description of the flat.
//DIV
//DIV
//DIV (marque)
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_contents   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	{ svg_style } 			= 	require(path.join(JS_BASE, 'com/objects/html/svg_style.es6'))
		const { html_style } = require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const { mar01_div_marquee } = require(path.join(JS_BASE, 'spc/theme/truck/deep_html/types/marquee/mar01_div_marquee.es6'))

class des01_div_parragraph extends html_style {

	constructor(thm = "")
	{
		let tag_type 					= 	"div"

		super(tag_type)
		this.n 							= 	"des01_div_parragraph::"

		this.tag_type 					= 	"div"
		this.thm 						= 	thm

		this.fnode 						= 	this.thm.arr['fnode']['image_list']
		this.flinks_lang 				= 	this.thm.arr['fnode']['link_list_lang']
		this.class 						= 	"flex-caption"
		this.div_marquee_content 		= 	new html_style("div")
		this.p_01 						= 	new html_style("p")
		this.p_01.style 				= 	"text-align:justify"

		this.siv_forward 				= 	new html_style("div")
		this.siv_backward 				= 	new html_style("div")
		this.siv_arrow_up 				= 	new svg_style("div")
		this.siv_arrow_up.fnode			=	this.fnode
		this.siv_arrow_down 			= 	new svg_style("div")
		this.siv_arrow_down.fnode		=	this.fnode

		this.siv_forward.class 			= 	"forward"
		this.siv_backward.class 		= 	"backward"
		this.siv_arrow_up.class 		= 	"arrow up"
		this.siv_arrow_down.class 		= 	"arrow down"
		this.div_marquee_content.class 	= 	"marquee-content"
		this.create_marqee_content()
		this.reload_contents()
	}

	create_marqee_content() {
		for (var line of Object.values(this.flinks_lang.arr['lines']))
		{
			this.p_01.content = "-" + line
			this.p_01.pcreate()
			this.div_marquee_content.content += this.p_01.code
		}
		this.div_marquee_content.pcreate()
	}

	create_marquee()
	//$this->extended_text = 'STARTS ONE --- Firts long description of the flat. Long lines of text.  --- FINISHES ONE'
	{
		this.div_marquee = new mar01_div_marquee(	this.fnode,
													this.div_marquee_content.code, "30", "vertical", "forwardStop")
		this.content += this.div_marquee.code
	}

	create_backward()
	{
		this.siv_arrow_up.content				=		''
		this.siv_arrow_up.svg_path				= 		'r_img/arrows/'
		this.siv_arrow_up.svg_name 				= 		"arrow_up.svg"

		this.siv_arrow_up.svg_alt				=		''	 // Pending to compose

		this.siv_arrow_up.svg_class				=		'arrow_up'

		this.siv_arrow_up.create_svg_base()

		this.siv_arrow_up.pcreate()

		for (var i = 0;  i < 5 ;  i++) this.siv_backward.content += this.siv_arrow_up.code

		this.siv_backward.pcreate()
		this.content += this.siv_backward.code
	}

	create_forward()
	{
		this.siv_arrow_down.content				=		''
		this.siv_arrow_down.svg_path			= 		'r_img/arrows/'
		this.siv_arrow_down.svg_name 			= 		"arrow_down.svg"

		this.siv_arrow_down.svg_alt				=		''	 // Pending to compose
		this.siv_arrow_down.svg_class			=		'arrow_down'

		this.siv_arrow_down.create_svg_base()

		this.siv_arrow_down.pcreate()

		for (var i = 0;  i < 5 ;  i++) this.siv_forward.content += this.siv_arrow_down.code

		this.siv_forward.pcreate()
		this.content += this.siv_forward.code
	}

	reload_contents()
	{
		this.content = ""
		this.create_backward()
		this.create_marquee()
		this.create_forward()
		this.pcreate()

		//Ok [18_01_12]
		// this.p('code >' + this.code	)

	}

}

exports.des01_div_parragraph = des01_div_parragraph
