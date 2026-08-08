// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Anode Img Class  [V.0.1.9]  (2017-02-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_52]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections [PHP_52]
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 22]
// *anode_img_resolutions > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-prepare_resolutions- 					: Get current 2048 image
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

var { anode_img_resolutions_array } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an7/an76_img_resolutions_array.es6')))


class anode_img_resolutions extends anode_img_resolutions_array {

	constructor()
	{
		super()
		this.n			= 	'anode_img_resolutions::'							
	}           

	// ---------------------- PREPARE_RESOLUTIONS ( OLD PELONA CODE ) ----------------------            
    prepare_resolutions() 
    {   
		this.m			=	'prepare_resolutions'								

		// Resolutions va a ser un objeto
		// rko - Folders
		// rfu - sfu Url Folders
		
		let arrays_line    = 	this.arrays_line + 'rat res rex tit oim ori let img rko rfu sfu oic '
		
		this.p ('array_lines ' + arrays_line ) 
		res_line 		=	''								   
		img_line 		=	''								   
		
		// 2048x536 es la base

		this.arr['let']['6100x3050']		=	'a6100'										
		this.arr['let']['4608x3456']		=	'a4608'										
		this.arr['let']['3264x2448']		=	'a3264'										
		this.arr['let']['2560x1920']		=	'a2560'										
		this.arr['let']['2048x1536']		=	'a2048'										

		this.arr['let']['1280x0960']		=	'a1280'										
		this.arr['let']['1024x0768']		=	'a1024'										
		this.arr['let']['0884x0663']		=	'a0884'										

		this.arr['let']['0640x0480']		=	'a0640'										
		this.arr['let']['0442x0332']		=	'a0442'										
		this.arr['let']['0384x0288']		=	'a0384'										
		this.arr['let']['0320x0240']		=	'a0320'										
		this.arr['let']['0145x0109']		=	'a0145'										

		this.arr['let']['0082x0062']		=	'a0082'										

		this.arr['let']['0041x0031']		=	'a0041'										

		this.arr['res'] = this.full_resolutions_to_generate.split (' ') 		
				
		// Inode to use it
		this.inode	=	new in01_path(	this.fnode									, 
											this.full_resolutions_to_generate				,			 
											'glob'											)

		// AQUI NO LLEGA - PARECE CODIGO ANTIGUO DE PELONA
		this.p('MTypes_C ' + this.inode.arr['mty'].length )									

		// Mty - Multi Type Resolutinos
		for (var posi in this.inode.arr['mty'])
		{
			var type = this.inode.arr['mty'][posi]
			for (var pores in this.arr['res'])
			// 2048 - 1024
			{ 
				var res = this.arr['res'][pores]
				// Old : Elem sim Index si20
				// New : sia0 sia1 sia2 sia3 
				
				img_res_substr		=	this.arr['let'][res]											

				// this.p('Res ' + res + ' subst ' + img_res_substr)										
				
				index = type.substr(0,2)  + img_res_substr											
				img_line +=  index + ' '																
			}
		
		}

		arrays_line = res_line + img_line + arrays_line 
		
		this.p('a75_Arr_LINE' + arrays_line)										

		this.arr['types'] = arrays_line.split (' ') 								
			
	}
	  
}

exports.anode_img_resolutions = anode_img_resolutions