//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP arbitrary precision integer arithmetic library.
//
//Supports base-2, base-10, base-16, and base-256 numbers.  Uses the GMP or BCMath extensions, if available,
//and an internal implementation, otherwise.
//
//PHP versions 4 and 5
//
//{@internal (all DocBlock comments regarding implementation - such as the one that follows - refer to the
//{@link MATH_BIGINTEGER_MODE_INTERNAL MATH_BIGINTEGER_MODE_INTERNAL} mode)
//
//Math_BigInteger uses base-2**26 to perform operations such as multiplication and division and
//base-2**52 (ie. two base 2**26 digits) to perform addition and subtraction.  Because the largest possible
//value when multiplying two base-2**26 numbers together is a base-2**52 number, double precision floating
//point numbers - numbers that should be supported on most hardware and whose significand is 53 bits - are
//used.  As a consequence, bitwise operators such as >> and << cannot be used, nor can the modulo operator %,
//which only supports integers.  Although this fact will slow this library down, the fact that such a high
//base is being used should more than compensate.
//
//When PHP version 6 is officially released, we'll be able to use 64-bit integers.  This should, once again,
//allow bitwise operators, and will increase the maximum possible base to 2**31 (or 2**62 for addition /
//subtraction).
//
//Numbers are stored in {@link http://en.wikipedia.org/wiki/Endianness little endian} format.  ie.
//(new Math_BigInteger(pow(2, 26)))->value = array(0, 1)
//
//Useful resources are as follows:
//
//- {@link http://www.cacr.math.uwaterloo.ca/hac/about/chap14.pdf Handbook of Applied Cryptography (HAC)}
//- {@link http://math.libtomcrypt.com/files/tommath.pdf Multi-Precision Math (MPM)}
//- Java's BigInteger classes.  See /j2se/src/share/classes/java/math in jdk-1_5_0-src-jrl.zip
//
//Here's an example of how to use this library:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger(2);
//$b = new Math_BigInteger(3);
//
//$c = $a->add($b);
//
//echo $c->toString(); // outputs 5
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
//@category   Math
//@package    Math_BigInteger
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMVI Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://pear.php.net/package/Math_BigInteger
//
//
//#@+
// Reduction constants
//
// @access private
// @see Math_BigInteger::_reduce()
//
//@see Math_BigInteger::_montgomery()
//@see Math_BigInteger::_prepMontgomery()
//
//
//
//@see Math_BigInteger::_barrett()
//
//
//
//@see Math_BigInteger::_mod2()
//
//
//
//@see Math_BigInteger::_remainder()
//
//
//
//@see Math_BigInteger::__clone()
//
//
//#@-
//#@+
// Array constants
//
// Rather than create a thousands and thousands of new Math_BigInteger objects in repeated function calls to add() and
// multiply() or whatever, we'll just work directly on arrays, taking them in as parameters and returning them.
//
// @access private
//
//$result[MATH_BIGINTEGER_VALUE] contains the value.
//
//
//
//$result[MATH_BIGINTEGER_SIGN] contains the sign.
//
//
//#@-
//#@+
// @access private
// @see Math_BigInteger::_montgomery()
// @see Math_BigInteger::_barrett()
//
//Cache constants
//
//$cache[MATH_BIGINTEGER_VARIABLE] tells us whether or not the cached data is still valid.
//
//
//
//$cache[MATH_BIGINTEGER_DATA] contains the cached data.
//
//
//#@-
//#@+
// Mode constants.
//
// @access private
// @see Math_BigInteger::Math_BigInteger()
//
//To use the pure-PHP implementation
//
//
//
//To use the BCMath library
//
//(if enabled; otherwise, the internal implementation will be used)
//
//
//
//To use the GMP library
//
//(if present; otherwise, either the BCMath or the internal implementation will be used)
//
//
//#@-
//
//Karatsuba Cutoff
//
//At what point do we switch between Karatsuba multiplication and schoolbook long multiplication?
//
//@access private
//
//
//
//Pure-PHP arbitrary precision integer arithmetic library. Supports base-2, base-10, base-16, and base-256
//numbers.
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 1.0.0RC4
//@access  public
//@package Math_BigInteger
//
//
const MATH_BIGINTEGER_MONTGOMERY = 0;
const MATH_BIGINTEGER_BARRETT = 1;
const MATH_BIGINTEGER_POWEROF2 = 2;
const MATH_BIGINTEGER_CLASSIC = 3;
const MATH_BIGINTEGER_NONE = 4;
const MATH_BIGINTEGER_VALUE = 0;
const MATH_BIGINTEGER_SIGN = 1;
const MATH_BIGINTEGER_VARIABLE = 0;
const MATH_BIGINTEGER_DATA = 1;
const MATH_BIGINTEGER_MODE_INTERNAL = 1;
const MATH_BIGINTEGER_MODE_BCMATH = 2;
const MATH_BIGINTEGER_MODE_GMP = 3;
const MATH_BIGINTEGER_KARATSUBA_CUTOFF = 25;

