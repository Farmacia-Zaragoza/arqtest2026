//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementation of Triple DES.
//
//Uses mcrypt, if available, and an internal implementation, otherwise.  Operates in the EDE3 mode (encrypt-decrypt-encrypt).
//
//PHP versions 4 and 5
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Crypt/TripleDES.php');
//
//$des = new Crypt_TripleDES();
//
//$des->setKey('abcdefghijklmnopqrstuvwx');
//
//$size = 10 * 1024;
//$plaintext = '';
//for ($i = 0; $i < $size; $i++) {
//$plaintext.= 'a';
//}
//
//echo $des->decrypt($des->encrypt($plaintext));
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
//@package    Crypt_TripleDES
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMVII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//
//Include Crypt_DES
//
//
//
//Encrypt / decrypt using outer chaining
//
//Outer chaining is used by SSH-2 and when the mode is set to CRYPT_DES_MODE_CBC.
//
//
//
//Pure-PHP implementation of Triple DES.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.1.0
//@access  public
//@package Crypt_TerraDES
//
//
//vim: ts=4:sw=4:et:
//vim6: fdl=1:

if (!("function" === typeof Crypt_DES)) {
    require("DES.php");
}

const CRYPT_DES_MODE_3CBC = -2;
const CRYPT_DES_MODE_CBC3 = CRYPT_DES_MODE_CBC;

