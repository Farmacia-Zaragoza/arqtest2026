// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 00 - 03 - 03 ] Node JS Definitions Class Arrays [V.0.1.3]  (2018-02-17)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Only Deffinitions
//--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=-
// Inheritance Line [Inner Level 03] [Global Level 03]
//-------------------------------------------------------------------------------------
// definitions_objects > *def_Arrays  

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"				)

const { definitions_strings } = require(	path.join(JS_BASE, 'com/objects/drupal/definitions/d03_strings.es6')		)

class definitions_arrays extends definitions_strings {

	constructor()
	{		
		super()	
		this.n 							= 	'definitions_arrays::'			
	
	
		// Array object - En Javascript hay que declararlos todos
		this.arr 						=   Array() 			
		this.arr['properties'] 			=   Array() 			
		this.arr['tna'] 				=   Array() 			
			
		this.arr['nfo'] 				=   Array() 			
		this.arr['types'] 				=   Array() 			

		this.arr['ide'] 				=   Array() 			

		this.arr['fil'] 				=   Array()		// Used an_72					
		this.arr['fis'] 				=   Array()				
		this.arr['fur'] 				=   Array()				
			
		this.arr['tit'] 				=   Array()		// Used an_72 - fn02_images				
		this.arr['fol'] 				=   Array()		// Used an_72				
		this.arr['fos'] 				=   Array()		// Used an_72				

		this.arr['fnode'] 				=   Array()		// Used an_41				
		this.arr['fnode']['image_list'] =   Array()		// Used theme_truck				
		this.arr['fnode']['file_list'] 	=   Array()		// Used theme_truck				


		this.arr['let'] 				=   Array()		// Used truck				
		this.arr['rex'] 				=   Array()		// Used truck				

		this.arr['mty'] 					=   Array()		// Used fn02 - inode
		this.arr['resolutions_to_generate']	=   Array()		// Used in01


		this.arr['img'] 				=   Array()		// Used fn02_images				

		this.arr['oim'] 				=   Array()		// Used fn02_images				
		this.arr['ori'] 				=   Array()		// Used fn02_images				
		this.arr['rat'] 				=   Array()		// Used fn02_images				
		this.arr['res'] 				=   Array()		// Used fn02_images				
		this.arr['img-type'] 			=   Array()		// Used fn02_images				

		this.arr['sim'] 				=   Array()		// Used inode
		this.arr['sko'] 				=   Array()		// Used inode
		this.arr['sfu'] 				=   Array()		// Used inode
		this.arr['sur'] 				=   Array()		// Used inode
		this.arr['rim'] 				=   Array()		// Used inode
		this.arr['rko'] 				=   Array()		// Used inode
		this.arr['rfu'] 				=   Array()		// Used inode
		this.arr['rur'] 				=   Array()		// Used inode

		this.arr['qty'] 				=   Array()		// Used an40

		this.arr['url'] 				=   Array()		// Used 
		this.arr['tar'] 				=   Array()		// Used 
		this.arr['txt'] 				=   Array()		// Used 
		this.arr['lan'] 				=   Array()		// Used 

		// Cookies links
		this.arr['name'] 				=   Array()		// Used
		this.arr['uri'] 				=   Array()		// Used

		// Buttons links
		this.arr['btn'] 				=   Array()		// Used 
		this.arr['mnu'] 				=   Array()		// Used 
		this.arr['lnk'] 				=   Array()		// Used 

		// Image Resolutions arrays

		this.arr['r00'] 				=   Array()		// Used fn02_images
		this.arr['r01'] 				=   Array()		// Used fn02_images
		this.arr['r02'] 				=   Array()		// Used fn02_images
		this.arr['r03'] 				=   Array()		// Used fn02_images
		this.arr['r05'] 				=   Array()		// Used fn02_images
		this.arr['r06'] 				=   Array()		// Used fn02_images
		this.arr['r09'] 				=   Array()		// Used fn02_images
		this.arr['r10'] 				=   Array()		// Used fn02_images
		this.arr['r11'] 				=   Array()		// Used fn02_images
		this.arr['r18'] 				=   Array()		// Used fn02_images

		this.arr['rfch0'] 				=   Array()		// Used fn02_images
		this.arr['rfch1'] 				=   Array()		// Used fn02_images
		this.arr['rfch2'] 				=   Array()		// Used fn02_images
		this.arr['rfch3'] 				=   Array()		// Used fn02_images
		this.arr['rfcv0'] 				=   Array()		// Used fn02_images
		this.arr['rfcv1'] 				=   Array()		// Used fn02_images
		this.arr['rfcv2'] 				=   Array()		// Used fn02_images
		this.arr['rfcv3'] 				=   Array()		// Used fn02_images
		this.arr['rfsh0'] 				=   Array()		// Used fn02_images
		this.arr['rfsh1'] 				=   Array()		// Used fn02_images
		this.arr['rfsh2'] 				=   Array()		// Used fn02_images
		this.arr['rfsh3'] 				=   Array()		// Used fn02_images
		this.arr['rfsv0'] 				=   Array()		// Used fn02_images
		this.arr['rfsv1'] 				=   Array()		// Used fn02_images
		this.arr['rfsv2'] 				=   Array()		// Used fn02_images
		this.arr['rfsv3'] 				=   Array()		// Used fn02_images
		this.arr['rich0'] 				=   Array()		// Used fn02_images
		this.arr['rich1'] 				=   Array()		// Used fn02_images
		this.arr['rich2'] 				=   Array()		// Used fn02_images
		this.arr['rich3'] 				=   Array()		// Used fn02_images
		this.arr['ricv0'] 				=   Array()		// Used fn02_images
		this.arr['ricv1'] 				=   Array()		// Used fn02_images
		this.arr['ricv2'] 				=   Array()		// Used fn02_images
		this.arr['ricv3'] 				=   Array()		// Used fn02_images
		this.arr['rish0'] 				=   Array()		// Used fn02_images
		this.arr['rish1'] 				=   Array()		// Used fn02_images
		this.arr['rish2'] 				=   Array()		// Used fn02_images
		this.arr['rish3'] 				=   Array()		// Used fn02_images
		this.arr['risv0'] 				=   Array()		// Used fn02_images
		this.arr['risv1'] 				=   Array()		// Used fn02_images
		this.arr['risv2'] 				=   Array()		// Used fn02_images
		this.arr['risv3'] 				=   Array()		// Used fn02_images

		this.arr['ruch0'] 				=   Array()		// Used fn02_images
		this.arr['ruch1'] 				=   Array()		// Used fn02_images
		this.arr['ruch2'] 				=   Array()		// Used fn02_images
		this.arr['ruch3'] 				=   Array()		// Used fn02_images
		this.arr['rucv0'] 				=   Array()		// Used fn02_images
		this.arr['rucv1'] 				=   Array()		// Used fn02_images
		this.arr['rucv2'] 				=   Array()		// Used fn02_images
		this.arr['rucv3'] 				=   Array()		// Used fn02_images
		this.arr['rush0'] 				=   Array()		// Used fn02_images
		this.arr['rush1'] 				=   Array()		// Used fn02_images
		this.arr['rush2'] 				=   Array()		// Used fn02_images
		this.arr['rush3'] 				=   Array()		// Used fn02_images
		this.arr['rusv0'] 				=   Array()		// Used fn02_images
		this.arr['rusv1'] 				=   Array()		// Used fn02_images
		this.arr['rusv2'] 				=   Array()		// Used fn02_images
		this.arr['rusv3'] 				=   Array()		// Used fn02_images
		this.arr['ruxx'] 				=   Array()		// Used fn02_images
		
		this.arr['sich0'] 				=   Array()		// Used fn02_images
		this.arr['sich1'] 				=   Array()		// Used fn02_images
		this.arr['sich2'] 				=   Array()		// Used fn02_images
		this.arr['sich3'] 				=   Array()		// Used fn02_images
		this.arr['sicv0'] 				=   Array()		// Used fn02_images
		this.arr['sicv1'] 				=   Array()		// Used fn02_images
		this.arr['sicv2'] 				=   Array()		// Used fn02_images
		this.arr['sicv3'] 				=   Array()		// Used fn02_images
		this.arr['sish0'] 				=   Array()		// Used fn02_images
		this.arr['sish1'] 				=   Array()		// Used fn02_images
		this.arr['sish2'] 				=   Array()		// Used fn02_images
		this.arr['sish3'] 				=   Array()		// Used fn02_images
		this.arr['sisv0'] 				=   Array()		// Used fn02_images
		this.arr['sisv1'] 				=   Array()		// Used fn02_images
		this.arr['sisv2'] 				=   Array()		// Used fn02_images
		this.arr['sisv3'] 				=   Array()		// Used fn02_images
		this.arr['skch0'] 				=   Array()		// Used fn02_images
		this.arr['skch1'] 				=   Array()		// Used fn02_images
		this.arr['skch2'] 				=   Array()		// Used fn02_images
		this.arr['skch3'] 				=   Array()		// Used fn02_images
		this.arr['skcv0'] 				=   Array()		// Used fn02_images
		this.arr['skcv1'] 				=   Array()		// Used fn02_images
		this.arr['skcv2'] 				=   Array()		// Used fn02_images
		this.arr['skcv3'] 				=   Array()		// Used fn02_images
		this.arr['sksh0'] 				=   Array()		// Used fn02_images
		this.arr['sksh1'] 				=   Array()		// Used fn02_images
		this.arr['sksh2'] 				=   Array()		// Used fn02_images
		this.arr['sksh3'] 				=   Array()		// Used fn02_images
		this.arr['sksv0'] 				=   Array()		// Used fn02_images
		this.arr['sksv1'] 				=   Array()		// Used fn02_images
		this.arr['sksv2'] 				=   Array()		// Used fn02_images
		this.arr['sksv3'] 				=   Array()		// Used fn02_images
		this.arr['such0'] 				=   Array()		// Used fn02_images
		this.arr['such1'] 				=   Array()		// Used fn02_images
		this.arr['such2'] 				=   Array()		// Used fn02_images
		this.arr['such3'] 				=   Array()		// Used fn02_images
		this.arr['sucv0'] 				=   Array()		// Used fn02_images
		this.arr['sucv1'] 				=   Array()		// Used fn02_images
		this.arr['sucv2'] 				=   Array()		// Used fn02_images
		this.arr['sucv3'] 				=   Array()		// Used fn02_images
		
		this.arr['sfch0'] 				=   Array()		// Used fn02_images
		this.arr['sfch1'] 				=   Array()		// Used fn02_images
		this.arr['sfch2'] 				=   Array()		// Used fn02_images
		this.arr['sfch3'] 				=   Array()		// Used fn02_images
		this.arr['sfcv0'] 				=   Array()		// Used fn02_images
		this.arr['sfcv1'] 				=   Array()		// Used fn02_images
		this.arr['sfcv2'] 				=   Array()		// Used fn02_images
		this.arr['sfcv3'] 				=   Array()		// Used fn02_images
		this.arr['sfcv3'] 				=   Array()		// Used fn02_images		
		this.arr['sfsh0'] 				=   Array()		// Used fn02_images
		this.arr['sfsh1'] 				=   Array()		// Used fn02_images
		this.arr['sfsh2'] 				=   Array()		// Used fn02_images
		this.arr['sfsh3'] 				=   Array()		// Used fn02_images
		this.arr['sfsv0'] 				=   Array()		// Used fn02_images
		this.arr['sfsv1'] 				=   Array()		// Used fn02_images
		this.arr['sfsv2'] 				=   Array()		// Used fn02_images
		this.arr['sfsv3'] 				=   Array()		// Used fn02_images
		this.arr['sfxx'] 				=   Array()		// Used fn02_images
		this.arr['such0'] 				=   Array()		// Used fn02_images
		this.arr['such1'] 				=   Array()		// Used fn02_images
		this.arr['such2'] 				=   Array()		// Used fn02_images
		this.arr['such3'] 				=   Array()		// Used fn02_images
		this.arr['sucv0'] 				=   Array()		// Used fn02_images
		this.arr['sucv1'] 				=   Array()		// Used fn02_images
		this.arr['sucv2'] 				=   Array()		// Used fn02_images
		this.arr['sucv3'] 				=   Array()		// Used fn02_images
		this.arr['sush0'] 				=   Array()		// Used fn02_images
		this.arr['sush1'] 				=   Array()		// Used fn02_images
		this.arr['sush2'] 				=   Array()		// Used fn02_images
		this.arr['sush3'] 				=   Array()		// Used fn02_images
		this.arr['susv0'] 				=   Array()		// Used fn02_images
		this.arr['susv1'] 				=   Array()		// Used fn02_images
		this.arr['susv2'] 				=   Array()		// Used fn02_images
		this.arr['susv3'] 				=   Array()		// Used fn02_images


		this.arr['rixx'] 				=   Array()		// Used fn02_images
		this.arr['ruxx'] 				=   Array()		// Used fn02_images
		this.arr['rkxx'] 				=   Array()		// Used fn02_images
		this.arr['rfxx'] 				=   Array()		// Used fn02_images

		this.arr['sixx'] 				=   Array()		// Used fn02_images
		this.arr['suxx'] 				=   Array()		// Used fn02_images
		this.arr['skxx'] 				=   Array()		// Used fn02_images
		this.arr['sfxx'] 				=   Array()		// Used fn02_images

		// yaml
		this.arr['fyode'] 				=   Array()		// Used fy01_yaml
		
		this.contents					= 	Array()					
	
		this.dat_contents				=	Array()					
	
		// Taxonomy Mode objects	
		this.t							= 	Array()						
	
		this.tax						= 	Array()					 // Tax Array - Array of type tax (complex type)

		// Array global
		
		global.GLOBALS 					=	Array()

		// To minimize code
        this.minimize_options = 
        { 
        				removeComments : true,
						removeCommentsFromCDATA : true,
						collapseWhitespace : true,
						collapseBooleanAttributes : true,
						removeAttributeQuotes : true,
						removeRedundantAttributes : true,
						useShortDoctype : true,
						removeEmptyAttributes : true,
						removeOptionalTags : true,
						removeEmptyElements : true 
		}	
            
  	}
}

exports.definitions_arrays = definitions_arrays