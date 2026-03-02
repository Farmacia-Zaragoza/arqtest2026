//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP ASN.1 Parser
//
//PHP versions 4 and 5
//
//ASN.1 provides the semantics for data encoded using various schemes.  The most commonly
//utilized scheme is DER or the "Distinguished Encoding Rules".  PEM's are base64 encoded
//DER blobs.
//
//File_ASN1 decodes and encodes DER formatted messages and places them in a semantic context.
//
//Uses the 1988 ASN.1 syntax.
//
//LICENSE: Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.
//
//@category   File
//@package    File_ASN1
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMXII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//#@+
// Tag Classes
//
// @access private
// @link http://www.itu.int/ITU-T/studygroups/com17/languages/X.690-0207.pdf#page=12
//#@-
//#@+
// Tag Classes
//
// @access private
// @link http://www.obj-sys.com/asn1tutorial/node124.html
//define('FILE_ASN1_TYPE_OBJECT_DESCRIPTOR',7);
//define('FILE_ASN1_TYPE_INSTANCE_OF',      8); // EXTERNAL
//define('FILE_ASN1_TYPE_EMBEDDED',        11);
//define('FILE_ASN1_TYPE_RELATIVE_OID',    13);
//SEQUENCE OF
//SET OF
//#@-
//#@+
// More Tag Classes
//
// @access private
// @link http://www.obj-sys.com/asn1tutorial/node10.html
//T61String
//ISO646String
//define('FILE_ASN1_TYPE_CHARACTER_STRING',29);
//#@-
//#@+
// Tag Aliases
//
// These tags are kinda place holders for other tags.
//
// @access private
//#@-
//
//ASN.1 Element
//
//Bypass normal encoding rules in File_ASN1::encodeDER()
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.3.0
//@access  public
//@package File_ASN1
//
//
//
//Pure-PHP ASN.1 Parser
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.3.0
//@access  public
//@package File_ASN1
//
//
const FILE_ASN1_CLASS_UNIVERSAL = 0;
const FILE_ASN1_CLASS_APPLICATION = 1;
const FILE_ASN1_CLASS_CONTEXT_SPECIFIC = 2;
const FILE_ASN1_CLASS_PRIVATE = 3;
const FILE_ASN1_TYPE_BOOLEAN = 1;
const FILE_ASN1_TYPE_INTEGER = 2;
const FILE_ASN1_TYPE_BIT_STRING = 3;
const FILE_ASN1_TYPE_OCTET_STRING = 4;
const FILE_ASN1_TYPE_NULL = 5;
const FILE_ASN1_TYPE_OBJECT_IDENTIFIER = 6;
const FILE_ASN1_TYPE_REAL = 9;
const FILE_ASN1_TYPE_ENUMERATED = 10;
const FILE_ASN1_TYPE_UTF8_STRING = 12;
const FILE_ASN1_TYPE_SEQUENCE = 16;
const FILE_ASN1_TYPE_SET = 17;
const FILE_ASN1_TYPE_NUMERIC_STRING = 18;
const FILE_ASN1_TYPE_PRINTABLE_STRING = 19;
const FILE_ASN1_TYPE_TELETEX_STRING = 20;
const FILE_ASN1_TYPE_VIDEOTEX_STRING = 21;
const FILE_ASN1_TYPE_IA5_STRING = 22;
const FILE_ASN1_TYPE_UTC_TIME = 23;
const FILE_ASN1_TYPE_GENERALIZED_TIME = 24;
const FILE_ASN1_TYPE_GRAPHIC_STRING = 25;
const FILE_ASN1_TYPE_VISIBLE_STRING = 26;
const FILE_ASN1_TYPE_GENERAL_STRING = 27;
const FILE_ASN1_TYPE_UNIVERSAL_STRING = 28;
const FILE_ASN1_TYPE_BMP_STRING = 30;
const FILE_ASN1_TYPE_CHOICE = -1;
const FILE_ASN1_TYPE_ANY = -2;

//
//Raw element value
//
//@var String
//@access private
//
//
//
//Constructor
//
//@param String $encoded
//@return File_ASN1_Element
//@access public
//
//
class File_ASN1_Element {
    File_ASN1_Element(encoded) {
        this.element = encoded;
    }

};

