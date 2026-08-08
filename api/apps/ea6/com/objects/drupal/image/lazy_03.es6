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
//<img class="b-lazy " src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
//data-src="http://cica.dbrqx.com/files/images/paises/al_azar/brqx_mos08bos_vivo_-_Mostar_-_Bosnia_-__DSCN7845_0320X0240.JPG"
//alt="brqx_mos08bos_vivo_-_Mostar_-_Bosnia_-__DSCN7845_0320X0240.JPG" title="brqx_mos08bos_vivo_-_Mostar_-_Bosnia_-__DSCN7845_0320X0240.JPG"  width="120" height="90">
//-------------------------------------------------------------------------------------
//A
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class lazy_03 extends html_style {
		constructor() {
				this.tag_type = "img"
				super(this.tag_type)
				this.n = "lazy_03"
				this.alt = ""
				this.height = ""
				this.width = ""
				this.img = ""
				this.class = "b-lazy"
				this.src = "data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
		}

		reload_contents(img, tit, width, height) 
		{
				this.alt = tit
				this.data_src = img
				this.width = width
				this.height = height
				this.pcreate()
		}

}

exports.lazy_03 = lazy_03
