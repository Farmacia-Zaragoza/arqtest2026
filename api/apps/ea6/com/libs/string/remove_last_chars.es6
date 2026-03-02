//Limpia una cadena de puntos y espacios y devuelve capitalizada
//Obtiene solo la primera posicion del separador

function remove_last_chars_from_word(str_to_edit_remove = "", str_to_add = "", str_to_search = "_edit ,") //_ Tenemos que borrar esto edit_code
///ram/home/ser/zd/main/es/zdom/per/pelona/zd_main_cica/es/cache/cica.dbrqx.com/anonymous/garsintife/page/human/a/node_76926_edit?destination=admin%2fcontent%2fnode_code
//$this->u->ram_alias_code_path			=	str_replace("_edit_code", "", $this->u->ram_alias_code_path )	
//$this->u->ram_alias_code_path			=	substr($this->u->ram_alias_code_path, 0, strpos($this->u->ram_alias_code_path, '_edit'))
{
		str_to_edit_remove = str_to_edit_remove.substr(0, strpos(str_to_edit_remove, str_to_search))
		str_to_edit_remove += str_to_add
}

function remove_chars_from_word(str_to_edit_remove = "", str_to_add = "", str_to_search = "_edit_code ,") //_ Tenemos que borrar esto edit_code
///ram/home/ser/zd/main/es/zdom/per/pelona/zd_main_cica/es/cache/cica.dbrqx.com/anonymous/garsintife/page/human/a/node_76926_edit
{
		str_to_edit_remove = str_replace(str_to_search, "", str_to_edit_remove)
		str_to_edit_remove += str_to_add
}
