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

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const { definitions_objects } 		= require(path.join(JS_BASE, 'com/objects/drupal/definitions/d01_objects.es6'))

class strings extends definitions_objects 
{
	constructor() 
	{
		super()
		this.n 					= 	"strings::"
		this.result				=	''

		this.replace_source		=	''
		this.replace_target		=	''


	}

	// Replace interno - Continuas operaciones
	inreplace(source, target)
	{
		this.result = this.result.replace(new RegExp(source, "g"), target)
	}


	// Replace with the same parameters
	autoreplace(string_passed)
	{
		this.result = string_passed.replace(new RegExp(this.replace_source, "g"), this.replace_target)
	}


	replace(string_pased, source, target)
	{
		this.replace_source = source
		this.replace_target = target
		
		if (source === '.')
		{
			// console.log('es un punto')
			this.result = string_pased.replace(new RegExp("\\.", "g"), target)
		}
		else

			this.result = string_pased.replace(new RegExp(source, "g"), target)
	}

	// Php strpos function
	strpos (haystack, needle, offset) 
	{
		  var i = (haystack+'').indexOf(needle, (offset || 0));
	  return i === -1 ? false : i;
	}

}

exports.strings = strings