//
//ASN.1 object identifier
//
//@var Array
//@access private
//@link http://en.wikipedia.org/wiki/Object_identifier
//
//
//
//Default date format
//
//@var String
//@access private
//@link http://php.net/class.datetime
//
//
//
//Default date format
//
//@var Array
//@access private
//@see File_ASN1::setTimeFormat()
//@see File_ASN1::asn1map()
//@link http://php.net/class.datetime
//
//
//
//Filters
//
//If the mapping type is FILE_ASN1_TYPE_ANY what do we actually encode it as?
//
//@var Array
//@access private
//@see File_ASN1::_encode_der()
//
//
//
//Type mapping table for the ANY type.
//
//Structured or unknown types are mapped to a FILE_ASN1_Element.
//Unambiguous types get the direct mapping (int/real/bool).
//Others are mapped as a choice, with an extra indexing level.
//
//@var Array
//@access public
//
//
//
//String type to character size mapping table.
//
//Non-convertable types are absent from this table.
//size == 0 indicates variable length encoding.
//
//@var Array
//@access public
//
//
//
//Default Constructor.
//
//@access public
//
//
//
//Parse BER-encoding
//
//Serves a similar purpose to openssl's asn1parse
//
//@param String $encoded
//@return Array
//@access public
//
//
//
//Parse BER-encoding (Helper function)
//
//Sometimes we want to get the BER encoding of a particular tag.  $start lets us do that without having to reencode.
//$encoded is passed by reference for the recursive calls done for FILE_ASN1_TYPE_BIT_STRING and
//FILE_ASN1_TYPE_OCTET_STRING. In those cases, the indefinite length is used.
//
//@param String $encoded
//@param Integer $start
//@return Array
//@access private
//
//
//
//ASN.1 Decode
//
//Provides an ASN.1 semantic mapping ($mapping) from a parsed BER-encoding to a human readable format.
//
//@param Array $decoded
//@param Array $mapping
//@return Array
//@access public
//
//
//
//ASN.1 Encode
//
//DER-encodes an ASN.1 semantic mapping ($mapping).  Some libraries would probably call this function
//an ASN.1 compiler.
//
//@param String $source
//@param String $mapping
//@param Integer $idx
//@return String
//@access public
//
//
//
//ASN.1 Encode (Helper function)
//
//@param String $source
//@param String $mapping
//@param Integer $idx
//@return String
//@access private
//
//
//
//DER-encode the length
//
//DER supports lengths up to (2**8)**127, however, we'll only support lengths up to (2**8)**4.  See
//{@link http://itu.int/ITU-T/studygroups/com17/languages/X.690-0207.pdf#p=13 X.690 paragraph 8.1.3} for more information.
//
//@access private
//@param Integer $length
//@return String
//
//
//
//BER-decode the time
//
//Called by _decode_ber() and in the case of implicit tags asn1map().
//
//@access private
//@param String $content
//@param Integer $tag
//@return String
//
//
//
//Set the time format
//
//Sets the time / date format for asn1map().
//
//@access public
//@param String $format
//
//
//
//Load OIDs
//
//Load the relevant OIDs for a particular ASN.1 semantic mapping.
//
//@access public
//@param Array $oids
//
//
//
//Load filters
//
//See File_X509, etc, for an example.
//
//@access public
//@param Array $filters
//
//
//
//String Shift
//
//Inspired by array_shift
//
//@param String $string
//@param optional Integer $index
//@return String
//@access private
//
//
//
//String type conversion
//
//This is a lazy conversion, dealing only with character size.
//No real conversion table is used.
//
//@param String $in
//@param optional Integer $from
//@param optional Integer $to
//@return String
//@access public
//
//
class File_ASN1 {
    constructor() {
        this.oids = Array();
        this.format = "D, d M y H:i:s O";
        this.ANYmap = {
            [FILE_ASN1_TYPE_BOOLEAN]: true,
            [FILE_ASN1_TYPE_INTEGER]: true,
            [FILE_ASN1_TYPE_BIT_STRING]: "bitString",
            [FILE_ASN1_TYPE_OCTET_STRING]: "octetString",
            [FILE_ASN1_TYPE_NULL]: "null",
            [FILE_ASN1_TYPE_OBJECT_IDENTIFIER]: "objectIdentifier",
            [FILE_ASN1_TYPE_REAL]: true,
            [FILE_ASN1_TYPE_ENUMERATED]: "enumerated",
            [FILE_ASN1_TYPE_UTF8_STRING]: "utf8String",
            [FILE_ASN1_TYPE_NUMERIC_STRING]: "numericString",
            [FILE_ASN1_TYPE_PRINTABLE_STRING]: "printableString",
            [FILE_ASN1_TYPE_TELETEX_STRING]: "teletexString",
            [FILE_ASN1_TYPE_VIDEOTEX_STRING]: "videotexString",
            [FILE_ASN1_TYPE_IA5_STRING]: "ia5String",
            [FILE_ASN1_TYPE_UTC_TIME]: "utcTime",
            [FILE_ASN1_TYPE_GENERALIZED_TIME]: "generalTime",
            [FILE_ASN1_TYPE_GRAPHIC_STRING]: "graphicString",
            [FILE_ASN1_TYPE_VISIBLE_STRING]: "visibleString",
            [FILE_ASN1_TYPE_GENERAL_STRING]: "generalString",
            [FILE_ASN1_TYPE_UNIVERSAL_STRING]: "universalString",
            [FILE_ASN1_TYPE_BMP_STRING]: "bmpString"
        };
        this.stringTypeSize = {
            [FILE_ASN1_TYPE_UTF8_STRING]: 0,
            [FILE_ASN1_TYPE_BMP_STRING]: 2,
            [FILE_ASN1_TYPE_UNIVERSAL_STRING]: 4,
            [FILE_ASN1_TYPE_PRINTABLE_STRING]: 1,
            [FILE_ASN1_TYPE_TELETEX_STRING]: 1,
            [FILE_ASN1_TYPE_IA5_STRING]: 1,
            [FILE_ASN1_TYPE_VISIBLE_STRING]: 1
        };
    }

