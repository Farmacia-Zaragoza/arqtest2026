// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Sorted Array   [V.0.0.1]  (2018-01-13)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology [COMMON-EA6]
//-------------------------------------------------------------------------------------
// Node Js ES6 - Server with express - http/2
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	echo 				= 	require(	'node-echo'		),
		empty 				= 	require(	'is_empty'		),
		{ printlog } 		= 	require(	path.join(JS_BASE, 'com/objects/logs/printlog.es6')),
	  	os					= 	require(	'os'													),
	  	fs 					= 	require(	'fs'													);


class sorted_elem
{
  constructor(pos, tit,str)
  {
		this.type   =   'sorted_elem'

		this.tit	= 	tit
		this.str 	=	str				// Puede ser otro objeto | sorted_array
		this.pos	= 	pos
		this.dim 	= 	0
  }
}



class sorted_array extends printlog
{
	// Debe poder guardar, position , titulo y valor

  constructor()
  {
	super()
	// Atributos

	this.type   		=   'sorted_array'

	this.elems 			=	Array()
	this.num			=	0 			// Numero de elementos
	this.dim			=   0			// Dimension (profundidad)
  }

  add (tit , str)
  {
	var e = new sorted_elem(this.num, tit, str )
	this.elems[this.num]		=	e
	this.num					=	this.num  + 1
  }

  add_str (str)
  {
	var tit = ''
	var e 	= new sorted_elem(this.num, tit, str )
	this.elems[this.num]		=	e
	this.num					=	this.num  + 1
  }

  // Devuelve en elemento ordenable
  get(pos)	  	{	return this.elems[pos]	  	}

  get_tit(pos)	{	return this.elems[pos].tit	}

  get_str(pos)	{	return this.elems[pos].str	}

	// Multiple dimension array print
  setdim() {
	// Check if is array
		var mayor_hijo_dim = 0

		for (var i = 0 ; i < this.num ; i++)
		{
			var elem = this.elems[i].str

			if ( typeof elem === 'object')
			{

				// no devuelve el valor actualizado
				elem.setdim()

				// La dimension del padre siempre sera la dimension del mayor hijo + 1
				// el segundo objeto debe ser menos uno

				if (elem.dim > mayor_hijo_dim )
					mayor_hijo_dim = elem.dim

			}
		}
		this.dim = mayor_hijo_dim + 1
	}


	// Multiple dimension array print
  marr(dim = 0 ) {
	// Check if is array
		for (var i = 0 ; i < this.num ; i++)
		{
			var elem = this.elems[i].str
			var tit	 = this.elems[i].tit

			if ( typeof elem === 'object')
			{
				var re = ' '.repeat(dim)

				this.p(re + 'dim[' + dim + '] ' + 'Titulo : ' + tit 	+ ' - ' + 'Array' )
				dim = dim + 1
				elem.marr(dim)
				dim = dim -1
			}
			else
			{
				var re = ' '.repeat(dim)

				this.p(re + 'dim[' + dim + '] ' + 'Indice : ' + i 	+ ' - ' + elem.substr(0,60) )
			}
		}

	}


}	// End Class

exports.sorted_array = sorted_array
