// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS Html Style Class  [V.0.0.4]  (2018-02-14)
// Brqx Group - Agile Farmacia Zaragoza Methodology - [EA6_COMMON]
//-------------------------------------------------------------------------------------
// Node Js ES6 - Server with express - http/2
// ------------------------------------------------------------------------------------
// Methods:
// - reload               : Reload dhtml object properties
// - prepare              : Prepare final fields for object creation. Let to have multiple intances with same init values
// - set_db_architecture  : Set database architecture for current SuperMnu Generation
// - clean                : Clean all asigned contents
// - create               : Build html final code for dhtml object
// - pcreate              : Prepare and Create dhtml object
// - create_class         : Call to create method changing dhtml class property
// - build_contents       : Recreate contents or dummy value depends depth parameter pased
// - build_text           : Recreate contents dummy of tame value
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	echo 				= 	require(	'node-echo'								),
		{ printlog } 		= 	require(	path.join(JS_BASE, 'com/objects/logs/printlog.es6')),
		{ savelog } 		= 	require(	path.join(JS_BASE, 'com/objects/logs/savelog.es6'));

class html_style extends printlog {

  constructor(   tag_type     	= ''  ,
                 tame         	= ''  ,
                 class_name    	= ''  ,
                 style        	= ''  ,
                 id           	= ''  ,
                 name         	= ''  ,
				 value        	= ''  ,
                 src          	= ''  )
  {
	// Extends printlog
 	super()
	// Atributos
    this.n 								= 'html_style::'	 // class name
    this.m	 							= ''				 // method name

    this.tag_type       				=   ''     // Tag type (div, nav , img ... )
    this.tag_name       				=   ''     // Tag name (div_01 , div_02 ...) - Left for compatibility

    // Imported html styles from files
    this.class          				=   ''
    this.style          				=   ''
    this.id             				=   ''
    this.src            				=   ''
    this.alt            				=   ''
    this.value          				=   ''
    this.title          				=   ''
    this.type           				=   ''
    this.data_title     				=   ''
    this.name           				=   ''
    this.href           				=   ''
    this.rel            				=   ''
    this.action         				=   ''
    this.method         				=   ''
    this.target         				=   ''
    this.media  	       				=   ''
    this.width      	   				=   ''
    this.height         				=   ''
    this.imgpath         				=   ''

    this.placeholder   					=   ''

	// New html5 attributes
    this.role           				=   ''
    this.data_array 	   				=   ''
    this.data_toggle    				=   ''
    this.data_trigger    				=   ''
    this.data_content    				=   ''
    this.data_header    				=   ''
    this.data_original_title			=   ''

    this.aria_controls  				=   ''
    this.aria_expanded  				=   ''
    this.aria_labelledby 				=   ''
    this.aria_hidden  					=   ''
	this.data_background				=	''
	this.data_src						=	''
	this.data_src_small					=	''
	this.data_ride						=	''
	this.data_interval					=	''
	this.data_slide						=	''
	this.data_lightbox					=	''
	this.data_flex_src					=	''
	this.data_flex_src_small			=	''


	// New Twitter Dat attributes
	this.data_lang						=	''
	this.data_height					=	''
	this.data_dnt						=	''
	this.data_theme						=	''

	// New Facebook Dat attributes
	this.data_href						=	''
	this.data_tabs						=	''
	this.data_small_header				=	''
	this.data_adapt_container_width		=	''
	this.data_hide_cover				=	''
	this.data_show_facepile				=	''

	this.data_speed						=	''
	this.data_direction					=	''
	this.data_hover_method				=	''

	this.data_caption					=	''
	this.data_links						=	''
	this.data_link						=	''
	this.text_data						=	''
	this.font_data						=	''

	this.cite							=	''
	this.page							=	''
	this.path							=	''
	this.ext							=	''

	// New Script Jquery Attributes
	this.integrity						=	''
	this.async							=	''
	this.defer							=	''
	this.crossorigin					=	''
	this.charset						=	''
	// Polygon - Svg
	this.points							=	''
	this.x								=	''
	this.y								=	''
	this.x1								=	''
	this.y1								=	''
	this.x2								=	''
	this.y2								=	''
	this.cx								=	''
	this.cy								=	''
	this.r								=	''
	this.version						=	''
	this.fill							=	''
	this.viewbox						=	''
	this.xml_space						=	''

	// Meta Attributes
	this.http_equiv						=	''
	this.mcontent						=	''			// Meta Content
	this.lang							=	''			// Head Lang
	this.xml_lang						=	''			// Head Lang
	this.xmlns							=	''			// Head Lang
	this.property						=	''			// Head Lang
	this.percents						=	''			//
	this.resnumbers						=	''			//


    this.adds           				=   ''     // Code fragment for TAG

    this.debug          				=   ''     // Block for debug [TAG]

    // Our html properties
    this.tame           				=   ''     // Unique Tag name (div_01 , div_02 ...)

    // Final html styles to use for create content
    this.f_class        				=   ''
    this.f_style        				=   ''
    this.f_id           				=   ''
    this.f_src          				=   ''
    this.f_alt          				=   ''
    this.f_value        				=   ''
    this.f_title        				=   ''
    this.f_type         				=   ''
    this.f_data_title   				=   ''
    this.f_name         				=   ''
    this.f_href         				=   ''
    this.f_rel          				=   ''
    this.f_action       				=   ''
    this.f_method       				=   ''
    this.f_target       				=   ''
    this.f_media       					=   ''
    this.f_width       					=   ''
    this.f_height       				=   ''
    this.f_imgpath         				=   ''

    this.f_placeholder   				=   ''

	// Html5 attributes
    this.f_role         	  			=   ''
    this.f_data_array    				=   ''
    this.f_data_toggle    				=   ''
    this.f_data_trigger    				=   ''
    this.f_data_content    				=   ''
    this.f_data_header    				=   ''
    this.f_data_original_title			=   ''

    this.f_aria_controls  				=   ''
    this.f_aria_expanded  				=   ''
    this.f_aria_hidden	  				=   ''
	this.f_aria_labelledby				=   ''
	this.f_data_background				=	''
	this.f_data_src						=	''
	this.f_data_src_small				=	''
	this.f_data_ride					=	''
	this.f_data_interval				=	''
	this.f_data_slide					=	''
	this.f_data_lightbox				=	''
	this.f_data_flex_src				=	''
	this.f_data_flex_src_small			=	''


	// New Twitter Dat attributes
	this.f_data_lang					=	''
	this.f_data_height					=	''
	this.f_data_dnt						=	''
	this.f_data_theme					=	''

	// New Facebook Dat attributes
	this.f_data_href					=	''
	this.f_data_tabs					=	''
	this.f_data_small_header			=	''
	this.f_data_adapt_container_width	=	''
	this.f_data_hide_cover			=	''
	this.f_data_show_facepile			=	''

	this.f_data_speed					=	''
	this.f_data_direction				=	''
	this.f_data_hover_method			=	''

	this.f_data_caption					=	''
	this.f_data_links					=	''
	this.f_data_link					=	''
	this.f_text_data					=	''
	this.f_font_data					=	''

	this.f_cite							=	''
	this.f_page							=	''
	this.f_path							=	''
	this.f_ext							=	''

	// New Script Jquery Attributes
	this.f_integrity					=	''
	this.f_async						=	''
	this.f_defer						=	''
	this.f_crossorigin					=	''
	this.f_charset						=	''
	// Polygon fields
	this.f_points						=	''
	this.f_x							=	''
	this.f_y							=	''
	this.f_x1							=	''
	this.f_y1							=	''
	this.f_x2							=	''
	this.f_y2							=	''
	this.f_cx							=	''
	this.f_cy							=	''
	this.f_r							=	''
	this.f_version						=	''
	this.f_fill							=	''
	this.f_viewbox						=	''
	this.f_xml_space					=	''


	// Meta Attributes
	this.f_http_equiv					=	''
	this.f_mcontent						=	''			// Meta Content
	this.f_lang							=	''			// Lang
	this.f_xml_lang						=	''			// Lang
	this.f_xmlns						=	''			// Lang
	this.f_property						=	''			// Lang

	this.f_percents						=	''			//
	this.f_resnumbers					=	''			//


    this.f_adds         				=   ''     // Code fragment for TAG

    // Our html properties
    this.f_tame         				=   ''     // Tag name (div_01 , div_02 ...)


    this.content        				=   ''     // Inner content of html object
    this.code           				=   ''     // Full content of html object or other code

    this.page_position					= 	''		// Position of object in page - Could be top - left - rigth - bottom


    this.js_code        				=   ''     // Full separation Html Code from Javascript Code

    this.input_file         			=   ''     // Html Tags file for Dhtml common structures
    this.social_file         			=   ''     // Html Tags file for Dhtml Social Network structures (Facebook , Twitter )

    this.events_file        			=   ''     // Events file for Dhtml structures

    this.db_architecture    			= 	1 	 	// Database Drupal architecture

	// Every object will have a map address in site
    this.map							=	''

	this.reload( tag_type, tame, class_name,  style, id, name , value , src )

    }

