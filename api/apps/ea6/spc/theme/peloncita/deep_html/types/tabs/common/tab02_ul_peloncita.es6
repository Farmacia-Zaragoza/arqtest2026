// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Tabs UL Class  [V.0.0.3]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Theme UL Structure - Peloncita site
//------------------------------------------------------------------------------------------------

//*	<ul class="nav nav-tabs nav-tabs-responsive2">
//	  <!-- Level 09:LI 	Revel 06			-.
//   <li class="active" role="presentation">
//    ...
//  </ul><!-- end menu -.
// UL
//  LI - START REPEAT
//*  A
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Slider UL Peloncita
// ------------------------------------------------------------------------------------
// Methods:
// - build_data   	  : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--



class tab02_ul_peloncita_middle extends html_style{


    constructor (   fnode   				= 	''  	,
    								index_id				=	'id' 	,
									index_name				= 	'txt'	)


   {
    // El constructor debe cargar las propiedades del archivo

        super()

        this.tag_type        		=      	'ul'

		this.n						= 'sld02_ul_mid::'

    	this.num_elements_menu   = ''

    	index_id 			=	'id'
    	index_name 		=	'txt'


		this.index_id 			=		index_id
		this.index_name 			=		index_name

        super.constructor(this.tag_type)

		this.fnode				=		fnode

        this.li_01          		=
        					new tab01_li_peloncita_middle(	this.fnode)

       	this.build_data()


    }

    build_data()
    {
    this.code       =       ''
    this.content    =       ''

	this.class 	  =		'nav nav-tabs nav-tabs-responsive2'

    this.num_elements_menu = this.fnode.arr[this.index_name].length

	// 10 - bad
	// this.p('Num-002 - ' + this.num_elements_menu)

    // Clean al JS Code
    let sw_active = 0     // To set first active class

    // REVISAR BUCLE

	for (var slide_num in this.fnode.arr[this.index_id])
	{
		var slide_name			=	this.fnode.arr[this.index_id][slide_num]

        this.replace(slide_name , " ", "-")
        var slide_hyphen = this.result

//		<a id="Primer-vistazo-tab" data-toggle="tab" href="#Primer-vistazo" role="tab" aria-controls="Primer-vistazo" aria-expanded="true">
//			<span class="text"> Primer vistazo </span>

        let span_text            	=	slide_name
        let a_id  	        		=   slide_hyphen
        let a_aria_controls     	=	slide_hyphen
		let a_href            		=   "#" + 		 slide_hyphen
		let li_class				=	''
        let a_aria_expanded			=	''


		// General Num 0
        if ( !empty(slide_name) 									)
        {

          // Empty code for every slide
          this.li_01.content=''
          this.li_01.code=''

          if (sw_active == 0)
          {
            li_class 			=	"active"
			a_aria_expanded	=	"true"
          }
		  else if  (sw_active == 1)
		  {
            li_class = "next"
			a_aria_expanded	=	""
		  }
          else
		  {
            li_class = ""
			a_aria_expanded	=	""
		  }

          sw_active++

          this.li_01.reload_contents(
				li_class             	,	// 01
	            span_text            	,	// 02
                a_id  	        		,	// 03
                a_aria_controls     	,	// 04
				a_aria_expanded		,	// 05
				a_href						// 06
		  )

          this.content        +=    this.li_01.code


        } // end If

     } // end for


	this.pcreate()
	// this.d('code:>' + this.code)

  	} // End Build Data


}


exports.tab02_ul_peloncita_middle = tab02_ul_peloncita_middle