//
//Holds the BigInteger's value.
//
//@var Array
//@access private
//
//
//
//Holds the BigInteger's magnitude.
//
//@var Boolean
//@access private
//
//
//
//Random number generator function
//
//@see setRandomGenerator()
//@access private
//
//
//
//Precision
//
//@see setPrecision()
//@access private
//
//
//
//Precision Bitmask
//
//@see setPrecision()
//@access private
//
//
//
//Mode independent value used for serialization.
//
//If the bcmath or gmp extensions are installed $this->value will be a non-serializable resource, hence the need for
//a variable that'll be serializable regardless of whether or not extensions are being used.  Unlike $this->value,
//however, $this->hex is only calculated when $this->__sleep() is called.
//
//@see __sleep()
//@see __wakeup()
//@var String
//@access private
//
//
//
//Converts base-2, base-10, base-16, and binary strings (base-256) to BigIntegers.
//
//If the second parameter - $base - is negative, then it will be assumed that the number's are encoded using
//two's compliment.  The sole exception to this is -10, which is treated the same as 10 is.
//
//Here's an example:
//<code>
//&lt;?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('0x32', 16); // 50 in base-16
//
//echo $a->toString(); // outputs 50
//?&gt;
//</code>
//
//@param optional $x base-10 number or base-$base number if $base set.
//@param optional integer $base
//@return Math_BigInteger
//@access public
//
//
//
//Converts a BigInteger to a byte string (eg. base-256).
//
//Negative numbers are saved as positive numbers, unless $twos_compliment is set to true, at which point, they're
//saved as two's compliment.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('65');
//
//echo $a->toBytes(); // outputs chr(65)
//?>
//</code>
//
//@param Boolean $twos_compliment
//@return String
//@access public
//@internal Converts a base-2**26 number to base-2**8
//
//
//
//Converts a BigInteger to a hex string (eg. base-16)).
//
//Negative numbers are saved as positive numbers, unless $twos_compliment is set to true, at which point, they're
//saved as two's compliment.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('65');
//
//echo $a->toHex(); // outputs '41'
//?>
//</code>
//
//@param Boolean $twos_compliment
//@return String
//@access public
//@internal Converts a base-2**26 number to base-2**8
//
//
//
//Converts a BigInteger to a bit string (eg. base-2).
//
//Negative numbers are saved as positive numbers, unless $twos_compliment is set to true, at which point, they're
//saved as two's compliment.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('65');
//
//echo $a->toBits(); // outputs '1000001'
//?>
//</code>
//
//@param Boolean $twos_compliment
//@return String
//@access public
//@internal Converts a base-2**26 number to base-2**2
//
//
//
//Converts a BigInteger to a base-10 number.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('50');
//
//echo $a->toString(); // outputs 50
//?>
//</code>
//
//@return String
//@access public
//@internal Converts a base-2**26 number to base-10**7 (which is pretty much base-10)
//
//
//
//Copy an object
//
//PHP5 passes objects by reference while PHP4 passes by value.  As such, we need a function to guarantee
//that all objects are passed by value, when appropriate.  More information can be found here:
//
//{@link http://php.net/language.oop5.basic#51624}
//
//@access public
//@see __clone()
//@return Math_BigInteger
//
//
//
//__toString() magic method
//
//Will be called, automatically, if you're supporting just PHP5.  If you're supporting PHP4, you'll need to call
//toString().
//
//@access public
//@internal Implemented per a suggestion by Techie-Michael - thanks!
//
//
//
//__clone() magic method
//
//Although you can call Math_BigInteger::__toString() directly in PHP5, you cannot call Math_BigInteger::__clone()
//directly in PHP5.  You can in PHP4 since it's not a magic method, but in PHP5, you have to call it by using the PHP5
//only syntax of $y = clone $x.  As such, if you're trying to write an application that works on both PHP4 and PHP5,
//call Math_BigInteger::copy(), instead.
//
//@access public
//@see copy()
//@return Math_BigInteger
//
//
//
//__sleep() magic method
//
//Will be called, automatically, when serialize() is called on a Math_BigInteger object.
//
//@see __wakeup()
//@access public
//
//
//
//__wakeup() magic method
//
//Will be called, automatically, when unserialize() is called on a Math_BigInteger object.
//
//@see __sleep()
//@access public
//
//
//
//Adds two BigIntegers.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('10');
//$b = new Math_BigInteger('20');
//
//$c = $a->add($b);
//
//echo $c->toString(); // outputs 30
//?>
//</code>
//
//@param Math_BigInteger $y
//@return Math_BigInteger
//@access public
//@internal Performs base-2**52 addition
//
//
//
//Performs addition.
//
//@param Array $x_value
//@param Boolean $x_negative
//@param Array $y_value
//@param Boolean $y_negative
//@return Array
//@access private
//
//
//
//Subtracts two BigIntegers.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('10');
//$b = new Math_BigInteger('20');
//
//$c = $a->subtract($b);
//
//echo $c->toString(); // outputs -10
//?>
//</code>
//
//@param Math_BigInteger $y
//@return Math_BigInteger
//@access public
//@internal Performs base-2**52 subtraction
//
//
//
//Performs subtraction.
//
//@param Array $x_value
//@param Boolean $x_negative
//@param Array $y_value
//@param Boolean $y_negative
//@return Array
//@access private
//
//
//
//Multiplies two BigIntegers
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('10');
//$b = new Math_BigInteger('20');
//
//$c = $a->multiply($b);
//
//echo $c->toString(); // outputs 200
//?>
//</code>
//
//@param Math_BigInteger $x
//@return Math_BigInteger
//@access public
//
//
//
//Performs multiplication.
//
//@param Array $x_value
//@param Boolean $x_negative
//@param Array $y_value
//@param Boolean $y_negative
//@return Array
//@access private
//
//
//
//Performs long multiplication on two BigIntegers
//
//Modeled after 'multiply' in MutableBigInteger.java.
//
//@param Array $x_value
//@param Array $y_value
//@return Array
//@access private
//
//
//
//Performs Karatsuba multiplication on two BigIntegers
//
//See {@link http://en.wikipedia.org/wiki/Karatsuba_algorithm Karatsuba algorithm} and
//{@link http://math.libtomcrypt.com/files/tommath.pdf#page=120 MPM 5.2.3}.
//
//@param Array $x_value
//@param Array $y_value
//@return Array
//@access private
//
//
//
//Performs squaring
//
//@param Array $x
//@return Array
//@access private
//
//
//
//Performs traditional squaring on two BigIntegers
//
//Squaring can be done faster than multiplying a number by itself can be.  See
//{@link http://www.cacr.math.uwaterloo.ca/hac/about/chap14.pdf#page=7 HAC 14.2.4} /
//{@link http://math.libtomcrypt.com/files/tommath.pdf#page=141 MPM 5.3} for more information.
//
//@param Array $value
//@return Array
//@access private
//
//
//
//Performs Karatsuba "squaring" on two BigIntegers
//
//See {@link http://en.wikipedia.org/wiki/Karatsuba_algorithm Karatsuba algorithm} and
//{@link http://math.libtomcrypt.com/files/tommath.pdf#page=151 MPM 5.3.4}.
//
//@param Array $value
//@return Array
//@access private
//
//
//
//Divides two BigIntegers.
//
//Returns an array whose first element contains the quotient and whose second element contains the
//"common residue".  If the remainder would be positive, the "common residue" and the remainder are the
//same.  If the remainder would be negative, the "common residue" is equal to the sum of the remainder
//and the divisor (basically, the "common residue" is the first positive modulo).
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('10');
//$b = new Math_BigInteger('20');
//
//list($quotient, $remainder) = $a->divide($b);
//
//echo $quotient->toString(); // outputs 0
//echo "\r\n";
//echo $remainder->toString(); // outputs 10
//?>
//</code>
//
//@param Math_BigInteger $y
//@return Array
//@access public
//@internal This function is based off of {@link http://www.cacr.math.uwaterloo.ca/hac/about/chap14.pdf#page=9 HAC 14.20}.
//
//
//
//Divides a BigInteger by a regular integer
//
//abc / x = a00 / x + b0 / x + c / x
//
//@param Array $dividend
//@param Array $divisor
//@return Array
//@access private
//
//
//
//Performs modular exponentiation.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger('10');
//$b = new Math_BigInteger('20');
//$c = new Math_BigInteger('30');
//
//$c = $a->modPow($b, $c);
//
//echo $c->toString(); // outputs 10
//?>
//</code>
//
//@param Math_BigInteger $e
//@param Math_BigInteger $n
//@return Math_BigInteger
//@access public
//@internal The most naive approach to modular exponentiation has very unreasonable requirements, and
//and although the approach involving repeated squaring does vastly better, it, too, is impractical
//for our purposes.  The reason being that division - by far the most complicated and time-consuming
//of the basic operations (eg. +,-,*,/) - occurs multiple times within it.
//
//Modular reductions resolve this issue.  Although an individual modular reduction takes more time
//then an individual division, when performed in succession (with the same modulo), they're a lot faster.
//
//The two most commonly used modular reductions are Barrett and Montgomery reduction.  Montgomery reduction,
//although faster, only works when the gcd of the modulo and of the base being used is 1.  In RSA, when the
//base is a power of two, the modulo - a product of two primes - is always going to have a gcd of 1 (because
//the product of two odd numbers is odd), but what about when RSA isn't used?
//
//In contrast, Barrett reduction has no such constraint.  As such, some bigint implementations perform a
//Barrett reduction after every operation in the modpow function.  Others perform Barrett reductions when the
//modulo is even and Montgomery reductions when the modulo is odd.  BigInteger.java's modPow method, however,
//uses a trick involving the Chinese Remainder Theorem to factor the even modulo into two numbers - one odd and
//the other, a power of two - and recombine them, later.  This is the method that this modPow function uses.
//{@link http://islab.oregonstate.edu/papers/j34monex.pdf Montgomery Reduction with Even Modulus} elaborates.
//
//
//
//Performs modular exponentiation.
//
//Alias for Math_BigInteger::modPow()
//
//@param Math_BigInteger $e
//@param Math_BigInteger $n
//@return Math_BigInteger
//@access public
//
//
//
//Sliding Window k-ary Modular Exponentiation
//
//Based on {@link http://www.cacr.math.uwaterloo.ca/hac/about/chap14.pdf#page=27 HAC 14.85} /
//{@link http://math.libtomcrypt.com/files/tommath.pdf#page=210 MPM 7.7}.  In a departure from those algorithims,
//however, this function performs a modular reduction after every multiplication and squaring operation.
//As such, this function has the same preconditions that the reductions being used do.
//
//@param Math_BigInteger $e
//@param Math_BigInteger $n
//@param Integer $mode
//@return Math_BigInteger
//@access private
//
//
//
//Modular reduction
//
//For most $modes this will return the remainder.
//
//@see _slidingWindow()
//@access private
//@param Array $x
//@param Array $n
//@param Integer $mode
//@return Array
//
//
//
//Modular reduction preperation
//
//@see _slidingWindow()
//@access private
//@param Array $x
//@param Array $n
//@param Integer $mode
//@return Array
//
//
//
//Modular multiply
//
//@see _slidingWindow()
//@access private
//@param Array $x
//@param Array $y
//@param Array $n
//@param Integer $mode
//@return Array
//
//
//
//Modular square
//
//@see _slidingWindow()
//@access private
//@param Array $x
//@param Array $n
//@param Integer $mode
//@return Array
//
//
//
//Modulos for Powers of Two
//
//Calculates $x%$n, where $n = 2**$e, for some $e.  Since this is basically the same as doing $x & ($n-1),
//we'll just use this function as a wrapper for doing that.
//
//@see _slidingWindow()
//@access private
//@param Math_BigInteger
//@return Math_BigInteger
//
//
//
//Barrett Modular Reduction
//
//See {@link http://www.cacr.math.uwaterloo.ca/hac/about/chap14.pdf#page=14 HAC 14.3.3} /
//{@link http://math.libtomcrypt.com/files/tommath.pdf#page=165 MPM 6.2.5} for more information.  Modified slightly,
//so as not to require negative numbers (initially, this script didn't support negative numbers).
//
//Employs "folding", as described at
//{@link http://www.cosic.esat.kuleuven.be/publications/thesis-149.pdf#page=66 thesis-149.pdf#page=66}.  To quote from
//it, "the idea [behind folding] is to find a value x' such that x (mod m) = x' (mod m), with x' being smaller than x."
//
//Unfortunately, the "Barrett Reduction with Folding" algorithm described in thesis-149.pdf is not, as written, all that
//usable on account of (1) its not using reasonable radix points as discussed in
//{@link http://math.libtomcrypt.com/files/tommath.pdf#page=162 MPM 6.2.2} and (2) the fact that, even with reasonable
//radix points, it only works when there are an even number of digits in the denominator.  The reason for (2) is that
//(x >> 1) + (x >> 1) != x / 2 + x / 2.  If x is even, they're the same, but if x is odd, they're not.  See the in-line
//comments for details.
//
//@see _slidingWindow()
//@access private
//@param Array $n
//@param Array $m
//@return Array
//
//
//
//(Regular) Barrett Modular Reduction
//
//For numbers with more than four digits Math_BigInteger::_barrett() is faster.  The difference between that and this
//is that this function does not fold the denominator into a smaller form.
//
//@see _slidingWindow()
//@access private
//@param Array $x
//@param Array $n
//@return Array
//
//
//
//Performs long multiplication up to $stop digits
//
//If you're going to be doing array_slice($product->value, 0, $stop), some cycles can be saved.
//
//@see _regularBarrett()
//@param Array $x_value
//@param Boolean $x_negative
//@param Array $y_value
//@param Boolean $y_negative
//@param Integer $stop
//@return Array
//@access private
//
//
//
//Montgomery Modular Reduction
//
//($x->_prepMontgomery($n))->_montgomery($n) yields $x % $n.
//{@link http://math.libtomcrypt.com/files/tommath.pdf#page=170 MPM 6.3} provides insights on how this can be
//improved upon (basically, by using the comba method).  gcd($n, 2) must be equal to one for this function
//to work correctly.
//
//@see _prepMontgomery()
//@see _slidingWindow()
//@access private
//@param Array $x
//@param Array $n
//@return Array
//
//
//
//Montgomery Multiply
//
//Interleaves the montgomery reduction and long multiplication algorithms together as described in
//{@link http://www.cacr.math.uwaterloo.ca/hac/about/chap14.pdf#page=13 HAC 14.36}
//
//@see _prepMontgomery()
//@see _montgomery()
//@access private
//@param Array $x
//@param Array $y
//@param Array $m
//@return Array
//
//
//
//Prepare a number for use in Montgomery Modular Reductions
//
//@see _montgomery()
//@see _slidingWindow()
//@access private
//@param Array $x
//@param Array $n
//@return Array
//
//
//
//Modular Inverse of a number mod 2**26 (eg. 67108864)
//
//Based off of the bnpInvDigit function implemented and justified in the following URL:
//
//{@link http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn.js}
//
//The following URL provides more info:
//
//{@link http://groups.google.com/group/sci.crypt/msg/7a137205c1be7d85}
//
//As for why we do all the bitmasking...  strange things can happen when converting from floats to ints. For
//instance, on some computers, var_dump((int) -4294967297) yields int(-1) and on others, it yields
//int(-2147483648).  To avoid problems stemming from this, we use bitmasks to guarantee that ints aren't
//auto-converted to floats.  The outermost bitmask is present because without it, there's no guarantee that
//the "residue" returned would be the so-called "common residue".  We use fmod, in the last step, because the
//maximum possible $x is 26 bits and the maximum $result is 16 bits.  Thus, we have to be able to handle up to
//40 bits, which only 64-bit floating points will support.
//
//Thanks to Pedro Gimeno Fortea for input!
//
//@see _montgomery()
//@access private
//@param Array $x
//@return Integer
//
//
//
//Calculates modular inverses.
//
//Say you have (30 mod 17 * x mod 17) mod 17 == 1.  x can be found using modular inverses.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger(30);
//$b = new Math_BigInteger(17);
//
//$c = $a->modInverse($b);
//echo $c->toString(); // outputs 4
//
//echo "\r\n";
//
//$d = $a->multiply($c);
//list(, $d) = $d->divide($b);
//echo $d; // outputs 1 (as per the definition of modular inverse)
//?>
//</code>
//
//@param Math_BigInteger $n
//@return mixed false, if no modular inverse exists, Math_BigInteger, otherwise.
//@access public
//@internal See {@link http://www.cacr.math.uwaterloo.ca/hac/about/chap14.pdf#page=21 HAC 14.64} for more information.
//
//
//
//Calculates the greatest common divisor and Bezout's identity.
//
//Say you have 693 and 609.  The GCD is 21.  Bezout's identity states that there exist integers x and y such that
//693*x + 609*y == 21.  In point of fact, there are actually an infinite number of x and y combinations and which
//combination is returned is dependant upon which mode is in use.  See
//{@link http://en.wikipedia.org/wiki/B%C3%A9zout%27s_identity Bezout's identity - Wikipedia} for more information.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger(693);
//$b = new Math_BigInteger(609);
//
//extract($a->extendedGCD($b));
//
//echo $gcd->toString() . "\r\n"; // outputs 21
//echo $a->toString() * $x->toString() + $b->toString() * $y->toString(); // outputs 21
//?>
//</code>
//
//@param Math_BigInteger $n
//@return Math_BigInteger
//@access public
//@internal Calculates the GCD using the binary xGCD algorithim described in
//{@link http://www.cacr.math.uwaterloo.ca/hac/about/chap14.pdf#page=19 HAC 14.61}.  As the text above 14.61 notes,
//the more traditional algorithim requires "relatively costly multiple-precision divisions".
//
//
//
//Calculates the greatest common divisor
//
//Say you have 693 and 609.  The GCD is 21.
//
//Here's an example:
//<code>
//<?php
//include('Math/BigInteger.php');
//
//$a = new Math_BigInteger(693);
//$b = new Math_BigInteger(609);
//
//$gcd = a->extendedGCD($b);
//
//echo $gcd->toString() . "\r\n"; // outputs 21
//?>
//</code>
//
//@param Math_BigInteger $n
//@return Math_BigInteger
//@access public
//
//
//
//Absolute value.
//
//@return Math_BigInteger
//@access public
//
//
//
//Compares two numbers.
//
//Although one might think !$x->compare($y) means $x != $y, it, in fact, means the opposite.  The reason for this is
//demonstrated thusly:
//
//$x  > $y: $x->compare($y)  > 0
//$x  < $y: $x->compare($y)  < 0
//$x == $y: $x->compare($y) == 0
//
//Note how the same comparison operator is used.  If you want to test for equality, use $x->equals($y).
//
//@param Math_BigInteger $y
//@return Integer < 0 if $this is less than $y; > 0 if $this is greater than $y, and 0 if they are equal.
//@access public
//@see equals()
//@internal Could return $this->subtract($x), but that's not as fast as what we do do.
//
//
//
//Compares two numbers.
//
//@param Array $x_value
//@param Boolean $x_negative
//@param Array $y_value
//@param Boolean $y_negative
//@return Integer
//@see compare()
//@access private
//
//
//
//Tests the equality of two numbers.
//
//If you need to see if one number is greater than or less than another number, use Math_BigInteger::compare()
//
//@param Math_BigInteger $x
//@return Boolean
//@access public
//@see compare()
//
//
//
//Set Precision
//
//Some bitwise operations give different results depending on the precision being used.  Examples include left
//shift, not, and rotates.
//
//@param Integer $bits
//@access public
//
//
//
//Logical And
//
//@param Math_BigInteger $x
//@access public
//@internal Implemented per a request by Lluis Pamies i Juarez <lluis _a_ pamies.cat>
//@return Math_BigInteger
//
//
//
//Logical Or
//
//@param Math_BigInteger $x
//@access public
//@internal Implemented per a request by Lluis Pamies i Juarez <lluis _a_ pamies.cat>
//@return Math_BigInteger
//
//
//
//Logical Exclusive-Or
//
//@param Math_BigInteger $x
//@access public
//@internal Implemented per a request by Lluis Pamies i Juarez <lluis _a_ pamies.cat>
//@return Math_BigInteger
//
//
//
//Logical Not
//
//@access public
//@internal Implemented per a request by Lluis Pamies i Juarez <lluis _a_ pamies.cat>
//@return Math_BigInteger
//
//
//
//Logical Right Shift
//
//Shifts BigInteger's by $shift bits, effectively dividing by 2**$shift.
//
//@param Integer $shift
//@return Math_BigInteger
//@access public
//@internal The only version that yields any speed increases is the internal version.
//
//
//
//Logical Left Shift
//
//Shifts BigInteger's by $shift bits, effectively multiplying by 2**$shift.
//
//@param Integer $shift
//@return Math_BigInteger
//@access public
//@internal The only version that yields any speed increases is the internal version.
//
//
//
//Logical Left Rotate
//
//Instead of the top x bits being dropped they're appended to the shifted bit string.
//
//@param Integer $shift
//@return Math_BigInteger
//@access public
//
//
//
//Logical Right Rotate
//
//Instead of the bottom x bits being dropped they're prepended to the shifted bit string.
//
//@param Integer $shift
//@return Math_BigInteger
//@access public
//
//
//
//Set random number generator function
//
//This function is deprecated.
//
//@param String $generator
//@access public
//
//
//
//Generate a random number
//
//@param optional Integer $min
//@param optional Integer $max
//@return Math_BigInteger
//@access public
//
//
//
//Generate a random prime number.
//
//If there's not a prime within the given range, false will be returned.  If more than $timeout seconds have elapsed,
//give up and return false.
//
//@param optional Integer $min
//@param optional Integer $max
//@param optional Integer $timeout
//@return Math_BigInteger
//@access public
//@internal See {@link http://www.cacr.math.uwaterloo.ca/hac/about/chap4.pdf#page=15 HAC 4.44}.
//
//
//
//Make the current number odd
//
//If the current number is odd it'll be unchanged.  If it's even, one will be added to it.
//
//@see randomPrime()
//@access private
//
//
//
//Checks a numer to see if it's prime
//
//Assuming the $t parameter is not set, this function has an error rate of 2**-80.  The main motivation for the
//$t parameter is distributability.  Math_BigInteger::randomPrime() can be distributed accross multiple pageloads
//on a website instead of just one.
//
//@param optional Integer $t
//@return Boolean
//@access public
//@internal Uses the
//{@link http://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test Miller-Rabin primality test}.  See
//{@link http://www.cacr.math.uwaterloo.ca/hac/about/chap4.pdf#page=8 HAC 4.24}.
//
//
//
//Logical Left Shift
//
//Shifts BigInteger's by $shift bits.
//
//@param Integer $shift
//@access private
//
//
//
//Logical Right Shift
//
//Shifts BigInteger's by $shift bits.
//
//@param Integer $shift
//@access private
//
//
//
//Normalize
//
//Removes leading zeros and truncates (if necessary) to maintain the appropriate precision
//
//@param Math_BigInteger
//@return Math_BigInteger
//@see _trim()
//@access private
//
//
//
//Trim
//
//Removes leading zeros
//
//@param Array $value
//@return Math_BigInteger
//@access private
//
//
//
//Array Repeat
//
//@param $input Array
//@param $multiplier mixed
//@return Array
//@access private
//
//
//
//Logical Left Shift
//
//Shifts binary strings $shift bits, essentially multiplying by 2**$shift.
//
//@param $x String
//@param $shift Integer
//@return String
//@access private
//
//
//
//Logical Right Shift
//
//Shifts binary strings $shift bits, essentially dividing by 2**$shift and returning the remainder.
//
//@param $x String
//@param $shift Integer
//@return String
//@access private
//
//
//one quirk about how the following functions are implemented is that PHP defines N to be an unsigned long
//at 32-bits, while java's longs are 64-bits.
//
//Converts 32-bit integers to bytes.
//
//@param Integer $x
//@return String
//@access private
//
//
//
//Converts bytes to 32-bit integers
//
//@param String $x
//@return Integer
//@access private
//
//
//
//DER-encode an integer
//
//The ability to DER-encode integers is needed to create RSA public keys for use with OpenSSL
//
//@see modPow()
//@access private
//@param Integer $length
//@return String
//
//
class Math_BigInteger {
    constructor() {
        this.is_negative = false;
        this.generator = "mt_rand";
        this.precision = -1;
        this.bitmask = false;
    }

