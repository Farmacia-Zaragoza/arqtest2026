//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementation of Rijndael.
//
//Does not use mcrypt, even when available, for reasons that are explained below.
//
//PHP versions 4 and 5
//
//If {@link Crypt_Rijndael::setBlockLength() setBlockLength()} isn't called, it'll be assumed to be 128 bits.  If
//{@link Crypt_Rijndael::setKeyLength() setKeyLength()} isn't called, it'll be calculated from
//{@link Crypt_Rijndael::setKey() setKey()}.  ie. if the key is 128-bits, the key length will be 128-bits.  If it's
//136-bits it'll be null-padded to 160-bits and 160 bits will be the key length until
//{@link Crypt_Rijndael::setKey() setKey()} is called, again, at which point, it'll be recalculated.
//
//Not all Rijndael implementations may support 160-bits or 224-bits as the block length / key length.  mcrypt, for example,
//does not.  AES, itself, only supports block lengths of 128 and key lengths of 128, 192, and 256.
//{@link http://csrc.nist.gov/archive/aes/rijndael/Rijndael-ammended.pdf#page=10 Rijndael-ammended.pdf#page=10} defines the
//algorithm for block lengths of 192 and 256 but not for block lengths / key lengths of 160 and 224.  Indeed, 160 and 224
//are first defined as valid key / block lengths in
//{@link http://csrc.nist.gov/archive/aes/rijndael/Rijndael-ammended.pdf#page=44 Rijndael-ammended.pdf#page=44}:
//Extensions: Other block and Cipher Key lengths.
//
//{@internal The variable names are the same as those in
//{@link http://www.csrc.nist.gov/publications/fips/fips197/fips-197.pdf#page=10 fips-197.pdf#page=10}.}}
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Crypt/Rijndael.php');
//
//$rijndael = new Crypt_Rijndael();
//
//$rijndael->setKey('abcdefghijklmnop');
//
//$size = 10 * 1024;
//$plaintext = '';
//for ($i = 0; $i < $size; $i++) {
//$plaintext.= 'a';
//}
//
//echo $rijndael->decrypt($rijndael->encrypt($plaintext));
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
//@package    Crypt_Rijndael
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMVIII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//#@+
// @access public
// @see Crypt_Rijndael::encrypt()
// @see Crypt_Rijndael::decrypt()
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
// @see Crypt_Rijndael::Crypt_Rijndael()
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
//Pure-PHP implementation of Rijndael.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.1.0
//@access  public
//@package Crypt_Rijndael
//
//
//vim: ts=4:sw=4:et:
//vim6: fdl=1:
const CRYPT_RIJNDAEL_MODE_CTR = -1;
const CRYPT_RIJNDAEL_MODE_ECB = 1;
const CRYPT_RIJNDAEL_MODE_CBC = 2;
const CRYPT_RIJNDAEL_MODE_CFB = 3;
const CRYPT_RIJNDAEL_MODE_OFB = 4;
const CRYPT_RIJNDAEL_MODE_INTERNAL = 1;
const CRYPT_RIJNDAEL_MODE_MCRYPT = 2;