    File_ASN1() {
        if (!("_static_File_ASN1_File_ASN1_static_init" in global)) _static_File_ASN1_File_ASN1_static_init = undefined;

        if (!_static_File_ASN1_File_ASN1_static_init) {
            _static_File_ASN1_File_ASN1_static_init = true;

            if (!("function" === typeof Math_BigInteger)) {
                require("Math/BigInteger.php");
            }
        }
    }

    decodeBER(encoded) {
        if ("object" === typeof encoded && encoded.constructor.name.toLowerCase() == "file_asn1_element") {
            encoded = encoded.element;
        }

        this.encoded = encoded;
        return this._decode_ber(encoded);
    }

    _decode_ber(encoded, start = 0) {
        var decoded = Array();

        while (encoded.length) //End-of-content, see paragraphs 8.1.1.3, 8.1.3.2, 8.1.3.6, 8.1.5, and (for an example) 8.6.4.2
        //Class is UNIVERSAL, APPLICATION, PRIVATE, or CONTEXT-SPECIFIC. The UNIVERSAL class is restricted to the ASN.1
        //               built-in types. It defines an application-independent data type that must be distinguishable from all other
        //               data types. The other three classes are user defined. The APPLICATION class distinguishes data types that
        //               have a wide, scattered use within a particular presentation context. PRIVATE distinguishes data types within
        //               a particular organization or country. CONTEXT-SPECIFIC distinguishes members of a sequence or set, the
        //               alternatives of a CHOICE, or universally tagged set members. Only the class number appears in braces for this
        //               data type; the term CONTEXT-SPECIFIC does not appear.
        //                 -- http://www.obj-sys.com/asn1tutorial/node12.html
        //decode UNIVERSAL tags
        {
            var current = {
                start: start
            };

            var type = this._string_shift(encoded).charCodeAt(0);

            start++;
            var constructed = type >> 5 & 1;
            var tag = type & 31;

            if (tag == 31) //process septets (since the eighth bit is ignored, it's not an octet)
                {
                    tag = 0;

                    do {
                        var loop = encoded.charCodeAt(0) >> 7;
                        tag <<= 7;
                        tag |= this._string_shift(encoded).charCodeAt(0) & 127;
                        start++;
                    } while (loop);
                }

            var length = this._string_shift(encoded).charCodeAt(0);

            start++;

            if (length == 128) //indefinite length
                //"[A sender shall] use the indefinite form (see 8.1.3.6) if the encoding is constructed and is not all
                //immediately available." -- paragraph 8.1.3.2.c
                //if ( !$constructed ) {
                //return false;
                //}
                {
                    length = encoded.length;
                } else if (length & 128) //definite length, long form
                //technically, the long form of the length can be represented by up to 126 octets (bytes), but we'll only
                //support it up to four.
                //tags of indefinite length don't really have a header length; this length includes the tag
                {
                    length &= 127;

                    var temp = this._string_shift(encoded, length);

                    current += {
                        headerlength: length + 2
                    };
                    start += length;
                    extract(unpack("Nlength", str_pad(temp, 4, String.fromCharCode(0), STR_PAD_LEFT).substr(-4)));
                } else {
                current += {
                    headerlength: 2
                };
            }

            if (!type && !length) {
                return decoded;
            }

            var content = this._string_shift(encoded, length);

            var class = type >> 6 & 3;

            switch (class) {
                case FILE_ASN1_CLASS_APPLICATION:
                case FILE_ASN1_CLASS_PRIVATE:
                case FILE_ASN1_CLASS_CONTEXT_SPECIFIC:
                    decoded.push({
                        type: class,
                        constant: tag,
                        content: constructed ? this._decode_ber(content, start) : content,
                        length: length + start - current.start
                    } + current);
                    start += length;
                    continue;
            }

            current += {
                type: tag
            };

            switch (tag) {
                case FILE_ASN1_TYPE_BOOLEAN:
                    current.content = !!content.charCodeAt(0);
                    break;

                case FILE_ASN1_TYPE_INTEGER:
                case FILE_ASN1_TYPE_ENUMERATED:
                    current.content = new Math_BigInteger(content, -256);
                    break;

                case FILE_ASN1_TYPE_REAL:
                    return false;

                case FILE_ASN1_TYPE_BIT_STRING:
                    if (!constructed) {
                        current.content = content;
                    } else //all subtags should be bit strings
                        //if ($temp[$last]['type'] != FILE_ASN1_TYPE_BIT_STRING) {
                        //return false;
                        //}
                        {
                            temp = this._decode_ber(content, start);
                            length -= content.length;
                            var last = temp.length - 1;

                            for (var i = 0; i < last; i++) //all subtags should be bit strings
                            //if ($temp[$i]['type'] != FILE_ASN1_TYPE_BIT_STRING) {
                            //return false;
                            //}
                            {
                                current.content += temp[i].content.substr(1);
                            }

                            current.content = temp[last].content[0] + current.content + temp[i].content.substr(1);
                        }

                    break;

                case FILE_ASN1_TYPE_OCTET_STRING:
                    if (!constructed) {
                        current.content = content;
                    } else //$length =
                        {
                            var size;
                            temp = this._decode_ber(content, start);
                            length -= content.length;

                            for (i = 0, size = temp.length; i < size; i++) //all subtags should be octet strings
                            //if ($temp[$i]['type'] != FILE_ASN1_TYPE_OCTET_STRING) {
                            //return false;
                            //}
                            {
                                current.content += temp[i].content;
                            }
                        }

                    break;

                case FILE_ASN1_TYPE_NULL:
                    break;

                case FILE_ASN1_TYPE_SEQUENCE:
                case FILE_ASN1_TYPE_SET:
                    current.content = this._decode_ber(content, start);
                    break;

                case FILE_ASN1_TYPE_OBJECT_IDENTIFIER:
                    temp = this._string_shift(content).charCodeAt(0);
                    current.content = sprintf("%d.%d", Math.floor(temp / 40), temp % 40);
                    var valuen = 0;

                    while (content.length) {
                        temp = this._string_shift(content).charCodeAt(0);
                        valuen <<= 7;
                        valuen |= temp & 127;

                        if (~temp & 128) {
                            current.content += `.${valuen}`;
                            valuen = 0;
                        }
                    }

                    break;

                case FILE_ASN1_TYPE_NUMERIC_STRING:
                case FILE_ASN1_TYPE_PRINTABLE_STRING:
                case FILE_ASN1_TYPE_TELETEX_STRING:
                case FILE_ASN1_TYPE_VIDEOTEX_STRING:
                case FILE_ASN1_TYPE_VISIBLE_STRING:
                case FILE_ASN1_TYPE_IA5_STRING:
                case FILE_ASN1_TYPE_GRAPHIC_STRING:
                case FILE_ASN1_TYPE_GENERAL_STRING:
                case FILE_ASN1_TYPE_UTF8_STRING:
                case FILE_ASN1_TYPE_BMP_STRING:
                    current.content = content;
                    break;

                case FILE_ASN1_TYPE_UTC_TIME:
                case FILE_ASN1_TYPE_GENERALIZED_TIME:
                    current.content = this._decodeTime(content, tag);

                default:}

            start += length;
            decoded.push(current + {
                length: start - current.start
            });
        }

        return decoded;
    }

