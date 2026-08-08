//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Lazy Converter Method 02
//-------------------------------------------------------------------------------------
//Convert images to Lazy code to use it
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//<a href="/pais/bosnia" class="image-wrapper imagefield imagefield-field_foto_al_azar imagefield-nodelink" id="imagefield-nodelink-51578">
//<img class="b-lazy imagefield imagefield-field_foto_al_azar"
//src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
//data-src="http://cica.dbrqx.com/files/images/paises/al_azar/brqx_mos08bos_vivo_-_Mostar_-_Bosnia_-__DSCN7845_0320X0240.JPG"
//alt="brqx_mos08bos_vivo_-_Mostar_-_Bosnia_-__DSCN7845_0320X0240.JPG" title="brqx_mos08bos_vivo_-_Mostar_-_Bosnia_-__DSCN7845_0320X0240.JPG"  width="120" height="90">
//-------------------------------------------------------------------------------------
//A
//IMG
//DIV
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class lazy_02 extends html_style {

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
		this.build_contents()
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

	build_data() //Calling to convert
	//$puting_contents='Lazy: Code:>' . $this->code. '>' 			
	//$GLOBALS['putcont'].=$puting_contents														
	{
		this.class = "image-wrapper"
		this.href = this.site_url + "images/brqx_tour_eiffel_logo_04_180_garland.gif"
		this.create_img_01()
		this.pcreate()
	}

}

exports.lazy_02 = lazy_02
