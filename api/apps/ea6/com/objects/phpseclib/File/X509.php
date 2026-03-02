//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP X.509 Parser
//
//PHP versions 4 and 5
//
//Encode and decode X.509 certificates.
//
//The extensions are from {@link http://tools.ietf.org/html/rfc5280 RFC5280} and
//{@link http://web.archive.org/web/19961027104704/http://www3.netscape.com/eng/security/cert-exts.html Netscape Certificate Extensions}.
//
//Note that loading an X.509 certificate and resaving it may invalidate the signature.  The reason being that the signature is based on a
//portion of the certificate that contains optional parameters with default values.  ie. if the parameter isn't there the default value is
//used.  Problem is, if the parameter is there and it just so happens to have the default value there are two ways that that parameter can
//be encoded.  It can be encoded explicitly or left out all together.  This would effect the signature value and thus may invalidate the
//the certificate all together unless the certificate is re-signed.
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
//@package    File_X509
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMXII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//
//Include File_ASN1
//
//
//#@+
// @access public
// @see File_X509::getDN()
//
//Return internal array representation
//
//
//
//Return string
//
//
//
//Return ASN.1 name string
//
//
//
//Return OpenSSL compatible array
//
//
//
//Return canonical ASN.1 RDNs string
//
//
//
//Return name hash for file indexing
//
//
//#@-
//#@+
// @access public
// @see File_X509::saveX509()
// @see File_X509::saveCSR()
// @see File_X509::saveCRL()
//
//Save as PEM
//
//ie. a base64-encoded PEM with a header and a footer
//
//
//
//Save as DER
//
//
//
//Save as a SPKAC
//
//Only works on CSRs. Not currently supported.
//
//
//#@-
//
//Attribute value disposition.
//If disposition is >= 0, this is the index of the target value.
//
//
//All attribute values (array).
//Add a value.
//Clear first, then add a value.
//
//Pure-PHP X.509 Parser
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.3.1
//@access  public
//@package File_X509
//
//

if (!("function" === typeof File_ASN1)) {
    require("ASN1.php");
}

const FILE_X509_VALIDATE_SIGNATURE_BY_CA = 1;
const FILE_X509_DN_ARRAY = 0;
const FILE_X509_DN_STRING = 1;
const FILE_X509_DN_ASN1 = 2;
const FILE_X509_DN_OPENSSL = 3;
const FILE_X509_DN_CANON = 4;
const FILE_X509_DN_HASH = 5;
const FILE_X509_FORMAT_PEM = 0;
const FILE_X509_FORMAT_DER = 1;
const FILE_X509_FORMAT_SPKAC = 2;
const FILE_X509_ATTR_ALL = -1;
const FILE_X509_ATTR_APPEND = -2;
const FILE_X509_ATTR_REPLACE = -3;

//
//ASN.1 syntax for X.509 certificates
//
//@var Array
//@access private
//
//
//#@+
// ASN.1 syntax for various extensions
//
// @access private
//#@-
//
//ASN.1 syntax for Certificate Signing Requests (RFC2986)
//
//@var Array
//@access private
//
//
//
//ASN.1 syntax for Certificate Revocation Lists (RFC5280)
//
//@var Array
//@access private
//
//
//
//Distinguished Name
//
//@var Array
//@access private
//
//
//
//Public key
//
//@var String
//@access private
//
//
//
//Private key
//
//@var String
//@access private
//
//
//
//Object identifiers for X.509 certificates
//
//@var Array
//@access private
//@link http://en.wikipedia.org/wiki/Object_identifier
//
//
//
//The certificate authorities
//
//@var Array
//@access private
//
//
//
//The currently loaded certificate
//
//@var Array
//@access private
//
//
//
//The signature subject
//
//There's no guarantee File_X509 is going to reencode an X.509 cert in the same way it was originally
//encoded so we take save the portion of the original cert that the signature would have made for.
//
//@var String
//@access private
//
//
//
//Certificate Start Date
//
//@var String
//@access private
//
//
//
//Certificate End Date
//
//@var String
//@access private
//
//
//
//Serial Number
//
//@var String
//@access private
//
//
//
//Key Identifier
//
//See {@link http://tools.ietf.org/html/rfc5280#section-4.2.1.1 RFC5280#section-4.2.1.1} and
//{@link http://tools.ietf.org/html/rfc5280#section-4.2.1.2 RFC5280#section-4.2.1.2}.
//
//@var String
//@access private
//
//
//
//CA Flag
//
//@var Boolean
//@access private
//
//
//
//Default Constructor.
//
//@return File_X509
//@access public
//
//
//
//Load X.509 certificate
//
//Returns an associative array describing the X.509 cert or a false if the cert failed to load
//
//@param String $cert
//@access public
//@return Mixed
//
//
//
//Save X.509 certificate
//
//@param Array $cert
//@param Integer $format optional
//@access public
//@return String
//
//
//
//Map extension values from octet string to extension-specific internal
//format.
//
//@param Array ref $root
//@param String $path
//@param Object $asn1
//@access private
//
//
//
//Map extension values from extension-specific internal format to
//octet string.
//
//@param Array ref $root
//@param String $path
//@param Object $asn1
//@access private
//
//
//
//Map attribute values from ANY type to attribute-specific internal
//format.
//
//@param Array ref $root
//@param String $path
//@param Object $asn1
//@access private
//
//
//
//Map attribute values from attribute-specific internal format to
//ANY type.
//
//@param Array ref $root
//@param String $path
//@param Object $asn1
//@access private
//
//
//
//Associate an extension ID to an extension mapping
//
//@param String $extnId
//@access private
//@return Mixed
//
//
//
//Load an X.509 certificate as a certificate authority
//
//@param String $cert
//@access public
//@return Boolean
//
//
//
//Validate an X.509 certificate against a URL
//
//From RFC2818 "HTTP over TLS":
//
//Matching is performed using the matching rules specified by
//[RFC2459].  If more than one identity of a given type is present in
//the certificate (e.g., more than one dNSName name, a match in any one
//of the set is considered acceptable.) Names may contain the wildcard
//character * which is considered to match any single domain name
//component or component fragment. E.g., *.a.com matches foo.a.com but
//not bar.foo.a.com. f*.com matches foo.com but not bar.com.
//
//@param String $url
//@access public
//@return Boolean
//
//
//
//Validate a date
//
//If $date isn't defined it is assumed to be the current date.
//
//@param Integer $date optional
//@access public
//
//
//
//Validate a signature
//
//Works on X.509 certs, CSR's and CRL's.
//Returns true if the signature is verified, false if it is not correct or NULL on error
//
//By default returns false for self-signed certs. Call validateSignature(false) to make this support
//self-signed.
//
//The behavior of this function is inspired by {@link http://php.net/openssl-verify openssl_verify}.
//
//@param Boolean $caonly optional
//@access public
//@return Mixed
//
//
//
//Validates a signature
//
//Returns true if the signature is verified, false if it is not correct or NULL on error
//
//@param String $publicKeyAlgorithm
//@param String $publicKey
//@param String $signatureAlgorithm
//@param String $signature
//@param String $signatureSubject
//@access private
//@return Integer
//
//
//
//Reformat public keys
//
//Reformats a public key to a format supported by phpseclib (if applicable)
//
//@param String $algorithm
//@param String $key
//@access private
//@return String
//
//
//
//"Normalizes" a Distinguished Name property
//
//@param String $propName
//@access private
//@return Mixed
//
//
//
//Set a Distinguished Name property
//
//@param String $propName
//@param Mixed $propValue
//@param String $type optional
//@access public
//@return Boolean
//
//
//
//Remove Distinguished Name properties
//
//@param String $propName
//@access public
//
//
//
//Get Distinguished Name properties
//
//@param String $propName
//@param Array $dn optional
//@param Boolean $withType optional
//@return Mixed
//@access public
//
//
//
//Set a Distinguished Name
//
//@param Mixed $dn
//@param Boolean $merge optional
//@param String $type optional
//@access public
//@return Boolean
//
//
//
//Get the Distinguished Name for a certificates subject
//
//@param Mixed $format optional
//@param Array $dn optional
//@access public
//@return Boolean
//
//
//
//Get the Distinguished Name for a certificate/crl issuer
//
//@param Integer $format optional
//@access public
//@return Mixed
//
//
//
//Get the Distinguished Name for a certificate/csr subject
//Alias of getDN()
//
//@param Integer $format optional
//@access public
//@return Mixed
//
//
//
//Get an individual Distinguished Name property for a certificate/crl issuer
//
//@param String $propName
//@param Boolean $withType optional
//@access public
//@return Mixed
//
//
//
//Get an individual Distinguished Name property for a certificate/csr subject
//
//@param String $propName
//@param Boolean $withType optional
//@access public
//@return Mixed
//
//
//
//Get the certificate chain for the current cert
//
//@access public
//@return Mixed
//
//
//
//Set public key
//
//Key needs to be a Crypt_RSA object
//
//@param Object $key
//@access public
//@return Boolean
//
//
//
//Set private key
//
//Key needs to be a Crypt_RSA object
//
//@param Object $key
//@access public
//
//
//
//Gets the public key
//
//Returns a Crypt_RSA object or a false.
//
//@access public
//@return Mixed
//
//
//
//Load a Certificate Signing Request
//
//@param String $csr
//@access public
//@return Mixed
//
//
//
//Save CSR request
//
//@param Array $csr
//@param Integer $format optional
//@access public
//@return String
//
//
//
//Load a SPKAC CSR
//
//SPKAC's are produced by the HTML5 keygen element:
//
//https://developer.mozilla.org/en-US/docs/HTML/Element/keygen
//
//@param String $csr
//@access public
//@return Mixed
//
//
//
//Load a Certificate Revocation List
//
//@param String $crl
//@access public
//@return Mixed
//
//
//
//Save Certificate Revocation List.
//
//@param Array $crl
//@param Integer $format optional
//@access public
//@return String
//
//
//
//Sign an X.509 certificate
//
//$issuer's private key needs to be loaded.
//$subject can be either an existing X.509 cert (if you want to resign it),
//a CSR or something with the DN and public key explicitly set.
//
//@param File_X509 $issuer
//@param File_X509 $subject
//@param String $signatureAlgorithm optional
//@access public
//@return Mixed
//
//
//
//Sign a CSR
//
//@access public
//@return Mixed
//
//
//
//Sign a CRL
//
//$issuer's private key needs to be loaded.
//
//@param File_X509 $issuer
//@param File_X509 $crl
//@param String $signatureAlgorithm optional
//@access public
//@return Mixed
//
//
//
//X.509 certificate signing helper function.
//
//@param Object $key
//@param File_X509 $subject
//@param String $signatureAlgorithm
//@access public
//@return Mixed
//
//
//
//Set certificate start date
//
//@param String $date
//@access public
//
//
//
//Set certificate end date
//
//@param String $date
//@access public
//
//
//
//Set Serial Number
//
//@param String $serial
//@param $base optional
//@access public
//
//
//
//Turns the certificate into a certificate authority
//
//@access public
//
//
//
//Get a reference to a subarray
//
//@param array $root
//@param String $path  absolute path with / as component separator
//@param Boolean $create optional
//@access private
//@return array item ref or false
//
//
//
//Get a reference to an extension subarray
//
//@param array $root
//@param String $path optional absolute path with / as component separator
//@param Boolean $create optional
//@access private
//@return array ref or false
//
//
//
//Remove an Extension
//
//@param String $id
//@param String $path optional
//@access private
//@return Boolean
//
//
//
//Get an Extension
//
//Returns the extension if it exists and false if not
//
//@param String $id
//@param Array $cert optional
//@param String $path optional
//@access private
//@return Mixed
//
//
//
//Returns a list of all extensions in use
//
//@param array $cert optional
//@param String $path optional
//@access private
//@return Array
//
//
//
//Set an Extension
//
//@param String $id
//@param Mixed $value
//@param Boolean $critical optional
//@param Boolean $replace optional
//@param String $path optional
//@access private
//@return Boolean
//
//
//
//Remove a certificate, CSR or CRL Extension
//
//@param String $id
//@access public
//@return Boolean
//
//
//
//Get a certificate, CSR or CRL Extension
//
//Returns the extension if it exists and false if not
//
//@param String $id
//@param Array $cert optional
//@access public
//@return Mixed
//
//
//
//Returns a list of all extensions in use in certificate, CSR or CRL
//
//@param array $cert optional
//@access public
//@return Array
//
//
//
//Set a certificate, CSR or CRL Extension
//
//@param String $id
//@param Mixed $value
//@param Boolean $critical optional
//@param Boolean $replace optional
//@access public
//@return Boolean
//
//
//
//Remove a CSR attribute.
//
//@param String $id
//@param Integer $disposition optional
//@access public
//@return Boolean
//
//
//
//Get a CSR attribute
//
//Returns the attribute if it exists and false if not
//
//@param String $id
//@param Integer $disposition optional
//@param Array $csr optional
//@access public
//@return Mixed
//
//
//
//Returns a list of all CSR attributes in use
//
//@param array $csr optional
//@access public
//@return Array
//
//
//
//Set a CSR attribute
//
//@param String $id
//@param Mixed $value
//@param Boolean $disposition optional
//@access public
//@return Boolean
//
//
//
//Sets the subject key identifier
//
//This is used by the id-ce-authorityKeyIdentifier and the id-ce-subjectKeyIdentifier extensions.
//
//@param String $value
//@access public
//
//
//
//Compute a public key identifier.
//
//Although key identifiers may be set to any unique value, this function
//computes key identifiers from public key according to the two
//recommended methods (4.2.1.2 RFC 3280).
//Highly polymorphic: try to accept all possible forms of key:
//- Key object
//- File_X509 object with public or private key defined
//- Certificate or CSR array
//- File_ASN1_Element object
//- PEM or DER string
//
//@param Mixed $key optional
//@param Integer $method optional
//@access public
//@return String binary key identifier
//
//
//
//Format a public key as appropriate
//
//@access private
//@return Array
//
//
//
//Set the domain name's which the cert is to be valid for
//
//@access public
//@return Array
//
//
//
//Helper function to build domain array
//
//@access private
//@param String $domain
//@return Array
//
//
//
//Get the index of a revoked certificate.
//
//@param array $rclist
//@param String $serial
//@param Boolean $create optional
//@access private
//@return Integer or false
//
//
//
//Revoke a certificate.
//
//@param String $serial
//@param String $date optional
//@access public
//@return Boolean
//
//
//
//Unrevoke a certificate.
//
//@param String $serial
//@access public
//@return Boolean
//
//
//
//Get a revoked certificate.
//
//@param String $serial
//@access public
//@return Mixed
//
//
//
//List revoked certificates
//
//@param array $crl optional
//@access public
//@return array
//
//
//
//Remove a Revoked Certificate Extension
//
//@param String $serial
//@param String $id
//@access public
//@return Boolean
//
//
//
//Get a Revoked Certificate Extension
//
//Returns the extension if it exists and false if not
//
//@param String $serial
//@param String $id
//@param Array $crl optional
//@access public
//@return Mixed
//
//
//
//Returns a list of all extensions in use for a given revoked certificate
//
//@param String $serial
//@param array $crl optional
//@access public
//@return Array
//
//
//
//Set a Revoked Certificate Extension
//
//@param String $serial
//@param String $id
//@param Mixed $value
//@param Boolean $critical optional
//@param Boolean $replace optional
//@access public
//@return Boolean
//
//
//
//Extract raw BER from Base64 encoding
//
//@access private
//@param String $str
//@return String
//
//
class File_X509 {
    constructor() {
        this.caFlag = false;
    }

