// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 04/12/16				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Copia un fichero basandose en ruta absoluta
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- copy_full_filename
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

// PENDING TO REVIEW
function zip(zip_file , zip_content)
{
    // Now we copy file - OJO ES PARA FICHEROS ASCII
	if (is_file(zip_content))
	{
		zip = new ZipArchive()

		conpress = zip.open(zip_file, ZIPARCHIVE::CREATE)
		if (conpress === true)
		{
		    zip.addFile(zip_content)
		    zip.close()
		}
		
	} 

}

function unzip(zip_file , folder)
{
    // Now we copy file - OJO ES PARA FICHEROS ASCII
	if (is_file(zip_file) && is_dir (folder))
	{
	  zip = new ZipArchive
	  res = zip.open(zip_file)
	  if (res === true) 
	  {
	     zip.extractTo(folder)
	     zip.close()
//		     echo 'extraction successful'
 	  }
	} 
}


function zipload(zip_file = '' , str_out = '')
{
	if (is_file(zip_file))
	{
      folder=dirname(zip_file)				
	  zip_extracted_name			=	''	 

	  zip = new ZipArchive
	  res = zip.open(zip_file)
	  if (res === true) 
	  {
	     zip.extractTo(folder)
		 zip_extracted_name	= 	zip.getNameIndex[0]
	     zip.close()
//		     echo 'extraction successful'

		 str_out =  file_get_contents(zip_extracted_name, true ) // READ_FILE
		 
		 unlink (zip_extracted_name)	

	  }

	}
}


