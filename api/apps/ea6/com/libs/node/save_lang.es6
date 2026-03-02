function brqx_save_lang_node(nid, lang = "en") //Guardamos el nodo que llega como parametro
//Tenemos dos opciones stdClass y array
//stdClass parece que te da mas libertad
//$node = new stdClass();
//$node->type = $node_type;
//Or any language code if
//Number of parrafos
//End For
////    echo "Node with nid " . $node->nid . " saved!\n";
{
  var node = node_load(nid);
  node.created = Date.now() / 1000;
  node.changed = node.created;
  var node_type = node.type;
  node.comment = 0;
  node.status = 1;
  node.promote = 1;
  node.sticky = 0;
  node.uid = 1;
  node.language = LANGUAGE_NONE;
  var node_encabezado = node.field_encabezado[0].value;
  var size_lista = 51;
  var lf = "\r\n";

  for (var num_parrafo = 1; num_parrafo < size_lista; num_parrafo++) //envia selector 1 pero debe comenzar en 0
  //$valor_actual=$i -1;
  //print ($i . ' - ' . $current_par . $br . $lf );
  //$API_KEY_BRQX='AIzaSyBaZ3Xd_AnZkAV78pCdwyHggPTPbWfmkws';
  //$url = 'https://www.googleapis.com/language/translate/v2?key=YOUR_API_KEY&source=en&target=de&q=Hello%20world';
  {
    get_pf(node, num_parrafo, current_par);

    if (current_par != "") //Funciona Works !!!!
      {
        var translated_par = brqx_google_translate_es(current_par, lang);

        if (translated_par != "") //echo $num_parrafo . ' - ' . $current_par . '=' .  $translated_par .  $lf;
          //$node->field_parrafo_01[0]['value']	=	$translated_par;
          {
            update_node(node, num_parrafo, translated_par);
          }
      }
  }

  if (lang != "zh") {
    var translated_title = brqx_google_translate_es(node_encabezado, lang);
  } else //Special Symbols
    {
      translated_title = brqx_google_translate_es(node_encabezado, lang);
    }

  if (translated_title != "") {
    node.field_encabezado[0].value = translated_title;
  }

  node = node_submit(node);
  node_save(node);
  auto_nodetitle_set_title(node);
  node_save(node);
};
