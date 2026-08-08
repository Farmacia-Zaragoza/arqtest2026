
function dash_clean(str_in) //Reemplazamos los saltos de elinea
//$es_line=trim($es_line,'-')															; // No permitimos guiones separando
{
	var m = "dash_clean-:";
	var no_nr = eregi_replace("[\n|\r|\n\r]", "", str_in);
	var es_temp = no_nr.replace(/\s+/g, " ");
	es_temp = es_temp.replace(/_+/g, "_");
	var es_line = trim(es_temp.trim(), "_");
	return es_line;
};

function dash_clean_with_feed(str_in) //Reemplazamos los saltos de elinea
//$no_nr 	 = eregi_replace("[\n|\r|\n\r]", '', $str_in)								;
//$es_line=trim($es_line,'-')															; // No podemos quitar los guiones pues pueden ser separadores de frases
{
	var m = "dash_clean_with_feed-:";
	var es_temp = str_in.replace(/\s+/g, " ");
	es_temp = es_temp.replace(/_+/g, "_");
	var es_line = trim(es_temp.trim(), "_");
	return es_line;
};

function linefeed_clean(str_in) //Reemplazamos los saltos de elinea
{
	var no_nr = eregi_replace("[\n|\r|\n\r]", "", str_in);
	return no_nr;
};

