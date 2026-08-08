// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.7]  (2016-12-04)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
//*  <div class="v0-h5 " tame="item_d03_p01">
//  <!--  5 single-image divs are container for 5 recuerdo images.-.
//		<h3 tame="item_d04_p01">5 horizontal</h3>
//  	<div tame="item_d04_p02" class="single-image">  External

// ------------------------------------------------------------------------------------
//  H3
//  DIV * START REPEAT
//	DIV for roses
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Slider Div02 Peloncita Class
// ------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - reload_contents  : Reload field attributes
// - build_data       : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class rec02_div_peloncita_middle extends html_style{


    constructor (   fnode						= 	'' 		)	// 02 Fast node for recuerdo
   {

        this.tag_type        		=      	'div'

    // Num elements of menu
    	this.num_elements_menu   	= ''

    	this.node_id              =   ''                     // NID - Drupal Node ID

    	this.div_roses            	= ''

		this.fnode				=		fnode

        super.constructor(this.tag_type)

        this.div_01          		=
        				new rec01_div_peloncita_middle(
        							this.fnode							)

		this.h3_01				=	new html_style('h3')

		this.build_data()
    }

    reload_contents ()
   {
    // El constructor debe cargar las propiedades del archivo

		this.build_data()
    }

    clean_objects()
    {
//		this.clean()
		this.div_01.clean()
	}



	create_h3(num_vertical 	= ''	)
	{
		switch (num_vertical)
		{
	    case 0:
			// 5 horizontal
			this.h3_01.content		=	"5 horizontal"
			this.class 				=	"v0-h5"
	        break
	    case 1:
			this.h3_01.content		=	"4 horizontal - 1 vertical"
			this.class 				=	"v1-h4"
	        break
	    case 2:
			this.h3_01.content		=	"3 horizontal - 2 vertical"
			this.class 				=	"v2-h3"
	        break
	    case 3:
			this.h3_01.content		=	"2 horizontal - 3 vertical"
			this.class 				=	"v3-h2"
	        break
	    case 4:
			this.h3_01.content		=	"1 horizontal - 4 vertical"
			this.class 				=	"v4-h1"
	        break
	    case 5:
			this.h3_01.content		=	"5 vertical"
			this.class 				=	"v5-h0"
	        break

		}

		this.h3_01.pcreate()
	}

    build_data()
    {
    this.code       =       ''
    this.content    =       ''

    sw_active = 0     // To set first active class

	this.num_elements_menu = this.fnode.arr['img'].length

	num_elements_menu_minus = this.num_elements_menu - 1

	// this.p('Num elments ' + num_elements_menu_minus)

	num_vertical = 0

	last_img				=	''

	cont 					= 1

	// REVISAR BUCLE FOR
    for (slide_num in this.fnode.arr['img'] )
    {
		let slide_name	= this.fnode.arr['img'][slide_num]

        // Is needed to have an string slide num for comparations
		// this.p('Num ' + slide_num + ' Name ' + slide_name)


        if(!empty(slide_name))
        {
          // Empty code for every slide
	        this.div_01.content=''
            this.div_01.code=''


	        orientation			=	this.fnode.arr['ori'][slide_num]
			is_vertical			=	(orientation != 'horizontal')
			num_vertical			=	num_vertical + is_vertical

		 	// ymg solo contiene los indices
		 	if ( num_vertical ==  0 )
	            this.fnode.arr['ymg'][slide_num]			=	slide_num
			else
			{
			 	pos_cont_vert = this.num_elements_menu - num_vertical
		  		this.fnode.arr['ymg'][pos_cont_vert]		=	slide_num
			}

		   if (cont == num_elements_menu_minus )
		   		last_img	= 	'last'

           this.div_01.reload_contents(
						slide_num							,
						last_img 							)


           this.content        +=    this.div_01.code


        } // end If

        cont++
     } // end for

	 // this.dd('Code .' +  this.content)


	 this.div_roses = new rec02_div_peloncita_roses (	this.fnode		)

	 this.content		+=	this.div_roses.code


	 // Creamos el objeto div de la seleccion
	 this.create_h3(num_vertical)

	 this.content= this.h3_01.code + this.content

     this.pcreate()



  } // End Build Data

}

exports.rec02_div_peloncita_middle = rec02_div_peloncita_middle

