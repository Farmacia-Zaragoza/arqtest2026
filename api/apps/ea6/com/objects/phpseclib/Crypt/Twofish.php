//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementation of Twofish.
//
//Uses mcrypt, if available, and an internal implementation, otherwise.
//
//PHP versions 4 and 5
//
//Useful resources are as follows:
//
//- {@link http://en.wikipedia.org/wiki/Twofish Wikipedia description of Twofish}
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Crypt/Twofish.php');
//
//$Twofish = new Crypt_Twofish();
//
//$Twofish->setKey('12345678901234567890123456789012');
//
//$plaintext = str_repeat('a', 1024);
//
//echo $Twofish->decrypt($Twofish->encrypt($plaintext));
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
//@package    Crypt_Twofish
//@author     Jim Wigginton <terrafrost@php.net>
//@author     Hans-Juergen Petrich <petrich@tronic-media.com>
//@copyright  MMVII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@version    1.0
//@link       http://phpseclib.sourceforge.net
//
//
//#@+
// @access public
// @see Crypt_Twofish::encrypt()
// @see Crypt_Twofish::decrypt()
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
// @see Crypt_Twofish::Crypt_Twofish()
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
//Pure-PHP implementation of Twofish.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@author  Hans-Juergen Petrich <petrich@tronic-media.com>
//@version 1.0
//@access  public
//@package Crypt_Twofish
//
//
//vim: ts=4:sw=4:et:
//vim6: fdl=1:
const CRYPT_TWOFISH_MODE_CTR = -1;
const CRYPT_TWOFISH_MODE_ECB = 1;
const CRYPT_TWOFISH_MODE_CBC = 2;
const CRYPT_TWOFISH_MODE_CFB = 3;
const CRYPT_TWOFISH_MODE_OFB = 4;
const CRYPT_TWOFISH_MODE_INTERNAL = 1;
const CRYPT_TWOFISH_MODE_MCRYPT = 2;

