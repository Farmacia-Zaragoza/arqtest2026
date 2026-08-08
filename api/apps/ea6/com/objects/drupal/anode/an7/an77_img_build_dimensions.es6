// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Node Js - Anode Img BuildDimensions  [V.0.1.1]  (2017-02-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 21]
// *anode_img_build_dimensions > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-anode_img_build_dimensions-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-build_dimensions- 					: Build Image dimensions and set H and V
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_img_tagadelic } 		= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an7/an78_img_tagadelic.es6'),
		creff 							= require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/create_full_filename.es6'),
		{ execSync }					= require(	'child_process'																				),
		isize 							= require(	'/brqx/base/react/zcommon/node_modules/image-size'											),
		number_format 					= require(	'/brqx/base/react/zcommon/node_modules/locutus/php/strings/number_format'					);

class anode_img_build_dimensions extends anode_img_tagadelic {

	constructor()
	{
        super()
		this.n			= 	'an77_img_build_dimensions::'							
    }

	// --------------------------------- BUILD_DIMENSIONS --------------------------------- 
	build_dimensions()	
	{
		this.m 			=	'build_dimensions'										
		this.n			= 	'an77_img_build_dimensions::'							

		// this.p('P ' + this.img_path )

		if ( fs.existsSync(this.img_path) &&   
			 fs.lstatSync(this.img_path).isFile() &&
			 (creff.filesize(this.img_path) != 0 ) 
		    ) 
		{
			// /ssd/truck/1600x1200/transportes_lucas_rivera_gondolas_transport_truck_madrid_spain_2017_-_0116_1600x1200.jpg
			// this.p('I ' + this.img_path)

			var dimensions = 	isize(this.img_path)

			this.width		=	dimensions.width 
			this.height 	= 	dimensions.height
	
			this.relation = number_format(this.width / this.height , 2 )  		

			// this.p('R' + this.relation)
		
			// var exec_sync = child_process.execSync  

			this.quality = execSync("identify -format '%Q' " +  this.img_path)  

			// JPG - PNG - GIF
			
			// this.p('Ext ' + this.extension)										
			
			switch (this.extension.toUpperCase()) {
				case 'JPG':
					this.img_type = 'JPG'		
					break
				case 'JPEG':
					this.img_type = 'JPG'		
					break
				case 'PNG':
					this.img_type = 'PNG'		
					break
				case 'GIF':
					this.img_type = 'GIF'		
					break
				
				default:
					// Extension no definida
					this.img_type = 'UNK'		
					break
			}
			
			//this.img_type

			if (this.width > this.height)
			{ 
				this.orientation 	= "horizontal"				
				this.is_vertical	=	0						
			}
			else
			{
				this.orientation  = "vertical"				
				this.is_vertical	=	1						
			}
		}
	}

	  
}

exports.anode_img_build_dimensions = anode_img_build_dimensions