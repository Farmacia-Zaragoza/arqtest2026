//vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4:
//
//Pure-PHP ANSI Decoder
//
//PHP versions 4 and 5
//
//If you call read() in Net_SSH2 you may get {@link http://en.wikipedia.org/wiki/ANSI_escape_code ANSI escape codes} back.
//They'd look like chr(0x1B) . '[00m' or whatever (0x1B = ESC).  They tell a
//{@link http://en.wikipedia.org/wiki/Terminal_emulator terminal emulator} how to format the characters, what
//color to display them in, etc. File_ANSI is a {@link http://en.wikipedia.org/wiki/VT100 VT100} terminal emulator.
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
//@package    File_ANSI
//@author     Jim Wigginton <terrafrost@php.net>
//@copyright  MMXII Jim Wigginton
//@license    http://www.opensource.org/licenses/mit-license.html  MIT License
//@link       http://phpseclib.sourceforge.net
//
//
//
//Pure-PHP ANSI Decoder
//
//@author  Jim Wigginton <terrafrost@php.net>
//@version 0.3.0
//@access  public
//@package File_ANSI
//
//

//
//Max Width
//
//@var Integer
//@access private
//
//
//
//Max Height
//
//@var Integer
//@access private
//
//
//
//Max History
//
//@var Integer
//@access private
//
//
//
//History
//
//@var Array
//@access private
//
//
//
//History Attributes
//
//@var Array
//@access private
//
//
//
//Current Column
//
//@var Integer
//@access private
//
//
//
//Current Row
//
//@var Integer
//@access private
//
//
//
//Old Column
//
//@var Integer
//@access private
//
//
//
//Old Row
//
//@var Integer
//@access private
//
//
//
//An empty attribute row
//
//@var Array
//@access private
//
//
//
//The current screen text
//
//@var Array
//@access private
//
//
//
//The current screen attributes
//
//@var Array
//@access private
//
//
//
//The current foreground color
//
//@var String
//@access private
//
//
//
//The current background color
//
//@var String
//@access private
//
//
//
//Bold flag
//
//@var Boolean
//@access private
//
//
//
//Underline flag
//
//@var Boolean
//@access private
//
//
//
//Blink flag
//
//@var Boolean
//@access private
//
//
//
//Reverse flag
//
//@var Boolean
//@access private
//
//
//
//Color flag
//
//@var Boolean
//@access private
//
//
//
//Current ANSI code
//
//@var String
//@access private
//
//
//
//Default Constructor.
//
//@return File_ANSI
//@access public
//
//
//
//Set terminal width and height
//
//Resets the screen as well
//
//@param Integer $x
//@param Integer $y
//@access public
//
//
//
//Set the number of lines that should be logged past the terminal height
//
//@param Integer $x
//@param Integer $y
//@access public
//
//
//
//Load a string
//
//@param String $source
//@access public
//
//
//
//Appdend a string
//
//@param String $source
//@access public
//
//
//
//Add a new line
//
//Also update the $this->screen and $this->history buffers
//
//@access private
//
//
//
//Returns the current screen without preformating
//
//@access private
//@return String
//
//
//
//Returns the current screen
//
//@access public
//@return String
//
//
//
//Returns the current screen and the x previous lines
//
//@access public
//@return String
//
//
class File_ANSI {
    File_ANSI() {
        this.setHistory(200);
        this.setDimensions(80, 24);
    }

    setDimensions(x, y) {
        this.max_x = x - 1;
        this.max_y = y - 1;
        this.x = this.y = 0;
        this.history = this.history_attrs = Array();
        this.attr_row = array_fill(0, this.max_x + 1, "");
        this.screen = array_fill(0, this.max_y + 1, "");
        this.attrs = array_fill(0, this.max_y + 1, this.attr_row);
        this.foreground = "white";
        this.background = "black";
        this.bold = false;
        this.underline = false;
        this.blink = false;
        this.reverse = false;
        this.color = false;
        this.ansi = "";
    }

    setHistory(history) {
        this.max_history = history;
    }

    loadString(source) {
        this.setDimensions(this.max_x + 1, this.max_y + 1);
        this.appendString(source);
    }