    asn1map(decoded, mapping) {
        if (undefined !== mapping.explicit) {
            decoded = decoded.content[0];
        }

        switch (true) {
            case mapping.type == FILE_ASN1_TYPE_ANY:
                var intype = decoded.type;

                if (undefined !== decoded.constant || !(undefined !== this.ANYmap[intype]) || this.encoded[decoded.start] & 32) {
                    return new File_ASN1_Element(this.encoded.substr(decoded.start, decoded.length));
                }

                var inmap = this.ANYmap[intype];

                if ("string" === typeof inmap) {
                    return {
                        [inmap]: this.asn1map(decoded, {
                            type: intype
                        } + mapping)
                    };
                }

                break;

            case mapping.type == FILE_ASN1_TYPE_CHOICE:
                {
                    let _tmp_0 = mapping.children;

                    for (var key in _tmp_0) {
                        var option = _tmp_0[key];

                        switch (true) {
                            case undefined !== option.constant && option.constant == decoded.constant:
                            case !(undefined !== option.constant) && option.type == decoded.type:
                                var value = this.asn1map(decoded, option);
                                break;

                            case !(undefined !== option.constant) && option.type == FILE_ASN1_TYPE_CHOICE:
                                var v = this.asn1map(decoded, option);

                                if (undefined !== v) {
                                    value = v;
                                }

                        }

                        if (undefined !== value) {
                            return {
                                [key]: value
                            };
                        }
                    }
                }
                return undefined;

            case undefined !== mapping.implicit:
            case undefined !== mapping.explicit:
            case decoded.type == mapping.type:
                break;

            default:
                return undefined;
        }

        if (undefined !== mapping.implicit) {
            decoded.type = mapping.type;
        }

        switch (decoded.type) {
            case FILE_ASN1_TYPE_SEQUENCE:
                var map = Array();

                if (undefined !== mapping.min && undefined !== mapping.max) {
                    var child = mapping.children;

                    for (var content of Object.values(decoded.content)) {
                        if (map.push(this.asn1map(content, child)) === undefined) {
                            return undefined;
                        }
                    }

                    return map;
                }

                var n = decoded.content.length;
                var i = 0;
                {
                    let _tmp_1 = mapping.children;

                    for (var key in _tmp_1) //Match only existing input.
                    {
                        var child = _tmp_1[key];
                        var maymatch = i < n;

                        if (maymatch) {
                            var temp = decoded.content[i];

                            if (child.type != FILE_ASN1_TYPE_CHOICE) //Get the mapping and input class & constant.
                                {
                                    var tempClass;
                                    var childClass = tempClass = FILE_ASN1_CLASS_UNIVERSAL;
                                    var constant = undefined;

                                    if (undefined !== temp.constant) {
                                        tempClass = undefined !== temp.class ? temp.class : FILE_ASN1_CLASS_CONTEXT_SPECIFIC;
                                    }

                                    if (undefined !== child.class) {
                                        childClass = child.class;
                                        constant = child.cast;
                                    } else if (undefined !== child.constant) {
                                        childClass = FILE_ASN1_CLASS_CONTEXT_SPECIFIC;
                                        constant = child.constant;
                                    }

                                    if (undefined !== constant && undefined !== temp.constant) //Can only match if constants and class match.
                                        {
                                            maymatch = constant == temp.constant && childClass == tempClass;
                                        } else //Can only match if no constant expected and type matches or is generic.
                                        {
                                            maymatch = !(undefined !== child.constant) && array_search(child.type, [temp.type, FILE_ASN1_TYPE_ANY, FILE_ASN1_TYPE_CHOICE]) !== false;
                                        }
                                }
                        }

                        if (maymatch) //Attempt submapping.
                            {
                                var candidate = this.asn1map(temp, child);
                                maymatch = candidate !== undefined;
                            }

                        if (maymatch) //Got the match: use it.
                            {
                                map[key] = candidate;
                                i++;
                            } else if (undefined !== child.default) //Use default.
                            {
                                map[key] = child.default;
                            } else if (!(undefined !== child.optional)) //Syntax error.
                            {
                                return undefined;
                            }
                    }
                }
                return i < n ? undefined : map;

            case FILE_ASN1_TYPE_SET:
                map = Array();

                if (undefined !== mapping.min && undefined !== mapping.max) {
                    child = mapping.children;

                    for (var content of Object.values(decoded.content)) {
                        if (map.push(this.asn1map(content, child)) === undefined) {
                            return undefined;
                        }
                    }

                    return map;
                }

                for (i = 0;; i < decoded.content.length; i++) {
                    temp = decoded.content[i];
                    tempClass = FILE_ASN1_CLASS_UNIVERSAL;

                    if (undefined !== temp.constant) {
                        tempClass = undefined !== temp.class ? temp.class : FILE_ASN1_CLASS_CONTEXT_SPECIFIC;
                    }

                    {
                        let _tmp_2 = mapping.children;

                        for (var key in _tmp_2) {
                            var child = _tmp_2[key];

                            if (undefined !== map[key]) {
                                continue;
                            }

                            maymatch = true;

                            if (child.type != FILE_ASN1_TYPE_CHOICE) {
                                childClass = FILE_ASN1_CLASS_UNIVERSAL;
                                constant = undefined;

                                if (undefined !== child.class) {
                                    childClass = child.class;
                                    constant = child.cast;
                                } else if (undefined !== child.constant) {
                                    childClass = FILE_ASN1_CLASS_CONTEXT_SPECIFIC;
                                    constant = child.constant;
                                }

                                if (undefined !== constant && undefined !== temp.constant) //Can only match if constants and class match.
                                    {
                                        maymatch = constant == temp.constant && childClass == tempClass;
                                    } else //Can only match if no constant expected and type matches or is generic.
                                    {
                                        maymatch = !(undefined !== child.constant) && array_search(child.type, [temp.type, FILE_ASN1_TYPE_ANY, FILE_ASN1_TYPE_CHOICE]) !== false;
                                    }
                            }

                            if (maymatch) //Attempt submapping.
                                {
                                    candidate = this.asn1map(temp, child);
                                    maymatch = candidate !== undefined;
                                }

                            if (!maymatch) {
                                break;
                            }

                            map[key] = candidate;
                            break;
                        }
                    }
                }

                {
                    let _tmp_3 = mapping.children;

                    for (var key in _tmp_3) {
                        var child = _tmp_3[key];

                        if (!(undefined !== map[key])) {
                            if (undefined !== child.default) {
                                map[key] = child.default;
                            } else if (!(undefined !== child.optional)) {
                                return undefined;
                            }
                        }
                    }
                }
                return map;

            case FILE_ASN1_TYPE_OBJECT_IDENTIFIER:
                return undefined !== this.oids[decoded.content] ? this.oids[decoded.content] : decoded.content;

            case FILE_ASN1_TYPE_UTC_TIME:
            case FILE_ASN1_TYPE_GENERALIZED_TIME:
                if (undefined !== mapping.implicit) {
                    decoded.content = this._decodeTime(decoded.content, decoded.type);
                }

                return date(this.format, decoded.content);

            case FILE_ASN1_TYPE_BIT_STRING:
                if (undefined !== mapping.mapping) //From X.680-0207.pdf#page=46 (21.7):
                    //                       "When a "NamedBitList" is used in defining a bitstring type ASN.1 encoding rules are free to add (or remove)
                    //                        arbitrarily any trailing 0 bits to (or from) values that are being encoded or decoded. Application designers should
                    //                        therefore ensure that different semantics are not associated with such values which differ only in the number of trailing
                    //                        0 bits."
                    {
                        var offset = decoded.content.charCodeAt(0);
                        var size = (decoded.content.length - 1) * 8 - offset;
                        var bits = mapping.mapping.length == size ? Array() : array_fill(0, mapping.mapping.length - size, false);

                        for (i = decoded.content.length - 1;; i > 0; i--) {
                            var current = decoded.content.charCodeAt(i);

                            for (var j = offset; j < 8; j++) {
                                bits.push(!!(current & 1 << j));
                            }

                            offset = 0;
                        }

                        var values = Array();
                        map = mapping.mapping.reverse();

                        for (var i in map) {
                            var value = map[i];

                            if (bits[i]) {
                                values.push(value);
                            }
                        }

                        return values;
                    }

            case FILE_ASN1_TYPE_OCTET_STRING:
                return base64_encode(decoded.content);

            case FILE_ASN1_TYPE_NULL:
                return "";

            case FILE_ASN1_TYPE_BOOLEAN:
                return decoded.content;

            case FILE_ASN1_TYPE_NUMERIC_STRING:
            case FILE_ASN1_TYPE_PRINTABLE_STRING:
            case FILE_ASN1_TYPE_TELETEX_STRING:
            case FILE_ASN1_TYPE_VIDEOTEX_STRING:
            case FILE_ASN1_TYPE_IA5_STRING:
            case FILE_ASN1_TYPE_GRAPHIC_STRING:
            case FILE_ASN1_TYPE_VISIBLE_STRING:
            case FILE_ASN1_TYPE_GENERAL_STRING:
            case FILE_ASN1_TYPE_UNIVERSAL_STRING:
            case FILE_ASN1_TYPE_UTF8_STRING:
            case FILE_ASN1_TYPE_BMP_STRING:
                return decoded.content;

            case FILE_ASN1_TYPE_INTEGER:
            case FILE_ASN1_TYPE_ENUMERATED:
                temp = decoded.content;

                if (undefined !== mapping.implicit) {
                    temp = new Math_BigInteger(decoded.content, -256);
                }

                if (undefined !== mapping.mapping) {
                    temp = +temp.toString();
                    return undefined !== mapping.mapping[temp] ? mapping.mapping[temp] : false;
                }

                return temp;
        }
    }

