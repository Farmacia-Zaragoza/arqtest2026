//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Drupal View Class  [V.0.0.2]  (2016-11-11)
//------------------------------------------------------------------------------------
//Methods:
//- Create : Create Drupal view embed model
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

//Document object Model
//Num elmeents of array filterd
//Array Output code
//Xml - html output code
//List of filtered nodes
//Html Code
//Tag name of html object
//Length of every group
//Create html code filtering dom object
//Create html code filtering dom object
//Create html code filtering dom object
class dom extends getset {
		constructor(html_code = "", tag_name = "a", group_len = 3) {
				super();
				this.xml_out = "";
				this.html_code = "";
				this.tag = "";
				this.group_len = "";
				this.dom = new DOMDocument();
				this.dom.resolveExternals = true;
				this.dom.substituteEntities = false;
				this.dom.preserveWhiteSpace = false;
				this.dom.formatOutput = true;
				this.reload_contents(html_code, tag_name, group_len);
		}

		reload_contents(html_code = "", tag_name = "a", group_len = 3) {
				this.html_code = html_code;
				this.tag = tag_name;
				this.group_len = group_len;

				if (this.html_code != "") {
						this.dom.loadHTML(this.html_code);
						this.build_list();
				}
		}

		build_list() //remove <!DOCTYPE
		//$html->removeChild($html->doctype);
		//$puting_contents='Dom Length:' . $this->count . '>' ;
		//$GLOBALS['putcont'].=$puting_contents;
		{
				this.list = this.dom.getElementsByTagName(this.tag);
				this.count = this.list.length;
		}

		create_xml() //Save current html - xml in a string
		{
				this.xml_out = this.dom.saveXml(this.list);
		}

		create_array(group_len = "") //aqui necesitamos una forma de vaciar el array
		//Aqui esta en grupos de tres
		//Counter of dom model object
		//Counter of output array
		{
				if (group_len != "") this.group_len = group_len;
				this.out = Array();
				var idx = 0;
				var c = 0;

				while (idx < this.count) //Php 7 format have saveHtml
				//Php 5 have saveXml
				//$puting_contents='SldWh:' . $idx .' ' . $output . '>' ;
				//$GLOBALS['putcont'].=$puting_contents;
				{
						this.out[c] += this.dom.saveXml(this.list.item(idx)).trim();
						idx++;

						if (idx % this.group_len == 0) //$puting_contents='SldWh:' . $idx . '->' ;
								//$GLOBALS['putcont'].=$puting_contents;
								{
										c++;
								}
				}
		}

		create() {
				this.create_array();
		}

};

