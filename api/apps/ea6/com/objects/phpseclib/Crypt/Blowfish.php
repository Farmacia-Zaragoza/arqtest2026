//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP implementation of Blowfish.
//
//Uses mcrypt, if available, and an internal implementation, otherwise.
//
//PHP versions 4 and 5
//
//Useful resources are as follows:
//
//- {@link http://en.wikipedia.org/wiki/Blowfish Wikipedia description of Blowfish}
//
//Here's a short example of how to use this library:
//<code>
//<?php
//include('Crypt/Blowfish.php');
//
//$blowfish = new Crypt_Blowfish();
//
//$blowfish->setKey('12345678901234567890123456789012');
//
//$plaintext = str_repeat('a', 1024);
//
//echo $blowfish->decrypt($blowfish->encrypt($plaintext));
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
//@package    Crypt_Blowfish
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
// @see Crypt_Blowfish::encrypt()
// @see Crypt_Blowfish::decrypt()
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
// @see Crypt_Blowfish::Crypt_Blowfish()
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
//Pure-PHP implementation of Blowfish.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@author  Hans-Juergen Petrich <petrich@tronic-media.com>
//@version 1.0
//@access  public
//@package Crypt_Blowfish
//
//
//vim: ts=4:sw=4:et:
//vim6: fdl=1:
const CRYPT_BLOWFISH_MODE_CTR = -1;
const CRYPT_BLOWFISH_MODE_ECB = 1;
const CRYPT_BLOWFISH_MODE_CBC = 2;
const CRYPT_BLOWFISH_MODE_CFB = 3;
const CRYPT_BLOWFISH_MODE_OFB = 4;
const CRYPT_BLOWFISH_MODE_INTERNAL = 1;
const CRYPT_BLOWFISH_MODE_MCRYPT = 2;

