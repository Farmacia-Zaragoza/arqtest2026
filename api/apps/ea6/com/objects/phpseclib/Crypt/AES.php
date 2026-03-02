//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementation of AES.
//
//Uses mcrypt, if available, and an internal implementation, otherwise.
//
//PHP versions 4 and 5
//
//If {@link Crypt_AES::setKeyLength() setKeyLength()} isn't called, it'll be calculated from
//{@link Crypt_AES::setKey() setKey()}.  ie. if the key is 128-bits, the key length will be 128-bits.  If it's 136-bits
//it'll be null-padded to 160-bits and 160 bits will be the key length until {@link Crypt_Rijndael::setKey() setKey()}
//is called, again, at which point, it'll be recalculated.
//
//Since Crypt_AES extends Crypt_Rijndael, some functions are available to be called that, in the context of AES, don't
//make a whole lot of sense.  {@link Crypt_AES::setBlockLength() setBlockLength()}, for instance.  Calling that function,
//however possible, won't do anything (AES has a fixed block length whereas Rijndael has a variable one).
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Crypt/AES.php');
//
//$aes = new Crypt_AES();
//
//$aes->setKey('abcdefghijklmnop');
//
//$size = 10 * 1024;
//$plaintext = '';
//for ($i = 0; $i < $size; $i++) {
//$plaintext.= 'a';
//}
//
//echo $aes->decrypt($aes->encrypt($plaintext));
//?>
//</code>
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
//@category   Crypt
//@package    Crypt_AES
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMVIII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//
//Include Crypt_Rijndael
//
//
//
//Encrypt / decrypt using the Electronic Code Book mode.
//
//@link http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation#Electronic_codebook_.28ECB.29
//
//
//
//Encrypt / decrypt using the Code Book Chaining mode.
//
//@link http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation#Cipher-block_chaining_.28CBC.29
//
//
//
//Encrypt / decrypt using the Cipher Feedback mode.
//
//@link http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation#Cipher_feedback_.28CFB.29
//
//
//
//Encrypt / decrypt using the Cipher Feedback mode.
//
//@link http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation#Output_feedback_.28OFB.29
//
//
//#@-
//#@+
// @access private
// @see Crypt_AES::Crypt_AES()
//
//Toggles the internal implementation
//
//
//
//Toggles the mcrypt implementation
//
//
//#@-
//
//Pure-PHP implementation of AES.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.1.0
//@access  public
//@package Crypt_AES
//
//
//vim: ts=4:sw=4:et:
//vim6: fdl=1:

if (!("function" === typeof Crypt_Rijndael)) {
    require("Rijndael.php");
}

const CRYPT_AES_MODE_CTR = -1;
const CRYPT_AES_MODE_ECB = 1;
const CRYPT_AES_MODE_CBC = 2;
const CRYPT_AES_MODE_CFB = 3;
const CRYPT_AES_MODE_OFB = 4;
const CRYPT_AES_MODE_INTERNAL = 1;
const CRYPT_AES_MODE_MCRYPT = 2;

