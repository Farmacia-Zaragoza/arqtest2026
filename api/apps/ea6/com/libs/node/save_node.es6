//changed - review brqx_save_node is in old architecture

function brqx_save_node_farm(node_type, lista_parrafos) //Guardamos el nodo que llega como parametro
//Tenemos dos opciones stdClass y array
//stdClass parece que te da mas libertad
//$node = new stdClass();
//Or any language code if
//Fotos
//[field_mm-term] -  [field_dp-term]
//no funciona
//$encabezado_prueba="Hola amigos 3.2-" . $size_lista ;
//Get Term ID - Esto funciona
//content_taxonomy_field($op, &$node, $field, &$items, $teaser, $page)
//Build an array of taxonomy terms.
//What is need is node was updated with cck_fields Aspirina
//Funciona TXT FILES
//Taxonomias
//brqx_save_tax($node, $taxrow);
//Mantenemos el mismo NID
//drupal_write_record('node', $node);
//drupal_write_record('node_revision', $node);
////    echo "Node with nid " . $node->nid . " saved!\n";
{
  var nid = 828;
  var node = node_load(nid);
  node.title = node_title;
  node.created = Date.now() / 1000;
  node.changed = node.created;
  node.type = node_type;
  node.comment = 0;
  node.status = 1;
  node.promote = 1;
  node.sticky = 0;
  node.uid = 1;
  node.language = LANGUAGE_NONE;
  var size_lista = lista_parrafos.length;

  for (var i = 0; i < size_lista; i++) //envia selector 1 pero debe comenzar en 0
  {
    var valor_actual = i - 1;
    var current_par = lista_parrafos[valor_actual];
    update_node(node, i, current_par);
  }

  var terms = taxonomy_get_term_by_name("Aspirina");
  var all_term = current(terms);
  var all_tid = all_term.tid;
  var field = "field_mm";
  var op = "load";
  var encabezado_prueba = "TEST_HEADER";
  node.taxonomy = Array();
  node.taxonomy.push(taxonomy_get_term(all_tid));
  node.field_mm[0][all_term].name = "Aspirina";
  node.field_mm[0][all_term].tid = all_tid;
  node.field_mm[0].view = "Aspirina";
  node.field_tags[0].tid = all_tid;
  node.field_encabezado[0].value = encabezado_prueba;
  node = node_submit(node);
  node_save(node);
  auto_nodetitle_set_title(node);
  node_save(node);
};

function brqx_save_tax_farm(node, term_results) //Iteramos entre las categorias pasadas
{
  for (var term of Object.values(term_results)) {
    switch (term.vid) {
      case 38:
        node.field_color[LANGUAGE_NONE].push({
          tid: term.tid
        });
        break;

      case 39:
        node.field_pais[LANGUAGE_NONE].push({
          tid: term.tid
        });
        break;

      case 43:
        node.field_ciudad[LANGUAGE_NONE].push({
          tid: term.tid
        });
    }
  }
};