//
//The Key as String
//
//@see Crypt_Blowfish::setKey()
//@var Array
//@access private
//
//
//
//The Encryption Mode
//
//@see Crypt_Blowfish::Crypt_Blowfish()
//@var Integer
//@access private
//
//
//
//Continuous Buffer status
//
//@see Crypt_Blowfish::enableContinuousBuffer()
//@var Boolean
//@access private
//
//
//
//Padding status
//
//@see Crypt_Blowfish::enablePadding()
//@var Boolean
//@access private
//
//
//
//The Initialization Vector
//
//@see Crypt_Blowfish::setIV()
//@var String
//@access private
//
//
//
//A "sliding" Initialization Vector
//
//@see Crypt_Blowfish::enableContinuousBuffer()
//@var String
//@access private
//
//
//
//A "sliding" Initialization Vector
//
//@see Crypt_Blowfish::enableContinuousBuffer()
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
//@see Crypt_Blowfish::encrypt()
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
//@see Crypt_Blowfish::decrypt()
//@var String
//@access private
//
//
//
//Does the enmcrypt resource need to be (re)initialized?
//
//@see Crypt_Blowfish::setKey()
//@see Crypt_Blowfish::setIV()
//@var Boolean
//@access private
//
//
//
//Does the demcrypt resource need to be (re)initialized?
//
//@see Crypt_Blowfish::setKey()
//@see Crypt_Blowfish::setIV()
//@var Boolean
//@access private
//
//
//
//Is the mode one that is paddable?
//
//@see Crypt_Blowfish::Crypt_Blowfish()
//@var Boolean
//@access private
//
//
//
//Encryption buffer for CTR, OFB and CFB modes
//
//@see Crypt_Blowfish::encrypt()
//@var Array
//@access private
//
//
//
//Decryption buffer for CTR, OFB and CFB modes
//
//@see Crypt_Blowfish::decrypt()
//@var Array
//@access private
//
//
//
//mcrypt resource for CFB mode
//
//@see Crypt_Blowfish::encrypt()
//@see Crypt_Blowfish::decrypt()
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
//The fixed subkeys boxes ($sbox0 - $sbox3) with 256 entries each
//
//S-Box 1
//
//@access private
//@var    array
//
//
//
//S-Box 1
//
//@access private
//@var    array
//
//
//
//S-Box 2
//
//@access private
//@var    array
//
//
//
//S-Box 3
//
//@access private
//@var    array
//
//
//
//P-Array consists of 18 32-bit subkeys
//
//@var array $parray
//@access private
//
//
//
//The BCTX-working Array
//
//Holds the expanded key [p] and the key-depended s-boxes [sb]
//
//@var array $bctx
//@access private
//
//
//
//Default Constructor.
//
//Determines whether or not the mcrypt extension should be used.
//If not explictly set, CRYPT_BLOWFISH_MODE_CBC will be used.
//
//@param optional Integer $mode
//@access public
//
//
//
//Sets the key.
//
//Keys can be of any length.  Blowfish, itself, requires the use of a key between 32 and max. 448-bits long.
//If the key is less than 32-bits we NOT fill the key to 32bit but let the key as it is to be compatible
//with mcrypt because mcrypt act this way with blowfish key's < 32 bits.
//
//If the key is more than 448-bits, we trim the excess bits.
//
//If the key is not explicitly set, or empty, it'll be assumed a 128 bits key to be all null bytes.
//
//@access public
//@param String $key
//
//
//
//Encrypt the block.
//
//@access private
//@param  int $Xl left  uInt32 part of the block
//@param  int $Xr right uInt32 part of the block
//@return void
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
//SetIV is not required when CRYPT_BLOWFISH_MODE_ECB is being used.  If not explictly set, it'll be assumed
//to be all null bytes.
//
//@access public
//@param String $iv
//
//
//
//Encrypts a message.
//
//$plaintext will be padded with up to 8 additional bytes.  Other Blowfish implementations may or may not pad in the
//same manner.  Other common approaches to padding and the reasons why it's necessary are discussed in the following
//URL:
//
//{@link http://www.di-mgt.com.au/cryptopad.html http://www.di-mgt.com.au/cryptopad.html}
//
//An alternative to padding is to, separately, send the length of the file.  This is what SSH, in fact, does.
//strlen($plaintext) will still need to be a multiple of 8, however, arbitrary values can be added to make it that
//length.
//
//@see Crypt_Blowfish::decrypt()
//@access public
//@param String $plaintext
//
//
//
//Decrypts a message.
//
//If strlen($ciphertext) is not a multiple of 8, null bytes will be added to the end of the string until it is.
//
//@see Crypt_Blowfish::encrypt()
//@access public
//@param String $ciphertext
//
//
//
//Treat consecutive "packets" as if they are a continuous buffer.
//
//@see Crypt_Blowfish::disableContinuousBuffer()
//@access public
//
//
//
//Treat consecutive packets as if they are a discontinuous buffer.
//
//The default behavior.
//
//@see Crypt_Blowfish::enableContinuousBuffer()
//@access public
//
//
//
//Pad "packets".
//
//Blowfish works by encrypting 8 bytes at a time.  If you ever need to encrypt or decrypt something that's not
//a multiple of 8, it becomes necessary to pad the input so that it's length is a multiple of eight.
//
//Padding is enabled by default.  Sometimes, however, it is undesirable to pad strings.  Such is the case in SSH1,
//where "packets" are padded with random bytes before being encrypted.  Unpad these packets and you risk stripping
//away characters that shouldn't be stripped away. (SSH knows how many bytes are added because the length is
//transmitted separately)
//
//@see Crypt_Blowfish::disablePadding()
//@access public
//
//
//
//Do not pad packets.
//
//@see Crypt_Blowfish::enablePadding()
//@access public
//
//
//
//Pads a string
//
//Pads a string using the RSA PKCS padding standards so that its length is a multiple of the blocksize (8).
//
//If padding is disabled and $text is not a multiple of the blocksize, the string will be padded regardless
//and padding will, hence forth, be enabled.
//
//@see Crypt_Blowfish::_unpad()
//@access private
//
//
//
//Unpads a string
//
//If padding is enabled and the reported padding length is invalid the encryption key will be assumed to be wrong
//and false will be returned.
//
//@see Crypt_Blowfish::_pad()
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
//@see Crypt_Blowfish::decrypt()
//@see Crypt_Blowfish::encrypt()
//@access public
//@param String $iv
//
//
//
//Creates performance-optimized function for de/encrypt(), storing it in $this->inline_crypt
//
//@access private
//
//
//}}}
//
//Holds the lambda_functions table (classwide)
//
//@see inline_crypt_setup()
//@return Array
//@access private
//
//
class Crypt_Blowfish {
    constructor() {
        this.key = "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0";
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
        this.sbox0 = [3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946];
        this.sbox1 = [1266315497, 3048417604, 3681880366, 3289982499, 2909710000, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055];
        this.sbox2 = [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504];
        this.sbox3 = [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409000, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462];
        this.parray = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731];
        this.bctx = Array();
    }

    Crypt_Blowfish(mode = CRYPT_BLOWFISH_MODE_CBC) {
        if (!("undefined" !== typeof CRYPT_BLOWFISH_MODE)) {
            switch (true) {
                case extension_loaded("mcrypt") && -1 !== mcrypt_list_algorithms().indexOf("blowfish"):
                    global.CRYPT_BLOWFISH_MODE = CRYPT_BLOWFISH_MODE_MCRYPT;
                    break;

                default:
                    global.CRYPT_BLOWFISH_MODE = CRYPT_BLOWFISH_MODE_INTERNAL;
            }
        }

        switch (CRYPT_BLOWFISH_MODE) {
            case CRYPT_BLOWFISH_MODE_MCRYPT:
                switch (mode) {
                    case CRYPT_BLOWFISH_MODE_ECB:
                        this.paddable = true;
                        this.mode = MCRYPT_MODE_ECB;
                        break;

                    case CRYPT_BLOWFISH_MODE_CTR:
                        this.mode = "ctr";
                        break;

                    case CRYPT_BLOWFISH_MODE_CFB:
                        this.mode = "ncfb";
                        this.ecb = mcrypt_module_open(MCRYPT_BLOWFISH, "", MCRYPT_MODE_ECB, "");
                        break;

                    case CRYPT_BLOWFISH_MODE_OFB:
                        this.mode = MCRYPT_MODE_NOFB;
                        break;

                    case CRYPT_BLOWFISH_MODE_CBC:
                    default:
                        this.paddable = true;
                        this.mode = MCRYPT_MODE_CBC;
                }

                this.enmcrypt = mcrypt_module_open(MCRYPT_BLOWFISH, "", this.mode, "");
                this.demcrypt = mcrypt_module_open(MCRYPT_BLOWFISH, "", this.mode, "");
                break;

            default:
                switch (mode) {
                    case CRYPT_BLOWFISH_MODE_ECB:
                    case CRYPT_BLOWFISH_MODE_CBC:
                        this.paddable = true;
                        this.mode = mode;
                        break;

                    case CRYPT_BLOWFISH_MODE_CTR:
                    case CRYPT_BLOWFISH_MODE_CFB:
                    case CRYPT_BLOWFISH_MODE_OFB:
                        this.mode = mode;
                        break;

                    default:
                        this.paddable = true;
                        this.mode = CRYPT_BLOWFISH_MODE_CBC;
                }

                this.inline_crypt_setup();
        }
    }

    setKey(key) //unpack binary string in unsigned chars
    //encrypt the zero-string, replace P1 and P2 with the encrypted data,
    //encrypt P3 and P4 with the new P1 and P2, do it with all P-array and subkeys
    {
        var keylength = key.length;

        if (!keylength) {
            key = "\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0";
        } else if (keylength > 56) {
            key = key.substr(0, 56);
        }

        this.key = key;
        this.enchanged = true;
        this.dechanged = true;

        if (CRYPT_BLOWFISH_MODE == CRYPT_BLOWFISH_MODE_MCRYPT) {
            return;
        }

        this.bctx = {
            p: Array(),
            sb: [this.sbox0, this.sbox1, this.sbox2, this.sbox3]
        };
        key = Object.values(unpack("C*", key));
        var keyl = key.length;

        for (j = 0, i = 0; i < 18; ++i) //xor P1 with the first 32-bits of the key, xor P2 with the second 32-bits ...
        {
            var data, k;

            for (data = 0, k = 0; k < 4; ++k) {
                data = data << 8 | key[j];

                if (++j >= keyl) {
                    j = 0;
                }
            }

            this.bctx.p.push(this.parray[i] ^ data);
        }

        var datal = 0;
        var datar = 0;

        for (i = 0;; i < 18; i += 2) {
            this._encryptBlock(datal, datar);

            this.bctx.p[i] = datal;
            this.bctx.p[i + 1] = datar;
        }

        for (i = 0;; i < 4; ++i) {
            for (j = 0;; j < 256; j += 2) {
                this._encryptBlock(datal, datar);

                this.bctx.sb[i][j] = datal;
                this.bctx.sb[i][j + 1] = datar;
            }
        }
    }

    _encryptBlock(Xl, Xr) {
        var p = this.bctx.p;
        var sb_0 = this.bctx.sb[0];
        var sb_1 = this.bctx.sb[1];
        var sb_2 = this.bctx.sb[2];
        var sb_3 = this.bctx.sb[3];
        var l = Xl;
        var r = Xr;
        var i = -1;

        while (i < 15) {
            l ^= p[++i];
            r ^= (sb_0[l >> 24 & 255] + sb_1[l >> 16 & 255] ^ sb_2[l >> 8 & 255]) + sb_3[l & 255];
            r ^= p[++i];
            l ^= (sb_0[r >> 24 & 255] + sb_1[r >> 16 & 255] ^ sb_2[r >> 8 & 255]) + sb_3[r & 255];
        }

        Xr = l ^ p[16];
        Xl = r ^ p[17];
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

                while (key.length < 56) //$dk.= $this->_pbkdf($password, $salt, $count, $i++);
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

    encrypt(plaintext) {
        if (CRYPT_BLOWFISH_MODE == CRYPT_BLOWFISH_MODE_MCRYPT) {
            if (this.paddable) {
                plaintext = this._pad(plaintext);
            }

            if (this.enchanged) {
                mcrypt_generic_init(this.enmcrypt, this.key, this.encryptIV);

                if (this.mode == "ncfb") {
                    mcrypt_generic_init(this.ecb, this.key, "\\0\\0\\0\\0\\0\\0\\0\\0");
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
                            mcrypt_generic_init(this.enmcrypt, this.key, iv);
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
                mcrypt_generic_init(this.enmcrypt, this.key, this.encryptIV);
            }

            return ciphertext;
        }

        if (!this.bctx) {
            this.setKey(this.key);
        }

        var inline = this.inline_crypt;
        return inline("encrypt", this, plaintext);
    }

    decrypt(ciphertext) {
        if (CRYPT_BLOWFISH_MODE == CRYPT_BLOWFISH_MODE_MCRYPT) {
            if (this.paddable) //we pad with chr(0) since that's what mcrypt_generic does.  to quote from http://php.net/function.mcrypt-generic :
                //"The data is padded with "\0" to make sure the length of the data is n * blocksize."
                {
                    ciphertext = str_pad(ciphertext, ciphertext.length + (8 - ciphertext.length % 8) % 8, String.fromCharCode(0));
                }

            if (this.dechanged) {
                mcrypt_generic_init(this.demcrypt, this.key, this.decryptIV);

                if (this.mode == "ncfb") {
                    mcrypt_generic_init(this.ecb, this.key, "\\0\\0\\0\\0\\0\\0\\0\\0");
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
                mcrypt_generic_init(this.demcrypt, this.key, this.decryptIV);
            }

            return this.paddable ? this._unpad(plaintext) : plaintext;
        }

        if (!this.bctx) {
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

        if (CRYPT_BLOWFISH_MODE == CRYPT_BLOWFISH_MODE_MCRYPT) {
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
            if (length % 8 == 0) {
                return text;
            } else {
                user_error(`The plaintext's length (${length}) is not a multiple of the block size (8)`);
                this.padding = true;
            }
        }

        var pad = 8 - length % 8;
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

    _string_shift(string) {
        var substr = substr(string, 0, 8);
        string = substr(string, 8);
        return substr;
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

    inline_crypt_setup() //{{{
    {
        var lambda_functions = Crypt_Blowfish.get_lambda_functions();
        var block_size = 8;
        var mode = this.mode;
        var code_hash = `${mode}`;

        if (!(undefined !== lambda_functions[code_hash])) //Generating encrypt code:
            //Generating decrypt code:
            //Generating mode of operation code:
            {
                var init_cryptBlock = "\r\n                extract($self->bctx[\"p\"],  EXTR_PREFIX_ALL, \"p\");\r\n                extract($self->bctx[\"sb\"], EXTR_PREFIX_ALL, \"sb\");\r\n            ";
                var _encryptBlock = "\r\n                $in = unpack(\"N*\", $in);\r\n                $l = $in[1];\r\n                $r = $in[2];\r\n            ";

                for (var i = 0; i < 16; i += 2) {
                    _encryptBlock += "\r\n                    $l^= $p_" + i + ";\r\n                    $r^= ($sb_0[$l >> 24 & 0xff]  +\r\n                          $sb_1[$l >> 16 & 0xff]  ^\r\n                          $sb_2[$l >>  8 & 0xff]) +\r\n                          $sb_3[$l       & 0xff];\r\n\r\n                    $r^= $p_" + (i + 1) + ";\r\n                    $l^= ($sb_0[$r >> 24 & 0xff]  +\r\n                          $sb_1[$r >> 16 & 0xff]  ^\r\n                          $sb_2[$r >>  8 & 0xff]) +\r\n                          $sb_3[$r       & 0xff];\r\n                ";
                }

                _encryptBlock += "\r\n                $in = pack(\"N*\", $r ^ $p_17, $l ^ $p_16);\r\n            ";
                var _decryptBlock = "\r\n                $in = unpack(\"N*\", $in);\r\n                $l = $in[1];\r\n                $r = $in[2];\r\n            ";

                for (i = 17;; i > 2; i -= 2) {
                    _decryptBlock += "\r\n                    $l^= $p_" + i + ";\r\n                    $r^= ($sb_0[$l >> 24 & 0xff]  +\r\n                          $sb_1[$l >> 16 & 0xff]  ^\r\n                          $sb_2[$l >>  8 & 0xff]) +\r\n                          $sb_3[$l       & 0xff];\r\n\r\n                    $r^= $p_" + (i - 1) + ";\r\n                    $l^= ($sb_0[$r >> 24 & 0xff]  +\r\n                          $sb_1[$r >> 16 & 0xff]  ^\r\n                          $sb_2[$r >>  8 & 0xff]) +\r\n                          $sb_3[$r       & 0xff];\r\n                ";
                }

                _decryptBlock += "\r\n                $in = pack(\"N*\", $r ^ $p_0, $l ^ $p_1);\r\n            ";

                switch (mode) {
                    case CRYPT_BLOWFISH_MODE_ECB:
                        var encrypt = "\r\n                        $ciphertext = \"\";\r\n                        $text = $self->_pad($text);\r\n                        $plaintext_len = strlen($text);\r\n\r\n                        for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ");\r\n                            " + _encryptBlock + "\r\n                            $ciphertext.= $in;\r\n                        }\r\n                        return $ciphertext;\r\n                        ";
                        var decrypt = "\r\n                        $plaintext = \"\";\r\n                        $text = str_pad($text, strlen($text) + (" + block_size + " - strlen($text) % " + block_size + ") % " + block_size + ", chr(0));\r\n                        $ciphertext_len = strlen($text);\r\n\r\n                        for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ");\r\n                            " + _decryptBlock + "\r\n                            $plaintext.= $in;\r\n                        }\r\n\r\n                        return $self->_unpad($plaintext);\r\n                        ";
                        break;

                    case CRYPT_BLOWFISH_MODE_CBC:
                        encrypt = "\r\n                        $ciphertext = \"\";\r\n                        $text = $self->_pad($text);\r\n                        $plaintext_len = strlen($text);\r\n\r\n                        $in = $self->encryptIV;\r\n\r\n                        for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                            $in = substr($text, $i, " + block_size + ") ^ $in;\r\n                            " + _encryptBlock + "\r\n                            $ciphertext.= $in;\r\n                        }\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $in;\r\n                        }\r\n\r\n                        return $ciphertext;\r\n                        ";
                        decrypt = "\r\n                        $plaintext = \"\";\r\n                        $text = str_pad($text, strlen($text) + (" + block_size + " - strlen($text) % " + block_size + ") % " + block_size + ", chr(0));\r\n                        $ciphertext_len = strlen($text);\r\n\r\n                        $iv = $self->decryptIV;\r\n\r\n                        for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                            $in = $block = substr($text, $i, " + block_size + ");\r\n                            " + _decryptBlock + "\r\n                            $plaintext.= $in ^ $iv;\r\n                            $iv = $block;\r\n                        }\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $iv;\r\n                        }\r\n\r\n                        return $self->_unpad($plaintext);\r\n                        ";
                        break;

                    case CRYPT_BLOWFISH_MODE_CTR:
                        encrypt = "\r\n                        $ciphertext = \"\";\r\n                        $plaintext_len = strlen($text);\r\n                        $xor = $self->encryptIV;\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if (strlen($buffer[\"encrypted\"])) {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"encrypted\"])) {\r\n                                    $in = $self->_generate_xor($xor);\r\n                                    " + _encryptBlock + "\r\n                                    $buffer[\"encrypted\"].= $in;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"encrypted\"]);\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $plaintext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                $in = $self->_generate_xor($xor);\r\n                                " + _encryptBlock + "\r\n                                $key = $in;\r\n                                $ciphertext.= $block ^ $key;\r\n                            }\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->encryptIV = $xor;\r\n                            if ($start = $plaintext_len % " + block_size + ") {\r\n                                $buffer[\"encrypted\"] = substr($key, $start) . $buffer[\"encrypted\"];\r\n                            }\r\n                        }\r\n\r\n                        return $ciphertext;\r\n                    ";
                        decrypt = "\r\n                        $plaintext = \"\";\r\n                        $ciphertext_len = strlen($text);\r\n                        $xor = $self->decryptIV;\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if (strlen($buffer[\"ciphertext\"])) {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                if (strlen($block) > strlen($buffer[\"ciphertext\"])) {\r\n                                    $in = $self->_generate_xor($xor);\r\n                                    " + _encryptBlock + "\r\n                                    $buffer[\"ciphertext\"].= $in;\r\n                                }\r\n                                $key = $self->_string_shift($buffer[\"ciphertext\"]);\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        } else {\r\n                            for ($i = 0; $i < $ciphertext_len; $i+= " + block_size + ") {\r\n                                $block = substr($text, $i, " + block_size + ");\r\n                                $in = $self->_generate_xor($xor);\r\n                                " + _encryptBlock + "\r\n                                $key = $in;\r\n                                $plaintext.= $block ^ $key;\r\n                            }\r\n                        }\r\n                        if ($self->continuousBuffer) {\r\n                            $self->decryptIV = $xor;\r\n                            if ($start = $ciphertext_len % " + block_size + ") {\r\n                                $buffer[\"ciphertext\"] = substr($key, $start) . $buffer[\"ciphertext\"];\r\n                            }\r\n                        }\r\n                        return $plaintext;\r\n                        ";
                        break;

                    case CRYPT_BLOWFISH_MODE_CFB:
                        encrypt = "\r\n                        $ciphertext = \"\";\r\n                        $buffer = &$self->enbuffer;\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $iv = &$self->encryptIV;\r\n                            $pos = &$buffer[\"pos\"];\r\n                        } else {\r\n                            $iv = $self->encryptIV;\r\n                            $pos = 0;\r\n                        }\r\n                        $len = strlen($text);\r\n                        $i = 0;\r\n                        if ($pos) {\r\n                            $orig_pos = $pos;\r\n                            $max = " + block_size + " - $pos;\r\n                            if ($len >= $max) {\r\n                                $i = $max;\r\n                                $len-= $max;\r\n                                $pos = 0;\r\n                            } else {\r\n                                $i = $len;\r\n                                $pos+= $len;\r\n                                $len = 0;\r\n                            }\r\n                            $ciphertext = substr($iv, $orig_pos) ^ $text;\r\n                            $iv = substr_replace($iv, $ciphertext, $orig_pos, $i);\r\n                        }\r\n                        while ($len >= " + block_size + ") {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + ";\r\n                            $iv = $in ^ substr($text, $i, " + block_size + ");\r\n                            $ciphertext.= $iv;\r\n                            $len-= " + block_size + ";\r\n                            $i+= " + block_size + ";\r\n                        }\r\n                        if ($len) {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + "\r\n                            $iv = $in;\r\n                            $block = $iv ^ substr($text, $i);\r\n                            $iv = substr_replace($iv, $block, 0, $len);\r\n                            $ciphertext.= $block;\r\n                            $pos = $len;\r\n                        }\r\n                        return $ciphertext;\r\n                    ";
                        decrypt = "\r\n                        $plaintext = \"\";\r\n                        $buffer = &$self->debuffer;\r\n\r\n                        if ($self->continuousBuffer) {\r\n                            $iv = &$self->decryptIV;\r\n                            $pos = &$buffer[\"pos\"];\r\n                        } else {\r\n                            $iv = $self->decryptIV;\r\n                            $pos = 0;\r\n                        }\r\n                        $len = strlen($text);\r\n                        $i = 0;\r\n                        if ($pos) {\r\n                            $orig_pos = $pos;\r\n                            $max = " + block_size + " - $pos;\r\n                            if ($len >= $max) {\r\n                                $i = $max;\r\n                                $len-= $max;\r\n                                $pos = 0;\r\n                            } else {\r\n                                $i = $len;\r\n                                $pos+= $len;\r\n                                $len = 0;\r\n                            }\r\n                            $plaintext = substr($iv, $orig_pos) ^ $text;\r\n                            $iv = substr_replace($iv, substr($text, 0, $i), $orig_pos, $i);\r\n                        }\r\n                        while ($len >= " + block_size + ") {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + "\r\n                            $iv = $in;\r\n                            $cb = substr($text, $i, " + block_size + ");\r\n                            $plaintext.= $iv ^ $cb;\r\n                            $iv = $cb;\r\n                            $len-= " + block_size + ";\r\n                            $i+= " + block_size + ";\r\n                        }\r\n                        if ($len) {\r\n                            $in = $iv;\r\n                            " + _encryptBlock + "\r\n                            $iv = $in;\r\n                            $plaintext.= $iv ^ substr($text, $i);\r\n                            $iv = substr_replace($iv, substr($text, $i), 0, $len);\r\n                            $pos = $len;\r\n                        }\r\n\r\n                        return $plaintext;\r\n                        ";
                        break;

                    case CRYPT_BLOWFISH_MODE_OFB:
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
        if (!("_static_Crypt_Blowfish_get_lambda_functions_functions" in global)) _static_Crypt_Blowfish_get_lambda_functions_functions = Array();
        return _static_Crypt_Blowfish_get_lambda_functions_functions;
    }

};
