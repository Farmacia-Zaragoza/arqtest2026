<?php
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Categories Magento Class  [V.0.0.1]  (2017-05-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Manage Magento object - Abstraction for Magento version
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - pending   	  		: pending 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class mge_category extends mgi_category	
{
	// Cada una de las categorias
	
	public		$n 				=	'mge_category::'				;

	// Objects
	
	public 		$data												;

	// Attributes
	
	public 		$path			=	''								;

	// Is magento label
	public 		$label			=	''								;

	// Unique id of category
	public 		$id				=	''								;
	public 		$name			=	''								;

	public 		$num_childrens	= 	0								;

	//  By default all categories are children
	public 		$is_child		=	true							;
	public 		$have_childrens	=	false							;
	
	// Array
	public		$arr 										;

	public 		$parent			=	''							;


	// Methods - Pending

	public function getTree($name = '')
	{
		// will return a tree only if have children
		
	}
	
	public function getList($name = '')
	{
		// will return a tree only if have children
			

	}			
}
 