//
//The Key as String
//
//@see Crypt_Twofish::setKey()
//@var Array
//@access private
//
//
//
//The Encryption Mode
//
//@see Crypt_Twofish::Crypt_Twofish()
//@var Integer
//@access private
//
//
//
//Continuous Buffer status
//
//@see Crypt_Twofish::enableContinuousBuffer()
//@var Boolean
//@access private
//
//
//
//Padding status
//
//@see Crypt_Twofish::enablePadding()
//@var Boolean
//@access private
//
//
//
//The Initialization Vector
//
//@see Crypt_Twofish::setIV()
//@var String
//@access private
//
//
//
//A "sliding" Initialization Vector
//
//@see Crypt_Twofish::enableContinuousBuffer()
//@var String
//@access private
//
//
//
//A "sliding" Initialization Vector
//
//@see Crypt_Twofish::enableContinuousBuffer()
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
//@see Crypt_Twofish::encrypt()
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
//@see Crypt_Twofish::decrypt()
//@var String
//@access private
//
//
//
//Does the enmcrypt resource need to be (re)initialized?
//
//@see Crypt_Twofish::setKey()
//@see Crypt_Twofish::setIV()
//@var Boolean
//@access private
//
//
//
//Does the demcrypt resource need to be (re)initialized?
//
//@see Crypt_Twofish::setKey()
//@see Crypt_Twofish::setIV()
//@var Boolean
//@access private
//
//
//
//Is the mode one that is paddable?
//
//@see Crypt_Twofish::Crypt_Twofish()
//@var Boolean
//@access private
//
//
//
//Encryption buffer for CTR, OFB and CFB modes
//
//@see Crypt_Twofish::encrypt()
//@var Array
//@access private
//
//
//
//Decryption buffer for CTR, OFB and CFB modes
//
//@see Crypt_Twofish::decrypt()
//@var Array
//@access private
//
//
//
//mcrypt resource for CFB mode
//
//@see Crypt_Twofish::encrypt()
//@see Crypt_Twofish::decrypt()
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
//Q-Table
//
//@var Array
//@access private
//
//
//
//Q-Table
//
//@var Array
//@access private
//
//
//
//M-Table
//
//@var Array
//@access private
//
//
//
//M-Table
//
//@var Array
//@access private
//
//
//
//M-Table
//
//@var Array
//@access private
//
//
//
//M-Table
//
//@var Array
//@access private
//
//
//
//The Key Schedule Array
//
//@var Array
//@access private
//
//
//
//The Key depended S-Table 0
//
//@var Array
//@access private
//
//
//
//The Key depended S-Table 1
//
//@var Array
//@access private
//
//
//
//The Key depended S-Table 2
//
//@var Array
//@access private
//
//
//
//The Key depended S-Table 3
//
//@var Array
//@access private
//
//
//
//Default Constructor.
//
//Determines whether or not the mcrypt extension should be used.
//If not explictly set, CRYPT_TWOFISH_MODE_CBC will be used.
//
//@param optional Integer $mode
//@access public
//
//
//
//Sets the key.
//
//Keys can be of any length. Twofish, itself, requires the use of a key that's 128, 192 or 256-bits long.
//If the key is less than 256-bits we round the length up to the closest valid key length,
//padding $key with null bytes. If the key is more than 256-bits, we trim the excess bits.
//
//If the key is not explicitly set, it'll be assumed a 128 bits key to be all null bytes.
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
//SetIV is not required when CRYPT_TWOFISH_MODE_ECB is being used.  If not explictly set, it'll be assumed
//to be all null bytes.
//
//@access public
//@param String $iv
//
//
//
//Encrypts a message.
//
//$plaintext will be padded with up to 16 additional bytes.  Other Twofish implementations may or may not pad in the
//same manner.  Other common approaches to padding and the reasons why it's necessary are discussed in the following
//URL:
//
//{@link http://www.di-mgt.com.au/cryptopad.html http://www.di-mgt.com.au/cryptopad.html}
//
//An alternative to padding is to, separately, send the length of the file.  This is what SSH, in fact, does.
//strlen($plaintext) will still need to be a multiple of 16, however, arbitrary values can be added to make it that
//length.
//
//@see Crypt_Twofish::decrypt()
//@access public
//@param String $plaintext
//
//
//
//Decrypts a message.
//
//If strlen($ciphertext) is not a multiple of 16, null bytes will be added to the end of the string until it is.
//
//@see Crypt_Twofish::encrypt()
//@access public
//@param String $ciphertext
//
//
//
//Treat consecutive "packets" as if they are a continuous buffer.
//
//@see Crypt_Twofish::disableContinuousBuffer()
//@access public
//
//
//
//Treat consecutive packets as if they are a discontinuous buffer.
//
//The default behavior.
//
//@see Crypt_Twofish::enableContinuousBuffer()
//@access public
//
//
//
//Pad "packets".
//
//Twofish works by encrypting 16 bytes at a time.  If you ever need to encrypt or decrypt something that's not
//a multiple of 16, it becomes necessary to pad the input so that it's length is a multiple of eight.
//
//Padding is enabled by default.  Sometimes, however, it is undesirable to pad strings.  Such is the case in SSH1,
//where "packets" are padded with random bytes before being encrypted.  Unpad these packets and you risk stripping
//away characters that shouldn't be stripped away. (SSH knows how many bytes are added because the length is
//transmitted separately)
//
//@see Crypt_Twofish::disablePadding()
//@access public
//
//
//
//Do not pad packets.
//
//@see Crypt_Twofish::enablePadding()
//@access public
//
//
//
//Pads a string
//
//Pads a string using the RSA PKCS padding standards so that its length is a multiple of the blocksize (16).
//
//If padding is disabled and $text is not a multiple of the blocksize, the string will be padded regardless
//and padding will, hence forth, be enabled.
//
//@see Crypt_Twofish::_unpad()
//@access private
//
//
//
//Unpads a string
//
//If padding is enabled and the reported padding length is invalid the encryption key will be assumed to be wrong
//and false will be returned.
//
//@see Crypt_Twofish::_pad()
//@access private
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
//Generate CTR XOR encryption key
//
//Encrypt the output of this and XOR it against the ciphertext / plaintext to get the
//plaintext / ciphertext in CTR mode.
//
//@see Crypt_Twofish::decrypt()
//@see Crypt_Twofish::encrypt()
//@access public
//@param String $iv
//
//
//
//mds_rem function using by the twofish cipher algorithm
//
//@access private
//@param String $A
//@param String $B
//@return Array
//
//
//
//Creates performance-optimized function for de/encrypt(), storing it in $this->inline_crypt
//
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
class Crypt_Twofish {
    constructor() {
        this.key = "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0";
        this.continuousBuffer = false;
        this.padding = true;
        this.iv = "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0";
        this.encryptIV = "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0";
        this.decryptIV = "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0";
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
        this.q0 = [169, 103, 179, 232, 4, 253, 163, 118, 154, 146, 128, 120, 228, 221, 209, 56, 13, 198, 53, 152, 24, 247, 236, 108, 67, 117, 55, 38, 250, 19, 148, 72, 242, 208, 139, 48, 132, 84, 223, 35, 25, 91, 61, 89, 243, 174, 162, 130, 99, 1, 131, 46, 217, 81, 155, 124, 166, 235, 165, 190, 22, 12, 227, 97, 192, 140, 58, 245, 115, 44, 37, 11, 187, 78, 137, 107, 83, 106, 180, 241, 225, 230, 189, 69, 226, 244, 182, 102, 204, 149, 3, 86, 212, 28, 30, 215, 251, 195, 142, 181, 233, 207, 191, 186, 234, 119, 57, 175, 51, 201, 98, 113, 129, 121, 9, 173, 36, 205, 249, 216, 229, 197, 185, 77, 68, 8, 134, 231, 161, 29, 170, 237, 6, 112, 178, 210, 65, 123, 160, 17, 49, 194, 39, 144, 32, 246, 96, 255, 150, 92, 177, 171, 158, 156, 82, 27, 95, 147, 10, 239, 145, 133, 73, 238, 45, 79, 143, 59, 71, 135, 109, 70, 214, 62, 105, 100, 42, 206, 203, 47, 252, 151, 5, 122, 172, 127, 213, 26, 75, 14, 167, 90, 40, 20, 63, 41, 136, 60, 76, 2, 184, 218, 176, 23, 85, 31, 138, 125, 87, 199, 141, 116, 183, 196, 159, 114, 126, 21, 34, 18, 88, 7, 153, 52, 110, 80, 222, 104, 101, 188, 219, 248, 200, 168, 43, 64, 220, 254, 50, 164, 202, 16, 33, 240, 211, 93, 15, 0, 111, 157, 54, 66, 74, 94, 193, 224];
        this.q1 = [117, 243, 198, 244, 219, 123, 251, 200, 74, 211, 230, 107, 69, 125, 232, 75, 214, 50, 216, 253, 55, 113, 241, 225, 48, 15, 248, 27, 135, 250, 6, 63, 94, 186, 174, 91, 138, 0, 188, 157, 109, 193, 177, 14, 128, 93, 210, 213, 160, 132, 7, 20, 181, 144, 44, 163, 178, 115, 76, 84, 146, 116, 54, 81, 56, 176, 189, 90, 252, 96, 98, 150, 108, 66, 247, 16, 124, 40, 39, 140, 19, 149, 156, 199, 36, 70, 59, 112, 202, 227, 133, 203, 17, 208, 147, 184, 166, 131, 32, 255, 159, 119, 195, 204, 3, 111, 8, 191, 64, 231, 43, 226, 121, 12, 170, 130, 65, 58, 234, 185, 228, 154, 164, 151, 126, 218, 122, 23, 102, 148, 161, 29, 61, 240, 222, 179, 11, 114, 167, 28, 239, 209, 83, 62, 143, 51, 38, 95, 236, 118, 42, 73, 129, 136, 238, 33, 196, 26, 235, 217, 197, 57, 153, 205, 173, 49, 139, 1, 24, 35, 221, 31, 78, 45, 249, 72, 79, 242, 101, 142, 120, 92, 88, 25, 141, 229, 152, 87, 103, 127, 5, 100, 175, 99, 182, 254, 245, 183, 60, 165, 206, 233, 104, 68, 224, 77, 67, 105, 41, 46, 172, 21, 89, 168, 10, 158, 110, 71, 223, 52, 53, 106, 207, 220, 34, 201, 192, 155, 137, 212, 237, 171, 18, 162, 13, 82, 187, 2, 47, 169, 215, 97, 30, 180, 80, 4, 246, 194, 22, 37, 134, 86, 85, 9, 190, 145];
        this.m0 = [3166450293, 3974898163, 538985414, 3014904308, 3671720923, 33721211, 3806473211, 2661219016, 3385453642, 3570665939, 404253670, 505323371, 2560101957, 2998024317, 2795950824, 640071499, 1010587606, 2475919922, 2189618904, 1381144829, 2071712823, 3149608817, 1532729329, 1195869153, 606354480, 1364320783, 3132802808, 1246425883, 3216984199, 218984698, 2964370182, 1970658879, 3537042782, 2105352378, 1717973422, 976921435, 1499012234, 0, 3452801980, 437969053, 2930650221, 2139073473, 724289457, 3200170254, 3772817536, 2324303965, 993743570, 1684323029, 3638069408, 3890718084, 1600120839, 454758676, 741130933, 4244419728, 825304876, 2155898275, 1936927410, 202146163, 2037997388, 1802191188, 1263207058, 1397975412, 2492763958, 2206408529, 707409464, 3301219504, 572704957, 3587569754, 3183330300, 1212708960, 4294954594, 1280051094, 1094809452, 3351766594, 3958056183, 471602192, 1566401404, 909517352, 1734852647, 3924406156, 1145370899, 336915093, 4126522268, 3486456007, 1061104932, 3233866566, 1920129851, 1414818928, 690572490, 4042274275, 134807173, 3334870987, 4092808977, 2358043856, 2762234259, 3402274488, 1751661478, 3099086211, 943204384, 3857002239, 2913818271, 185304183, 3368558019, 2577006540, 1482222851, 421108335, 235801096, 2509602495, 1886408768, 4160172263, 1852755755, 522153698, 3048553849, 151588620, 1633760426, 1465325186, 2678000449, 2644344890, 286352618, 623234489, 2947538404, 1162152090, 3755969956, 2745392279, 3941258622, 892688602, 3991785594, 1128528919, 4177054566, 4227576212, 926405537, 4210704413, 3267520573, 3031747824, 842161630, 2627498419, 1448535819, 3823360626, 2273796263, 353704732, 4193860335, 1667481553, 875866451, 2593817918, 2981184143, 2088554803, 2290653990, 1027450463, 2711738348, 3840204662, 2172752938, 2442199369, 252705665, 4008618632, 370565614, 3621221153, 2543318468, 2779097114, 4278075371, 1835906521, 2021174981, 3318050105, 488498585, 1987486925, 1044307117, 3419105073, 3065399179, 4025441025, 303177240, 1616954659, 1785376989, 1296954911, 3469666638, 3739122733, 1431674361, 2122209864, 555856463, 50559730, 2694850149, 1583225230, 1515873912, 1701137244, 1650609752, 4261233945, 101119117, 1077970661, 4075994776, 859024471, 387420263, 84250239, 3907542533, 1330609508, 2307484335, 269522275, 1953771446, 168457726, 1549570805, 2610656439, 757936956, 808507045, 774785486, 1229556201, 1179021928, 2004309316, 2829637856, 2526413901, 673758531, 2846435689, 3654908201, 2256965934, 3520169900, 4109650453, 2374833497, 3604382376, 3115957258, 1111625118, 4143366510, 791656519, 3722249951, 589510964, 3435946549, 4059153514, 3250655951, 2240146396, 2408554018, 1903272393, 2425417920, 2863289243, 16904585, 2341200340, 1313770733, 2391699371, 2880152082, 1869561506, 3873854477, 3688624722, 2459073467, 3082270210, 1768540719, 960092585, 3553823959, 2812748641, 2728570142, 3284375988, 1819034704, 117900548, 67403766, 656885442, 2896996118, 3503322661, 1347425158, 3705468758, 2223250005, 3789639945, 2054825406, 320073617];
        this.m1 = [2849585465, 1737496343, 3010567324, 3906119334, 67438343, 4254618194, 2741338240, 1994384612, 2584233285, 2449623883, 2158026976, 2019973722, 3839733679, 3719326314, 3518980963, 943073834, 223667942, 3326287904, 895667404, 2562650866, 404623890, 4146392043, 3973554593, 1819754817, 1136470056, 1966259388, 936672123, 647727240, 4201647373, 335103044, 2494692347, 1213890174, 4068082435, 3504639116, 2336732854, 809247780, 2225465319, 1413573483, 3741769181, 600137824, 424017405, 1537423930, 1030275778, 1494584717, 4079086828, 2922473062, 2722000751, 2182502231, 1670713360, 22802415, 2202908856, 781289094, 3652545901, 1361019779, 2605951658, 2086886749, 2788911208, 3946839806, 2782277680, 3190127226, 380087468, 202311945, 3811963120, 1629726631, 3236991120, 2360338921, 981507485, 4120009820, 1937837068, 740766001, 628543696, 199710294, 3145437842, 1323945678, 2314273025, 1805590046, 1403597876, 1791291889, 3029976003, 4053228379, 3783477063, 3865778200, 3184009762, 1158584472, 3798867743, 4106859443, 3056563316, 1724643576, 3439303065, 2515145748, 65886296, 1459084508, 3571551115, 471536917, 514695842, 3607942099, 4213957346, 3273509064, 2384027230, 3049401388, 3918088521, 3474112961, 3212744085, 3122691453, 3932426513, 2005142283, 963495365, 2942994825, 869366908, 3382800753, 1657733119, 1899477947, 2180714255, 2034087349, 156361185, 2916892222, 606945087, 3450107510, 4187837781, 3639509634, 3850780736, 3316545656, 3117229349, 1292146326, 1146451831, 134876686, 2249412688, 3878746103, 2714974007, 490797818, 2855559521, 3985395278, 112439472, 1886147668, 2989126515, 3528604475, 1091280799, 2072707586, 2693322968, 290452467, 828885963, 3259377447, 666920807, 2427780348, 539506744, 4135519236, 1618495560, 4281263589, 2517060684, 1548445029, 2982619947, 2876214926, 2651669058, 2629563893, 1391647707, 468929098, 1604730173, 2472125604, 180140473, 4013619705, 2448364307, 2248017928, 1224839569, 3999340054, 763158238, 1337073953, 2403512753, 1004237426, 1203253039, 2269691839, 1831644846, 1189331136, 3596041276, 1048943258, 1764338089, 1685933903, 714375553, 3460902446, 3407333062, 801794409, 4240686525, 2539430819, 90106088, 2060512749, 2894582225, 2140013829, 3585762404, 447260069, 1270294054, 247054014, 2808121223, 1526257109, 673330742, 336665371, 1071543669, 695851481, 2292903662, 1009986861, 1281325433, 45529015, 3096890058, 3663213877, 2963064004, 402408259, 1427801220, 536235341, 2317113689, 2100867762, 1470903091, 3340292047, 2381579782, 1953059667, 3077872539, 3304429463, 2673257901, 1926947811, 2127948522, 357233908, 580816783, 312650667, 1481532002, 132669279, 2581929245, 876159779, 1858205430, 1346661484, 3730649650, 1752319558, 1697030304, 3163803085, 3674462938, 4173773498, 3371867806, 2827146966, 735014510, 1079013488, 3706422661, 4269083146, 847942547, 2760761311, 3393988905, 269753372, 561240023, 4039947444, 3540636884, 1561365130, 266490193, 0, 1872369945, 2648709658, 915379348, 1122420679, 1257032137, 1593692882, 3249241983, 3772295336];
        this.m2 = [3161832498, 3975408673, 549855299, 3019158473, 3671841283, 41616011, 3808158251, 2663948026, 3377121772, 3570652169, 417732715, 510336671, 2554697742, 2994582072, 2800264914, 642459319, 1020673111, 2469565322, 2195227374, 1392333464, 2067233748, 3144792887, 1542544279, 1205946243, 607134780, 1359958498, 3136862918, 1243302643, 3213344584, 234491248, 2953228467, 1967093214, 3529429757, 2109373728, 1722705457, 979057315, 1502239004, 0, 3451702675, 446503648, 2926423596, 2143387563, 733031367, 3188637369, 3766542496, 2321386000, 1003633490, 1691706554, 3634419848, 3884246949, 1594318824, 454302481, 750070978, 4237360308, 824979751, 2158198885, 1941074730, 208866433, 2035054943, 1800694593, 1267878658, 1400132457, 2486604943, 2203157279, 708323894, 3299919004, 582820552, 3579500024, 3187457475, 1214269560, 4284678094, 1284918279, 1097613687, 3343042534, 3958893348, 470817812, 1568431459, 908604962, 1730635712, 3918326191, 1142113529, 345314538, 4120704443, 3485978392, 1059340077, 3225862371, 1916498651, 1416647788, 701114700, 4041470005, 142936318, 3335243287, 4078039887, 2362477796, 2761139289, 3401108118, 1755736123, 3095640141, 941635624, 3858752814, 2912922966, 192351108, 3368273949, 2580322815, 1476614381, 426711450, 235408906, 2512360830, 1883271248, 4159174448, 1848340175, 534912878, 3044652349, 151783695, 1638555956, 1468159766, 2671877899, 2637864320, 300552548, 632890829, 2951000029, 1167738120, 3752124301, 2744623964, 3934186197, 903492952, 3984256464, 1125598204, 4167497931, 4220844977, 933312467, 4196268608, 3258827368, 3035673804, 853422685, 2629016689, 1443583719, 3815957466, 2275903328, 354161947, 4193253690, 1674666943, 877868201, 2587794053, 2978984258, 2083749073, 2284226715, 1029651878, 2716639703, 3832997087, 2167046548, 2437517569, 260116475, 4001951402, 384702049, 3609319283, 2546243573, 2769986984, 4276878911, 1842965941, 2026207406, 3308897645, 496573925, 1993176740, 1051541212, 3409038183, 3062609479, 4009881435, 303567390, 1612931269, 1792895664, 1293897206, 3461271273, 3727548028, 1442403741, 2118680154, 558834098, 66192250, 2691014694, 1586388505, 1517836902, 1700554059, 1649959502, 4246338885, 109905652, 1088766086, 4070109886, 861352876, 392632208, 92210574, 3892701278, 1331974013, 2309982570, 274927765, 1958114351, 184420981, 1559583890, 2612501364, 758918451, 816132310, 785264201, 1240025481, 1181238898, 2000975701, 2833295576, 2521667076, 675489981, 2842274089, 3643398521, 2251196049, 3517763975, 4095079498, 2371456277, 3601389186, 3104487868, 1117667853, 4134467265, 793194424, 3722435846, 590619449, 3426077794, 4050317764, 3251618066, 2245821931, 2401406878, 1909027233, 2428539120, 2862328403, 25756145, 2345962465, 1324174988, 2393607791, 2870127522, 1872916286, 3859670612, 3679640562, 2461766267, 3070408630, 1764714954, 967391705, 3554136844, 2808194851, 2719916717, 3283403673, 1817209924, 117704453, 83231871, 667035462, 2887167143, 3492139126, 1350979603, 3696680183, 2220196890, 3775521105, 2059303461, 328274927];
        this.m3 = [3644434905, 2417452944, 1906094961, 3534153938, 84345861, 2555575704, 1702929253, 3756291807, 138779144, 38507010, 2699067552, 1717205094, 3719292125, 2959793584, 3210990015, 908736566, 1424362836, 1126221379, 1657550178, 3203569854, 504502302, 619444004, 3617713367, 2000776311, 3173532605, 851211570, 3564845012, 2609391259, 1879964272, 4181988345, 2986054833, 1518225498, 2047079034, 3834433764, 1203145543, 1009004604, 2783413413, 1097552961, 115203846, 3311412165, 1174214981, 2738510755, 1757560168, 361584917, 569176865, 828812849, 1047503422, 374833686, 2500879253, 1542390107, 1303937869, 2441490065, 3043875253, 528699679, 1403689811, 1667071075, 996714043, 1073670975, 3593512406, 628801061, 2813073063, 252251151, 904979253, 598171939, 4036018416, 2951318703, 2157787776, 2455565714, 2165076865, 657533991, 1993352566, 3881176039, 2073213819, 3922611945, 4043409905, 2669570975, 2838778793, 3304155844, 2579739801, 2539385239, 2202526083, 1796793963, 3357720008, 244860174, 1847583342, 3384014025, 796177967, 3422054091, 4288269567, 3927217642, 3981968365, 4158412535, 3784037601, 454368283, 2913083053, 215209740, 736295723, 499696413, 425627161, 3257710018, 2303322505, 314691346, 2123743102, 545110560, 1678895716, 2215344004, 1841641837, 1787408234, 3514577873, 2708588961, 3472843470, 935031095, 4212097531, 1035303229, 1373702481, 3695095260, 759112749, 2759249316, 2639657373, 4001552622, 2252400006, 2927150510, 3441801677, 76958980, 1433879637, 168691722, 324044307, 821552944, 3543638483, 1090133312, 878815796, 2353982860, 3014657715, 1817473132, 712225322, 1379652178, 194986251, 2332195723, 2295898248, 1341329743, 1741369703, 1177010758, 3227985856, 3036450996, 674766888, 2131031679, 2018009208, 786825006, 122459655, 1264933963, 3341529543, 1871620975, 222469645, 3153435835, 4074459890, 4081720307, 2789040038, 1503957849, 3166243516, 989458234, 4011037167, 4261971454, 26298625, 1628892769, 2094935420, 2988527538, 1118932802, 3681696731, 3090106296, 1220511560, 749628716, 3821029091, 1463604823, 2241478277, 698968361, 2102355069, 2491493012, 1227804233, 398904087, 3395891146, 3284008131, 1554224988, 1592264030, 3505224400, 2278665351, 2382725006, 3127170490, 2829392552, 3072740279, 3116240569, 1619502944, 4174732024, 573974562, 286987281, 3732226014, 2044275065, 2867759274, 858602547, 1601784927, 3065447094, 2529867926, 1479924312, 2630135964, 4232255484, 444880154, 4132249590, 475630108, 951221560, 2889045932, 416270104, 4094070260, 1767076969, 1956362100, 4120364277, 1454219094, 3672339162, 3588914901, 1257510218, 2660180638, 2729120418, 1315067982, 3898542056, 3843922405, 958608441, 3254152897, 1147949124, 1563614813, 1917216882, 648045862, 2479733907, 64674563, 3334142150, 4204710138, 2195105922, 3480103887, 1349533776, 3951418603, 1963654773, 2324902538, 2380244109, 1277807180, 337383444, 1943478643, 3434410188, 164942601, 277503248, 3796963298, 0, 2585358234, 3759840736, 2408855183, 3871818470, 3972614892, 4258422525, 2877276587, 3634946264];
        this.K = Array();
        this.S0 = Array();
        this.S1 = Array();
        this.S2 = Array();
        this.S3 = Array();
    }

