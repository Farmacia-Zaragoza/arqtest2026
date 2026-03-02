//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flex Slider Download Class  [V.0.1.6]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//  <div class="quality">
//<a href="javascript:void(0)" class="low-quality">Medium Quality <span class="size">(780 &times 585)</span></a>
//<a href="javascript:void(0)" class="high-quality">High Quality <span class="size">(1560 &times 1170)</span></a>
//<!-- javascript:void(0) will be changed with jquery on run time-->
//-------------------------------------------------------------------------------------
//DIV
//A
//SPAN
//A
//SPAN
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flx01_div_download_middle extends html_style {

	constructor() 
	{
		this.tag_type = "div"
		this.n = "flx01_div_download_mid::"

		this.class = "quality"
		this.span_01 = new html_style("span")
		this.span_02 = new html_style("span")
		this.a_01 = new html_style("a")
		this.a_02 = new html_style("a")
		super.constructor(this.tag_type)
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_a_01() {
		this.span_01.class = "size"
		this.span_01.content = "(780 &times 585)"
		this.span_01.pcreate()
		this.a_01.class = "low-quality"
		this.a_01.href = "javascript:void(0)"
		this.a_01.content = "Medium Quality "
		this.a_01.content += this.span_01.code
		this.a_01.pcreate()
		this.content += this.a_01.code
	}

	create_a_02() {
		this.span_02.class = "size"
		this.span_02.content = "(1560 &times 1170)"
		this.span_02.pcreate()
		this.a_02.class = "high-quality"
		this.a_02.href = "javascript:void(0)"
		this.a_02.content = "High Quality "
		this.a_02.content += this.span_02.code
		this.a_02.pcreate()
		this.content += this.a_02.code
	}

	build_data() //$this->d('code >' . $this->code)
	{
		this.content = ""
		this.create_a_01()
		this.create_a_02()
		this.pcreate()
	}

}

exports.flx01_div_download_middle = flx01_div_download_middle