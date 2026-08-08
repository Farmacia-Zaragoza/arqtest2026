// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Html Flex UL Class  [V.0.0.3]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Theme UL Structure - Peloncita site
//------------------------------------------------------------------------------------------------
// <ul class="slides">
//<li class="image-wrapper">
//UL
//LI (External) - START REPEAT
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider UL Peloncita
//------------------------------------------------------------------------------------
//Methods:
//- reload_contents  : Reload field attributes
//- load_file        : Load dat file from system
//- build_data   	  : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		empty 					= 	require(	'is_empty'											),
		{ flx01_li_flex }		= 	require( 	path.join(JS_BASE, 'spc/theme/common/deep_html/slider/flx01_li_flex.es6'));


class flx02_ul_flex extends html_style {

  constructor(	fnode 		= ""			,
  				slide_type 	= "slider"		)
  {
    let tag_type 				= "ul"

    super(tag_type)
    this.n 						= "flx02_ul_flex_mid::"
    this.num_elements_menu 		= ""

    this.tag_type 				= "ul"
    this.fnode 					= fnode
    this.li_01 					= new flx01_li_flex(this.fnode, slide_type)
    this.build_data()
  }

  build_data()
  {
    this.code 					= ""
    this.content 				= ""
    this.class 					= "slides"
    var sw_active 				= 0
    var cont 					= 0
    {
      let _fnode_arr_oim = this.fnode.arr['oim']

	  // 139
	  // this.p('Images_L '+ this.fnode.arr['such1'].length )

	  // 139
	  // this.p('Num_slides_ul '+ this.fnode.arr['oim'].length )

      for (var slide_num in this.fnode.arr['oim'])
      {
        var img_name 			= this.fnode.arr['oim'][slide_num]
        var tit 				= this.fnode.arr['tit'][slide_num]

        if (!empty(img_name))
          {
            var orientation = this.fnode.arr['ori'][slide_num]

            this.li_01.reload_contents(slide_num, orientation)
            this.content += this.li_01.code
			// this.p( 'Len ' + slide_num  + ' ' + this.content.length)

          }
      }
    }

    this.pcreate()

    // Ok [17-11-02]
    // this.p('Code : > ' + this.code.length )
  }

}

exports.flx02_ul_flex = flx02_ul_flex
