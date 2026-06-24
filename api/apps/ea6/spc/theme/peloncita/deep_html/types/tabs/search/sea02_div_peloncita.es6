// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Html Div Class  [V.0.0.6]  (2016-11-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//*		<div class="tab-content">
//			<div id="General-pill" class="tab-pane fade active in">
//				<div id="tabs-tabset0-1" class="fragment" style="">
//      ..
//			<div id="Fotolistados-pill" class="tab-pane fade">
//				<div id="tabs-tabset0-2" class="fragment tabs-hide" style="">
// DIV
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


class sea02_div_peloncita_middle extends html_style{


    constructor (   fnode		           	= ''	,	// 02 Fast node for selection
    								index_id				=	'id' 	,
									index_name				= 	'txt'	)
   {

        let tag_type        		=      	'div'
    	super(tag_type)

        this.tag_type        		=      	'div'

		this.n						= 'sel02_mid::'

    	this.num_elements_menu   	= ''

    	this.node_id              =   ''                     // NID - Drupal Node ID


    	this.current_date			=	''

    	index_id 			=	'id'
    	index_name 		=	'txt'


        this.fnode  				=      	fnode
		this.index_id 			=		index_id
		this.index_name 			=		index_name



        this.div_01          		=
        				new sea01_div_peloncita_middle(
        						this.fnode								)

		this.reload_contents()

    }

    reload_contents ()
    {
		this.build_data()
    }


    build_data()
    {
    this.code       =       ''
    this.content    =       ''
	this.class 	  =	'tab-content'

    let sw_active = 0     // To set first active class

    // this.p('Index Id ' + this.index_id )


	// Iteramos entre los tipos de busqueda


	for (var slide_num in this.fnode.arr[this.index_id])
    {
		var slide_name			=	this.fnode.arr[this.index_id][slide_num]
        let current_id         	=   slide_name

		// General id General tabid 0-1
		// activa id General tabid 0-1

        this.replace(slide_name , " ", "-")
        var slide_hyphen = this.result

        // * <div id="Primer-vistazo" class="tab-pane fade active in" aria-labelledby="Primer-vistazo-tab">

        let div_id	           		=	slide_hyphen

		let current_active					=	''
		let class_class_fragment			=   ''



        if  ( ( !empty(slide_name) 									&&
        	(slide_name  in this.fnode.arr ) ) 		&&
        	(this.fnode.arr[slide_name].length) > 0 		    )  )	 )
        {

		// this.p('Slide Name ' + slide_name )

          // Empty code for every slide
          this.div_01.content=''
          this.div_01.code=''

          if (sw_active == 0)
          {
			current_active					=	" active in"
          }
		  else
		  {
 			current_class_fragment			=   " tabs-hide"
		  }

          sw_active++

          this.div_01.reload_contents(
						current_id	      										, 	// 01
						current_active      									, 	// 02
						slide_name									 			)  // 04


          this.content        +=    this.div_01.code


        } // end If

     } // end for


	  // Creamos el objeto div de la seleccion
	 this.pcreate()

	 // this.d('jcode 02 >' + this.fnode.jquery_code)

	  this.p('code >' + this.code)


  } // End Build Data

}

exports.sea02_div_peloncita_middle = sea02_div_peloncita_middle
