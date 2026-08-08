// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Jnode Gallery Class  [V.0.1.1]  (2017-03-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - build_node       : Load all drupal node details 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"						);

const 	{ anode } 			= 	require(	path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6'));

class jn01_gallery extends anode {
	
    constructor (   fnode	=	''			,		// 01. Fast node object
									stype	=	'gallery'	)
    {   	
		
		super()
		this.n 							=		'jn01_gallery::' 									

		this.fnode						=	fnode 						

		this.u							=	fnode.u							
		
		this.b						= 	new bool()

		this.u 				=	u 													
		this.s 				=	this.u.s 										
		this.c 				=	this.u.c 										
				
		
		this.b.copy (this.s.b)													
		
//		this.img_folder					=	this.fnode.img_folder					
//		this.img_url_folder				=	this.fnode.img_url_folder				
		
		this.node_id						=	fnode.node_id				


		this.type				=	'json'				
		this.short_type		=	'JGA'					// Json Gallery		
		
		
		this.stype 			=	stype 				 // Subtype
		this.type_name		=	this.type + '_' + this.stype 				
				
		
		this.b.type_common					=	false			
		this.b.type_have_taxonomy				=	false 			
		this.b.type_have_code					=	true			
		this.b.type_have_properties				=	true			
		this.b.type_have_specific_properties	=	true			


		this.change				=	'/' + this.type + '/' + this.stype + '/'					
		this.suffix				=	'.json'																
   		this.suffix_disk 			= 	'.json'																

		// PENDIENTE DE REVISAR SUFFIX
   		this.suffix_code 			= 	'gallery' + this.node_id + '_code' + '.json'													


		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()													

 		// /brqx/pers/drupal/v50/fnode/peloncita/nids/n076/787/json_gallery.dat
		// this.p('01_JN_IM_Before '  + this.load_from_disk_path)									

		// rat : Ratio - res : Resolution - rfu : Ram Folder Url - rim : Ram Image - rur : Ram URl - tit : Titulo 
		
		if (this.s.load == 'drupal')
		{
			this.run_from_drupal()						
			// create_paths - get_current_properties
		}
		else 
		{
			this.run_from_disk()							
			// create_paths - get_current_properties_from_disk
		}
		// this.p('JN_After_RAM ' + this.ram_alias_path	)												

    }

    get_child_properties(prop, value) {   
	// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
	// Luego cada tipo tendra un ajuste como este	

            if 	   ( prop 		== "v_name"				)		this.name							=	value			
    }


	load_child_details()
	{
		// RECUERDA - AQUI SOLO ENTRA SI HAY QUE VOLVER A ACTUALIZAR LOS DATOS DE BD

		json = array()  
		
		json['tit'] = new json()				
		json['img'] = new json()				
		json['rat'] = new json()				
		json['alt'] = new json()				
		
		
		// 40 

		
		num_element = this.fnode.arr['tit'].length - 1 
		n = 0  

		for (num in this.fnode.arr['tit'])
		{
			let tit = this.fnode.arr['tit'][num]
			// Only Image Clean
			img	= this.fnode.arr['oic'][num] 		
			
			rat	= this.fnode.arr['rat'][num] 		
		
			if (n < num_element)
			{
				json['img'].add_strvalue(img)			 	
				json['tit'].add_strvalue(tit)			 	
				json['alt'].add_strvalue(tit)			 	
				json['rat'].add_value(rat)				
			}		
			else 
			{
				json['img'].add_laststrvalue(img)			 	
				json['tit'].add_laststrvalue(tit)			 	
				json['alt'].add_laststrvalue(tit)			 	
				json['rat'].add_lastvalue(rat)				
			}		

			n++  		 	
		}
		
		json['img'].create_attribute('image_name')	
		json['rat'].create_attribute('aspect_ratio')	
		json['tit'].create_attribute('image_description')	
		json['alt'].create_attribute('image_alt')	

		jtot	= new json()  
		
		jtot.content += json['img'].code + ', '			 
		jtot.content += json['rat'].code + ', '			 
		jtot.content += json['tit'].code + ', '			 
		jtot.content += json['alt'].code 				 

		jtot.create()										

		this.code 	=	jtot.code 					

		// Ya tenemos el codigo. Ahora queremos tambien la uri

				
		this.img_url_folder		= 	this.fnode.u.site_url + this.img_url_folder	

		if (substr(this.img_url_folder, -1) != '/' )   this.img_url_folder += '/'			
					
	}
  
}

exports.jn01_gallery = jn01_gallery