    appendString(source) {
        for (var i = 0; i < source.length; i++) {
            if (this.ansi.length) //http://en.wikipedia.org/wiki/ANSI_escape_code#Sequence_elements
                //single character CSI's not currently supported
                {
                    this.ansi += source[i];
                    var chr = source.charCodeAt(i);

                    switch (true) {
                        case this.ansi == "\\x1B=":
                            this.ansi = "";
                            continue;

                        case this.ansi.length == 2 && chr >= 64 && chr <= 95 && chr != "[".charCodeAt(0):
                        case this.ansi.length > 2 && chr >= 64 && chr <= 126:
                            break;

                        default:
                            continue;
                    }

                    switch (this.ansi) {
                        case "\\x1B[H":
                            this.old_x = this.x;
                            this.old_y = this.y;
                            this.x = this.y = 0;
                            break;

                        case "\\x1B[J":
                            this.history = array_merge(this.history, this.screen.splice(this.y + 1).slice(0, this.old_y));
                            this.screen = array_merge(this.screen, array_fill(this.y, this.max_y, ""));
                            this.history_attrs = array_merge(this.history_attrs, this.attrs.splice(this.y + 1).slice(0, this.old_y));
                            this.attrs = array_merge(this.attrs, array_fill(this.y, this.max_y, this.attr_row));

                            if (this.history.length == this.max_history) {
                                this.history.shift();
                                this.history_attrs.shift();
                            }

                        case "\\x1B[K":
                            this.screen[this.y] = this.screen[this.y].substr(0, this.x);
                            this.attrs[this.y].splice(this.x + 1);
                            break;

                        case "\\x1B[2K":
                            this.screen[this.y] = str_repeat(" ", this.x);
                            this.attrs[this.y] = this.attr_row;
                            break;

                        case "\\x1B[?1h":
                        case "\\x1B[?25h":
                            break;

                        case "\\x1BE":
                            this._newLine();

                            this.x = 0;
                            break;

                        default:
                            switch (true) {
                                case preg_match("#\\x1B\\[(\\d+);(\\d+)H#", this.ansi, match):
                                    this.old_x = this.x;
                                    this.old_y = this.y;
                                    this.x = match[2] - 1;
                                    this.y = match[1] - 1;
                                    break;

                                case preg_match("#\\x1B\\[(\\d+)C#", this.ansi, match):
                                    this.old_x = this.x;
                                    var x = match[1] - 1;
                                    break;

                                case preg_match("#\\x1B\\[(\\d+);(\\d+)r#", this.ansi, match):
                                    break;

                                case preg_match("#\\x1B\\[(\\d*(?:;\\d*)*)m#", this.ansi, match):
                                    var mods = match[1].split(";");

                                    for (var mod of Object.values(mods)) {
                                        switch (mod) {
                                            case 0:
                                                this.attrs[this.y][this.x] = "";
                                                if (this.bold) this.attrs[this.y][this.x] += "</b>";
                                                if (this.underline) this.attrs[this.y][this.x] += "</underline>";
                                                if (this.blink) this.attrs[this.y][this.x] += "</blink>";
                                                if (this.color) this.attrs[this.y][this.x] += "</span>";

                                                if (this.reverse) {
                                                    var temp = this.background;
                                                    this.background = this.foreground;
                                                    this.foreground = temp;
                                                }

                                                this.bold = this.underline = this.blink = this.color = this.reverse = false;
                                                break;

                                            case 1:
                                                if (!this.bold) {
                                                    this.attrs[this.y][this.x] = "<b>";
                                                    this.bold = true;
                                                }

                                                break;

                                            case 4:
                                                if (!this.underline) {
                                                    this.attrs[this.y][this.x] = "<u>";
                                                    this.underline = true;
                                                }

                                                break;

                                            case 5:
                                                if (!this.blink) {
                                                    this.attrs[this.y][this.x] = "<blink>";
                                                    this.blink = true;
                                                }

                                                break;

                                            case 7:
                                                this.reverse = !this.reverse;
                                                temp = this.background;
                                                this.background = this.foreground;
                                                this.foreground = temp;
                                                this.attrs[this.y][this.x] = "<span style=\"color: " + this.foreground + "; background: " + this.background + "\">";

                                                if (this.color) {
                                                    this.attrs[this.y][this.x] = "</span>" + this.attrs[this.y][this.x];
                                                }

                                                this.color = true;
                                                break;

                                            default:
                                                var front = this[this.reverse ? "background" : "foreground"];
                                                var back = this[this.reverse ? "foreground" : "background"];

                                                switch (mod) {
                                                    case 30:
                                                        front = "black";
                                                        break;

                                                    case 31:
                                                        front = "red";
                                                        break;

                                                    case 32:
                                                        front = "green";
                                                        break;

                                                    case 33:
                                                        front = "yellow";
                                                        break;

                                                    case 34:
                                                        front = "blue";
                                                        break;

                                                    case 35:
                                                        front = "magenta";
                                                        break;

                                                    case 36:
                                                        front = "cyan";
                                                        break;

                                                    case 37:
                                                        front = "white";
                                                        break;

                                                    case 40:
                                                        back = "black";
                                                        break;

                                                    case 41:
                                                        back = "red";
                                                        break;

                                                    case 42:
                                                        back = "green";
                                                        break;

                                                    case 43:
                                                        back = "yellow";
                                                        break;

                                                    case 44:
                                                        back = "blue";
                                                        break;

                                                    case 45:
                                                        back = "magenta";
                                                        break;

                                                    case 46:
                                                        back = "cyan";
                                                        break;

                                                    case 47:
                                                        back = "white";
                                                        break;

                                                    default:
                                                        user_error("Unsupported attribute: " + mod);
                                                        this.ansi = "";
                                                        break;
                                                }

                                                delete temp;
                                                this.attrs[this.y][this.x] = "<span style=\"color: " + this.foreground + "; background: " + this.background + "\">";

                                                if (this.color) {
                                                    this.attrs[this.y][this.x] = "</span>" + this.attrs[this.y][this.x];
                                                }

                                                this.color = true;
                                        }
                                    }

                                    break;

                                default:
                                    user_error(`${this.ansi} unsupported\r\n`);
                            }

                    }

                    this.ansi = "";
                    continue;
                }

            switch (source[i]) {
                case "\r":
                    this.x = 0;
                    break;

                case "\n":
                    this._newLine();

                    break;

                case "\\x0F":
                    break;

                case "\\x1B":
                    this.ansi += "\\x1B";
                    break;

                default:
                    this.screen[this.y] = substr_replace(this.screen[this.y], source[i], this.x, 1);

                    if (this.x > this.max_x) {
                        this.x = 0;
                        this.y++;
                    } else {
                        this.x++;
                    }

            }
        }
    }