//
//mcrypt resource for encryption
//
//The mcrypt resource can be recreated every time something needs to be created or it can be created just once.
//Since mcrypt operates in continuous mode, by default, it'll need to be recreated when in non-continuous mode.
//
//@see Crypt_AES::encrypt()
//@var String
//@access private
//
//
//
//mcrypt resource for decryption
//
//The mcrypt resource can be recreated every time something needs to be created or it can be created just once.
//Since mcrypt operates in continuous mode, by default, it'll need to be recreated when in non-continuous mode.
//
//@see Crypt_AES::decrypt()
//@var String
//@access private
//
//
//
//mcrypt resource for CFB mode
//
//@see Crypt_AES::encrypt()
//@see Crypt_AES::decrypt()
//@var String
//@access private
//
//
//
//Default Constructor.
//
//Determines whether or not the mcrypt extension should be used.  $mode should only, at present, be
//CRYPT_AES_MODE_ECB or CRYPT_AES_MODE_CBC.  If not explictly set, CRYPT_AES_MODE_CBC will be used.
//
//@param optional Integer $mode
//@return Crypt_AES
//@access public
//
//
//
//Dummy function
//
//Since Crypt_AES extends Crypt_Rijndael, this function is, technically, available, but it doesn't do anything.
//
//@access public
//@param Integer $length
//
//
//
//Sets the initialization vector. (optional)
//
//SetIV is not required when CRYPT_RIJNDAEL_MODE_ECB is being used.  If not explictly set, it'll be assumed
//to be all zero's.
//
//@access public
//@param String $iv
//
//
//
//Encrypts a message.
//
//$plaintext will be padded with up to 16 additional bytes.  Other AES implementations may or may not pad in the
//same manner.  Other common approaches to padding and the reasons why it's necessary are discussed in the following
//URL:
//
//{@link http://www.di-mgt.com.au/cryptopad.html http://www.di-mgt.com.au/cryptopad.html}
//
//An alternative to padding is to, separately, send the length of the file.  This is what SSH, in fact, does.
//strlen($plaintext) will still need to be a multiple of 16, however, arbitrary values can be added to make it that
//length.
//
//@see Crypt_AES::decrypt()
//@access public
//@param String $plaintext
//
//
//
//Decrypts a message.
//
//If strlen($ciphertext) is not a multiple of 16, null bytes will be added to the end of the string until it is.
//
//@see Crypt_AES::encrypt()
//@access public
//@param String $ciphertext
//
//
//
//Setup mcrypt
//
//Validates all the variables.
//
//@access private
//
//
//
//Treat consecutive "packets" as if they are a continuous buffer.
//
//The default behavior.
//
//@see Crypt_Rijndael::disableContinuousBuffer()
//@access public
//
//
//
//Treat consecutive packets as if they are a discontinuous buffer.
//
//The default behavior.
//
//@see Crypt_Rijndael::enableContinuousBuffer()
//@access public
//
//
class Crypt_AES extends Crypt_Rijndael {
    Crypt_AES(mode = CRYPT_AES_MODE_CBC) {
        if (!("undefined" !== typeof CRYPT_AES_MODE)) {
            switch (true) {
                case extension_loaded("mcrypt") && -1 !== mcrypt_list_algorithms().indexOf("rijndael-128"):
                    global.CRYPT_AES_MODE = CRYPT_AES_MODE_MCRYPT;
                    break;

                default:
                    global.CRYPT_AES_MODE = CRYPT_AES_MODE_INTERNAL;
            }
        }

        switch (CRYPT_AES_MODE) {
            case CRYPT_AES_MODE_MCRYPT:
                switch (mode) {
                    case CRYPT_AES_MODE_ECB:
                        this.paddable = true;
                        this.mode = MCRYPT_MODE_ECB;
                        break;

                    case CRYPT_AES_MODE_CTR:
                        this.mode = "ctr";
                        break;

                    case CRYPT_AES_MODE_CFB:
                        this.mode = "ncfb";
                        break;

                    case CRYPT_AES_MODE_OFB:
                        this.mode = MCRYPT_MODE_NOFB;
                        break;

                    case CRYPT_AES_MODE_CBC:
                    default:
                        this.paddable = true;
                        this.mode = MCRYPT_MODE_CBC;
                }

                break;

            default:
                switch (mode) {
                    case CRYPT_AES_MODE_ECB:
                        this.paddable = true;
                        this.mode = CRYPT_RIJNDAEL_MODE_ECB;
                        break;

                    case CRYPT_AES_MODE_CTR:
                        this.mode = CRYPT_RIJNDAEL_MODE_CTR;
                        break;

                    case CRYPT_AES_MODE_CFB:
                        this.mode = CRYPT_RIJNDAEL_MODE_CFB;
                        break;

                    case CRYPT_AES_MODE_OFB:
                        this.mode = CRYPT_RIJNDAEL_MODE_OFB;
                        break;

                    case CRYPT_AES_MODE_CBC:
                    default:
                        this.paddable = true;
                        this.mode = CRYPT_RIJNDAEL_MODE_CBC;
                }

        }

        if (CRYPT_AES_MODE == CRYPT_AES_MODE_INTERNAL) {
            super.Crypt_Rijndael(this.mode);
        }
    }