    Math_BigInteger(x = 0, base = 10) {
        if (!("undefined" !== typeof MATH_BIGINTEGER_MODE)) {
            switch (true) {
                case extension_loaded("gmp"):
                    global.MATH_BIGINTEGER_MODE = MATH_BIGINTEGER_MODE_GMP;
                    break;

                case extension_loaded("bcmath"):
                    global.MATH_BIGINTEGER_MODE = MATH_BIGINTEGER_MODE_BCMATH;
                    break;

                default:
                    global.MATH_BIGINTEGER_MODE = MATH_BIGINTEGER_MODE_INTERNAL;
            }
        }

        if ("function" === typeof openssl_public_encrypt && !("undefined" !== typeof MATH_BIGINTEGER_OPENSSL_DISABLE) && !("undefined" !== typeof MATH_BIGINTEGER_OPENSSL_ENABLED)) {
            global.MATH_BIGINTEGER_OPENSSL_ENABLED = true;
        }

        if (!("undefined" !== typeof PHP_INT_SIZE)) {
            global.PHP_INT_SIZE = 4;
        }

        if (!("undefined" !== typeof MATH_BIGINTEGER_BASE) && MATH_BIGINTEGER_MODE == MATH_BIGINTEGER_MODE_INTERNAL) {
            switch (PHP_INT_SIZE) {
                case 8:
                    global.MATH_BIGINTEGER_BASE = 31;
                    global.MATH_BIGINTEGER_BASE_FULL = 2147483648;
                    global.MATH_BIGINTEGER_MAX_DIGIT = 2147483647;
                    global.MATH_BIGINTEGER_MSB = 1073741824;
                    global.MATH_BIGINTEGER_MAX10 = 1000000000;
                    global.MATH_BIGINTEGER_MAX10_LEN = 9;
                    global.MATH_BIGINTEGER_MAX_DIGIT2 = Math.pow(2, 62);
                    break;

                default:
                    global.MATH_BIGINTEGER_BASE = 26;
                    global.MATH_BIGINTEGER_BASE_FULL = 67108864;
                    global.MATH_BIGINTEGER_MAX_DIGIT = 67108863;
                    global.MATH_BIGINTEGER_MSB = 33554432;
                    global.MATH_BIGINTEGER_MAX10 = 10000000;
                    global.MATH_BIGINTEGER_MAX10_LEN = 7;
                    global.MATH_BIGINTEGER_MAX_DIGIT2 = Math.pow(2, 52);
            }
        }

        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                if (is_resource(x) && get_resource_type(x) == "GMP integer") {
                    this.value = x;
                    return;
                }

                this.value = gmp_init(0);
                break;

            case MATH_BIGINTEGER_MODE_BCMATH:
                this.value = "0";
                break;

            default:
                this.value = Array();
        }

        if (!x && (Math.abs(base) != 256 || x !== "0")) {
            return;
        }