//
//The Encryption Mode
//
//@see Crypt_Rijndael::Crypt_Rijndael()
//@var Integer
//@access private
//
//
//
//The Key
//
//@see Crypt_Rijndael::setKey()
//@var String
//@access private
//
//
//
//The Initialization Vector
//
//@see Crypt_Rijndael::setIV()
//@var String
//@access private
//
//
//
//A "sliding" Initialization Vector
//
//@see Crypt_Rijndael::enableContinuousBuffer()
//@var String
//@access private
//
//
//
//A "sliding" Initialization Vector
//
//@see Crypt_Rijndael::enableContinuousBuffer()
//@var String
//@access private
//
//
//
//Continuous Buffer status
//
//@see Crypt_Rijndael::enableContinuousBuffer()
//@var Boolean
//@access private
//
//
//
//Padding status
//
//@see Crypt_Rijndael::enablePadding()
//@var Boolean
//@access private
//
//
//
//Does the key schedule need to be (re)calculated?
//
//@see setKey()
//@see setBlockLength()
//@see setKeyLength()
//@var Boolean
//@access private
//
//
//
//Has the key length explicitly been set or should it be derived from the key, itself?
//
//@see setKeyLength()
//@var Boolean
//@access private
//
//
//
//The Key Schedule
//
//@see _setup()
//@var Array
//@access private
//
//
//
//The Inverse Key Schedule
//
//@see _setup()
//@var Array
//@access private
//
//
//
//The Block Length
//
//@see setBlockLength()
//@var Integer
//@access private
//@internal The max value is 32, the min value is 16.  All valid values are multiples of 4.  Exists in conjunction with
//$Nb because we need this value and not $Nb to pad strings appropriately.
//
//
//
//The Block Length divided by 32
//
//@see setBlockLength()
//@var Integer
//@access private
//@internal The max value is 256 / 32 = 8, the min value is 128 / 32 = 4.  Exists in conjunction with $block_size
//because the encryption / decryption / key schedule creation requires this number and not $block_size.  We could
//derive this from $block_size or vice versa, but that'd mean we'd have to do multiple shift operations, so in lieu
//of that, we'll just precompute it once.
//
//
//
//
//The Key Length
//
//@see setKeyLength()
//@var Integer
//@access private
//@internal The max value is 256 / 8 = 32, the min value is 128 / 8 = 16.  Exists in conjunction with $key_size
//because the encryption / decryption / key schedule creation requires this number and not $key_size.  We could
//derive this from $key_size or vice versa, but that'd mean we'd have to do multiple shift operations, so in lieu
//of that, we'll just precompute it once.
//
//
//
//The Key Length divided by 32
//
//@see setKeyLength()
//@var Integer
//@access private
//@internal The max value is 256 / 32 = 8, the min value is 128 / 32 = 4
//
//
//
//The Number of Rounds
//
//@var Integer
//@access private
//@internal The max value is 14, the min value is 10.
//
//
//
//Shift offsets
//
//@var Array
//@access private
//
//
//
//Precomputed mixColumns table
//
//@see Crypt_Rijndael()
//@var Array
//@access private
//
//
//
//Precomputed mixColumns table
//
//@see Crypt_Rijndael()
//@var Array
//@access private
//
//
//
//Precomputed mixColumns table
//
//@see Crypt_Rijndael()
//@var Array
//@access private
//
//
//
//Precomputed mixColumns table
//
//@see Crypt_Rijndael()
//@var Array
//@access private
//
//
//
//Precomputed invMixColumns table
//
//@see Crypt_Rijndael()
//@var Array
//@access private
//
//
//
//Precomputed invMixColumns table
//
//@see Crypt_Rijndael()
//@var Array
//@access private
//
//
//
//Precomputed invMixColumns table
//
//@see Crypt_Rijndael()
//@var Array
//@access private
//
//
//
//Precomputed invMixColumns table
//
//@see Crypt_Rijndael()
//@var Array
//@access private
//
//
//
//The SubByte S-Box
//
//@see Crypt_Rijndael::_encryptBlock()
//@var Array
//@access private
//
//
//
//The inverse SubByte S-Box
//
//@see Crypt_Rijndael::_decryptBlock()
//@var Array
//@access private
//
//
//
//Performance-optimized callback function for en/decrypt()
//
//@see Crypt_Rijndael::encrypt()
//@see Crypt_Rijndael::decrypt()
//@see Crypt_Rijndael::inline_crypt_setup()
//@see Crypt_Rijndael::$use_inline_crypt
//@var Callback
//@access private
//
//
//
//Holds whether performance-optimized $inline_crypt should be used or not.
//
//@see Crypt_Rijndael::Crypt_Rijndael()
//@see Crypt_Rijndael::inline_crypt_setup()
//@see Crypt_Rijndael::$inline_crypt
//@var Boolean
//@access private
//
//
//
//Is the mode one that is paddable?
//
//@see Crypt_Rijndael::Crypt_Rijndael()
//@var Boolean
//@access private
//
//
//
//Encryption buffer for CTR, OFB and CFB modes
//
//@see Crypt_Rijndael::encrypt()
//@var String
//@access private
//
//
//
//Decryption buffer for CTR, OFB and CFB modes
//
//@see Crypt_Rijndael::decrypt()
//@var String
//@access private
//
//
//
//Default Constructor.
//
//Determines whether or not the mcrypt extension should be used.  $mode should only, at present, be
//CRYPT_RIJNDAEL_MODE_ECB or CRYPT_RIJNDAEL_MODE_CBC.  If not explictly set, CRYPT_RIJNDAEL_MODE_CBC will be used.
//
//@param optional Integer $mode
//@return Crypt_Rijndael
//@access public
//
//
//
//Sets the key.
//
//Keys can be of any length.  Rijndael, itself, requires the use of a key that's between 128-bits and 256-bits long and
//whose length is a multiple of 32.  If the key is less than 256-bits and the key length isn't set, we round the length
//up to the closest valid key length, padding $key with null bytes.  If the key is more than 256-bits, we trim the
//excess bits.
//
//If the key is not explicitly set, it'll be assumed to be all null bytes.
//
//@access public
//@param String $key
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
//Sets the key length
//
//Valid key lengths are 128, 160, 192, 224, and 256.  If the length is less than 128, it will be rounded up to
//128.  If the length is greater than 128 and invalid, it will be rounded down to the closest valid amount.
//
//@access public
//@param Integer $length
//
//
//
//Sets the password.
//
//Depending on what $method is set to, setPassword()'s (optional) parameters are as follows:
//{@link http://en.wikipedia.org/wiki/PBKDF2 pbkdf2}:
//$hash, $salt, $method
//Set $dkLen by calling setKeyLength()
//
//@param String $password
//@param optional String $method
//@access public
//
//
//
//Sets the block length
//
//Valid block lengths are 128, 160, 192, 224, and 256.  If the length is less than 128, it will be rounded up to
//128.  If the length is greater than 128 and invalid, it will be rounded down to the closest valid amount.
//
//@access public
//@param Integer $length
//
//
//
//Generate CTR XOR encryption key
//
//Encrypt the output of this and XOR it against the ciphertext / plaintext to get the
//plaintext / ciphertext in CTR mode.
//
//@see Crypt_Rijndael::decrypt()
//@see Crypt_Rijndael::encrypt()
//@access public
//@param Integer $length
//@param String $iv
//
//
//
//Encrypts a message.
//
//$plaintext will be padded with additional bytes such that it's length is a multiple of the block size.  Other Rjindael
//implementations may or may not pad in the same manner.  Other common approaches to padding and the reasons why it's
//necessary are discussed in the following
//URL:
//
//{@link http://www.di-mgt.com.au/cryptopad.html http://www.di-mgt.com.au/cryptopad.html}
//
//An alternative to padding is to, separately, send the length of the file.  This is what SSH, in fact, does.
//strlen($plaintext) will still need to be a multiple of 8, however, arbitrary values can be added to make it that
//length.
//
//@see Crypt_Rijndael::decrypt()
//@access public
//@param String $plaintext
//
//
//
//Decrypts a message.
//
//If strlen($ciphertext) is not a multiple of the block size, null bytes will be added to the end of the string until
//it is.
//
//@see Crypt_Rijndael::encrypt()
//@access public
//@param String $ciphertext
//
//
//
//Encrypts a block
//
//@access private
//@param String $in
//@return String
//
//
//
//Decrypts a block
//
//@access private
//@param String $in
//@return String
//
//
//
//Setup Rijndael
//
//Validates all the variables and calculates $Nr - the number of rounds that need to be performed - and $w - the key
//key schedule.
//
//@access private
//
//
//
//Performs S-Box substitutions
//
//@access private
//
//
//
//Performs inverse S-Box substitutions
//
//@access private
//
//
//
//Pad "packets".
//
//Rijndael works by encrypting between sixteen and thirty-two bytes at a time, provided that number is also a multiple
//of four.  If you ever need to encrypt or decrypt something that isn't of the proper length, it becomes necessary to
//pad the input so that it is of the proper length.
//
//Padding is enabled by default.  Sometimes, however, it is undesirable to pad strings.  Such is the case in SSH,
//where "packets" are padded with random bytes before being encrypted.  Unpad these packets and you risk stripping
//away characters that shouldn't be stripped away. (SSH knows how many bytes are added because the length is
//transmitted separately)
//
//@see Crypt_Rijndael::disablePadding()
//@access public
//
//
//
//Do not pad packets.
//
//@see Crypt_Rijndael::enablePadding()
//@access public
//
//
//
//Pads a string
//
//Pads a string using the RSA PKCS padding standards so that its length is a multiple of the blocksize.
//$block_size - (strlen($text) % $block_size) bytes are added, each of which is equal to
//chr($block_size - (strlen($text) % $block_size)
//
//If padding is disabled and $text is not a multiple of the blocksize, the string will be padded regardless
//and padding will, hence forth, be enabled.
//
//@see Crypt_Rijndael::_unpad()
//@access private
//
//
//
//Unpads a string.
//
//If padding is enabled and the reported padding length is invalid the encryption key will be assumed to be wrong
//and false will be returned.
//
//@see Crypt_Rijndael::_pad()
//@access private
//
//
//
//Treat consecutive "packets" as if they are a continuous buffer.
//
//Say you have a 32-byte plaintext $plaintext.  Using the default behavior, the two following code snippets
//will yield different outputs:
//
//<code>
//echo $rijndael->encrypt(substr($plaintext,  0, 16));
//echo $rijndael->encrypt(substr($plaintext, 16, 16));
//</code>
//<code>
//echo $rijndael->encrypt($plaintext);
//</code>
//
//The solution is to enable the continuous buffer.  Although this will resolve the above discrepancy, it creates
//another, as demonstrated with the following:
//
//<code>
//$rijndael->encrypt(substr($plaintext, 0, 16));
//echo $rijndael->decrypt($des->encrypt(substr($plaintext, 16, 16)));
//</code>
//<code>
//echo $rijndael->decrypt($des->encrypt(substr($plaintext, 16, 16)));
//</code>
//
//With the continuous buffer disabled, these would yield the same output.  With it enabled, they yield different
//outputs.  The reason is due to the fact that the initialization vector's change after every encryption /
//decryption round when the continuous buffer is enabled.  When it's disabled, they remain constant.
//
//Put another way, when the continuous buffer is enabled, the state of the Crypt_Rijndael() object changes after each
//encryption / decryption round, whereas otherwise, it'd remain constant.  For this reason, it's recommended that
//continuous buffers not be used.  They do offer better security and are, in fact, sometimes required (SSH uses them),
//however, they are also less intuitive and more likely to cause you problems.
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
//Creates performance-optimized function for de/encrypt(), storing it in $this->inline_crypt
//
//@see Crypt_Rijndael::encrypt()
//@see Crypt_Rijndael::decrypt()
//@access private
//
//
//
//Holds the lambda_functions table (classwide)
//
//@see Crypt_Rijndael::inline_crypt_setup()
//@return Array
//@access private
//
//
class Crypt_Rijndael {
    constructor() {
        this.key = "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0";
        this.iv = "";
        this.encryptIV = "";
        this.decryptIV = "";
        this.continuousBuffer = false;
        this.padding = true;
        this.changed = true;
        this.explicit_key_length = false;
        this.block_size = 16;
        this.Nb = 4;
        this.key_size = 16;
        this.Nk = 4;
        this.use_inline_crypt = true;
        this.paddable = false;
        this.enbuffer = {
            encrypted: "",
            xor: "",
            pos: 0
        };
        this.debuffer = {
            ciphertext: "",
            xor: "",
            pos: 0
        };
    }