    // Used to reload tags properties from dat files
    reload( 				tag_type     	= ''  ,
                            tame         	= ''  ,
                            class_name     	= ''  ,
                            style        	= ''  ,
                            id           	= ''  ,
                            name         	= ''  ,
                            value        	= ''  ,
                            src          	= '')

    {
      this.tag_type       						=   tag_type
      this.tag_name       						=   tame
	  if ( class_name != ""	) 	this.class        = '' +   class_name
	  if ( style != ""		)	this.style        = '' +   style
	  if ( id 	  != ""		)	this.id           = '' +   id
	  if ( src   != ""		)	this.src          = '' +   src
	  if ( name  != ""		)	this.name         = '' +   name
	  if ( value != ""		)	this.value        = '' +   value


	  // Allways must to have tame value
	  if ( tame == ""		)	tame = tag_type

      // Our tag name in html generated
      this.tame           =   tame

      // Debug block for big code ( I don't remember if is used)

      this.debug          =   '<[' +  this.tame     + ']>'

	// Commented to test bootstrap

//      this.set_db_architecture()
    }

    // Prepare and create
    pcreate(new_content	=	'')
    {
      this.prepare()
      this.create(new_content)
    }

    prepare()
    {
     // Prepare final tags to use current tag content
     // In html all must to be strings

      this.f_class         				=   '' + this.class
      this.f_style         				=   '' + this.style
      this.f_id            				=   '' + this.id
      this.f_src           				=   '' + this.src
      this.f_alt           				=   '' + this.alt
      this.f_value         				=   '' + this.value
      this.f_title         				=   '' + this.title
      this.f_type          				=   '' + this.type

      this.f_data_title    				=   '' + this.data_title
      this.f_name          				=   '' + this.name
      this.f_href          				=   '' + this.href
      this.f_rel           				=   '' + this.rel

      // Form Properties
      this.f_action        				=   '' + this.action
      this.f_method        				=   '' + this.method
      this.f_target        				=   '' + this.target
      this.f_media         				=   '' + this.media
      this.f_width         				=   '' + this.width
      this.f_height        				=   '' + this.height
      this.f_imgpath         			=   '' + this.imgpath

      this.f_placeholder   				=   '' + this.placeholder

	  // Html5 new attributes
      this.f_role         				=   '' + this.role
      this.f_data_array       			=   '' + this.data_array
      this.f_data_toggle       			=   '' + this.data_toggle
      this.f_data_trigger      			=   '' + this.data_trigger
      this.f_data_content      			=   '' + this.data_content
      this.f_data_header       			=   '' + this.data_header
      this.f_data_original_title		=   '' + this.data_original_title

      this.f_aria_controls     			=   '' + this.aria_controls
      this.f_aria_expanded     			=   '' + this.aria_expanded
      this.f_aria_hidden       			=   '' + this.aria_hidden
      this.f_aria_labelledby   			=   '' + this.aria_labelledby

      this.f_data_background   			=   '' + this.data_background
      this.f_data_src    				=   '' + this.data_src
      this.f_data_src_small				=   '' + this.data_src_small
      this.f_data_ride					=	'' + this.data_ride
      this.f_data_interval				=	'' + this.data_interval
      this.f_data_slide					=	'' + this.data_slide
      this.f_data_lightbox				=	'' + this.data_lightbox
      this.f_data_flex_src				=	'' + this.data_flex_src
      this.f_data_flex_src_small			=	'' + this.data_flex_src_small

	// New Twitter Dat attributes
      this.f_data_lang					=	''	+ this.data_lang
      this.f_data_height				=	''	+ this.data_height
      this.f_data_dnt					=	''	+ this.data_dnt
      this.f_data_theme					=	''	+ this.data_theme

	// New Facebook Dat attributes
      this.f_data_href					=	''	+ this.data_href
      this.f_data_tabs					=	''	+ this.data_tabs
      this.f_data_small_header			=	''	+ this.data_small_header
      this.f_data_adapt_container_width	=	''	+ this.data_adapt_container_width
      this.f_data_hide_cover			=	''	+ this.data_hide_cover
      this.f_data_show_facepile			=	''	+ this.data_show_facepile

      this.f_data_speed					=	''	+ this.data_speed
      this.f_data_direction				=	''	+ this.data_direction
      this.f_data_hover_method			=	''	+ this.data_hover_method

      this.f_data_caption				=	''	+ this.data_caption
      this.f_data_links					=	''	+ this.data_links

      this.f_data_link					=	''	+ this.data_link
      this.f_text_data					=	''	+ this.text_data
      this.f_font_data					=	''	+ this.font_data

      this.f_cite						=	''	+ this.cite
      this.f_page						=	''	+ this.page
      this.f_path						=	''	+ this.path
      this.f_ext						=	''	+ this.ext

	// New Script Jquery Attributes

      this.f_integrity					=	''	+ this.integrity
      this.f_async						=	''	+ this.async
      this.f_defer						=	''	+ this.defer
      this.f_crossorigin				=	''	+ this.crossorigin
      this.f_charset					=	''	+ this.charset
	// Polygon fields
      this.f_points						=	''	+ this.points
	  this.f_x							=	''	+ this.x
      this.f_y							=	''	+ this.y
	  this.f_x1							=	''	+ this.x1
      this.f_y1							=	''	+ this.y1
	  this.f_x2							=	''	+ this.x2
      this.f_y2							=	''	+ this.y2
      this.f_cx							=	''	+ this.cx
      this.f_cy 						=	''	+ this.cy
      this.f_r							=	''	+ this.r
      this.f_version					=	''	+ this.version
      this.f_fill						=	''	+ this.fill
      this.f_viewbox					=	''	+ this.viewbox
      this.f_xml_space					=	''	+ this.xml_space

	// Meta Attributes
      this.f_http_equiv					=	''	+ this.http_equiv
      this.f_mcontent					=	''	+ this.mcontent
      this.f_lang						=	''	+ this.lang
      this.f_xml_lang					=	''	+ this.xml_lang
      this.f_xmlns						=	''	+ this.xmlns
      this.f_property					=	''	+ this.property

      this.f_percents					=	''	+ this.percents
      this.f_resnumbers					=	''	+ this.resnumbers


      this.f_adds           			=   '' + this.adds

      // Our properties
      this.f_tame          	 			=   '' + this.tame

    }