    File_X509() //Explicitly Tagged Module, 1988 Syntax
    //http://tools.ietf.org/html/rfc5280#appendix-A.1
    //In practice, RDNs containing multiple name-value pairs (called "multivalued RDNs") are rare,
    //        but they can be useful at times when either there is no unique attribute in the entry or you
    //        want to ensure that the entry's DN contains some useful identifying information.
    //        - https://www.opends.org/wiki/page/DefinitionRelativeDistinguishedName
    //http://tools.ietf.org/html/rfc5280#section-4.1.2.4
    //http://tools.ietf.org/html/rfc5280#section-4.1.1.2
    //A certificate using system MUST reject the certificate if it encounters
    //           a critical extension it does not recognize; however, a non-critical
    //           extension may be ignored if it is not recognized.
    //           http://tools.ietf.org/html/rfc5280#section-4.2
    //http://tools.ietf.org/html/rfc5280#section-4.1.2.5
    //assert($TBSCertificate['children']['signature'] == $Certificate['children']['signatureAlgorithm'])
    //mapping is from <http://www.mozilla.org/projects/security/pki/nss/tech-notes/tn3.html>
    //attribute is used in RFC2986 but we're using the RFC5280 definition
    //adapted from <http://tools.ietf.org/html/rfc2986>
    //OIDs from RFC5280 and those RFCs mentioned in RFC5280#section-4.1.1.2
    {
        this.DirectoryString = {
            type: FILE_ASN1_TYPE_CHOICE,
            children: {
                teletexString: {
                    type: FILE_ASN1_TYPE_TELETEX_STRING
                },
                printableString: {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING
                },
                universalString: {
                    type: FILE_ASN1_TYPE_UNIVERSAL_STRING
                },
                utf8String: {
                    type: FILE_ASN1_TYPE_UTF8_STRING
                },
                bmpString: {
                    type: FILE_ASN1_TYPE_BMP_STRING
                }
            }
        };
        this.PKCS9String = {
            type: FILE_ASN1_TYPE_CHOICE,
            children: {
                ia5String: {
                    type: FILE_ASN1_TYPE_IA5_STRING
                },
                directoryString: this.DirectoryString
            }
        };
        this.AttributeValue = {
            type: FILE_ASN1_TYPE_ANY
        };
        var AttributeType = {
            type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER
        };
        var AttributeTypeAndValue = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                type: AttributeType,
                value: this.AttributeValue
            }
        };
        this.RelativeDistinguishedName = {
            type: FILE_ASN1_TYPE_SET,
            min: 1,
            max: -1,
            children: AttributeTypeAndValue
        };
        var RDNSequence = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 0,
            max: -1,
            children: this.RelativeDistinguishedName
        };
        this.Name = {
            type: FILE_ASN1_TYPE_CHOICE,
            children: {
                rdnSequence: RDNSequence
            }
        };
        var AlgorithmIdentifier = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                algorithm: {
                    type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER
                },
                parameters: {
                    type: FILE_ASN1_TYPE_ANY,
                    optional: true
                }
            }
        };
        var Extension = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                extnId: {
                    type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER
                },
                critical: {
                    type: FILE_ASN1_TYPE_BOOLEAN,
                    optional: true,
                    default: false
                },
                extnValue: {
                    type: FILE_ASN1_TYPE_OCTET_STRING
                }
            }
        };
        this.Extensions = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: -1,
            children: Extension
        };
        var SubjectPublicKeyInfo = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                algorithm: AlgorithmIdentifier,
                subjectPublicKey: {
                    type: FILE_ASN1_TYPE_BIT_STRING
                }
            }
        };
        var UniqueIdentifier = {
            type: FILE_ASN1_TYPE_BIT_STRING
        };
        var Time = {
            type: FILE_ASN1_TYPE_CHOICE,
            children: {
                utcTime: {
                    type: FILE_ASN1_TYPE_UTC_TIME
                },
                generalTime: {
                    type: FILE_ASN1_TYPE_GENERALIZED_TIME
                }
            }
        };
        var Validity = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                notBefore: Time,
                notAfter: Time
            }
        };
        var CertificateSerialNumber = {
            type: FILE_ASN1_TYPE_INTEGER
        };
        var Version = {
            type: FILE_ASN1_TYPE_INTEGER,
            mapping: ["v1", "v2", "v3"]
        };
        var TBSCertificate = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                version: {
                    constant: 0,
                    optional: true,
                    explicit: true,
                    default: "v1"
                } + Version,
                serialNumber: CertificateSerialNumber,
                signature: AlgorithmIdentifier,
                issuer: this.Name,
                validity: Validity,
                subject: this.Name,
                subjectPublicKeyInfo: SubjectPublicKeyInfo,
                issuerUniqueID: {
                    constant: 1,
                    optional: true,
                    implicit: true
                } + UniqueIdentifier,
                subjectUniqueID: {
                    constant: 2,
                    optional: true,
                    implicit: true
                } + UniqueIdentifier,
                extensions: {
                    constant: 3,
                    optional: true,
                    explicit: true
                } + this.Extensions
            }
        };
        this.Certificate = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                tbsCertificate: TBSCertificate,
                signatureAlgorithm: AlgorithmIdentifier,
                signature: {
                    type: FILE_ASN1_TYPE_BIT_STRING
                }
            }
        };
        this.KeyUsage = {
            type: FILE_ASN1_TYPE_BIT_STRING,
            mapping: ["digitalSignature", "nonRepudiation", "keyEncipherment", "dataEncipherment", "keyAgreement", "keyCertSign", "cRLSign", "encipherOnly", "decipherOnly"]
        };
        this.BasicConstraints = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                cA: {
                    type: FILE_ASN1_TYPE_BOOLEAN,
                    optional: true,
                    default: false
                },
                pathLenConstraint: {
                    type: FILE_ASN1_TYPE_INTEGER,
                    optional: true
                }
            }
        };
        this.KeyIdentifier = {
            type: FILE_ASN1_TYPE_OCTET_STRING
        };
        var OrganizationalUnitNames = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: 4,
            children: {
                type: FILE_ASN1_TYPE_PRINTABLE_STRING
            }
        };
        var PersonalName = {
            type: FILE_ASN1_TYPE_SET,
            children: {
                surname: {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING,
                    constant: 0,
                    optional: true,
                    implicit: true
                },
                "given-name": {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING,
                    constant: 1,
                    optional: true,
                    implicit: true
                },
                initials: {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING,
                    constant: 2,
                    optional: true,
                    implicit: true
                },
                "generation-qualifier": {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING,
                    constant: 3,
                    optional: true,
                    implicit: true
                }
            }
        };
        var NumericUserIdentifier = {
            type: FILE_ASN1_TYPE_NUMERIC_STRING
        };
        var OrganizationName = {
            type: FILE_ASN1_TYPE_PRINTABLE_STRING
        };
        var PrivateDomainName = {
            type: FILE_ASN1_TYPE_CHOICE,
            children: {
                numeric: {
                    type: FILE_ASN1_TYPE_NUMERIC_STRING
                },
                printable: {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING
                }
            }
        };
        var TerminalIdentifier = {
            type: FILE_ASN1_TYPE_PRINTABLE_STRING
        };
        var NetworkAddress = {
            type: FILE_ASN1_TYPE_NUMERIC_STRING
        };
        var AdministrationDomainName = {
            type: FILE_ASN1_TYPE_CHOICE,
            class: FILE_ASN1_CLASS_APPLICATION,
            cast: 2,
            children: {
                numeric: {
                    type: FILE_ASN1_TYPE_NUMERIC_STRING
                },
                printable: {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING
                }
            }
        };
        var CountryName = {
            type: FILE_ASN1_TYPE_CHOICE,
            class: FILE_ASN1_CLASS_APPLICATION,
            cast: 1,
            children: {
                "x121-dcc-code": {
                    type: FILE_ASN1_TYPE_NUMERIC_STRING
                },
                "iso-3166-alpha2-code": {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING
                }
            }
        };
        var AnotherName = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                "type-id": {
                    type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER
                },
                value: {
                    type: FILE_ASN1_TYPE_ANY,
                    constant: 0,
                    optional: true,
                    explicit: true
                }
            }
        };
        var ExtensionAttribute = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                "extension-attribute-type": {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING,
                    constant: 0,
                    optional: true,
                    implicit: true
                },
                "extension-attribute-value": {
                    type: FILE_ASN1_TYPE_ANY,
                    constant: 1,
                    optional: true,
                    explicit: true
                }
            }
        };
        var ExtensionAttributes = {
            type: FILE_ASN1_TYPE_SET,
            min: 1,
            max: 256,
            children: ExtensionAttribute
        };
        var BuiltInDomainDefinedAttribute = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                type: {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING
                },
                value: {
                    type: FILE_ASN1_TYPE_PRINTABLE_STRING
                }
            }
        };
        var BuiltInDomainDefinedAttributes = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: 4,
            children: BuiltInDomainDefinedAttribute
        };
        var BuiltInStandardAttributes = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                "country-name": {
                    optional: true
                } + CountryName,
                "administration-domain-name": {
                    optional: true
                } + AdministrationDomainName,
                "network-address": {
                    constant: 0,
                    optional: true,
                    implicit: true
                } + NetworkAddress,
                "terminal-identifier": {
                    constant: 1,
                    optional: true,
                    implicit: true
                } + TerminalIdentifier,
                "private-domain-name": {
                    constant: 2,
                    optional: true,
                    explicit: true
                } + PrivateDomainName,
                "organization-name": {
                    constant: 3,
                    optional: true,
                    implicit: true
                } + OrganizationName,
                "numeric-user-identifier": {
                    constant: 4,
                    optional: true,
                    implicit: true
                } + NumericUserIdentifier,
                "personal-name": {
                    constant: 5,
                    optional: true,
                    implicit: true
                } + PersonalName,
                "organizational-unit-names": {
                    constant: 6,
                    optional: true,
                    implicit: true
                } + OrganizationalUnitNames
            }
        };
        var ORAddress = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                "built-in-standard-attributes": BuiltInStandardAttributes,
                "built-in-domain-defined-attributes": {
                    optional: true
                } + BuiltInDomainDefinedAttributes,
                "extension-attributes": {
                    optional: true
                } + ExtensionAttributes
            }
        };
        var EDIPartyName = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                nameAssigner: {
                    constant: 0,
                    optional: true,
                    implicit: true
                } + this.DirectoryString,
                partyName: {
                    constant: 1,
                    optional: true,
                    implicit: true
                } + this.DirectoryString
            }
        };
        var GeneralName = {
            type: FILE_ASN1_TYPE_CHOICE,
            children: {
                otherName: {
                    constant: 0,
                    optional: true,
                    implicit: true
                } + AnotherName,
                rfc822Name: {
                    type: FILE_ASN1_TYPE_IA5_STRING,
                    constant: 1,
                    optional: true,
                    implicit: true
                },
                dNSName: {
                    type: FILE_ASN1_TYPE_IA5_STRING,
                    constant: 2,
                    optional: true,
                    implicit: true
                },
                x400Address: {
                    constant: 3,
                    optional: true,
                    implicit: true
                } + ORAddress,
                directoryName: {
                    constant: 4,
                    optional: true,
                    explicit: true
                } + this.Name,
                ediPartyName: {
                    constant: 5,
                    optional: true,
                    implicit: true
                } + EDIPartyName,
                uniformResourceIdentifier: {
                    type: FILE_ASN1_TYPE_IA5_STRING,
                    constant: 6,
                    optional: true,
                    implicit: true
                },
                iPAddress: {
                    type: FILE_ASN1_TYPE_OCTET_STRING,
                    constant: 7,
                    optional: true,
                    implicit: true
                },
                registeredID: {
                    type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER,
                    constant: 8,
                    optional: true,
                    implicit: true
                }
            }
        };
        var GeneralNames = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: -1,
            children: GeneralName
        };
        this.IssuerAltName = GeneralNames;
        var ReasonFlags = {
            type: FILE_ASN1_TYPE_BIT_STRING,
            mapping: ["unused", "keyCompromise", "cACompromise", "affiliationChanged", "superseded", "cessationOfOperation", "certificateHold", "privilegeWithdrawn", "aACompromise"]
        };
        var DistributionPointName = {
            type: FILE_ASN1_TYPE_CHOICE,
            children: {
                fullName: {
                    constant: 0,
                    optional: true,
                    implicit: true
                } + GeneralNames,
                nameRelativeToCRLIssuer: {
                    constant: 1,
                    optional: true,
                    implicit: true
                } + this.RelativeDistinguishedName
            }
        };
        var DistributionPoint = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                distributionPoint: {
                    constant: 0,
                    optional: true,
                    explicit: true
                } + DistributionPointName,
                reasons: {
                    constant: 1,
                    optional: true,
                    implicit: true
                } + ReasonFlags,
                cRLIssuer: {
                    constant: 2,
                    optional: true,
                    implicit: true
                } + GeneralNames
            }
        };
        this.CRLDistributionPoints = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: -1,
            children: DistributionPoint
        };
        this.AuthorityKeyIdentifier = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                keyIdentifier: {
                    constant: 0,
                    optional: true,
                    implicit: true
                } + this.KeyIdentifier,
                authorityCertIssuer: {
                    constant: 1,
                    optional: true,
                    implicit: true
                } + GeneralNames,
                authorityCertSerialNumber: {
                    constant: 2,
                    optional: true,
                    implicit: true
                } + CertificateSerialNumber
            }
        };
        var PolicyQualifierId = {
            type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER
        };
        var PolicyQualifierInfo = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                policyQualifierId: PolicyQualifierId,
                qualifier: {
                    type: FILE_ASN1_TYPE_ANY
                }
            }
        };
        var CertPolicyId = {
            type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER
        };
        var PolicyInformation = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                policyIdentifier: CertPolicyId,
                policyQualifiers: {
                    type: FILE_ASN1_TYPE_SEQUENCE,
                    min: 0,
                    max: -1,
                    optional: true,
                    children: PolicyQualifierInfo
                }
            }
        };
        this.CertificatePolicies = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: -1,
            children: PolicyInformation
        };
        this.PolicyMappings = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: -1,
            children: {
                type: FILE_ASN1_TYPE_SEQUENCE,
                children: {
                    issuerDomainPolicy: CertPolicyId,
                    subjectDomainPolicy: CertPolicyId
                }
            }
        };
        var KeyPurposeId = {
            type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER
        };
        this.ExtKeyUsageSyntax = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: -1,
            children: KeyPurposeId
        };
        var AccessDescription = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                accessMethod: {
                    type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER
                },
                accessLocation: GeneralName
            }
        };
        this.AuthorityInfoAccessSyntax = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: -1,
            children: AccessDescription
        };
        this.SubjectAltName = GeneralNames;
        this.PrivateKeyUsagePeriod = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                notBefore: {
                    constant: 0,
                    optional: true,
                    implicit: true,
                    type: FILE_ASN1_TYPE_GENERALIZED_TIME
                },
                notAfter: {
                    constant: 1,
                    optional: true,
                    implicit: true,
                    type: FILE_ASN1_TYPE_GENERALIZED_TIME
                }
            }
        };
        var BaseDistance = {
            type: FILE_ASN1_TYPE_INTEGER
        };
        var GeneralSubtree = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                base: GeneralName,
                minimum: {
                    constant: 0,
                    optional: true,
                    implicit: true,
                    default: new Math_BigInteger(0)
                } + BaseDistance,
                maximum: {
                    constant: 1,
                    optional: true,
                    implicit: true
                } + BaseDistance
            }
        };
        var GeneralSubtrees = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            min: 1,
            max: -1,
            children: GeneralSubtree
        };
        this.NameConstraints = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                permittedSubtrees: {
                    constant: 0,
                    optional: true,
                    implicit: true
                } + GeneralSubtrees,
                excludedSubtrees: {
                    constant: 1,
                    optional: true,
                    implicit: true
                } + GeneralSubtrees
            }
        };
        this.CPSuri = {
            type: FILE_ASN1_TYPE_IA5_STRING
        };
        var DisplayText = {
            type: FILE_ASN1_TYPE_CHOICE,
            children: {
                ia5String: {
                    type: FILE_ASN1_TYPE_IA5_STRING
                },
                visibleString: {
                    type: FILE_ASN1_TYPE_VISIBLE_STRING
                },
                bmpString: {
                    type: FILE_ASN1_TYPE_BMP_STRING
                },
                utf8String: {
                    type: FILE_ASN1_TYPE_UTF8_STRING
                }
            }
        };
        var NoticeReference = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                organization: DisplayText,
                noticeNumbers: {
                    type: FILE_ASN1_TYPE_SEQUENCE,
                    min: 1,
                    max: 200,
                    children: {
                        type: FILE_ASN1_TYPE_INTEGER
                    }
                }
            }
        };
        this.UserNotice = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                noticeRef: {
                    optional: true,
                    implicit: true
                } + NoticeReference,
                explicitText: {
                    optional: true,
                    implicit: true
                } + DisplayText
            }
        };
        this.netscape_cert_type = {
            type: FILE_ASN1_TYPE_BIT_STRING,
            mapping: ["SSLClient", "SSLServer", "Email", "ObjectSigning", "Reserved", "SSLCA", "EmailCA", "ObjectSigningCA"]
        };
        this.netscape_comment = {
            type: FILE_ASN1_TYPE_IA5_STRING
        };
        this.netscape_ca_policy_url = {
            type: FILE_ASN1_TYPE_IA5_STRING
        };
        var Attribute = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                type: AttributeType,
                value: {
                    type: FILE_ASN1_TYPE_SET,
                    min: 1,
                    max: -1,
                    children: this.AttributeValue
                }
            }
        };
        var Attributes = {
            type: FILE_ASN1_TYPE_SET,
            min: 1,
            max: -1,
            children: Attribute
        };
        var CertificationRequestInfo = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                version: {
                    type: FILE_ASN1_TYPE_INTEGER,
                    mapping: ["v1"]
                },
                subject: this.Name,
                subjectPKInfo: SubjectPublicKeyInfo,
                attributes: {
                    constant: 0,
                    optional: true,
                    implicit: true
                } + Attributes
            }
        };
        this.CertificationRequest = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                certificationRequestInfo: CertificationRequestInfo,
                signatureAlgorithm: AlgorithmIdentifier,
                signature: {
                    type: FILE_ASN1_TYPE_BIT_STRING
                }
            }
        };
        var RevokedCertificate = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                userCertificate: CertificateSerialNumber,
                revocationDate: Time,
                crlEntryExtensions: {
                    optional: true
                } + this.Extensions
            }
        };
        var TBSCertList = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                version: {
                    optional: true,
                    default: "v1"
                } + Version,
                signature: AlgorithmIdentifier,
                issuer: this.Name,
                thisUpdate: Time,
                nextUpdate: {
                    optional: true
                } + Time,
                revokedCertificates: {
                    type: FILE_ASN1_TYPE_SEQUENCE,
                    optional: true,
                    min: 0,
                    max: -1,
                    children: RevokedCertificate
                },
                crlExtensions: {
                    constant: 0,
                    optional: true,
                    explicit: true
                } + this.Extensions
            }
        };
        this.CertificateList = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                tbsCertList: TBSCertList,
                signatureAlgorithm: AlgorithmIdentifier,
                signature: {
                    type: FILE_ASN1_TYPE_BIT_STRING
                }
            }
        };
        this.CRLNumber = {
            type: FILE_ASN1_TYPE_INTEGER
        };
        this.CRLReason = {
            type: FILE_ASN1_TYPE_ENUMERATED,
            mapping: {
                0: "unspecified",
                1: "keyCompromise",
                2: "cACompromise",
                3: "affiliationChanged",
                4: "superseded",
                5: "cessationOfOperation",
                6: "certificateHold",
                8: "removeFromCRL",
                9: "privilegeWithdrawn",
                10: "aACompromise"
            }
        };
        this.IssuingDistributionPoint = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                distributionPoint: {
                    constant: 0,
                    optional: true,
                    explicit: true
                } + DistributionPointName,
                onlyContainsUserCerts: {
                    type: FILE_ASN1_TYPE_BOOLEAN,
                    constant: 1,
                    optional: true,
                    default: false,
                    implicit: true
                },
                onlyContainsCACerts: {
                    type: FILE_ASN1_TYPE_BOOLEAN,
                    constant: 2,
                    optional: true,
                    default: false,
                    implicit: true
                },
                onlySomeReasons: {
                    constant: 3,
                    optional: true,
                    implicit: true
                } + ReasonFlags,
                indirectCRL: {
                    type: FILE_ASN1_TYPE_BOOLEAN,
                    constant: 4,
                    optional: true,
                    default: false,
                    implicit: true
                },
                onlyContainsAttributeCerts: {
                    type: FILE_ASN1_TYPE_BOOLEAN,
                    constant: 5,
                    optional: true,
                    default: false,
                    implicit: true
                }
            }
        };
        this.InvalidityDate = {
            type: FILE_ASN1_TYPE_GENERALIZED_TIME
        };
        this.CertificateIssuer = GeneralNames;
        this.HoldInstructionCode = {
            type: FILE_ASN1_TYPE_OBJECT_IDENTIFIER
        };
        var PublicKeyAndChallenge = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                spki: SubjectPublicKeyInfo,
                challenge: {
                    type: FILE_ASN1_TYPE_IA5_STRING
                }
            }
        };
        this.SignedPublicKeyAndChallenge = {
            type: FILE_ASN1_TYPE_SEQUENCE,
            children: {
                publicKeyAndChallenge: PublicKeyAndChallenge,
                signatureAlgorithm: AlgorithmIdentifier,
                signature: {
                    type: FILE_ASN1_TYPE_BIT_STRING
                }
            }
        };
        this.oids = {
            "1.3.6.1.5.5.7": "id-pkix",
            "1.3.6.1.5.5.7.1": "id-pe",
            "1.3.6.1.5.5.7.2": "id-qt",
            "1.3.6.1.5.5.7.3": "id-kp",
            "1.3.6.1.5.5.7.48": "id-ad",
            "1.3.6.1.5.5.7.2.1": "id-qt-cps",
            "1.3.6.1.5.5.7.2.2": "id-qt-unotice",
            "1.3.6.1.5.5.7.48.1": "id-ad-ocsp",
            "1.3.6.1.5.5.7.48.2": "id-ad-caIssuers",
            "1.3.6.1.5.5.7.48.3": "id-ad-timeStamping",
            "1.3.6.1.5.5.7.48.5": "id-ad-caRepository",
            "2.5.4": "id-at",
            "2.5.4.41": "id-at-name",
            "2.5.4.4": "id-at-surname",
            "2.5.4.42": "id-at-givenName",
            "2.5.4.43": "id-at-initials",
            "2.5.4.44": "id-at-generationQualifier",
            "2.5.4.3": "id-at-commonName",
            "2.5.4.7": "id-at-localityName",
            "2.5.4.8": "id-at-stateOrProvinceName",
            "2.5.4.10": "id-at-organizationName",
            "2.5.4.11": "id-at-organizationalUnitName",
            "2.5.4.12": "id-at-title",
            "2.5.4.13": "id-at-description",
            "2.5.4.46": "id-at-dnQualifier",
            "2.5.4.6": "id-at-countryName",
            "2.5.4.5": "id-at-serialNumber",
            "2.5.4.65": "id-at-pseudonym",
            "2.5.4.17": "id-at-postalCode",
            "2.5.4.9": "id-at-streetAddress",
            "2.5.4.45": "id-at-uniqueIdentifier",
            "2.5.4.72": "id-at-role",
            "0.9.2342.19200300.100.1.25": "id-domainComponent",
            "1.2.840.113549.1.9": "pkcs-9",
            "1.2.840.113549.1.9.1": "pkcs-9-at-emailAddress",
            "2.5.29": "id-ce",
            "2.5.29.35": "id-ce-authorityKeyIdentifier",
            "2.5.29.14": "id-ce-subjectKeyIdentifier",
            "2.5.29.15": "id-ce-keyUsage",
            "2.5.29.16": "id-ce-privateKeyUsagePeriod",
            "2.5.29.32": "id-ce-certificatePolicies",
            "2.5.29.32.0": "anyPolicy",
            "2.5.29.33": "id-ce-policyMappings",
            "2.5.29.17": "id-ce-subjectAltName",
            "2.5.29.18": "id-ce-issuerAltName",
            "2.5.29.9": "id-ce-subjectDirectoryAttributes",
            "2.5.29.19": "id-ce-basicConstraints",
            "2.5.29.30": "id-ce-nameConstraints",
            "2.5.29.36": "id-ce-policyConstraints",
            "2.5.29.31": "id-ce-cRLDistributionPoints",
            "2.5.29.37": "id-ce-extKeyUsage",
            "2.5.29.37.0": "anyExtendedKeyUsage",
            "1.3.6.1.5.5.7.3.1": "id-kp-serverAuth",
            "1.3.6.1.5.5.7.3.2": "id-kp-clientAuth",
            "1.3.6.1.5.5.7.3.3": "id-kp-codeSigning",
            "1.3.6.1.5.5.7.3.4": "id-kp-emailProtection",
            "1.3.6.1.5.5.7.3.8": "id-kp-timeStamping",
            "1.3.6.1.5.5.7.3.9": "id-kp-OCSPSigning",
            "2.5.29.54": "id-ce-inhibitAnyPolicy",
            "2.5.29.46": "id-ce-freshestCRL",
            "1.3.6.1.5.5.7.1.1": "id-pe-authorityInfoAccess",
            "1.3.6.1.5.5.7.1.11": "id-pe-subjectInfoAccess",
            "2.5.29.20": "id-ce-cRLNumber",
            "2.5.29.28": "id-ce-issuingDistributionPoint",
            "2.5.29.27": "id-ce-deltaCRLIndicator",
            "2.5.29.21": "id-ce-cRLReasons",
            "2.5.29.29": "id-ce-certificateIssuer",
            "2.5.29.23": "id-ce-holdInstructionCode",
            "1.2.840.10040.2": "holdInstruction",
            "1.2.840.10040.2.1": "id-holdinstruction-none",
            "1.2.840.10040.2.2": "id-holdinstruction-callissuer",
            "1.2.840.10040.2.3": "id-holdinstruction-reject",
            "2.5.29.24": "id-ce-invalidityDate",
            "1.2.840.113549.2.2": "md2",
            "1.2.840.113549.2.5": "md5",
            "1.3.14.3.2.26": "id-sha1",
            "1.2.840.10040.4.1": "id-dsa",
            "1.2.840.10040.4.3": "id-dsa-with-sha1",
            "1.2.840.113549.1.1": "pkcs-1",
            "1.2.840.113549.1.1.1": "rsaEncryption",
            "1.2.840.113549.1.1.2": "md2WithRSAEncryption",
            "1.2.840.113549.1.1.4": "md5WithRSAEncryption",
            "1.2.840.113549.1.1.5": "sha1WithRSAEncryption",
            "1.2.840.10046.2.1": "dhpublicnumber",
            "2.16.840.1.101.2.1.1.22": "id-keyExchangeAlgorithm",
            "1.2.840.10045": "ansi-X9-62",
            "1.2.840.10045.4": "id-ecSigType",
            "1.2.840.10045.4.1": "ecdsa-with-SHA1",
            "1.2.840.10045.1": "id-fieldType",
            "1.2.840.10045.1.1": "prime-field",
            "1.2.840.10045.1.2": "characteristic-two-field",
            "1.2.840.10045.1.2.3": "id-characteristic-two-basis",
            "1.2.840.10045.1.2.3.1": "gnBasis",
            "1.2.840.10045.1.2.3.2": "tpBasis",
            "1.2.840.10045.1.2.3.3": "ppBasis",
            "1.2.840.10045.2": "id-publicKeyType",
            "1.2.840.10045.2.1": "id-ecPublicKey",
            "1.2.840.10045.3": "ellipticCurve",
            "1.2.840.10045.3.0": "c-TwoCurve",
            "1.2.840.10045.3.0.1": "c2pnb163v1",
            "1.2.840.10045.3.0.2": "c2pnb163v2",
            "1.2.840.10045.3.0.3": "c2pnb163v3",
            "1.2.840.10045.3.0.4": "c2pnb176w1",
            "1.2.840.10045.3.0.5": "c2pnb191v1",
            "1.2.840.10045.3.0.6": "c2pnb191v2",
            "1.2.840.10045.3.0.7": "c2pnb191v3",
            "1.2.840.10045.3.0.8": "c2pnb191v4",
            "1.2.840.10045.3.0.9": "c2pnb191v5",
            "1.2.840.10045.3.0.10": "c2pnb208w1",
            "1.2.840.10045.3.0.11": "c2pnb239v1",
            "1.2.840.10045.3.0.12": "c2pnb239v2",
            "1.2.840.10045.3.0.13": "c2pnb239v3",
            "1.2.840.10045.3.0.14": "c2pnb239v4",
            "1.2.840.10045.3.0.15": "c2pnb239v5",
            "1.2.840.10045.3.0.16": "c2pnb272w1",
            "1.2.840.10045.3.0.17": "c2pnb304w1",
            "1.2.840.10045.3.0.18": "c2pnb359v1",
            "1.2.840.10045.3.0.19": "c2pnb368w1",
            "1.2.840.10045.3.0.20": "c2pnb431r1",
            "1.2.840.10045.3.1": "primeCurve",
            "1.2.840.10045.3.1.1": "prime192v1",
            "1.2.840.10045.3.1.2": "prime192v2",
            "1.2.840.10045.3.1.3": "prime192v3",
            "1.2.840.10045.3.1.4": "prime239v1",
            "1.2.840.10045.3.1.5": "prime239v2",
            "1.2.840.10045.3.1.6": "prime239v3",
            "1.2.840.10045.3.1.7": "prime256v1",
            "1.2.840.113549.1.1.7": "id-RSAES-OAEP",
            "1.2.840.113549.1.1.9": "id-pSpecified",
            "1.2.840.113549.1.1.10": "id-RSASSA-PSS",
            "1.2.840.113549.1.1.8": "id-mgf1",
            "1.2.840.113549.1.1.14": "sha224WithRSAEncryption",
            "1.2.840.113549.1.1.11": "sha256WithRSAEncryption",
            "1.2.840.113549.1.1.12": "sha384WithRSAEncryption",
            "1.2.840.113549.1.1.13": "sha512WithRSAEncryption",
            "2.16.840.1.101.3.4.2.4": "id-sha224",
            "2.16.840.1.101.3.4.2.1": "id-sha256",
            "2.16.840.1.101.3.4.2.2": "id-sha384",
            "2.16.840.1.101.3.4.2.3": "id-sha512",
            "1.2.643.2.2.4": "id-GostR3411-94-with-GostR3410-94",
            "1.2.643.2.2.3": "id-GostR3411-94-with-GostR3410-2001",
            "1.2.643.2.2.20": "id-GostR3410-2001",
            "1.2.643.2.2.19": "id-GostR3410-94",
            "2.16.840.1.113730": "netscape",
            "2.16.840.1.113730.1": "netscape-cert-extension",
            "2.16.840.1.113730.1.1": "netscape-cert-type",
            "2.16.840.1.113730.1.13": "netscape-comment",
            "2.16.840.1.113730.1.8": "netscape-ca-policy-url",
            "1.3.6.1.5.5.7.1.12": "id-pe-logotype",
            "1.2.840.113533.7.65.0": "entrustVersInfo",
            "2.16.840.1.113733.1.6.9": "verisignPrivate",
            "1.2.840.113549.1.9.2": "pkcs-9-at-unstructuredName",
            "1.2.840.113549.1.9.7": "pkcs-9-at-challengePassword",
            "1.2.840.113549.1.9.14": "pkcs-9-at-extensionRequest"
        };
    }

    loadX509(cert) {
        if (Array.isArray(cert) && undefined !== cert.tbsCertificate) {
            delete this.currentCert;
            delete this.currentKeyIdentifier;
            this.dn = cert.tbsCertificate.subject;

            if (!(undefined !== this.dn)) {
                return false;
            }

            this.currentCert = cert;
            var currentKeyIdentifier = this.getExtension("id-ce-subjectKeyIdentifier");
            this.currentKeyIdentifier = "string" === typeof currentKeyIdentifier ? currentKeyIdentifier : undefined;
            delete this.signatureSubject;
            return cert;
        }

        var asn1 = new File_ASN1();
        cert = this._extractBER(cert);

        if (cert === false) {
            this.currentCert = false;
            return false;
        }

        asn1.loadOIDs(this.oids);
        var decoded = asn1.decodeBER(cert);

        if (!!decoded) {
            var x509 = asn1.asn1map(decoded[0], this.Certificate);
        }

        if (!(undefined !== x509) || x509 === false) {
            this.currentCert = false;
            return false;
        }

        this.signatureSubject = cert.substr(decoded[0].content[0].start, decoded[0].content[0].length);

        this._mapInExtensions(x509, "tbsCertificate/extensions", asn1);

        var key = x509.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey;
        key = this._reformatKey(x509.tbsCertificate.subjectPublicKeyInfo.algorithm.algorithm, key);
        this.currentCert = x509;
        this.dn = x509.tbsCertificate.subject;
        currentKeyIdentifier = this.getExtension("id-ce-subjectKeyIdentifier");
        this.currentKeyIdentifier = "string" === typeof currentKeyIdentifier ? currentKeyIdentifier : undefined;
        return x509;
    }

    saveX509(cert, format = FILE_X509_FORMAT_PEM) //in the case of policyQualifiers/qualifier, the type has to be FILE_ASN1_TYPE_IA5_STRING.
    //           FILE_ASN1_TYPE_PRINTABLE_STRING will cause OpenSSL's X.509 parser to spit out random
    //           characters.
    {
        if (!Array.isArray(cert) || !(undefined !== cert.tbsCertificate)) {
            return false;
        }

        switch (true) {
            case !(algorithm = this._subArray(cert, "tbsCertificate/subjectPublicKeyInfo/algorithm/algorithm")):
            case "object" === typeof cert.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey:
                break;

            default:
                switch (algorithm) {
                    case "rsaEncryption":
                        cert.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey = base64_encode("\\0" + base64_decode(preg_replace("#-.+-|[\r\n]#", "", cert.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey)));
                }

        }

        var asn1 = new File_ASN1();
        asn1.loadOIDs(this.oids);
        var filters = Array();
        filters.tbsCertificate.signature.parameters = filters.tbsCertificate.signature.issuer.rdnSequence.value = filters.tbsCertificate.issuer.rdnSequence.value = filters.tbsCertificate.subject.rdnSequence.value = filters.tbsCertificate.subjectPublicKeyInfo.algorithm.parameters = filters.signatureAlgorithm.parameters = filters.authorityCertIssuer.directoryName.rdnSequence.value = filters.distributionPoint.fullName.directoryName.rdnSequence.value = filters.directoryName.rdnSequence.value = {
            type: FILE_ASN1_TYPE_UTF8_STRING
        };
        filters.policyQualifiers.qualifier = {
            type: FILE_ASN1_TYPE_IA5_STRING
        };
        asn1.loadFilters(filters);

        this._mapOutExtensions(cert, "tbsCertificate/extensions", asn1);

        cert = asn1.encodeDER(cert, this.Certificate);

        switch (format) {
            case FILE_X509_FORMAT_DER:
                return cert;

            default:
                return "-----BEGIN CERTIFICATE-----\r\n" + chunk_split(base64_encode(cert), 64) + "-----END CERTIFICATE-----";
        }
    }

    _mapInExtensions(root, path, asn1) {
        var extensions = this._subArray(root, path);

        if (Array.isArray(extensions)) {
            for (var i = 0; i < extensions.length; i++) //[extnValue] contains the DER encoding of an ASN.1 value
            //                   corresponding to the extension type identified by extnID
            {
                var id = extensions[i].extnId;
                var value = extensions[i].extnValue;
                value = base64_decode(value);
                var decoded = asn1.decodeBER(value);

                var map = this._getMapping(id);

                if (!("boolean" === typeof map)) {
                    var mapped = asn1.asn1map(decoded[0], map);
                    value = mapped === false ? decoded[0] : mapped;

                    if (id == "id-ce-certificatePolicies") {
                        for (var j = 0; j < value.length; j++) {
                            if (!(undefined !== value[j].policyQualifiers)) {
                                continue;
                            }

                            for (var k = 0; k < value[j].policyQualifiers.length; k++) {
                                var subid = value[j].policyQualifiers[k].policyQualifierId;
                                map = this._getMapping(subid);
                                var subvalue = value[j].policyQualifiers[k].qualifier;

                                if (map !== false) {
                                    decoded = asn1.decodeBER(subvalue);
                                    mapped = asn1.asn1map(decoded[0], map);
                                    subvalue = mapped === false ? decoded[0] : mapped;
                                }
                            }
                        }
                    }
                } else if (map) {
                    value = base64_encode(value);
                }
            }
        }
    }

    _mapOutExtensions(root, path, asn1) {
        var extensions = this._subArray(root, path);

        if (Array.isArray(extensions)) {
            var size = extensions.length;

            for (var i = 0; i < size; i++) {
                var id = extensions[i].extnId;
                var value = extensions[i].extnValue;

                switch (id) {
                    case "id-ce-certificatePolicies":
                        for (var j = 0; j < value.length; j++) {
                            if (!(undefined !== value[j].policyQualifiers)) {
                                continue;
                            }

                            for (var k = 0; k < value[j].policyQualifiers.length; k++) {
                                var subid = value[j].policyQualifiers[k].policyQualifierId;

                                var map = this._getMapping(subid);

                                var subvalue = value[j].policyQualifiers[k].qualifier;

                                if (map !== false) //by default File_ASN1 will try to render qualifier as a FILE_ASN1_TYPE_IA5_STRING since it's
                                    //actual type is FILE_ASN1_TYPE_ANY
                                    {
                                        subvalue = new File_ASN1_Element(asn1.encodeDER(subvalue, map));
                                    }
                            }
                        }

                        break;

                    case "id-ce-authorityKeyIdentifier":
                        if (undefined !== value.authorityCertSerialNumber) {
                            if (value.authorityCertSerialNumber.toBytes() == "") {
                                var temp = String.fromCharCode(FILE_ASN1_CLASS_CONTEXT_SPECIFIC << 6 | 2) + "\\1\\0";
                                value.authorityCertSerialNumber = new File_ASN1_Element(temp);
                            }
                        }

                }

                map = this._getMapping(id);

                if ("boolean" === typeof map) {
                    if (!map) {
                        user_error(id + " is not a currently supported extension");
                        delete extensions[i];
                    }
                } else {
                    temp = asn1.encodeDER(value, map);
                    value = base64_encode(temp);
                }
            }
        }
    }

    _mapInAttributes(root, path, asn1) {
        var attributes = this._subArray(root, path);

        if (Array.isArray(attributes)) {
            for (var i = 0; i < attributes.length; i++) //$value contains the DER encoding of an ASN.1 value
            //                   corresponding to the attribute type identified by type
            {
                var id = attributes[i].type;

                var map = this._getMapping(id);

                if (Array.isArray(attributes[i].value)) {
                    var values = attributes[i].value;

                    for (var j = 0; j < values.length; j++) {
                        var value = asn1.encodeDER(values[j], this.AttributeValue);
                        var decoded = asn1.decodeBER(value);

                        if (!("boolean" === typeof map)) {
                            var mapped = asn1.asn1map(decoded[0], map);

                            if (mapped !== false) {
                                values[j] = mapped;
                            }

                            if (id == "pkcs-9-at-extensionRequest") {
                                this._mapInExtensions(values, j, asn1);
                            }
                        } else if (map) {
                            values[j] = base64_encode(value);
                        }
                    }
                }
            }
        }
    }

    _mapOutAttributes(root, path, asn1) {
        var attributes = this._subArray(root, path);

        if (Array.isArray(attributes)) {
            var size = attributes.length;

            for (var i = 0; i < size; i++) //[value] contains the DER encoding of an ASN.1 value
            //                   corresponding to the attribute type identified by type
            {
                var id = attributes[i].type;

                var map = this._getMapping(id);

                if (map === false) {
                    user_error(id + " is not a currently supported attribute", E_USER_NOTICE);
                    delete attributes[i];
                } else if (Array.isArray(attributes[i].value)) {
                    var values = attributes[i].value;

                    for (var j = 0; j < values.length; j++) {
                        switch (id) {
                            case "pkcs-9-at-extensionRequest":
                                this._mapOutExtensions(values, j, asn1);

                                break;
                        }

                        if (!("boolean" === typeof map)) {
                            var temp = asn1.encodeDER(values[j], map);
                            var decoded = asn1.decodeBER(temp);
                            values[j] = asn1.asn1map(decoded[0], this.AttributeValue);
                        }
                    }
                }
            }
        }
    }

    _getMapping(extnId) {
        if (!("string" === typeof extnId)) //eg. if it's a File_ASN1_Element object
            {
                return true;
            }

        switch (extnId) {
            case "id-ce-keyUsage":
                return this.KeyUsage;

            case "id-ce-basicConstraints":
                return this.BasicConstraints;

            case "id-ce-subjectKeyIdentifier":
                return this.KeyIdentifier;

            case "id-ce-cRLDistributionPoints":
                return this.CRLDistributionPoints;

            case "id-ce-authorityKeyIdentifier":
                return this.AuthorityKeyIdentifier;

            case "id-ce-certificatePolicies":
                return this.CertificatePolicies;

            case "id-ce-extKeyUsage":
                return this.ExtKeyUsageSyntax;

            case "id-pe-authorityInfoAccess":
                return this.AuthorityInfoAccessSyntax;

            case "id-ce-subjectAltName":
                return this.SubjectAltName;

            case "id-ce-privateKeyUsagePeriod":
                return this.PrivateKeyUsagePeriod;

            case "id-ce-issuerAltName":
                return this.IssuerAltName;

            case "id-ce-policyMappings":
                return this.PolicyMappings;

            case "id-ce-nameConstraints":
                return this.NameConstraints;

            case "netscape-cert-type":
                return this.netscape_cert_type;

            case "netscape-comment":
                return this.netscape_comment;

            case "netscape-ca-policy-url":
                return this.netscape_ca_policy_url;

            case "id-qt-unotice":
                return this.UserNotice;

            case "id-pe-logotype":
            case "entrustVersInfo":
            case "1.3.6.1.4.1.311.20.2":
            case "1.3.6.1.4.1.311.21.1":
            case "2.23.42.7.0":
                return true;

            case "pkcs-9-at-unstructuredName":
                return this.PKCS9String;

            case "pkcs-9-at-challengePassword":
                return this.DirectoryString;

            case "pkcs-9-at-extensionRequest":
                return this.Extensions;

            case "id-ce-cRLNumber":
                return this.CRLNumber;

            case "id-ce-deltaCRLIndicator":
                return this.CRLNumber;

            case "id-ce-issuingDistributionPoint":
                return this.IssuingDistributionPoint;

            case "id-ce-freshestCRL":
                return this.CRLDistributionPoints;

            case "id-ce-cRLReasons":
                return this.CRLReason;

            case "id-ce-invalidityDate":
                return this.InvalidityDate;

            case "id-ce-certificateIssuer":
                return this.CertificateIssuer;

            case "id-ce-holdInstructionCode":
                return this.HoldInstructionCode;
        }

        return false;
    }

    loadCA(cert) {
        var olddn = this.dn;
        var oldcert = this.currentCert;
        var oldsigsubj = this.signatureSubject;
        var oldkeyid = this.currentKeyIdentifier;
        cert = this.loadX509(cert);

        if (!cert) {
            this.dn = olddn;
            this.currentCert = oldcert;
            this.signatureSubject = oldsigsubj;
            this.currentKeyIdentifier = oldkeyid;
            return false;
        }

        this.CAs.push(cert);
        this.dn = olddn;
        this.currentCert = oldcert;
        this.signatureSubject = oldsigsubj;
        return true;
    }

    validateURL(url) {
        if (!Array.isArray(this.currentCert) || !(undefined !== this.currentCert.tbsCertificate)) {
            return false;
        }

        var components = parse_url(url);

        if (!(undefined !== components.host)) {
            return false;
        }

        if (names = this.getExtension("id-ce-subjectAltName")) {
            for (var key in names) {
                var value = names[key];
                var value = str_replace([".", "*"], ["\\.", "[^.]*"], value);

                switch (key) {
                    case "dNSName":
                        if (preg_match("#^" + value + "$#", components.host)) {
                            return true;
                        }

                        break;

                    case "iPAddress":
                        if (preg_match("#(?:\\d{1-3}\\.){4}#", components.host + ".") && preg_match("#^" + value + "$#", components.host)) {
                            return true;
                        }

                }
            }

            return false;
        }

        if (value = this.getDNProp("id-at-commonName")) {
            value = str_replace([".", "*"], ["\\.", "[^.]*"], value[0]);
            return preg_match("#^" + value + "$#", components.host);
        }

        return false;
    }

    validateDate(date = undefined) {
        if (!Array.isArray(this.currentCert) || !(undefined !== this.currentCert.tbsCertificate)) {
            return false;
        }

        if (!(undefined !== date)) {
            date = Date.now() / 1000;
        }

        var notBefore = this.currentCert.tbsCertificate.validity.notBefore;
        notBefore = undefined !== notBefore.generalTime ? notBefore.generalTime : notBefore.utcTime;
        var notAfter = this.currentCert.tbsCertificate.validity.notAfter;
        notAfter = undefined !== notAfter.generalTime ? notAfter.generalTime : notAfter.utcTime;

        switch (true) {
            case date < strtotime(notBefore):
            case date > strtotime(notAfter):
                return false;
        }

        return true;
    }

    validateSignature(caonly = true) {
        if (!Array.isArray(this.currentCert) || !(undefined !== this.signatureSubject)) {
            return 0;
        }

        switch (true) {
            case undefined !== this.currentCert.tbsCertificate:
                if (this.currentCert.tbsCertificate.issuer === this.currentCert.tbsCertificate.subject) {
                    var authorityKey = this.getExtension("id-ce-authorityKeyIdentifier");
                    var subjectKeyID = this.getExtension("id-ce-subjectKeyIdentifier");

                    switch (true) {
                        case !Array.isArray(authorityKey):
                        case Array.isArray(authorityKey) && undefined !== authorityKey.keyIdentifier && authorityKey.keyIdentifier === subjectKeyID:
                            var signingCert = this.currentCert;
                    }
                }

                if (!!this.CAs) {
                    for (var i = 0; i < this.CAs.length; i++) //even if the cert is a self-signed one we still want to see if it's a CA;
                    //if not, we'll conditionally return an error
                    {
                        var ca = this.CAs[i];

                        if (this.currentCert.tbsCertificate.issuer === ca.tbsCertificate.subject) {
                            authorityKey = this.getExtension("id-ce-authorityKeyIdentifier");
                            subjectKeyID = this.getExtension("id-ce-subjectKeyIdentifier", ca);

                            switch (true) {
                                case !Array.isArray(authorityKey):
                                case Array.isArray(authorityKey) && undefined !== authorityKey.keyIdentifier && authorityKey.keyIdentifier === subjectKeyID:
                                    signingCert = ca;
                                    break;
                            }
                        }
                    }

                    if (this.CAs.length == i && caonly) {
                        return false;
                    }
                } else if (!(undefined !== signingCert) || caonly) {
                    return false;
                }

                return this._validateSignature(signingCert.tbsCertificate.subjectPublicKeyInfo.algorithm.algorithm, signingCert.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey, this.currentCert.signatureAlgorithm.algorithm, base64_decode(this.currentCert.signature).substr(1), this.signatureSubject);

            case undefined !== this.currentCert.certificationRequestInfo:
                return this._validateSignature(this.currentCert.certificationRequestInfo.subjectPKInfo.algorithm.algorithm, this.currentCert.certificationRequestInfo.subjectPKInfo.subjectPublicKey, this.currentCert.signatureAlgorithm.algorithm, base64_decode(this.currentCert.signature).substr(1), this.signatureSubject);

            case undefined !== this.currentCert.publicKeyAndChallenge:
                return this._validateSignature(this.currentCert.publicKeyAndChallenge.spki.algorithm.algorithm, this.currentCert.publicKeyAndChallenge.spki.subjectPublicKey, this.currentCert.signatureAlgorithm.algorithm, base64_decode(this.currentCert.signature).substr(1), this.signatureSubject);

            case undefined !== this.currentCert.tbsCertList:
                if (!!this.CAs) {
                    for (i = 0;; i < this.CAs.length; i++) {
                        ca = this.CAs[i];

                        if (this.currentCert.tbsCertList.issuer === ca.tbsCertificate.subject) {
                            authorityKey = this.getExtension("id-ce-authorityKeyIdentifier");
                            subjectKeyID = this.getExtension("id-ce-subjectKeyIdentifier", ca);

                            switch (true) {
                                case !Array.isArray(authorityKey):
                                case Array.isArray(authorityKey) && undefined !== authorityKey.keyIdentifier && authorityKey.keyIdentifier === subjectKeyID:
                                    signingCert = ca;
                                    break;
                            }
                        }
                    }
                }

                if (!(undefined !== signingCert)) {
                    return false;
                }

                return this._validateSignature(signingCert.tbsCertificate.subjectPublicKeyInfo.algorithm.algorithm, signingCert.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey, this.currentCert.signatureAlgorithm.algorithm, base64_decode(this.currentCert.signature).substr(1), this.signatureSubject);

            default:
                return false;
        }
    }

    _validateSignature(publicKeyAlgorithm, publicKey, signatureAlgorithm, signature, signatureSubject) {
        switch (publicKeyAlgorithm) {
            case "rsaEncryption":
                if (!("function" === typeof Crypt_RSA)) {
                    require("Crypt/RSA.php");
                }

                var rsa = new Crypt_RSA();
                rsa.loadKey(publicKey);

                switch (signatureAlgorithm) {
                    case "md2WithRSAEncryption":
                    case "md5WithRSAEncryption":
                    case "sha1WithRSAEncryption":
                    case "sha224WithRSAEncryption":
                    case "sha256WithRSAEncryption":
                    case "sha384WithRSAEncryption":
                    case "sha512WithRSAEncryption":
                        rsa.setHash(signatureAlgorithm.replace(/WithRSAEncryption$/g, ""));
                        rsa.setSignatureMode(CRYPT_RSA_SIGNATURE_PKCS1);

                        if (!rsa.verify(signatureSubject, signature)) {
                            return false;
                        }

                        break;

                    default:
                        return undefined;
                }

                break;

            default:
                return undefined;
        }

        return true;
    }

    _reformatKey(algorithm, key) {
        switch (algorithm) {
            case "rsaEncryption":
                return "-----BEGIN PUBLIC KEY-----\r\n" + chunk_split(base64_encode(base64_decode(key).substr(1)), 64) + "-----END PUBLIC KEY-----";

            default:
                return key;
        }
    }

    _translateDNProp(propName) {
        switch (propName.toLowerCase()) {
            case "id-at-countryname":
            case "countryname":
            case "c":
                return "id-at-countryName";

            case "id-at-organizationname":
            case "organizationname":
            case "o":
                return "id-at-organizationName";

            case "id-at-dnqualifier":
            case "dnqualifier":
                return "id-at-dnQualifier";

            case "id-at-commonname":
            case "commonname":
            case "cn":
                return "id-at-commonName";

            case "id-at-stateorprovinceName":
            case "stateorprovincename":
            case "state":
            case "province":
            case "provincename":
            case "st":
                return "id-at-stateOrProvinceName";

            case "id-at-localityname":
            case "localityname":
            case "l":
                return "id-at-localityName";

            case "id-emailaddress":
            case "emailaddress":
                return "pkcs-9-at-emailAddress";

            case "id-at-serialnumber":
            case "serialnumber":
                return "id-at-serialNumber";

            case "id-at-postalcode":
            case "postalcode":
                return "id-at-postalCode";

            case "id-at-streetaddress":
            case "streetaddress":
                return "id-at-streetAddress";

            case "id-at-name":
            case "name":
                return "id-at-name";

            case "id-at-givenname":
            case "givenname":
                return "id-at-givenName";

            case "id-at-surname":
            case "surname":
            case "sn":
                return "id-at-surname";

            case "id-at-initials":
            case "initials":
                return "id-at-initials";

            case "id-at-generationqualifier":
            case "generationqualifier":
                return "id-at-generationQualifier";

            case "id-at-organizationalunitname":
            case "organizationalunitname":
            case "ou":
                return "id-at-organizationalUnitName";

            case "id-at-pseudonym":
            case "pseudonym":
                return "id-at-pseudonym";

            case "id-at-title":
            case "title":
                return "id-at-title";

            case "id-at-description":
            case "description":
                return "id-at-description";

            case "id-at-role":
            case "role":
                return "id-at-role";

            case "id-at-uniqueidentifier":
            case "uniqueidentifier":
            case "x500uniqueidentifier":
                return "id-at-uniqueIdentifier";

            default:
                return false;
        }
    }

    setDNProp(propName, propValue, type = "utf8String") {
        if (!this.dn) {
            this.dn = {
                rdnSequence: Array()
            };
        }

        if ((propName = this._translateDNProp(propName)) === false) {
            return false;
        }

        for (var v of Object.values(Array.from(propValue))) {
            if (!Array.isArray(v) && undefined !== type) {
                var v = {
                    [type]: v
                };
            }

            this.dn.rdnSequence.push([{
                type: propName,
                value: v
            }]);
        }

        return true;
    }

    removeDNProp(propName) {
        if (!this.dn) {
            return;
        }

        if ((propName = this._translateDNProp(propName)) === false) {
            return;
        }

        var dn = this.dn.rdnSequence;
        var size = dn.length;

        for (var i = 0; i < size; i++) {
            if (dn[i][0].type == propName) {
                delete dn[i];
            }
        }

        dn = Object.values(dn);
    }

    getDNProp(propName, dn = undefined, withType = false) {
        if (!(undefined !== dn)) {
            dn = this.dn;
        }

        if (!dn) {
            return false;
        }

        if ((propName = this._translateDNProp(propName)) === false) {
            return false;
        }

        dn = dn.rdnSequence;
        var result = Array();
        var asn1 = new File_ASN1();

        for (var i = 0; i < dn.length; i++) {
            if (dn[i][0].type == propName) {
                var v = dn[i][0].value;

                if (!withType && Array.isArray(v)) {
                    for (var type in v) {
                        var s = v[type];
                        var type = array_search(type, asn1.ANYmap, true);

                        if (type !== false && undefined !== asn1.stringTypeSize[type]) {
                            var s = asn1.convert(s, type);

                            if (s !== false) {
                                v = s;
                                break;
                            }
                        }
                    }

                    if (Array.isArray(v)) //Always strip data type.
                        {
                            v = v.pop();
                        }
                }

                result.push(v);
            }
        }

        return result;
    }

    setDN(dn, merge = false, type = "utf8String") {
        if (!merge) {
            this.dn = undefined;
        }

        if (Array.isArray(dn)) {
            if (undefined !== dn.rdnSequence) //No merge here.
                {
                    this.dn = dn;
                    return true;
                }

            for (var prop in dn) {
                var value = dn[prop];

                if (!this.setDNProp(prop, value, type)) {
                    return false;
                }
            }

            return true;
        }

        var results = preg_split("#((?:^|, *|/)(?:C=|O=|OU=|CN=|L=|ST=|SN=|postalCode=|streetAddress=|emailAddress=|serialNumber=|organizationalUnitName=|title=|description=|role=|x500UniqueIdentifier=))#", dn, -1, PREG_SPLIT_DELIM_CAPTURE);

        for (var i = 1; i < results.length; i += 2) {
            var prop = trim(results[i], ", =/");
            var value = results[i + 1];

            if (!this.setDNProp(prop, value, type)) {
                return false;
            }
        }

        return true;
    }

    getDN(format = FILE_X509_DN_ARRAY, dn = undefined) {
        if (!(undefined !== dn)) {
            dn = undefined !== this.currentCert.tbsCertList ? this.currentCert.tbsCertList.issuer : this.dn;
        }

        switch (+format) {
            case FILE_X509_DN_ARRAY:
                return dn;

            case FILE_X509_DN_ASN1:
                var asn1 = new File_ASN1();
                asn1.loadOIDs(this.oids);
                var filters = Array();
                filters.rdnSequence.value = {
                    type: FILE_ASN1_TYPE_UTF8_STRING
                };
                asn1.loadFilters(filters);
                return asn1.encodeDER(dn, this.Name);

            case FILE_X509_DN_OPENSSL:
                dn = this.getDN(FILE_X509_DN_STRING, dn);

                if (dn === false) {
                    return false;
                }

                var attrs = preg_split("#((?:^|, *|/)[a-z][a-z0-9]*=)#i", dn, -1, PREG_SPLIT_DELIM_CAPTURE);
                dn = Array();

                for (var i = 1; i < attrs.length; i += 2) {
                    var prop = trim(attrs[i], ", =/");
                    var value = attrs[i + 1];

                    if (!(undefined !== dn[prop])) {
                        dn[prop] = value;
                    } else {
                        dn[prop] = array_merge(Array.from(dn[prop]), [value]);
                    }
                }

                return dn;

            case FILE_X509_DN_CANON:
                asn1 = new File_ASN1();
                asn1.loadOIDs(this.oids);
                filters = Array();
                filters.value = {
                    type: FILE_ASN1_TYPE_UTF8_STRING
                };
                asn1.loadFilters(filters);
                var result = "";

                for (var rdn of Object.values(dn.rdnSequence)) {
                    for (var attr of Object.values(rdn)) {
                        if (Array.isArray(attr.value)) {
                            {
                                let _tmp_0 = attr.value;

                                for (var type in _tmp_0) {
                                    var v = _tmp_0[type];
                                    var type = array_search(type, asn1.ANYmap, true);

                                    if (type !== false && undefined !== asn1.stringTypeSize[type]) {
                                        var v = asn1.convert(v, type);

                                        if (v !== false) {
                                            v = v.replace(/\s+/g, " ");
                                            attr.value = v.trim().toLowerCase();
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    result += asn1.encodeDER(rdn, this.RelativeDistinguishedName);
                }

                return result;

            case FILE_X509_DN_HASH:
                dn = this.getDN(FILE_X509_DN_CANON, dn);

                if (!("function" === typeof Crypt_Hash)) {
                    require("Crypt/Hash.php");
                }

                var hash = new Crypt_Hash("sha1");
                hash = hash.hash(dn);
                extract(unpack("Vhash", hash));
                return bin2hex(pack("N", hash)).toLowerCase();
        }

        var start = true;
        var output = "";
        asn1 = new File_ASN1();

        for (var field of Object.values(dn.rdnSequence)) {
            prop = field[0].type;
            value = field[0].value;
            var delim = ", ";

            switch (prop) {
                case "id-at-countryName":
                    var desc = "C=";
                    break;

                case "id-at-stateOrProvinceName":
                    desc = "ST=";
                    break;

                case "id-at-organizationName":
                    desc = "O=";
                    break;

                case "id-at-organizationalUnitName":
                    desc = "OU=";
                    break;

                case "id-at-commonName":
                    desc = "CN=";
                    break;

                case "id-at-localityName":
                    desc = "L=";
                    break;

                case "id-at-surname":
                    desc = "SN=";
                    break;

                case "id-at-uniqueIdentifier":
                    delim = "/";
                    desc = "x500UniqueIdentifier=";
                    break;

                default:
                    delim = "/";
                    desc = prop.replace(/.+-([^-]+)$/g, "$1") + "=";
            }

            if (!start) {
                output += delim;
            }

            if (Array.isArray(value)) {
                for (var type in value) {
                    var v = value[type];
                    type = array_search(type, asn1.ANYmap, true);

                    if (type !== false && undefined !== asn1.stringTypeSize[type]) {
                        v = asn1.convert(v, type);

                        if (v !== false) {
                            value = v;
                            break;
                        }
                    }
                }

                if (Array.isArray(value)) //Always strip data type.
                    {
                        value = value.pop();
                    }
            }

            output += desc + value;
            start = false;
        }

        return output;
    }

    getIssuerDN(format = FILE_X509_DN_ARRAY) {
        switch (true) {
            case !(undefined !== this.currentCert) || !Array.isArray(this.currentCert):
                break;

            case undefined !== this.currentCert.tbsCertificate:
                return this.getDN(format, this.currentCert.tbsCertificate.issuer);

            case undefined !== this.currentCert.tbsCertList:
                return this.getDN(format, this.currentCert.tbsCertList.issuer);
        }

        return false;
    }

    getSubjectDN(format = FILE_X509_DN_ARRAY) {
        switch (true) {
            case !!this.dn:
                return this.getDN(format);

            case !(undefined !== this.currentCert) || !Array.isArray(this.currentCert):
                break;

            case undefined !== this.currentCert.tbsCertificate:
                return this.getDN(format, this.currentCert.tbsCertificate.subject);

            case undefined !== this.currentCert.certificationRequestInfo:
                return this.getDN(format, this.currentCert.certificationRequestInfo.subject);
        }

        return false;
    }

    getIssuerDNProp(propName, withType = false) {
        switch (true) {
            case !(undefined !== this.currentCert) || !Array.isArray(this.currentCert):
                break;

            case undefined !== this.currentCert.tbsCertificate:
                return this.getDNProp(propName, this.currentCert.tbsCertificate.issuer, withType);

            case undefined !== this.currentCert.tbsCertList:
                return this.getDNProp(propName, this.currentCert.tbsCertList.issuer, withType);
        }

        return false;
    }

    getSubjectDNProp(propName, withType = false) {
        switch (true) {
            case !!this.dn:
                return this.getDNProp(propName, undefined, withType);

            case !(undefined !== this.currentCert) || !Array.isArray(this.currentCert):
                break;

            case undefined !== this.currentCert.tbsCertificate:
                return this.getDNProp(propName, this.currentCert.tbsCertificate.subject, withType);

            case undefined !== this.currentCert.certificationRequestInfo:
                return this.getDNProp(propName, this.currentCert.certificationRequestInfo.subject, withType);
        }

        return false;
    }

    getChain() {
        var chain = [this.currentCert];

        if (!Array.isArray(this.currentCert) || !(undefined !== this.currentCert.tbsCertificate)) {
            return false;
        }

        if (!this.CAs) {
            return chain;
        }

        while (true) {
            var currentCert = chain[chain.length - 1];

            for (var i = 0; i < this.CAs.length; i++) {
                var ca = this.CAs[i];

                if (currentCert.tbsCertificate.issuer === ca.tbsCertificate.subject) {
                    var authorityKey = this.getExtension("id-ce-authorityKeyIdentifier", currentCert);
                    var subjectKeyID = this.getExtension("id-ce-subjectKeyIdentifier", ca);

                    switch (true) {
                        case !Array.isArray(authorityKey):
                        case Array.isArray(authorityKey) && undefined !== authorityKey.keyIdentifier && authorityKey.keyIdentifier === subjectKeyID:
                            if (currentCert === ca) {
                                break;
                            }

                            chain.push(ca);
                            break;
                    }
                }
            }

            if (i == this.CAs.length) {
                break;
            }
        }

        for (var key in chain) {
            var value = chain[key];
            chain[key] = new File_X509();
            chain[key].loadX509(value);
        }

        return chain;
    }

    setPublicKey(key) {
        this.publicKey = key;
    }

    setPrivateKey(key) {
        this.privateKey = key;
    }

    getPublicKey() {
        if (undefined !== this.publicKey) {
            return this.publicKey;
        }

        if (undefined !== this.currentCert && Array.isArray(this.currentCert)) {
            for (var path of ["tbsCertificate/subjectPublicKeyInfo", "certificationRequestInfo/subjectPKInfo"]) {
                var keyinfo = this._subArray(this.currentCert, path);

                if (!!keyinfo) {
                    break;
                }
            }
        }

        if (!keyinfo) {
            return false;
        }

        var key = keyinfo.subjectPublicKey;

        switch (keyinfo.algorithm.algorithm) {
            case "rsaEncryption":
                if (!("function" === typeof Crypt_RSA)) {
                    require("Crypt/RSA.php");
                }

                var publicKey = new Crypt_RSA();
                publicKey.loadKey(key);
                publicKey.setPublicKey();
                break;

            default:
                return false;
        }

        return publicKey;
    }

    loadCSR(csr) {
        if (Array.isArray(csr) && undefined !== csr.certificationRequestInfo) {
            delete this.currentCert;
            delete this.currentKeyIdentifier;
            delete this.signatureSubject;
            this.dn = csr.certificationRequestInfo.subject;

            if (!(undefined !== this.dn)) {
                return false;
            }

            this.currentCert = csr;
            return csr;
        }

        var asn1 = new File_ASN1();
        csr = this._extractBER(csr);
        var orig = csr;

        if (csr === false) {
            this.currentCert = false;
            return false;
        }

        asn1.loadOIDs(this.oids);
        var decoded = asn1.decodeBER(csr);

        if (!decoded) {
            this.currentCert = false;
            return false;
        }

        csr = asn1.asn1map(decoded[0], this.CertificationRequest);

        if (!(undefined !== csr) || csr === false) {
            this.currentCert = false;
            return false;
        }

        this.dn = csr.certificationRequestInfo.subject;

        this._mapInAttributes(csr, "certificationRequestInfo/attributes", asn1);

        this.signatureSubject = orig.substr(decoded[0].content[0].start, decoded[0].content[0].length);
        var algorithm = csr.certificationRequestInfo.subjectPKInfo.algorithm.algorithm;
        var key = csr.certificationRequestInfo.subjectPKInfo.subjectPublicKey;
        key = this._reformatKey(algorithm, key);

        switch (algorithm) {
            case "rsaEncryption":
                if (!("function" === typeof Crypt_RSA)) {
                    require("Crypt/RSA.php");
                }

                this.publicKey = new Crypt_RSA();
                this.publicKey.loadKey(key);
                this.publicKey.setPublicKey();
                break;

            default:
                this.publicKey = undefined;
        }

        this.currentKeyIdentifier = undefined;
        this.currentCert = csr;
        return csr;
    }

    saveCSR(csr, format = FILE_X509_FORMAT_PEM) {
        if (!Array.isArray(csr) || !(undefined !== csr.certificationRequestInfo)) {
            return false;
        }

        switch (true) {
            case !(algorithm = this._subArray(csr, "certificationRequestInfo/subjectPKInfo/algorithm/algorithm")):
            case "object" === typeof csr.certificationRequestInfo.subjectPKInfo.subjectPublicKey:
                break;

            default:
                switch (algorithm) {
                    case "rsaEncryption":
                        csr.certificationRequestInfo.subjectPKInfo.subjectPublicKey = base64_encode("\\0" + base64_decode(preg_replace("#-.+-|[\r\n]#", "", csr.certificationRequestInfo.subjectPKInfo.subjectPublicKey)));
                }

        }

        var asn1 = new File_ASN1();
        asn1.loadOIDs(this.oids);
        var filters = Array();
        filters.certificationRequestInfo.subject.rdnSequence.value = {
            type: FILE_ASN1_TYPE_UTF8_STRING
        };
        asn1.loadFilters(filters);

        this._mapOutAttributes(csr, "certificationRequestInfo/attributes", asn1);

        csr = asn1.encodeDER(csr, this.CertificationRequest);

        switch (format) {
            case FILE_X509_FORMAT_DER:
                return csr;

            default:
                return "-----BEGIN CERTIFICATE REQUEST-----\r\n" + chunk_split(base64_encode(csr), 64) + "-----END CERTIFICATE REQUEST-----";
        }
    }

    loadSPKAC(csr) {
        if (Array.isArray(csr) && undefined !== csr.publicKeyAndChallenge) {
            delete this.currentCert;
            delete this.currentKeyIdentifier;
            delete this.signatureSubject;
            this.currentCert = csr;
            return csr;
        }

        var asn1 = new File_ASN1();
        var temp = preg_replace("#(?:^[^=]+=)|[\r\n\\\\]#", "", csr);
        temp = preg_match("#^[a-zA-Z\\d/+]*={0,2}$#", temp) ? base64_decode(temp) : false;

        if (temp != false) {
            csr = temp;
        }

        var orig = csr;

        if (csr === false) {
            this.currentCert = false;
            return false;
        }

        asn1.loadOIDs(this.oids);
        var decoded = asn1.decodeBER(csr);

        if (!decoded) {
            this.currentCert = false;
            return false;
        }

        csr = asn1.asn1map(decoded[0], this.SignedPublicKeyAndChallenge);

        if (!(undefined !== csr) || csr === false) {
            this.currentCert = false;
            return false;
        }

        this.signatureSubject = orig.substr(decoded[0].content[0].start, decoded[0].content[0].length);
        var algorithm = csr.publicKeyAndChallenge.spki.algorithm.algorithm;
        var key = csr.publicKeyAndChallenge.spki.subjectPublicKey;
        key = this._reformatKey(algorithm, key);

        switch (algorithm) {
            case "rsaEncryption":
                if (!("function" === typeof Crypt_RSA)) {
                    require("Crypt/RSA.php");
                }

                this.publicKey = new Crypt_RSA();
                this.publicKey.loadKey(key);
                this.publicKey.setPublicKey();
                break;

            default:
                this.publicKey = undefined;
        }

        this.currentKeyIdentifier = undefined;
        this.currentCert = csr;
        return csr;
    }

    loadCRL(crl) {
        if (Array.isArray(crl) && undefined !== crl.tbsCertList) {
            this.currentCert = crl;
            delete this.signatureSubject;
            return crl;
        }

        var asn1 = new File_ASN1();
        crl = this._extractBER(crl);
        var orig = crl;

        if (crl === false) {
            this.currentCert = false;
            return false;
        }

        asn1.loadOIDs(this.oids);
        var decoded = asn1.decodeBER(crl);

        if (!decoded) {
            this.currentCert = false;
            return false;
        }

        crl = asn1.asn1map(decoded[0], this.CertificateList);

        if (!(undefined !== crl) || crl === false) {
            this.currentCert = false;
            return false;
        }

        this.signatureSubject = orig.substr(decoded[0].content[0].start, decoded[0].content[0].length);

        this._mapInExtensions(crl, "tbsCertList/crlExtensions", asn1);

        var rclist = this._subArray(crl, "tbsCertList/revokedCertificates");

        if (Array.isArray(rclist)) {
            for (var i in rclist) {
                var extension = rclist[i];

                this._mapInExtensions(rclist, `${i}/crlEntryExtensions`, asn1);
            }
        }

        this.currentKeyIdentifier = undefined;
        this.currentCert = crl;
        return crl;
    }

    saveCRL(crl, format = FILE_X509_FORMAT_PEM) {
        if (!Array.isArray(crl) || !(undefined !== crl.tbsCertList)) {
            return false;
        }

        var asn1 = new File_ASN1();
        asn1.loadOIDs(this.oids);
        var filters = Array();
        filters.tbsCertList.issuer.rdnSequence.value = filters.tbsCertList.signature.parameters = filters.signatureAlgorithm.parameters = {
            type: FILE_ASN1_TYPE_UTF8_STRING
        };

        if (!crl.tbsCertList.signature.parameters) {
            filters.tbsCertList.signature.parameters = {
                type: FILE_ASN1_TYPE_NULL
            };
        }

        if (!crl.signatureAlgorithm.parameters) {
            filters.signatureAlgorithm.parameters = {
                type: FILE_ASN1_TYPE_NULL
            };
        }

        asn1.loadFilters(filters);

        this._mapOutExtensions(crl, "tbsCertList/crlExtensions", asn1);

        var rclist = this._subArray(crl, "tbsCertList/revokedCertificates");

        if (Array.isArray(rclist)) {
            for (var i in rclist) {
                var extension = rclist[i];

                this._mapOutExtensions(rclist, `${i}/crlEntryExtensions`, asn1);
            }
        }

        crl = asn1.encodeDER(crl, this.CertificateList);

        switch (format) {
            case FILE_X509_FORMAT_DER:
                return crl;

            default:
                return "-----BEGIN X509 CRL-----\r\n" + chunk_split(base64_encode(crl), 64) + "-----END X509 CRL-----";
        }
    }

    sign(issuer, subject, signatureAlgorithm = "sha1WithRSAEncryption") {
        if (!("object" === typeof issuer.privateKey) || !issuer.dn) {
            return false;
        }

        if (undefined !== subject.publicKey && !(subjectPublicKey = subject._formatSubjectPublicKey())) {
            return false;
        }

        var currentCert = undefined !== this.currentCert ? this.currentCert : undefined;
        var signatureSubject = undefined !== this.signatureSubject ? this.signatureSubject : undefined;

        if (undefined !== subject.currentCert && Array.isArray(subject.currentCert) && undefined !== subject.currentCert.tbsCertificate) {
            this.currentCert = subject.currentCert;
            this.currentCert.tbsCertificate.signature.algorithm = this.currentCert.signatureAlgorithm.algorithm = signatureAlgorithm;

            if (!!this.startDate) {
                this.currentCert.tbsCertificate.validity.notBefore.generalTime = this.startDate;
                delete this.currentCert.tbsCertificate.validity.notBefore.utcTime;
            }

            if (!!this.endDate) {
                this.currentCert.tbsCertificate.validity.notAfter.generalTime = this.endDate;
                delete this.currentCert.tbsCertificate.validity.notAfter.utcTime;
            }

            if (!!this.serialNumber) {
                this.currentCert.tbsCertificate.serialNumber = this.serialNumber;
            }

            if (!!subject.dn) {
                this.currentCert.tbsCertificate.subject = subject.dn;
            }

            if (!!subject.publicKey) {
                this.currentCert.tbsCertificate.subjectPublicKeyInfo = subjectPublicKey;
            }

            this.removeExtension("id-ce-authorityKeyIdentifier");

            if (undefined !== subject.domains) {
                this.removeExtension("id-ce-subjectAltName");
            }
        } else if (undefined !== subject.currentCert && Array.isArray(subject.currentCert) && undefined !== subject.currentCert.tbsCertList) {
            return false;
        } else //Copy extensions from CSR.
            {
                if (!(undefined !== subject.publicKey)) {
                    return false;
                }

                var startDate = !!this.startDate ? this.startDate : date("D, d M y H:i:s O");
                var endDate = !!this.endDate ? this.endDate : date("D, d M y H:i:s O", strtotime("+1 year"));
                var serialNumber = !!this.serialNumber ? this.serialNumber : new Math_BigInteger();
                this.currentCert = {
                    tbsCertificate: {
                        version: "v3",
                        serialNumber: serialNumber,
                        signature: {
                            algorithm: signatureAlgorithm
                        },
                        issuer: false,
                        validity: {
                            notBefore: {
                                generalTime: startDate
                            },
                            notAfter: {
                                generalTime: endDate
                            }
                        },
                        subject: subject.dn,
                        subjectPublicKeyInfo: subjectPublicKey
                    },
                    signatureAlgorithm: {
                        algorithm: signatureAlgorithm
                    },
                    signature: false
                };
                var csrexts = subject.getAttribute("pkcs-9-at-extensionRequest", 0);

                if (!!csrexts) {
                    this.currentCert.tbsCertificate.extensions = csrexts;
                }
            }

        this.currentCert.tbsCertificate.issuer = issuer.dn;

        if (undefined !== issuer.currentKeyIdentifier) //$extensions = &$this->currentCert['tbsCertificate']['extensions'];
            //if (isset($issuer->serialNumber)) {
            //$extensions[count($extensions) - 1]['authorityCertSerialNumber'] = $issuer->serialNumber;
            //}
            //unset($extensions);
            {
                this.setExtension("id-ce-authorityKeyIdentifier", {
                    keyIdentifier: issuer.currentKeyIdentifier
                });
            }

        if (undefined !== subject.currentKeyIdentifier) {
            this.setExtension("id-ce-subjectKeyIdentifier", subject.currentKeyIdentifier);
        }

        if (undefined !== subject.domains && subject.domains.length > 1) {
            this.setExtension("id-ce-subjectAltName", subject.domains.map(["File_X509", "_dnsName"]));
        }

        if (this.caFlag) {
            var keyUsage = this.getExtension("id-ce-keyUsage");

            if (!keyUsage) {
                keyUsage = Array();
            }

            this.setExtension("id-ce-keyUsage", Object.values(array_unique(array_merge(keyUsage, ["cRLSign", "keyCertSign"]))));
            var basicConstraints = this.getExtension("id-ce-basicConstraints");

            if (!basicConstraints) {
                basicConstraints = Array();
            }

            this.setExtension("id-ce-basicConstraints", array_unique(array_merge({
                cA: true
            }, basicConstraints)), true);

            if (!(undefined !== subject.currentKeyIdentifier)) {
                this.setExtension("id-ce-subjectKeyIdentifier", base64_encode(this.computeKeyIdentifier(this.currentCert)), false, false);
            }
        }

        var tbsCertificate = this.currentCert.tbsCertificate;
        this.loadX509(this.saveX509(this.currentCert));

        var result = this._sign(issuer.privateKey, signatureAlgorithm);

        result.tbsCertificate = tbsCertificate;
        this.currentCert = currentCert;
        this.signatureSubject = signatureSubject;
        return result;
    }

    signCSR(signatureAlgorithm = "sha1WithRSAEncryption") //resync $this->signatureSubject
    //save $certificationRequestInfo in case there are any File_ASN1_Element objects in it
    {
        if (!("object" === typeof this.privateKey) || !this.dn) {
            return false;
        }

        var origPublicKey = this.publicKey;
        var class = this.privateKey.constructor.name;
        this.publicKey = new class();
        this.publicKey.loadKey(this.privateKey.getPublicKey());
        this.publicKey.setPublicKey();

        if (!(publicKey = this._formatSubjectPublicKey())) {
            return false;
        }

        this.publicKey = origPublicKey;
        var currentCert = undefined !== this.currentCert ? this.currentCert : undefined;
        var signatureSubject = undefined !== this.signatureSubject ? this.signatureSubject : undefined;

        if (undefined !== this.currentCert && Array.isArray(this.currentCert) && undefined !== this.currentCert.certificationRequestInfo) {
            this.currentCert.signatureAlgorithm.algorithm = signatureAlgorithm;

            if (!!this.dn) {
                this.currentCert.certificationRequestInfo.subject = this.dn;
            }

            this.currentCert.certificationRequestInfo.subjectPKInfo = publicKey;
        } else {
            this.currentCert = {
                certificationRequestInfo: {
                    version: "v1",
                    subject: this.dn,
                    subjectPKInfo: publicKey
                },
                signatureAlgorithm: {
                    algorithm: signatureAlgorithm
                },
                signature: false
            };
        }

        var certificationRequestInfo = this.currentCert.certificationRequestInfo;
        this.loadCSR(this.saveCSR(this.currentCert));

        var result = this._sign(this.privateKey, signatureAlgorithm);

        result.certificationRequestInfo = certificationRequestInfo;
        this.currentCert = currentCert;
        this.signatureSubject = signatureSubject;
        return result;
    }

    signCRL(issuer, crl, signatureAlgorithm = "sha1WithRSAEncryption") //Be sure version >= v2 if some extension found.
    //resync $this->signatureSubject
    //save $tbsCertList in case there are any File_ASN1_Element objects in it
    {
        if (!("object" === typeof issuer.privateKey) || !issuer.dn) {
            return false;
        }

        var currentCert = undefined !== this.currentCert ? this.currentCert : undefined;
        var signatureSubject = undefined !== this.signatureSubject ? this.signatureSubject : undefined;
        var thisUpdate = !!this.startDate ? this.startDate : date("D, d M y H:i:s O");

        if (undefined !== crl.currentCert && Array.isArray(crl.currentCert) && undefined !== crl.currentCert.tbsCertList) {
            this.currentCert = crl.currentCert;
            this.currentCert.tbsCertList.signature.algorithm = signatureAlgorithm;
            this.currentCert.signatureAlgorithm.algorithm = signatureAlgorithm;
        } else {
            this.currentCert = {
                tbsCertList: {
                    version: "v2",
                    signature: {
                        algorithm: signatureAlgorithm
                    },
                    issuer: false,
                    thisUpdate: {
                        generalTime: thisUpdate
                    }
                },
                signatureAlgorithm: {
                    algorithm: signatureAlgorithm
                },
                signature: false
            };
        }

        var tbsCertList = this.currentCert.tbsCertList;
        tbsCertList.issuer = issuer.dn;
        tbsCertList.thisUpdate = {
            generalTime: thisUpdate
        };

        if (!!this.endDate) //$this->setEndDate()
            {
                tbsCertList.nextUpdate = {
                    generalTime: this.endDate
                };
            } else {
            delete tbsCertList.nextUpdate;
        }

        if (!!this.serialNumber) {
            var crlNumber = this.serialNumber;
        } else {
            crlNumber = this.getExtension("id-ce-cRLNumber");
            crlNumber = crlNumber !== false ? crlNumber.add(new Math_BigInteger(1)) : undefined;
        }

        this.removeExtension("id-ce-authorityKeyIdentifier");
        this.removeExtension("id-ce-issuerAltName");
        var version = undefined !== tbsCertList.version ? tbsCertList.version : 0;

        if (!version) {
            if (!!tbsCertList.crlExtensions) //v2.
                {
                    version = 1;
                } else if (!!tbsCertList.revokedCertificates) {
                for (var cert of Object.values(tbsCertList.revokedCertificates)) {
                    if (!!cert.crlEntryExtensions) //v2.
                        {
                            version = 1;
                        }
                }
            }

            if (version) {
                tbsCertList.version = version;
            }
        }

        if (!!tbsCertList.version) //At least v2.
            {
                if (!!crlNumber) {
                    this.setExtension("id-ce-cRLNumber", crlNumber);
                }

                if (undefined !== issuer.currentKeyIdentifier) //$extensions = &$tbsCertList['crlExtensions'];
                    //if (isset($issuer->serialNumber)) {
                    //$extensions[count($extensions) - 1]['authorityCertSerialNumber'] = $issuer->serialNumber;
                    //}
                    //unset($extensions);
                    {
                        this.setExtension("id-ce-authorityKeyIdentifier", {
                            keyIdentifier: issuer.currentKeyIdentifier
                        });
                    }

                var issuerAltName = this.getExtension("id-ce-subjectAltName", issuer.currentCert);

                if (issuerAltName !== false) {
                    this.setExtension("id-ce-issuerAltName", issuerAltName);
                }
            }

        if (!tbsCertList.revokedCertificates) {
            delete tbsCertList.revokedCertificates;
        }

        delete tbsCertList;
        tbsCertList = this.currentCert.tbsCertList;
        this.loadCRL(this.saveCRL(this.currentCert));

        var result = this._sign(issuer.privateKey, signatureAlgorithm);

        result.tbsCertList = tbsCertList;
        this.currentCert = currentCert;
        this.signatureSubject = signatureSubject;
        return result;
    }

    _sign(key, signatureAlgorithm) {
        switch (key.constructor.name.toLowerCase()) {
            case "crypt_rsa":
                switch (signatureAlgorithm) {
                    case "md2WithRSAEncryption":
                    case "md5WithRSAEncryption":
                    case "sha1WithRSAEncryption":
                    case "sha224WithRSAEncryption":
                    case "sha256WithRSAEncryption":
                    case "sha384WithRSAEncryption":
                    case "sha512WithRSAEncryption":
                        key.setHash(signatureAlgorithm.replace(/WithRSAEncryption$/g, ""));
                        key.setSignatureMode(CRYPT_RSA_SIGNATURE_PKCS1);
                        this.currentCert.signature = base64_encode("\\0" + key.sign(this.signatureSubject));
                        return this.currentCert;
                }

            default:
                return false;
        }
    }

    setStartDate(date) {
        this.startDate = date("D, d M y H:i:s O", strtotime(date));
    }

    setEndDate(date) //To indicate that a certificate has no well-defined expiration date,
    //          the notAfter SHOULD be assigned the GeneralizedTime value of
    //          99991231235959Z.
    //          -- http://tools.ietf.org/html/rfc5280#section-4.1.2.5
    {
        if (date.toLowerCase() == "lifetime") {
            var temp = "99991231235959Z";
            var asn1 = new File_ASN1();
            temp = String.fromCharCode(FILE_ASN1_TYPE_GENERALIZED_TIME) + asn1._encodeLength(temp.length) + temp;
            this.endDate = new File_ASN1_Element(temp);
        } else {
            this.endDate = date("D, d M y H:i:s O", strtotime(date));
        }
    }

    setSerialNumber(serial, base = -256) {
        this.serialNumber = new Math_BigInteger(serial, base);
    }

    makeCA() {
        this.caFlag = true;
    }

    _subArray(root, path, create = false) {
        var false = false;

        if (!Array.isArray(root)) {
            return false;
        }

        for (var i of Object.values(path.split("/"))) {
            if (!Array.isArray(root)) {
                return false;
            }

            if (!(undefined !== root[i])) {
                if (!create) {
                    return false;
                }

                root[i] = Array();
            }

            root = root[i];
        }

        return root;
    }

    _extensions(root, path = undefined, create = false) {
        if (!(undefined !== root)) {
            root = this.currentCert;
        }

        switch (true) {
            case !!path:
            case !Array.isArray(root):
                break;

            case undefined !== root.tbsCertificate:
                path = "tbsCertificate/extensions";
                break;

            case undefined !== root.tbsCertList:
                path = "tbsCertList/crlExtensions";
                break;

            case undefined !== root.certificationRequestInfo:
                var pth = "certificationRequestInfo/attributes";

                var attributes = this._subArray(root, pth, create);

                if (Array.isArray(attributes)) {
                    for (var key in attributes) {
                        var value = attributes[key];

                        if (value.type == "pkcs-9-at-extensionRequest") {
                            path = `${pth}/${key}/value/0`;
                            break;
                        }
                    }

                    if (create) {
                        var key = attributes.length;
                        attributes.push({
                            type: "pkcs-9-at-extensionRequest",
                            value: Array()
                        });
                        path = `${pth}/${key}/value/0`;
                    }
                }

                break;
        }

        var extensions = this._subArray(root, path, create);

        if (!Array.isArray(extensions)) {
            var false = false;
            return false;
        }

        return extensions;
    }

    _removeExtension(id, path = undefined) {
        var extensions = this._extensions(this.currentCert, path);

        if (!Array.isArray(extensions)) {
            return false;
        }

        var result = false;

        for (var key in extensions) {
            var value = extensions[key];

            if (value.extnId == id) {
                delete extensions[key];
                result = true;
            }
        }

        extensions = Object.values(extensions);
        return result;
    }

    _getExtension(id, cert = undefined, path = undefined) {
        var extensions = this._extensions(cert, path);

        if (!Array.isArray(extensions)) {
            return false;
        }

        for (var key in extensions) {
            var value = extensions[key];

            if (value.extnId == id) {
                return value.extnValue;
            }
        }

        return false;
    }

    _getExtensions(cert = undefined, path = undefined) {
        var exts = this._extensions(cert, path);

        var extensions = Array();

        if (Array.isArray(exts)) {
            for (var extension of Object.values(exts)) {
                extensions.push(extension.extnId);
            }
        }

        return extensions;
    }

    _setExtension(id, value, critical = false, replace = true, path = undefined) {
        var extensions = this._extensions(this.currentCert, path, true);

        if (!Array.isArray(extensions)) {
            return false;
        }

        var newext = {
            extnId: id,
            critical: critical,
            extnValue: value
        };

        for (var key in extensions) {
            var value = extensions[key];

            if (value.extnId == id) {
                if (!replace) {
                    return false;
                }

                extensions[key] = newext;
                return true;
            }
        }

        extensions.push(newext);
        return true;
    }

    removeExtension(id) {
        return this._removeExtension(id);
    }

    getExtension(id, cert = undefined) {
        return this._getExtension(id, cert);
    }

    getExtensions(cert = undefined) {
        return this._getExtensions(cert);
    }

    setExtension(id, value, critical = false, replace = true) {
        return this._setExtension(id, value, critical, replace);
    }

    removeAttribute(id, disposition = FILE_X509_ATTR_ALL) {
        var attributes = this._subArray(this.currentCert, "certificationRequestInfo/attributes");

        if (!Array.isArray(attributes)) {
            return false;
        }

        var result = false;

        for (var key in attributes) {
            var attribute = attributes[key];

            if (attribute.type == id) {
                var n = attribute.value.length;

                switch (true) {
                    case disposition == FILE_X509_ATTR_APPEND:
                    case disposition == FILE_X509_ATTR_REPLACE:
                        return false;

                    case disposition >= n:
                        disposition -= n;
                        break;

                    case disposition == FILE_X509_ATTR_ALL:
                    case n == 1:
                        delete attributes[key];
                        result = true;
                        break;

                    default:
                        delete attributes[key].value[disposition];
                        attributes[key].value = Object.values(attributes[key].value);
                        result = true;
                        break;
                }

                if (result && disposition != FILE_X509_ATTR_ALL) {
                    break;
                }
            }
        }

        attributes = Object.values(attributes);
        return result;
    }

    getAttribute(id, disposition = FILE_X509_ATTR_ALL, csr = undefined) {
        if (!csr) {
            csr = this.currentCert;
        }

        var attributes = this._subArray(csr, "certificationRequestInfo/attributes");

        if (!Array.isArray(attributes)) {
            return false;
        }

        for (var key in attributes) {
            var attribute = attributes[key];

            if (attribute.type == id) {
                var n = attribute.value.length;

                switch (true) {
                    case disposition == FILE_X509_ATTR_APPEND:
                    case disposition == FILE_X509_ATTR_REPLACE:
                        return false;

                    case disposition == FILE_X509_ATTR_ALL:
                        return attribute.value;

                    case disposition >= n:
                        disposition -= n;
                        break;

                    default:
                        return attribute.value[disposition];
                }
            }
        }

        return false;
    }

    getAttributes(csr = undefined) {
        if (!csr) {
            csr = this.currentCert;
        }

        var attributes = this._subArray(csr, "certificationRequestInfo/attributes");

        var attrs = Array();

        if (Array.isArray(attributes)) {
            for (var attribute of Object.values(attributes)) {
                attrs.push(attribute.type);
            }
        }

        return attrs;
    }

    setAttribute(id, value, disposition = FILE_X509_ATTR_ALL) {
        var attributes = this._subArray(this.currentCert, "certificationRequestInfo/attributes", true);

        if (!Array.isArray(attributes)) {
            return false;
        }

        switch (disposition) {
            case FILE_X509_ATTR_REPLACE:
                disposition = FILE_X509_ATTR_APPEND;

            case FILE_X509_ATTR_ALL:
                this.removeAttribute(id);
                break;
        }

        for (var key in attributes) {
            var attribute = attributes[key];

            if (attribute.type == id) {
                var n = attribute.value.length;

                switch (true) {
                    case disposition == FILE_X509_ATTR_APPEND:
                        var last = key;
                        break;

                    case disposition >= n:
                        disposition -= n;
                        break;

                    default:
                        attributes[key].value[disposition] = value;
                        return true;
                }
            }
        }

        switch (true) {
            case disposition >= 0:
                return false;

            case undefined !== last:
                attributes[last].value.push(value);
                break;

            default:
                attributes.push({
                    type: id,
                    value: disposition == FILE_X509_ATTR_ALL ? value : [value]
                });
                break;
        }

        return true;
    }

    setKeyIdentifier(value) {
        if (!value) {
            delete this.currentKeyIdentifier;
        } else {
            this.currentKeyIdentifier = base64_encode(value);
        }
    }

    computeKeyIdentifier(key = undefined, method = 1) {
        if (is_null(key)) {
            key = this;
        }

        switch (true) {
            case "string" === typeof key:
                break;

            case Array.isArray(key) && undefined !== key.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey:
                return this.computeKeyIdentifier(key.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey, method);

            case Array.isArray(key) && undefined !== key.certificationRequestInfo.subjectPKInfo.subjectPublicKey:
                return this.computeKeyIdentifier(key.certificationRequestInfo.subjectPKInfo.subjectPublicKey, method);

            case !("object" === typeof key):
                return false;

            case key.constructor.name.toLowerCase() == "file_asn1_element":
                var asn1 = new File_ASN1();
                var decoded = asn1.decodeBER(key.element);

                if (!decoded) {
                    return false;
                }

                var raw = asn1.asn1map(decoded[0], {
                    type: FILE_ASN1_TYPE_BIT_STRING
                });

                if (!raw) {
                    return false;
                }

                raw = base64_decode(raw);

                if (!("function" === typeof Crypt_RSA)) {
                    require("Crypt/RSA.php");
                }

                key = new Crypt_RSA();

                if (!key.loadKey(raw)) //Not an unencrypted RSA key.
                    {
                        return false;
                    }

                if (key.getPrivateKey() !== false) //If private.
                    {
                        return this.computeKeyIdentifier(key, method);
                    }

                key = raw;
                break;

            case key.constructor.name.toLowerCase() == "file_x509":
                if (undefined !== key.publicKey) {
                    return this.computeKeyIdentifier(key.publicKey, method);
                }

                if (undefined !== key.privateKey) {
                    return this.computeKeyIdentifier(key.privateKey, method);
                }

                if (undefined !== key.currentCert.tbsCertificate || undefined !== key.currentCert.certificationRequestInfo) {
                    return this.computeKeyIdentifier(key.currentCert, method);
                }

                return false;

            default:
                key = key.getPublicKey(CRYPT_RSA_PUBLIC_FORMAT_PKCS1_RAW);
                break;
        }

        if (preg_match("#^-----BEGIN #", key)) {
            key = base64_decode(preg_replace("#-.+-|[\r\n]#", "", key));
        }

        if (!("function" === typeof Crypt_Hash)) {
            require("Crypt/Hash.php");
        }

        var hash = new Crypt_Hash("sha1");
        hash = hash.hash(key);

        if (method == 2) {
            hash = hash.substr(-8);
            hash[0] = String.fromCharCode(hash.charCodeAt(0) & 15 | 64);
        }

        return hash;
    }

    _formatSubjectPublicKey() {
        if (!(undefined !== this.publicKey) || !("object" === typeof this.publicKey)) {
            return false;
        }

        switch (this.publicKey.constructor.name.toLowerCase()) {
            case "crypt_rsa":
                return {
                    algorithm: {
                        algorithm: "rsaEncryption"
                    },
                    subjectPublicKey: this.publicKey.getPublicKey(CRYPT_RSA_PUBLIC_FORMAT_PKCS1_RAW)
                };

            default:
                return false;
        }
    }

    setDomain() {
        this.domains = arguments;
        this.removeDNProp("id-at-commonName");
        this.setDNProp("id-at-commonName", this.domains[0]);
    }

    _dnsName(domain) {
        return {
            dNSName: domain
        };
    }

    _revokedCertificate(rclist, serial, create = false) {
        serial = new Math_BigInteger(serial);

        for (var i in rclist) {
            var rc = rclist[i];

            if (!serial.compare(rc.userCertificate)) {
                return i;
            }
        }

        if (!create) {
            return false;
        }

        var i = rclist.length;
        rclist.push({
            userCertificate: serial,
            revocationDate: {
                generalTime: date("D, d M y H:i:s O")
            }
        });
        return i;
    }

    revoke(serial, date = undefined) {
        if (undefined !== this.currentCert.tbsCertList) {
            var rclist;

            if (Array.isArray(rclist = this._subArray(this.currentCert, "tbsCertList/revokedCertificates", true))) {
                if (this._revokedCertificate(rclist, serial) === false) //If not yet revoked
                    {
                        var i;

                        if ((i = this._revokedCertificate(rclist, serial, true)) !== false) {
                            if (!!date) {
                                rclist[i].revocationDate = {
                                    generalTime: date
                                };
                            }

                            return true;
                        }
                    }
            }
        }

        return false;
    }

    unrevoke(serial) {
        var rclist;

        if (Array.isArray(rclist = this._subArray(this.currentCert, "tbsCertList/revokedCertificates"))) {
            var i;

            if ((i = this._revokedCertificate(rclist, serial)) !== false) {
                delete rclist[i];
                rclist = Object.values(rclist);
                return true;
            }
        }

        return false;
    }

    getRevoked(serial) {
        var rclist;

        if (Array.isArray(rclist = this._subArray(this.currentCert, "tbsCertList/revokedCertificates"))) {
            var i;

            if ((i = this._revokedCertificate(rclist, serial)) !== false) {
                return rclist[i];
            }
        }

        return false;
    }

    listRevoked(crl = undefined) {
        if (!(undefined !== crl)) {
            crl = this.currentCert;
        }

        if (!(undefined !== crl.tbsCertList)) {
            return false;
        }

        var result = Array();

        if (Array.isArray(rclist = this._subArray(crl, "tbsCertList/revokedCertificates"))) {
            for (var rc of Object.values(rclist)) {
                result.push(rc.userCertificate.toString());
            }
        }

        return result;
    }

    removeRevokedCertificateExtension(serial, id) {
        var rclist;

        if (Array.isArray(rclist = this._subArray(this.currentCert, "tbsCertList/revokedCertificates"))) {
            var i;

            if ((i = this._revokedCertificate(rclist, serial)) !== false) {
                return this._removeExtension(id, `tbsCertList/revokedCertificates/${i}/crlEntryExtensions`);
            }
        }

        return false;
    }

    getRevokedCertificateExtension(serial, id, crl = undefined) {
        if (!(undefined !== crl)) {
            crl = this.currentCert;
        }

        if (Array.isArray(rclist = this._subArray(crl, "tbsCertList/revokedCertificates"))) {
            var i;

            if ((i = this._revokedCertificate(rclist, serial)) !== false) {
                return this._getExtension(id, crl, `tbsCertList/revokedCertificates/${i}/crlEntryExtensions`);
            }
        }

        return false;
    }

    getRevokedCertificateExtensions(serial, crl = undefined) {
        if (!(undefined !== crl)) {
            crl = this.currentCert;
        }

        if (Array.isArray(rclist = this._subArray(crl, "tbsCertList/revokedCertificates"))) {
            var i;

            if ((i = this._revokedCertificate(rclist, serial)) !== false) {
                return this._getExtensions(crl, `tbsCertList/revokedCertificates/${i}/crlEntryExtensions`);
            }
        }

        return false;
    }

    setRevokedCertificateExtension(serial, id, value, critical = false, replace = true) {
        if (undefined !== this.currentCert.tbsCertList) {
            var rclist;

            if (Array.isArray(rclist = this._subArray(this.currentCert, "tbsCertList/revokedCertificates", true))) {
                var i;

                if ((i = this._revokedCertificate(rclist, serial, true)) !== false) {
                    return this._setExtension(id, value, critical, replace, `tbsCertList/revokedCertificates/${i}/crlEntryExtensions`);
                }
            }
        }

        return false;
    }

    _extractBER(str) //X.509 certs are assumed to be base64 encoded but sometimes they'll have additional things in them above and beyond the ceritificate. ie.
    //            some may have the following preceding the -----BEGIN CERTIFICATE----- line:
    //            Bag Attributes
    //                localKeyID: 01 00 00 00
    //            subject=/O=organization/OU=org unit/CN=common name
    //            issuer=/O=organization/CN=common name
    //remove the -----BEGIN CERTIFICATE----- and -----END CERTIFICATE----- stuff
    //remove new lines
    {
        var temp = preg_replace("#.*?^-+[^-]+-+#ms", "", str, 1);
        temp = temp.replace(/-+[^-]+-+/g, "");
        temp = str_replace(["\r", "\n", " "], "", temp);
        temp = preg_match("#^[a-zA-Z\\d/+]*={0,2}$#", temp) ? base64_decode(temp) : false;
        return temp != false ? temp : str;
    }

};