    Crypt_Rijndael(mode = CRYPT_RIJNDAEL_MODE_CBC) //according to <http://csrc.nist.gov/archive/aes/rijndael/Rijndael-ammended.pdf#page=19> (section 5.2.1),
    //precomputed tables can be used in the mixColumns phase.  in that example, they're assigned t0...t3, so
    //those are the names we'll use.
    //sbox for the S-Box substitution
    //sbox for the inverse S-Box substitution
    {
        switch (mode) {
            case CRYPT_RIJNDAEL_MODE_ECB:
            case CRYPT_RIJNDAEL_MODE_CBC:
                this.paddable = true;
                this.mode = mode;
                break;

            case CRYPT_RIJNDAEL_MODE_CTR:
            case CRYPT_RIJNDAEL_MODE_CFB:
            case CRYPT_RIJNDAEL_MODE_OFB:
                this.mode = mode;
                break;

            default:
                this.paddable = true;
                this.mode = CRYPT_RIJNDAEL_MODE_CBC;
        }

        var t3 = this.t3;
        var t2 = this.t2;
        var t1 = this.t1;
        var t0 = this.t0;
        var dt3 = this.dt3;
        var dt2 = this.dt2;
        var dt1 = this.dt1;
        var dt0 = this.dt0;
        t3 = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436];
        dt3 = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998000, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480];

        for (var i = 0; i < 256; i++) {
            t2.push(t3[i] << 8 & 4294967040 | t3[i] >> 24 & 255);
            t1.push(t3[i] << 16 & 4294901760 | t3[i] >> 16 & 65535);
            t0.push(t3[i] << 24 & 4278190080 | t3[i] >> 8 & 16777215);
            dt2.push(dt3[i] << 8 & 4294967040 | dt3[i] >> 24 & 255);
            dt1.push(dt3[i] << 16 & 4294901760 | dt3[i] >> 16 & 65535);
            dt0.push(dt3[i] << 24 & 4278190080 | dt3[i] >> 8 & 16777215);
        }

        this.sbox = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
        this.isbox = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125];

        if (!("function" === typeof create_function) || !is_callable("create_function")) {
            this.use_inline_crypt = false;
        }
    }

    setKey(key) {
        this.key = key;
        this.changed = true;
    }

    setIV(iv) {
        this.encryptIV = this.decryptIV = this.iv = str_pad(iv.substr(0, this.block_size), this.block_size, String.fromCharCode(0));
    }

    setKeyLength(length) {
        length >>= 5;

        if (length > 8) {
            length = 8;
        } else if (length < 4) {
            length = 4;
        }

        this.Nk = length;
        this.key_size = length << 2;
        this.explicit_key_length = true;
        this.changed = true;
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

                while (key.length < this.key_size) //$dkLen == $this->key_size
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

        this.setKey(key.substr(0, this.key_size));
    }

    setBlockLength(length) {
        length >>= 5;

        if (length > 8) {
            length = 8;
        } else if (length < 4) {
            length = 4;
        }

        this.Nb = length;
        this.block_size = length << 2;
        this.changed = true;
    }

    _generate_xor(length, iv) {
        var xor = "";
        var block_size = this.block_size;
        var num_blocks = Math.floor((length + (block_size - 1)) / block_size);

        for (var i = 0; i < num_blocks; i++) {
            xor += iv;

            for (var j = 4; j <= block_size; j += 4) {
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
        }

        return xor;
    }

    encrypt(plaintext) {
        if (this.changed) {
            this._setup();
        }

        if (this.use_inline_crypt) {
            var inline = this.inline_crypt;
            return inline("encrypt", this, plaintext);
        }

        if (this.paddable) {
            plaintext = this._pad(plaintext);
        }

        var block_size = this.block_size;
        var buffer = this.enbuffer;
        var ciphertext = "";

        switch (this.mode) {
            case CRYPT_RIJNDAEL_MODE_ECB:
                for (var i = 0; i < plaintext.length; i += block_size) {
                    ciphertext += this._encryptBlock(plaintext.substr(i, block_size));
                }

                break;

            case CRYPT_RIJNDAEL_MODE_CBC:
                var xor = this.encryptIV;

                for (i = 0;; i < plaintext.length; i += block_size) {
                    var block = plaintext.substr(i, block_size);
                    block = this._encryptBlock(block ^ xor);
                    xor = block;
                    ciphertext += block;
                }

                if (this.continuousBuffer) {
                    this.encryptIV = xor;
                }

                break;

            case CRYPT_RIJNDAEL_MODE_CTR:
                xor = this.encryptIV;

                if (buffer.encrypted.length) {
                    for (i = 0;; i < plaintext.length; i += block_size) {
                        block = plaintext.substr(i, block_size);

                        if (block.length > buffer.encrypted.length) {
                            buffer.encrypted += this._encryptBlock(this._generate_xor(block_size, xor));
                        }

                        var key = this._string_shift(buffer.encrypted, block_size);

                        ciphertext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < plaintext.length; i += block_size) {
                        block = plaintext.substr(i, block_size);
                        key = this._encryptBlock(this._generate_xor(block_size, xor));
                        ciphertext += block ^ key;
                    }
                }

                if (this.continuousBuffer) {
                    var start;
                    this.encryptIV = xor;

                    if (start = plaintext.length % block_size) {
                        buffer.encrypted = key.substr(start) + buffer.encrypted;
                    }
                }

                break;

            case CRYPT_RIJNDAEL_MODE_CFB:
                if (this.continuousBuffer) {
                    var iv = this.encryptIV;
                    var pos = buffer.pos;
                } else {
                    iv = this.encryptIV;
                    pos = 0;
                }

                var len = plaintext.length;
                i = 0;

                if (pos) //ie. $i = min($max, $len), $len-= $i, $pos+= $i, $pos%= $blocksize
                    {
                        var orig_pos = pos;
                        var max = block_size - pos;

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

                while (len >= block_size) {
                    iv = this._encryptBlock(iv) ^ plaintext.substr(i, block_size);
                    ciphertext += iv;
                    len -= block_size;
                    i += block_size;
                }

                if (len) {
                    iv = this._encryptBlock(iv);
                    block = iv ^ plaintext.substr(i);
                    iv = substr_replace(iv, block, 0, len);
                    ciphertext += block;
                    pos = len;
                }

                break;

            case CRYPT_RIJNDAEL_MODE_OFB:
                xor = this.encryptIV;

                if (buffer.xor.length) {
                    for (i = 0;; i < plaintext.length; i += block_size) {
                        block = plaintext.substr(i, block_size);

                        if (block.length > buffer.xor.length) {
                            xor = this._encryptBlock(xor);
                            buffer.xor += xor;
                        }

                        key = this._string_shift(buffer.xor, block_size);
                        ciphertext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < plaintext.length; i += block_size) {
                        xor = this._encryptBlock(xor);
                        ciphertext += plaintext.substr(i, block_size) ^ xor;
                    }

                    key = xor;
                }

                if (this.continuousBuffer) {
                    this.encryptIV = xor;

                    if (start = plaintext.length % block_size) {
                        buffer.xor = key.substr(start) + buffer.xor;
                    }
                }

        }

        return ciphertext;
    }

    decrypt(ciphertext) {
        if (this.changed) {
            this._setup();
        }

        if (this.use_inline_crypt) {
            var inline = this.inline_crypt;
            return inline("decrypt", this, ciphertext);
        }

        if (this.paddable) //we pad with chr(0) since that's what mcrypt_generic does.  to quote from http://php.net/function.mcrypt-generic :
            //"The data is padded with "\0" to make sure the length of the data is n * blocksize."
            {
                ciphertext = str_pad(ciphertext, ciphertext.length + (this.block_size - ciphertext.length % this.block_size) % this.block_size, String.fromCharCode(0));
            }

        var block_size = this.block_size;
        var buffer = this.debuffer;
        var plaintext = "";

        switch (this.mode) {
            case CRYPT_RIJNDAEL_MODE_ECB:
                for (var i = 0; i < ciphertext.length; i += block_size) {
                    plaintext += this._decryptBlock(ciphertext.substr(i, block_size));
                }

                break;

            case CRYPT_RIJNDAEL_MODE_CBC:
                var xor = this.decryptIV;

                for (i = 0;; i < ciphertext.length; i += block_size) {
                    var block = ciphertext.substr(i, block_size);
                    plaintext += this._decryptBlock(block) ^ xor;
                    xor = block;
                }

                if (this.continuousBuffer) {
                    this.decryptIV = xor;
                }

                break;

            case CRYPT_RIJNDAEL_MODE_CTR:
                xor = this.decryptIV;

                if (buffer.ciphertext.length) {
                    for (i = 0;; i < ciphertext.length; i += block_size) {
                        block = ciphertext.substr(i, block_size);

                        if (block.length > buffer.ciphertext.length) {
                            buffer.ciphertext += this._encryptBlock(this._generate_xor(block_size, xor));
                        }

                        var key = this._string_shift(buffer.ciphertext, block_size);

                        plaintext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < ciphertext.length; i += block_size) {
                        block = ciphertext.substr(i, block_size);
                        key = this._encryptBlock(this._generate_xor(block_size, xor));
                        plaintext += block ^ key;
                    }
                }

                if (this.continuousBuffer) {
                    var start;
                    this.decryptIV = xor;

                    if (start = ciphertext.length % block_size) {
                        buffer.ciphertext = key.substr(start) + buffer.ciphertext;
                    }
                }

                break;

            case CRYPT_RIJNDAEL_MODE_CFB:
                if (this.continuousBuffer) {
                    var iv = this.decryptIV;
                    var pos = buffer.pos;
                } else {
                    iv = this.decryptIV;
                    pos = 0;
                }

                var len = ciphertext.length;
                i = 0;

                if (pos) //ie. $i = min($max, $len), $len-= $i, $pos+= $i, $pos%= $blocksize
                    {
                        var orig_pos = pos;
                        var max = block_size - pos;

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

                while (len >= block_size) {
                    iv = this._encryptBlock(iv);
                    var cb = ciphertext.substr(i, block_size);
                    plaintext += iv ^ cb;
                    iv = cb;
                    len -= block_size;
                    i += block_size;
                }

                if (len) {
                    iv = this._encryptBlock(iv);
                    plaintext += iv ^ ciphertext.substr(i);
                    iv = substr_replace(iv, ciphertext.substr(i), 0, len);
                    pos = len;
                }

                break;

            case CRYPT_RIJNDAEL_MODE_OFB:
                xor = this.decryptIV;

                if (buffer.xor.length) {
                    for (i = 0;; i < ciphertext.length; i += block_size) {
                        block = ciphertext.substr(i, block_size);

                        if (block.length > buffer.xor.length) {
                            xor = this._encryptBlock(xor);
                            buffer.xor += xor;
                        }

                        key = this._string_shift(buffer.xor, block_size);
                        plaintext += block ^ key;
                    }
                } else {
                    for (i = 0;; i < ciphertext.length; i += block_size) {
                        xor = this._encryptBlock(xor);
                        plaintext += ciphertext.substr(i, block_size) ^ xor;
                    }

                    key = xor;
                }

                if (this.continuousBuffer) {
                    this.decryptIV = xor;

                    if (start = ciphertext.length % block_size) {
                        buffer.xor = key.substr(start) + buffer.xor;
                    }
                }

        }

        return this.paddable ? this._unpad(plaintext) : plaintext;
    }

    _encryptBlock(in) //addRoundKey
    //fips-197.pdf#page=19, "Figure 5. Pseudo Code for the Cipher", states that this loop has four components -
    //subBytes, shiftRows, mixColumns, and addRoundKey. fips-197.pdf#page=30, "Implementation Suggestions Regarding
    //Various Platforms" suggests that performs enhanced implementations are described in Rijndael-ammended.pdf.
    //Rijndael-ammended.pdf#page=20, "Implementation aspects / 32-bit processor", discusses such an optimization.
    //Unfortunately, the description given there is not quite correct.  Per aes.spec.v316.pdf#page=19 [1],
    //equation (7.4.7) is supposed to use addition instead of subtraction, so we'll do that here, as well.
    //[1] http://fp.gladman.plus.com/cryptography_technology/rijndael/aes.spec.v316.pdf
    //subWord
    //shiftRows + addRoundKey
    //$c[0] == 0
    //100% ugly switch/case code... but ~5% faster ("smart code" below commented out)
    {
        var state = Array();
        var words = unpack("N*word", in);
        var w = this.w;
        var t0 = this.t0;
        var t1 = this.t1;
        var t2 = this.t2;
        var t3 = this.t3;
        var Nb = this.Nb;
        var Nr = this.Nr;
        var c = this.c;
        var i = -1;

        for (var word of Object.values(words)) {
            state.push(word ^ w[0][++i]);
        }

        var temp = Array();

        for (var round = 1; round < Nr; ++round) //$c[0] == 0
        {
            i = 0;
            var j = c[1];
            var k = c[2];
            var l = c[3];

            while (i < Nb) {
                temp[i] = t0[state[i] >> 24 & 255] ^ t1[state[j] >> 16 & 255] ^ t2[state[k] >> 8 & 255] ^ t3[state[l] & 255] ^ w[round][i];
                ++i;
                j = (j + 1) % Nb;
                k = (k + 1) % Nb;
                l = (l + 1) % Nb;
            }

            state = temp;
        }

        for (i = 0;; i < Nb; ++i) {
            state[i] = this._subWord(state[i]);
        }

        i = 0;
        j = c[1];
        k = c[2];
        l = c[3];

        while (i < Nb) {
            temp[i] = state[i] & 4278190080 ^ state[j] & 16711680 ^ state[k] & 65280 ^ state[l] & 255 ^ w[Nr][i];
            ++i;
            j = (j + 1) % Nb;
            k = (k + 1) % Nb;
            l = (l + 1) % Nb;
        }

        switch (Nb) {
            case 8:
                return pack("N*", temp[0], temp[1], temp[2], temp[3], temp[4], temp[5], temp[6], temp[7]);

            case 7:
                return pack("N*", temp[0], temp[1], temp[2], temp[3], temp[4], temp[5], temp[6]);

            case 6:
                return pack("N*", temp[0], temp[1], temp[2], temp[3], temp[4], temp[5]);

            case 5:
                return pack("N*", temp[0], temp[1], temp[2], temp[3], temp[4]);

            default:
                return pack("N*", temp[0], temp[1], temp[2], temp[3]);
        }
    }

    _decryptBlock(in) //addRoundKey
    //invShiftRows + invSubWord + addRoundKey
    //$c[0] == 0
    {
        var state = Array();
        var words = unpack("N*word", in);
        var dw = this.dw;
        var dt0 = this.dt0;
        var dt1 = this.dt1;
        var dt2 = this.dt2;
        var dt3 = this.dt3;
        var Nb = this.Nb;
        var Nr = this.Nr;
        var c = this.c;
        var i = -1;

        for (var word of Object.values(words)) {
            state.push(word ^ dw[Nr][++i]);
        }

        var temp = Array();

        for (var round = Nr - 1; round > 0; --round) //$c[0] == 0
        {
            i = 0;
            var j = Nb - c[1];
            var k = Nb - c[2];
            var l = Nb - c[3];

            while (i < Nb) {
                temp[i] = dt0[state[i] >> 24 & 255] ^ dt1[state[j] >> 16 & 255] ^ dt2[state[k] >> 8 & 255] ^ dt3[state[l] & 255] ^ dw[round][i];
                ++i;
                j = (j + 1) % Nb;
                k = (k + 1) % Nb;
                l = (l + 1) % Nb;
            }

            state = temp;
        }

        i = 0;
        j = Nb - c[1];
        k = Nb - c[2];
        l = Nb - c[3];

        while (i < Nb) {
            temp[i] = dw[0][i] ^ this._invSubWord(state[i] & 4278190080 | state[j] & 16711680 | state[k] & 65280 | state[l] & 255);
            ++i;
            j = (j + 1) % Nb;
            k = (k + 1) % Nb;
            l = (l + 1) % Nb;
        }

        switch (Nb) {
            case 8:
                return pack("N*", temp[0], temp[1], temp[2], temp[3], temp[4], temp[5], temp[6], temp[7]);

            case 7:
                return pack("N*", temp[0], temp[1], temp[2], temp[3], temp[4], temp[5], temp[6]);

            case 6:
                return pack("N*", temp[0], temp[1], temp[2], temp[3], temp[4], temp[5]);

            case 5:
                return pack("N*", temp[0], temp[1], temp[2], temp[3], temp[4]);

            default:
                return pack("N*", temp[0], temp[1], temp[2], temp[3]);
        }
    }

    _setup() //Each number in $rcon is equal to the previous number multiplied by two in Rijndael's finite field.
    //See http://en.wikipedia.org/wiki/Finite_field_arithmetic#Multiplicative_inverse
    //see Rijndael-ammended.pdf#page=44
    //shift offsets for Nb = 5, 7 are defined in Rijndael-ammended.pdf#page=44,
    //"Table 8: Shift offsets in Shiftrow for the alternative block lengths"
    //shift offsets for Nb = 4, 6, 8 are defined in Rijndael-ammended.pdf#page=14,
    //"Table 2: Shift offsets for different block lengths"
    //convert the key schedule from a vector of $Nb * ($Nr + 1) length to a matrix with $Nr + 1 rows and $Nb columns
    //and generate the inverse key schedule.  more specifically,
    //according to <http://csrc.nist.gov/archive/aes/rijndael/Rijndael-ammended.pdf#page=23> (section 5.3.3),
    //"The key expansion for the Inverse Cipher is defined as follows:
    //1. Apply the Key Expansion.
    //2. Apply InvMixColumn to all Round Keys except the first and the last one."
    //also, see fips-197.pdf#page=27, "5.3.5 Equivalent Inverse Cipher"
    //In case of $this->use_inline_crypt === true we have to use 1-dim key arrays (both ascending)
    {
        if (!("_static_Crypt_Rijndael__setup_rcon" in global)) _static_Crypt_Rijndael__setup_rcon = [0, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912, 1073741824, 2147483648, 452984832, 905969664, 1811939328, 3623878656, 2868903936, 1291845632, 2583691264, 788529152, 1577058304, 3154116608, 1660944384, 3321888768, 2533359616, 889192448, 1778384896, 3556769792, 3003121664, 2097152000, 4194304000, 4009754624, 3305111552, 2432696320];

        if (!this.explicit_key_length) //we do >> 2, here, and not >> 5, as we do above, since strlen($this->key) tells us the number of bytes - not bits
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

        this.key = str_pad(this.key.substr(0, this.key_size), this.key_size, String.fromCharCode(0));
        this.encryptIV = this.decryptIV = this.iv = str_pad(this.iv.substr(0, this.block_size), this.block_size, String.fromCharCode(0));
        this.Nr = Math.max(this.Nk, this.Nb) + 6;

        switch (this.Nb) {
            case 4:
            case 5:
            case 6:
                this.c = [0, 1, 2, 3];
                break;

            case 7:
                this.c = [0, 1, 2, 4];
                break;

            case 8:
                this.c = [0, 1, 3, 4];
        }

        var key = this.key;
        var w = Object.values(unpack("N*words", key));
        length = this.Nb * (this.Nr + 1);

        for (var i = this.Nk; i < length; i++) {
            var temp = w[i - 1];

            if (i % this.Nk == 0) //according to <http://php.net/language.types.integer>, "the size of an integer is platform-dependent".
                //on a 32-bit machine, it's 32-bits, and on a 64-bit machine, it's 64-bits. on a 32-bit machine,
                //0xFFFFFFFF << 8 == 0xFFFFFF00, but on a 64-bit machine, it equals 0xFFFFFFFF00. as such, doing 'and'
                //with 0xFFFFFFFF (or 0xFFFFFF00) on a 32-bit machine is unnecessary, but on a 64-bit machine, it is.
                //rotWord
                {
                    temp = temp << 8 & 4294967040 | temp >> 24 & 255;
                    temp = this._subWord(temp) ^ _static_Crypt_Rijndael__setup_rcon[i / this.Nk];
                } else if (this.Nk > 6 && i % this.Nk == 4) {
                temp = this._subWord(temp);
            }

            w[i] = w[i - this.Nk] ^ temp;
        }

        temp = this.w = this.dw = Array();

        for (i = row = col = 0;; i < length; i++, col++) {
            if (col == this.Nb) {
                if (row == 0) {
                    this.dw[0] = this.w[0];
                } else //subWord + invMixColumn + invSubWord = invMixColumn
                    {
                        var j = 0;

                        while (j < this.Nb) {
                            var dw = this._subWord(this.w[row][j]);

                            temp[j] = this.dt0[dw >> 24 & 255] ^ this.dt1[dw >> 16 & 255] ^ this.dt2[dw >> 8 & 255] ^ this.dt3[dw & 255];
                            j++;
                        }

                        this.dw[row] = temp;
                    }

                col = 0;
                row++;
            }

            this.w[row][col] = w[i];
        }

        this.dw[row] = this.w[row];

        if (this.use_inline_crypt) {
            this.dw = this.dw.reverse();
            w = this.w.pop();
            dw = this.dw.pop();
            {
                let _tmp_0 = this.w;

                for (var r in _tmp_0) {
                    var wr = _tmp_0[r];

                    for (var c in wr) {
                        var wc = wr[c];
                        w.push(wc);
                        dw.push(this.dw[r][c]);
                    }
                }
            }
            this.w = w;
            this.dw = dw;
            this.inline_crypt_setup();
        }

        this.changed = false;
    }

    _subWord(word) {
        var sbox = this.sbox;
        return sbox[word & 255] | sbox[word >> 8 & 255] << 8 | sbox[word >> 16 & 255] << 16 | sbox[word >> 24 & 255] << 24;
    }

    _invSubWord(word) {
        var isbox = this.isbox;
        return isbox[word & 255] | isbox[word >> 8 & 255] << 8 | isbox[word >> 16 & 255] << 16 | isbox[word >> 24 & 255] << 24;
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
            if (length % this.block_size == 0) {
                return text;
            } else {
                user_error(`The plaintext's length (${length}) is not a multiple of the block size (${this.block_size})`);
                this.padding = true;
            }
        }

        var pad = this.block_size - length % this.block_size;
        return str_pad(text, length + pad, String.fromCharCode(pad));
    }

    _unpad(text) {
        if (!this.padding) {
            return text;
        }

        var length = text.charCodeAt(text.length - 1);

        if (!length || length > this.block_size) {
            return false;
        }

        return text.substr(0, -length);
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
            pos: 0
        };
        this.debuffer = {
            ciphertext: "",
            xor: "",
            pos: 0
        };
    }

    _string_shift(string, index = 1) {
        var substr = substr(string, 0, index);
        string = substr(string, index);
        return substr;
    }

    inline_crypt_setup() //Note: inline_crypt_setup() will be called only if $this->changed === true
    //So here we are'nt under the same heavy timing-stress as we are in _de/encryptBlock() or de/encrypt().
    //However...the here generated function- $code, stored as php callback in $this->inline_crypt, must work as fast as even possible.
    //The first 5 generated $lambda_functions will use the key-words hardcoded for better performance.
    //For memory reason we limit those ultra-optimized function code to 5.
    //After that, we use pure (extracted) integer vars for the key-words which is faster than accessing them via array.
    {
        var lambda_functions = Crypt_Rijndael.get_lambda_functions();
        var block_size = this.block_size;
        var mode = this.mode;

        if (lambda_functions.length < 5) {
            var w = this.w;
            var dw = this.dw;
            var init_encryptBlock = "";
            var init_decryptBlock = "";
        } else {
            var i, cw;

            for (i = 0, cw = this.w.length; i < cw; ++i) {
                w.push("$w_" + i);
                dw.push("$dw_" + i);
            }

            init_encryptBlock = "extract($self->w,  EXTR_PREFIX_ALL, \"w\");";
            init_decryptBlock = "extract($self->dw, EXTR_PREFIX_ALL, \"dw\");";
        }

        var code_hash = md5(`${mode}, ${block_size}, ` + w.join(","));

        if (!(undefined !== lambda_functions[code_hash])) //Generating encrypt code:
            //Preround: addRoundKey
            //Mainrounds: shiftRows + subWord + mixColumns + addRoundKey
            //Finalround: subWord + shiftRows + addRoundKey
            //Generating decrypt code:
            //Preround: addRoundKey
            //Mainrounds: shiftRows + subWord + mixColumns + addRoundKey
            //Finalround: subWord + shiftRows + addRoundKey
            //Generating mode of operation code:
            {
                var Nr = this.Nr;
                var Nb = this.Nb;
                var c = this.c;
                init_encryptBlock += "\r\n                $t0 = $self->t0;\r\n                $t1 = $self->t1;\r\n                $t2 = $self->t2;\r\n                $t3 = $self->t3;\r\n                $sbox = $self->sbox;";
                var s = "e";
                var e = "s";
                var wc = Nb - 1;

                var _encryptBlock = "$in = unpack(\"N*\", $in);" + "\n";

                for (i = 0;; i < Nb; ++i) {
                    _encryptBlock += "$s" + i + " = $in[" + (i + 1) + "] ^ " + w[++wc] + ";\n";
                }

                for (var round = 1; round < Nr; ++round) {
                    [s, e] = [e, s];

                    for (i = 0;; i < Nb; ++i) {
                        _encryptBlock += "$" + e + i + " =\r\n                        $t0[($" + s + i + " >> 24) & 0xff] ^\r\n                        $t1[($" + s + (i + c[1]) % Nb + " >> 16) & 0xff] ^\r\n                        $t2[($" + s + (i + c[2]) % Nb + " >>  8) & 0xff] ^\r\n                        $t3[ $" + s + (i + c[3]) % Nb + "        & 0xff] ^\r\n                        " + w[++wc] + ";\n";
                    }
                }

                for (i = 0;; i < Nb; ++i) {
                    _encryptBlock += "$" + e + i + " =\r\n                     $sbox[ $" + e + i + "        & 0xff]        |\r\n                    ($sbox[($" + e + i + " >>  8) & 0xff] <<  8) |\r\n                    ($sbox[($" + e + i + " >> 16) & 0xff] << 16) |\r\n                    ($sbox[($" + e + i + " >> 24) & 0xff] << 24);" + "\n";
                }

                _encryptBlock += "$in = pack(\"N*\"" + "\n";

                for (i = 0;; i < Nb; ++i) {
                    _encryptBlock += ",\r\n                    ($" + e + i + " & 0xFF000000) ^\r\n                    ($" + e + (i + c[1]) % Nb + " & 0x00FF0000) ^\r\n                    ($" + e + (i + c[2]) % Nb + " & 0x0000FF00) ^\r\n                    ($" + e + (i + c[3]) % Nb + " & 0x000000FF) ^\r\n                    " + w[i] + "\n";
                }

                _encryptBlock += ");";
                init_decryptBlock += "\r\n                $dt0 = $self->dt0;\r\n                $dt1 = $self->dt1;\r\n                $dt2 = $self->dt2;\r\n                $dt3 = $self->dt3;\r\n                $isbox = $self->isbox;";
                s = "e";
                e = "s";
                wc = Nb - 1;

                var _decryptBlock = "$in = unpack(\"N*\", $in);" + "\n";

                for (i = 0;; i < Nb; ++i) {
                    _decryptBlock += "$s" + i + " = $in[" + (i + 1) + "] ^ " + dw[++wc] + ";" + "\n";
                }

                for (round = 1;; round < Nr; ++round) {
                    [s, e] = [e, s];

                    for (i = 0;; i < Nb; ++i) {
                        _decryptBlock += "$" + e + i + " =\r\n                        $dt0[($" + s + i + " >> 24) & 0xff] ^\r\n                        $dt1[($" + s + (Nb + i - c[1]) % Nb + " >> 16) & 0xff] ^\r\n                        $dt2[($" + s + (Nb + i - c[2]) % Nb + " >>  8) & 0xff] ^\r\n                        $dt3[ $" + s + (Nb + i - c[3]) % Nb + "        & 0xff] ^\r\n                        " + dw[++wc] + ";\n";
                    }
                }

                for (i = 0;; i < Nb; ++i) {
                    _decryptBlock += "$" + e + i + " =\r\n                     $isbox[ $" + e + i + "        & 0xff]        |\r\n                    ($isbox[($" + e + i + " >>  8) & 0xff] <<  8) |\r\n                    ($isbox[($" + e + i + " >> 16) & 0xff] << 16) |\r\n                    ($isbox[($" + e + i + " >> 24) & 0xff] << 24);" + "\n";
                }

                _decryptBlock += "$in = pack(\"N*\"" + "\n";

                for (i = 0;; i < Nb; ++i) {
                    _decryptBlock += ",\r\n                    ($" + e + i + " & 0xFF000000) ^\r\n                    ($" + e + (Nb + i - c[1]) % Nb + " & 0x00FF0000) ^\r\n                    ($" + e + (Nb + i - c[2]) % Nb + " & 0x0000FF00) ^\r\n                    ($" + e + (Nb + i - c[3]) % Nb + " & 0x000000FF) ^\r\n                    " + dw[i] + "\n";
                }

                _decryptBlock += ");";

                switch (mode) {
                    case CRYPT_RIJNDAEL_MODE_ECB:
                        var encrypt = init_encryptBlock + "\r\n                        $ciphertext = \"\";\r\n                        $text = $self->_pad($text);\r\n                        $plaintext_len = strlen($text);\r\n\r\n                        for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ");\r\n                            " + _encryptBlock + "\r\n                            $ciphertext.= $in;\r\n                        }\r\n                       \r\n                        return $ciphertext;\r\n                        ";
                        var decrypt = init_decryptBlock + "\r\n                        $plaintext = \"\";\r\n                        $text = str_pad($text, strlen($text) + (" + block_size + " - strlen($text) % " + block_size + ") % " + block_size + ", chr(0));\r\n                        $ciphertext_len = strlen($text);\r\n\r\n                        for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ");\r\n                            " + _decryptBlock + "\r\n                            $plaintext.= $in;\r\n                        }\r\n\r\n                        return $self->_unpad($plaintext);\r\n                        ";
                        break;

                    case CRYPT_RIJNDAEL_MODE_CBC:
                        encrypt = init_encryptBlock + "\r\n                        $ciphertext = \"\";\r\n                        $text = $self->_pad($text);\r\n                        $plaintext_len = strlen($text);\r\n\r\n                        $in = $self->encryptIV;\r\n\r\n                        for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ") ^ $in;\r\n                            " + _encryptBlock + "\r\n                            $ciphertext.= $in;\r\n                        }\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $in;\r\n                        }\r\n\r\n                        return $ciphertext;\r\n                        ";
                        decrypt = init_decryptBlock + "\r\n                        $plaintext = \"\";\r\n                        $text = str_pad($text, strlen($text) + (" + block_size + " - strlen($text) % " + block_size + ") % " + block_size + ", chr(0));\r\n                        $ciphertext_len = strlen($text);\r\n\r\n                        $iv = $self->decryptIV;\r\n\r\n                        for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                            $in = $block = substr($text, $i, " + block_size + ");\r\n                            " + _decryptBlock + "\r\n                            $plaintext.= $in ^ $iv;\r\n                            $iv = $block;\r\n                        }\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $iv;\r\n                        }\r\n\r\n                        return $self->_unpad($plaintext);\r\n                        ";
                        break;

                    case CRYPT_RIJNDAEL_MODE_CTR:
                        encrypt = init_encryptBlock + "\r\n                        $ciphertext = \"\";\r\n                        $plaintext_len = strlen($text);\r\n                        $xor = $self->encryptIV;\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if (strlen($buffer[\"encrypted\"])) {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"encrypted\"])) {\r\n                                    $in = $self->_generate_xor(" + block_size + ", $xor);\r\n                                    " + _encryptBlock + "\r\n                                    $buffer[\"encrypted\"].= $in;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"encrypted\"], " + block_size + ");\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                $in = $self->_generate_xor(" + block_size + ", $xor);\r\n                                " + _encryptBlock + "\r\n                                $key = $in;\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $xor;\r\n                            if ($start = $plaintext_len % " + block_size + ") {\r\n                                $buffer[\"encrypted\"] = substr($key, $start) . $buffer[\"encrypted\"];\r\n                            }\r\n                        }\r\n\r\n                        return $ciphertext;\r\n                    ";
                        decrypt = init_encryptBlock + "\r\n                        $plaintext = \"\";\r\n                        $ciphertext_len = strlen($text);\r\n                        $xor = $self->decryptIV;\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if (strlen($buffer[\"ciphertext\"])) {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"ciphertext\"])) {\r\n                                    $in = $self->_generate_xor(" + block_size + ", $xor);\r\n                                    " + _encryptBlock + "\r\n                                    $buffer[\"ciphertext\"].= $in;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"ciphertext\"], " + block_size + ");\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                $in = $self->_generate_xor(" + block_size + ", $xor);\r\n                                " + _encryptBlock + "\r\n                                $key = $in;\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $xor;\r\n                            if ($start = $ciphertext_len % " + block_size + ") {\r\n                                $buffer[\"ciphertext\"] = substr($key, $start) . $buffer[\"ciphertext\"];\r\n                            }\r\n                        }\r\n                       \r\n                        return $plaintext;\r\n                        ";
                        break;

                    case CRYPT_RIJNDAEL_MODE_CFB:
                        encrypt = init_encryptBlock + "\r\n                        $ciphertext = \"\";\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $iv = &$self->encryptIV;\r\n                            $pos = &$buffer[\"pos\"];\r\n                        } else {\r\n                            $iv = $self->encryptIV;\r\n                            $pos = 0;\r\n                        }\r\n                        $len = strlen($text);\r\n                        $i = 0;\r\n                        if ($pos) {\r\n                            $orig_pos = $pos;\r\n                            $max = " + block_size + " - $pos;\r\n                            if ($len >= $max) {\r\n                                $i = $max;\r\n                                $len-= $max;\r\n                                $pos = 0;\r\n                            } else {\r\n                                $i = $len;\r\n                                $pos+= $len;\r\n                                $len = 0;\r\n                            }\r\n                            $ciphertext = substr($iv, $orig_pos) ^ $text;\r\n                            $iv = substr_replace($iv, $ciphertext, $orig_pos, $i);\r\n                        }\r\n                        while ($len >= " + block_size + ") {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + ";\r\n                            $iv = $in ^ substr($text, $i, " + block_size + ");\r\n                            $ciphertext.= $iv;\r\n                            $len-= " + block_size + ";\r\n                            $i+= " + block_size + ";\r\n                        }\r\n                        if ($len) {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + "\r\n                            $iv = $in;\r\n                            $block = $iv ^ substr($text, $i);\r\n                            $iv = substr_replace($iv, $block, 0, $len);\r\n                            $ciphertext.= $block;\r\n                            $pos = $len;\r\n                        }\r\n                        return $ciphertext;\r\n                    ";
                        decrypt = init_encryptBlock + "\r\n                        $plaintext = \"\";\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $iv = &$self->decryptIV;\r\n                            $pos = &$buffer[\"pos\"];\r\n                        } else {\r\n                            $iv = $self->decryptIV;\r\n                            $pos = 0;\r\n                        }\r\n                        $len = strlen($text);\r\n                        $i = 0;\r\n                        if ($pos) {\r\n                            $orig_pos = $pos;\r\n                            $max = " + block_size + " - $pos;\r\n                            if ($len >= $max) {\r\n                                $i = $max;\r\n                                $len-= $max;\r\n                                $pos = 0;\r\n                            } else {\r\n                                $i = $len;\r\n                                $pos+= $len;\r\n                                $len = 0;\r\n                            }\r\n                            $plaintext = substr($iv, $orig_pos) ^ $text;\r\n                            $iv = substr_replace($iv, substr($text, 0, $i), $orig_pos, $i);\r\n                        }\r\n                        while ($len >= " + block_size + ") {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + "\r\n                            $iv = $in;\r\n                            $cb = substr($text, $i, " + block_size + ");\r\n                            $plaintext.= $iv ^ $cb;\r\n                            $iv = $cb;\r\n                            $len-= " + block_size + ";\r\n                            $i+= " + block_size + ";\r\n                        }\r\n                        if ($len) {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + "\r\n                            $iv = $in;\r\n                            $plaintext.= $iv ^ substr($text, $i);\r\n                            $iv = substr_replace($iv, substr($text, $i), 0, $len);\r\n                            $pos = $len;\r\n                        }\r\n\r\n                        return $plaintext;\r\n                        ";
                        break;

                    case CRYPT_RIJNDAEL_MODE_OFB:
                        encrypt = init_encryptBlock + "\r\n                        $ciphertext = \"\";\r\n                        $plaintext_len = strlen($text);\r\n                        $xor = $self->encryptIV;\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if (strlen($buffer[\"xor\"])) {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"xor\"])) {\r\n                                    $in = $xor;\r\n                                    " + _encryptBlock + "\r\n                                    $xor = $in;\r\n                                    $buffer[\"xor\"].= $xor;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"xor\"], " + block_size + ");\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $in = $xor;\r\n                                " + _encryptBlock + "\r\n                                $xor = $in;\r\n                                $ciphertext.= substr($text, $i, " + block_size + ") ^ $xor;\r\n                            }\r\n                            $key = $xor;\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $xor;\r\n                            if ($start = $plaintext_len % " + block_size + ") {\r\n                                 $buffer[\"xor\"] = substr($key, $start) . $buffer[\"xor\"];\r\n                            }\r\n                        }\r\n                        return $ciphertext;\r\n                        ";
                        decrypt = init_encryptBlock + "\r\n                        $plaintext = \"\";\r\n                        $ciphertext_len = strlen($text);\r\n                        $xor = $self->decryptIV;\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if (strlen($buffer[\"xor\"])) {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"xor\"])) {\r\n                                    $in = $xor;\r\n                                    " + _encryptBlock + "\r\n                                    $xor = $in;\r\n                                    $buffer[\"xor\"].= $xor;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"xor\"], " + block_size + ");\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $in = $xor;\r\n                                " + _encryptBlock + "\r\n                                $xor = $in;\r\n                                $plaintext.= substr($text, $i, " + block_size + ") ^ $xor;\r\n                            }\r\n                            $key = $xor;\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $xor;\r\n                            if ($start = $ciphertext_len % " + block_size + ") {\r\n                                 $buffer[\"xor\"] = substr($key, $start) . $buffer[\"xor\"];\r\n                            }\r\n                        }\r\n                        return $plaintext;\r\n                        ";
                        break;
                }

                new Function("$action, &$self, $text", "if ($action == \"encrypt\") { " + encrypt + " } else { " + decrypt + " }");
            }

        this.inline_crypt = lambda_functions[code_hash];
    }

    get_lambda_functions() {
        if (!("_static_Crypt_Rijndael_get_lambda_functions_functions" in global)) _static_Crypt_Rijndael_get_lambda_functions_functions = Array();
        return _static_Crypt_Rijndael_get_lambda_functions_functions;
    }

};
