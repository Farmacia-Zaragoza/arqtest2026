//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementation of DES.
//
//Uses mcrypt, if available, and an internal implementation, otherwise.
//
//PHP versions 4 and 5
//
//Useful resources are as follows:
//
//- {@link http://en.wikipedia.org/wiki/DES_supplementary_material Wikipedia: DES supplementary material}
//- {@link http://www.itl.nist.gov/fipspubs/fip46-2.htm FIPS 46-2 - (DES), Data Encryption Standard}
//- {@link http://www.cs.eku.edu/faculty/styer/460/Encrypt/JS-DES.html JavaScript DES Example}
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Crypt/DES.php');
//
//$des = new Crypt_DES();
//
//$des->setKey('abcdefgh');
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
//@package    Crypt_DES
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMVII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//#@+
// @access private
// @see Crypt_DES::_prepareKey()
// @see Crypt_DES::_processBlock()
//
//Contains array_reverse($keys[CRYPT_DES_DECRYPT])
//
//
//
//Contains array_reverse($keys[CRYPT_DES_ENCRYPT])
//
//
//
//Contains $keys[CRYPT_DES_ENCRYPT] as 1-dim array
//
//
//
//Contains $keys[CRYPT_DES_DECRYPT] as 1-dim array
//
//
//#@-
//#@+
// @access public
// @see Crypt_DES::encrypt()
// @see Crypt_DES::decrypt()
//
//Encrypt / decrypt using the Counter mode.
//
//Set to -1 since that's what Crypt/Random.php uses to index the CTR mode.
//
//@link http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation#Counter_.28CTR.29
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
// @see Crypt_DES::Crypt_DES()
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
//Pure-PHP implementation of DES.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.1.0
//@access  public
//@package Crypt_DES
//
//
//vim: ts=4:sw=4:et:
//vim6: fdl=1:
const CRYPT_DES_ENCRYPT = 0;
const CRYPT_DES_DECRYPT = 1;
const CRYPT_DES_ENCRYPT_1DIM = 2;
const CRYPT_DES_DECRYPT_1DIM = 3;
const CRYPT_DES_MODE_CTR = -1;
const CRYPT_DES_MODE_ECB = 1;
const CRYPT_DES_MODE_CBC = 2;
const CRYPT_DES_MODE_CFB = 3;
const CRYPT_DES_MODE_OFB = 4;
const CRYPT_DES_MODE_INTERNAL = 1;
const CRYPT_DES_MODE_MCRYPT = 2;