    Crypt_Twofish(mode = CRYPT_TWOFISH_MODE_CBC) {
        if (!("undefined" !== typeof CRYPT_TWOFISH_MODE)) {
            switch (true) {
                case extension_loaded("mcrypt") && -1 !== mcrypt_list_algorithms().indexOf("twofish"):
                    global.CRYPT_TWOFISH_MODE = CRYPT_TWOFISH_MODE_MCRYPT;
                    break;

                default:
                    global.CRYPT_TWOFISH_MODE = CRYPT_TWOFISH_MODE_INTERNAL;
            }
        }

        switch (CRYPT_TWOFISH_MODE) {
            case CRYPT_TWOFISH_MODE_MCRYPT:
                switch (mode) {
                    case CRYPT_TWOFISH_MODE_ECB:
                        this.paddable = true;
                        this.mode = MCRYPT_MODE_ECB;
                        break;

                    case CRYPT_TWOFISH_MODE_CTR:
                        this.mode = "ctr";
                        break;

                    case CRYPT_TWOFISH_MODE_CFB:
                        this.mode = "ncfb";
                        this.ecb = mcrypt_module_open(MCRYPT_TWOFISH, "", MCRYPT_MODE_ECB, "");
                        break;

                    case CRYPT_TWOFISH_MODE_OFB:
                        this.mode = MCRYPT_MODE_NOFB;
                        break;

                    case CRYPT_TWOFISH_MODE_CBC:
                    default:
                        this.paddable = true;
                        this.mode = MCRYPT_MODE_CBC;
                }

                this.enmcrypt = mcrypt_module_open(MCRYPT_TWOFISH, "", this.mode, "");
                this.demcrypt = mcrypt_module_open(MCRYPT_TWOFISH, "", this.mode, "");
                break;

            default:
                switch (mode) {
                    case CRYPT_TWOFISH_MODE_ECB:
                    case CRYPT_TWOFISH_MODE_CBC:
                        this.paddable = true;
                        this.mode = mode;
                        break;

                    case CRYPT_TWOFISH_MODE_CTR:
                    case CRYPT_TWOFISH_MODE_CFB:
                    case CRYPT_TWOFISH_MODE_OFB:
                        this.mode = mode;
                        break;

                    default:
                        this.paddable = true;
                        this.mode = CRYPT_TWOFISH_MODE_CBC;
                }

                this.inline_crypt_setup();
        }
    }

