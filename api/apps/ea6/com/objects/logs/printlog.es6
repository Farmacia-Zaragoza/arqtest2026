// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Lib Printlog  [V.0.0.4]  (2018-02-13)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology [COMMON_EA6]
//-------------------------------------------------------------------------------------
// Node Js ES6 - Server with express - http/2
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods
//-------------------------------------------------------------------------------------
// - d-l-					: 	Log print
// - d-p-					: 	Fast print
// - d-pnn-					: 	Controlled print (used for debug)
// - d-parr-				: 	Arrays print (used for debug)
// - d-marr-				: 	Multi dimensional Arrays print
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	echo 				= 	require(	'node-echo'								);
		const empty = require(	'is_empty'								);
		const { savelog } = require(path.join(JS_BASE, 'com/objects/logs/savelog.es6'))
	  	const os = require(	'os'													);
	  	const fs = require(	'fs'													);

class printlog extends savelog
{

  constructor()
  {
 	super()

	// Atributos

	this.minimize_options =
    {
		removeComments : true,
		removeCommentsFromCDATA : true,
		collapseWhitespace : true,
		collapseBooleanAttributes : true,
		collapseInlineTagWhitespace : true,
		conservativeCollapse: true,
		customAttrCollapse: true,
		minifyCSS : true,
		minifyJS: true,
		removeAttributeQuotes : true,
		removeRedundantAttributes : true,
		useShortDoctype : true,
		removeEmptyAttributes : true,
		removeOptionalTags : true,
		removeEmptyElements : true
	}

  }
//var application_root 	= __dirname						,

// variables con let en lugar de var si no queremos que sean accesibles más allá de un ámbito
// const podemos crear constantes que sólo se puedan leer y no modificar

//exports.p(format, args)

  	l (msg)
  	{
		// echo don't need EOL
		echo(msg)
  	}

  	p (msg)
  	{
	// let puting_contents	= this.n + this.m + ' - ' + msg  + os.EOL 						;
	let puting_contents	= this.n + this.m + ' - ' + msg

	// echo don't need EOL
	echo(puting_contents)
  	}

	// Print new line (creo que pn ya existe)
  	pnn (msg)
  	{
	// CLASS_NAME (n) - METHOD (m) - CALLER (l)
		let arr_no_print = Array()
		// arr_no_print.push('page')
		// arr_no_print.push('cica_image')
		// arr_no_print.push('site_structure')
		// arr_no_print.push('file_structure')
		// arr_no_print.push('image_structure')
		// arr_no_print.push('links_common_structure')
		// arr_no_print.push('links_lang_structure')
		// arr_no_print.push('lang_flags')
		// arr_no_print.push('phone_structure')
		// arr_no_print.push('composition')

		let puting_contents_line_01	= '+[' + this.type  + '] ' + this.n + this.m

		if (!empty(this.l))
			puting_contents_line_01	+= '-call( ' + this.l + ')'

		// puting_contents_line_01	+= "\n\r"

		let puting_contents_line_02	= msg

		// CHECK NOT INCLUDES IN ARRAY
		if ( !(arr_no_print.includes(this.type) ))
		{
			// echo don't need EOL
			echo(puting_contents_line_01)
			echo(puting_contents_line_02)
		}
  	}

  // Debug array - forEach javascript
  	parr(a_passed)
	{
		// Extends printlog
	 	// super()

		// Check if is array
		if ( Array.isArray(a_passed) )
			for (var index in a_passed )
			{
				let elem = a_passed[index]
				//this.p(pos 	+ ' - ' + elem )
				this.p(index 	+ ' - ' + elem )
				// printlog.p(pos 	+ ' - ' + elem )
			}

	}

	// Multiple dimension array print
  	marr(a_passed, dim = 0 )
	{
		// Extends printlog
	 	// super()

		// Check if is array
		if ( Array.isArray(a_passed) )
			for (var index in a_passed )
			{
				var elem = a_passed[index]

				if ( Array.isArray(elem) )
				{
					this.p('dim[' + dim + '] ' + 'Indice : ' + index 	+ ' - ' + 'Array' )
					this.marr(elem , dim +1)
				}
				else
					this.p('dim[' + dim + '] ' + 'Indice : ' + index 	+ ' - ' + elem.substr(0,20) )
			}

	}

}	// End Class

exports.printlog = printlog