    clean()
    {
     // Clean content before load

      this.class          				=   ''
      this.style          				=   ''
      this.id             				=   ''
      this.src            				=   ''
      this.alt            				=   ''
      this.value          				=   ''
//      this.f_title          			=   ''
//      this.f_type           			=   ''

      this.data_title     				=   ''
      this.name           				=   ''
      this.href           				=   ''
      this.rel            				=   ''

      // Form Properties
      this.action         				=   ''
      this.method         				=   ''
      this.target         				=   ''
      this.media 	        			=   ''
      this.width 	        			=   ''
      this.height	        			=   ''
      this.imgpath	        			=   ''

      this.placeholder       			=   ''

	  // Html5 new attributes
      this.role         				=   ''
      this.data_array       			=   ''
      this.data_toggle       			=   ''
      this.data_trigger       			=   ''
      this.data_content       			=   ''
      this.data_header       			=   ''
      this.data_original_title 			=   ''

      this.aria_controls       			=   ''
      this.aria_expanded       			=   ''
      this.aria_hidden 	       			=   ''
      this.aria_labelledby    			=   ''

      this.f_data_flex_src				=	''
      this.f_data_flex_src_small		=	''


      this.data_background    			=   ''
      this.data_src    					=   ''
      this.data_src_small				=   ''

	// New Twitter Dat attributes
      this.data_lang					=	''
      this.data_height					=	''
      this.data_dnt						=	''
      this.data_theme					=	''

	// New Facebook Dat attributes
      this.data_href					=	''
      this.data_tabs					=	''
      this.data_small_header			=	''
      this.data_adapt_container_width	=	''
      this.data_hide_cover				=	''
      this.data_show_facepile			=	''

      this.data_speed					=	''
      this.data_direction				=	''
      this.data_hover_method			=	''

      this.data_caption					=	''
      this.data_links					=	''
      this.data_link					=	''
      this.text_data					=	''
      this.font_data					=	''

      this.cite							=	''
      this.page							=	''
      this.path							=	''
      this.ext							=	''

	// New Script Jquery Attributes

      this.integrity					=	''
      this.async						=	''
      this.defer						=	''
      this.crossorigin					=	''
      this.charset						=	''

	// Polygon
      this.points						=	''
      this.x							=	''
      this.y							=	''
      this.x1							=	''
      this.y1							=	''
      this.x2							=	''
      this.y2							=	''
      this.cx							=	''
      this.cy							=	''
      this.r							=	''
      this.version						=	''
      this.fill							=	''
      this.viewbox						=	''
      this.xml_space					=	''


	// Meta Attributes
      this.http_equiv					=	''
      this.mcontent						=	''
      this.lang							=	''
      this.xml_lang						=	''
      this.xmlns						=	''
      this.property						=	''

      this.percents						=	''
      this.resnumbers					=	''

      this.adds           				=   ''

      // Our properties
//      this.tame          	 			=   '' + this.tame

    }