    setKey(key) {
        var keylength = key.length;

        switch (true) {
            case keylength <= 16:
                key += str_repeat("\\0", 16 - keylength);
                break;

            case keylength <= 24:
                key += str_repeat("\\0", 24 - keylength);
                break;

            case keylength <= 32:
                key += str_repeat("\\0", 32 - keylength);
                break;

            default:
                key = key.substr(0, 32);
        }

        this.key = key;
        this.enchanged = true;
        this.dechanged = true;

        if (CRYPT_TWOFISH_MODE == CRYPT_TWOFISH_MODE_MCRYPT) {
            return;
        }

        var le_longs = unpack("V*", key);
        key = unpack("C*", key);
        var m0 = this.m0;
        var m1 = this.m1;
        var m2 = this.m2;
        var m3 = this.m3;
        var q0 = this.q0;
        var q1 = this.q1;
        var K = S0 = S1 = S2 = S3 = Array();

        switch (this.key.length) {
            case 16:
                var s7, s6, s5, s4, s3, s2, s1, s0, i, j;
                [s7, s6, s5, s4] = this.mds_rem(le_longs[1], le_longs[2]);
                [s3, s2, s1, s0] = this.mds_rem(le_longs[3], le_longs[4]);

                for (i = 0, j = 1; i < 40; i += 2, j += 2) {
                    var A = m0[q0[q0[i] ^ key[9]] ^ key[1]] ^ m1[q0[q1[i] ^ key[10]] ^ key[2]] ^ m2[q1[q0[i] ^ key[11]] ^ key[3]] ^ m3[q1[q1[i] ^ key[12]] ^ key[4]];
                    var B = m0[q0[q0[j] ^ key[13]] ^ key[5]] ^ m1[q0[q1[j] ^ key[14]] ^ key[6]] ^ m2[q1[q0[j] ^ key[15]] ^ key[7]] ^ m3[q1[q1[j] ^ key[16]] ^ key[8]];
                    B = B << 8 | B >> 24 & 255;
                    K.push(A += B);
                    K.push((A += B) << 9 | A >> 23 & 511);
                }

                for (i = 0;; i < 256; ++i) {
                    S0[i] = m0[q0[q0[i] ^ s4] ^ s0];
                    S1[i] = m1[q0[q1[i] ^ s5] ^ s1];
                    S2[i] = m2[q1[q0[i] ^ s6] ^ s2];
                    S3[i] = m3[q1[q1[i] ^ s7] ^ s3];
                }

                break;

            case 24:
                var sb, sa, s9, s8;
                [sb, sa, s9, s8] = this.mds_rem(le_longs[1], le_longs[2]);
                [s7, s6, s5, s4] = this.mds_rem(le_longs[3], le_longs[4]);
                [s3, s2, s1, s0] = this.mds_rem(le_longs[5], le_longs[6]);

                for (i = 0, j = 1; i < 40; i += 2, j += 2) {
                    A = m0[q0[q0[q1[i] ^ key[17]] ^ key[9]] ^ key[1]] ^ m1[q0[q1[q1[i] ^ key[18]] ^ key[10]] ^ key[2]] ^ m2[q1[q0[q0[i] ^ key[19]] ^ key[11]] ^ key[3]] ^ m3[q1[q1[q0[i] ^ key[20]] ^ key[12]] ^ key[4]];
                    B = m0[q0[q0[q1[j] ^ key[21]] ^ key[13]] ^ key[5]] ^ m1[q0[q1[q1[j] ^ key[22]] ^ key[14]] ^ key[6]] ^ m2[q1[q0[q0[j] ^ key[23]] ^ key[15]] ^ key[7]] ^ m3[q1[q1[q0[j] ^ key[24]] ^ key[16]] ^ key[8]];
                    B = B << 8 | B >> 24 & 255;
                    K.push(A += B);
                    K.push((A += B) << 9 | A >> 23 & 511);
                }

                for (i = 0;; i < 256; ++i) {
                    S0[i] = m0[q0[q0[q1[i] ^ s8] ^ s4] ^ s0];
                    S1[i] = m1[q0[q1[q1[i] ^ s9] ^ s5] ^ s1];
                    S2[i] = m2[q1[q0[q0[i] ^ sa] ^ s6] ^ s2];
                    S3[i] = m3[q1[q1[q0[i] ^ sb] ^ s7] ^ s3];
                }

                break;

            default:
                var sf, se, sd, sc;
                [sf, se, sd, sc] = this.mds_rem(le_longs[1], le_longs[2]);
                [sb, sa, s9, s8] = this.mds_rem(le_longs[3], le_longs[4]);
                [s7, s6, s5, s4] = this.mds_rem(le_longs[5], le_longs[6]);
                [s3, s2, s1, s0] = this.mds_rem(le_longs[7], le_longs[8]);

                for (i = 0, j = 1; i < 40; i += 2, j += 2) {
                    A = m0[q0[q0[q1[q1[i] ^ key[25]] ^ key[17]] ^ key[9]] ^ key[1]] ^ m1[q0[q1[q1[q0[i] ^ key[26]] ^ key[18]] ^ key[10]] ^ key[2]] ^ m2[q1[q0[q0[q0[i] ^ key[27]] ^ key[19]] ^ key[11]] ^ key[3]] ^ m3[q1[q1[q0[q1[i] ^ key[28]] ^ key[20]] ^ key[12]] ^ key[4]];
                    B = m0[q0[q0[q1[q1[j] ^ key[29]] ^ key[21]] ^ key[13]] ^ key[5]] ^ m1[q0[q1[q1[q0[j] ^ key[30]] ^ key[22]] ^ key[14]] ^ key[6]] ^ m2[q1[q0[q0[q0[j] ^ key[31]] ^ key[23]] ^ key[15]] ^ key[7]] ^ m3[q1[q1[q0[q1[j] ^ key[32]] ^ key[24]] ^ key[16]] ^ key[8]];
                    B = B << 8 | B >> 24 & 255;
                    K.push(A += B);
                    K.push((A += B) << 9 | A >> 23 & 511);
                }

                for (i = 0;; i < 256; ++i) {
                    S0[i] = m0[q0[q0[q1[q1[i] ^ sc] ^ s8] ^ s4] ^ s0];
                    S1[i] = m1[q0[q1[q1[q0[i] ^ sd] ^ s9] ^ s5] ^ s1];
                    S2[i] = m2[q1[q0[q0[q0[i] ^ se] ^ sa] ^ s6] ^ s2];
                    S3[i] = m3[q1[q1[q0[q1[i] ^ sf] ^ sb] ^ s7] ^ s3];
                }

        }

        this.K = K;
        this.S0 = S0;
        this.S1 = S1;
        this.S2 = S2;
        this.S3 = S3;
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

                while (key.length < 32) {
                    var u;
                    var hmac = new Crypt_Hash();
                    hmac.setHash(hash);
                    hmac.setKey(password);
                    var f = u = hmac.hash(salt + pack("N", i++));

                    for (var j = 2; j <= count; ++j) {
                        u = hmac.hash(u);
                        f ^= u;
                    }

                    key += f;
                }

        }