    encodeDER(source, mapping) {
        this.location = Array();
        return this._encode_der(source, mapping);
    }

    _encode_der(source, mapping, idx = undefined) {
        if ("object" === typeof source && source.constructor.name.toLowerCase() == "file_asn1_element") {
            return source.element;
        }

        if (undefined !== mapping.default && source === mapping.default) {
            return "";
        }

        if (undefined !== idx) {
            this.location.push(idx);
        }

        var tag = mapping.type;

        switch (tag) {
            case FILE_ASN1_TYPE_SET:
            case FILE_ASN1_TYPE_SEQUENCE:
                tag |= 32;
                var value = "";

                if (undefined !== mapping.min && undefined !== mapping.max) {
                    var child = mapping.children;

                    for (var content of Object.values(source)) {
                        var temp = this._encode_der(content, child);

                        if (temp === false) {
                            return false;
                        }

                        value += temp;
                    }

                    break;
                }

                {
                    let _tmp_4 = mapping.children;

                    for (var key in _tmp_4) {
                        var child = _tmp_4[key];

                        if (!(undefined !== source[key])) {
                            if (!(undefined !== child.optional)) {
                                return false;
                            }

                            continue;
                        }

                        temp = this._encode_der(source[key], child, key);

                        if (temp === false) {
                            return false;
                        }

                        if (temp === "") {
                            continue;
                        }

                        if (undefined !== child.constant) //From X.680-0207.pdf#page=58 (30.6):
                            //                           "The tagging construction specifies explicit tagging if any of the following holds:
                            //                            ...
                            //                            c) the "Tag Type" alternative is used and the value of "TagDefault" for the module is IMPLICIT TAGS or
                            //                            AUTOMATIC TAGS, but the type defined by "Type" is an untagged choice type, an untagged open type, or
                            //                            an untagged "DummyReference" (see ITU-T Rec. X.683 | ISO/IEC 8824-4, 8.3)."
                            {
                                if (undefined !== child.explicit || child.type == FILE_ASN1_TYPE_CHOICE) {
                                    var subtag = String.fromCharCode(FILE_ASN1_CLASS_CONTEXT_SPECIFIC << 6 | 32 | child.constant);
                                    temp = subtag + this._encodeLength(temp.length) + temp;
                                } else {
                                    subtag = String.fromCharCode(FILE_ASN1_CLASS_CONTEXT_SPECIFIC << 6 | temp.charCodeAt(0) & 32 | child.constant);
                                    temp = subtag + temp.substr(1);
                                }
                            }

                        value += temp;
                    }
                }
                break;

            case FILE_ASN1_TYPE_CHOICE:
                temp = false;
                {
                    let _tmp_5 = mapping.children;

                    for (var key in _tmp_5) //if isset($child['constant']) is true then isset($child['optional']) should be true as well
                    {
                        var child = _tmp_5[key];

                        if (!(undefined !== source[key])) {
                            continue;
                        }

                        temp = this._encode_der(source[key], child, key);

                        if (temp === false) {
                            return false;
                        }

                        if (temp === "") {
                            continue;
                        }

                        tag = temp.charCodeAt(0);

                        if (undefined !== child.constant) {
                            if (undefined !== child.explicit || child.type == FILE_ASN1_TYPE_CHOICE) {
                                subtag = String.fromCharCode(FILE_ASN1_CLASS_CONTEXT_SPECIFIC << 6 | 32 | child.constant);
                                temp = subtag + this._encodeLength(temp.length) + temp;
                            } else {
                                subtag = String.fromCharCode(FILE_ASN1_CLASS_CONTEXT_SPECIFIC << 6 | temp.charCodeAt(0) & 32 | child.constant);
                                temp = subtag + temp.substr(1);
                            }
                        }
                    }
                }

                if (undefined !== idx) {
                    this.location.pop();
                }

                if (temp && undefined !== mapping.cast) {
                    temp[0] = String.fromCharCode(mapping.class << 6 | tag & 32 | mapping.cast);
                }

                return temp;

            case FILE_ASN1_TYPE_INTEGER:
            case FILE_ASN1_TYPE_ENUMERATED:
                if (!(undefined !== mapping.mapping)) {
                    value = source.toBytes(true);
                } else {
                    value = array_search(source, mapping.mapping);

                    if (value === false) {
                        return false;
                    }

                    value = new Math_BigInteger(value);
                    value = value.toBytes(true);

                    if (!value.length) {
                        value = String.fromCharCode(0);
                    }
                }

                break;

            case FILE_ASN1_TYPE_UTC_TIME:
            case FILE_ASN1_TYPE_GENERALIZED_TIME:
                var format = mapping.type == FILE_ASN1_TYPE_UTC_TIME ? "y" : "Y";
                format += "mdHis";
                value = gmdate(format, strtotime(source)) + "Z";
                break;

            case FILE_ASN1_TYPE_BIT_STRING:
                if (undefined !== mapping.mapping) {
                    var bits = array_fill(0, mapping.mapping.length, 0);
                    var size = 0;

                    for (var i = 0; i < mapping.mapping.length; i++) {
                        if (-1 !== source.indexOf(mapping.mapping[i])) {
                            bits[i] = 1;
                            size = i;
                        }
                    }

                    var offset = 8 - (size + 1 & 7);
                    offset = offset !== 8 ? offset : 0;
                    value = String.fromCharCode(offset);

                    for (i = size + 1;; i < mapping.mapping.length; i++) {
                        delete bits[i];
                    }

                    bits = array_pad(bits, size + offset + 1, 0).join("");
                    var bytes = rtrim(chunk_split(bits, 8, " ")).split(" ");

                    for (var byte of Object.values(bytes)) {
                        value += String.fromCharCode(bindec(byte));
                    }

                    break;
                }

            case FILE_ASN1_TYPE_OCTET_STRING:
                value = base64_decode(source);
                break;

            case FILE_ASN1_TYPE_OBJECT_IDENTIFIER:
                var oid = preg_match("#(?:\\d+\\.)+#", source) ? source : array_search(source, this.oids);

                if (oid === false) {
                    user_error("Invalid OID");
                    return false;
                }

                value = "";
                var parts = oid.split(".");
                value = String.fromCharCode(40 * parts[0] + parts[1]);

                for (i = 2;; i < parts.length; i++) {
                    temp = "";

                    if (!parts[i]) {
                        temp = "\\0";
                    } else {
                        while (parts[i]) {
                            temp = String.fromCharCode(128 | parts[i] & 127) + temp;
                            parts[i] >>= 7;
                        }

                        temp[temp.length - 1] = temp[temp.length - 1] & String.fromCharCode(127);
                    }

                    value += temp;
                }

                break;

            case FILE_ASN1_TYPE_ANY:
                var loc = this.location;

                if (undefined !== idx) {
                    this.location.pop();
                }

                switch (true) {
                    case !(undefined !== source):
                        return this._encode_der(undefined, {
                            type: FILE_ASN1_TYPE_NULL
                        } + mapping);

                    case "number" === typeof source:
                    case "object" === typeof source && source.constructor.name.toLowerCase() == "math_biginteger":
                        return this._encode_der(source, {
                            type: FILE_ASN1_TYPE_INTEGER
                        } + mapping);

                    case "number" === typeof source:
                        return this._encode_der(source, {
                            type: FILE_ASN1_TYPE_REAL
                        } + mapping);

                    case "boolean" === typeof source:
                        return this._encode_der(source, {
                            type: FILE_ASN1_TYPE_BOOLEAN
                        } + mapping);

                    case Array.isArray(source) && source.length == 1:
                        var typename = Object.keys(source).join("");
                        var outtype = array_search(typename, this.ANYmap, true);

                        if (outtype !== false) {
                            return this._encode_der(source[typename], {
                                type: outtype
                            } + mapping);
                        }

                }

                var filters = this.filters;

                for (var part of Object.values(loc)) {
                    if (!(undefined !== filters[part])) {
                        filters = false;
                        break;
                    }

                    filters = filters[part];
                }

                if (filters === false) {
                    user_error("No filters defined for " + loc.join("/"));
                    return false;
                }

                return this._encode_der(source, filters + mapping);

            case FILE_ASN1_TYPE_NULL:
                value = "";
                break;

            case FILE_ASN1_TYPE_NUMERIC_STRING:
            case FILE_ASN1_TYPE_TELETEX_STRING:
            case FILE_ASN1_TYPE_PRINTABLE_STRING:
            case FILE_ASN1_TYPE_UNIVERSAL_STRING:
            case FILE_ASN1_TYPE_UTF8_STRING:
            case FILE_ASN1_TYPE_BMP_STRING:
            case FILE_ASN1_TYPE_IA5_STRING:
            case FILE_ASN1_TYPE_VISIBLE_STRING:
            case FILE_ASN1_TYPE_VIDEOTEX_STRING:
            case FILE_ASN1_TYPE_GRAPHIC_STRING:
            case FILE_ASN1_TYPE_GENERAL_STRING:
                value = source;
                break;

            case FILE_ASN1_TYPE_BOOLEAN:
                value = source ? "\\xFF" : "\\x00";
                break;

            default:
                user_error("Mapping provides no type definition for " + this.location.join("/"));
                return false;
        }

        if (undefined !== idx) {
            this.location.pop();
        }

        if (undefined !== mapping.cast) {
            tag = mapping.class << 6 | tag & 32 | mapping.cast;
        }

        return String.fromCharCode(tag) + this._encodeLength(value.length) + value;
    }

