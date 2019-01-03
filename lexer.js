class Lexer {
  constructor() {
      this.pos = 0;
      this.buf = null;
      this.buflen = 0;
      this.listOfTokens = [];

      // Operator table, mapping operator -> token name
      this.optable = {
          '+':  'PLUS',
          '-':  'MINUS',
          '*':  'MULTIPLY',
          // '.':  'PERIOD',
          // '\\': 'BACKSLASH',
          // ':':  'COLON',
          // '%':  'PERCENT',
          // '|':  'PIPE',
          // '!':  'EXCLAMATION',
          // '?':  'QUESTION',
          // '#':  'POUND',
          // '&':  'AMPERSAND',
          // ';':  'SEMI',
          ',':  'COMMA',
          '(':  'L_PAREN',
          ')':  'R_PAREN',
          // '<':  'L_ANG',
          // '>':  'R_ANG',
          // '{':  'L_BRACE',
          // '}':  'R_BRACE',
          // '[':  'L_BRACKET',
          // ']':  'R_BRACKET',
          '=':  'EQUALS'  
      };

      this.keywords = new Map();
      this.keywords.set('if' , 'keyword');
      this.keywords.set('else' , 'keyword');
      this.keywords.set('function' , 'keyword');
      this.keywords.set('while' , 'keyword');
      this.keywords.set('break' , 'keyword');
      this.keywords.set('true' , 'keyword');
      this.keywords.set('false' , 'keyword');
      this.keywords.set('then' , 'keyword');

      /** Terminals*/
      this.terminals = ['دایره','مستطیل' ,'بیضی' , 'خط' , 'و' , 'به' ,'از', 'سایه' , 'ای', 'شعاع','طول' , 'عرض' , 'مختصات' ,'اندازه' , 'بکش' ,'رسم', 'کن'];
  }

  /**check if is keyword */
  isKeyword(str) {
    return this.keywords.has(str);
  }

  /**check if is terminal */
  isTerminal(str) {
    return this.terminals.includes(str);
  }

  /**get list of tokens */
  getListOfTokens() {
    return this.listOfTokens;
  } 

   // Initialize the Lexer's buffer. This resets the lexer's internal
  // state and subsequent tokens will be returned starting with the
  // beginning of the new buffer.
  input (buf) {
      this.pos = 0;
      this.buf = buf;
      this.buflen = buf.length;
  }


// Get the next token from the current buffer. A token is an object with
// the following properties:
// - name: name of the pattern that this token matched (taken from rules).
// - value: actual string value of the token.
// - pos: offset in the current buffer where the token starts.
//
// If there are no more tokens in the buffer, returns null. In case of
// an error throws Error.
token () {
  
  while(this.pos < this.buflen){
    this._skipnontokens();
    if (this.pos >= this.buflen) {
      return null;
    }
    // The char at this.pos is part of a real token. Figure out which.
    var c = this.buf.charAt(this.pos);

    // '/' is treated specially, because it starts a comment if followed by
    // another '/'. If not followed by another '/', it's the DIVIDE
    // operator.
    if (c === '/') {
      var next_c = this.buf.charAt(this.pos + 1);
      if (next_c === '/') {
        // return this._process_comment();
         this._process_comment();
      } else {
        // return {name: 'DIVIDE', value: '/', pos: this.pos++};
          this.listOfTokens.push({name: 'OPERATOR', value: '/', pos: this.pos++});
      }
    } else {
      // Look it up in the table of operators
      var op = this.optable[c];
      if (op !== undefined) {
        // return {name: op, value: c, pos: this.pos++};
        this.listOfTokens.push({name: 'OPERATOR', value: c, pos: this.pos++});
      } else {
        // Not an operator - so it's the beginning of another token.
        if (this._isalpha(c)) {
          // return this._process_identifier();
           this._process_identifier();
        } else if (this._isdigit(c)) {
          // return this._process_number();
           this._process_number();
        } else if (c === '"') {
          // return this._process_quote();
           this._process_quote();
        } else {
          throw Error('Token error at ' + this.pos);
        }
      }
    }
  }

}


_isnewline (c) {
  return c === '\r' || c === '\n';
}

_isdigit (c) {
  return c >= '0' && c <= '9';
}

_isalpha (c) {
  return (c >= 'a' && c <= 'z') ||
         (c >= 'A' && c <= 'Z') ||
         (c >= 'ا'  && c <= 'ی') ||
         c === '_' || c === '$';
}

_isalphanum (c) {
  return (c >= 'a' && c <= 'z') ||
         (c >= 'A' && c <= 'Z') ||
         (c >= '0' && c <= '9') ||
         (c >= 'ا' && c <= 'ی') ||
         c === '_' || c === '$';
}

_process_number () {
    var endpos = this.pos + 1;
    while (endpos < this.buflen &&
          this._isdigit(this.buf.charAt(endpos))) {
      endpos++;
    }

    var tok = {
      name: 'NUMBER',
      value: this.buf.substring(this.pos, endpos),
      pos: this.pos
    };
    this.pos = endpos;
    this.listOfTokens.push(tok);
}

_process_comment () {
    var endpos = this.pos + 2;
    // Skip until the end of the line
    var c = this.buf.charAt(this.pos + 2);
    while (endpos < this.buflen &&
          !this._isnewline(this.buf.charAt(endpos))) {
        endpos++;
    }

    var tok = {
      name: 'COMMENT',
      value: this.buf.substring(this.pos, endpos),
      pos: this.pos
    };
    this.pos = endpos + 1;
    this.listOfTokens.push(tok);
}


_process_identifier () {

    var endpos = this.pos + 1;
    while (endpos < this.buflen &&
          this._isalphanum(this.buf.charAt(endpos))) {
      endpos++;
    }

    const identifier = this.buf.substring(this.pos , endpos);
    let tok = {};

    if(this.isTerminal(identifier)) {
      tok = {
        name : 'Terminal' ,
        value : identifier ,
        pos : this.pos
      };
    }
    else {
      tok = {
        name: 'IDENTIFIER',
        value: this.buf.substring(this.pos, endpos),
        pos: this.pos
      };
    }

    this.pos = endpos;
    this.listOfTokens.push(tok);

}


_process_quote () {
// this.pos points at the opening quote. Find the ending quote.
var end_index = this.buf.indexOf('"', this.pos + 1);

if (end_index === -1) {
  throw Error('Unterminated quote at ' + this.pos);
} else {
  var tok = {
    name: 'QUOTE',
    value: this.buf.substring(this.pos, end_index + 1),
    pos: this.pos
  };
  this.pos = end_index + 1;
  this.listOfTokens.push(tok);
}
}

_skipnontokens () {
  while (this.pos < this.buflen) {
    var c = this.buf.charAt(this.pos);
    if (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
      this.pos++;
    } else {
      break;
    }
  }
}


}


const lexer = new Lexer();

//lexer.input('if(){}elsethen\n function');
lexer.input('دایره ای به طول 5 رسم کن');
lexer.token();
console.log(lexer.getListOfTokens());