        switch (base) {
            case -256:
                if (x.charCodeAt(0) & 128) {
                    x = ~x;
                    this.is_negative = true;
                }

            case 256:
                switch (MATH_BIGINTEGER_MODE) {
                    case MATH_BIGINTEGER_MODE_GMP:
                        var sign = this.is_negative ? "-" : "";
                        this.value = gmp_init(sign + "0x" + bin2hex(x));
                        break;

                    case MATH_BIGINTEGER_MODE_BCMATH:
                        var len = x.length + 3 & 4294967292;
                        x = str_pad(x, len, String.fromCharCode(0), STR_PAD_LEFT);

                        for (var i = 0; i < len; i += 4) //4294967296 == 2**32
                        {
                            this.value = bcmul(this.value, "4294967296", 0);
                            this.value = bcadd(this.value, 16777216 * x.charCodeAt(i) + (x.charCodeAt(i + 1) << 16 | x.charCodeAt(i + 2) << 8 | x.charCodeAt(i + 3)), 0);
                        }

                        if (this.is_negative) {
                            this.value = "-" + this.value;
                        }

                        break;

                    default:
                        while (x.length) {
                            this.value.push(this._bytes2int(this._base256_rshift(x, MATH_BIGINTEGER_BASE)));
                        }

                }

                if (this.is_negative) {
                    if (MATH_BIGINTEGER_MODE != MATH_BIGINTEGER_MODE_INTERNAL) {
                        this.is_negative = false;
                    }

                    var temp = this.add(new Math_BigInteger("-1"));
                    this.value = temp.value;
                }

                break;

            case 16:
            case -16:
                if (base > 0 && x[0] == "-") {
                    this.is_negative = true;
                    x = x.substr(1);
                }

                x = x.replace(/^(?:0x)?([A-Fa-f0-9]*).*/g, "$1");
                var is_negative = false;

                if (base < 0 && hexdec(x[0]) >= 8) {
                    this.is_negative = is_negative = true;
                    x = bin2hex(~pack("H*", x));
                }

                switch (MATH_BIGINTEGER_MODE) {
                    case MATH_BIGINTEGER_MODE_GMP:
                        temp = this.is_negative ? "-0x" + x : "0x" + x;
                        this.value = gmp_init(temp);
                        this.is_negative = false;
                        break;

                    case MATH_BIGINTEGER_MODE_BCMATH:
                        x = x.length & 1 ? "0" + x : x;
                        temp = new Math_BigInteger(pack("H*", x), 256);
                        this.value = this.is_negative ? "-" + temp.value : temp.value;
                        this.is_negative = false;
                        break;

                    default:
                        x = x.length & 1 ? "0" + x : x;
                        temp = new Math_BigInteger(pack("H*", x), 256);
                        this.value = temp.value;
                }

                if (is_negative) {
                    temp = this.add(new Math_BigInteger("-1"));
                    this.value = temp.value;
                }

                break;

            case 10:
            case -10:
                x = x.replace(/(?<!^)(?:-).*|(?<=^|-)0*|[^-0-9].*/g, "");

                switch (MATH_BIGINTEGER_MODE) {
                    case MATH_BIGINTEGER_MODE_GMP:
                        this.value = gmp_init(x);
                        break;

                    case MATH_BIGINTEGER_MODE_BCMATH:
                        this.value = x === "-" ? "0" : String(x);
                        break;

                    default:
                        temp = new Math_BigInteger();
                        var multiplier = new Math_BigInteger();
                        multiplier.value = [MATH_BIGINTEGER_MAX10];

                        if (x[0] == "-") {
                            this.is_negative = true;
                            x = x.substr(1);
                        }

                        x = str_pad(x, x.length + (MATH_BIGINTEGER_MAX10_LEN - 1) * x.length % MATH_BIGINTEGER_MAX10_LEN, 0, STR_PAD_LEFT);

                        while (x.length) {
                            temp = temp.multiply(multiplier);
                            temp = temp.add(new Math_BigInteger(this._int2bytes(x.substr(0, MATH_BIGINTEGER_MAX10_LEN)), 256));
                            x = x.substr(MATH_BIGINTEGER_MAX10_LEN);
                        }

                        this.value = temp.value;
                }

                break;

            case 2:
            case -2:
                if (base > 0 && x[0] == "-") {
                    this.is_negative = true;
                    x = x.substr(1);
                }

                x = x.replace(/^([01]*).*/g, "$1");
                x = str_pad(x, x.length + 3 * x.length % 4, 0, STR_PAD_LEFT);
                var str = "0x";

                while (x.length) {
                    var part = x.substr(0, 4);
                    str += dechex(bindec(part));
                    x = x.substr(4);
                }

                if (this.is_negative) {
                    str = "-" + str;
                }

                temp = new Math_BigInteger(str, 8 * base);
                this.value = temp.value;
                this.is_negative = temp.is_negative;
                break;

            default:}
    }

    toBytes(twos_compliment = false) {
        if (twos_compliment) {
            var comparison = this.compare(new Math_BigInteger());

            if (comparison == 0) {
                return this.precision > 0 ? str_repeat(String.fromCharCode(0), this.precision + 1 >> 3) : "";
            }

            var temp = comparison < 0 ? this.add(new Math_BigInteger(1)) : this.copy();
            var bytes = temp.toBytes();

            if (!bytes) //eg. if the number we're trying to convert is -1
                {
                    bytes = String.fromCharCode(0);
                }

            if (bytes.charCodeAt(0) & 128) {
                bytes = String.fromCharCode(0) + bytes;
            }

            return comparison < 0 ? ~bytes : bytes;
        }

        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                if (gmp_cmp(this.value, gmp_init(0)) == 0) {
                    return this.precision > 0 ? str_repeat(String.fromCharCode(0), this.precision + 1 >> 3) : "";
                }

                temp = gmp_strval(gmp_abs(this.value), 16);
                temp = temp.length & 1 ? "0" + temp : temp;
                temp = pack("H*", temp);
                return this.precision > 0 ? str_pad(temp, this.precision >> 3, String.fromCharCode(0), STR_PAD_LEFT).substr(-(this.precision >> 3)) : ltrim(temp, String.fromCharCode(0));

            case MATH_BIGINTEGER_MODE_BCMATH:
                if (this.value === "0") {
                    return this.precision > 0 ? str_repeat(String.fromCharCode(0), this.precision + 1 >> 3) : "";
                }

                var value = "";
                var current = this.value;

                if (current[0] == "-") {
                    current = current.substr(1);
                }

                while (bccomp(current, "0", 0) > 0) {
                    temp = bcmod(current, "16777216");
                    value = String.fromCharCode(temp >> 16) + String.fromCharCode(temp >> 8) + String.fromCharCode(temp) + value;
                    current = bcdiv(current, "16777216", 0);
                }

                return this.precision > 0 ? str_pad(value, this.precision >> 3, String.fromCharCode(0), STR_PAD_LEFT).substr(-(this.precision >> 3)) : ltrim(value, String.fromCharCode(0));
        }

        if (!this.value.length) {
            return this.precision > 0 ? str_repeat(String.fromCharCode(0), this.precision + 1 >> 3) : "";
        }

        var result = this._int2bytes(this.value[this.value.length - 1]);

        temp = this.copy();

        for (var i = temp.value.length - 2; i >= 0; --i) {
            temp._base256_lshift(result, MATH_BIGINTEGER_BASE);

            result = result | str_pad(temp._int2bytes(temp.value[i]), result.length, String.fromCharCode(0), STR_PAD_LEFT);
        }

        return this.precision > 0 ? str_pad(result.substr(-(this.precision + 7 >> 3)), this.precision + 7 >> 3, String.fromCharCode(0), STR_PAD_LEFT) : result;
    }

    toHex(twos_compliment = false) {
        return bin2hex(this.toBytes(twos_compliment));
    }

    toBits(twos_compliment = false) {
        var i, start;
        var hex = this.toHex(twos_compliment);
        var bits = "";

        for (i = hex.length - 8, start = hex.length & 7; i >= start; i -= 8) {
            bits = str_pad(decbin(hexdec(hex.substr(i, 8))), 32, "0", STR_PAD_LEFT) + bits;
        }

        if (start) //hexdec('') == 0
            {
                bits = str_pad(decbin(hexdec(hex.substr(0, start))), 8, "0", STR_PAD_LEFT) + bits;
            }

        var result = this.precision > 0 ? bits.substr(-this.precision) : ltrim(bits, "0");

        if (twos_compliment && this.compare(new Math_BigInteger()) > 0 && this.precision <= 0) {
            return "0" + result;
        }

        return result;
    }

    toString() {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                return gmp_strval(this.value);

            case MATH_BIGINTEGER_MODE_BCMATH:
                if (this.value === "0") {
                    return "0";
                }

                return ltrim(this.value, "0");
        }

        if (!this.value.length) {
            return "0";
        }

        var temp = this.copy();
        temp.is_negative = false;
        var divisor = new Math_BigInteger();
        divisor.value = [MATH_BIGINTEGER_MAX10];
        var result = "";

        while (temp.value.length) {
            var mod;
            [temp, mod] = temp.divide(divisor);
            result = str_pad(undefined !== mod.value[0] ? mod.value[0] : "", MATH_BIGINTEGER_MAX10_LEN, "0", STR_PAD_LEFT) + result;
        }

        result = ltrim(result, "0");

        if (!result) {
            result = "0";
        }

        if (this.is_negative) {
            result = "-" + result;
        }

        return result;
    }

    copy() {
        var temp = new Math_BigInteger();
        temp.value = this.value;
        temp.is_negative = this.is_negative;
        temp.generator = this.generator;
        temp.precision = this.precision;
        temp.bitmask = this.bitmask;
        return temp;
    }

    __toString() {
        return this.toString();
    }

    __clone() {
        return this.copy();
    }

    __sleep() {
        this.hex = this.toHex(true);
        var vars = ["hex"];

        if (this.generator != "mt_rand") {
            vars.push("generator");
        }

        if (this.precision > 0) {
            vars.push("precision");
        }

        return vars;
    }

    __wakeup() {
        var temp = new Math_BigInteger(this.hex, -16);
        this.value = temp.value;
        this.is_negative = temp.is_negative;
        this.setRandomGenerator(this.generator);

        if (this.precision > 0) //recalculate $this->bitmask
            {
                this.setPrecision(this.precision);
            }
    }

    add(y) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                var temp = new Math_BigInteger();
                temp.value = gmp_add(this.value, y.value);
                return this._normalize(temp);

            case MATH_BIGINTEGER_MODE_BCMATH:
                temp = new Math_BigInteger();
                temp.value = bcadd(this.value, y.value, 0);
                return this._normalize(temp);
        }

        temp = this._add(this.value, this.is_negative, y.value, y.is_negative);
        var result = new Math_BigInteger();
        result.value = temp[MATH_BIGINTEGER_VALUE];
        result.is_negative = temp[MATH_BIGINTEGER_SIGN];
        return this._normalize(result);
    }

    _add(x_value, x_negative, y_value, y_negative) //just in case the carry adds an extra digit
    {
        var x_size = x_value.length;
        var y_size = y_value.length;

        if (x_size == 0) {
            return {
                [MATH_BIGINTEGER_VALUE]: y_value,
                [MATH_BIGINTEGER_SIGN]: y_negative
            };
        } else if (y_size == 0) {
            return {
                [MATH_BIGINTEGER_VALUE]: x_value,
                [MATH_BIGINTEGER_SIGN]: x_negative
            };
        }

        if (x_negative != y_negative) {
            if (x_value == y_value) {
                return {
                    [MATH_BIGINTEGER_VALUE]: Array(),
                    [MATH_BIGINTEGER_SIGN]: false
                };
            }

            var temp = this._subtract(x_value, false, y_value, false);

            temp[MATH_BIGINTEGER_SIGN] = this._compare(x_value, false, y_value, false) > 0 ? x_negative : y_negative;
            return temp;
        }

        if (x_size < y_size) {
            var size = x_size;
            var value = y_value;
        } else {
            size = y_size;
            value = x_value;
        }

        value.push(0);
        var carry = 0;

        for (i = 0, j = 1; j < size; i += 2, j += 2) //eg. floor($sum / 2**52); only possible values (in any base) are 0 and 1
        //eg. a faster alternative to fmod($sum, 0x4000000)
        {
            var sum = x_value[j] * MATH_BIGINTEGER_BASE_FULL + x_value[i] + y_value[j] * MATH_BIGINTEGER_BASE_FULL + y_value[i] + carry;
            carry = sum >= MATH_BIGINTEGER_MAX_DIGIT2;
            sum = carry ? sum - MATH_BIGINTEGER_MAX_DIGIT2 : sum;
            temp = +(sum / MATH_BIGINTEGER_BASE_FULL);
            value[i] = +(sum - MATH_BIGINTEGER_BASE_FULL * temp);
            value[j] = temp;
        }

        if (j == size) //ie. if $y_size is odd
            //ie. let $i = $j since we've just done $value[$i]
            {
                sum = x_value[i] + y_value[i] + carry;
                carry = sum >= MATH_BIGINTEGER_BASE_FULL;
                value[i] = carry ? sum - MATH_BIGINTEGER_BASE_FULL : sum;
                ++i;
            }

        if (carry) {
            for (; value[i] == MATH_BIGINTEGER_MAX_DIGIT; ++i) {
                value[i] = 0;
            }

            ++value[i];
        }

        return {
            [MATH_BIGINTEGER_VALUE]: this._trim(value),
            [MATH_BIGINTEGER_SIGN]: x_negative
        };
    }

    subtract(y) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                var temp = new Math_BigInteger();
                temp.value = gmp_sub(this.value, y.value);
                return this._normalize(temp);

            case MATH_BIGINTEGER_MODE_BCMATH:
                temp = new Math_BigInteger();
                temp.value = bcsub(this.value, y.value, 0);
                return this._normalize(temp);
        }

        temp = this._subtract(this.value, this.is_negative, y.value, y.is_negative);
        var result = new Math_BigInteger();
        result.value = temp[MATH_BIGINTEGER_VALUE];
        result.is_negative = temp[MATH_BIGINTEGER_SIGN];
        return this._normalize(result);
    }

    _subtract(x_value, x_negative, y_value, y_negative) {
        var x_size = x_value.length;
        var y_size = y_value.length;

        if (x_size == 0) {
            return {
                [MATH_BIGINTEGER_VALUE]: y_value,
                [MATH_BIGINTEGER_SIGN]: !y_negative
            };
        } else if (y_size == 0) {
            return {
                [MATH_BIGINTEGER_VALUE]: x_value,
                [MATH_BIGINTEGER_SIGN]: x_negative
            };
        }

        if (x_negative != y_negative) {
            var temp = this._add(x_value, false, y_value, false);

            temp[MATH_BIGINTEGER_SIGN] = x_negative;
            return temp;
        }

        var diff = this._compare(x_value, x_negative, y_value, y_negative);

        if (!diff) {
            return {
                [MATH_BIGINTEGER_VALUE]: Array(),
                [MATH_BIGINTEGER_SIGN]: false
            };
        }

        if (!x_negative && diff < 0 || x_negative && diff > 0) {
            temp = x_value;
            x_value = y_value;
            y_value = temp;
            x_negative = !x_negative;
            x_size = x_value.length;
            y_size = y_value.length;
        }

        var carry = 0;

        for (i = 0, j = 1; j < y_size; i += 2, j += 2) //eg. floor($sum / 2**52); only possible values (in any base) are 0 and 1
        {
            var sum = x_value[j] * MATH_BIGINTEGER_BASE_FULL + x_value[i] - y_value[j] * MATH_BIGINTEGER_BASE_FULL - y_value[i] - carry;
            carry = sum < 0;
            sum = carry ? sum + MATH_BIGINTEGER_MAX_DIGIT2 : sum;
            temp = +(sum / MATH_BIGINTEGER_BASE_FULL);
            x_value[i] = +(sum - MATH_BIGINTEGER_BASE_FULL * temp);
            x_value[j] = temp;
        }

        if (j == y_size) //ie. if $y_size is odd
            {
                sum = x_value[i] - y_value[i] - carry;
                carry = sum < 0;
                x_value[i] = carry ? sum + MATH_BIGINTEGER_BASE_FULL : sum;
                ++i;
            }

        if (carry) {
            for (; !x_value[i]; ++i) {
                x_value[i] = MATH_BIGINTEGER_MAX_DIGIT;
            }

            --x_value[i];
        }

        return {
            [MATH_BIGINTEGER_VALUE]: this._trim(x_value),
            [MATH_BIGINTEGER_SIGN]: x_negative
        };
    }

    multiply(x) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                var temp = new Math_BigInteger();
                temp.value = gmp_mul(this.value, x.value);
                return this._normalize(temp);

            case MATH_BIGINTEGER_MODE_BCMATH:
                temp = new Math_BigInteger();
                temp.value = bcmul(this.value, x.value, 0);
                return this._normalize(temp);
        }

        temp = this._multiply(this.value, this.is_negative, x.value, x.is_negative);
        var product = new Math_BigInteger();
        product.value = temp[MATH_BIGINTEGER_VALUE];
        product.is_negative = temp[MATH_BIGINTEGER_SIGN];
        return this._normalize(product);
    }

    _multiply(x_value, x_negative, y_value, y_negative) //if ( $x_value == $y_value ) {
    //return array(
    //MATH_BIGINTEGER_VALUE => $this->_square($x_value),
    //MATH_BIGINTEGER_SIGN => $x_sign != $y_value
    //);
    //}
    {
        var x_length = x_value.length;
        var y_length = y_value.length;

        if (!x_length || !y_length) //a 0 is being multiplied
            {
                return {
                    [MATH_BIGINTEGER_VALUE]: Array(),
                    [MATH_BIGINTEGER_SIGN]: false
                };
            }

        return {
            [MATH_BIGINTEGER_VALUE]: Math.min(x_length, y_length) < 2 * MATH_BIGINTEGER_KARATSUBA_CUTOFF ? this._trim(this._regularMultiply(x_value, y_value)) : this._trim(this._karatsuba(x_value, y_value)),
            [MATH_BIGINTEGER_SIGN]: x_negative != y_negative
        };
    }

    _regularMultiply(x_value, y_value) //the following for loop could be removed if the for loop following it
    //(the one with nested for loops) initially set $i to 0, but
    //doing so would also make the result in one set of unnecessary adds,
    //since on the outermost loops first pass, $product->value[$k] is going
    //to always be 0
    //the above for loop is what the previous comment was talking about.  the
    //following for loop is the "one with nested for loops"
    {
        var x_length = x_value.length;
        var y_length = y_value.length;

        if (!x_length || !y_length) //a 0 is being multiplied
            {
                return Array();
            }

        if (x_length < y_length) {
            var temp = x_value;
            x_value = y_value;
            y_value = temp;
            x_length = x_value.length;
            y_length = y_value.length;
        }

        var product_value = this._array_repeat(0, x_length + y_length);

        var carry = 0;

        for (var j = 0; j < x_length; ++j) //ie. $i = 0
        //$product_value[$k] == 0
        {
            temp = x_value[j] * y_value[0] + carry;
            carry = +(temp / MATH_BIGINTEGER_BASE_FULL);
            product_value[j] = +(temp - MATH_BIGINTEGER_BASE_FULL * carry);
        }

        product_value[j] = carry;

        for (var i = 1; i < y_length; ++i) {
            var k;
            carry = 0;

            for (j = 0, k = i; j < x_length; ++j, ++k) {
                temp = product_value[k] + x_value[j] * y_value[i] + carry;
                carry = +(temp / MATH_BIGINTEGER_BASE_FULL);
                product_value[k] = +(temp - MATH_BIGINTEGER_BASE_FULL * carry);
            }

            product_value[k] = carry;
        }

        return product_value;
    }

    _karatsuba(x_value, y_value) {
        var m = Math.min(x_value.length >> 1, y_value.length >> 1);

        if (m < MATH_BIGINTEGER_KARATSUBA_CUTOFF) {
            return this._regularMultiply(x_value, y_value);
        }

        var x1 = x_value.slice(m);
        var x0 = x_value.slice(0, m);
        var y1 = y_value.slice(m);
        var y0 = y_value.slice(0, m);

        var z2 = this._karatsuba(x1, y1);

        var z0 = this._karatsuba(x0, y0);

        var z1 = this._add(x1, false, x0, false);

        var temp = this._add(y1, false, y0, false);

        z1 = this._karatsuba(z1[MATH_BIGINTEGER_VALUE], temp[MATH_BIGINTEGER_VALUE]);
        temp = this._add(z2, false, z0, false);
        z1 = this._subtract(z1, false, temp[MATH_BIGINTEGER_VALUE], false);
        z2 = array_merge(array_fill(0, 2 * m, 0), z2);
        z1[MATH_BIGINTEGER_VALUE] = array_merge(array_fill(0, m, 0), z1[MATH_BIGINTEGER_VALUE]);

        var xy = this._add(z2, false, z1[MATH_BIGINTEGER_VALUE], z1[MATH_BIGINTEGER_SIGN]);

        xy = this._add(xy[MATH_BIGINTEGER_VALUE], xy[MATH_BIGINTEGER_SIGN], z0, false);
        return xy[MATH_BIGINTEGER_VALUE];
    }

    _square(x = false) {
        return x.length < 2 * MATH_BIGINTEGER_KARATSUBA_CUTOFF ? this._trim(this._baseSquare(x)) : this._trim(this._karatsubaSquare(x));
    }

    _baseSquare(value) {
        if (!value) {
            return Array();
        }

        var square_value = this._array_repeat(0, 2 * value.length);

        for (i = 0, max_index = value.length - 1; i <= max_index; ++i) //note how we start from $i+1 instead of 0 as we do in multiplication.
        //the following line can yield values larger 2**15.  at this point, PHP should switch
        //over to floats.
        {
            var j, k;
            var i2 = i << 1;
            var temp = square_value[i2] + value[i] * value[i];
            var carry = +(temp / MATH_BIGINTEGER_BASE_FULL);
            square_value[i2] = +(temp - MATH_BIGINTEGER_BASE_FULL * carry);

            for (j = i + 1, k = i2 + 1; j <= max_index; ++j, ++k) {
                temp = square_value[k] + 2 * value[j] * value[i] + carry;
                carry = +(temp / MATH_BIGINTEGER_BASE_FULL);
                square_value[k] = +(temp - MATH_BIGINTEGER_BASE_FULL * carry);
            }

            square_value[i + max_index + 1] = carry;
        }

        return square_value;
    }

    _karatsubaSquare(value) {
        var m = value.length >> 1;

        if (m < MATH_BIGINTEGER_KARATSUBA_CUTOFF) {
            return this._baseSquare(value);
        }

        var x1 = value.slice(m);
        var x0 = value.slice(0, m);

        var z2 = this._karatsubaSquare(x1);

        var z0 = this._karatsubaSquare(x0);

        var z1 = this._add(x1, false, x0, false);

        z1 = this._karatsubaSquare(z1[MATH_BIGINTEGER_VALUE]);

        var temp = this._add(z2, false, z0, false);

        z1 = this._subtract(z1, false, temp[MATH_BIGINTEGER_VALUE], false);
        z2 = array_merge(array_fill(0, 2 * m, 0), z2);
        z1[MATH_BIGINTEGER_VALUE] = array_merge(array_fill(0, m, 0), z1[MATH_BIGINTEGER_VALUE]);

        var xx = this._add(z2, false, z1[MATH_BIGINTEGER_VALUE], z1[MATH_BIGINTEGER_SIGN]);

        xx = this._add(xx[MATH_BIGINTEGER_VALUE], xx[MATH_BIGINTEGER_SIGN], z0, false);
        return xx[MATH_BIGINTEGER_VALUE];
    }

    divide(y) //$temp = $y << ($x_max - $y_max-1) in base 2**26
    //unnormalize the remainder
    //calculate the "common residue", if appropriate
    {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                var quotient = new Math_BigInteger();
                var remainder = new Math_BigInteger();
                [quotient.value, remainder.value] = gmp_div_qr(this.value, y.value);

                if (gmp_sign(remainder.value) < 0) {
                    remainder.value = gmp_add(remainder.value, gmp_abs(y.value));
                }

                return [this._normalize(quotient), this._normalize(remainder)];

            case MATH_BIGINTEGER_MODE_BCMATH:
                quotient = new Math_BigInteger();
                remainder = new Math_BigInteger();
                quotient.value = bcdiv(this.value, y.value, 0);
                remainder.value = bcmod(this.value, y.value);

                if (remainder.value[0] == "-") {
                    remainder.value = bcadd(remainder.value, y.value[0] == "-" ? y.value.substr(1) : y.value, 0);
                }

                return [this._normalize(quotient), this._normalize(remainder)];
        }

        if (y.value.length == 1) {
            var q, r;
            [q, r] = this._divide_digit(this.value, y.value[0]);
            quotient = new Math_BigInteger();
            remainder = new Math_BigInteger();
            quotient.value = q;
            remainder.value = [r];
            quotient.is_negative = this.is_negative != y.is_negative;
            return [this._normalize(quotient), this._normalize(remainder)];
        }

        if (!("_static_Math_BigInteger_divide_zero" in global)) _static_Math_BigInteger_divide_zero = undefined;

        if (!(undefined !== _static_Math_BigInteger_divide_zero)) {
            _static_Math_BigInteger_divide_zero = new Math_BigInteger();
        }

        var x = this.copy();
        y = y.copy();
        var x_sign = x.is_negative;
        var y_sign = y.is_negative;
        x.is_negative = y.is_negative = false;
        var diff = x.compare(y);

        if (!diff) {
            var temp = new Math_BigInteger();
            temp.value = [1];
            temp.is_negative = x_sign != y_sign;
            return [this._normalize(temp), this._normalize(new Math_BigInteger())];
        }

        if (diff < 0) //if $x is negative, "add" $y.
            {
                if (x_sign) {
                    x = y.subtract(x);
                }

                return [this._normalize(new Math_BigInteger()), this._normalize(x)];
            }

        var msb = y.value[y.value.length - 1];

        for (var shift = 0; !(msb & MATH_BIGINTEGER_MSB); ++shift) {
            msb <<= 1;
        }

        x._lshift(shift);

        y._lshift(shift);

        var y_value = y.value;
        var x_max = x.value.length - 1;
        var y_max = y.value.length - 1;
        quotient = new Math_BigInteger();
        var quotient_value = quotient.value;
        quotient_value = this._array_repeat(0, x_max - y_max + 1);
        {
            if (!("_static_Math_BigInteger_divide_temp" in global)) _static_Math_BigInteger_divide_temp = undefined;
            if (!("_static_Math_BigInteger_divide_lhs" in global)) _static_Math_BigInteger_divide_lhs = undefined;
            if (!("_static_Math_BigInteger_divide_rhs" in global)) _static_Math_BigInteger_divide_rhs = undefined;
        }

        if (!(undefined !== temp)) {
            temp = new Math_BigInteger();
            _static_Math_BigInteger_divide_lhs = new Math_BigInteger();
            _static_Math_BigInteger_divide_rhs = new Math_BigInteger();
        }

        var temp_value = temp.value;
        var rhs_value = _static_Math_BigInteger_divide_rhs.value;
        temp_value = array_merge(this._array_repeat(0, x_max - y_max), y_value);

        while (x.compare(temp) >= 0) //calculate the "common residue"
        {
            ++quotient_value[x_max - y_max];
            x = x.subtract(temp);
            x_max = x.value.length - 1;
        }

        for (var i = x_max; i >= y_max + 1; --i) {
            var x_value = x.value;
            var x_window = [undefined !== x_value[i] ? x_value[i] : 0, undefined !== x_value[i - 1] ? x_value[i - 1] : 0, undefined !== x_value[i - 2] ? x_value[i - 2] : 0];
            var y_window = [y_value[y_max], y_max > 0 ? y_value[y_max - 1] : 0];
            var q_index = i - y_max - 1;

            if (x_window[0] == y_window[0]) {
                quotient_value[q_index] = MATH_BIGINTEGER_MAX_DIGIT;
            } else {
                quotient_value[q_index] = +((x_window[0] * MATH_BIGINTEGER_BASE_FULL + x_window[1]) / y_window[0]);
            }

            temp_value = [y_window[1], y_window[0]];
            _static_Math_BigInteger_divide_lhs.value = [quotient_value[q_index]];
            _static_Math_BigInteger_divide_lhs = _static_Math_BigInteger_divide_lhs.multiply(temp);
            rhs_value = [x_window[2], x_window[1], x_window[0]];

            while (_static_Math_BigInteger_divide_lhs.compare(_static_Math_BigInteger_divide_rhs) > 0) {
                --quotient_value[q_index];
                _static_Math_BigInteger_divide_lhs.value = [quotient_value[q_index]];
                _static_Math_BigInteger_divide_lhs = _static_Math_BigInteger_divide_lhs.multiply(temp);
            }

            var adjust = this._array_repeat(0, q_index);

            temp_value = [quotient_value[q_index]];
            temp = temp.multiply(y);
            temp_value = temp.value;
            temp_value = array_merge(adjust, temp_value);
            x = x.subtract(temp);

            if (x.compare(_static_Math_BigInteger_divide_zero) < 0) {
                temp_value = array_merge(adjust, y_value);
                x = x.add(temp);
                --quotient_value[q_index];
            }

            x_max = x_value.length - 1;
        }

        x._rshift(shift);

        quotient.is_negative = x_sign != y_sign;

        if (x_sign) {
            y._rshift(shift);

            x = y.subtract(x);
        }

        return [this._normalize(quotient), this._normalize(x)];
    }

    _divide_digit(dividend, divisor) {
        var carry = 0;
        var result = Array();

        for (var i = dividend.length - 1; i >= 0; --i) {
            _static_Math_BigInteger_divide_temp = MATH_BIGINTEGER_BASE_FULL * carry + dividend[i];
            result[i] = +(_static_Math_BigInteger_divide_temp / divisor);
            carry = +(_static_Math_BigInteger_divide_temp - divisor * result[i]);
        }

        return [result, carry];
    }

    modPow(e, n) //is the modulo odd?
    //at this point, 2^$j * $n/(2^$j) == $n
    {
        n = this.bitmask !== false && this.bitmask.compare(n) < 0 ? this.bitmask : n.abs();

        if (e.compare(new Math_BigInteger()) < 0) {
            e = e.abs();
            _static_Math_BigInteger_divide_temp = this.modInverse(n);

            if (_static_Math_BigInteger_divide_temp === false) {
                return false;
            }

            return this._normalize(_static_Math_BigInteger_divide_temp.modPow(e, n));
        }

        if (MATH_BIGINTEGER_MODE == MATH_BIGINTEGER_MODE_GMP) {
            _static_Math_BigInteger_divide_temp = new Math_BigInteger();
            _static_Math_BigInteger_divide_temp.value = gmp_powm(this.value, e.value, n.value);
            return this._normalize(_static_Math_BigInteger_divide_temp);
        }

        if (this.compare(new Math_BigInteger()) < 0 || this.compare(n) > 0) {
            [_static_Math_BigInteger_divide_temp] = this.divide(n);
            return _static_Math_BigInteger_divide_temp.modPow(e, n);
        }

        if ("undefined" !== typeof MATH_BIGINTEGER_OPENSSL_ENABLED) //hex version of MA0GCSqGSIb3DQEBAQUA
            {
                var components = {
                    modulus: n.toBytes(true),
                    publicExponent: e.toBytes(true)
                };
                components = {
                    modulus: pack("Ca*a*", 2, this._encodeASN1Length(components.modulus.length), components.modulus),
                    publicExponent: pack("Ca*a*", 2, this._encodeASN1Length(components.publicExponent.length), components.publicExponent)
                };
                var RSAPublicKey = pack("Ca*a*a*", 48, this._encodeASN1Length(components.modulus.length + components.publicExponent.length), components.modulus, components.publicExponent);
                var rsaOID = pack("H*", "300d06092a864886f70d0101010500");
                RSAPublicKey = String.fromCharCode(0) + RSAPublicKey;
                RSAPublicKey = String.fromCharCode(3) + this._encodeASN1Length(RSAPublicKey.length) + RSAPublicKey;
                var encapsulated = pack("Ca*a*", 48, this._encodeASN1Length((rsaOID + RSAPublicKey).length), rsaOID + RSAPublicKey);
                RSAPublicKey = "-----BEGIN PUBLIC KEY-----\r\n" + chunk_split(base64_encode(encapsulated)) + "-----END PUBLIC KEY-----";
                var plaintext = str_pad(this.toBytes(), n.toBytes(true).length - 1, "\\0", STR_PAD_LEFT);

                if (openssl_public_encrypt(plaintext, result, RSAPublicKey, OPENSSL_NO_PADDING)) {
                    return new Math_BigInteger(result, 256);
                }
            }

        if (MATH_BIGINTEGER_MODE == MATH_BIGINTEGER_MODE_BCMATH) {
            _static_Math_BigInteger_divide_temp = new Math_BigInteger();
            _static_Math_BigInteger_divide_temp.value = bcpowmod(this.value, e.value, n.value, 0);
            return this._normalize(_static_Math_BigInteger_divide_temp);
        }

        if (!e.value) {
            _static_Math_BigInteger_divide_temp = new Math_BigInteger();
            _static_Math_BigInteger_divide_temp.value = [1];
            return this._normalize(_static_Math_BigInteger_divide_temp);
        }

        if (e.value == [1]) {
            [_static_Math_BigInteger_divide_temp] = this.divide(n);
            return this._normalize(_static_Math_BigInteger_divide_temp);
        }

        if (e.value == [2]) {
            _static_Math_BigInteger_divide_temp = new Math_BigInteger();
            _static_Math_BigInteger_divide_temp.value = this._square(this.value);
            [_static_Math_BigInteger_divide_temp] = _static_Math_BigInteger_divide_temp.divide(n);
            return this._normalize(_static_Math_BigInteger_divide_temp);
        }

        return this._normalize(this._slidingWindow(e, n, MATH_BIGINTEGER_BARRETT));

        if (n.value[0] & 1) {
            return this._normalize(this._slidingWindow(e, n, MATH_BIGINTEGER_MONTGOMERY));
        }

        for (var i = 0; i < n.value.length; ++i) {
            if (n.value[i]) {
                _static_Math_BigInteger_divide_temp = decbin(n.value[i]);
                var j = _static_Math_BigInteger_divide_temp.length - strrpos(_static_Math_BigInteger_divide_temp, "1") - 1;
                j += 26 * i;
                break;
            }
        }

        var mod1 = n.copy();

        mod1._rshift(j);

        var mod2 = new Math_BigInteger();
        mod2.value = [1];

        mod2._lshift(j);

        var part1 = mod1.value != [1] ? this._slidingWindow(e, mod1, MATH_BIGINTEGER_MONTGOMERY) : new Math_BigInteger();

        var part2 = this._slidingWindow(e, mod2, MATH_BIGINTEGER_POWEROF2);

        var y1 = mod2.modInverse(mod1);
        var y2 = mod1.modInverse(mod2);
        var result = part1.multiply(mod2);
        result = result.multiply(y1);
        _static_Math_BigInteger_divide_temp = part2.multiply(mod1);
        _static_Math_BigInteger_divide_temp = _static_Math_BigInteger_divide_temp.multiply(y2);
        result = result.add(_static_Math_BigInteger_divide_temp);
        [result] = result.divide(n);
        return this._normalize(result);
    }

    powMod(e, n) {
        return this.modPow(e, n);
    }

    _slidingWindow(e, n, mode) //from BigInteger.java's oddModPow function
    //static $window_ranges = array(0, 7, 36, 140, 450, 1303, 3529); // from MPM 7.3.1
    //calculate the appropriate window size.
    //$window_size == 3 if $window_ranges is between 25 and 81, for example.
    //precompute $this^0 through $this^$window_size
    //we do every other number since substr($e_bits, $i, $j+1) (see below) is supposed to end
    //in a 1.  ie. it's supposed to be odd.
    {
        if (!("_static_Math_BigInteger__slidingWindow_window_ranges" in global)) _static_Math_BigInteger__slidingWindow_window_ranges = [7, 25, 81, 241, 673, 1793];
        var e_value = e.value;
        var e_length = e_value.length - 1;
        var e_bits = decbin(e_value[e_length]);

        for (var i = e_length - 1; i >= 0; --i) {
            e_bits += str_pad(decbin(e_value[i]), MATH_BIGINTEGER_BASE, "0", STR_PAD_LEFT);
        }

        e_length = e_bits.length;

        for (i = 0, window_size = 1; e_length > _static_Math_BigInteger__slidingWindow_window_ranges[i] && i < _static_Math_BigInteger__slidingWindow_window_ranges.length; ++window_size, ++i)

        var n_value = n.value;
        var powers = Array();
        powers[1] = this._prepareReduce(this.value, n_value, mode);
        powers[2] = this._squareReduce(powers[1], n_value, mode);
        _static_Math_BigInteger_divide_temp = 1 << window_size - 1;

        for (i = 1;; i < _static_Math_BigInteger_divide_temp; ++i) {
            var i2 = i << 1;
            powers[i2 + 1] = this._multiplyReduce(powers[i2 - 1], powers[2], n_value, mode);
        }

        var result = [1];
        result = this._prepareReduce(result, n_value, mode);

        for (i = 0;; i < e_length; ) {
            if (!e_bits[i]) {
                result = this._squareReduce(result, n_value, mode);
                ++i;
            } else {
                for (var j = window_size - 1; j > 0; --j) {
                    if (!!e_bits[i + j]) {
                        break;
                    }
                }

                for (var k = 0; k <= j; ++k) //eg. the length of substr($e_bits, $i, $j+1)
                {
                    result = this._squareReduce(result, n_value, mode);
                }

                result = this._multiplyReduce(result, powers[bindec(e_bits.substr(i, j + 1))], n_value, mode);
                i += j + 1;
            }
        }

        _static_Math_BigInteger_divide_temp = new Math_BigInteger();
        _static_Math_BigInteger_divide_temp.value = this._reduce(result, n_value, mode);
        return _static_Math_BigInteger_divide_temp;
    }

    _reduce(x, n, mode) {
        switch (mode) {
            case MATH_BIGINTEGER_MONTGOMERY:
                return this._montgomery(x, n);

            case MATH_BIGINTEGER_BARRETT:
                return this._barrett(x, n);

            case MATH_BIGINTEGER_POWEROF2:
                _static_Math_BigInteger_divide_lhs = new Math_BigInteger();
                _static_Math_BigInteger_divide_lhs.value = x;
                _static_Math_BigInteger_divide_rhs = new Math_BigInteger();
                _static_Math_BigInteger_divide_rhs.value = n;
                return x._mod2(n);

            case MATH_BIGINTEGER_CLASSIC:
                _static_Math_BigInteger_divide_lhs = new Math_BigInteger();
                _static_Math_BigInteger_divide_lhs.value = x;
                _static_Math_BigInteger_divide_rhs = new Math_BigInteger();
                _static_Math_BigInteger_divide_rhs.value = n;
                [_static_Math_BigInteger_divide_temp] = _static_Math_BigInteger_divide_lhs.divide(_static_Math_BigInteger_divide_rhs);
                return _static_Math_BigInteger_divide_temp.value;

            case MATH_BIGINTEGER_NONE:
                return x;

            default:}
    }

    _prepareReduce(x, n, mode) {
        if (mode == MATH_BIGINTEGER_MONTGOMERY) {
            return this._prepMontgomery(x, n);
        }

        return this._reduce(x, n, mode);
    }

    _multiplyReduce(x, y, n, mode) {
        if (mode == MATH_BIGINTEGER_MONTGOMERY) {
            return this._montgomeryMultiply(x, y, n);
        }

        _static_Math_BigInteger_divide_temp = this._multiply(x, false, y, false);
        return this._reduce(_static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_VALUE], n, mode);
    }

    _squareReduce(x, n, mode) {
        if (mode == MATH_BIGINTEGER_MONTGOMERY) {
            return this._montgomeryMultiply(x, x, n);
        }

        return this._reduce(this._square(x), n, mode);
    }

    _mod2(n) {
        _static_Math_BigInteger_divide_temp = new Math_BigInteger();
        _static_Math_BigInteger_divide_temp.value = [1];
        return this.bitwise_and(n.subtract(_static_Math_BigInteger_divide_temp));
    }

    _barrett(n, m) //if ($this->_compare($n, $this->_square($m)) >= 0) {
    //m.length + (m.length >> 1)
    //m.length >> 1
    //m.length + (m.length >> 1) + 1
    //if even: ((m.length >> 1) + 2) + (m.length >> 1) == m.length + 2
    //if odd:  ((m.length >> 1) + 2) + (m.length >> 1) == (m.length - 1) + 2 == m.length + 1
    //if even: (m.length + 2) - ((m.length >> 1) + 1) = m.length - (m.length >> 1) + 1
    //if odd:  (m.length + 1) - ((m.length >> 1) + 1) = m.length - (m.length >> 1)
    //if even: (m.length - (m.length >> 1) + 1) + m.length = 2 * m.length - (m.length >> 1) + 1
    //if odd:  (m.length - (m.length >> 1)) + m.length     = 2 * m.length - (m.length >> 1)
    //at this point, if m had an odd number of digits, we'd be subtracting a 2 * m.length - (m.length >> 1) digit
    //number from a m.length + (m.length >> 1) + 1 digit number.  ie. there'd be an extra digit and the while loop
    //following this comment would loop a lot (hence our calling _regularBarrett() in that situation).
    {
        if (!("_static_Math_BigInteger__barrett_cache" in global)) _static_Math_BigInteger__barrett_cache = {
            [MATH_BIGINTEGER_VARIABLE]: Array(),
            [MATH_BIGINTEGER_DATA]: Array()
        };
        var m_length = m.length;

        if (n.length > 2 * m_length) {
            _static_Math_BigInteger_divide_lhs = new Math_BigInteger();
            _static_Math_BigInteger_divide_rhs = new Math_BigInteger();
            _static_Math_BigInteger_divide_lhs.value = n;
            _static_Math_BigInteger_divide_rhs.value = m;
            [_static_Math_BigInteger_divide_temp] = _static_Math_BigInteger_divide_lhs.divide(_static_Math_BigInteger_divide_rhs);
            return _static_Math_BigInteger_divide_temp.value;
        }

        if (m_length < 5) {
            return this._regularBarrett(n, m);
        }

        if ((key = array_search(m, _static_Math_BigInteger__barrett_cache[MATH_BIGINTEGER_VARIABLE])) === false) {
            var u, m1;
            key = _static_Math_BigInteger__barrett_cache[MATH_BIGINTEGER_VARIABLE].length;

            _static_Math_BigInteger__barrett_cache[MATH_BIGINTEGER_VARIABLE].push(m);

            _static_Math_BigInteger_divide_lhs = new Math_BigInteger();
            var lhs_value = _static_Math_BigInteger_divide_lhs.value;
            lhs_value = this._array_repeat(0, m_length + (m_length >> 1));
            lhs_value.push(1);
            _static_Math_BigInteger_divide_rhs = new Math_BigInteger();
            _static_Math_BigInteger_divide_rhs.value = m;
            [u, m1] = _static_Math_BigInteger_divide_lhs.divide(_static_Math_BigInteger_divide_rhs);
            u = u.value;
            m1 = m1.value;

            _static_Math_BigInteger__barrett_cache[MATH_BIGINTEGER_DATA].push({
                u: u,
                m1: m1
            });
        } else {
            extract(_static_Math_BigInteger__barrett_cache[MATH_BIGINTEGER_DATA][key]);
        }

        var cutoff = m_length + (m_length >> 1);
        var lsd = n.slice(0, cutoff);
        var msd = n.slice(cutoff);
        lsd = this._trim(lsd);
        _static_Math_BigInteger_divide_temp = this._multiply(msd, false, m1, false);
        n = this._add(lsd, false, _static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_VALUE], false);

        if (m_length & 1) {
            return this._regularBarrett(n[MATH_BIGINTEGER_VALUE], m);
        }

        _static_Math_BigInteger_divide_temp = n[MATH_BIGINTEGER_VALUE].slice(m_length - 1);
        _static_Math_BigInteger_divide_temp = this._multiply(_static_Math_BigInteger_divide_temp, false, u, false);
        _static_Math_BigInteger_divide_temp = _static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_VALUE].slice((m_length >> 1) + 1);
        _static_Math_BigInteger_divide_temp = this._multiply(_static_Math_BigInteger_divide_temp, false, m, false);

        var result = this._subtract(n[MATH_BIGINTEGER_VALUE], false, _static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_VALUE], false);

        while (this._compare(result[MATH_BIGINTEGER_VALUE], result[MATH_BIGINTEGER_SIGN], m, false) >= 0) {
            result = this._subtract(result[MATH_BIGINTEGER_VALUE], result[MATH_BIGINTEGER_SIGN], m, false);
        }

        return result[MATH_BIGINTEGER_VALUE];
    }

    _regularBarrett(x, n) //(m.length + 1) + m.length = 2 * m.length + 1
    //(2 * m.length + 1) - (m.length - 1) = m.length + 2
    //m.length + 1
    //m.length + 1
    //$temp == array_slice($temp->_multiply($temp, false, $n, false)->value, 0, $n_length + 1)
    {
        if (!("_static_Math_BigInteger__regularBarrett_cache" in global)) _static_Math_BigInteger__regularBarrett_cache = {
            [MATH_BIGINTEGER_VARIABLE]: Array(),
            [MATH_BIGINTEGER_DATA]: Array()
        };
        var n_length = n.length;

        if (x.length > 2 * n_length) {
            _static_Math_BigInteger_divide_lhs = new Math_BigInteger();
            _static_Math_BigInteger_divide_rhs = new Math_BigInteger();
            _static_Math_BigInteger_divide_lhs.value = x;
            _static_Math_BigInteger_divide_rhs.value = n;
            [_static_Math_BigInteger_divide_temp] = _static_Math_BigInteger_divide_lhs.divide(_static_Math_BigInteger_divide_rhs);
            return _static_Math_BigInteger_divide_temp.value;
        }

        if ((key = array_search(n, _static_Math_BigInteger__regularBarrett_cache[MATH_BIGINTEGER_VARIABLE])) === false) //m.length
            {
                key = _static_Math_BigInteger__regularBarrett_cache[MATH_BIGINTEGER_VARIABLE].length;

                _static_Math_BigInteger__regularBarrett_cache[MATH_BIGINTEGER_VARIABLE].push(n);

                _static_Math_BigInteger_divide_lhs = new Math_BigInteger();
                var lhs_value = _static_Math_BigInteger_divide_lhs.value;
                lhs_value = this._array_repeat(0, 2 * n_length);
                lhs_value.push(1);
                _static_Math_BigInteger_divide_rhs = new Math_BigInteger();
                _static_Math_BigInteger_divide_rhs.value = n;
                [_static_Math_BigInteger_divide_temp,,] = _static_Math_BigInteger_divide_lhs.divide(_static_Math_BigInteger_divide_rhs);

                _static_Math_BigInteger__regularBarrett_cache[MATH_BIGINTEGER_DATA].push(_static_Math_BigInteger_divide_temp.value);
            }

        _static_Math_BigInteger_divide_temp = x.slice(n_length - 1);
        _static_Math_BigInteger_divide_temp = this._multiply(_static_Math_BigInteger_divide_temp, false, _static_Math_BigInteger__regularBarrett_cache[MATH_BIGINTEGER_DATA][key], false);
        _static_Math_BigInteger_divide_temp = _static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_VALUE].slice(n_length + 1);
        var result = x.slice(0, n_length + 1);
        _static_Math_BigInteger_divide_temp = this._multiplyLower(_static_Math_BigInteger_divide_temp, false, n, false, n_length + 1);

        if (this._compare(result, false, _static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_VALUE], _static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_SIGN]) < 0) {
            var corrector_value = this._array_repeat(0, n_length + 1);

            corrector_value.push(1);
            result = this._add(result, false, corrector_value, false);
            result = result[MATH_BIGINTEGER_VALUE];
        }

        result = this._subtract(result, false, _static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_VALUE], _static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_SIGN]);

        while (this._compare(result[MATH_BIGINTEGER_VALUE], result[MATH_BIGINTEGER_SIGN], n, false) > 0) {
            result = this._subtract(result[MATH_BIGINTEGER_VALUE], result[MATH_BIGINTEGER_SIGN], n, false);
        }

        return result[MATH_BIGINTEGER_VALUE];
    }

    _multiplyLower(x_value, x_negative, y_value, y_negative, stop) //the following for loop could be removed if the for loop following it
    //(the one with nested for loops) initially set $i to 0, but
    //doing so would also make the result in one set of unnecessary adds,
    //since on the outermost loops first pass, $product->value[$k] is going
    //to always be 0
    {
        var x_length = x_value.length;
        var y_length = y_value.length;

        if (!x_length || !y_length) //a 0 is being multiplied
            {
                return {
                    [MATH_BIGINTEGER_VALUE]: Array(),
                    [MATH_BIGINTEGER_SIGN]: false
                };
            }

        if (x_length < y_length) {
            _static_Math_BigInteger_divide_temp = x_value;
            x_value = y_value;
            y_value = _static_Math_BigInteger_divide_temp;
            x_length = x_value.length;
            y_length = y_value.length;
        }

        var product_value = this._array_repeat(0, x_length + y_length);

        var carry = 0;

        for (var j = 0; j < x_length; ++j) //ie. $i = 0, $k = $i
        //$product_value[$k] == 0
        {
            _static_Math_BigInteger_divide_temp = x_value[j] * y_value[0] + carry;
            carry = +(_static_Math_BigInteger_divide_temp / MATH_BIGINTEGER_BASE_FULL);
            product_value[j] = +(_static_Math_BigInteger_divide_temp - MATH_BIGINTEGER_BASE_FULL * carry);
        }

        if (j < stop) {
            product_value[j] = carry;
        }

        for (var i = 1; i < y_length; ++i) {
            var k;
            carry = 0;

            for (j = 0, k = i; j < x_length && k < stop; ++j, ++k) {
                _static_Math_BigInteger_divide_temp = product_value[k] + x_value[j] * y_value[i] + carry;
                carry = +(_static_Math_BigInteger_divide_temp / MATH_BIGINTEGER_BASE_FULL);
                product_value[k] = +(_static_Math_BigInteger_divide_temp - MATH_BIGINTEGER_BASE_FULL * carry);
            }

            if (k < stop) {
                product_value[k] = carry;
            }
        }

        return {
            [MATH_BIGINTEGER_VALUE]: this._trim(product_value),
            [MATH_BIGINTEGER_SIGN]: x_negative != y_negative
        };
    }

    _montgomery(x, n) {
        var key;
        if (!("_static_Math_BigInteger__montgomery_cache" in global)) _static_Math_BigInteger__montgomery_cache = {
            [MATH_BIGINTEGER_VARIABLE]: Array(),
            [MATH_BIGINTEGER_DATA]: Array()
        };

        if ((key = array_search(n, _static_Math_BigInteger__montgomery_cache[MATH_BIGINTEGER_VARIABLE])) === false) {
            key = _static_Math_BigInteger__montgomery_cache[MATH_BIGINTEGER_VARIABLE].length;

            _static_Math_BigInteger__montgomery_cache[MATH_BIGINTEGER_VARIABLE].push(x);

            _static_Math_BigInteger__montgomery_cache[MATH_BIGINTEGER_DATA].push(this._modInverse67108864(n));
        }

        var k = n.length;
        var result = {
            [MATH_BIGINTEGER_VALUE]: x
        };

        for (var i = 0; i < k; ++i) {
            _static_Math_BigInteger_divide_temp = result[MATH_BIGINTEGER_VALUE][i] * _static_Math_BigInteger__montgomery_cache[MATH_BIGINTEGER_DATA][key];
            _static_Math_BigInteger_divide_temp = +(_static_Math_BigInteger_divide_temp - MATH_BIGINTEGER_BASE_FULL * +(_static_Math_BigInteger_divide_temp / MATH_BIGINTEGER_BASE_FULL));
            _static_Math_BigInteger_divide_temp = this._regularMultiply([_static_Math_BigInteger_divide_temp], n);
            _static_Math_BigInteger_divide_temp = array_merge(this._array_repeat(0, i), _static_Math_BigInteger_divide_temp);
            result = this._add(result[MATH_BIGINTEGER_VALUE], false, _static_Math_BigInteger_divide_temp, false);
        }

        result[MATH_BIGINTEGER_VALUE] = result[MATH_BIGINTEGER_VALUE].slice(k);

        if (this._compare(result, false, n, false) >= 0) {
            result = this._subtract(result[MATH_BIGINTEGER_VALUE], false, n, false);
        }

        return result[MATH_BIGINTEGER_VALUE];
    }

    _montgomeryMultiply(x, y, m) {
        var key;
        _static_Math_BigInteger_divide_temp = this._multiply(x, false, y, false);
        return this._montgomery(_static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_VALUE], m);
        if (!("_static_Math_BigInteger__montgomeryMultiply_cache" in global)) _static_Math_BigInteger__montgomeryMultiply_cache = {
            [MATH_BIGINTEGER_VARIABLE]: Array(),
            [MATH_BIGINTEGER_DATA]: Array()
        };

        if ((key = array_search(m, _static_Math_BigInteger__montgomeryMultiply_cache[MATH_BIGINTEGER_VARIABLE])) === false) {
            key = _static_Math_BigInteger__montgomeryMultiply_cache[MATH_BIGINTEGER_VARIABLE].length;

            _static_Math_BigInteger__montgomeryMultiply_cache[MATH_BIGINTEGER_VARIABLE].push(m);

            _static_Math_BigInteger__montgomeryMultiply_cache[MATH_BIGINTEGER_DATA].push(this._modInverse67108864(m));
        }

        var n = Math.max(x.length, y.length, m.length);
        x = array_pad(x, n, 0);
        y = array_pad(y, n, 0);
        m = array_pad(m, n, 0);
        var a = {
            [MATH_BIGINTEGER_VALUE]: this._array_repeat(0, n + 1)
        };

        for (var i = 0; i < n; ++i) {
            _static_Math_BigInteger_divide_temp = a[MATH_BIGINTEGER_VALUE][0] + x[i] * y[0];
            _static_Math_BigInteger_divide_temp = +(_static_Math_BigInteger_divide_temp - MATH_BIGINTEGER_BASE_FULL * +(_static_Math_BigInteger_divide_temp / MATH_BIGINTEGER_BASE_FULL));
            _static_Math_BigInteger_divide_temp = _static_Math_BigInteger_divide_temp * _static_Math_BigInteger__montgomeryMultiply_cache[MATH_BIGINTEGER_DATA][key];
            _static_Math_BigInteger_divide_temp = +(_static_Math_BigInteger_divide_temp - MATH_BIGINTEGER_BASE_FULL * +(_static_Math_BigInteger_divide_temp / MATH_BIGINTEGER_BASE_FULL));
            _static_Math_BigInteger_divide_temp = this._add(this._regularMultiply([x[i]], y), false, this._regularMultiply([_static_Math_BigInteger_divide_temp], m), false);
            a = this._add(a[MATH_BIGINTEGER_VALUE], false, _static_Math_BigInteger_divide_temp[MATH_BIGINTEGER_VALUE], false);
            a[MATH_BIGINTEGER_VALUE] = a[MATH_BIGINTEGER_VALUE].slice(1);
        }

        if (this._compare(a[MATH_BIGINTEGER_VALUE], false, m, false) >= 0) {
            a = this._subtract(a[MATH_BIGINTEGER_VALUE], false, m, false);
        }

        return a[MATH_BIGINTEGER_VALUE];
    }

    _prepMontgomery(x, n) {
        _static_Math_BigInteger_divide_lhs = new Math_BigInteger();
        _static_Math_BigInteger_divide_lhs.value = array_merge(this._array_repeat(0, n.length), x);
        _static_Math_BigInteger_divide_rhs = new Math_BigInteger();
        _static_Math_BigInteger_divide_rhs.value = n;
        [_static_Math_BigInteger_divide_temp] = _static_Math_BigInteger_divide_lhs.divide(_static_Math_BigInteger_divide_rhs);
        return _static_Math_BigInteger_divide_temp.value;
    }

    _modInverse67108864(x) //x**-1 mod 2**2
    //x**-1 mod 2**4
    //x**-1 mod 2**8
    //x**-1 mod 2**16
    //x**-1 mod 2**26
    {
        x = -x[0];
        var result = x & 3;
        result = result * (2 - x * result) & 15;
        result = result * (2 - (x & 255) * result) & 255;
        result = result * (2 - (x & 65535) * result & 65535) & 65535;
        result = fmod(result * (2 - fmod(x * result, MATH_BIGINTEGER_BASE_FULL)), MATH_BIGINTEGER_BASE_FULL);
        return result & MATH_BIGINTEGER_MAX_DIGIT;
    }

    modInverse(n) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                _static_Math_BigInteger_divide_temp = new Math_BigInteger();
                _static_Math_BigInteger_divide_temp.value = gmp_invert(this.value, n.value);
                return _static_Math_BigInteger_divide_temp.value === false ? false : this._normalize(_static_Math_BigInteger_divide_temp);
        }

        {
            if (!("_static_Math_BigInteger_modInverse_zero" in global)) _static_Math_BigInteger_modInverse_zero = undefined;
            if (!("_static_Math_BigInteger_modInverse_one" in global)) _static_Math_BigInteger_modInverse_one = undefined;
        }

        if (!(undefined !== _static_Math_BigInteger_modInverse_zero)) {
            _static_Math_BigInteger_modInverse_zero = new Math_BigInteger();
            _static_Math_BigInteger_modInverse_one = new Math_BigInteger(1);
        }

        n = n.abs();

        if (this.compare(_static_Math_BigInteger_modInverse_zero) < 0) {
            _static_Math_BigInteger_divide_temp = this.abs();
            _static_Math_BigInteger_divide_temp = _static_Math_BigInteger_divide_temp.modInverse(n);
            return this._normalize(n.subtract(_static_Math_BigInteger_divide_temp));
        }

        extract(this.extendedGCD(n));

        if (!gcd.equals(_static_Math_BigInteger_modInverse_one)) {
            return false;
        }

        var x = x.compare(_static_Math_BigInteger_modInverse_zero) < 0 ? x.add(n) : x;
        return this.compare(_static_Math_BigInteger_modInverse_zero) < 0 ? this._normalize(n.subtract(x)) : this._normalize(x);
    }

    extendedGCD(n) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                extract(gmp_gcdext(this.value, n.value));
                return {
                    gcd: this._normalize(new Math_BigInteger(g)),
                    x: this._normalize(new Math_BigInteger(s)),
                    y: this._normalize(new Math_BigInteger(t))
                };

            case MATH_BIGINTEGER_MODE_BCMATH:
                var u = this.value;
                var v = n.value;
                var a = "1";
                var b = "0";
                var c = "0";
                var d = "1";

                while (bccomp(v, "0", 0) != 0) {
                    var q = bcdiv(u, v, 0);
                    _static_Math_BigInteger_divide_temp = u;
                    u = v;
                    v = bcsub(_static_Math_BigInteger_divide_temp, bcmul(v, q, 0), 0);
                    _static_Math_BigInteger_divide_temp = a;
                    a = c;
                    c = bcsub(_static_Math_BigInteger_divide_temp, bcmul(a, q, 0), 0);
                    _static_Math_BigInteger_divide_temp = b;
                    b = d;
                    d = bcsub(_static_Math_BigInteger_divide_temp, bcmul(b, q, 0), 0);
                }

                return {
                    gcd: this._normalize(new Math_BigInteger(u)),
                    x: this._normalize(new Math_BigInteger(a)),
                    y: this._normalize(new Math_BigInteger(b))
                };
        }

        var y = n.copy();
        var x = this.copy();
        var g = new Math_BigInteger();
        g.value = [1];

        while (!(x.value[0] & 1 || y.value[0] & 1)) {
            x._rshift(1);

            y._rshift(1);

            g._lshift(1);
        }

        u = x.copy();
        v = y.copy();
        a = new Math_BigInteger();
        b = new Math_BigInteger();
        c = new Math_BigInteger();
        d = new Math_BigInteger();
        a.value = d.value = g.value = [1];
        b.value = c.value = Array();

        while (!!u.value) {
            while (!(u.value[0] & 1)) {
                u._rshift(1);

                if (!!a.value && a.value[0] & 1 || !!b.value && b.value[0] & 1) {
                    a = a.add(y);
                    b = b.subtract(x);
                }

                a._rshift(1);

                b._rshift(1);
            }

            while (!(v.value[0] & 1)) {
                v._rshift(1);

                if (!!d.value && d.value[0] & 1 || !!c.value && c.value[0] & 1) {
                    c = c.add(y);
                    d = d.subtract(x);
                }

                c._rshift(1);

                d._rshift(1);
            }

            if (u.compare(v) >= 0) {
                u = u.subtract(v);
                a = a.subtract(c);
                b = b.subtract(d);
            } else {
                v = v.subtract(u);
                c = c.subtract(a);
                d = d.subtract(b);
            }
        }

        return {
            gcd: this._normalize(g.multiply(v)),
            x: this._normalize(c),
            y: this._normalize(d)
        };
    }

    gcd(n) {
        extract(this.extendedGCD(n));
        return gcd;
    }

    abs() {
        _static_Math_BigInteger_divide_temp = new Math_BigInteger();

        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                _static_Math_BigInteger_divide_temp.value = gmp_abs(this.value);
                break;

            case MATH_BIGINTEGER_MODE_BCMATH:
                _static_Math_BigInteger_divide_temp.value = bccomp(this.value, "0", 0) < 0 ? this.value.substr(1) : this.value;
                break;

            default:
                _static_Math_BigInteger_divide_temp.value = this.value;
        }

        return _static_Math_BigInteger_divide_temp;
    }

    compare(y) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                return gmp_cmp(this.value, y.value);

            case MATH_BIGINTEGER_MODE_BCMATH:
                return bccomp(this.value, y.value, 0);
        }

        return this._compare(this.value, this.is_negative, y.value, y.is_negative);
    }

    _compare(x_value, x_negative, y_value, y_negative) {
        if (x_negative != y_negative) {
            return !x_negative && y_negative ? 1 : -1;
        }

        var result = x_negative ? -1 : 1;

        if (x_value.length != y_value.length) {
            return x_value.length > y_value.length ? result : -result;
        }

        var size = Math.max(x_value.length, y_value.length);
        x_value = array_pad(x_value, size, 0);
        y_value = array_pad(y_value, size, 0);

        for (var i = x_value.length - 1; i >= 0; --i) {
            if (x_value[i] != y_value[i]) {
                return x_value[i] > y_value[i] ? result : -result;
            }
        }

        return 0;
    }

    equals(x) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                return gmp_cmp(this.value, x.value) == 0;

            default:
                return this.value === x.value && this.is_negative == x.is_negative;
        }
    }

    setPrecision(bits) {
        this.precision = bits;

        if (MATH_BIGINTEGER_MODE != MATH_BIGINTEGER_MODE_BCMATH) {
            this.bitmask = new Math_BigInteger(String.fromCharCode((1 << (bits & 7)) - 1) + str_repeat(String.fromCharCode(255), bits >> 3), 256);
        } else {
            this.bitmask = new Math_BigInteger(bcpow("2", bits, 0));
        }

        _static_Math_BigInteger_divide_temp = this._normalize(this);
        this.value = _static_Math_BigInteger_divide_temp.value;
    }

    bitwise_and(x) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                _static_Math_BigInteger_divide_temp = new Math_BigInteger();
                _static_Math_BigInteger_divide_temp.value = gmp_and(this.value, x.value);
                return this._normalize(_static_Math_BigInteger_divide_temp);

            case MATH_BIGINTEGER_MODE_BCMATH:
                var left = this.toBytes();
                var right = x.toBytes();
                var length = Math.max(left.length, right.length);
                left = str_pad(left, length, String.fromCharCode(0), STR_PAD_LEFT);
                right = str_pad(right, length, String.fromCharCode(0), STR_PAD_LEFT);
                return this._normalize(new Math_BigInteger(left & right, 256));
        }

        var result = this.copy();
        length = Math.min(x.value.length, this.value.length);
        result.value = result.value.slice(0, length);

        for (var i = 0; i < length; ++i) {
            result.value[i] &= x.value[i];
        }

        return this._normalize(result);
    }

    bitwise_or(x) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                _static_Math_BigInteger_divide_temp = new Math_BigInteger();
                _static_Math_BigInteger_divide_temp.value = gmp_or(this.value, x.value);
                return this._normalize(_static_Math_BigInteger_divide_temp);

            case MATH_BIGINTEGER_MODE_BCMATH:
                var left = this.toBytes();
                var right = x.toBytes();
                var length = Math.max(left.length, right.length);
                left = str_pad(left, length, String.fromCharCode(0), STR_PAD_LEFT);
                right = str_pad(right, length, String.fromCharCode(0), STR_PAD_LEFT);
                return this._normalize(new Math_BigInteger(left | right, 256));
        }

        length = Math.max(this.value.length, x.value.length);
        var result = this.copy();
        result.value = array_pad(result.value, length, 0);
        x.value = array_pad(x.value, length, 0);

        for (var i = 0; i < length; ++i) {
            result.value[i] |= x.value[i];
        }

        return this._normalize(result);
    }

    bitwise_xor(x) {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                _static_Math_BigInteger_divide_temp = new Math_BigInteger();
                _static_Math_BigInteger_divide_temp.value = gmp_xor(this.value, x.value);
                return this._normalize(_static_Math_BigInteger_divide_temp);

            case MATH_BIGINTEGER_MODE_BCMATH:
                var left = this.toBytes();
                var right = x.toBytes();
                var length = Math.max(left.length, right.length);
                left = str_pad(left, length, String.fromCharCode(0), STR_PAD_LEFT);
                right = str_pad(right, length, String.fromCharCode(0), STR_PAD_LEFT);
                return this._normalize(new Math_BigInteger(left ^ right, 256));
        }

        length = Math.max(this.value.length, x.value.length);
        var result = this.copy();
        result.value = array_pad(result.value, length, 0);
        x.value = array_pad(x.value, length, 0);

        for (var i = 0; i < length; ++i) {
            result.value[i] ^= x.value[i];
        }

        return this._normalize(result);
    }

    bitwise_not() //calculuate "not" without regard to $this->precision
    //(will always result in a smaller number.  ie. ~1 isn't 1111 1110 - it's 0)
    //see if we need to add extra leading 1's
    {
        _static_Math_BigInteger_divide_temp = this.toBytes();
        var pre_msb = decbin(_static_Math_BigInteger_divide_temp.charCodeAt(0));
        _static_Math_BigInteger_divide_temp = ~_static_Math_BigInteger_divide_temp;
        var msb = decbin(_static_Math_BigInteger_divide_temp.charCodeAt(0));

        if (msb.length == 8) {
            msb = msb.substr(strpos(msb, "0"));
        }

        _static_Math_BigInteger_divide_temp[0] = String.fromCharCode(bindec(msb));
        var current_bits = pre_msb.length + 8 * _static_Math_BigInteger_divide_temp.length - 8;
        var new_bits = this.precision - current_bits;

        if (new_bits <= 0) {
            return this._normalize(new Math_BigInteger(_static_Math_BigInteger_divide_temp, 256));
        }

        var leading_ones = String.fromCharCode((1 << (new_bits & 7)) - 1) + str_repeat(String.fromCharCode(255), new_bits >> 3);

        this._base256_lshift(leading_ones, current_bits);

        _static_Math_BigInteger_divide_temp = str_pad(_static_Math_BigInteger_divide_temp, Math.ceil(this.bits / 8), String.fromCharCode(0), STR_PAD_LEFT);
        return this._normalize(new Math_BigInteger(leading_ones | _static_Math_BigInteger_divide_temp, 256));
    }

    bitwise_rightShift(shift) {
        _static_Math_BigInteger_divide_temp = new Math_BigInteger();

        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                if (!("_static_Math_BigInteger_bitwise_rightShift_two" in global)) _static_Math_BigInteger_bitwise_rightShift_two = undefined;

                if (!(undefined !== _static_Math_BigInteger_bitwise_rightShift_two)) {
                    _static_Math_BigInteger_bitwise_rightShift_two = gmp_init("2");
                }

                _static_Math_BigInteger_divide_temp.value = gmp_div_q(this.value, gmp_pow(_static_Math_BigInteger_bitwise_rightShift_two, shift));
                break;

            case MATH_BIGINTEGER_MODE_BCMATH:
                _static_Math_BigInteger_divide_temp.value = bcdiv(this.value, bcpow("2", shift, 0), 0);
                break;

            default:
                _static_Math_BigInteger_divide_temp.value = this.value;

                _static_Math_BigInteger_divide_temp._rshift(shift);

        }

        return this._normalize(_static_Math_BigInteger_divide_temp);
    }

    bitwise_leftShift(shift) {
        _static_Math_BigInteger_divide_temp = new Math_BigInteger();

        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                if (!("_static_Math_BigInteger_bitwise_leftShift_two" in global)) _static_Math_BigInteger_bitwise_leftShift_two = undefined;

                if (!(undefined !== _static_Math_BigInteger_bitwise_leftShift_two)) {
                    _static_Math_BigInteger_bitwise_leftShift_two = gmp_init("2");
                }

                _static_Math_BigInteger_divide_temp.value = gmp_mul(this.value, gmp_pow(_static_Math_BigInteger_bitwise_leftShift_two, shift));
                break;

            case MATH_BIGINTEGER_MODE_BCMATH:
                _static_Math_BigInteger_divide_temp.value = bcmul(this.value, bcpow("2", shift, 0), 0);
                break;

            default:
                _static_Math_BigInteger_divide_temp.value = this.value;

                _static_Math_BigInteger_divide_temp._lshift(shift);

        }

        return this._normalize(_static_Math_BigInteger_divide_temp);
    }

    bitwise_leftRotate(shift) {
        var bits = this.toBytes();

        if (this.precision > 0) {
            var precision = this.precision;

            if (MATH_BIGINTEGER_MODE == MATH_BIGINTEGER_MODE_BCMATH) {
                var mask = this.bitmask.subtract(new Math_BigInteger(1));
                mask = mask.toBytes();
            } else {
                mask = this.bitmask.toBytes();
            }
        } else {
            _static_Math_BigInteger_divide_temp = bits.charCodeAt(0);

            for (var i = 0; _static_Math_BigInteger_divide_temp >> i; ++i)

            precision = 8 * bits.length - 8 + i;
            mask = String.fromCharCode((1 << (precision & 7)) - 1) + str_repeat(String.fromCharCode(255), precision >> 3);
        }

        if (shift < 0) {
            shift += precision;
        }

        shift %= precision;

        if (!shift) {
            return this.copy();
        }

        var left = this.bitwise_leftShift(shift);
        left = left.bitwise_and(new Math_BigInteger(mask, 256));
        var right = this.bitwise_rightShift(precision - shift);
        var result = MATH_BIGINTEGER_MODE != MATH_BIGINTEGER_MODE_BCMATH ? left.bitwise_or(right) : left.add(right);
        return this._normalize(result);
    }

    bitwise_rightRotate(shift) {
        return this.bitwise_leftRotate(-shift);
    }

    setRandomGenerator(generator) {}

    random(min = false, max = false) {
        if (min === false) {
            min = new Math_BigInteger(0);
        }

        if (max === false) {
            max = new Math_BigInteger(2147483647);
        }

        var compare = max.compare(min);

        if (!compare) {
            return this._normalize(min);
        } else if (compare < 0) //if $min is bigger then $max, swap $min and $max
            {
                _static_Math_BigInteger_divide_temp = max;
                max = min;
                min = _static_Math_BigInteger_divide_temp;
            }

        max = max.subtract(min);
        max = ltrim(max.toBytes(), String.fromCharCode(0));
        var size = max.length - 1;
        var crypt_random = "function" === typeof crypt_random_string || !("function" === typeof Crypt_Random) && "function" === typeof crypt_random_string;

        if (crypt_random) {
            var random = crypt_random_string(size);
        } else {
            random = "";

            if (size & 1) {
                random += String.fromCharCode(mt_rand(0, 255));
            }

            var blocks = size >> 1;

            for (var i = 0; i < blocks; ++i) //mt_rand(-2147483648, 0x7FFFFFFF) always produces -2147483648 on some systems
            {
                random += pack("n", mt_rand(0, 65535));
            }
        }

        var fragment = new Math_BigInteger(random, 256);
        var leading = fragment.compare(new Math_BigInteger(max.substr(1), 256)) > 0 ? max.charCodeAt(0) - 1 : max.charCodeAt(0);

        if (!crypt_random) {
            var msb = String.fromCharCode(mt_rand(0, leading));
        } else {
            var cutoff = Math.floor(255 / leading) * leading;

            while (true) {
                msb = crypt_random_string(1).charCodeAt(0);

                if (msb <= cutoff) {
                    msb %= leading;
                    break;
                }
            }

            msb = String.fromCharCode(msb);
        }

        random = new Math_BigInteger(msb + random, 256);
        return this._normalize(random.add(min));
    }

    randomPrime(min = false, max = false, timeout = false) //gmp_nextprime() requires PHP 5 >= 5.2.0 per <http://php.net/gmp-nextprime>.
    {
        if (min === false) {
            min = new Math_BigInteger(0);
        }

        if (max === false) {
            max = new Math_BigInteger(2147483647);
        }

        var compare = max.compare(min);

        if (!compare) {
            return min.isPrime() ? min : false;
        } else if (compare < 0) //if $min is bigger then $max, swap $min and $max
            {
                _static_Math_BigInteger_divide_temp = max;
                max = min;
                min = _static_Math_BigInteger_divide_temp;
            }

        {
            if (!("_static_Math_BigInteger_randomPrime_one" in global)) _static_Math_BigInteger_randomPrime_one = undefined;
            if (!("_static_Math_BigInteger_randomPrime_two" in global)) _static_Math_BigInteger_randomPrime_two = undefined;
        }

        if (!(undefined !== _static_Math_BigInteger_randomPrime_one)) {
            _static_Math_BigInteger_randomPrime_one = new Math_BigInteger(1);
            _static_Math_BigInteger_randomPrime_two = new Math_BigInteger(2);
        }

        var start = Date.now() / 1000;
        var x = this.random(min, max);

        if (MATH_BIGINTEGER_MODE == MATH_BIGINTEGER_MODE_GMP && "function" === typeof gmp_nextprime) {
            p.value = gmp_nextprime(x.value);

            if (p.compare(max) <= 0) {
                return p;
            }

            if (!min.equals(x)) {
                x = x.subtract(_static_Math_BigInteger_randomPrime_one);
            }

            return x.randomPrime(min, x);
        }

        if (x.equals(_static_Math_BigInteger_randomPrime_two)) {
            return x;
        }

        x._make_odd();

        if (x.compare(max) > 0) //if $x > $max then $max is even and if $min == $max then no prime number exists between the specified range
            {
                if (min.equals(max)) {
                    return false;
                }

                x = min.copy();

                x._make_odd();
            }

        var initial_x = x.copy();

        while (true) {
            if (timeout !== false && Date.now() / 1000 - start > timeout) {
                return false;
            }

            if (x.isPrime()) {
                return x;
            }

            x = x.add(_static_Math_BigInteger_randomPrime_two);

            if (x.compare(max) > 0) {
                x = min.copy();

                if (x.equals(_static_Math_BigInteger_randomPrime_two)) {
                    return x;
                }

                x._make_odd();
            }

            if (x.equals(initial_x)) {
                return false;
            }
        }
    }

    _make_odd() {
        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                gmp_setbit(this.value, 0);
                break;

            case MATH_BIGINTEGER_MODE_BCMATH:
                if (this.value[this.value.length - 1] % 2 == 0) {
                    this.value = bcadd(this.value, "1");
                }

                break;

            default:
                this.value[0] |= 1;
        }
    }

    isPrime(t = false) //ie. $s = gmp_scan1($n, 0) and $r = gmp_div_q($n, gmp_pow(gmp_init('2'), $s));
    {
        var length = this.toBytes().length;

        if (!t) //see HAC 4.49 "Note (controlling the error probability)"
            {
                if (length >= 163) {
                    t = 2;
                } else if (length >= 106) {
                    t = 3;
                } else if (length >= 81) {
                    t = 4;
                } else if (length >= 68) {
                    t = 5;
                } else if (length >= 56) {
                    t = 6;
                } else if (length >= 50) {
                    t = 7;
                } else if (length >= 43) {
                    t = 8;
                } else if (length >= 37) {
                    t = 9;
                } else if (length >= 31) {
                    t = 12;
                } else if (length >= 25) {
                    t = 15;
                } else if (length >= 18) {
                    t = 18;
                } else {
                    t = 27;
                }
            }

        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                return gmp_prob_prime(this.value, t) != 0;

            case MATH_BIGINTEGER_MODE_BCMATH:
                if (this.value === "2") {
                    return true;
                }

                if (this.value[this.value.length - 1] % 2 == 0) {
                    return false;
                }

                break;

            default:
                if (this.value == [2]) {
                    return true;
                }

                if (~this.value[0] & 1) {
                    return false;
                }

        }

        {
            if (!("_static_Math_BigInteger_isPrime_primes" in global)) _static_Math_BigInteger_isPrime_primes = undefined;
            if (!("_static_Math_BigInteger_isPrime_zero" in global)) _static_Math_BigInteger_isPrime_zero = undefined;
            if (!("_static_Math_BigInteger_isPrime_one" in global)) _static_Math_BigInteger_isPrime_one = undefined;
            if (!("_static_Math_BigInteger_isPrime_two" in global)) _static_Math_BigInteger_isPrime_two = undefined;
        }

        if (!(undefined !== _static_Math_BigInteger_isPrime_primes)) {
            _static_Math_BigInteger_isPrime_primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];

            if (MATH_BIGINTEGER_MODE != MATH_BIGINTEGER_MODE_INTERNAL) {
                for (var i = 0; i < _static_Math_BigInteger_isPrime_primes.length; ++i) {
                    _static_Math_BigInteger_isPrime_primes[i] = new Math_BigInteger(_static_Math_BigInteger_isPrime_primes[i]);
                }
            }

            _static_Math_BigInteger_isPrime_zero = new Math_BigInteger();
            _static_Math_BigInteger_isPrime_one = new Math_BigInteger(1);
            _static_Math_BigInteger_isPrime_two = new Math_BigInteger(2);
        }

        if (this.equals(_static_Math_BigInteger_isPrime_one)) {
            return false;
        }

        if (MATH_BIGINTEGER_MODE != MATH_BIGINTEGER_MODE_INTERNAL) {
            for (var prime of Object.values(_static_Math_BigInteger_isPrime_primes)) {
                var r;
                [r] = this.divide(prime);

                if (r.equals(_static_Math_BigInteger_isPrime_zero)) {
                    return this.equals(prime);
                }
            }
        } else {
            var value = this.value;

            for (var prime of Object.values(_static_Math_BigInteger_isPrime_primes)) {
                [r] = this._divide_digit(value, prime);

                if (!r) {
                    return value.length == 1 && value[0] == prime;
                }
            }
        }

        var n = this.copy();
        var n_1 = n.subtract(_static_Math_BigInteger_isPrime_one);
        var n_2 = n.subtract(_static_Math_BigInteger_isPrime_two);
        r = n_1.copy();
        var r_value = r.value;

        if (MATH_BIGINTEGER_MODE == MATH_BIGINTEGER_MODE_BCMATH) //if $n was 1, $r would be 0 and this would be an infinite loop, hence our $this->equals($one) check earlier
            {
                var s = 0;

                while (r.value[r.value.length - 1] % 2 == 0) {
                    r.value = bcdiv(r.value, "2", 0);
                    ++s;
                }
            } else {
            var r_length;

            for (i = 0, r_length = r_value.length; i < r_length; ++i) {
                _static_Math_BigInteger_divide_temp = ~r_value[i] & 16777215;

                for (var j = 1; _static_Math_BigInteger_divide_temp >> j & 1; ++j)

                if (j != 25) {
                    break;
                }
            }

            s = 26 * i + j - 1;

            r._rshift(s);
        }

        for (i = 0;; i < t; ++i) {
            var a = this.random(_static_Math_BigInteger_isPrime_two, n_2);
            var y = a.modPow(r, n);

            if (!y.equals(_static_Math_BigInteger_isPrime_one) && !y.equals(n_1)) {
                for (j = 1;; j < s && !y.equals(n_1); ++j) {
                    y = y.modPow(_static_Math_BigInteger_isPrime_two, n);

                    if (y.equals(_static_Math_BigInteger_isPrime_one)) {
                        return false;
                    }
                }

                if (!y.equals(n_1)) {
                    return false;
                }
            }
        }

        return true;
    }

    _lshift(shift) {
        if (shift == 0) {
            return;
        }

        var num_digits = +(shift / MATH_BIGINTEGER_BASE);
        shift %= MATH_BIGINTEGER_BASE;
        shift = 1 << shift;
        var carry = 0;

        for (var i = 0; i < this.value.length; ++i) {
            _static_Math_BigInteger_divide_temp = this.value[i] * shift + carry;
            carry = +(_static_Math_BigInteger_divide_temp / MATH_BIGINTEGER_BASE_FULL);
            this.value[i] = +(_static_Math_BigInteger_divide_temp - carry * MATH_BIGINTEGER_BASE_FULL);
        }

        if (carry) {
            this.value.push(carry);
        }

        while (num_digits--) {
            this.value.unshift(0);
        }
    }

    _rshift(shift) {
        if (shift == 0) {
            return;
        }

        var num_digits = +(shift / MATH_BIGINTEGER_BASE);
        shift %= MATH_BIGINTEGER_BASE;
        var carry_shift = MATH_BIGINTEGER_BASE - shift;
        var carry_mask = (1 << shift) - 1;

        if (num_digits) {
            this.value = this.value.slice(num_digits);
        }

        var carry = 0;

        for (var i = this.value.length - 1; i >= 0; --i) {
            _static_Math_BigInteger_divide_temp = this.value[i] >> shift | carry;
            carry = (this.value[i] & carry_mask) << carry_shift;
            this.value[i] = _static_Math_BigInteger_divide_temp;
        }

        this.value = this._trim(this.value);
    }

    _normalize(result) {
        result.precision = this.precision;
        result.bitmask = this.bitmask;

        switch (MATH_BIGINTEGER_MODE) {
            case MATH_BIGINTEGER_MODE_GMP:
                if (!!result.bitmask.value) {
                    result.value = gmp_and(result.value, result.bitmask.value);
                }

                return result;

            case MATH_BIGINTEGER_MODE_BCMATH:
                if (!!result.bitmask.value) {
                    result.value = bcmod(result.value, result.bitmask.value);
                }

                return result;
        }

        var value = result.value;

        if (!value.length) {
            return result;
        }

        value = this._trim(value);

        if (!!result.bitmask.value) {
            var length = Math.min(value.length, this.bitmask.value.length);
            value = value.slice(0, length);

            for (var i = 0; i < length; ++i) {
                value[i] = value[i] & this.bitmask.value[i];
            }
        }

        return result;
    }

    _trim(value) {
        for (var i = value.length - 1; i >= 0; --i) {
            if (value[i]) {
                break;
            }

            delete value[i];
        }

        return value;
    }

    _array_repeat(input, multiplier) {
        return multiplier ? array_fill(0, multiplier, input) : Array();
    }

    _base256_lshift(x, shift) //eg. floor($shift/8)
    //eg. $shift % 8
    {
        if (shift == 0) {
            return;
        }

        var num_bytes = shift >> 3;
        shift &= 7;
        var carry = 0;

        for (var i = x.length - 1; i >= 0; --i) {
            _static_Math_BigInteger_divide_temp = x.charCodeAt(i) << shift | carry;
            x[i] = String.fromCharCode(_static_Math_BigInteger_divide_temp);
            carry = _static_Math_BigInteger_divide_temp >> 8;
        }

        carry = carry != 0 ? String.fromCharCode(carry) : "";
        x = carry + x + str_repeat(String.fromCharCode(0), num_bytes);
    }

    _base256_rshift(x, shift) //eg. floor($shift/8)
    //eg. $shift % 8
    {
        if (shift == 0) {
            x = ltrim(x, String.fromCharCode(0));
            return "";
        }

        var num_bytes = shift >> 3;
        shift &= 7;
        var remainder = "";

        if (num_bytes) {
            var start = num_bytes > x.length ? -x.length : -num_bytes;
            remainder = x.substr(start);
            x = x.substr(0, -num_bytes);
        }

        var carry = 0;
        var carry_shift = 8 - shift;

        for (var i = 0; i < x.length; ++i) {
            _static_Math_BigInteger_divide_temp = x.charCodeAt(i) >> shift | carry;
            carry = x.charCodeAt(i) << carry_shift & 255;
            x[i] = String.fromCharCode(_static_Math_BigInteger_divide_temp);
        }

        x = ltrim(x, String.fromCharCode(0));
        remainder = String.fromCharCode(carry >> carry_shift) + remainder;
        return ltrim(remainder, String.fromCharCode(0));
    }

    _int2bytes(x) {
        return ltrim(pack("N", x), String.fromCharCode(0));
    }

    _bytes2int(x) {
        _static_Math_BigInteger_divide_temp = unpack("Nint", str_pad(x, 4, String.fromCharCode(0), STR_PAD_LEFT));
        return _static_Math_BigInteger_divide_temp.int;
    }

    _encodeASN1Length(length) {
        if (length <= 127) {
            return String.fromCharCode(length);
        }

        _static_Math_BigInteger_divide_temp = ltrim(pack("N", length), String.fromCharCode(0));
        return pack("Ca*", 128 | _static_Math_BigInteger_divide_temp.length, _static_Math_BigInteger_divide_temp);
    }

};
