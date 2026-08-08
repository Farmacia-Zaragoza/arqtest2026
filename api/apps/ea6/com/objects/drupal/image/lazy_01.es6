//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Lazy Converter Method 01
//-------------------------------------------------------------------------------------
//Convert images to Lazy code to use it
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//<a class="image-wrapper" href="images/brqx_tour_eiffel_logo_04_180_garland.gif" data-lightbox="">
//<img class="b-lazy image image-preview img-responsive" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
//data-src="images/brqx_tour_eiffel_logo_04_180_garland.gif" alt="brqx_ans09reu_Anse Cascades_Per_0320_2009_Reu74806"
//data-src-small="" title="brqx_ans09reu_Anse Cascades_Per_0320_2009_Reu74806" >
//<div class="image-overlay"></div>
//<img class="b-lazy focus-icon" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
//alt="Focus placeholder icon" data-src="images/focus3.svg" alt="">
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class lazy_01 extends html_style {
	constructor(site_url) 										
	{
		this.tag_type = "a"
		super(this.tag_type)
		this.content_html = ""
		this.content_img = ""
		this.content_title = ""
		this.site_url = ""
		this.dom = new DOMDocument()
		this.img_01 = new html_style("img")
		this.img_02 = new html_style("img")
		this.div_01 = new html_style("div")
	}

	reload_contents(content_html) {
		this.content_html = content_html
		this.extract_img()
		this.build_data()
	}

	fast_reload(img_src = "", img_title = "") {
		this.content_img = img_src
		this.content_title = img_title
		this.build_data()
	}

	extract_img() //code to convert
	//$this->img = $xpath->evaluate("string(//img/@data-src)")	// Get Img path
	{
		this.dom.loadHTML(this.content_html)
		var xpath = new DOMXPath(this.dom)
		this.content_img = xpath.evaluate("string(//img/@src)")
		this.content_title = xpath.evaluate("string(//img/@title)")
	}

	create_img_01() {
		this.img_01.class = "b-lazy image image-preview img-responsive"
		this.img_01.src = "data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
		this.img_01.data_src = this.content_img
		this.img_01.title = this.content_title
		this.img_01.alt = this.content_title
		this.img_01.pcreate()
		this.content = this.img_01.code
	}

	create_img_02() {
		this.img_02.class = "b-lazy image focus-icon"
		this.img_02.src = "data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
		this.img_02.data_src = this.site_url + "images/focus.svg"
		this.img_02.alt = this.content_title
		this.img_02.pcreate()
		this.content += this.img_02.code
	}

	create_div_01() {
		this.div_01.class = "image-overlay"
		this.div_01.pcreate()
		this.content += this.div_01.code
	}

	build_data() //"images/brqx_tour_eiffel_logo_04_180_garland.gif" 
	//Calling to convert
	//$puting_contents='Lazy: Code:>' . $this->code. '>' 			
	//$GLOBALS['putcont'].=$puting_contents														
	{
		this.class = "image-wrapper"
		this.href = this.site_url + this.content_img
		this.create_img_01()
		this.create_div_01()
		this.create_img_02()
		this.pcreate()
	}

}

exports.lazy_01 = lazy_01