    _newLine() //if ($this->y < $this->max_y) {
    //$this->y++;
    //}
    {
        while (this.y >= this.max_y) {
            this.history = array_merge(this.history, [this.screen.shift()]);
            this.screen.push("");
            this.history_attrs = array_merge(this.history_attrs, [this.attrs.shift()]);
            this.attrs.push(this.attr_row);

            if (this.history.length >= this.max_history) {
                this.history.shift();
                this.history_attrs.shift();
            }

            this.y--;
        }

        this.y++;
    }

    _getScreen() {
        var output = "";

        for (var i = 0; i <= this.max_y; i++) {
            for (var j = 0; j <= this.max_x + 1; j++) {
                if (undefined !== this.attrs[i][j]) {
                    output += this.attrs[i][j];
                }

                if (undefined !== this.screen[i][j]) {
                    output += htmlspecialchars(this.screen[i][j]);
                }
            }

            output += "\r\n";
        }

        return rtrim(output);
    }

    getScreen() {
        return "<pre style=\"color: white; background: black\" width=\"" + (this.max_x + 1) + "\">" + this._getScreen() + "</pre>";
    }

    getHistory() {
        var scrollback = "";

        for (var i = 0; i < this.history.length; i++) {
            for (var j = 0; j <= this.max_x + 1; j++) {
                if (undefined !== this.history_attrs[i][j]) {
                    scrollback += this.history_attrs[i][j];
                }

                if (undefined !== this.history[i][j]) {
                    scrollback += htmlspecialchars(this.history[i][j]);
                }
            }

            scrollback += "\r\n";
        }

        scrollback += this._getScreen();
        return "<pre style=\"color: white; background: black\" width=\"" + (this.max_x + 1) + "\">" + scrollback + "</pre>";
    }

};
