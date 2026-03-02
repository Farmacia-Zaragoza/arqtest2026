// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Print Magento Class  [V.0.0.3]  (2017-05-26)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Manage Magento object - Abstraction for Magento version
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - p			   	  : Agile print in screen taking class and method 
// - parr		   	  : Print an array of one dimmension - not recursive 
// - pre		   	  : Print a variable using pre html tag 
// - prearr		   	  : Print an array using pre html tag 
// - d_start	   	  : Debugging in file - starting file 
// - dd			   	  : Debugging in file 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class mg_print	
{
	 this.n 			=	'mg_print::'			

	 this.br			=	'</br>'						

	// Array
   	 this.arr			=	Array()										
	

	// Strings
	
	 this.dat_file 	=	''							


	 p(msg)
	{
		// Agile debug method. To load with deb - brqx alias
	    puting_contents=this.n + this.m + ' - ' + msg  + this.br 						
		print (puting_contents)											
	}

	 pre(msg)
	{
		print ('<pre>')  
		print_r(msg)
		print  ('</pre>') 
	}

	 prearr(a_passed)
	{
		print ('<pre>')  
		this.parr(a_passed)
		print  ('</pre>') 
	}

	 dd(msg)
	{
		// Agile debug method. To load with deb - brqx alias
	    puting_contents=this.n + this.m +  '-' .msg  + '>' 							
        GLOBALS['putcont'].=puting_contents
		file_put_contents('brqx_debug.ddm',GLOBALS['putcont'], FILE_APPEND)
		GLOBALS['putcont']= ''												
	}

	// Debug array
	 parr(a_passed)
	{
		if ( Array.isArray(a_passed) ) 
			foreach (a_passed as pos => elem) 	
				this.p(pos + ' + ' + elem )		
	}

    d_start(msg , letter = 'm')
	{
		// Debug adding content only
	    puting_contents=this.n + this.m +  '-' .msg  + '>' 	
        global.GLOBALS['putcont']=puting_contents // Theme

		file_put_contents('brqx_debug.dd' + letter ,GLOBALS['putcont'])

	}
	
	 load_db_data()
	{
		// Example of load local.xml - Is better other method
		if(file_exists(__DIR__ + '/../app/etc/local.xml')) 
		{
    
		    // Load in the local.xml and retrieve the database settings
		    xml = simplexml_load_file(__DIR__ + '/../app/etc/local.xml')
		    
		    if(isset(xml.global.resources.default_setup.connection)) {
		        connection = xml.global.resources.default_setup.connection
		        
		        // ** MySQL settings - You can get this info from your web host ** //
		        /** The name of the database for WordPress */
		        define('DB_NAME', connection.dbname)
		 
		        /** MySQL database username */
		        define('DB_USER', connection.username)
		 
		        /** MySQL database password */
		        define('DB_PASSWORD', connection.password)
		 
		        /** MySQL hostname */
		        define('DB_HOST', connection.host)
		        
		    } // END IF

		}
	} // END FUNCTION
}
 