//
//The Crypt_DES objects
//
//@var Array
//@access private
//
//
//
//Default Constructor.
//
//Determines whether or not the mcrypt extension should be used.  $mode should only, at present, be
//CRYPT_DES_MODE_ECB or CRYPT_DES_MODE_CBC.  If not explictly set, CRYPT_DES_MODE_CBC will be used.
//
//@param optional Integer $mode
//@return Crypt_TripleDES
//@access public
//
//
//
//Sets the key.
//
//Keys can be of any length.  Triple DES, itself, can use 128-bit (eg. strlen($key) == 16) or
//192-bit (eg. strlen($key) == 24) keys.  This function pads and truncates $key as appropriate.
//
//DES also requires that every eighth bit be a parity bit, however, we'll ignore that.
//
//If the key is not explicitly set, it'll be assumed to be all zero's.
//
//@access public
//@param String $key
//
//
//
//Sets the password.
//
//Depending on what $method is set to, setPassword()'s (optional) parameters are as follows:
//{@link http://en.wikipedia.org/wiki/PBKDF2 pbkdf2}:
//$hash, $salt, $method
//
//@param String $password
//@param optional String $method
//@access public
//
//
//
//Sets the initialization vector. (optional)
//
//SetIV is not required when CRYPT_DES_MODE_ECB is being used.  If not explictly set, it'll be assumed
//to be all zero's.
//
//@access public
//@param String $iv
//
//
//
//Encrypts a message.
//
//@access public
//@param String $plaintext
//
//
//
//Decrypts a message.
//
//@access public
//@param String $ciphertext
//
//
//
//Treat consecutive "packets" as if they are a continuous buffer.
//
//Say you have a 16-byte plaintext $plaintext.  Using the default behavior, the two following code snippets
//will yield different outputs:
//
//<code>
//echo $des->encrypt(substr($plaintext, 0, 8));
//echo $des->encrypt(substr($plaintext, 8, 8));
//</code>
//<code>
//echo $des->encrypt($plaintext);
//</code>
//
//The solution is to enable the continuous buffer.  Although this will resolve the above discrepancy, it creates
//another, as demonstrated with the following:
//
//<code>
//$des->encrypt(substr($plaintext, 0, 8));
//echo $des->decrypt($des->encrypt(substr($plaintext, 8, 8)));
//</code>
//<code>
//echo $des->decrypt($des->encrypt(substr($plaintext, 8, 8)));
//</code>
//
//With the continuous buffer disabled, these would yield the same output.  With it enabled, they yield different
//outputs.  The reason is due to the fact that the initialization vector's change after every encryption /
//decryption round when the continuous buffer is enabled.  When it's disabled, they remain constant.
//
//Put another way, when the continuous buffer is enabled, the state of the Crypt_DES() object changes after each
//encryption / decryption round, whereas otherwise, it'd remain constant.  For this reason, it's recommended that
//continuous buffers not be used.  They do offer better security and are, in fact, sometimes required (SSH uses them),
//however, they are also less intuitive and more likely to cause you problems.
//
//@see Crypt_TripleDES::disableContinuousBuffer()
//@access public
//
//
//
//Treat consecutive packets as if they are a discontinuous buffer.
//
//The default behavior.
//
//@see Crypt_TripleDES::enableContinuousBuffer()
//@access public
//
//
class Crypt_TripleDES extends Crypt_DES {
    Crypt_TripleDES(mode = CRYPT_DES_MODE_CBC) {
        if (!("undefined" !== typeof CRYPT_DES_MODE)) {
            switch (true) {
                case extension_loaded("mcrypt") && -1 !== mcrypt_list_algorithms().indexOf("tripledes"):
                    global.CRYPT_DES_MODE = CRYPT_DES_MODE_MCRYPT;
                    break;

                default:
                    global.CRYPT_DES_MODE = CRYPT_DES_MODE_INTERNAL;
            }
        }

        if (mode == CRYPT_DES_MODE_3CBC) //we're going to be doing the padding, ourselves, so disable it in the Crypt_DES objects
            {
                this.mode = CRYPT_DES_MODE_3CBC;
                this.des = [new Crypt_DES(CRYPT_DES_MODE_CBC), new Crypt_DES(CRYPT_DES_MODE_CBC), new Crypt_DES(CRYPT_DES_MODE_CBC)];
                this.paddable = true;
                this.des[0].disablePadding();
                this.des[1].disablePadding();
                this.des[2].disablePadding();
                return;
            }

        switch (CRYPT_DES_MODE) {
            case CRYPT_DES_MODE_MCRYPT:
                switch (mode) {
                    case CRYPT_DES_MODE_ECB:
                        this.paddable = true;
                        this.mode = MCRYPT_MODE_ECB;
                        break;

                    case CRYPT_DES_MODE_CTR:
                        this.mode = "ctr";
                        break;

                    case CRYPT_DES_MODE_CFB:
                        this.mode = "ncfb";
                        this.ecb = mcrypt_module_open(MCRYPT_3DES, "", MCRYPT_MODE_ECB, "");
                        break;

                    case CRYPT_DES_MODE_OFB:
                        this.mode = MCRYPT_MODE_NOFB;
                        break;

                    case CRYPT_DES_MODE_CBC:
                    default:
                        this.paddable = true;
                        this.mode = MCRYPT_MODE_CBC;
                }

                this.enmcrypt = mcrypt_module_open(MCRYPT_3DES, "", this.mode, "");
                this.demcrypt = mcrypt_module_open(MCRYPT_3DES, "", this.mode, "");
                break;

            default:
                this.des = [new Crypt_DES(CRYPT_DES_MODE_ECB), new Crypt_DES(CRYPT_DES_MODE_ECB), new Crypt_DES(CRYPT_DES_MODE_ECB)];
                this.des[0].disablePadding();
                this.des[1].disablePadding();
                this.des[2].disablePadding();

                switch (mode) {
                    case CRYPT_DES_MODE_ECB:
                    case CRYPT_DES_MODE_CBC:
                        this.paddable = true;
                        this.mode = mode;
                        break;

                    case CRYPT_DES_MODE_CTR:
                    case CRYPT_DES_MODE_CFB:
                    case CRYPT_DES_MODE_OFB:
                        this.mode = mode;
                        break;

                    default:
                        this.paddable = true;
                        this.mode = CRYPT_DES_MODE_CBC;
                }

                if ("function" === typeof create_function && is_callable("create_function")) {
                    this.inline_crypt_setup(3);
                    this.use_inline_crypt = true;
                }

        }
    }

