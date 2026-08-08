//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js SVGFont Class  [V.0.0.1]  (2017-10-19)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Image Class - Igual esta ya en desuso
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//--------------------------------------------------------------------------------------------------------------

class SVGFont {

    constructor() 
    {
        this.id = ""
        this.horizAdvX = 0
        this.unitsPerEm = 0
        this.ascent = 0
        this.descent = 0
        this.glyphs = Array()
    }

    utf8ToUnicode(str) {
        var unicode = Array()
        var values = Array()
        var lookingFor = 1

        for (var i = 0 ; i < str.length ; i++) 
        {
            var thisValue = str.charCodeAt(i)
            if (thisValue < 128) unicode.push(thisValue)
            	else {
                if (values.length == 0) lookingFor = thisValue < 224 ? 2 : 3
                values.push(thisValue)

                if (values.length == lookingFor) {
                    var number = lookingFor == 3 ? values[0] % 16 * 4096 + values[1] % 64 * 64 + values[2] % 64 : values[0] % 32 * 64 + values[1] % 64
                    unicode.push(number)
                    values = Array()
                    lookingFor = 1
                }
            }
        }

        return unicode
    }

    load(filename) 
    {
        this.glyphs = Array()
        var z = new XMLReader()
        z.open(filename)

        while (z.read()) {
            var name = z.name

            if (z.nodeType == XMLReader.ELEMENT) {
                if (name == "font") {
                    this.id = z.getAttribute("id")
                    this.horizAdvX = z.getAttribute("horiz-adv-x")
                }

                if (name == "font-face") {
                    this.unitsPerEm = z.getAttribute("units-per-em")
                    this.ascent = z.getAttribute("ascent")
                    this.descent = z.getAttribute("descent")
                }

                if (name == "glyph") {
                    var unicode = z.getAttribute("unicode")
                    unicode = this.utf8ToUnicode(unicode)
                    unicode = unicode[0]
                    this.glyphs[unicode] = new stdClass()
                    this.glyphs[unicode].horizAdvX = z.getAttribute("horiz-adv-x")

                    if (!this.glyphs[unicode].horizAdvX) {
                        this.glyphs[unicode].horizAdvX = this.horizAdvX
                    }

                    this.glyphs[unicode].d = z.getAttribute("d")
                }
            }
        }
    }

    textToPaths(text, asize) 
    {
        var lines = text.split("\n")
        var result = ""
        var horizAdvY = 0

        for (var text of Object.values(lines)) 
        {
            text = this.utf8ToUnicode(text)
            var size = +asize / this.unitsPerEm
            result += `<g transform="scale(${size}) translate(0, ${horizAdvY})">`
            var horizAdvX = 0

            for (var i = 0 ; i < text.length ; i++) 
            {
                var letter = text[i]
                result += `<path transform="translate(${horizAdvX},${horizAdvY}) rotate(180) scale(-1, 1)" d="${this.glyphs[letter].d}" />`
                horizAdvX += this.glyphs[letter].horizAdvX
            }

            result += "</g>"
            horizAdvY += this.ascent + this.descent
        }

        return result
    }

}


exports.SVGFont = SVGFont
