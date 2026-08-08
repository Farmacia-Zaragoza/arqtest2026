// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Anode Img Resolutions ArrayClass  [V.0.1.9]  (2017-02-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 23]
// *anode_img_resolutions_array > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-generate_array_for_all_resolutions- 					: Get current 2048 image
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_img_build_dimensions } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an7/an77_img_build_dimensions.es6'))


class anode_img_resolutions_array extends anode_img_build_dimensions {

	constructor()
	{
		super()
		this.n			= 	'anode_img_resolutions_array::'							
	}
            

	// ------------------------------- NO SE ESTA EJECUTANDO --------------------------------	
	generate_array_for_all_resolutions(img_name = '' )
	{
		this.m			=	'generate_array_for_all_resolutions'								

		// Common method to generate images for complex structures (views, search , recuerdos)

		//  files/images/fotos/recuerdos/brqx_azu11bra_pers_-_Brasil_-_Rio_de_Janeiro_-_Pan_de_Azucar_0002560_img_base_resolutino.JPG

		
		img_name = this.u.site_url + img_name																	
		
		this.p('NO_ESTA_PASANDO__Img__name ' + img_name)
												
		this.arr['oim'].push(img_name) 												

		this.inode.reload_contents(img_name)						

		// brqx_azu11bra_pers_-_Brasil_-_Rio_de_Janeiro_-_Pan_de_Azucar_0002534.JPG
		// this.p('Image Clean ' + this.inode.img_name_clean) 							

		this.arr['oic'].push(		this.inode.img_name_clean)										


		this.arr['ori'].push( this.inode.orientation 	)							

		this.arr['qty'].push( this.inode.quality 		)						

		// JPG - GIF - PNG
		this.arr['img-type'].push( this.inode.img_type ) 								


		tit	=	this.arr['tit'][slide_num]	 

		// Image node


		// Image arrays : SIm  SUr SFo SFu RIm RUr  	
		
		for (posi in  this.inode.arr['mty'] )
		{
			var type = this.inode.arr['mty'][posi]
			// rim 15

			for (resolution in this.inode.arr[type] )
			{
				// Elem sim Index si20

				let img_res_substr		=	this.arr['let'][resolution]											
				
				let index = type.substr(0,2)  + img_res_substr											
				
				// Elem rur Index rua4
				// this.p('Elem ' + type + ' Index ' + index )															
				//  sim/s
				// fn02_images::Elem /ssd/flat/2048x1536/venta_piso_espana_madrid_guadarrama_flat_sale_2017_-_140000_euros_0048_2048x1536.jpg Index sim/s
				this.arr[index].push( this.inode.arr[type][resolution] )				
			}

		}
		// Relation - Ratio 
		this.arr['rat'].push( this.inode.relation ) 							

		//// Title
		//this.arr['tit'].push( tit )												

	}									

	  
}

exports.anode_img_resolutions_array = anode_img_resolutions_array