    setKey(key) {
        var length = key.length;

        if (length > 8) //if $key is between 64 and 128-bits, use the first 64-bits as the last, per this:
            //http://php.net/function.mcrypt-encrypt#47973
            //$key = $length <= 16 ? substr_replace($key, substr($key, 0, 8), 16) : substr($key, 0, 24);
            {
                key = str_pad(key, 24, String.fromCharCode(0));
            } else {
            key = str_pad(key, 8, String.fromCharCode(0));
        }

        this.key = key;

        switch (true) {
            case CRYPT_DES_MODE == CRYPT_DES_MODE_INTERNAL:
            case this.mode == CRYPT_DES_MODE_3CBC:
                this.des[0].setKey(key.substr(0, 8));
                this.des[1].setKey(key.substr(8, 8));
                this.des[2].setKey(key.substr(16, 8));

                if (this.use_inline_crypt && this.mode != CRYPT_DES_MODE_3CBC) {
                    this.keys = {
                        [CRYPT_DES_ENCRYPT_1DIM]: array_merge(this.des[0].keys[CRYPT_DES_ENCRYPT_1DIM], this.des[1].keys[CRYPT_DES_DECRYPT_1DIM], this.des[2].keys[CRYPT_DES_ENCRYPT_1DIM]),
                        [CRYPT_DES_DECRYPT_1DIM]: array_merge(this.des[2].keys[CRYPT_DES_DECRYPT_1DIM], this.des[1].keys[CRYPT_DES_ENCRYPT_1DIM], this.des[0].keys[CRYPT_DES_DECRYPT_1DIM])
                    };
                }

        }

        this.enchanged = this.dechanged = true;
    }

    setPassword(password, method = "pbkdf2") {
        var key = "";

        switch (method) {
            default:
                var hash, salt, count;
                [, hash, salt, count] = arguments;

                if (!(undefined !== hash)) {
                    hash = "sha1";
                }

                if (!(undefined !== salt)) {
                    salt = "phpseclib";
                }

                if (!(undefined !== count)) {
                    count = 1000;
                }

                if (!("function" === typeof Crypt_Hash)) {
                    require("Crypt/Hash.php");
                }

                var i = 1;

                while (key.length < 24) //$dkLen == 24
                {
                    var u;
                    var hmac = new Crypt_Hash();
                    hmac.setHash(hash);
                    hmac.setKey(password);
                    var f = u = hmac.hash(salt + pack("N", i++));

                    for (var j = 2; j <= count; j++) {
                        u = hmac.hash(u);
                        f ^= u;
                    }

                    key += f;
                }

        }

        this.setKey(key);
    }

    setIV(iv) {
        this.encryptIV = this.decryptIV = this.iv = str_pad(iv.substr(0, 8), 8, String.fromCharCode(0));

        if (this.mode == CRYPT_DES_MODE_3CBC) {
            this.des[0].setIV(iv);
            this.des[1].setIV(iv);
            this.des[2].setIV(iv);
        }

        this.enchanged = this.dechanged = true;
    }

