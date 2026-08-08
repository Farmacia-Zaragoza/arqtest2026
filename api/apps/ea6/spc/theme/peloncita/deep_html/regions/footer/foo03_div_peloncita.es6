//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS  Footer Class  [V.0.0.2]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Peloncita Structure Footer
//-------------------------------------------------------------------------------------
// <footer id="footer">
//<div class="container">
//<div class="all-places">
//<div class="container all-places-content">													LEVEL 01
//------------------------------------------------------------------------------------
//FOOTER
//.. n depths ..
//DIV
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//------------------------------------------------------------------------------------
//- reload_contents : Update value for local attributes
//- build_data  	 : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { getset } 		= require(	'/brqx/base/rcode/es6/com/objects/html/getset.es6'		)	

class foo03_div_peloncita extends getset {


	constructor(thm) //El constructor debe cargar las propiedades del archivo
	{
		this.n 			= 	"foo03_div::"
		super()
		this.thm 		= 	thm
		this.fnode 		= 	this.thm.nid.arr.fnode.region_bottom
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	create_div_01() //Option to load block - we can do block or view
	//6
	//$this->p('Despues del bloque de paises ' . $this->bnode->num_columns)									
	//Se supone que aqui tenemos arr[u_1] -- > primera columna
	//Vamos a generar un buen codigo para los bloques independiente de drupal
	//Taglugares
	//http://cica.dbrqx.com/admin/build/block/configure/block/7
	{
		var block_type 			= "block"
		var block_id 			= 7
		var num_columns 		= 6
		this.bnode 				= new bn02_tagadelic(this.fnode, block_type, block_id, num_columns)
		this.foo_01 			= new pla04_footer_peloncita(this.bnode, "Lugares Anupam && Rct")
		this.code 				= this.foo_01.code
	}

	build_data() //To build content is needed to build block
	{
		this.create_div_01()
	}

}

exports.foo03_div_peloncita = foo03_div_peloncita
