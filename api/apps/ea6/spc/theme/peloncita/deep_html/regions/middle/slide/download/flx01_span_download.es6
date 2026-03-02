//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Flex Slider Class  [V.0.1.6]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <span class="download-icon image-wrapper">
//<img class="img-responsive b-lazy"
//src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
//data-src="http://cica.dbrqx.com/rimg/cica/images/download2-256.png" alt="cica-download-icon" >
//-------------------------------------------------------------------------------------
//SPAN
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)


class flx01_span_download_middle extends html_style {

	constructor(fnode = "") //El constructor debe cargar las propiedades del archivo
	{
		this.tag_type = "span"

		this.n = "flx01_span_download_mid::"
		this.flex_type = "carousel"

		this.class = "download-icon image-wrapper"
		this.fnode = fnode
		this.img_01 = new html_style("img")
		super.constructor(this.tag_type)
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_img() {
		this.img_01.class = "img-responsive b-lazy"
		this.img_01.src = "data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
		this.img_01.data_src = this.fnode.u.site_url + "rimg/cica/images/download2-256.png"
		this.img_01.alt = "cica-download-icon"
		this.img_01.pcreate()
		this.content = this.img_01.code
	}

	build_data() //$this->d('code >' . $this->code)
	{
		this.create_img()
		this.pcreate()
	}

}

exports.flx01_span_download_middle = flx01_span_download_middle