    setBlockLength(length) {
        return;
    }

    setIV(iv) {
        super.setIV(iv);

        if (CRYPT_AES_MODE == CRYPT_AES_MODE_MCRYPT) {
            this.changed = true;
        }
    }

    encrypt(plaintext) {
        if (CRYPT_AES_MODE == CRYPT_AES_MODE_MCRYPT) //re: http://phpseclib.sourceforge.net/cfb-demo.phps
            //using mcrypt's default handing of CFB the above would output two different things.  using phpseclib's
            //rewritten CFB implementation the above outputs the same thing twice.
            {
                this._mcryptSetup();

                if (this.mode == "ncfb" && this.continuousBuffer) {
                    var iv = this.encryptIV;
                    var pos = this.enbuffer.pos;
                    var len = plaintext.length;
                    var ciphertext = "";
                    var i = 0;

                    if (pos) {
                        var orig_pos = pos;
                        var max = 16 - pos;

                        if (len >= max) {
                            i = max;
                            len -= max;
                            pos = 0;
                        } else {
                            i = len;
                            pos += len;
                            len = 0;
                        }

                        ciphertext = iv.substr(orig_pos) ^ plaintext;
                        iv = substr_replace(iv, ciphertext, orig_pos, i);
                        this.enbuffer.enmcrypt_init = true;
                    }

                    if (len >= 16) {
                        if (this.enbuffer.enmcrypt_init === false || len > 280) {
                            if (this.enbuffer.enmcrypt_init === true) {
                                mcrypt_generic_init(this.enmcrypt, this.key, iv);
                                this.enbuffer.enmcrypt_init = false;
                            }

                            ciphertext += mcrypt_generic(this.enmcrypt, plaintext.substr(i, len - len % 16));
                            iv = ciphertext.substr(-16);
                            len %= 16;
                        } else {
                            while (len >= 16) {
                                iv = mcrypt_generic(this.ecb, iv) ^ plaintext.substr(i, 16);
                                ciphertext += iv;
                                len -= 16;
                                i += 16;
                            }
                        }
                    }

                    if (len) {
                        iv = mcrypt_generic(this.ecb, iv);
                        var block = iv ^ plaintext.substr(-len);
                        iv = substr_replace(iv, block, 0, len);
                        ciphertext += block;
                        pos = len;
                    }

                    return ciphertext;
                }

                if (this.paddable) {
                    plaintext = this._pad(plaintext);
                }

                ciphertext = mcrypt_generic(this.enmcrypt, plaintext);

                if (!this.continuousBuffer) {
                    mcrypt_generic_init(this.enmcrypt, this.key, this.iv);
                }

                return ciphertext;
            }

        return super.encrypt(plaintext);
    }

