// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [01 - 0n - 0n ] Anode Code Class  [V.0.1.9]  (2017-02-20)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
// Fast node load - Common class - Replace Mysql connections
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 16]
// *anode_down > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-run_down- 				: 	Save common code
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_search } 		= require(path.join(JS_BASE, 'com/objects/drupal/anode/an7/an70_search.es6'))
		const path = require(	'path'																		);

class anode_down extends anode_search {
            
	constructor()
	{
		super()
		this.n						= 'anode_down::'				    		
	}
	
	run_down()
	{
		this.m	=	'run_down'												
		// Fire download page
		// DOWNLOAD ZONE 

		// Hay otra forma de hacerlo - ESTO NO FUNCIONA
		
		var arr_list				= 		this.u.no_slash_uri.substr(1).split('/')
		var url_before				=		arr_list[0]
		var url_after				=		arr_list[1]
		// Url after is the image

		image_path = '' 																
		
		if (url_after.substr(0,4) == 'http')
		{
			arr_url = parse_url(url_after)	
			// print ('Absolute path ' +  arr_url['path'] + this.br)				 
			url_after = arr_url['path']											
			image_path 			= 	this.u.site_path + url_after			
		}
		else
			image_path 			= 	this.u.site_path + '/' + url_after			

		this.replace(image_path, '.','/')			 
		img_to_use				= 	this.result			 

		extension 				=	(path.basename(img_to_use)).toLowerCase()								 
		
		// print ('Image real path ' + image_path) 						
		/// DOWN CODE
		    if ( (extension in this.cool_extensions	) && 
				 (is_file(image_path							) ) &&
		    	 (file_exists(image_path) 						) )
		    {
				// Be sure to disable buffer management if needed

				this.status = 1	 // Fast loaded
				
				this.dd(image_path)														
				basename = path.basename(image_path) 							
				
				// PENDIENTE DE REVISAR JS
				/*
		        switch (extension) {
		                case "pdf": ctype="application/pdf" break
		                case "exe": ctype="application/octet-stream" break
		                case "zip": ctype="application/zip" break
		                case "doc": ctype="application/msword" break
		                case "xls": ctype="application/vnd.ms-excel" break
		                case "ppt": ctype="application/vnd.ms-powerpoint" break
		                case "gif": ctype="image/gif" break
		                case "png": ctype="image/png" break
		                case "jpe": case "jpeg":
		                case "jpg": ctype="image/jpg" break
		            }
				*/

				// this.p('Img Path ' + image_path)												
				this.dd('Img Path ' + image_path)												

				if ('A' == 'A')
				{
					// header_remove from php5.3
					// TODA ESTA PARTE ESTA PENDIENTE

				   	if(ini_get('zlib.output_compression'))
				    	ini_set('zlib.output_compression', 'Off')

					header('X-Sendfile: ' + image_path)
		            header('"Content-Type:' +  ctype + '"')
		            header("Content-Disposition: attachment filename=\"" + basename + "\"")
		            set_time_limit(0)
		            readfile(image_path)		
		   		}
		} 
		else 
		{
		    this.dd("Download error " + image_path ) 									
		}
		/// DOWN CODE
	}
	  
}

exports.anode_down = anode_down
