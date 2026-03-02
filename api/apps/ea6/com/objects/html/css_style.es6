//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//CSS Style Class  [V.0.0.6]  (2016-03-13)
//------------------------------------------------------------------------------------
//- First match          : Drupal 5
//- Next match           : Magento - Drupal 7-8
//------------------------------------------------------------------------------------
//Methods:
//- reload               : Reload dhtml object properties
//- prepare              : Prepare final fields for object creation. Let to have multiple intances with same init values
//- create               : Build html final code for dhtml object
//- pcreate              : Prepare and Create dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Tag type (div, nav , img ... )
//Tag name (div_01 , div_02 ...) - Left for compatibility
//Imported html styles from files
//Code fragment for TAG
//Code fragment for TAG
//Used to reload tags properties from dat files
//Prepare and create
class css_style {
  constructor(tag_type = "", style = "") ///        $puting_contents.='htm::Construct Tag 24 v1.01 : ' . $this->tag_type  . ':' . $this->tag_name .  '>' ;
  ///        $GLOBALS['putcont'].=$puting_contents;
  {
    this.tag_type = "";
    this.tame = "";
    this.style = "";
    this.font_size = "";
    this.font_family = "";
    this.left_right = "";
    this.position = "";
    this.width = "";
    this.height = "";
    this.adds = "";
    this.f_font_size = "";
    this.f_font_family = "";
    this.f_left_right = "";
    this.f_position = "";
    this.f_width = "";
    this.f_height = "";
    this.f_adds = "";
    this.reload(tag_type, style);
  }

  reload(tag_type = "", style = "") //Our tag name in html generated
  {
    this.tag_type = tag_type;
    this.style = "" + style;
  }

  pcreate() {
    this.prepare();
    this.create();
  }

  prepare() //Prepare final tags to use current tag content
  //In html all must to be strings
  {
    this.f_position = "" + this.position;
    this.f_font_family = "" + this.font_family;
    this.f_font_size = "" + this.font_size;
    this.f_width = "" + this.width;
    this.f_height = "" + this.height;
    this.f_adds = "" + this.adds;
  }

  create() //$puting_contents='html :id ' .   $this->tag_type . ':' . $this->f_id    .  '- >' ;
  //$GLOBALS['putcont'].=$puting_contents;
  {
    var str = "";
    if (this.f_left_right != "") str += this.f_left_right + ";";
    if (this.f_position != "") str += "position:" + this.f_position + ";";
    if (this.f_font_family != "") str += "font-family:" + this.f_font_family + ";";
    if (this.f_font_size != "") str += "font-size:" + this.f_font_size + ";";
    if (this.f_width != "") str += "width:" + this.f_width + ";";
    if (this.f_height != "") str += "height:" + this.f_height + ";";
    if (this.f_adds != "") str += this.f_adds;
    this.style = str;
  }

  __get(property) {
    if (this in property) {
      return this[property];
    }
  }

  __set(var, valor) {
    if ("css_style___set" in var) {
      this[var] = valor;
    } else {
      echo(`No existe el atributo ${var}.`);
    }
  }

  show() {
    echo(this.style);
  }

  shon() {
    echo(this.style + "\n");
  }

};
