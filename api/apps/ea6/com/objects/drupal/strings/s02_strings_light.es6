//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Bool Class  [V.0.0.4]  (2017-07-12)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
// - d-replace-			: Replace all occurences of characer in string
// - d-inreplace-		: Replace all occurences of characer in string result
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

class strings_light {
	constructor() 
	{
		this.n 					= 	"strings_light::"
		this.result				=	''
	}

	// Reemplazo multiple
	replace(string_pased, source, target)
	{
		if (source === '.')
		{
			// console.log('es un punto')
			this.result = string_pased.replace(new RegExp("\\.", "g"), target)
		}
		else

			this.result = string_pased.replace(new RegExp(source, "g"), target)
	}

	// Replace interno - Continuas operaciones
	inreplace(source, target)
	{
		this.result = this.result.replace(new RegExp(source, "g"), target)
	}

	// Php strpos function
	strpos (haystack, needle, offset) 
	{
		  var i = (haystack+'').indexOf(needle, (offset || 0));
	  return i === -1 ? false : i;
	}
	
	
}

exports.strings_light = strings_light