    _encodeLength(length) {
        if (length <= 127) {
            return String.fromCharCode(length);
        }

        var temp = ltrim(pack("N", length), String.fromCharCode(0));
        return pack("Ca*", 128 | temp.length, temp);
    }

    _decodeTime(content, tag) //UTCTime:
    //           http://tools.ietf.org/html/rfc5280#section-4.1.2.5.1
    //           http://www.obj-sys.com/asn1tutorial/node15.html
    //           GeneralizedTime:
    //           http://tools.ietf.org/html/rfc5280#section-4.1.2.5.2
    //           http://www.obj-sys.com/asn1tutorial/node14.html
    {
        var year, month, day, hour, minute, second, timezone;
        var pattern = tag == FILE_ASN1_TYPE_UTC_TIME ? "#(..)(..)(..)(..)(..)(..)(.*)#" : "#(....)(..)(..)(..)(..)(..).*([Z+-].*)$#";
        preg_match(pattern, content, matches);
        [year, month, day, hour, minute, second, timezone] = matches;

        if (tag == FILE_ASN1_TYPE_UTC_TIME) {
            year = year >= 50 ? `19${year}` : `20${year}`;
        }

        if (timezone == "Z") {
            var mktime = "gmmktime";
            timezone = 0;
        } else if (preg_match("#([+-])(\\d\\d)(\\d\\d)#", timezone, matches)) {
            mktime = "gmmktime";
            timezone = 60 * matches[3] + 3600 * matches[2];

            if (matches[1] == "-") {
                timezone = -timezone;
            }
        } else {
            mktime = "mktime";
            timezone = 0;
        }

        return mktime(hour, minute, second, month, day, year) + timezone;
    }

