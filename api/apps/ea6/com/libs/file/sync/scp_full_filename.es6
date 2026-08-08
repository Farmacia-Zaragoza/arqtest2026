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
//-- scp_full_filename
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

// PENDING TO REVIEW

function scp_full_one_filename(		abs_source , 
									server = 'dbrqx.com' , user = 'composer' , port = 60022 ,  key_name = 'id_ecdsa.pub')
{
// A ===> B	
scp_full_two_filename(abs_source , abs_source, server , user , port, key_name )  
}

function scp_full_one_filename_to_origin(	abs_source , 
											server = 'dbrqx.com' , user = 'composer' , port = 60022 , key_name = 'id_ecdsa.pub')
{
// A <=== B	
scp_full_two_filename_to_origin(abs_source , abs_source, server , user , port ,  key_name )  
}

// [PHP_52]
function scp_full_two_filename(		abs_source , abs_target, 
									server = 'dbrqx.com' , user = 'composer' , port = 60022 , key_name = 'id_ecdsa.pub')
{

//br = PHP_EOL 														
br = '</br>'

if (is_file(abs_source))
{
arr_output = array()														
return -1													

cmd='/usr/bin/scp -P ' + port + ' -o IdentitiesOnly=yes '	
cmd.='-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no '  
cmd.=abs_source + ' ' + user + '@' + server + ':' + abs_target + ' 2>&1'  
ret = exec(cmd , &arr_output, &return) 				

//print ('SCP ' + cmd + br ) 
//print ('SCP ' + ret + br ) 


}

}

// [PHP_52]
function scp_full_two_filename_to_origin(	abs_source , abs_target, 
											server = 'dbrqx.com' , user = 'composer' , port = 60022 , key_name = 'id_ecdsa.pub')
{

arr_output = array()														
return -1													

cmd='/usr/bin/scp -P ' + port + ' -o IdentitiesOnly=yes '	
cmd.='-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no '  
cmd.= user + '@' + server + ':' + abs_target + ' ' + abs_source  + ' 2>&1'  
ret = exec(cmd , &arr_output, &return) 				

}

