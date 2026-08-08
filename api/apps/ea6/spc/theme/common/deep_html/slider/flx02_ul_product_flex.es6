//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html UL Class  [V.0.0.3]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Theme UL Structure - Peloncita site
//------------------------------------------------------------------------------------------------
// <ul class="slides">
//<li>
//<img class="b-lazy" src="data:image/gifbase64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII="
//data-src="img/H.jpg" data-src-small="img/H.jpg" />
//UL
//LI (Unique Internal)
//IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider Unique Product
//------------------------------------------------------------------------------------
//Methods:
//- build_data   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));
		const { flx01_li_flex }	= 	require( 	path.join(JS_BASE, 'spc/theme/common/deep_html/slider/flx01_li_flex.es6'));
		empty 				= 	require(	'is_empty'											),
		path				= 	require( 	'path'																	);


class flx02_ul_product_flex extends html_style {

  constructor(fnode = "", slide_type = "slider")
  {
	let tag_type 							= "ul"

    super(tag_type)
    this.n 									= "flx02_ul_product_mid::"
    this.num_elements_menu 					= ""

    this.tag_type 							= "ul"
    this.fnode 								= fnode
    this.li_01 								= new flx01_li_flex(this.fnode, slide_type)
    this.build_data()
  }

  build_data()
  {
    this.code = ""
    this.content = ""
    this.class = "slides"
    var sw_active = 0
    var num_elems = this.fnode.arr.oim.length
    var slide_num = path.basename(this.fnode.u.page_iargs)


	var max_slides

    if ( isNaN(slide_num)   ||
    	 (slide_num > num_elems) )
    	 	slide_num = 1

    var img_name = this.fnode.arr['oim'][slide_num]
    var tit = this.fnode.arr['tit'][slide_num]

	// this.p('Img Name ' + img_name)

    if (!empty(img_name))
      {

        var orientation = this.fnode.arr['ori'][slide_num]
        this.li_01.reload_contents(slide_num, orientation)
        this.content += this.li_01.code

      }

    this.pcreate()
  }

}

exports.flx02_ul_product_flex = flx02_ul_product_flex