    setTimeFormat(format) {
        this.format = format;
    }

    loadOIDs(oids) {
        this.oids = oids;
    }

    loadFilters(filters) {
        this.filters = filters;
    }

    _string_shift(string, index = 1) {
        var substr = substr(string, 0, index);
        string = substr(string, index);
        return substr;
    }

    convert(in, from = FILE_ASN1_TYPE_UTF8_STRING, to = FILE_ASN1_TYPE_UTF8_STRING) {
        if (!(undefined !== this.stringTypeSize[from]) || !(undefined !== this.stringTypeSize[to])) {
            return false;
        }

        var insize = this.stringTypeSize[from];
        var outsize = this.stringTypeSize[to];
        var inlength = in.length;
        var out = "";

        for (var i = 0; i < inlength; ) {
            if (inlength - i < insize) {
                return false;
            }

            var c = in.charCodeAt(i++);

            switch (true) {
                case insize == 4:
                    c = c << 8 | in.charCodeAt(i++);
                    c = c << 8 | in.charCodeAt(i++);

                case insize == 2:
                    c = c << 8 | in.charCodeAt(i++);

                case insize == 1:
                    break;

                case (c & 128) == 0:
                    break;

                case (c & 64) == 0:
                    return false;

                default:
                    var bit = 6;

                    do {
                        if (bit > 25 || i >= inlength || (in.charCodeAt(i) & 192) != 128) {
                            return false;
                        }

                        c = c << 6 | in.charCodeAt(i++) & 63;
                        bit += 5;
                        var mask = 1 << bit;
                    } while (c & bit);

                    c &= mask - 1;
                    break;
            }

            var v = "";

            switch (true) {
                case outsize == 4:
                    v += String.fromCharCode(c & 255);
                    c >>= 8;
                    v += String.fromCharCode(c & 255);
                    c >>= 8;

                case outsize == 2:
                    v += String.fromCharCode(c & 255);
                    c >>= 8;

                case outsize == 1:
                    v += String.fromCharCode(c & 255);
                    c >>= 8;

                    if (c) {
                        return false;
                    }

                    break;

                case (c & 2147483648) != 0:
                    return false;

                case c >= 67108864:
                    v += String.fromCharCode(128 | c & 63);
                    c = c >> 6 | 67108864;

                case c >= 2097152:
                    v += String.fromCharCode(128 | c & 63);
                    c = c >> 6 | 2097152;

                case c >= 65536:
                    v += String.fromCharCode(128 | c & 63);
                    c = c >> 6 | 65536;

                case c >= 2048:
                    v += String.fromCharCode(128 | c & 63);
                    c = c >> 6 | 2048;

                case c >= 128:
                    v += String.fromCharCode(128 | c & 63);
                    c = c >> 6 | 192;

                default:
                    v += String.fromCharCode(c);
                    break;
            }

            out += strrev(v);
        }

        return out;
    }

};
