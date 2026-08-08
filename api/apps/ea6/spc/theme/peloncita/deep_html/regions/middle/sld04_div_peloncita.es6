// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.6]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//*	<div class="carousel-inner" role="listbox">
//    <div class="item active">
//    ...
//    <div class="item">
//-------------------------------------------------------------------------------------
// DIV
//  DIV - repeat
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 			= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		),

class sld04_div_peloncita_middle extends html_style{

                 
    constructor (	thm							)  
   {   
        let tag_type                 	=      'div'             					
		super(tag_type)
		this.n						= 'sld04_mid::'				    		

    // Num elements of menu
    	this.num_elements_menu    		= 	''                    	
       
	// Fast node for contents
    	this.fnode						=	''					
    
    	this.ifnode						=	''

    	this.tfnode						=	''
    	this.tfnode01					=	''
    	this.tfnode02					=	''
    
      
    // Html Structures
    
    	this.div_seleccion_01           =	''
    	this.div_recuerdo_01			=	''
    

        this.tag_type                 	=      'div'             					

	  	this.thm							=		thm								

		// Fast node for tabs - Could be recuerdo or selections
		// middle

		if (array_key_exists('region_middle' , this.thm.nid.arr['fnode'] ) )
		{
		
			this.fnode					=		this.thm.nid.arr['fnode']['region_middle']

			// 5
			//this.p('Num_elem_middle ' + this.fnode.arr.length) 					

	
			// This is a seleccion div_seleccion_01
	        this.div_seleccion_01                    	=		
	        			new sld03_div_seleccion_middle() 	 //'SELECCION>'
	
	        this.div_recuerdo_01                    	= 		
	        			new sld03_div_recuerdo_middle() 	 // RECUERDO
	
			
	       	this.clean_objects()                                              		
	
			this.build_data()	            
		}
    }

    clean_objects() 
    {   
		this.clean()															
	}

    build_data()
    {
		// Html Tame    @ Html Class     @ Html Style @ Html Id   @ Html Name  @  Value @  Href  @ Data-Toggle @ Role  @ Aria-controls
		// miv_d05_p01  @ carousel-inner @            @           @            @        @        @             @ listbox

    	this.code      = '' 
      	this.content   = '' 
		this.class 	 = 'carousel-inner'												
		this.role 	 = 'listbox'													

	    // this.num_elements_menu = this.fnode.arr['id'].length

	  
	    sw_active = 0     // To set first active class

	    cont		= 0			
		
	    
		item_active	=	" active"											    

	    if ( ( this.fnode.arr.include('id')  ) &&
	    	 ( this.fnode.arrinclude('sta') ) &&         
			 ( this.fnode.arrinclude('typ') )	    

	    //foreach (this.fnode.arr['id'] as slide_num => slide_text)

		let _fnode_arr_id = Array.from(this.fnode.arr['id']);
		for (var slide_num in _fnode_arr_id) 
		{
			var slide_text			=	_fnode_arr_id[slide_num] 

	        let current_nid       		=   slide_text										
    	    current_status        	=   this.fnode.arr['sta'][slide_num]			
    	    current_type        	=   this.fnode.arr['typ'][slide_num]			


//		    puting_contents='Sdl04:nid ' + current_nid + '>' 
//    	    GLOBALS['putcont']+=puting_contents
	    
	        if(!empty(current_status))
	        {
				// _middle_01
 				unique_page_position 	= this.fnode.page_position + '0' + cont	

				//	Here is when we need to know type
				
//			    puting_contents='Sdl04:nid ' + current_nid  + ' Type '. current_type + '>' 
//    		    GLOBALS['putcont']+=puting_contents


				if (current_type == "seleccion")
				{

					// Aqui podemos probar el method to load
					this.tfnode01						=		
									new fn02_seleccion(
														current_nid									,	// 01. Nid
														unique_page_position							,	// 02. Page Position
														this.fnode									)	// 04. Fnode
			
			
					this.ifnode						=		
									new fn03_info_seleccion(
														this.thm.nid.arr['nid']['infosel_middle']	, 	// 01. Nid					
														unique_page_position							,	// 02. Page Position
														this.fnode									)	// 03. Fnode

					// 10
					// this.p('Num_02_before_Select ' + this.ifnode.arr['txt'].length ) 								


	 				this.div_seleccion_01.reload_contents(
							this.tfnode01											, // 01 Tag Fnode
							this.ifnode												, // 02 Info Seleccion
							item_active											 	  // 03 Active
							)
	
					this.content 	 += this.div_seleccion_01.code // 'DIV' + unique_page_position	 + '>'
//					this.content 	 += 'DIV_SELECCION' + unique_page_position	 + '>'							

	      		item_active	=	""								 // Only exist for first item. Is not needed if	    
				}
				else if (current_type == "recuerdo")
				{
			
					//  76788 _middle00
					// this.p('Before generating recuerdo ' + current_nid + ' ' + unique_page_position)
					this.tfnode02						=		
									new fn01_recuerdo(	current_nid									,	// 01. Nid
														unique_page_position							,	// 02. Page Position
														this.fnode									)	// 04. Method to load

														
				    num_elements_menu = this.tfnode02.arr['img'].length

					// this.p('Foto_recu_s4 ' + this.tfnode02.arr['sua4'][0] )			 
					// 6
					// this.p('Num_element_recuerdo '. num_elements_menu)								


					// Sabemos que es un recuerdo
	 				this.div_recuerdo_01.reload_contents(
							this.tfnode02									, // 01
							item_active										  // 02
							)

//					this.content 	 += 'DIV_RECUERDO' + unique_page_position	 + '>'							

					this.content 	 += this.div_recuerdo_01.code											

	      		item_active	=	""								 // Only exist for first item. Is not needed if	    
				}
				
	        } // end If

	        
		} // end for
	 	
	 	this.pcreate()

		// this.dd('jcode 05 >' + this.tfnode01.jquery_code)														 

		if (isset(this.tfnode01))
		{
			// this.p('Adding Jquery code')																			
			this.thm.jquery_code 		= 	this.tfnode01.jquery_code										
		
		
		}
		// this.d('jcode 06 >' + this.thm.jquery_code)														 

		// this.d('code >' + this.code)														 
				
				
	} // End Build Data
  
}

exports.sld04_div_peloncita_middle = sld04_div_peloncita_middle
