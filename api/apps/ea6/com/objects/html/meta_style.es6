//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Meta Class  [V.0.1.0]  (2016-03-16)
//------------------------------------------------------------------------------------
//- First match          : Drupal 5
//- Next match           : Magento - Drupal 7-8
//------------------------------------------------------------------------------------
//Methods:
//- reload               : Reload dhtml object properties
//- prepare              : Prepare final fields for object creation. Let to have multiple intances with same init values
//- set_db_architecture  : Set database architecture for current SuperMnu Generation
//- create               : Build html final code for dhtml object
//- pcreate              : Prepare && Create dhtml object
//- create_class         : Call to create method changing dhtml class property
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Tag type (meta, script , link)
//Imported html styles from files
//Inner content of html object
//Code fragment for TAG
//Block for debug [TAG]
//Our html properties
//Tag name (div_01 , div_02 ...)
//Final html styles to use for create content
//Inner content of html object
//Code fragment for TAG
//Our html properties
//Tag name (div_01 , div_02 ...)
//Content field for META Style
//Full content of html object or other code
//Used to reload tags properties from dat files
//Reload && crate content
//Prepare && create
class meta_style {
  constructor(tag_type = "", tame = "") ///        $puting_contents.='htm::Construct Tag 24 v1.01 : ' . $this->tag_type  . ':' . $this->tag_name .  '>' ;
  ///        $GLOBALS['putcont'].=$puting_contents;
  {
    this.tag_type = "";
    this.src = "";
    this.type = "";
    this.name = "";
    this.rel = "";
    this.href = "";
    this.media = "";
    this.content = "";
    this.adds = "";
    this.debug = "";
    this.tame = "";
    this.f_src = "";
    this.f_type = "";
    this.f_name = "";
    this.f_rel = "";
    this.f_href = "";
    this.f_media = "";
    this.f_content = "";
    this.f_adds = "";
    this.f_tame = "";
    this.ctnt = "";
    this.code = "";
    this.reload(tag_type, tame);
  }

  cleaner() //Inner content of html object
  {
    this.src = "";
    this.type = "";
    this.name = "";
    this.rel = "";
    this.href = "";
    this.media = "";
    this.content = "";
  }

  reload(tag_type = "", tame = "", name = "", rel = "", content = "", type = "", media = "") {
    this.cleaner();
    this.tag_type = tag_type;
    this.tame = tame;
    this.name = "" + name;
    this.rel = "" + rel;
    this.type = "" + type;
    this.media = "" + media;
    if (this.tag_type == "meta") this.content = "" + content;else if (this.tag_type == "link") this.href = "" + content;else if (this.tag_type == "script") this.src = "" + content;
    if (this.tame != "") this.debug = "<[" + this.tame + "]>";else this.debug = "<[" + this.tag_type + "]>";
  }

  rcreate(tag_type = "", tame = "", name = "", rel = "", content = "", type = "", media = "") {
    this.reload(tag_type, tame, name, rel, content, type, media);
    this.pcreate();
  }

  pcreate() {
    this.prepare();
    this.create();
  }

  prepare() //Prepare final tags to use current tag content
  //In html all must to be strings
  //Our properties
  {
    this.f_src = "" + this.src;
    this.f_type = "" + this.type;
    this.f_name = "" + this.name;
    this.f_href = "" + this.href;
    this.f_rel = "" + this.rel;
    this.f_media = "" + this.media;
    this.f_content = "" + this.content;
    this.f_adds = "" + this.adds;
    this.f_tame = "" + this.tame;
  }

  create() //$puting_contents='html :id ' .   $this->tag_type . ':' . $this->f_id    .  '- >' ;
  //$GLOBALS['putcont'].=$puting_contents;
  //$puting_contents='html :code ' .   $this->tag_type . ':' . $this->code    .  '>' ;
  //$GLOBALS['putcont'].=$puting_contents;
  {
    var str = "<" + this.tag_type + " ";
    if (this.f_name != "") str += "name=\"" + this.f_name + "\" ";
    if (this.f_rel != "") str += "rel=\"" + this.f_rel + "\" ";
    if (this.f_content != "") str += "content=\"" + this.f_content + "\" ";
    if (this.f_href != "") str += "href=\"" + this.f_href + "\" ";
    if (this.f_type != "") str += "type=\"" + this.f_type + "\" ";
    if (this.f_src != "") str += "src=\"" + this.f_src + "\" ";
    if (this.f_media != "") str += "media=\"" + this.f_media + "\" ";
    if (this.f_adds != "") str += this.f_adds;
    if (this.tag_type == "meta" || this.tag_type == "link") str += "/>";else //Is an script
      {
        str += ">";
        str += this.ctnt;
        str += "</" + this.tag_type + ">";
      }
    this.code = str;
  }

  __get(property) {
    if (this in property) {
      return this[property];
    }
  }

  __set(var, valor) {
    if ("meta_style___set" in var) {
      this[var] = valor;
    } else {
      echo(`No existe el atributo ${var}.`);
    }
  }

  show() {
    echo(this.code);
  }

  shon() {
    echo(this.code + "\n");
  }

};