//
//The Key Schedule
//
//@see Crypt_DES::setKey()
//@var Array
//@access private
//
//
//
//The Encryption Mode
//
//@see Crypt_DES::Crypt_DES()
//@var Integer
//@access private
//
//
//
//Continuous Buffer status
//
//@see Crypt_DES::enableContinuousBuffer()
//@var Boolean
//@access private
//
//
//
//Padding status
//
//@see Crypt_DES::enablePadding()
//@var Boolean
//@access private
//
//
//
//The Initialization Vector
//
//@see Crypt_DES::setIV()
//@var String
//@access private
//
//
//
//A "sliding" Initialization Vector
//
//@see Crypt_DES::enableContinuousBuffer()
//@var String
//@access private
//
//
//
//A "sliding" Initialization Vector
//
//@see Crypt_DES::enableContinuousBuffer()
//@var String
//@access private
//
//
//
//mcrypt resource for encryption
//
//The mcrypt resource can be recreated every time something needs to be created or it can be created just once.
//Since mcrypt operates in continuous mode, by default, it'll need to be recreated when in non-continuous mode.
//
//@see Crypt_DES::encrypt()
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
//@see Crypt_DES::decrypt()
//@var String
//@access private
//
//
//
//Does the enmcrypt resource need to be (re)initialized?
//
//@see Crypt_DES::setKey()
//@see Crypt_DES::setIV()
//@var Boolean
//@access private
//
//
//
//Does the demcrypt resource need to be (re)initialized?
//
//@see Crypt_DES::setKey()
//@see Crypt_DES::setIV()
//@var Boolean
//@access private
//
//
//
//Is the mode one that is paddable?
//
//@see Crypt_DES::Crypt_DES()
//@var Boolean
//@access private
//
//
//
//Encryption buffer for CTR, OFB and CFB modes
//
//@see Crypt_DES::encrypt()
//@var Array
//@access private
//
//
//
//Decryption buffer for CTR, OFB and CFB modes
//
//@see Crypt_DES::decrypt()
//@var Array
//@access private
//
//
//
//mcrypt resource for CFB mode
//
//@see Crypt_DES::encrypt()
//@see Crypt_DES::decrypt()
//@var String
//@access private
//
//
//
//Performance-optimized callback function for en/decrypt()
//
//@var Callback
//@access private
//
//
//
//Holds whether performance-optimized $inline_crypt should be used or not.
//
//@var Boolean
//@access private
//
//
//
//Shuffle table.
//
//For each byte value index, the entry holds an 8-byte string
//with each byte containing all bits in the same state as the
//corresponding bit in the index value.
//
//@see Crypt_DES::_processBlock()
//@see Crypt_DES::_prepareKey()
//@var Array
//@access private
//
//
//
//IP mapping helper table.
//
//Indexing this table with each source byte performs the initial bit permutation.
//
//@var Array
//@access private
//
//
//
//Inverse IP mapping helper table.
//Indexing this table with a byte value reverses the bit order.
//
//@var Array
//@access private
//
//
//
//Pre-permuted S-box1
//
//Each box ($sbox1-$sbox8) has been vectorized, then each value pre-permuted using the
//P table: concatenation can then be replaced by exclusive ORs.
//
//@var Array
//@access private
//
//
//
//Pre-permuted S-box2
//
//@var Array
//@access private
//
//
//
//Pre-permuted S-box3
//
//@var Array
//@access private
//
//
//
//Pre-permuted S-box4
//
//@var Array
//@access private
//
//
//
//Pre-permuted S-box5
//
//@var Array
//@access private
//
//
//
//Pre-permuted S-box6
//
//@var Array
//@access private
//
//
//
//Pre-permuted S-box7
//
//@var Array
//@access private
//
//
//
//Pre-permuted S-box8
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
//@return Crypt_DES
//@access public
//
//
//
//Sets the key.
//
//Keys can be of any length.  DES, itself, uses 64-bit keys (eg. strlen($key) == 8), however, we
//only use the first eight, if $key has more then eight characters in it, and pad $key with the
//null byte if it is less then eight characters long.
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
//$hash, $salt, $count
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
//Generate CTR XOR encryption key
//
//Encrypt the output of this and XOR it against the ciphertext / plaintext to get the
//plaintext / ciphertext in CTR mode.
//
//@see Crypt_DES::decrypt()
//@see Crypt_DES::encrypt()
//@access public
//@param String $iv
//
//
//
//Encrypts a message.
//
//$plaintext will be padded with up to 8 additional bytes.  Other DES implementations may or may not pad in the
//same manner.  Other common approaches to padding and the reasons why it's necessary are discussed in the following
//URL:
//
//{@link http://www.di-mgt.com.au/cryptopad.html http://www.di-mgt.com.au/cryptopad.html}
//
//An alternative to padding is to, separately, send the length of the file.  This is what SSH, in fact, does.
//strlen($plaintext) will still need to be a multiple of 8, however, arbitrary values can be added to make it that
//length.
//
//@see Crypt_DES::decrypt()
//@access public
//@param String $plaintext
//
//
//
//Decrypts a message.
//
//If strlen($ciphertext) is not a multiple of 8, null bytes will be added to the end of the string until it is.
//
//@see Crypt_DES::encrypt()
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
//@see Crypt_DES::disableContinuousBuffer()
//@access public
//
//
//
//Treat consecutive packets as if they are a discontinuous buffer.
//
//The default behavior.
//
//@see Crypt_DES::enableContinuousBuffer()
//@access public
//
//
//
//Pad "packets".
//
//DES works by encrypting eight bytes at a time.  If you ever need to encrypt or decrypt something that's not
//a multiple of eight, it becomes necessary to pad the input so that it's length is a multiple of eight.
//
//Padding is enabled by default.  Sometimes, however, it is undesirable to pad strings.  Such is the case in SSH1,
//where "packets" are padded with random bytes before being encrypted.  Unpad these packets and you risk stripping
//away characters that shouldn't be stripped away. (SSH knows how many bytes are added because the length is
//transmitted separately)
//
//@see Crypt_DES::disablePadding()
//@access public
//
//
//
//Do not pad packets.
//
//@see Crypt_DES::enablePadding()
//@access public
//
//
//
//Pads a string
//
//Pads a string using the RSA PKCS padding standards so that its length is a multiple of the blocksize (8).
//8 - (strlen($text) & 7) bytes are added, each of which is equal to chr(8 - (strlen($text) & 7)
//
//If padding is disabled and $text is not a multiple of the blocksize, the string will be padded regardless
//and padding will, hence forth, be enabled.
//
//@see Crypt_DES::_unpad()
//@access private
//
//
//
//Unpads a string
//
//If padding is enabled and the reported padding length is invalid the encryption key will be assumed to be wrong
//and false will be returned.
//
//@see Crypt_DES::_pad()
//@access private
//
//
//
//Encrypts or decrypts a 64-bit block
//
//$mode should be either CRYPT_DES_ENCRYPT or CRYPT_DES_DECRYPT.  See
//{@link http://en.wikipedia.org/wiki/Image:Feistel.png Feistel.png} to get a general
//idea of what this function does.
//
//@access private
//@param String $block
//@param Integer $mode
//@return String
//
//
//
//Creates the key schedule.
//
//@access private
//@param String $key
//@return Array
//
//
//
//String Shift
//
//Inspired by array_shift
//
//@param String $string
//@return String
//@access private
//
//
//
//Creates performance-optimized function for de/encrypt(), storing it in $this->inline_crypt
//
//@param optional Integer $des_rounds (1 = DES[default], 3 = TribleDES)
//@access private
//
//
//
//Holds the lambda_functions table (classwide)
//
//@see inline_crypt_setup()
//@return Array
//@access private
//
//
class Crypt_DES {
    constructor() {
        this.keys = "\\0\\0\\0\\0\\0\\0\\0\\0";
        this.continuousBuffer = false;
        this.padding = true;
        this.iv = "\\0\\0\\0\\0\\0\\0\\0\\0";
        this.encryptIV = "\\0\\0\\0\\0\\0\\0\\0\\0";
        this.decryptIV = "\\0\\0\\0\\0\\0\\0\\0\\0";
        this.enchanged = true;
        this.dechanged = true;
        this.paddable = false;
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
        this.use_inline_crypt = false;
        this.shuffle = ["\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00", "\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\xFF", "\\x00\\x00\\x00\\x00\\x00\\x00\\xFF\\x00", "\\x00\\x00\\x00\\x00\\x00\\x00\\xFF\\xFF", "\\x00\\x00\\x00\\x00\\x00\\xFF\\x00\\x00", "\\x00\\x00\\x00\\x00\\x00\\xFF\\x00\\xFF", "\\x00\\x00\\x00\\x00\\x00\\xFF\\xFF\\x00", "\\x00\\x00\\x00\\x00\\x00\\xFF\\xFF\\xFF", "\\x00\\x00\\x00\\x00\\xFF\\x00\\x00\\x00", "\\x00\\x00\\x00\\x00\\xFF\\x00\\x00\\xFF", "\\x00\\x00\\x00\\x00\\xFF\\x00\\xFF\\x00", "\\x00\\x00\\x00\\x00\\xFF\\x00\\xFF\\xFF", "\\x00\\x00\\x00\\x00\\xFF\\xFF\\x00\\x00", "\\x00\\x00\\x00\\x00\\xFF\\xFF\\x00\\xFF", "\\x00\\x00\\x00\\x00\\xFF\\xFF\\xFF\\x00", "\\x00\\x00\\x00\\x00\\xFF\\xFF\\xFF\\xFF", "\\x00\\x00\\x00\\xFF\\x00\\x00\\x00\\x00", "\\x00\\x00\\x00\\xFF\\x00\\x00\\x00\\xFF", "\\x00\\x00\\x00\\xFF\\x00\\x00\\xFF\\x00", "\\x00\\x00\\x00\\xFF\\x00\\x00\\xFF\\xFF", "\\x00\\x00\\x00\\xFF\\x00\\xFF\\x00\\x00", "\\x00\\x00\\x00\\xFF\\x00\\xFF\\x00\\xFF", "\\x00\\x00\\x00\\xFF\\x00\\xFF\\xFF\\x00", "\\x00\\x00\\x00\\xFF\\x00\\xFF\\xFF\\xFF", "\\x00\\x00\\x00\\xFF\\xFF\\x00\\x00\\x00", "\\x00\\x00\\x00\\xFF\\xFF\\x00\\x00\\xFF", "\\x00\\x00\\x00\\xFF\\xFF\\x00\\xFF\\x00", "\\x00\\x00\\x00\\xFF\\xFF\\x00\\xFF\\xFF", "\\x00\\x00\\x00\\xFF\\xFF\\xFF\\x00\\x00", "\\x00\\x00\\x00\\xFF\\xFF\\xFF\\x00\\xFF", "\\x00\\x00\\x00\\xFF\\xFF\\xFF\\xFF\\x00", "\\x00\\x00\\x00\\xFF\\xFF\\xFF\\xFF\\xFF", "\\x00\\x00\\xFF\\x00\\x00\\x00\\x00\\x00", "\\x00\\x00\\xFF\\x00\\x00\\x00\\x00\\xFF", "\\x00\\x00\\xFF\\x00\\x00\\x00\\xFF\\x00", "\\x00\\x00\\xFF\\x00\\x00\\x00\\xFF\\xFF", "\\x00\\x00\\xFF\\x00\\x00\\xFF\\x00\\x00", "\\x00\\x00\\xFF\\x00\\x00\\xFF\\x00\\xFF", "\\x00\\x00\\xFF\\x00\\x00\\xFF\\xFF\\x00", "\\x00\\x00\\xFF\\x00\\x00\\xFF\\xFF\\xFF", "\\x00\\x00\\xFF\\x00\\xFF\\x00\\x00\\x00", "\\x00\\x00\\xFF\\x00\\xFF\\x00\\x00\\xFF", "\\x00\\x00\\xFF\\x00\\xFF\\x00\\xFF\\x00", "\\x00\\x00\\xFF\\x00\\xFF\\x00\\xFF\\xFF", "\\x00\\x00\\xFF\\x00\\xFF\\xFF\\x00\\x00", "\\x00\\x00\\xFF\\x00\\xFF\\xFF\\x00\\xFF", "\\x00\\x00\\xFF\\x00\\xFF\\xFF\\xFF\\x00", "\\x00\\x00\\xFF\\x00\\xFF\\xFF\\xFF\\xFF", "\\x00\\x00\\xFF\\xFF\\x00\\x00\\x00\\x00", "\\x00\\x00\\xFF\\xFF\\x00\\x00\\x00\\xFF", "\\x00\\x00\\xFF\\xFF\\x00\\x00\\xFF\\x00", "\\x00\\x00\\xFF\\xFF\\x00\\x00\\xFF\\xFF", "\\x00\\x00\\xFF\\xFF\\x00\\xFF\\x00\\x00", "\\x00\\x00\\xFF\\xFF\\x00\\xFF\\x00\\xFF", "\\x00\\x00\\xFF\\xFF\\x00\\xFF\\xFF\\x00", "\\x00\\x00\\xFF\\xFF\\x00\\xFF\\xFF\\xFF", "\\x00\\x00\\xFF\\xFF\\xFF\\x00\\x00\\x00", "\\x00\\x00\\xFF\\xFF\\xFF\\x00\\x00\\xFF", "\\x00\\x00\\xFF\\xFF\\xFF\\x00\\xFF\\x00", "\\x00\\x00\\xFF\\xFF\\xFF\\x00\\xFF\\xFF", "\\x00\\x00\\xFF\\xFF\\xFF\\xFF\\x00\\x00", "\\x00\\x00\\xFF\\xFF\\xFF\\xFF\\x00\\xFF", "\\x00\\x00\\xFF\\xFF\\xFF\\xFF\\xFF\\x00", "\\x00\\x00\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF", "\\x00\\xFF\\x00\\x00\\x00\\x00\\x00\\x00", "\\x00\\xFF\\x00\\x00\\x00\\x00\\x00\\xFF", "\\x00\\xFF\\x00\\x00\\x00\\x00\\xFF\\x00", "\\x00\\xFF\\x00\\x00\\x00\\x00\\xFF\\xFF", "\\x00\\xFF\\x00\\x00\\x00\\xFF\\x00\\x00", "\\x00\\xFF\\x00\\x00\\x00\\xFF\\x00\\xFF", "\\x00\\xFF\\x00\\x00\\x00\\xFF\\xFF\\x00", "\\x00\\xFF\\x00\\x00\\x00\\xFF\\xFF\\xFF", "\\x00\\xFF\\x00\\x00\\xFF\\x00\\x00\\x00", "\\x00\\xFF\\x00\\x00\\xFF\\x00\\x00\\xFF", "\\x00\\xFF\\x00\\x00\\xFF\\x00\\xFF\\x00", "\\x00\\xFF\\x00\\x00\\xFF\\x00\\xFF\\xFF", "\\x00\\xFF\\x00\\x00\\xFF\\xFF\\x00\\x00", "\\x00\\xFF\\x00\\x00\\xFF\\xFF\\x00\\xFF", "\\x00\\xFF\\x00\\x00\\xFF\\xFF\\xFF\\x00", "\\x00\\xFF\\x00\\x00\\xFF\\xFF\\xFF\\xFF", "\\x00\\xFF\\x00\\xFF\\x00\\x00\\x00\\x00", "\\x00\\xFF\\x00\\xFF\\x00\\x00\\x00\\xFF", "\\x00\\xFF\\x00\\xFF\\x00\\x00\\xFF\\x00", "\\x00\\xFF\\x00\\xFF\\x00\\x00\\xFF\\xFF", "\\x00\\xFF\\x00\\xFF\\x00\\xFF\\x00\\x00", "\\x00\\xFF\\x00\\xFF\\x00\\xFF\\x00\\xFF", "\\x00\\xFF\\x00\\xFF\\x00\\xFF\\xFF\\x00", "\\x00\\xFF\\x00\\xFF\\x00\\xFF\\xFF\\xFF", "\\x00\\xFF\\x00\\xFF\\xFF\\x00\\x00\\x00", "\\x00\\xFF\\x00\\xFF\\xFF\\x00\\x00\\xFF", "\\x00\\xFF\\x00\\xFF\\xFF\\x00\\xFF\\x00", "\\x00\\xFF\\x00\\xFF\\xFF\\x00\\xFF\\xFF", "\\x00\\xFF\\x00\\xFF\\xFF\\xFF\\x00\\x00", "\\x00\\xFF\\x00\\xFF\\xFF\\xFF\\x00\\xFF", "\\x00\\xFF\\x00\\xFF\\xFF\\xFF\\xFF\\x00", "\\x00\\xFF\\x00\\xFF\\xFF\\xFF\\xFF\\xFF", "\\x00\\xFF\\xFF\\x00\\x00\\x00\\x00\\x00", "\\x00\\xFF\\xFF\\x00\\x00\\x00\\x00\\xFF", "\\x00\\xFF\\xFF\\x00\\x00\\x00\\xFF\\x00", "\\x00\\xFF\\xFF\\x00\\x00\\x00\\xFF\\xFF", "\\x00\\xFF\\xFF\\x00\\x00\\xFF\\x00\\x00", "\\x00\\xFF\\xFF\\x00\\x00\\xFF\\x00\\xFF", "\\x00\\xFF\\xFF\\x00\\x00\\xFF\\xFF\\x00", "\\x00\\xFF\\xFF\\x00\\x00\\xFF\\xFF\\xFF", "\\x00\\xFF\\xFF\\x00\\xFF\\x00\\x00\\x00", "\\x00\\xFF\\xFF\\x00\\xFF\\x00\\x00\\xFF", "\\x00\\xFF\\xFF\\x00\\xFF\\x00\\xFF\\x00", "\\x00\\xFF\\xFF\\x00\\xFF\\x00\\xFF\\xFF", "\\x00\\xFF\\xFF\\x00\\xFF\\xFF\\x00\\x00", "\\x00\\xFF\\xFF\\x00\\xFF\\xFF\\x00\\xFF", "\\x00\\xFF\\xFF\\x00\\xFF\\xFF\\xFF\\x00", "\\x00\\xFF\\xFF\\x00\\xFF\\xFF\\xFF\\xFF", "\\x00\\xFF\\xFF\\xFF\\x00\\x00\\x00\\x00", "\\x00\\xFF\\xFF\\xFF\\x00\\x00\\x00\\xFF", "\\x00\\xFF\\xFF\\xFF\\x00\\x00\\xFF\\x00", "\\x00\\xFF\\xFF\\xFF\\x00\\x00\\xFF\\xFF", "\\x00\\xFF\\xFF\\xFF\\x00\\xFF\\x00\\x00", "\\x00\\xFF\\xFF\\xFF\\x00\\xFF\\x00\\xFF", "\\x00\\xFF\\xFF\\xFF\\x00\\xFF\\xFF\\x00", "\\x00\\xFF\\xFF\\xFF\\x00\\xFF\\xFF\\xFF", "\\x00\\xFF\\xFF\\xFF\\xFF\\x00\\x00\\x00", "\\x00\\xFF\\xFF\\xFF\\xFF\\x00\\x00\\xFF", "\\x00\\xFF\\xFF\\xFF\\xFF\\x00\\xFF\\x00", "\\x00\\xFF\\xFF\\xFF\\xFF\\x00\\xFF\\xFF", "\\x00\\xFF\\xFF\\xFF\\xFF\\xFF\\x00\\x00", "\\x00\\xFF\\xFF\\xFF\\xFF\\xFF\\x00\\xFF", "\\x00\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\x00", "\\x00\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF", "\\xFF\\x00\\x00\\x00\\x00\\x00\\x00\\x00", "\\xFF\\x00\\x00\\x00\\x00\\x00\\x00\\xFF", "\\xFF\\x00\\x00\\x00\\x00\\x00\\xFF\\x00", "\\xFF\\x00\\x00\\x00\\x00\\x00\\xFF\\xFF", "\\xFF\\x00\\x00\\x00\\x00\\xFF\\x00\\x00", "\\xFF\\x00\\x00\\x00\\x00\\xFF\\x00\\xFF", "\\xFF\\x00\\x00\\x00\\x00\\xFF\\xFF\\x00", "\\xFF\\x00\\x00\\x00\\x00\\xFF\\xFF\\xFF", "\\xFF\\x00\\x00\\x00\\xFF\\x00\\x00\\x00", "\\xFF\\x00\\x00\\x00\\xFF\\x00\\x00\\xFF", "\\xFF\\x00\\x00\\x00\\xFF\\x00\\xFF\\x00", "\\xFF\\x00\\x00\\x00\\xFF\\x00\\xFF\\xFF", "\\xFF\\x00\\x00\\x00\\xFF\\xFF\\x00\\x00", "\\xFF\\x00\\x00\\x00\\xFF\\xFF\\x00\\xFF", "\\xFF\\x00\\x00\\x00\\xFF\\xFF\\xFF\\x00", "\\xFF\\x00\\x00\\x00\\xFF\\xFF\\xFF\\xFF", "\\xFF\\x00\\x00\\xFF\\x00\\x00\\x00\\x00", "\\xFF\\x00\\x00\\xFF\\x00\\x00\\x00\\xFF", "\\xFF\\x00\\x00\\xFF\\x00\\x00\\xFF\\x00", "\\xFF\\x00\\x00\\xFF\\x00\\x00\\xFF\\xFF", "\\xFF\\x00\\x00\\xFF\\x00\\xFF\\x00\\x00", "\\xFF\\x00\\x00\\xFF\\x00\\xFF\\x00\\xFF", "\\xFF\\x00\\x00\\xFF\\x00\\xFF\\xFF\\x00", "\\xFF\\x00\\x00\\xFF\\x00\\xFF\\xFF\\xFF", "\\xFF\\x00\\x00\\xFF\\xFF\\x00\\x00\\x00", "\\xFF\\x00\\x00\\xFF\\xFF\\x00\\x00\\xFF", "\\xFF\\x00\\x00\\xFF\\xFF\\x00\\xFF\\x00", "\\xFF\\x00\\x00\\xFF\\xFF\\x00\\xFF\\xFF", "\\xFF\\x00\\x00\\xFF\\xFF\\xFF\\x00\\x00", "\\xFF\\x00\\x00\\xFF\\xFF\\xFF\\x00\\xFF", "\\xFF\\x00\\x00\\xFF\\xFF\\xFF\\xFF\\x00", "\\xFF\\x00\\x00\\xFF\\xFF\\xFF\\xFF\\xFF", "\\xFF\\x00\\xFF\\x00\\x00\\x00\\x00\\x00", "\\xFF\\x00\\xFF\\x00\\x00\\x00\\x00\\xFF", "\\xFF\\x00\\xFF\\x00\\x00\\x00\\xFF\\x00", "\\xFF\\x00\\xFF\\x00\\x00\\x00\\xFF\\xFF", "\\xFF\\x00\\xFF\\x00\\x00\\xFF\\x00\\x00", "\\xFF\\x00\\xFF\\x00\\x00\\xFF\\x00\\xFF", "\\xFF\\x00\\xFF\\x00\\x00\\xFF\\xFF\\x00", "\\xFF\\x00\\xFF\\x00\\x00\\xFF\\xFF\\xFF", "\\xFF\\x00\\xFF\\x00\\xFF\\x00\\x00\\x00", "\\xFF\\x00\\xFF\\x00\\xFF\\x00\\x00\\xFF", "\\xFF\\x00\\xFF\\x00\\xFF\\x00\\xFF\\x00", "\\xFF\\x00\\xFF\\x00\\xFF\\x00\\xFF\\xFF", "\\xFF\\x00\\xFF\\x00\\xFF\\xFF\\x00\\x00", "\\xFF\\x00\\xFF\\x00\\xFF\\xFF\\x00\\xFF", "\\xFF\\x00\\xFF\\x00\\xFF\\xFF\\xFF\\x00", "\\xFF\\x00\\xFF\\x00\\xFF\\xFF\\xFF\\xFF", "\\xFF\\x00\\xFF\\xFF\\x00\\x00\\x00\\x00", "\\xFF\\x00\\xFF\\xFF\\x00\\x00\\x00\\xFF", "\\xFF\\x00\\xFF\\xFF\\x00\\x00\\xFF\\x00", "\\xFF\\x00\\xFF\\xFF\\x00\\x00\\xFF\\xFF", "\\xFF\\x00\\xFF\\xFF\\x00\\xFF\\x00\\x00", "\\xFF\\x00\\xFF\\xFF\\x00\\xFF\\x00\\xFF", "\\xFF\\x00\\xFF\\xFF\\x00\\xFF\\xFF\\x00", "\\xFF\\x00\\xFF\\xFF\\x00\\xFF\\xFF\\xFF", "\\xFF\\x00\\xFF\\xFF\\xFF\\x00\\x00\\x00", "\\xFF\\x00\\xFF\\xFF\\xFF\\x00\\x00\\xFF", "\\xFF\\x00\\xFF\\xFF\\xFF\\x00\\xFF\\x00", "\\xFF\\x00\\xFF\\xFF\\xFF\\x00\\xFF\\xFF", "\\xFF\\x00\\xFF\\xFF\\xFF\\xFF\\x00\\x00", "\\xFF\\x00\\xFF\\xFF\\xFF\\xFF\\x00\\xFF", "\\xFF\\x00\\xFF\\xFF\\xFF\\xFF\\xFF\\x00", "\\xFF\\x00\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF", "\\xFF\\xFF\\x00\\x00\\x00\\x00\\x00\\x00", "\\xFF\\xFF\\x00\\x00\\x00\\x00\\x00\\xFF", "\\xFF\\xFF\\x00\\x00\\x00\\x00\\xFF\\x00", "\\xFF\\xFF\\x00\\x00\\x00\\x00\\xFF\\xFF", "\\xFF\\xFF\\x00\\x00\\x00\\xFF\\x00\\x00", "\\xFF\\xFF\\x00\\x00\\x00\\xFF\\x00\\xFF", "\\xFF\\xFF\\x00\\x00\\x00\\xFF\\xFF\\x00", "\\xFF\\xFF\\x00\\x00\\x00\\xFF\\xFF\\xFF", "\\xFF\\xFF\\x00\\x00\\xFF\\x00\\x00\\x00", "\\xFF\\xFF\\x00\\x00\\xFF\\x00\\x00\\xFF", "\\xFF\\xFF\\x00\\x00\\xFF\\x00\\xFF\\x00", "\\xFF\\xFF\\x00\\x00\\xFF\\x00\\xFF\\xFF", "\\xFF\\xFF\\x00\\x00\\xFF\\xFF\\x00\\x00", "\\xFF\\xFF\\x00\\x00\\xFF\\xFF\\x00\\xFF", "\\xFF\\xFF\\x00\\x00\\xFF\\xFF\\xFF\\x00", "\\xFF\\xFF\\x00\\x00\\xFF\\xFF\\xFF\\xFF", "\\xFF\\xFF\\x00\\xFF\\x00\\x00\\x00\\x00", "\\xFF\\xFF\\x00\\xFF\\x00\\x00\\x00\\xFF", "\\xFF\\xFF\\x00\\xFF\\x00\\x00\\xFF\\x00", "\\xFF\\xFF\\x00\\xFF\\x00\\x00\\xFF\\xFF", "\\xFF\\xFF\\x00\\xFF\\x00\\xFF\\x00\\x00", "\\xFF\\xFF\\x00\\xFF\\x00\\xFF\\x00\\xFF", "\\xFF\\xFF\\x00\\xFF\\x00\\xFF\\xFF\\x00", "\\xFF\\xFF\\x00\\xFF\\x00\\xFF\\xFF\\xFF", "\\xFF\\xFF\\x00\\xFF\\xFF\\x00\\x00\\x00", "\\xFF\\xFF\\x00\\xFF\\xFF\\x00\\x00\\xFF", "\\xFF\\xFF\\x00\\xFF\\xFF\\x00\\xFF\\x00", "\\xFF\\xFF\\x00\\xFF\\xFF\\x00\\xFF\\xFF", "\\xFF\\xFF\\x00\\xFF\\xFF\\xFF\\x00\\x00", "\\xFF\\xFF\\x00\\xFF\\xFF\\xFF\\x00\\xFF", "\\xFF\\xFF\\x00\\xFF\\xFF\\xFF\\xFF\\x00", "\\xFF\\xFF\\x00\\xFF\\xFF\\xFF\\xFF\\xFF", "\\xFF\\xFF\\xFF\\x00\\x00\\x00\\x00\\x00", "\\xFF\\xFF\\xFF\\x00\\x00\\x00\\x00\\xFF", "\\xFF\\xFF\\xFF\\x00\\x00\\x00\\xFF\\x00", "\\xFF\\xFF\\xFF\\x00\\x00\\x00\\xFF\\xFF", "\\xFF\\xFF\\xFF\\x00\\x00\\xFF\\x00\\x00", "\\xFF\\xFF\\xFF\\x00\\x00\\xFF\\x00\\xFF", "\\xFF\\xFF\\xFF\\x00\\x00\\xFF\\xFF\\x00", "\\xFF\\xFF\\xFF\\x00\\x00\\xFF\\xFF\\xFF", "\\xFF\\xFF\\xFF\\x00\\xFF\\x00\\x00\\x00", "\\xFF\\xFF\\xFF\\x00\\xFF\\x00\\x00\\xFF", "\\xFF\\xFF\\xFF\\x00\\xFF\\x00\\xFF\\x00", "\\xFF\\xFF\\xFF\\x00\\xFF\\x00\\xFF\\xFF", "\\xFF\\xFF\\xFF\\x00\\xFF\\xFF\\x00\\x00", "\\xFF\\xFF\\xFF\\x00\\xFF\\xFF\\x00\\xFF", "\\xFF\\xFF\\xFF\\x00\\xFF\\xFF\\xFF\\x00", "\\xFF\\xFF\\xFF\\x00\\xFF\\xFF\\xFF\\xFF", "\\xFF\\xFF\\xFF\\xFF\\x00\\x00\\x00\\x00", "\\xFF\\xFF\\xFF\\xFF\\x00\\x00\\x00\\xFF", "\\xFF\\xFF\\xFF\\xFF\\x00\\x00\\xFF\\x00", "\\xFF\\xFF\\xFF\\xFF\\x00\\x00\\xFF\\xFF", "\\xFF\\xFF\\xFF\\xFF\\x00\\xFF\\x00\\x00", "\\xFF\\xFF\\xFF\\xFF\\x00\\xFF\\x00\\xFF", "\\xFF\\xFF\\xFF\\xFF\\x00\\xFF\\xFF\\x00", "\\xFF\\xFF\\xFF\\xFF\\x00\\xFF\\xFF\\xFF", "\\xFF\\xFF\\xFF\\xFF\\xFF\\x00\\x00\\x00", "\\xFF\\xFF\\xFF\\xFF\\xFF\\x00\\x00\\xFF", "\\xFF\\xFF\\xFF\\xFF\\xFF\\x00\\xFF\\x00", "\\xFF\\xFF\\xFF\\xFF\\xFF\\x00\\xFF\\xFF", "\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\x00\\x00", "\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\x00\\xFF", "\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\x00", "\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF"];
        this.ipmap = [0, 16, 1, 17, 32, 48, 33, 49, 2, 18, 3, 19, 34, 50, 35, 51, 64, 80, 65, 81, 96, 112, 97, 113, 66, 82, 67, 83, 98, 114, 99, 115, 4, 20, 5, 21, 36, 52, 37, 53, 6, 22, 7, 23, 38, 54, 39, 55, 68, 84, 69, 85, 100, 116, 101, 117, 70, 86, 71, 87, 102, 118, 103, 119, 128, 144, 129, 145, 160, 176, 161, 177, 130, 146, 131, 147, 162, 178, 163, 179, 192, 208, 193, 209, 224, 240, 225, 241, 194, 210, 195, 211, 226, 242, 227, 243, 132, 148, 133, 149, 164, 180, 165, 181, 134, 150, 135, 151, 166, 182, 167, 183, 196, 212, 197, 213, 228, 244, 229, 245, 198, 214, 199, 215, 230, 246, 231, 247, 8, 24, 9, 25, 40, 56, 41, 57, 10, 26, 11, 27, 42, 58, 43, 59, 72, 88, 73, 89, 104, 120, 105, 121, 74, 90, 75, 91, 106, 122, 107, 123, 12, 28, 13, 29, 44, 60, 45, 61, 14, 30, 15, 31, 46, 62, 47, 63, 76, 92, 77, 93, 108, 124, 109, 125, 78, 94, 79, 95, 110, 126, 111, 127, 136, 152, 137, 153, 168, 184, 169, 185, 138, 154, 139, 155, 170, 186, 171, 187, 200, 216, 201, 217, 232, 248, 233, 249, 202, 218, 203, 219, 234, 250, 235, 251, 140, 156, 141, 157, 172, 188, 173, 189, 142, 158, 143, 159, 174, 190, 175, 191, 204, 220, 205, 221, 236, 252, 237, 253, 206, 222, 207, 223, 238, 254, 239, 255];
        this.invipmap = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33, 161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 3, 131, 67, 195, 35, 163, 99, 227, 19, 147, 83, 211, 51, 179, 115, 243, 11, 139, 75, 203, 43, 171, 107, 235, 27, 155, 91, 219, 59, 187, 123, 251, 7, 135, 71, 199, 39, 167, 103, 231, 23, 151, 87, 215, 55, 183, 119, 247, 15, 143, 79, 207, 47, 175, 111, 239, 31, 159, 95, 223, 63, 191, 127, 255];
        this.sbox1 = [8421888, 0, 32768, 8421890, 8421378, 33282, 2, 32768, 512, 8421888, 8421890, 512, 8389122, 8421378, 8388608, 2, 514, 8389120, 8389120, 33280, 33280, 8421376, 8421376, 8389122, 32770, 8388610, 8388610, 32770, 0, 514, 33282, 8388608, 32768, 8421890, 2, 8421376, 8421888, 8388608, 8388608, 512, 8421378, 32768, 33280, 8388610, 512, 2, 8389122, 33282, 8421890, 32770, 8421376, 8389122, 8388610, 514, 33282, 8421888, 514, 8389120, 8389120, 0, 32770, 33280, 0, 8421378];
        this.sbox2 = [1074282512, 1073758208, 16384, 540688, 524288, 16, 1074266128, 1073758224, 1073741840, 1074282512, 1074282496, 1073741824, 1073758208, 524288, 16, 1074266128, 540672, 524304, 1073758224, 0, 1073741824, 16384, 540688, 1074266112, 524304, 1073741840, 0, 540672, 16400, 1074282496, 1074266112, 16400, 0, 540688, 1074266128, 524288, 1073758224, 1074266112, 1074282496, 16384, 1074266112, 1073758208, 16, 1074282512, 540688, 16, 16384, 1073741824, 16400, 1074282496, 524288, 1073741840, 524304, 1073758224, 1073741840, 524304, 540672, 0, 1073758208, 16400, 1073741824, 1074266128, 1074282512, 540672];
        this.sbox3 = [260, 67174656, 0, 67174404, 67109120, 0, 65796, 67109120, 65540, 67108868, 67108868, 65536, 67174660, 65540, 67174400, 260, 67108864, 4, 67174656, 256, 65792, 67174400, 67174404, 65796, 67109124, 65792, 65536, 67109124, 4, 67174660, 256, 67108864, 67174656, 67108864, 65540, 260, 65536, 67174656, 67109120, 0, 256, 65540, 67174660, 67109120, 67108868, 256, 0, 67174404, 67109124, 65536, 67108864, 67174660, 4, 65796, 65792, 67108868, 67174400, 67109124, 260, 67174400, 65796, 4, 67174404, 65792];
        this.sbox4 = [2151682048, 2147487808, 2147487808, 64, 4198464, 2151678016, 2151677952, 2147487744, 0, 4198400, 4198400, 2151682112, 2147483712, 0, 4194368, 2151677952, 2147483648, 4096, 4194304, 2151682048, 64, 4194304, 2147487744, 4160, 2151678016, 2147483648, 4160, 4194368, 4096, 4198464, 2151682112, 2147483712, 4194368, 2151677952, 4198400, 2151682112, 2147483712, 0, 0, 4198400, 4160, 4194368, 2151678016, 2147483648, 2151682048, 2147487808, 2147487808, 64, 2151682112, 2147483712, 2147483648, 4096, 2151677952, 2147487744, 4198464, 2151678016, 2147487744, 4160, 4194304, 2151682048, 64, 4194304, 4096, 4198464];
        this.sbox5 = [128, 17039488, 17039360, 553648256, 262144, 128, 536870912, 17039360, 537133184, 262144, 16777344, 537133184, 553648256, 553910272, 262272, 536870912, 16777216, 537133056, 537133056, 0, 536871040, 553910400, 553910400, 16777344, 553910272, 536871040, 0, 553648128, 17039488, 16777216, 553648128, 262272, 262144, 553648256, 128, 16777216, 536870912, 17039360, 553648256, 537133184, 16777344, 536870912, 553910272, 17039488, 537133184, 128, 16777216, 553910272, 553910400, 262272, 553648128, 553910400, 17039360, 0, 537133056, 553648128, 262272, 16777344, 536871040, 262144, 0, 537133056, 17039488, 536871040];
        this.sbox6 = [268435464, 270532608, 8192, 270540808, 270532608, 8, 270540808, 2097152, 268443648, 2105352, 2097152, 268435464, 2097160, 268443648, 268435456, 8200, 0, 2097160, 268443656, 8192, 2105344, 268443656, 8, 270532616, 270532616, 0, 2105352, 270540800, 8200, 2105344, 270540800, 268435456, 268443648, 8, 270532616, 2105344, 270540808, 2097152, 8200, 268435464, 2097152, 268443648, 268435456, 8200, 268435464, 270540808, 2105344, 270532608, 2105352, 270540800, 0, 270532616, 8, 8192, 270532608, 2105352, 8192, 2097160, 268443656, 0, 270540800, 268435456, 2097160, 268443656];
        this.sbox7 = [1048576, 34603009, 33555457, 0, 1024, 33555457, 1049601, 34604032, 34604033, 1048576, 0, 33554433, 1, 33554432, 34603009, 1025, 33555456, 1049601, 1048577, 33555456, 33554433, 34603008, 34604032, 1048577, 34603008, 1024, 1025, 34604033, 1049600, 1, 33554432, 1049600, 33554432, 1049600, 1048576, 33555457, 33555457, 34603009, 34603009, 1, 1048577, 33554432, 33555456, 1048576, 34604032, 1025, 1049601, 34604032, 1025, 33554433, 34604033, 34603008, 1049600, 0, 1, 34604033, 0, 1049601, 34603008, 1024, 33554433, 33555456, 1024, 1048577];
        this.sbox8 = [134219808, 2048, 131072, 134350880, 134217728, 134219808, 32, 134217728, 131104, 134348800, 134350880, 133120, 134350848, 133152, 2048, 32, 134348800, 134217760, 134219776, 2080, 133120, 131104, 134348832, 134350848, 2080, 0, 0, 134348832, 134217760, 134219776, 133152, 131072, 133152, 131072, 134350848, 2048, 32, 134348832, 2048, 133152, 134219776, 32, 134217760, 134348800, 134348832, 134217728, 131072, 134219808, 0, 134350880, 131104, 134217760, 134348800, 134219776, 134219808, 0, 134350880, 133120, 133120, 2080, 2080, 131104, 134217728, 134350848];
    }

    Crypt_DES(mode = CRYPT_DES_MODE_CBC) {
        if (!("undefined" !== typeof CRYPT_DES_MODE)) {
            switch (true) {
                case extension_loaded("mcrypt") && -1 !== mcrypt_list_algorithms().indexOf("des"):
                    global.CRYPT_DES_MODE = CRYPT_DES_MODE_MCRYPT;
                    break;

                default:
                    global.CRYPT_DES_MODE = CRYPT_DES_MODE_INTERNAL;
            }
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
                        this.ecb = mcrypt_module_open(MCRYPT_DES, "", MCRYPT_MODE_ECB, "");
                        break;

                    case CRYPT_DES_MODE_OFB:
                        this.mode = MCRYPT_MODE_NOFB;
                        break;

                    case CRYPT_DES_MODE_CBC:
                    default:
                        this.paddable = true;
                        this.mode = MCRYPT_MODE_CBC;
                }

                this.enmcrypt = mcrypt_module_open(MCRYPT_DES, "", this.mode, "");
                this.demcrypt = mcrypt_module_open(MCRYPT_DES, "", this.mode, "");
                break;

            default:
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
                    this.inline_crypt_setup();
                    this.use_inline_crypt = true;
                }

        }
    }

    setKey(key) {
        this.keys = CRYPT_DES_MODE == CRYPT_DES_MODE_MCRYPT ? str_pad(key.substr(0, 8), 8, String.fromCharCode(0)) : this._prepareKey(key);
        this.enchanged = true;
        this.dechanged = true;
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
                    salt = "phpseclib/salt";
                }

                if (!(undefined !== count)) {
                    count = 1000;
                }

                if (!("function" === typeof Crypt_Hash)) {
                    require("Crypt/Hash.php");
                }

                var i = 1;

                while (key.length < 8) //$dkLen == 8
                //$dk.= $this->_pbkdf($password, $salt, $count, $i++);
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
        this.enchanged = true;
        this.dechanged = true;
    }

    _generate_xor(iv) {
        var xor = iv;

        for (var j = 4; j <= 8; j += 4) {
            var temp = iv.substr(-j, 4);

            switch (temp) {
                case "\\xFF\\xFF\\xFF\\xFF":
                    iv = substr_replace(iv, "\\x00\\x00\\x00\\x00", -j, 4);
                    break;

                case "\\x7F\\xFF\\xFF\\xFF":
                    iv = substr_replace(iv, "\\x80\\x00\\x00\\x00", -j, 4);
                    break;

                default:
                    extract(unpack("Ncount", temp));
                    iv = substr_replace(iv, pack("N", count + 1), -j, 4);
                    break;
            }
        }

        return xor;
    }

    encrypt(plaintext) {
        if (this.paddable) {
            plaintext = this._pad(plaintext);
        }

        if (CRYPT_DES_MODE == CRYPT_DES_MODE_MCRYPT) {
            if (this.enchanged) {
                mcrypt_generic_init(this.enmcrypt, this.keys, this.encryptIV);

                if (this.mode == "ncfb") {
                    mcrypt_generic_init(this.ecb, this.keys, "\\0\\0\\0\\0\\0\\0\\0\\0");
                }

                this.enchanged = false;
            }

            if (this.mode != "ncfb" || !this.continuousBuffer) {
                var ciphertext = mcrypt_generic(this.enmcrypt, plaintext);
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
                    if (this.enbuffer.enmcrypt_init === false || len > 600) {
                        if (this.enbuffer.enmcrypt_init === true) {
                            mcrypt_generic_init(this.enmcrypt, this.keys, iv);
                            this.enbuffer.enmcrypt_init = false;
                        }

                        ciphertext += mcrypt_generic(this.enmcrypt, plaintext.substr(i, len - len % 8));
                        iv = ciphertext.substr(-8);
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
                    var block = iv ^ plaintext.substr(-len);
                    iv = substr_replace(iv, block, 0, len);
                    ciphertext += block;
                    pos = len;
                }

                return ciphertext;
            }

            if (!this.continuousBuffer) {
                mcrypt_generic_init(this.enmcrypt, this.keys, this.encryptIV);
            }

            return ciphertext;
        }

        if (!Array.isArray(this.keys)) {
            this.keys = this._prepareKey("\\0\\0\\0\\0\\0\\0\\0\\0");
        }

        if (this.use_inline_crypt) {
            var inline = this.inline_crypt;
            return inline("encrypt", this, plaintext);
        }

        var buffer = this.enbuffer;
        var continuousBuffer = this.continuousBuffer;
        ciphertext = "";

        switch (this.mode) {
            case CRYPT_DES_MODE_ECB:
                for (i = 0;; i < plaintext.length; i += 8) {
                    ciphertext += this._processBlock(plaintext.substr(i, 8), CRYPT_DES_ENCRYPT);
                }

                break;

            case CRYPT_DES_MODE_CBC:
                var xor = this.encryptIV;

                for (i = 0;; i < plaintext.length; i += 8) {
                    block = plaintext.substr(i, 8);
                    block = this._processBlock(block ^ xor, CRYPT_DES_ENCRYPT);
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
                            buffer.encrypted += this._processBlock(this._generate_xor(xor), CRYPT_DES_ENCRYPT);
                        }

                        var key = this._string_shift(buffer.encrypted);

                        ciphertext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < plaintext.length; i += 8) {
                        block = plaintext.substr(i, 8);
                        key = this._processBlock(this._generate_xor(xor), CRYPT_DES_ENCRYPT);
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
                if (this.continuousBuffer) {
                    iv = this.encryptIV;
                    pos = buffer.pos;
                } else {
                    iv = this.encryptIV;
                    pos = 0;
                }

                len = plaintext.length;
                i = 0;

                if (pos) {
                    orig_pos = pos;
                    max = 8 - pos;

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
                }

                while (len >= 8) {
                    iv = this._processBlock(iv, CRYPT_DES_ENCRYPT) ^ plaintext.substr(i, 8);
                    ciphertext += iv;
                    len -= 8;
                    i += 8;
                }

                if (len) {
                    iv = this._processBlock(iv, CRYPT_DES_ENCRYPT);
                    block = iv ^ plaintext.substr(i);
                    iv = substr_replace(iv, block, 0, len);
                    ciphertext += block;
                    pos = len;
                }

                return ciphertext;

            case CRYPT_DES_MODE_OFB:
                xor = this.encryptIV;

                if (buffer.xor.length) {
                    for (i = 0;; i < plaintext.length; i += 8) {
                        block = plaintext.substr(i, 8);

                        if (block.length > buffer.xor.length) {
                            xor = this._processBlock(xor, CRYPT_DES_ENCRYPT);
                            buffer.xor += xor;
                        }

                        key = this._string_shift(buffer.xor);
                        ciphertext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < plaintext.length; i += 8) {
                        xor = this._processBlock(xor, CRYPT_DES_ENCRYPT);
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
        if (this.paddable) //we pad with chr(0) since that's what mcrypt_generic does.  to quote from http://php.net/function.mcrypt-generic :
            //"The data is padded with "\0" to make sure the length of the data is n * blocksize."
            {
                ciphertext = str_pad(ciphertext, ciphertext.length + 7 & 4294967288, String.fromCharCode(0));
            }

        if (CRYPT_DES_MODE == CRYPT_DES_MODE_MCRYPT) {
            if (this.dechanged) {
                mcrypt_generic_init(this.demcrypt, this.keys, this.decryptIV);

                if (this.mode == "ncfb") {
                    mcrypt_generic_init(this.ecb, this.keys, "\\0\\0\\0\\0\\0\\0\\0\\0");
                }

                this.dechanged = false;
            }

            if (this.mode != "ncfb" || !this.continuousBuffer) {
                var plaintext = mdecrypt_generic(this.demcrypt, ciphertext);
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
                    plaintext += iv ^ ciphertext.substr(-len);
                    iv = substr_replace(iv, ciphertext.substr(-len), 0, len);
                    pos = len;
                }

                return plaintext;
            }

            if (!this.continuousBuffer) {
                mcrypt_generic_init(this.demcrypt, this.keys, this.decryptIV);
            }

            return this.paddable ? this._unpad(plaintext) : plaintext;
        }

        if (!Array.isArray(this.keys)) {
            this.keys = this._prepareKey("\\0\\0\\0\\0\\0\\0\\0\\0");
        }

        if (this.use_inline_crypt) {
            var inline = this.inline_crypt;
            return inline("decrypt", this, ciphertext);
        }

        var buffer = this.debuffer;
        var continuousBuffer = this.continuousBuffer;
        plaintext = "";

        switch (this.mode) {
            case CRYPT_DES_MODE_ECB:
                for (i = 0;; i < ciphertext.length; i += 8) {
                    plaintext += this._processBlock(ciphertext.substr(i, 8), CRYPT_DES_DECRYPT);
                }

                break;

            case CRYPT_DES_MODE_CBC:
                var xor = this.decryptIV;

                for (i = 0;; i < ciphertext.length; i += 8) {
                    var block = ciphertext.substr(i, 8);
                    plaintext += this._processBlock(block, CRYPT_DES_DECRYPT) ^ xor;
                    xor = block;
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
                            buffer.ciphertext += this._processBlock(this._generate_xor(xor), CRYPT_DES_ENCRYPT);
                        }

                        var key = this._string_shift(buffer.ciphertext);

                        plaintext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < ciphertext.length; i += 8) {
                        block = ciphertext.substr(i, 8);
                        key = this._processBlock(this._generate_xor(xor), CRYPT_DES_ENCRYPT);
                        plaintext += block ^ key;
                    }
                }

                if (this.continuousBuffer) {
                    var start;
                    this.decryptIV = xor;

                    if (start = ciphertext.length % 8) {
                        buffer.ciphertext = key.substr(start) + buffer.ciphertext;
                    }
                }

                break;

            case CRYPT_DES_MODE_CFB:
                if (this.continuousBuffer) {
                    iv = this.decryptIV;
                    pos = buffer.pos;
                } else {
                    iv = this.decryptIV;
                    pos = 0;
                }

                len = ciphertext.length;
                i = 0;

                if (pos) {
                    orig_pos = pos;
                    max = 8 - pos;

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

                while (len >= 8) {
                    iv = this._processBlock(iv, CRYPT_DES_ENCRYPT);
                    cb = ciphertext.substr(i, 8);
                    plaintext += iv ^ cb;
                    iv = cb;
                    len -= 8;
                    i += 8;
                }

                if (len) {
                    iv = this._processBlock(iv, CRYPT_DES_ENCRYPT);
                    plaintext += iv ^ ciphertext.substr(i);
                    iv = substr_replace(iv, ciphertext.substr(i), 0, len);
                    pos = len;
                }

                return plaintext;

            case CRYPT_DES_MODE_OFB:
                xor = this.decryptIV;

                if (buffer.xor.length) {
                    for (i = 0;; i < ciphertext.length; i += 8) {
                        block = ciphertext.substr(i, 8);

                        if (block.length > buffer.xor.length) {
                            xor = this._processBlock(xor, CRYPT_DES_ENCRYPT);
                            buffer.xor += xor;
                        }

                        key = this._string_shift(buffer.xor);
                        plaintext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < ciphertext.length; i += 8) {
                        xor = this._processBlock(xor, CRYPT_DES_ENCRYPT);
                        plaintext += ciphertext.substr(i, 8) ^ xor;
                    }

                    key = xor;
                }

                if (this.continuousBuffer) {
                    this.decryptIV = xor;

                    if (start = ciphertext.length % 8) {
                        buffer.xor = key.substr(start) + buffer.xor;
                    }
                }

        }

        return this.paddable ? this._unpad(plaintext) : plaintext;
    }

    enableContinuousBuffer() {
        this.continuousBuffer = true;
    }

    disableContinuousBuffer() {
        this.continuousBuffer = false;
        this.encryptIV = this.iv;
        this.decryptIV = this.iv;
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

        if (CRYPT_DES_MODE == CRYPT_DES_MODE_MCRYPT) {
            mcrypt_generic_init(this.enmcrypt, this.keys, this.iv);
            mcrypt_generic_init(this.demcrypt, this.keys, this.iv);
        }
    }

    enablePadding() {
        this.padding = true;
    }

    disablePadding() {
        this.padding = false;
    }

    _pad(text) {
        var length = text.length;

        if (!this.padding) {
            if ((length & 7) == 0) {
                return text;
            } else {
                user_error(`The plaintext's length (${length}) is not a multiple of the block size (8)`);
                this.padding = true;
            }
        }

        var pad = 8 - (length & 7);
        return str_pad(text, length + pad, String.fromCharCode(pad));
    }

    _unpad(text) {
        if (!this.padding) {
            return text;
        }

        var length = text.charCodeAt(text.length - 1);

        if (!length || length > 8) {
            return false;
        }

        return text.substr(0, -length);
    }

    _processBlock(block, mode) //Do the initial IP permutation.
    //Extract L0 and R0.
    //Perform the 16 steps.
    //Perform the inverse IP permutation.
    {
        var l, r;
        var shuffle = this.shuffle;
        var invipmap = this.invipmap;
        var ipmap = this.ipmap;
        var sbox1 = this.sbox1;
        var sbox2 = this.sbox2;
        var sbox3 = this.sbox3;
        var sbox4 = this.sbox4;
        var sbox5 = this.sbox5;
        var sbox6 = this.sbox6;
        var sbox7 = this.sbox7;
        var sbox8 = this.sbox8;
        var keys = this.keys[mode];
        var t = unpack("Nl/Nr", block);
        [l, r] = [t.l, t.r];
        block = shuffle[ipmap[r & 255]] & "\\x80\\x80\\x80\\x80\\x80\\x80\\x80\\x80" | shuffle[ipmap[r >> 8 & 255]] & "\\x40\\x40\\x40\\x40\\x40\\x40\\x40\\x40" | shuffle[ipmap[r >> 16 & 255]] & "\\x20\\x20\\x20\\x20\\x20\\x20\\x20\\x20" | shuffle[ipmap[r >> 24 & 255]] & "\\x10\\x10\\x10\\x10\\x10\\x10\\x10\\x10" | shuffle[ipmap[l & 255]] & "\\x08\\x08\\x08\\x08\\x08\\x08\\x08\\x08" | shuffle[ipmap[l >> 8 & 255]] & "\\x04\\x04\\x04\\x04\\x04\\x04\\x04\\x04" | shuffle[ipmap[l >> 16 & 255]] & "\\x02\\x02\\x02\\x02\\x02\\x02\\x02\\x02" | shuffle[ipmap[l >> 24 & 255]] & "\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01";
        t = unpack("Nl/Nr", block);
        [l, r] = [t.l, t.r];

        for (var i = 0; i < 16; i++) //start of "the Feistel (F) function" - see the following URL:
        //http://en.wikipedia.org/wiki/Image:Data_Encryption_Standard_InfoBox_Diagram.png
        //Merge key schedule.
        //S-box indexing.
        //end of "the Feistel (F) function"
        {
            var b1 = r >> 3 & 536870911 ^ r << 29 ^ keys[i][0];
            var b2 = r >> 31 & 1 ^ r << 1 ^ keys[i][1];
            t = sbox1[b1 >> 24 & 63] ^ sbox2[b2 >> 24 & 63] ^ sbox3[b1 >> 16 & 63] ^ sbox4[b2 >> 16 & 63] ^ sbox5[b1 >> 8 & 63] ^ sbox6[b2 >> 8 & 63] ^ sbox7[b1 & 63] ^ sbox8[b2 & 63] ^ l;
            l = r;
            r = t;
        }

        return shuffle[invipmap[l >> 24 & 255]] & "\\x80\\x80\\x80\\x80\\x80\\x80\\x80\\x80" | shuffle[invipmap[r >> 24 & 255]] & "\\x40\\x40\\x40\\x40\\x40\\x40\\x40\\x40" | shuffle[invipmap[l >> 16 & 255]] & "\\x20\\x20\\x20\\x20\\x20\\x20\\x20\\x20" | shuffle[invipmap[r >> 16 & 255]] & "\\x10\\x10\\x10\\x10\\x10\\x10\\x10\\x10" | shuffle[invipmap[l >> 8 & 255]] & "\\x08\\x08\\x08\\x08\\x08\\x08\\x08\\x08" | shuffle[invipmap[r >> 8 & 255]] & "\\x04\\x04\\x04\\x04\\x04\\x04\\x04\\x04" | shuffle[invipmap[l & 255]] & "\\x02\\x02\\x02\\x02\\x02\\x02\\x02\\x02" | shuffle[invipmap[r & 255]] & "\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01";
    }

    _prepareKey(key) //Mapping tables for the PC-2 transformation.
    //pad the key and remove extra characters as appropriate.
    //Perform the PC/1 transformation and compute C and D.
    //Generate 1-dim arrays for inline en/decrypting
    {
        var l, r;
        if (!("_static_Crypt_DES__prepareKey_shifts" in global)) _static_Crypt_DES__prepareKey_shifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
        if (!("_static_Crypt_DES__prepareKey_pc1map" in global)) _static_Crypt_DES__prepareKey_pc1map = [0, 0, 8, 8, 4, 4, 12, 12, 2, 2, 10, 10, 6, 6, 14, 14, 16, 16, 24, 24, 20, 20, 28, 28, 18, 18, 26, 26, 22, 22, 30, 30, 32, 32, 40, 40, 36, 36, 44, 44, 34, 34, 42, 42, 38, 38, 46, 46, 48, 48, 56, 56, 52, 52, 60, 60, 50, 50, 58, 58, 54, 54, 62, 62, 64, 64, 72, 72, 68, 68, 76, 76, 66, 66, 74, 74, 70, 70, 78, 78, 80, 80, 88, 88, 84, 84, 92, 92, 82, 82, 90, 90, 86, 86, 94, 94, 96, 96, 104, 104, 100, 100, 108, 108, 98, 98, 106, 106, 102, 102, 110, 110, 112, 112, 120, 120, 116, 116, 124, 124, 114, 114, 122, 122, 118, 118, 126, 126, 128, 128, 136, 136, 132, 132, 140, 140, 130, 130, 138, 138, 134, 134, 142, 142, 144, 144, 152, 152, 148, 148, 156, 156, 146, 146, 154, 154, 150, 150, 158, 158, 160, 160, 168, 168, 164, 164, 172, 172, 162, 162, 170, 170, 166, 166, 174, 174, 176, 176, 184, 184, 180, 180, 188, 188, 178, 178, 186, 186, 182, 182, 190, 190, 192, 192, 200, 200, 196, 196, 204, 204, 194, 194, 202, 202, 198, 198, 206, 206, 208, 208, 216, 216, 212, 212, 220, 220, 210, 210, 218, 218, 214, 214, 222, 222, 224, 224, 232, 232, 228, 228, 236, 236, 226, 226, 234, 234, 230, 230, 238, 238, 240, 240, 248, 248, 244, 244, 252, 252, 242, 242, 250, 250, 246, 246, 254, 254];
        if (!("_static_Crypt_DES__prepareKey_pc2mapc1" in global)) _static_Crypt_DES__prepareKey_pc2mapc1 = [0, 1024, 2097152, 2098176, 1, 1025, 2097153, 2098177, 33554432, 33555456, 35651584, 35652608, 33554433, 33555457, 35651585, 35652609];
        if (!("_static_Crypt_DES__prepareKey_pc2mapc2" in global)) _static_Crypt_DES__prepareKey_pc2mapc2 = [0, 2048, 134217728, 134219776, 65536, 67584, 134283264, 134285312, 0, 2048, 134217728, 134219776, 65536, 67584, 134283264, 134285312, 256, 2304, 134217984, 134220032, 65792, 67840, 134283520, 134285568, 256, 2304, 134217984, 134220032, 65792, 67840, 134283520, 134285568, 16, 2064, 134217744, 134219792, 65552, 67600, 134283280, 134285328, 16, 2064, 134217744, 134219792, 65552, 67600, 134283280, 134285328, 272, 2320, 134218000, 134220048, 65808, 67856, 134283536, 134285584, 272, 2320, 134218000, 134220048, 65808, 67856, 134283536, 134285584, 262144, 264192, 134479872, 134481920, 327680, 329728, 134545408, 134547456, 262144, 264192, 134479872, 134481920, 327680, 329728, 134545408, 134547456, 262400, 264448, 134480128, 134482176, 327936, 329984, 134545664, 134547712, 262400, 264448, 134480128, 134482176, 327936, 329984, 134545664, 134547712, 262160, 264208, 134479888, 134481936, 327696, 329744, 134545424, 134547472, 262160, 264208, 134479888, 134481936, 327696, 329744, 134545424, 134547472, 262416, 264464, 134480144, 134482192, 327952, 330000, 134545680, 134547728, 262416, 264464, 134480144, 134482192, 327952, 330000, 134545680, 134547728, 16777216, 16779264, 150994944, 150996992, 16842752, 16844800, 151060480, 151062528, 16777216, 16779264, 150994944, 150996992, 16842752, 16844800, 151060480, 151062528, 16777472, 16779520, 150995200, 150997248, 16843008, 16845056, 151060736, 151062784, 16777472, 16779520, 150995200, 150997248, 16843008, 16845056, 151060736, 151062784, 16777232, 16779280, 150994960, 150997008, 16842768, 16844816, 151060496, 151062544, 16777232, 16779280, 150994960, 150997008, 16842768, 16844816, 151060496, 151062544, 16777488, 16779536, 150995216, 150997264, 16843024, 16845072, 151060752, 151062800, 16777488, 16779536, 150995216, 150997264, 16843024, 16845072, 151060752, 151062800, 17039360, 17041408, 151257088, 151259136, 17104896, 17106944, 151322624, 151324672, 17039360, 17041408, 151257088, 151259136, 17104896, 17106944, 151322624, 151324672, 17039616, 17041664, 151257344, 151259392, 17105152, 17107200, 151322880, 151324928, 17039616, 17041664, 151257344, 151259392, 17105152, 17107200, 151322880, 151324928, 17039376, 17041424, 151257104, 151259152, 17104912, 17106960, 151322640, 151324688, 17039376, 17041424, 151257104, 151259152, 17104912, 17106960, 151322640, 151324688, 17039632, 17041680, 151257360, 151259408, 17105168, 17107216, 151322896, 151324944, 17039632, 17041680, 151257360, 151259408, 17105168, 17107216, 151322896, 151324944];
        if (!("_static_Crypt_DES__prepareKey_pc2mapc3" in global)) _static_Crypt_DES__prepareKey_pc2mapc3 = [0, 4, 4096, 4100, 0, 4, 4096, 4100, 268435456, 268435460, 268439552, 268439556, 268435456, 268435460, 268439552, 268439556, 32, 36, 4128, 4132, 32, 36, 4128, 4132, 268435488, 268435492, 268439584, 268439588, 268435488, 268435492, 268439584, 268439588, 524288, 524292, 528384, 528388, 524288, 524292, 528384, 528388, 268959744, 268959748, 268963840, 268963844, 268959744, 268959748, 268963840, 268963844, 524320, 524324, 528416, 528420, 524320, 524324, 528416, 528420, 268959776, 268959780, 268963872, 268963876, 268959776, 268959780, 268963872, 268963876, 536870912, 536870916, 536875008, 536875012, 536870912, 536870916, 536875008, 536875012, 805306368, 805306372, 805310464, 805310468, 805306368, 805306372, 805310464, 805310468, 536870944, 536870948, 536875040, 536875044, 536870944, 536870948, 536875040, 536875044, 805306400, 805306404, 805310496, 805310500, 805306400, 805306404, 805310496, 805310500, 537395200, 537395204, 537399296, 537399300, 537395200, 537395204, 537399296, 537399300, 805830656, 805830660, 805834752, 805834756, 805830656, 805830660, 805834752, 805834756, 537395232, 537395236, 537399328, 537399332, 537395232, 537395236, 537399328, 537399332, 805830688, 805830692, 805834784, 805834788, 805830688, 805830692, 805834784, 805834788, 2, 6, 4098, 4102, 2, 6, 4098, 4102, 268435458, 268435462, 268439554, 268439558, 268435458, 268435462, 268439554, 268439558, 34, 38, 4130, 4134, 34, 38, 4130, 4134, 268435490, 268435494, 268439586, 268439590, 268435490, 268435494, 268439586, 268439590, 524290, 524294, 528386, 528390, 524290, 524294, 528386, 528390, 268959746, 268959750, 268963842, 268963846, 268959746, 268959750, 268963842, 268963846, 524322, 524326, 528418, 528422, 524322, 524326, 528418, 528422, 268959778, 268959782, 268963874, 268963878, 268959778, 268959782, 268963874, 268963878, 536870914, 536870918, 536875010, 536875014, 536870914, 536870918, 536875010, 536875014, 805306370, 805306374, 805310466, 805310470, 805306370, 805306374, 805310466, 805310470, 536870946, 536870950, 536875042, 536875046, 536870946, 536870950, 536875042, 536875046, 805306402, 805306406, 805310498, 805310502, 805306402, 805306406, 805310498, 805310502, 537395202, 537395206, 537399298, 537399302, 537395202, 537395206, 537399298, 537399302, 805830658, 805830662, 805834754, 805834758, 805830658, 805830662, 805834754, 805834758, 537395234, 537395238, 537399330, 537399334, 537395234, 537395238, 537399330, 537399334, 805830690, 805830694, 805834786, 805834790, 805830690, 805830694, 805834786, 805834790];
        if (!("_static_Crypt_DES__prepareKey_pc2mapc4" in global)) _static_Crypt_DES__prepareKey_pc2mapc4 = [0, 1048576, 8, 1048584, 512, 1049088, 520, 1049096, 0, 1048576, 8, 1048584, 512, 1049088, 520, 1049096, 67108864, 68157440, 67108872, 68157448, 67109376, 68157952, 67109384, 68157960, 67108864, 68157440, 67108872, 68157448, 67109376, 68157952, 67109384, 68157960, 8192, 1056768, 8200, 1056776, 8704, 1057280, 8712, 1057288, 8192, 1056768, 8200, 1056776, 8704, 1057280, 8712, 1057288, 67117056, 68165632, 67117064, 68165640, 67117568, 68166144, 67117576, 68166152, 67117056, 68165632, 67117064, 68165640, 67117568, 68166144, 67117576, 68166152, 0, 1048576, 8, 1048584, 512, 1049088, 520, 1049096, 0, 1048576, 8, 1048584, 512, 1049088, 520, 1049096, 67108864, 68157440, 67108872, 68157448, 67109376, 68157952, 67109384, 68157960, 67108864, 68157440, 67108872, 68157448, 67109376, 68157952, 67109384, 68157960, 8192, 1056768, 8200, 1056776, 8704, 1057280, 8712, 1057288, 8192, 1056768, 8200, 1056776, 8704, 1057280, 8712, 1057288, 67117056, 68165632, 67117064, 68165640, 67117568, 68166144, 67117576, 68166152, 67117056, 68165632, 67117064, 68165640, 67117568, 68166144, 67117576, 68166152, 131072, 1179648, 131080, 1179656, 131584, 1180160, 131592, 1180168, 131072, 1179648, 131080, 1179656, 131584, 1180160, 131592, 1180168, 67239936, 68288512, 67239944, 68288520, 67240448, 68289024, 67240456, 68289032, 67239936, 68288512, 67239944, 68288520, 67240448, 68289024, 67240456, 68289032, 139264, 1187840, 139272, 1187848, 139776, 1188352, 139784, 1188360, 139264, 1187840, 139272, 1187848, 139776, 1188352, 139784, 1188360, 67248128, 68296704, 67248136, 68296712, 67248640, 68297216, 67248648, 68297224, 67248128, 68296704, 67248136, 68296712, 67248640, 68297216, 67248648, 68297224, 131072, 1179648, 131080, 1179656, 131584, 1180160, 131592, 1180168, 131072, 1179648, 131080, 1179656, 131584, 1180160, 131592, 1180168, 67239936, 68288512, 67239944, 68288520, 67240448, 68289024, 67240456, 68289032, 67239936, 68288512, 67239944, 68288520, 67240448, 68289024, 67240456, 68289032, 139264, 1187840, 139272, 1187848, 139776, 1188352, 139784, 1188360, 139264, 1187840, 139272, 1187848, 139776, 1188352, 139784, 1188360, 67248128, 68296704, 67248136, 68296712, 67248640, 68297216, 67248648, 68297224, 67248128, 68296704, 67248136, 68296712, 67248640, 68297216, 67248648, 68297224];
        if (!("_static_Crypt_DES__prepareKey_pc2mapd1" in global)) _static_Crypt_DES__prepareKey_pc2mapd1 = [0, 1, 134217728, 134217729, 2097152, 2097153, 136314880, 136314881, 2, 3, 134217730, 134217731, 2097154, 2097155, 136314882, 136314883];
        if (!("_static_Crypt_DES__prepareKey_pc2mapd2" in global)) _static_Crypt_DES__prepareKey_pc2mapd2 = [0, 1048576, 2048, 1050624, 0, 1048576, 2048, 1050624, 67108864, 68157440, 67110912, 68159488, 67108864, 68157440, 67110912, 68159488, 4, 1048580, 2052, 1050628, 4, 1048580, 2052, 1050628, 67108868, 68157444, 67110916, 68159492, 67108868, 68157444, 67110916, 68159492, 0, 1048576, 2048, 1050624, 0, 1048576, 2048, 1050624, 67108864, 68157440, 67110912, 68159488, 67108864, 68157440, 67110912, 68159488, 4, 1048580, 2052, 1050628, 4, 1048580, 2052, 1050628, 67108868, 68157444, 67110916, 68159492, 67108868, 68157444, 67110916, 68159492, 512, 1049088, 2560, 1051136, 512, 1049088, 2560, 1051136, 67109376, 68157952, 67111424, 68160000, 67109376, 68157952, 67111424, 68160000, 516, 1049092, 2564, 1051140, 516, 1049092, 2564, 1051140, 67109380, 68157956, 67111428, 68160004, 67109380, 68157956, 67111428, 68160004, 512, 1049088, 2560, 1051136, 512, 1049088, 2560, 1051136, 67109376, 68157952, 67111424, 68160000, 67109376, 68157952, 67111424, 68160000, 516, 1049092, 2564, 1051140, 516, 1049092, 2564, 1051140, 67109380, 68157956, 67111428, 68160004, 67109380, 68157956, 67111428, 68160004, 131072, 1179648, 133120, 1181696, 131072, 1179648, 133120, 1181696, 67239936, 68288512, 67241984, 68290560, 67239936, 68288512, 67241984, 68290560, 131076, 1179652, 133124, 1181700, 131076, 1179652, 133124, 1181700, 67239940, 68288516, 67241988, 68290564, 67239940, 68288516, 67241988, 68290564, 131072, 1179648, 133120, 1181696, 131072, 1179648, 133120, 1181696, 67239936, 68288512, 67241984, 68290560, 67239936, 68288512, 67241984, 68290560, 131076, 1179652, 133124, 1181700, 131076, 1179652, 133124, 1181700, 67239940, 68288516, 67241988, 68290564, 67239940, 68288516, 67241988, 68290564, 131584, 1180160, 133632, 1182208, 131584, 1180160, 133632, 1182208, 67240448, 68289024, 67242496, 68291072, 67240448, 68289024, 67242496, 68291072, 131588, 1180164, 133636, 1182212, 131588, 1180164, 133636, 1182212, 67240452, 68289028, 67242500, 68291076, 67240452, 68289028, 67242500, 68291076, 131584, 1180160, 133632, 1182208, 131584, 1180160, 133632, 1182208, 67240448, 68289024, 67242496, 68291072, 67240448, 68289024, 67242496, 68291072, 131588, 1180164, 133636, 1182212, 131588, 1180164, 133636, 1182212, 67240452, 68289028, 67242500, 68291076, 67240452, 68289028, 67242500, 68291076];
        if (!("_static_Crypt_DES__prepareKey_pc2mapd3" in global)) _static_Crypt_DES__prepareKey_pc2mapd3 = [0, 65536, 33554432, 33619968, 32, 65568, 33554464, 33620000, 262144, 327680, 33816576, 33882112, 262176, 327712, 33816608, 33882144, 8192, 73728, 33562624, 33628160, 8224, 73760, 33562656, 33628192, 270336, 335872, 33824768, 33890304, 270368, 335904, 33824800, 33890336, 0, 65536, 33554432, 33619968, 32, 65568, 33554464, 33620000, 262144, 327680, 33816576, 33882112, 262176, 327712, 33816608, 33882144, 8192, 73728, 33562624, 33628160, 8224, 73760, 33562656, 33628192, 270336, 335872, 33824768, 33890304, 270368, 335904, 33824800, 33890336, 16, 65552, 33554448, 33619984, 48, 65584, 33554480, 33620016, 262160, 327696, 33816592, 33882128, 262192, 327728, 33816624, 33882160, 8208, 73744, 33562640, 33628176, 8240, 73776, 33562672, 33628208, 270352, 335888, 33824784, 33890320, 270384, 335920, 33824816, 33890352, 16, 65552, 33554448, 33619984, 48, 65584, 33554480, 33620016, 262160, 327696, 33816592, 33882128, 262192, 327728, 33816624, 33882160, 8208, 73744, 33562640, 33628176, 8240, 73776, 33562672, 33628208, 270352, 335888, 33824784, 33890320, 270384, 335920, 33824816, 33890352, 536870912, 536936448, 570425344, 570490880, 536870944, 536936480, 570425376, 570490912, 537133056, 537198592, 570687488, 570753024, 537133088, 537198624, 570687520, 570753056, 536879104, 536944640, 570433536, 570499072, 536879136, 536944672, 570433568, 570499104, 537141248, 537206784, 570695680, 570761216, 537141280, 537206816, 570695712, 570761248, 536870912, 536936448, 570425344, 570490880, 536870944, 536936480, 570425376, 570490912, 537133056, 537198592, 570687488, 570753024, 537133088, 537198624, 570687520, 570753056, 536879104, 536944640, 570433536, 570499072, 536879136, 536944672, 570433568, 570499104, 537141248, 537206784, 570695680, 570761216, 537141280, 537206816, 570695712, 570761248, 536870928, 536936464, 570425360, 570490896, 536870960, 536936496, 570425392, 570490928, 537133072, 537198608, 570687504, 570753040, 537133104, 537198640, 570687536, 570753072, 536879120, 536944656, 570433552, 570499088, 536879152, 536944688, 570433584, 570499120, 537141264, 537206800, 570695696, 570761232, 537141296, 537206832, 570695728, 570761264, 536870928, 536936464, 570425360, 570490896, 536870960, 536936496, 570425392, 570490928, 537133072, 537198608, 570687504, 570753040, 537133104, 537198640, 570687536, 570753072, 536879120, 536944656, 570433552, 570499088, 536879152, 536944688, 570433584, 570499120, 537141264, 537206800, 570695696, 570761232, 537141296, 537206832, 570695728, 570761264];
        if (!("_static_Crypt_DES__prepareKey_pc2mapd4" in global)) _static_Crypt_DES__prepareKey_pc2mapd4 = [0, 1024, 16777216, 16778240, 0, 1024, 16777216, 16778240, 256, 1280, 16777472, 16778496, 256, 1280, 16777472, 16778496, 268435456, 268436480, 285212672, 285213696, 268435456, 268436480, 285212672, 285213696, 268435712, 268436736, 285212928, 285213952, 268435712, 268436736, 285212928, 285213952, 524288, 525312, 17301504, 17302528, 524288, 525312, 17301504, 17302528, 524544, 525568, 17301760, 17302784, 524544, 525568, 17301760, 17302784, 268959744, 268960768, 285736960, 285737984, 268959744, 268960768, 285736960, 285737984, 268960000, 268961024, 285737216, 285738240, 268960000, 268961024, 285737216, 285738240, 8, 1032, 16777224, 16778248, 8, 1032, 16777224, 16778248, 264, 1288, 16777480, 16778504, 264, 1288, 16777480, 16778504, 268435464, 268436488, 285212680, 285213704, 268435464, 268436488, 285212680, 285213704, 268435720, 268436744, 285212936, 285213960, 268435720, 268436744, 285212936, 285213960, 524296, 525320, 17301512, 17302536, 524296, 525320, 17301512, 17302536, 524552, 525576, 17301768, 17302792, 524552, 525576, 17301768, 17302792, 268959752, 268960776, 285736968, 285737992, 268959752, 268960776, 285736968, 285737992, 268960008, 268961032, 285737224, 285738248, 268960008, 268961032, 285737224, 285738248, 4096, 5120, 16781312, 16782336, 4096, 5120, 16781312, 16782336, 4352, 5376, 16781568, 16782592, 4352, 5376, 16781568, 16782592, 268439552, 268440576, 285216768, 285217792, 268439552, 268440576, 285216768, 285217792, 268439808, 268440832, 285217024, 285218048, 268439808, 268440832, 285217024, 285218048, 528384, 529408, 17305600, 17306624, 528384, 529408, 17305600, 17306624, 528640, 529664, 17305856, 17306880, 528640, 529664, 17305856, 17306880, 268963840, 268964864, 285741056, 285742080, 268963840, 268964864, 285741056, 285742080, 268964096, 268965120, 285741312, 285742336, 268964096, 268965120, 285741312, 285742336, 4104, 5128, 16781320, 16782344, 4104, 5128, 16781320, 16782344, 4360, 5384, 16781576, 16782600, 4360, 5384, 16781576, 16782600, 268439560, 268440584, 285216776, 285217800, 268439560, 268440584, 285216776, 285217800, 268439816, 268440840, 285217032, 285218056, 268439816, 268440840, 285217032, 285218056, 528392, 529416, 17305608, 17306632, 528392, 529416, 17305608, 17306632, 528648, 529672, 17305864, 17306888, 528648, 529672, 17305864, 17306888, 268963848, 268964872, 285741064, 285742088, 268963848, 268964872, 285741064, 285742088, 268964104, 268965128, 285741320, 285742344, 268964104, 268965128, 285741320, 285742344];
        key = str_pad(key.substr(0, 8), 8, String.fromCharCode(0));
        var t = unpack("Nl/Nr", key);
        [l, r] = [t.l, t.r];
        key = this.shuffle[_static_Crypt_DES__prepareKey_pc1map[r & 255]] & "\\x80\\x80\\x80\\x80\\x80\\x80\\x80\\x00" | this.shuffle[_static_Crypt_DES__prepareKey_pc1map[r >> 8 & 255]] & "\\x40\\x40\\x40\\x40\\x40\\x40\\x40\\x00" | this.shuffle[_static_Crypt_DES__prepareKey_pc1map[r >> 16 & 255]] & "\\x20\\x20\\x20\\x20\\x20\\x20\\x20\\x00" | this.shuffle[_static_Crypt_DES__prepareKey_pc1map[r >> 24 & 255]] & "\\x10\\x10\\x10\\x10\\x10\\x10\\x10\\x00" | this.shuffle[_static_Crypt_DES__prepareKey_pc1map[l & 255]] & "\\x08\\x08\\x08\\x08\\x08\\x08\\x08\\x00" | this.shuffle[_static_Crypt_DES__prepareKey_pc1map[l >> 8 & 255]] & "\\x04\\x04\\x04\\x04\\x04\\x04\\x04\\x00" | this.shuffle[_static_Crypt_DES__prepareKey_pc1map[l >> 16 & 255]] & "\\x02\\x02\\x02\\x02\\x02\\x02\\x02\\x00" | this.shuffle[_static_Crypt_DES__prepareKey_pc1map[l >> 24 & 255]] & "\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x00";
        key = unpack("Nc/Nd", key);
        var c = key.c >> 4 & 268435455;
        var d = key.d >> 4 & 268435440 | key.c & 15;
        var keys = Array();

        for (var i = 0; i < 16; i++) //Perform the PC-2 transformation.
        //Reorder: odd bytes/even bytes. Push the result in key schedule.
        {
            c <<= _static_Crypt_DES__prepareKey_shifts[i];
            c = (c | c >> 28) & 268435455;
            d <<= _static_Crypt_DES__prepareKey_shifts[i];
            d = (d | d >> 28) & 268435455;
            var cp = _static_Crypt_DES__prepareKey_pc2mapc1[c >> 24] | _static_Crypt_DES__prepareKey_pc2mapc2[c >> 16 & 255] | _static_Crypt_DES__prepareKey_pc2mapc3[c >> 8 & 255] | _static_Crypt_DES__prepareKey_pc2mapc4[c & 255];
            var dp = _static_Crypt_DES__prepareKey_pc2mapd1[d >> 24] | _static_Crypt_DES__prepareKey_pc2mapd2[d >> 16 & 255] | _static_Crypt_DES__prepareKey_pc2mapd3[d >> 8 & 255] | _static_Crypt_DES__prepareKey_pc2mapd4[d & 255];
            keys.push([cp & 4278190080 | cp << 8 & 16711680 | dp >> 16 & 65280 | dp >> 8 & 255, cp << 8 & 4278190080 | cp << 16 & 16711680 | dp >> 8 & 65280 | dp & 255]);
        }

        keys = {
            [CRYPT_DES_ENCRYPT]: keys,
            [CRYPT_DES_DECRYPT]: keys.reverse(),
            [CRYPT_DES_ENCRYPT_1DIM]: Array(),
            [CRYPT_DES_DECRYPT_1DIM]: Array()
        };

        for (i = 0;; i < 16; ++i) {
            keys[CRYPT_DES_ENCRYPT_1DIM].push(keys[CRYPT_DES_ENCRYPT][i][0]);
            keys[CRYPT_DES_ENCRYPT_1DIM].push(keys[CRYPT_DES_ENCRYPT][i][1]);
            keys[CRYPT_DES_DECRYPT_1DIM].push(keys[CRYPT_DES_DECRYPT][i][0]);
            keys[CRYPT_DES_DECRYPT_1DIM].push(keys[CRYPT_DES_DECRYPT][i][1]);
        }

        return keys;
    }

    _string_shift(string) {
        var substr = substr(string, 0, 8);
        string = substr(string, 8);
        return substr;
    }

    inline_crypt_setup(des_rounds = 1) {
        var lambda_functions = Crypt_DES.get_lambda_functions();
        var block_size = 8;
        var mode = this.mode;
        var code_hash = `${mode},${des_rounds}`;

        if (!(undefined !== lambda_functions[code_hash])) //Generating encrypt code:
            //Do the initial IP permutation.
            //Perform the inverse IP permutation.
            //Generating mode of operation code:
            {
                var ki = -1;
                var init_cryptBlock = "\r\n                $shuffle  = $self->shuffle;\r\n                $invipmap = $self->invipmap;\r\n                $ipmap = $self->ipmap;\r\n                $sbox1 = $self->sbox1;\r\n                $sbox2 = $self->sbox2;\r\n                $sbox3 = $self->sbox3;\r\n                $sbox4 = $self->sbox4;\r\n                $sbox5 = $self->sbox5;\r\n                $sbox6 = $self->sbox6;\r\n                $sbox7 = $self->sbox7;\r\n                $sbox8 = $self->sbox8;\r\n            ";

                var _cryptBlock = "$in = unpack(\"N*\", $in);" + "\n";

                _cryptBlock += "\r\n                $l  = $in[1];\r\n                $r  = $in[2];\r\n                $in = unpack(\"N*\",\r\n                    ($shuffle[$ipmap[ $r        & 0xFF]] & \"\\x80\\x80\\x80\\x80\\x80\\x80\\x80\\x80\") |\r\n                    ($shuffle[$ipmap[($r >>  8) & 0xFF]] & \"\\x40\\x40\\x40\\x40\\x40\\x40\\x40\\x40\") |\r\n                    ($shuffle[$ipmap[($r >> 16) & 0xFF]] & \"\\x20\\x20\\x20\\x20\\x20\\x20\\x20\\x20\") |\r\n                    ($shuffle[$ipmap[($r >> 24) & 0xFF]] & \"\\x10\\x10\\x10\\x10\\x10\\x10\\x10\\x10\") |\r\n                    ($shuffle[$ipmap[ $l        & 0xFF]] & \"\\x08\\x08\\x08\\x08\\x08\\x08\\x08\\x08\") |\r\n                    ($shuffle[$ipmap[($l >>  8) & 0xFF]] & \"\\x04\\x04\\x04\\x04\\x04\\x04\\x04\\x04\") |\r\n                    ($shuffle[$ipmap[($l >> 16) & 0xFF]] & \"\\x02\\x02\\x02\\x02\\x02\\x02\\x02\\x02\") |\r\n                    ($shuffle[$ipmap[($l >> 24) & 0xFF]] & \"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01\")\r\n                );\r\n\r\n                " + "" + "\r\n                $l = $in[1];\r\n                $r = $in[2];\r\n            ";
                var l = "l";
                var r = "r";

                for (var des_round = 0; des_round < des_rounds; ++des_round) //Perform the 16 steps.
                //start of "the Feistel (F) function" - see the following URL:
                //http://en.wikipedia.org/wiki/Image:Data_Encryption_Standard_InfoBox_Diagram.png
                //Merge key schedule.
                //Last step should not permute L & R.
                {
                    for (var i = 0; i < 8; ++i) {
                        _cryptBlock += "\r\n                        $b1 = (($" + r + " >>  3) & 0x1FFFFFFF)  ^ ($" + r + " << 29) ^ $k_" + ++ki + ";\r\n                        $b2 = (($" + r + " >> 31) & 0x00000001)  ^ ($" + r + " <<  1) ^ $k_" + ++ki + ";\r\n                        $" + l + "  = $sbox1[($b1 >> 24) & 0x3F] ^ $sbox2[($b2 >> 24) & 0x3F] ^\r\n                              $sbox3[($b1 >> 16) & 0x3F] ^ $sbox4[($b2 >> 16) & 0x3F] ^\r\n                              $sbox5[($b1 >>  8) & 0x3F] ^ $sbox6[($b2 >>  8) & 0x3F] ^\r\n                              $sbox7[ $b1        & 0x3F] ^ $sbox8[ $b2        & 0x3F] ^ $" + l + ";\r\n\r\n                        $b1 = (($" + l + " >>  3) & 0x1FFFFFFF)  ^ ($" + l + " << 29) ^ $k_" + ++ki + ";\r\n                        $b2 = (($" + l + " >> 31) & 0x00000001)  ^ ($" + l + " <<  1) ^ $k_" + ++ki + ";\r\n                        $" + r + "  = $sbox1[($b1 >> 24) & 0x3F] ^ $sbox2[($b2 >> 24) & 0x3F] ^\r\n                              $sbox3[($b1 >> 16) & 0x3F] ^ $sbox4[($b2 >> 16) & 0x3F] ^\r\n                              $sbox5[($b1 >>  8) & 0x3F] ^ $sbox6[($b2 >>  8) & 0x3F] ^\r\n                              $sbox7[ $b1        & 0x3F] ^ $sbox8[ $b2        & 0x3F] ^ $" + r + ";\r\n                    ";
                    }

                    var t = l;
                    l = r;
                    r = t;
                }

                _cryptBlock += "$in = (\r\n                    ($shuffle[$invipmap[($" + r + " >> 24) & 0xFF]] & \"\\x80\\x80\\x80\\x80\\x80\\x80\\x80\\x80\") |\r\n                    ($shuffle[$invipmap[($" + l + " >> 24) & 0xFF]] & \"\\x40\\x40\\x40\\x40\\x40\\x40\\x40\\x40\") |\r\n                    ($shuffle[$invipmap[($" + r + " >> 16) & 0xFF]] & \"\\x20\\x20\\x20\\x20\\x20\\x20\\x20\\x20\") |\r\n                    ($shuffle[$invipmap[($" + l + " >> 16) & 0xFF]] & \"\\x10\\x10\\x10\\x10\\x10\\x10\\x10\\x10\") |\r\n                    ($shuffle[$invipmap[($" + r + " >>  8) & 0xFF]] & \"\\x08\\x08\\x08\\x08\\x08\\x08\\x08\\x08\") |\r\n                    ($shuffle[$invipmap[($" + l + " >>  8) & 0xFF]] & \"\\x04\\x04\\x04\\x04\\x04\\x04\\x04\\x04\") |\r\n                    ($shuffle[$invipmap[ $" + r + "        & 0xFF]] & \"\\x02\\x02\\x02\\x02\\x02\\x02\\x02\\x02\") |\r\n                    ($shuffle[$invipmap[ $" + l + "        & 0xFF]] & \"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01\")\r\n                );\r\n            ";

                switch (mode) {
                    case CRYPT_DES_MODE_ECB:
                        var encrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_ENCRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $ciphertext = \"\";\r\n                        $plaintext_len = strlen($text);\r\n\r\n                        for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ");\r\n                            " + _cryptBlock + "\r\n                            $ciphertext.= $in;\r\n                        }\r\n                       \r\n                        return $ciphertext;\r\n                        ";
                        var decrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_DECRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $plaintext = \"\";\r\n                        $ciphertext_len = strlen($text);\r\n\r\n                        for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ");\r\n                            " + _cryptBlock + "\r\n                            $plaintext.= $in;\r\n                        }\r\n\r\n                        return $self->_unpad($plaintext);\r\n                        ";
                        break;

                    case CRYPT_DES_MODE_CBC:
                        encrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_ENCRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $ciphertext = \"\";\r\n                        $plaintext_len = strlen($text);\r\n\r\n                        $in = $self->encryptIV;\r\n\r\n                        for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ") ^ $in;\r\n                            " + _cryptBlock + "\r\n                            $ciphertext.= $in;\r\n                        }\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $in;\r\n                        }\r\n\r\n                        return $ciphertext;\r\n                        ";
                        decrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_DECRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $plaintext = \"\";\r\n                        $ciphertext_len = strlen($text);\r\n\r\n                        $iv = $self->decryptIV;\r\n\r\n                        for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                            $in = $block = substr($text, $i, " + block_size + ");\r\n                            " + _cryptBlock + "\r\n                            $plaintext.= $in ^ $iv;\r\n                            $iv = $block;\r\n                        }\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $iv;\r\n                        }\r\n\r\n                        return $self->_unpad($plaintext);\r\n                        ";
                        break;

                    case CRYPT_DES_MODE_CTR:
                        encrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_ENCRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $ciphertext = \"\";\r\n                        $plaintext_len = strlen($text);\r\n                        $xor = $self->encryptIV;\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if (strlen($buffer[\"encrypted\"])) {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"encrypted\"])) {\r\n                                    $in = $self->_generate_xor($xor);\r\n                                    " + _cryptBlock + "\r\n                                    $buffer[\"encrypted\"].= $in;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"encrypted\"]);\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                $in = $self->_generate_xor($xor);\r\n                                " + _cryptBlock + "\r\n                                $key = $in;\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $xor;\r\n                            if ($start = $plaintext_len % " + block_size + ") {\r\n                                $buffer[\"encrypted\"] = substr($key, $start) . $buffer[\"encrypted\"];\r\n                            }\r\n                        }\r\n\r\n                        return $ciphertext;\r\n                    ";
                        decrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_ENCRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $plaintext = \"\";\r\n                        $ciphertext_len = strlen($text);\r\n                        $xor = $self->decryptIV;\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if (strlen($buffer[\"ciphertext\"])) {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"ciphertext\"])) {\r\n                                    $in = $self->_generate_xor($xor);\r\n                                    " + _cryptBlock + "\r\n                                    $buffer[\"ciphertext\"].= $in;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"ciphertext\"]);\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                $in = $self->_generate_xor($xor);\r\n                                " + _cryptBlock + "\r\n                                $key = $in;\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $xor;\r\n                            if ($start = $ciphertext_len % " + block_size + ") {\r\n                                $buffer[\"ciphertext\"] = substr($key, $start) . $buffer[\"ciphertext\"];\r\n                            }\r\n                        }\r\n                       \r\n                        return $plaintext;\r\n                        ";
                        break;

                    case CRYPT_DES_MODE_CFB:
                        encrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_ENCRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $ciphertext = \"\";\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $iv = &$self->encryptIV;\r\n                            $pos = &$buffer[\"pos\"];\r\n                        } else {\r\n                            $iv = $self->encryptIV;\r\n                            $pos = 0;\r\n                        }\r\n                        $len = strlen($text);\r\n                        $i = 0;\r\n                        if ($pos) {\r\n                            $orig_pos = $pos;\r\n                            $max = " + block_size + " - $pos;\r\n                            if ($len >= $max) {\r\n                                $i = $max;\r\n                                $len-= $max;\r\n                                $pos = 0;\r\n                            } else {\r\n                                $i = $len;\r\n                                $pos+= $len;\r\n                                $len = 0;\r\n                            }\r\n                            $ciphertext = substr($iv, $orig_pos) ^ $text;\r\n                            $iv = substr_replace($iv, $ciphertext, $orig_pos, $i);\r\n                        }\r\n                        while ($len >= " + block_size + ") {\r\n                            $in = $iv;\r\n                            " + _cryptBlock + ";\r\n                            $iv = $in ^ substr($text, $i, " + block_size + ");\r\n                            $ciphertext.= $iv;\r\n                            $len-= " + block_size + ";\r\n                            $i+= " + block_size + ";\r\n                        }\r\n                        if ($len) {\r\n                            $in = $iv;\r\n                            " + _cryptBlock + "\r\n                            $iv = $in;\r\n                            $block = $iv ^ substr($text, $i);\r\n                            $iv = substr_replace($iv, $block, 0, $len);\r\n                            $ciphertext.= $block;\r\n                            $pos = $len;\r\n                        }\r\n                        return $ciphertext;\r\n                    ";
                        decrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_ENCRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $plaintext = \"\";\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $iv = &$self->decryptIV;\r\n                            $pos = &$buffer[\"pos\"];\r\n                        } else {\r\n                            $iv = $self->decryptIV;\r\n                            $pos = 0;\r\n                        }\r\n                        $len = strlen($text);\r\n                        $i = 0;\r\n                        if ($pos) {\r\n                            $orig_pos = $pos;\r\n                            $max = " + block_size + " - $pos;\r\n                            if ($len >= $max) {\r\n                                $i = $max;\r\n                                $len-= $max;\r\n                                $pos = 0;\r\n                            } else {\r\n                                $i = $len;\r\n                                $pos+= $len;\r\n                                $len = 0;\r\n                            }\r\n                            $plaintext = substr($iv, $orig_pos) ^ $text;\r\n                            $iv = substr_replace($iv, substr($text, 0, $i), $orig_pos, $i);\r\n                        }\r\n                        while ($len >= " + block_size + ") {\r\n                            $in = $iv;\r\n                            " + _cryptBlock + "\r\n                            $iv = $in;\r\n                            $cb = substr($text, $i, " + block_size + ");\r\n                            $plaintext.= $iv ^ $cb;\r\n                            $iv = $cb;\r\n                            $len-= " + block_size + ";\r\n                            $i+= " + block_size + ";\r\n                        }\r\n                        if ($len) {\r\n                            $in = $iv;\r\n                            " + _cryptBlock + "\r\n                            $iv = $in;\r\n                            $plaintext.= $iv ^ substr($text, $i);\r\n                            $iv = substr_replace($iv, substr($text, $i), 0, $len);\r\n                            $pos = $len;\r\n                        }\r\n\r\n                        return $plaintext;\r\n                        ";
                        break;

                    case CRYPT_DES_MODE_OFB:
                        encrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_ENCRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $ciphertext = \"\";\r\n                        $plaintext_len = strlen($text);\r\n                        $xor = $self->encryptIV;\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if (strlen($buffer[\"xor\"])) {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"xor\"])) {\r\n                                    $in = $xor;\r\n                                    " + _cryptBlock + "\r\n                                    $xor = $in;\r\n                                    $buffer[\"xor\"].= $xor;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"xor\"]);\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $in = $xor;\r\n                                " + _cryptBlock + "\r\n                                $xor = $in;\r\n                                $ciphertext.= substr($text, $i, " + block_size + ") ^ $xor;\r\n                            }\r\n                            $key = $xor;\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $xor;\r\n                            if ($start = $plaintext_len % " + block_size + ") {\r\n                                 $buffer[\"xor\"] = substr($key, $start) . $buffer[\"xor\"];\r\n                            }\r\n                        }\r\n                        return $ciphertext;\r\n                        ";
                        decrypt = init_cryptBlock + "\r\n                        extract($self->keys[CRYPT_DES_ENCRYPT_1DIM],  EXTR_PREFIX_ALL, \"k\");\r\n                        $plaintext = \"\";\r\n                        $ciphertext_len = strlen($text);\r\n                        $xor = $self->decryptIV;\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if (strlen($buffer[\"xor\"])) {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"xor\"])) {\r\n                                    $in = $xor;\r\n                                    " + _cryptBlock + "\r\n                                    $xor = $in;\r\n                                    $buffer[\"xor\"].= $xor;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"xor\"]);\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $in = $xor;\r\n                                " + _cryptBlock + "\r\n                                $xor = $in;\r\n                                $plaintext.= substr($text, $i, " + block_size + ") ^ $xor;\r\n                            }\r\n                            $key = $xor;\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $xor;\r\n                            if ($start = $ciphertext_len % " + block_size + ") {\r\n                                 $buffer[\"xor\"] = substr($key, $start) . $buffer[\"xor\"];\r\n                            }\r\n                        }\r\n                        return $plaintext;\r\n                        ";
                        break;
                }

                new Function("$action, &$self, $text", "if ($action == \"encrypt\") { " + encrypt + " } else { " + decrypt + " }");
            }

        this.inline_crypt = lambda_functions[code_hash];
    }

    get_lambda_functions() {
        if (!("_static_Crypt_DES_get_lambda_functions_functions" in global)) _static_Crypt_DES_get_lambda_functions_functions = Array();
        return _static_Crypt_DES_get_lambda_functions_functions;
    }

};