    create(new_content	='')
    {
        if (new_content != '') this.content = new_content

        let str     =''

        if 		( this.tag_type == "hidden" 	)
          str +='<input type="hidden" '
		else
          str    +='<' + this.tag_type
//      puting_contents='html :id ' +   this.tag_type + ':' + this.f_id    +  '- >'
//      GLOBALS['putcont']+=puting_contents

		// Async the first
		// <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

        if ( this.f_defer    		   				!= '' ) str    +=  ' ' 								+ this.f_defer


        if ( this.f_id          					!= '' ) str    +=  ' id="'            				+ this.f_id           				+ '"'
        if ( this.f_class       					!= '' ) str    +=  ' class="'         				+ this.f_class        				+ '"'
        if ( this.f_src         					!= '' ) str    +=  ' src="'           				+ this.f_src          				+ '"'
        if ( this.f_href        					!= '' ) str    +=  ' href="'          				+ this.f_href         				+ '"'
        if ( this.f_alt         					!= '' ) str    +=  ' alt="'           				+ this.f_alt          				+ '"'
        if ( this.f_value       					!= '' ) str    +=  ' value="'         				+ this.f_value        				+ '"'
        if ( this.f_title       					!= '' ) str    +=  ' title="'         				+ this.f_title        				+ '"'
        if ( this.f_type       						!= '' ) str    +=  ' type="'         				+ this.f_type        					+ '"'


        if ( this.f_data_title  					!= '' ) str    +=  ' data-title="'    				+ this.f_data_title   				+ '"'
        if ( this.f_name        					!= '' ) str    +=  ' name="'          				+ this.f_name         				+ '"'
        if ( this.f_style       					!= '' ) str    +=  ' style="'         				+ this.f_style        				+ '"'
        if ( this.f_rel         					!= '' ) str    +=  ' rel="'           				+ this.f_rel          				+ '"'

        // Form Properties
        if ( this.f_action      					!= '' ) str    +=  ' action="'        				+ this.f_action       				+ '"'
        if ( this.f_method      					!= '' ) str    +=  ' method="'        				+ this.f_method       				+ '"'
        if ( this.f_target      					!= '' ) str    +=  ' target="'        				+ this.f_target       				+ '"'
        if ( this.f_media      						!= '' ) str    +=  ' media="'        				+ this.f_media 	      				+ '"'
        if ( this.f_width      						!= '' ) str    +=  ' width="'        				+ this.f_width 	      				+ '"'
        if ( this.f_height      					!= '' ) str    +=  ' height="'        				+ this.f_height 	      				+ '"'
        if ( this.f_imgpath      					!= '' ) str    +=  ' imgFolderName="'        		+ this.f_imgpath 	      			+ '"'

        if ( this.f_placeholder  					!= '' ) str    +=  ' placeholder="'   				+ this.f_placeholder     				+ '"'

		// Html5 attributes
        if ( this.f_role      						!= '' ) str    +=  ' role="'        				+ this.f_role       				+ '"'
        if ( this.f_data_array      				!= '' ) str    +=  ' data-array="'   				+ this.f_data_array      			+ '"'
        if ( this.f_data_toggle      				!= '' ) str    +=  ' data-toggle="'   				+ this.f_data_toggle      			+ '"'
        if ( this.f_data_trigger      				!= '' ) str    +=  ' data-trigger="'   				+ this.f_data_trigger      			+ '"'
        if ( this.f_data_content      				!= '' ) str    +=  ' data-content="'   				+ this.f_data_content      			+ '"'
        if ( this.f_data_header      				!= '' ) str    +=  ' data-header="'   				+ this.f_data_header      			+ '"'
        if ( this.f_data_original_title				!= '' ) str    +=  ' data-original-title="'			+ this.f_data_original_title		+ '"'

        if ( this.f_aria_controls   	  			!= '' ) str    +=  ' aria-controls="' 				+ this.f_aria_controls 				+ '"'
        if ( this.f_aria_expanded     				!= '' ) str    +=  ' aria-expanded="' 				+ this.f_aria_expanded    			+ '"'
        if ( this.f_aria_hidden	     				!= '' ) str    +=  ' aria-hidden="' 				+ this.f_aria_hidden 	    		+ '"'
        if ( this.f_aria_labelledby   				!= '' ) str    +=  ' aria-labelledby="' 			+ this.f_aria_labelledby  			+ '"'

        if ( this.f_data_background  	 			!= '' ) str    +=  ' data-background="' 			+ this.f_data_background  			+ '"'
        if ( this.f_data_src   						!= '' ) str    +=  ' data-src="' 					+ this.f_data_src  					+ '"'
        if ( this.f_data_src_small					!= '' ) str    +=  ' data-src-small="' 				+ this.f_data_src_small					+ '"'
        if ( this.f_data_ride   					!= '' ) str    +=  ' data-ride="' 					+ this.f_data_ride  				+ '"'
        if ( this.f_data_interval					!= '' ) str    +=  ' data-interval="'				+ this.f_data_interval 				+ '"'
        if ( this.f_data_slide						!= '' ) str    +=  ' data-slide="'					+ this.f_data_slide 				+ '"'
        if ( this.f_data_lightbox					!= '' ) str    +=  ' data-lightbox="'				+ this.f_data_lightbox				+ '"'
        if ( this.f_data_flex_src					!= '' ) str    +=  ' data-flex-src="'				+ this.f_data_flex_src				+ '"'
        if ( this.f_data_flex_src_small				!= '' ) str    +=  ' data-flex-src-small="'			+ this.f_data_flex_src_small			+ '"'


	// New Twitter Dat attributes
        if ( this.f_data_lang						!= '' ) str    +=	' data-lang="'					+ this.f_data_lang 					+ '"'
        if ( this.f_data_height						!= '' ) str    +=	' data-height="'				+ this.f_data_height 				+ '"'
        if ( this.f_data_dnt						!= '' ) str    +=	' data-dnt="'					+ this.f_data_dnt 					+ '"'
        if ( this.f_data_theme						!= '' ) str    +=	' data-theme="'					+ this.f_data_theme 				+ '"'

	// New Facebook Dat attributes
        if ( this.f_data_href						!= '' ) str    +=	' data-href="'					+ this.f_data_href 					+ '"'
        if ( this.f_data_tabs						!= '' ) str    +=	' data-tabs="'					+ this.f_data_tabs 					+ '"'
        if ( this.f_data_small_header				!= '' ) str    +=	' data-small-header="'			+ this.f_data_small_header	 		+ '"'
        if ( this.f_data_adapt_container_width		!= '' ) str    +=	' data-adapt-container-width="'	+ this.f_data_adapt_container_width	+ '"'
        if ( this.f_data_hide_cover					!= '' ) str    +=	' data-hide-cover="'			+ this.f_data_hide_cover 			+ '"'
        if ( this.f_data_show_facepile				!= '' ) str    +=	' data-show-facepile="'			+ this.f_data_show_facepile 		+ '"'

        if ( this.f_data_speed						!= '' ) str    +=	' data-speed="'					+ this.f_data_speed 				+ '"'
        if ( this.f_data_direction					!= '' ) str    +=	' data-direction="'				+ this.f_data_direction 			+ '"'
        if ( this.f_data_hover_method 				!= '' ) str    +=	' data-hover-method="'			+ this.f_data_hover_method 			+ '"'

        if ( this.f_data_caption 		 			!= '' ) str    +=	' data-caption="'				+ this.f_data_caption 				+ '"'

        if ( this.f_data_links 			 			!= '' ) str    +=	' data-links="'					+ this.f_data_links	 				+ '"'
        if ( this.f_data_link 			 			!= '' ) str    +=	' data-link="'					+ this.f_data_link	 				+ '"'
        if ( this.f_text_data 			 			!= '' ) str    +=	' text-data="'					+ this.f_text_data	 				+ '"'
        if ( this.f_font_data 			 			!= '' ) str    +=	' font-data="'					+ this.f_font_data	 				+ '"'

        if ( this.f_cite							!= '' ) str    +=	' cite="'						+ this.f_cite 						+ '"'
        if ( this.f_page						!= '' ) str    +=	' page="'						+ this.f_page 						+ '"'
        if ( this.f_path						!= '' ) str    +=	' path="'						+ this.f_path 						+ '"'
        if ( this.f_ext							!= '' ) str    +=	' ext="'						+ this.f_ext 						+ '"'

	// New Script Jquery Attributes

	    if ( this.f_integrity						!= '' ) str    +=	' integrity="'					+ this.f_integrity					+ '"'
	    if ( this.f_crossorigin						!= '' ) str    +=	' crossorigin="'				+ this.f_crossorigin					+ '"'
	    if ( this.f_charset							!= '' ) str    +=	' charset="'					+ this.f_charset						+ '"'
	// Polygon
	    if ( this.f_points							!= '' ) str    +=	' points="'						+ this.f_points						+ '"'
	    if ( this.f_x 								!= '' ) str    +=	' x="'							+ this.f_x						+ '"'
	    if ( this.f_y 								!= '' ) str    +=	' y="'							+ this.f_y						+ '"'
	    if ( this.f_x1 								!= '' ) str    +=	' x1="'							+ this.f_x1						+ '"'
	    if ( this.f_y1 								!= '' ) str    +=	' y1="'							+ this.f_y1						+ '"'
	    if ( this.f_x2 								!= '' ) str    +=	' x2="'							+ this.f_x2						+ '"'
	    if ( this.f_y2 								!= '' ) str    +=	' y2="'							+ this.f_y2						+ '"'
	    if ( this.f_cx 								!= '' ) str    +=	' cx="'							+ this.f_cx						+ '"'
	    if ( this.f_cy								!= '' ) str    +=	' cy="'							+ this.f_cy						+ '"'
	    if ( this.f_r								!= '' ) str    +=	' r="'							+ this.f_r						+ '"'
	    if ( this.f_version							!= '' ) str    +=	' version="'					+ this.f_version						+ '"'
	    if ( this.f_fill							!= '' ) str    +=	' fill="'						+ this.f_fill						+ '"'
	    if ( this.f_viewbox							!= '' ) str    +=	' viewBox="'					+ this.f_viewbox						+ '"'
	    if ( this.f_xml_space						!= '' ) str    +=	' xml-space="'					+ this.f_xml_space						+ '"'


	    if ( this.f_http_equiv						!= '' ) str    +=	' http-equiv="'					+ this.f_http_equiv					+ '"'
	    if ( this.f_mcontent						!= '' ) str    +=	' content="'					+ this.f_mcontent						+ '"'

	    if ( this.f_lang							!= '' ) str    +=	' lang="'						+ this.f_lang							+ '"'
	    if ( this.f_xml_lang						!= '' ) str    +=	' xml:lang="'					+ this.f_xml_lang						+ '"'
	    if ( this.f_xmlns							!= '' ) str    +=	' xmlns="'						+ this.f_xmlns						+ '"'
	    if ( this.f_property						!= '' ) str    +=	' property="'						+ this.f_property						+ '"'

	    if ( this.f_percents						!= '' ) str    +=	' percents="'					+ this.f_percents					+ '"'
	    if ( this.f_resnumbers						!= '' ) str    +=	' resnumbers="'					+ this.f_resnumbers					+ '"'

        if ( this.f_async 		      				!= '' ) str    +=  ' ' 								+ this.f_async

        // Add Code fragments
        if ( this.f_adds        					!= '' ) str    +=                        			  this.f_adds

		if  ( this.tag_type != "html" )
		{
        // Our Properties - Ojo que tame no es el ultimo
        	 //if ( this.f_tame        					!= '' ) str    +=  ' tame="'          				+ this.f_tame         				+ '" '
           	 if ( this.f_tame        					!= '' ) str    +=  ' '
		}

		// Defer the last
  		// <script src="js0/js3/main3.js" defer></script>

        if ( this.f_defer        					!= '' ) str    +=            						  this.f_defer


        if ( this.tag_type == "hidden" || this.tag_type == "img" || this.tag_type == "input"  || this.tag_type == "meta" || this.tag_type == "link")
          str    +='/>'
        else
        {
          str    +='>'

          str    += this.content
          str    +='</' + this.tag_type + '>'
        }

        this.code = str

//      puting_contents='html :code ' +   this.tag_type + ':' + this.code    +  '>'
//      GLOBALS['putcont']+=puting_contents


    }

