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
// - load   	  		: Load yaml file in array 
// - save				: Store categories in magento site 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class mge_categories extends mgi_categories	
{
	this.n 			=	'mge_categories::'			

	// List of all categories
	this.list										

	// Category object
	
	this.cat										
	
	// Strings
	
	this.num										

	this.num_parents								

	this.num_childrens								

    constructor ( dat_file = '')
   	{   
	    // El constructor debe cargar las propiedade
    	this.dat_file = dat_file 						

		this.load_categories()  
		

	}

	load(dat_file = '')
	{
		if (dat_file != '' )
			this.dat_file = dat_file		

		// Load all cagegories from yaml file			
		this.arr['cat'] = spyc_load_file(this.dat_file)
		
	}

	save_level_01(arr_elem = '' , deep = 0 )
	{
		this.m		= 	'save'				

		if (arr_elem == '' )
			arr_elem = this.arr['cat']  

		parent = '' 
	
//  		this.pre(this.arr['cat'])	
//		this.p('Num elem ' . count (this.arr['cat']))  
		// Store categories in magento
		foreach (arr_elem as title => elem )
		{
			// If is a correct yaml file will be an array
			if (Array.isArray(elem))
			{
				// Is the parent of nodes
				// this.p('Es_array ' . title) 			
				
				this.save_parent_level_01(title) 						
				this.save_inner_array(elem, title , deep++)			
				
			}
		
		}
	}


	save(arr_elem = '' , deep = 0 )
	{
		this.m		= 	'save'				

		if (arr_elem == '' )
			arr_elem = this.arr['cat']  

		parent = '' 
	
//  		this.pre(this.arr['cat'])	
//		this.p('Num elem ' . count (this.arr['cat']))  
		// Store categories in magento
		foreach (arr_elem as title => elem )
		{
			// If is a correct yaml file will be an array
			if (Array.isArray(elem))
			{
				// Is the parent of nodes
				// this.p('Es_array ' . title) 			
				
				this.save_parent(title) 						
				this.save_inner_array(elem, title , deep++)			
				
			}
		
		}
	}

	protected save_inner_array(arr_elem , parent_pased = '' , deep = 1)
	{
		this.m		=	'save_inner_array'						

		foreach (arr_elem as title => elem )
		{
			// Itaramos los elementos
			if (Array.isArray(elem))
			{
				// this.p('is_not_es_error' . title)
				
				this.save(elem , deep++)
				// Is not implemmented yet - Would be a recursive function
			}
			else {
				// this.p('Child - [' . deep . ']' . parent_pased . ' . ' . elem)	

				// Here your to save childern 
				this.create_children(parent_pased, elem)  	
			}
		}		
		
	}

	protected save_parent(parent_pased = '')
	{
		this.m		=	'save_parent'						

		// this.p('Parent ' . parent_pased)			
		// Here your to save parent level N
		this.create_parent(parent_pased)
				
	}

	protected save_parent_level_01(parent_pased = '')
	{
		this.m		=	'save_parent_level_01'						

		// this.p('Parent ' . parent_pased)			
		// Works
		this.create_parent(parent_pased)
		
	}


	clean()
	{
		// Clean categories in magento - Pending to implemment
		
	}

	load_categories()
	{
		// Load magento categories in mge_categories object
		this.m	= 'load_categories'										
		
		
		this.list = Mage::getModel('catalog/category').getCollection()  

		foreach (this.list as pos => cat)
		{
			count_cat++  

			this.cat 						= 	new mge_category()

			this.cat.level 				= 	cat.getLevel() // Works
			this.cat.id					=	cat.getId() // Works
			
			this.cat.data				=	cat.load(this.cat.id) 
		
			this.cat.name 				= 	this.cat.data.getName()

		
			//  Childrens 15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
		    this.cat.arr['childrens'] 	= 	split(',', cat.getChildren())
			
			this.cat.is_child			=	this.cat.level > 2				

			this.cat.num_childrens		=	count(this.cat.arr['childrens']) 	
			this.cat.have_childrens		=	this.cat.num_childrens > 0 	

			this.arr['categories'][this.cat.id]		=	this.cat 												

			// Solo sera un padre si el nivel es 2
			if (this.cat.level == 2 ) 			
				this.arr['parents'][]		=	this.cat 												

			
			// categories.pre(data)									
		
			// categories.p('Level  ' . level . ' Id ' . id . ' Name ' . name . ' Childrens ' . count(arr_children) ) 
		} // End Foreach

		this.num = count (this.arr['categories'])  

		this.num_parents = count (this.arr['parents'])  
		
		// 46 4
		// this.p('Total ' . this.num .  ' Parents ' . this.num_parents)	
		
	} // End Function

}
 