        this.setKey(key);
    }

    setIV(iv) {
        this.encryptIV = this.decryptIV = this.iv = str_pad(iv.substr(0, 16), 16, String.fromCharCode(0));
        this.enchanged = true;
        this.dechanged = true;
    }

    encrypt(plaintext) {
        if (CRYPT_TWOFISH_MODE == CRYPT_TWOFISH_MODE_MCRYPT) {
            if (this.paddable) {
                plaintext = this._pad(plaintext);
            }

            if (this.enchanged) {
                mcrypt_generic_init(this.enmcrypt, this.key, this.encryptIV);

                if (this.mode == "ncfb") {
                    mcrypt_generic_init(this.ecb, this.key, "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0");
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
                    if (this.enbuffer.enmcrypt_init === false || len > 600) {
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

            if (!this.continuousBuffer) {
                mcrypt_generic_init(this.enmcrypt, this.key, this.encryptIV);
            }

            return ciphertext;
        }

        if (!this.K) {
            this.setKey(this.key);
        }

        var inline = this.inline_crypt;
        return inline("encrypt", this, plaintext);
    }

    decrypt(ciphertext) {
        if (CRYPT_TWOFISH_MODE == CRYPT_TWOFISH_MODE_MCRYPT) {
            if (this.paddable) //we pad with chr(0) since that's what mcrypt_generic does.  to quote from http://php.net/function.mcrypt-generic :
                //"The data is padded with "\0" to make sure the length of the data is n * blocksize."
                {
                    ciphertext = str_pad(ciphertext, ciphertext.length + (16 - ciphertext.length % 16) % 16, String.fromCharCode(0));
                }

            if (this.dechanged) {
                mcrypt_generic_init(this.demcrypt, this.key, this.decryptIV);

                if (this.mode == "ncfb") {
                    mcrypt_generic_init(this.ecb, this.key, "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0");
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

            if (!this.continuousBuffer) {
                mcrypt_generic_init(this.demcrypt, this.key, this.decryptIV);
            }

            return this.paddable ? this._unpad(plaintext) : plaintext;
        }

        if (!this.K) {
            this.setKey(this.key);
        }

        var inline = this.inline_crypt;
        return inline("decrypt", this, ciphertext);
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

        if (CRYPT_TWOFISH_MODE == CRYPT_TWOFISH_MODE_MCRYPT) {
            mcrypt_generic_init(this.enmcrypt, this.key, this.iv);
            mcrypt_generic_init(this.demcrypt, this.key, this.iv);
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
            if (length % 16 == 0) {
                return text;
            } else {
                user_error(`The plaintext's length (${length}) is not a multiple of the block size (16)`);
                this.padding = true;
            }
        }

        var pad = 16 - length % 16;
        return str_pad(text, length + pad, String.fromCharCode(pad));
    }

    _unpad(text) {
        if (!this.padding) {
            return text;
        }

        var length = text.charCodeAt(text.length - 1);

        if (!length || length > 16) {
            return false;
        }

        return text.substr(0, -length);
    }

    _string_shift(string) {
        var substr = substr(string, 0, 16);
        string = substr(string, 16);
        return substr;
    }

    _generate_xor(iv) {
        var xor = iv;

        for (var j = 4; j <= 16; j += 4) {
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

    mds_rem(A, B) //No gain by unrolling this loop.
    {
        for (var i = 0; i < 8; ++i) //Get most significant coefficient.
        //Shift the others up.
        //Subtract the modular polynomial on overflow.
        //Form u = a*t + t/a = t*(a + 1/a).
        //Add the modular polynomial on underflow.
        {
            var t = 255 & B >> 24;
            B = B << 8 | 255 & A >> 24;
            A <<= 8;
            var u = t << 1;

            if (t & 128) {
                u ^= 333;
            }

            B ^= t ^ u << 16;
            u ^= 2147483647 & t >> 1;
            if (t & 1) u ^= 166;
            B ^= u << 24 | u << 8;
        }

        return [255 & B >> 24, 255 & B >> 16, 255 & B >> 8, 255 & B];
    }

    inline_crypt_setup() {
        var lambda_functions = Crypt_Twofish.get_lambda_functions();
        var block_size = 16;
        var mode = this.mode;
        var code_hash = `${mode}`;

        if (!(undefined !== lambda_functions[code_hash])) //Generating encrypt code:
            //Generating decrypt code:
            //Generating mode of operation code:
            {
                var ki, i;
                var init_cryptBlock = "\r\n                $S0 = $self->S0;\r\n                $S1 = $self->S1;\r\n                $S2 = $self->S2;\r\n                $S3 = $self->S3;\r\n                extract($self->K,  EXTR_PREFIX_ALL, \"K\");\r\n            ";
                var _encryptBlock = "\r\n                $in = unpack(\"V4\", $in);\r\n                $R0 = $K_0 ^ $in[1];\r\n                $R1 = $K_1 ^ $in[2];\r\n                $R2 = $K_2 ^ $in[3];\r\n                $R3 = $K_3 ^ $in[4];\r\n            ";

                for (ki = 7, i = 0; i < 8; ++i) {
                    _encryptBlock += "\r\n                    $t0 = $S0[ $R0        & 0xff] ^\r\n                          $S1[($R0 >>  8) & 0xff] ^\r\n                          $S2[($R0 >> 16) & 0xff] ^\r\n                          $S3[($R0 >> 24) & 0xff];\r\n                    $t1 = $S0[($R1 >> 24) & 0xff] ^\r\n                          $S1[ $R1        & 0xff] ^\r\n                          $S2[($R1 >>  8) & 0xff] ^\r\n                          $S3[($R1 >> 16) & 0xff];\r\n                    $R2^= ($t0 + $t1 + $K_" + ++ki + ");\r\n                    $R2 = ($R2 >> 1 & 0x7fffffff) | ($R2 << 31);\r\n                    $R3 = ((($R3 >> 31) & 1) | ($R3 << 1)) ^ ($t0 + ($t1 << 1) + $K_" + ++ki + ");\r\n\r\n                    $t0 = $S0[ $R2        & 0xff] ^\r\n                          $S1[($R2 >>  8) & 0xff] ^\r\n                          $S2[($R2 >> 16) & 0xff] ^\r\n                          $S3[($R2 >> 24) & 0xff];\r\n                    $t1 = $S0[($R3 >> 24) & 0xff] ^\r\n                          $S1[ $R3        & 0xff] ^\r\n                          $S2[($R3 >>  8) & 0xff] ^\r\n                          $S3[($R3 >> 16) & 0xff];\r\n                    $R0^= ($t0 + $t1 + $K_" + ++ki + ");\r\n                    $R0 = ($R0 >> 1 & 0x7fffffff) | ($R0 << 31);\r\n                    $R1 = ((($R1 >> 31) & 1) | ($R1 << 1)) ^ ($t0 + ($t1 << 1) + $K_" + ++ki + ");\r\n                ";
                }

                _encryptBlock += "\r\n                $in = pack(\"V4\", $K_4 ^ $R2,\r\n                                 $K_5 ^ $R3,\r\n                                 $K_6 ^ $R0,\r\n                                 $K_7 ^ $R1);\r\n            ";
                var _decryptBlock = "\r\n                $in = unpack(\"V4\", $in);\r\n                $R0 = $K_4 ^ $in[1];\r\n                $R1 = $K_5 ^ $in[2];\r\n                $R2 = $K_6 ^ $in[3];\r\n                $R3 = $K_7 ^ $in[4];\r\n            ";

                for (ki = 40, i = 0; i < 8; ++i) {
                    _decryptBlock += "\r\n                    $t0 = $S0[$R0       & 0xff] ^\r\n                          $S1[$R0 >>  8 & 0xff] ^\r\n                          $S2[$R0 >> 16 & 0xff] ^\r\n                          $S3[$R0 >> 24 & 0xff];\r\n                    $t1 = $S0[$R1 >> 24 & 0xff] ^\r\n                          $S1[$R1       & 0xff] ^\r\n                          $S2[$R1 >>  8 & 0xff] ^\r\n                          $S3[$R1 >> 16 & 0xff];\r\n                    $R3^= $t0 + ($t1 << 1) + $K_" + --ki + ";\r\n                    $R3 = $R3 >> 1 & 0x7fffffff | $R3 << 31;\r\n                    $R2 = ($R2 >> 31 & 0x1 | $R2 << 1) ^ ($t0 + $t1 + $K_" + --ki + ");\r\n\r\n                    $t0 = $S0[$R2       & 0xff] ^\r\n                          $S1[$R2 >>  8 & 0xff] ^\r\n                          $S2[$R2 >> 16 & 0xff] ^\r\n                          $S3[$R2 >> 24 & 0xff];\r\n                    $t1 = $S0[$R3 >> 24 & 0xff] ^\r\n                          $S1[$R3       & 0xff] ^\r\n                          $S2[$R3 >>  8 & 0xff] ^\r\n                          $S3[$R3 >> 16 & 0xff];\r\n                    $R1^= $t0 + ($t1 << 1) + $K_" + --ki + ";\r\n                    $R1 = $R1 >> 1 & 0x7fffffff | $R1 << 31;\r\n                    $R0 = ($R0 >> 31 & 0x1 | $R0 << 1) ^ ($t0 + $t1 + $K_" + --ki + ");\r\n                ";
                }

                _decryptBlock += "\r\n                $in = pack(\"V4\", $K_0 ^ $R2,\r\n                                 $K_1 ^ $R3,\r\n                                 $K_2 ^ $R0,\r\n                                 $K_3 ^ $R1);\r\n            ";

                switch (mode) {
                    case CRYPT_TWOFISH_MODE_ECB:
                        var encrypt = "\r\n                        $ciphertext = \"\";\r\n                        $text = $self->_pad($text);\r\n                        $plaintext_len = strlen($text);\r\n\r\n                        for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ");\r\n                            " + _encryptBlock + "\r\n                            $ciphertext.= $in;\r\n                        }\r\n\r\n                        return $ciphertext;\r\n                        ";
                        var decrypt = "\r\n                        $plaintext = \"\";\r\n                        $text = str_pad($text, strlen($text) + (" + block_size + " - strlen($text) % " + block_size + ") % " + block_size + ", chr(0));\r\n                        $ciphertext_len = strlen($text);\r\n\r\n                        for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ");\r\n                            " + _decryptBlock + "\r\n                            $plaintext.= $in;\r\n                        }\r\n\r\n                        return $self->_unpad($plaintext);\r\n                        ";
                        break;

                    case CRYPT_TWOFISH_MODE_CBC:
                        encrypt = "\r\n                        $ciphertext = \"\";\r\n                        $text = $self->_pad($text);\r\n                        $plaintext_len = strlen($text);\r\n\r\n                        $in = $self->encryptIV;\r\n\r\n                        for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ") ^ $in;\r\n                            " + _encryptBlock + "\r\n                            $ciphertext.= $in;\r\n                        }\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $in;\r\n                        }\r\n\r\n                        return $ciphertext;\r\n                        ";
                        decrypt = "\r\n                        $plaintext = \"\";\r\n                        $text = str_pad($text, strlen($text) + (" + block_size + " - strlen($text) % " + block_size + ") % " + block_size + ", chr(0));\r\n                        $ciphertext_len = strlen($text);\r\n\r\n                        $iv = $self->decryptIV;\r\n\r\n                        for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                            $in = $block = substr($text, $i, " + block_size + ");\r\n                            " + _decryptBlock + "\r\n                            $plaintext.= $in ^ $iv;\r\n                            $iv = $block;\r\n                        }\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $iv;\r\n                        }\r\n\r\n                        return $self->_unpad($plaintext);\r\n                        ";
                        break;

                    case CRYPT_TWOFISH_MODE_CTR:
                        encrypt = "\r\n                        $ciphertext = \"\";\r\n                        $plaintext_len = strlen($text);\r\n                        $xor = $self->encryptIV;\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if (strlen($buffer[\"encrypted\"])) {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"encrypted\"])) {\r\n                                    $in = $self->_generate_xor($xor);\r\n                                    " + _encryptBlock + "\r\n                                    $buffer[\"encrypted\"].= $in;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"encrypted\"]);\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                $in = $self->_generate_xor($xor);\r\n                                " + _encryptBlock + "\r\n                                $key = $in;\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $xor;\r\n                            if ($start = $plaintext_len % " + block_size + ") {\r\n                                $buffer[\"encrypted\"] = substr($key, $start) . $buffer[\"encrypted\"];\r\n                            }\r\n                        }\r\n\r\n                        return $ciphertext;\r\n                    ";
                        decrypt = "\r\n                        $plaintext = \"\";\r\n                        $ciphertext_len = strlen($text);\r\n                        $xor = $self->decryptIV;\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if (strlen($buffer[\"ciphertext\"])) {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"ciphertext\"])) {\r\n                                    $in = $self->_generate_xor($xor);\r\n                                    " + _encryptBlock + "\r\n                                    $buffer[\"ciphertext\"].= $in;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"ciphertext\"]);\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                $in = $self->_generate_xor($xor);\r\n                                " + _encryptBlock + "\r\n                                $key = $in;\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $xor;\r\n                            if ($start = $ciphertext_len % " + block_size + ") {\r\n                                $buffer[\"ciphertext\"] = substr($key, $start) . $buffer[\"ciphertext\"];\r\n                            }\r\n                        }\r\n\r\n                        return $plaintext;\r\n                        ";
                        break;

                    case CRYPT_TWOFISH_MODE_CFB:
                        encrypt = "\r\n                        $ciphertext = \"\";\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $iv = &$self->encryptIV;\r\n                            $pos = &$buffer[\"pos\"];\r\n                        } else {\r\n                            $iv = $self->encryptIV;\r\n                            $pos = 0;\r\n                        }\r\n                        $len = strlen($text);\r\n                        $i = 0;\r\n                        if ($pos) {\r\n                            $orig_pos = $pos;\r\n                            $max = " + block_size + " - $pos;\r\n                            if ($len >= $max) {\r\n                                $i = $max;\r\n                                $len-= $max;\r\n                                $pos = 0;\r\n                            } else {\r\n                                $i = $len;\r\n                                $pos+= $len;\r\n                                $len = 0;\r\n                            }\r\n                            $ciphertext = substr($iv, $orig_pos) ^ $text;\r\n                            $iv = substr_replace($iv, $ciphertext, $orig_pos, $i);\r\n                        }\r\n                        while ($len >= " + block_size + ") {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + ";\r\n                            $iv = $in ^ substr($text, $i, " + block_size + ");\r\n                            $ciphertext.= $iv;\r\n                            $len-= " + block_size + ";\r\n                            $i+= " + block_size + ";\r\n                        }\r\n                        if ($len) {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + "\r\n                            $iv = $in;\r\n                            $block = $iv ^ substr($text, $i);\r\n                            $iv = substr_replace($iv, $block, 0, $len);\r\n                            $ciphertext.= $block;\r\n                            $pos = $len;\r\n                        }\r\n                        return $ciphertext;\r\n                    ";
                        decrypt = "\r\n                        $plaintext = \"\";\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $iv = &$self->decryptIV;\r\n                            $pos = &$buffer[\"pos\"];\r\n                        } else {\r\n                            $iv = $self->decryptIV;\r\n                            $pos = 0;\r\n                        }\r\n                        $len = strlen($text);\r\n                        $i = 0;\r\n                        if ($pos) {\r\n                            $orig_pos = $pos;\r\n                            $max = " + block_size + " - $pos;\r\n                            if ($len >= $max) {\r\n                                $i = $max;\r\n                                $len-= $max;\r\n                                $pos = 0;\r\n                            } else {\r\n                                $i = $len;\r\n                                $pos+= $len;\r\n                                $len = 0;\r\n                            }\r\n                            $plaintext = substr($iv, $orig_pos) ^ $text;\r\n                            $iv = substr_replace($iv, substr($text, 0, $i), $orig_pos, $i);\r\n                        }\r\n                        while ($len >= " + block_size + ") {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + "\r\n                            $iv = $in;\r\n                            $cb = substr($text, $i, " + block_size + ");\r\n                            $plaintext.= $iv ^ $cb;\r\n                            $iv = $cb;\r\n                            $len-= " + block_size + ";\r\n                            $i+= " + block_size + ";\r\n                        }\r\n                        if ($len) {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + "\r\n                            $iv = $in;\r\n                            $plaintext.= $iv ^ substr($text, $i);\r\n                            $iv = substr_replace($iv, substr($text, $i), 0, $len);\r\n                            $pos = $len;\r\n                        }\r\n\r\n                        return $plaintext;\r\n                        ";
                        break;

                    case CRYPT_TWOFISH_MODE_OFB:
                        encrypt = "\r\n                        $ciphertext = \"\";\r\n                        $plaintext_len = strlen($text);\r\n                        $xor = $self->encryptIV;\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if (strlen($buffer[\"xor\"])) {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"xor\"])) {\r\n                                    $in = $xor;\r\n                                    " + _encryptBlock + "\r\n                                    $xor = $in;\r\n                                    $buffer[\"xor\"].= $xor;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"xor\"]);\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $in = $xor;\r\n                                " + _encryptBlock + "\r\n                                $xor = $in;\r\n                                $ciphertext.= substr($text, $i, " + block_size + ") ^ $xor;\r\n                            }\r\n                            $key = $xor;\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $xor;\r\n                            if ($start = $plaintext_len % " + block_size + ") {\r\n                                 $buffer[\"xor\"] = substr($key, $start) . $buffer[\"xor\"];\r\n                            }\r\n                        }\r\n                        return $ciphertext;\r\n                        ";
                        decrypt = "\r\n                        $plaintext = \"\";\r\n                        $ciphertext_len = strlen($text);\r\n                        $xor = $self->decryptIV;\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if (strlen($buffer[\"xor\"])) {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"xor\"])) {\r\n                                    $in = $xor;\r\n                                    " + _encryptBlock + "\r\n                                    $xor = $in;\r\n                                    $buffer[\"xor\"].= $xor;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"xor\"]);\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $in = $xor;\r\n                                " + _encryptBlock + "\r\n                                $xor = $in;\r\n                                $plaintext.= substr($text, $i, " + block_size + ") ^ $xor;\r\n                            }\r\n                            $key = $xor;\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $xor;\r\n                            if ($start = $ciphertext_len % " + block_size + ") {\r\n                                 $buffer[\"xor\"] = substr($key, $start) . $buffer[\"xor\"];\r\n                            }\r\n                        }\r\n                        return $plaintext;\r\n                        ";
                        break;
                }

                var fnc_head = "$action, &$self, $text";
                var fnc_body = init_cryptBlock + "if ($action == \"encrypt\") { " + encrypt + " } else { " + decrypt + " }";

                if ("function" === typeof create_function && is_callable("create_function")) {
                    new Function(fnc_head, fnc_body);
                } else {
                    eval("function " + (lambda_functions[code_hash] = "f" + md5(Date.now() / 1000)) + "(" + fnc_head + ") { " + fnc_body + " }");
                }
            }

        this.inline_crypt = lambda_functions[code_hash];
    }

    get_lambda_functions() {
        if (!("_static_Crypt_Twofish_get_lambda_functions_functions" in global)) _static_Crypt_Twofish_get_lambda_functions_functions = Array();
        return _static_Crypt_Twofish_get_lambda_functions_functions;
    }

};