    create_class(new_content='' , new_class='')
    {
        if (new_class != '') this.f_class = new_class

        this.create(new_content)
    }

	build_text()
	{
    this.content    	= 	'[' + this.tame + '_CONTENT]>'
	}

	build_empty()
	{
    this.content    	= 	''
	}

    build_contents()
    {
	// If depth == ''  : Show full contents
	// If depth == 0   : Show only structure
	// If depth <  1   : Show full contents and call inner(depth--)

	depth 		= 20  // Nos la inventamos de momento no se usa
	depth_str='' + depth

	if 	 	(depth_str == '' )
	{
		// Show full data - Is not needed this method exist here
			this.build_data()
	}
	else if 	(depth_str == '0' )
	{
		// Show only structure (ZERO and EMPTY is the same) - Is not needed this method exist here
//		     puting_contents='UL: depth_empty:' + depth_empty + '>'
//		     GLOBALS['putcont']+=puting_contents

		// Is needed to convert to string to be sure compare is correct
			deep_empty_str= '' + depth_empty

			if (deep_empty_str == 'empty'	)
				this.build_empty()
			else
				this.build_text()
	}
	else
	{
			depth--
			this.build_data()
	}

    this.pcreate()

    }

	// Commented to test bootstrap


    show()
    {
        echo ( this.code )
    }

    shon()
    {
        echo ( this.code + "\n" )
    }


}

//
exports.html_style = html_style;