    decrypt(ciphertext) {
        if (CRYPT_AES_MODE == CRYPT_AES_MODE_MCRYPT) {
            this._mcryptSetup();

            if (this.mode == "ncfb" && this.continuousBuffer) {
                var iv = this.decryptIV;
                var pos = this.debuffer.pos;
                var len = ciphertext.length;
                var plaintext = "";
                var i = 0;

                if (pos) //ie. $i = min($max, $len), $len-= $i, $pos+= $i, $pos%= $blocksize
                    {
                        var orig_pos = pos;
                        var max = 16 - pos;

                        if (len >= max) {
                            i = max;
                            len -= max;
                            pos = 0;
                        } else {
                            i = len;
                            pos += len;
                            len = 0;
                        }

                        plaintext = iv.substr(orig_pos) ^ ciphertext;
                        iv = substr_replace(iv, ciphertext.substr(0, i), orig_pos, i);
                    }

                if (len >= 16) {
                    var cb = ciphertext.substr(i, len - len % 16);
                    plaintext += mcrypt_generic(this.ecb, iv + cb) ^ cb;
                    iv = cb.substr(-16);
                    len %= 16;
                }

                if (len) {
                    iv = mcrypt_generic(this.ecb, iv);
                    plaintext += iv ^ ciphertext.substr(-len);
                    iv = substr_replace(iv, ciphertext.substr(-len), 0, len);
                    pos = len;
                }

                return plaintext;
            }

            if (this.paddable) //we pad with chr(0) since that's what mcrypt_generic does.  to quote from http://php.net/function.mcrypt-generic :
                //"The data is padded with "\0" to make sure the length of the data is n * blocksize."
                {
                    ciphertext = str_pad(ciphertext, ciphertext.length + 15 & 4294967280, String.fromCharCode(0));
                }

            plaintext = mdecrypt_generic(this.demcrypt, ciphertext);

            if (!this.continuousBuffer) {
                mcrypt_generic_init(this.demcrypt, this.key, this.iv);
            }

            return this.paddable ? this._unpad(plaintext) : plaintext;
        }

        return super.decrypt(ciphertext);
    }

    _mcryptSetup() {
        if (!this.changed) {
            return;
        }

        if (!this.explicit_key_length) //this just copied from Crypt_Rijndael::_setup()
            {
                var length = this.key.length >> 2;

                if (length > 8) {
                    length = 8;
                } else if (length < 4) {
                    length = 4;
                }

                this.Nk = length;
                this.key_size = length << 2;
            }

        switch (this.Nk) {
            case 4:
                this.key_size = 16;
                break;

            case 5:
            case 6:
                this.key_size = 24;
                break;

            case 7:
            case 8:
                this.key_size = 32;
        }

        this.key = str_pad(this.key.substr(0, this.key_size), this.key_size, String.fromCharCode(0));
        this.encryptIV = this.decryptIV = this.iv = str_pad(this.iv.substr(0, 16), 16, String.fromCharCode(0));

        if (!(undefined !== this.enmcrypt)) //$mode = $this->mode == CRYPT_AES_MODE_CTR ? MCRYPT_MODE_ECB : $this->mode;
            {
                var mode = this.mode;
                this.demcrypt = mcrypt_module_open(MCRYPT_RIJNDAEL_128, "", mode, "");
                this.enmcrypt = mcrypt_module_open(MCRYPT_RIJNDAEL_128, "", mode, "");

                if (mode == "ncfb") {
                    this.ecb = mcrypt_module_open(MCRYPT_RIJNDAEL_128, "", MCRYPT_MODE_ECB, "");
                }
            }

        mcrypt_generic_init(this.demcrypt, this.key, this.iv);
        mcrypt_generic_init(this.enmcrypt, this.key, this.iv);

        if (this.mode == "ncfb") {
            mcrypt_generic_init(this.ecb, this.key, "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0");
        }

        this.changed = false;
    }

    enableContinuousBuffer() {
        super.enableContinuousBuffer();

        if (CRYPT_AES_MODE == CRYPT_AES_MODE_MCRYPT) {
            this.enbuffer.enmcrypt_init = true;
            this.debuffer.demcrypt_init = true;
        }
    }

    disableContinuousBuffer() {
        super.disableContinuousBuffer();

        if (CRYPT_AES_MODE == CRYPT_AES_MODE_MCRYPT) {
            mcrypt_generic_init(this.enmcrypt, this.key, this.iv);
            mcrypt_generic_init(this.demcrypt, this.key, this.iv);
        }
    }

};