    encrypt(plaintext) {
        if (this.paddable) {
            plaintext = this._pad(plaintext);
        }

        if (this.mode == CRYPT_DES_MODE_3CBC && this.key.length > 8) {
            var ciphertext = this.des[2].encrypt(this.des[1].decrypt(this.des[0].encrypt(plaintext)));
            return ciphertext;
        }

        if (CRYPT_DES_MODE == CRYPT_DES_MODE_MCRYPT) {
            if (this.enchanged) {
                mcrypt_generic_init(this.enmcrypt, this.key, this.encryptIV);

                if (this.mode == "ncfb") {
                    mcrypt_generic_init(this.ecb, this.key, "\\0\\0\\0\\0\\0\\0\\0\\0");
                }

                this.enchanged = false;
            }

            if (this.mode != "ncfb" || !this.continuousBuffer) {
                ciphertext = mcrypt_generic(this.enmcrypt, plaintext);
            } else {
                var iv = this.encryptIV;
                var pos = this.enbuffer.pos;
                var len = plaintext.length;
                ciphertext = "";
                var i = 0;

                if (pos) {
                    var orig_pos = pos;
                    var max = 8 - pos;

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

                if (len >= 8) {
                    if (this.enbuffer.enmcrypt_init === false || len > 950) {
                        if (this.enbuffer.enmcrypt_init === true) {
                            mcrypt_generic_init(this.enmcrypt, this.key, iv);
                            this.enbuffer.enmcrypt_init = false;
                        }

                        ciphertext += mcrypt_generic(this.enmcrypt, plaintext.substr(i, len - len % 8));
                        iv = ciphertext.substr(-8);
                        i = ciphertext.length;
                        len %= 8;
                    } else {
                        while (len >= 8) {
                            iv = mcrypt_generic(this.ecb, iv) ^ plaintext.substr(i, 8);
                            ciphertext += iv;
                            len -= 8;
                            i += 8;
                        }
                    }
                }

                if (len) {
                    iv = mcrypt_generic(this.ecb, iv);
                    var block = iv ^ plaintext.substr(i);
                    iv = substr_replace(iv, block, 0, len);
                    ciphertext += block;
                    pos = len;
                }

                return ciphertext;
            }

            if (!this.continuousBuffer) {
                mcrypt_generic_init(this.enmcrypt, this.key, this.encryptIV);
            }

            return ciphertext;
        }

        if (this.key.length <= 8) {
            this.des[0].mode = this.mode;
            return this.des[0].encrypt(plaintext);
        }

        if (this.use_inline_crypt) {
            var inline = this.inline_crypt;
            return inline("encrypt", this, plaintext);
        }

        var des = this.des;
        var buffer = this.enbuffer;
        var continuousBuffer = this.continuousBuffer;
        ciphertext = "";

        switch (this.mode) {
            case CRYPT_DES_MODE_ECB:
                for (i = 0;; i < plaintext.length; i += 8) //all of these _processBlock calls could, in theory, be put in a function - say Crypt_TripleDES::_ede_encrypt() or something.
                //only problem with that: it would slow encryption and decryption down.  $this->des would have to be called every time that
                //function is called, instead of once for the whole string of text that's being encrypted, which would, in turn, make
                //encryption and decryption take more time, per this:
                //
                //http://blog.libssh2.org/index.php?/archives/21-Compiled-Variables.html
                {
                    block = plaintext.substr(i, 8);
                    block = des[0]._processBlock(block, CRYPT_DES_ENCRYPT);
                    block = des[1]._processBlock(block, CRYPT_DES_DECRYPT);
                    block = des[2]._processBlock(block, CRYPT_DES_ENCRYPT);
                    ciphertext += block;
                }

                break;

            case CRYPT_DES_MODE_CBC:
                var xor = this.encryptIV;

                for (i = 0;; i < plaintext.length; i += 8) {
                    block = plaintext.substr(i, 8) ^ xor;
                    block = des[0]._processBlock(block, CRYPT_DES_ENCRYPT);
                    block = des[1]._processBlock(block, CRYPT_DES_DECRYPT);
                    block = des[2]._processBlock(block, CRYPT_DES_ENCRYPT);
                    xor = block;
                    ciphertext += block;
                }

                if (this.continuousBuffer) {
                    this.encryptIV = xor;
                }

                break;

            case CRYPT_DES_MODE_CTR:
                xor = this.encryptIV;

                if (buffer.encrypted.length) {
                    for (i = 0;; i < plaintext.length; i += 8) {
                        block = plaintext.substr(i, 8);

                        if (block.length > buffer.encrypted.length) {
                            var key = this._generate_xor(xor);

                            key = des[0]._processBlock(key, CRYPT_DES_ENCRYPT);
                            key = des[1]._processBlock(key, CRYPT_DES_DECRYPT);
                            key = des[2]._processBlock(key, CRYPT_DES_ENCRYPT);
                            buffer.encrypted += key;
                        }

                        key = this._string_shift(buffer.encrypted);
                        ciphertext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < plaintext.length; i += 8) {
                        block = plaintext.substr(i, 8);
                        key = this._generate_xor(xor);
                        key = des[0]._processBlock(key, CRYPT_DES_ENCRYPT);
                        key = des[1]._processBlock(key, CRYPT_DES_DECRYPT);
                        key = des[2]._processBlock(key, CRYPT_DES_ENCRYPT);
                        ciphertext += block ^ key;
                    }
                }

                if (this.continuousBuffer) {
                    var start;
                    this.encryptIV = xor;

                    if (start = plaintext.length & 7) {
                        buffer.encrypted = key.substr(start) + buffer.encrypted;
                    }
                }

                break;

            case CRYPT_DES_MODE_CFB:
                if (buffer.xor.length) {
                    ciphertext = plaintext ^ buffer.xor;
                    iv = buffer.encrypted + ciphertext;
                    start = ciphertext.length;
                    buffer.encrypted += ciphertext;
                    buffer.xor = buffer.xor.substr(ciphertext.length);
                } else {
                    ciphertext = "";
                    iv = this.encryptIV;
                    start = 0;
                }

                for (i = start;; i < plaintext.length; i += 8) {
                    block = plaintext.substr(i, 8);
                    iv = des[0]._processBlock(iv, CRYPT_DES_ENCRYPT);
                    iv = des[1]._processBlock(iv, CRYPT_DES_DECRYPT);
                    xor = des[2]._processBlock(iv, CRYPT_DES_ENCRYPT);
                    iv = block ^ xor;

                    if (continuousBuffer && iv.length != 8) {
                        buffer = {
                            encrypted: iv,
                            xor: xor.substr(iv.length)
                        };
                    }

                    ciphertext += iv;
                }

                if (this.continuousBuffer) {
                    this.encryptIV = iv;
                }

                break;

            case CRYPT_DES_MODE_OFB:
                xor = this.encryptIV;

                if (buffer.xor.length) {
                    for (i = 0;; i < plaintext.length; i += 8) {
                        block = plaintext.substr(i, 8);

                        if (block.length > buffer.xor.length) {
                            xor = des[0]._processBlock(xor, CRYPT_DES_ENCRYPT);
                            xor = des[1]._processBlock(xor, CRYPT_DES_DECRYPT);
                            xor = des[2]._processBlock(xor, CRYPT_DES_ENCRYPT);
                            buffer.xor += xor;
                        }

                        key = this._string_shift(buffer.xor);
                        ciphertext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < plaintext.length; i += 8) {
                        xor = des[0]._processBlock(xor, CRYPT_DES_ENCRYPT);
                        xor = des[1]._processBlock(xor, CRYPT_DES_DECRYPT);
                        xor = des[2]._processBlock(xor, CRYPT_DES_ENCRYPT);
                        ciphertext += plaintext.substr(i, 8) ^ xor;
                    }

                    key = xor;
                }

                if (this.continuousBuffer) {
                    this.encryptIV = xor;

                    if (start = plaintext.length & 7) {
                        buffer.xor = key.substr(start) + buffer.xor;
                    }
                }

        }

        return ciphertext;
    }

    decrypt(ciphertext) {
        if (this.mode == CRYPT_DES_MODE_3CBC && this.key.length > 8) {
            var plaintext = this.des[0].decrypt(this.des[1].encrypt(this.des[2].decrypt(ciphertext)));
            return this._unpad(plaintext);
        }

        if (this.paddable) //we pad with chr(0) since that's what mcrypt_generic does.  to quote from http://php.net/function.mcrypt-generic :
            //"The data is padded with "\0" to make sure the length of the data is n * blocksize."
            {
                ciphertext = str_pad(ciphertext, ciphertext.length + 7 & 4294967288, String.fromCharCode(0));
            }

        if (CRYPT_DES_MODE == CRYPT_DES_MODE_MCRYPT) {
            if (this.dechanged) {
                mcrypt_generic_init(this.demcrypt, this.key, this.decryptIV);

                if (this.mode == "ncfb") {
                    mcrypt_generic_init(this.ecb, this.key, "\\0\\0\\0\\0\\0\\0\\0\\0");
                }

                this.dechanged = false;
            }

            if (this.mode != "ncfb" || !this.continuousBuffer) {
                plaintext = mdecrypt_generic(this.demcrypt, ciphertext);
            } else {
                var iv = this.decryptIV;
                var pos = this.debuffer.pos;
                var len = ciphertext.length;
                plaintext = "";
                var i = 0;

                if (pos) {
                    var orig_pos = pos;
                    var max = 8 - pos;

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

                if (len >= 8) {
                    var cb = ciphertext.substr(i, len - len % 8);
                    plaintext += mcrypt_generic(this.ecb, iv + cb) ^ cb;
                    iv = cb.substr(-8);
                    len %= 8;
                }

                if (len) {
                    iv = mcrypt_generic(this.ecb, iv);
                    cb = ciphertext.substr(-len);
                    plaintext += iv ^ cb;
                    iv = substr_replace(iv, cb, 0, len);
                    pos = len;
                }

                return plaintext;
            }

            if (!this.continuousBuffer) {
                mcrypt_generic_init(this.demcrypt, this.key, this.decryptIV);
            }

            return this.paddable ? this._unpad(plaintext) : plaintext;
        }

        if (this.key.length <= 8) {
            this.des[0].mode = this.mode;
            plaintext = this.des[0].decrypt(ciphertext);
            return this.paddable ? this._unpad(plaintext) : plaintext;
        }

        if (this.use_inline_crypt) {
            var inline = this.inline_crypt;
            return inline("decrypt", this, ciphertext);
        }

        var des = this.des;
        var buffer = this.debuffer;
        var continuousBuffer = this.continuousBuffer;
        plaintext = "";

        switch (this.mode) {
            case CRYPT_DES_MODE_ECB:
                for (i = 0;; i < ciphertext.length; i += 8) {
                    var block = ciphertext.substr(i, 8);
                    block = des[2]._processBlock(block, CRYPT_DES_DECRYPT);
                    block = des[1]._processBlock(block, CRYPT_DES_ENCRYPT);
                    block = des[0]._processBlock(block, CRYPT_DES_DECRYPT);
                    plaintext += block;
                }

                break;

            case CRYPT_DES_MODE_CBC:
                var xor = this.decryptIV;

                for (i = 0;; i < ciphertext.length; i += 8) {
                    var orig = block = ciphertext.substr(i, 8);
                    block = des[2]._processBlock(block, CRYPT_DES_DECRYPT);
                    block = des[1]._processBlock(block, CRYPT_DES_ENCRYPT);
                    block = des[0]._processBlock(block, CRYPT_DES_DECRYPT);
                    plaintext += block ^ xor;
                    xor = orig;
                }

                if (this.continuousBuffer) {
                    this.decryptIV = xor;
                }

                break;

            case CRYPT_DES_MODE_CTR:
                xor = this.decryptIV;

                if (buffer.ciphertext.length) {
                    for (i = 0;; i < ciphertext.length; i += 8) {
                        block = ciphertext.substr(i, 8);

                        if (block.length > buffer.ciphertext.length) {
                            var key = this._generate_xor(xor);

                            key = des[0]._processBlock(key, CRYPT_DES_ENCRYPT);
                            key = des[1]._processBlock(key, CRYPT_DES_DECRYPT);
                            key = des[2]._processBlock(key, CRYPT_DES_ENCRYPT);
                            buffer.ciphertext += key;
                        }

                        key = this._string_shift(buffer.ciphertext);
                        plaintext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < ciphertext.length; i += 8) {
                        block = ciphertext.substr(i, 8);
                        key = this._generate_xor(xor);
                        key = des[0]._processBlock(key, CRYPT_DES_ENCRYPT);
                        key = des[1]._processBlock(key, CRYPT_DES_DECRYPT);
                        key = des[2]._processBlock(key, CRYPT_DES_ENCRYPT);
                        plaintext += block ^ key;
                    }
                }

                if (this.continuousBuffer) {
                    var start;
                    this.decryptIV = xor;

                    if (start = plaintext.length & 7) {
                        buffer.ciphertext = key.substr(start) + buffer.ciphertext;
                    }
                }

                break;

            case CRYPT_DES_MODE_CFB:
                if (buffer.ciphertext.length) {
                    plaintext = ciphertext ^ this.decryptIV.substr(buffer.ciphertext.length);
                    buffer.ciphertext += ciphertext.substr(0, plaintext.length);

                    if (buffer.ciphertext.length != 8) {
                        block = this.decryptIV;
                    } else {
                        block = buffer.ciphertext;
                        xor = des[0]._processBlock(buffer.ciphertext, CRYPT_DES_ENCRYPT);
                        xor = des[1]._processBlock(xor, CRYPT_DES_DECRYPT);
                        xor = des[2]._processBlock(xor, CRYPT_DES_ENCRYPT);
                        buffer.ciphertext = "";
                    }

                    start = plaintext.length;
                } else {
                    plaintext = "";
                    xor = des[0]._processBlock(this.decryptIV, CRYPT_DES_ENCRYPT);
                    xor = des[1]._processBlock(xor, CRYPT_DES_DECRYPT);
                    xor = des[2]._processBlock(xor, CRYPT_DES_ENCRYPT);
                    start = 0;
                }

                for (i = start;; i < ciphertext.length; i += 8) {
                    block = ciphertext.substr(i, 8);
                    plaintext += block ^ xor;

                    if (continuousBuffer && block.length != 8) {
                        buffer.ciphertext += block;
                        block = xor;
                    } else if (block.length == 8) {
                        xor = des[0]._processBlock(block, CRYPT_DES_ENCRYPT);
                        xor = des[1]._processBlock(xor, CRYPT_DES_DECRYPT);
                        xor = des[2]._processBlock(xor, CRYPT_DES_ENCRYPT);
                    }
                }

                if (this.continuousBuffer) {
                    this.decryptIV = block;
                }

                break;

            case CRYPT_DES_MODE_OFB:
                xor = this.decryptIV;

                if (buffer.xor.length) {
                    for (i = 0;; i < ciphertext.length; i += 8) {
                        block = ciphertext.substr(i, 8);

                        if (block.length > buffer.xor.length) {
                            xor = des[0]._processBlock(xor, CRYPT_DES_ENCRYPT);
                            xor = des[1]._processBlock(xor, CRYPT_DES_DECRYPT);
                            xor = des[2]._processBlock(xor, CRYPT_DES_ENCRYPT);
                            buffer.xor += xor;
                        }

                        key = this._string_shift(buffer.xor);
                        plaintext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < ciphertext.length; i += 8) {
                        xor = des[0]._processBlock(xor, CRYPT_DES_ENCRYPT);
                        xor = des[1]._processBlock(xor, CRYPT_DES_DECRYPT);
                        xor = des[2]._processBlock(xor, CRYPT_DES_ENCRYPT);
                        plaintext += ciphertext.substr(i, 8) ^ xor;
                    }

                    key = xor;
                }

                if (this.continuousBuffer) {
                    this.decryptIV = xor;

                    if (start = ciphertext.length & 7) {
                        buffer.xor = key.substr(start) + buffer.xor;
                    }
                }

        }

        return this.paddable ? this._unpad(plaintext) : plaintext;
    }

    enableContinuousBuffer() {
        this.continuousBuffer = true;

        if (this.mode == CRYPT_DES_MODE_3CBC) {
            this.des[0].enableContinuousBuffer();
            this.des[1].enableContinuousBuffer();
            this.des[2].enableContinuousBuffer();
        }
    }

    disableContinuousBuffer() {
        this.continuousBuffer = false;
        this.encryptIV = this.iv;
        this.decryptIV = this.iv;
        this.enchanged = true;
        this.dechanged = true;
        this.enbuffer = {
            encrypted: "",
            xor: "",
            pos: 0,
            enmcrypt_init: true
        };
        this.debuffer = {
            ciphertext: "",
            xor: "",
            pos: 0,
            demcrypt_init: true
        };

        if (this.mode == CRYPT_DES_MODE_3CBC) {
            this.des[0].disableContinuousBuffer();
            this.des[1].disableContinuousBuffer();
            this.des[2].disableContinuousBuffer();
        }
    }

};
