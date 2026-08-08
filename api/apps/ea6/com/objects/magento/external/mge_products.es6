<?php
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Products Magento Class  [V.0.0.2]  (2017-06-15)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Manage Magento object - Abstraction for Magento version
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - load   	  	: Load all products from file ( options to update or create new) 
// - save			: Save all products to magento 
// - clean    		: Remove all products from magento database
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class mge_products extends mgi_products
{
	public		$n 			=	'mge_products::'			;


	// 162206:ACTIVE STRIPS 10 TIRAS:1,25

    public function __construct ( $dat_file = '')
   	{   
		// $this->p('Building')								;
    	$this->dat_file = $dat_file 						;
		
		$this->p		= 	new mge_product();

	}
	// 162206:ACTIVE STRIPS 10 TIRAS:1,25
	public function load($dat_file = '')
	{
		if ($dat_file != '' )
			$this->dat_file = $dat_file		;
		
		// Lines array
		$this->arr['pdt'] = file($this->dat_file);
		
	}

	// 162206:ACTIVE STRIPS 10 TIRAS:1,25
	#COD  NOMBRE_MED                               PRECIO
	// 672905A A S 500 MG 20 COM                      0000136000009400000E0040
	// 651608ABILIFY 10 MG 28 COMP DISP (E)           0005637000390800000E1040
	// 651609ABILIFY 15 MG 28 COMP DISP (E)           0008455000586200000E1040
	public function load_large($dat_file = '')
	{
		if ($dat_file != '' )
			$this->dat_file = $dat_file		;
		
		// Lines array - Products Large format
		$this->arr['pdl'] = file($this->dat_file);
	
		$this->p('Loadding File ' . count($this->arr['pdl'] ) ); 
		
	}


	public function save()
	{
		$this->m		= 	'save'				;

		foreach ($this->arr['pdt'] as  $pos => $product_line )
		{

			$comment_char 	=	substr($product_line,0,1);

			if ($comment_char != '#')
			{

				$arr_line = explode(':',$product_line);
				$product_code 	=	$arr_line[0];
				$product_name 	=	$arr_line[1];
				$product_price 	=	$arr_line[2];
				
				$this->p('Code ' . $product_code . ' Name ' . $product_name . ' Price ' . $product_price );
				
			}
		}
	}

	// 651609ABILIFY 15 MG 28 COMP DISP (E)           0008455000586200000E1040
	public function save_large()
	{
		$this->m		= 	'save'				;

		foreach ($this->arr['pdl'] as  $pos => $product_line )
		{

			$comment_char 	=	substr($product_line,0,1);

			if ($comment_char != '#')
			{

				$product_code 	=	substr($product_line,0,6);
				$product_name 	=	substr($product_line,7,47);
				$product_price 	=	substr($product_line,48,55);
				
				$this->p('Code ' . $product_code . ' Name ' . $product_name . ' Price ' . $product_price );
			
			}
		}
	}


	public function clean()
	{
		$this->m		= 	'clean'				;

		// Danger function but must to exist
		// Clean products in magento
		
	}
	
	


}
 

