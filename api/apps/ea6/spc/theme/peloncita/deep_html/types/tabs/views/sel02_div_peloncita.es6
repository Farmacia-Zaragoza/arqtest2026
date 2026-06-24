// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js Html Div Class  [V.0.0.6]  (2016-11-20)
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


class sel02_div_peloncita_middle extends html_style{


    constructor (   fnode		           	= ''	,	// 02 Fast node for selection
					ifnode					= ''  		// 03 Fast node for tabs selecition
                                )
   {
    // El constructor debe cargar las propiedades del archivo

		super()
        this.tag_type        		=      	'div'


		this.n						= 'sel02_mid::'

	    // Num elements of menu
	    this.num_elements_menu   	= ''

	    this.node_id              =   ''                     // NID - Drupal Node ID


	    this.vnode						=	''

		// String View attributtes

		this.current_view_name			 =	''
		this.current_view_args			 =	''

	    // Date fields

	    this.current_date				=	''

        this.fnode  				=      	fnode
        this.ifnode  				=      	ifnode

		// /ssd/myr/2048x1536/2011/Brasil/a01_Rio_de_Janeiro/110827_-_Rio_de_Janeiro_-_Pan_de_Azucar
		// this.p('I_Folder_Fnode' + this.fnode.img_folder )
		// this.p('I_Folder_IFnode' + this.ifnode.img_folder )


        super.constructor(this.tag_type)

        this.div_01          		=
        				new sel01_div_peloncita_middle(
        						this.fnode								)

		this.reload_contents()

    }

    reload_contents ()
    {
		this.build_data()
    }

	//view =  node.field_view_field_name[0]
	//view_name = view['vname']																</li>
	//view_args = view['vargs']																</li>

	get_current_view_args(view_name = "")
	{
		// Valores de seleccion
		if 		( view_name == "s21_ccp05_image_rnd" )
		{
		 		this.current_view_args = this.fnode.view_minivista_personal_args
		 		this.current_view_name = this.fnode.view_minivista_personal_name

		}
		else if 	( view_name == "x31_ccp05_image_05" )
		{
				// View 02
		 		this.current_view_args = this.fnode.view_ilista_personal_args
		 		this.current_view_name = this.fnode.view_ilista_personal_name
		}
		else if 	( view_name == "g31_ccp05_image" )
		{
				// View 03
		 		this.current_view_args = this.fnode.view_minivista_images_args
		 		this.current_view_name = this.fnode.view_minivista_images_name
		}
		else if 	( view_name == "t31_ccp05_image" )
		{
				// View 04
		 		this.current_view_args = this.fnode.view_senda_personal_args
		 		this.current_view_name = this.fnode.view_senda_personal_name
		}

	}

    build_data()
    {
    this.code       =       ''
    this.content    =       ''
	this.class 	  =	'tab-content'

    let sw_active = 0     // To set first active class

	// REVISAR BUCLE

    // foreach (this.ifnode.arr['id'] as slide_num => slide_name )
	let _ifnode_arr_id = Array.from(this.ifnode.arr['id']);
	for (var slide_num in _ifnode_arr_id)
	{
		var slide_name			=	_ifnode_arr_id[slide_num]

        let current_id         	=   slide_name
        current_tabid         	=   this.ifnode.arr['tab'][slide_num]
        current_length        	=   this.ifnode.arr['vle'][slide_num]

		// General id General tabid 0-1
		// activa id General tabid 0-1

        this.replace(slide_name , " ", "-")
        var slide_hyphen = this.result


        // * <div id="Primer-vistazo" class="tab-pane fade active in" aria-labelledby="Primer-vistazo-tab">

        let div_id	           		=	slide_hyphen

		let current_active					=	''
		let current_class_fragment			=   ''


        if(!empty(slide_name))
        {

		// sel02_mid::Slide Name FotoListados id s21_ccp05_image_rnd args "personal",[field_anno-term],[field_pais-term],"2048",[field_codigo-term]

		// Nombre de la vista (s21_ccp05_image_rnd)
        let current_vname	    	=   this.ifnode.arr['vna'][slide_num]

		this.get_current_view_args(current_vname)

		// this.p('Slide Name ' + slide_name + ' id ' + this.current_view_name + ' args ' + this.current_view_args)


		// Generamos la vista - view fast node
		this.vnode	= new vn01_images(
								this.fnode				,
								this.current_view_name	,
								this.current_view_args 	,
								current_length
								)


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
						this.vnode 											,	// 01
						this.fnode.node_id									, 	// 02
						current_active      									, 	// 03
						current_tabid											, 	// 04
						current_class_fragment									,	// 05
						slide_name									 			    // 06
						)


          this.div_01.build_contents()

          this.content        +=    this.div_01.code


        } // end If

     } // end for


	  // Creamos el objeto div de la seleccion
	 this.pcreate()

	 // this.d('code >' + this.code)


  } // End Build Data

}

exports.sel02_div_peloncita_middle = sel02_div_peloncita_middle
