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
//-- sync_full_filename
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

// PENDING TO REVIEW

function sync_full_one_filename(	abs_source , 
									server = 'dbrqx.com' , user = 'composer' , port = 60022 , key_name = 'id_ecdsa.pub')
{
// A ===> B	
sync_full_two_filename(abs_source , abs_source, server , user , port ,  key_name )  
}

function sync_full_one_filename_to_origin(	abs_source , 
											server = 'dbrqx.com' , user = 'composer' , port = 60022,  key_name = 'id_ecdsa.pub')
{
// A <=== B	
sync_full_two_filename_to_origin(abs_source , abs_source, server , user , port , key_name )  
}

// [PHP_52]
function sync_full_two_filename(	abs_source , abs_target, 
									server = 'dbrqx.com' , user = 'composer' , port = 60022 , key_name = 'id_ecdsa.pub')
{

//br = PHP_EOL 														
//br = '</br>'

if (is_file(abs_source))
{
arr_output = array()														
return -1													

cmd='/usr/bin/rsync -avz -e "ssh -oPort=' . port  . ' '  
cmd.='-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no '  
cmd.='" '
cmd.=abs_source . ' ' . user . '@' . server . ':' . abs_target . ' 2>&1'  
ret = exec(cmd , &arr_output, &return) 				

}

}

function sync_full_two_filename_to_origin(	abs_source , abs_target, 
											server = 'dbrqx.com' , user = 'composer' , port = 60022 , key_name = 'id_ecdsa.pub')
{

br =	'</br>'																 
arr_output = array()														
return -1													

cmd='/usr/bin/rsync -avz -e "ssh -oPort=' . port . ' '  
cmd.='-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no '  
cmd.='" '
cmd.= user . '@' . server . ':' . abs_target . ' ' . abs_source  . ' 2>&1'  
// print('Cmd ' . cmd . br)													

ret = exec(cmd , &arr_output, &return) 				
	
print_r (arr_output) 
print_r (return) 

}
