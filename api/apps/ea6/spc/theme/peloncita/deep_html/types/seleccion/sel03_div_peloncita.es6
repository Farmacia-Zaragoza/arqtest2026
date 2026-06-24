// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Tab Class  [V.0.0.5]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------

//	<div class="tab_start">
//		<!-- Selectors side -.
//		<ul class="nav nav-tabs nav-tabs-responsive2">
//		<div class="tab-content">
// DIV
//  UL - START REPEAT
//* DIV - START REPEAT
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Slider Div02 Peloncita Class
// ------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - reload_contents  : Reload field attributes
// - load_file        : Load dat file from system
// - build_data       : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class sel03_div_peloncita_middle extends html_style{


  constructor (   	fnode						= ''	,	// 02.Fast node for selection
					ifnode						= ''  	)	// 03.Fast node for selection tabs
  {

		this.n						= 'sel03_mid::'

    	this.div_01
    	this.ul_01

    // Drupal NID - Node ID
    	this.node_id              =   ''                     // NID - Drupal Node ID



        this.tag_type        		=      	'div'

		this.fnode				=		fnode
		this.ifnode				=		ifnode


        super.constructor(this.tag_type)

		this.reload_contents()

    }

    reload_contents ()
    {
		this.build_data()
    }


    //	<div class="tab_start">
    build_data()
    {
    this.code       =       ''
    this.content    =       ''
	this.class 	  =		'tab start'

	// Parte comun de los tabs
    this.ul_01 = new tab02_ul_peloncita_middle(
	  										this.ifnode							// 02
									)


	// this.d('Ul_01_code >' . this.ul_01.code)

	// Parte especifica de los tabs - views
	this.div_01 = new sel02_div_peloncita_middle (
	  										this.fnode					,		// 02
	  										this.ifnode							// 03
									  )


    this.content        +=    this.ul_01.code

    this.content        +=    this.div_01.code

	this.pcreate()


  } // End Build Data

}
//-----------------------------------------------------------------------------------

exports.sel03_div_peloncita_middle = sel03_div_peloncita_middle
