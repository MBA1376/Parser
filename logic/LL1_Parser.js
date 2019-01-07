class LL1_Parser {
    
    constructor(listOfTokensObj) {
        this.listOfTokensObj = listOfTokensObj;
        this.tokensArray = this.listOfTokensObj.map( (item) => item = item.value);
        this.shodowColor;
        this.validations = [];

        /**this section is for posision of experessions  */
        //circle
        this.circleFirstRadius = false;
        this.circleFirstCoordinates = false;
        
        //rectangle
        this.rectangleFirstSize = false;
        this.rectangleFirstcoordinates = false;

        //ellipse
        this.ellipseFirstRadius = false;
        this.ellipseFirstcoordinates = false;
        this.pos = 0;
    }

    /**
     * all of the rules are boolean and all of the methods return boolean
     */
    match(terminal) {
        
        if(this.tokensArray[this.pos] === terminal) {
            console.log(`${this.tokensArray[this.pos]} = ${terminal}`)
            this.validations[this.pos] = true;
            this.pos = this.pos + 1 ;
        }
        else{
            this.validations[this.pos] = false;
            this.pos = this.pos + 1;
        }
    }
    
    /**
     * if this method returns true then input is accepted :)
     */
 
    sentence() {
        let result = true;
        

        //this.exp();
        this.match('یک');
        this.otherSentence();
        this.verb();
        
        

        if(this.tokensArray[this.pos + 1] !== undefined) {
            this.match('و');
            //this.match('یک');
            this.match('سایه');
            this.match('ای');
            this.match('به');
            this.shodow();
            this.verb();
            
        }
        
        for(i=0; i<this.validations.length; i++) {
            console.log(this.validations[i]);
            if(this.validations[i] === false) {
                result = false;
            }
        }

        return result;
    }

    otherSentence() {   

        if(this.tokensArray[this.pos] === 'دایره') {
            this.match('دایره');
            this.match('به');
            this.circle();
        }
        if(this.tokensArray[this.pos] === 'مستطیل') {
            this.match('مستطیل');
            this.match('به');
            this.rectangle();
        }
        if(this.tokensArray[this.pos] === 'بیضی') {
            this.match('بیضی');
            this.match('به');
            this.ellipse();
        }
        if(this.tokensArray[this.pos] === 'خط') {
            this.match('خط');
            this.match('از');
            this.line();
        }

    }

    circle() {
        
        if(this.tokensArray[this.pos] === 'شعاع') {
            this.match('شعاع');
            this.exp();
            this.match('و');
            this.match('مختصات');
            //this.match(')');
            this.exp();
            this.match('و');
            this.exp();

            /* set first of circle */
            this.circleFirstRadius = true;
        }
        if(this.tokensArray[this.pos] === 'مختصات') {
            this.match('مختصات');
           // this.match(')');
            this.exp();
            this.match('و');
            this.exp();
            //this.match('(');
            this.match('و')
            this.match('شعاع');
            this.exp();

            /* set first of circle */
            this.circleFirstcoordinates = true;
        }

    }

    rectangle() {

        if(this.tokensArray[this.pos] === 'اندازه') {
            this.match('اندازه');
            //this.match(')');
            this.exp();
            this.match('و');
            this.exp();
            //this.match('(');
            this.match('و');
            this.match('مختصات');
            //this.match(')');
            this.exp();
            this.match('و');
            this.exp();
            //this.match('(');

            /** set first of rectangle */
            this.rectangleFirstSize = true;
        }
        if(this.tokensArray[this.pos] === 'مختصات') {
            this.match('مختصات');
            //this.match(')');
            this.exp();
            this.match('و');
            this.exp();
            //this.match('(');
            this.match('و')
            this.match('اندازه')
            //this.match(')');
            this.exp();
            this.match('و');
            this.exp();
            //this.match('(');

            /** set first of rectangle */
            this.rectangleFirstcoordinates = true;
        }

    }

    ellipse() {

        if(this.tokensArray[this.pos] === 'شعاع') {
            this.match('شعاع');
            this.exp();
            this.match('و');
            this.match('شعاع');
            this.exp();
            this.match('و');
            this.match('مختصات');
            //this.match(')');
            this.exp();
            this.match('و');
            this.exp();
            //this.match('(');

            /** set first of ellipse */
            this.ellipseFirstRadius = true;
        }
        /**this section is wrong probably */
        if(this.tokensArray[this.pos] === 'مختصات') {
            this.match('مختصات');
            //this.match(')');
            this.exp();
            this.match('و');
            this.exp();
            //this.match('(');
            this.match('و');
            this.match('شعاع');
            this.exp();
            this.match('و');
            this.match('شعاع');
            this.exp();

            /** set first of ellipse */
            this.ellipseFirstcoordinates = true;
        }
    
    }
    
    line() {

        this.match('مختصات');
        //this.match(')');
        this.exp();
        this.match('و');
        this.exp();
        //this.match('(');
        this.match('به');
        this.match('مختصات');
        //this.match(')');
        this.exp();
        this.match('و');
        this.exp();
        //this.match('(');
    }

    verb() {
        
        if(this.tokensArray[this.pos] === 'بکش'){
            //this.match('بکش');
            console.log(`${this.tokensArray[this.pos]} = بکش`);
            this.validations[this.pos] = true;
            this.pos = this.pos + 1;
        }
        else if(this.tokensArray[this.pos] === 'رسم')  {
            this.match('رسم');
            this.match('کن');
        }
        else {
            this.validations[this.pos] = false;
            console.log(`${this.tokensArray[this.pos]} is not match`);
        }
    }

    exp() {
        if( this.isNumeric(this.tokensArray[this.pos]) ) {
            /**if next token was operator */
        //     let endpos = this.pos + 1 ;
        //     let resNumber;
        //     console.log(parseInt(this.listOfTokensObj[this.pos].value));
        //     console.log(this.listOfTokensObj[endpos].value);
        //     console.log(this.listOfTokensObj[endpos+1].value);
        //     console.log(`size of token array is ${this.listOfTokensObj.length}`);
        //     while(endpos + 1 <= this.listOfTokensObj.length && this.listOfTokensObj[endpos].name === 'OPERATOR' && this.listOfTokensObj[endpos + 1].name === 'NUMBER'){
        //        console.log(`type of endpos value is ${typeof this.listOfTokensObj[this.endpos].value} and type of endpos+1 is ${typeof this.listOfTokensObj[this.endpos+1].value}`);
        //         if(this.listOfTokensObj[this.endpos] !== undefined && this.listOfTokensObj[this.endpos].value == '+') {
        //             console.log('plus');
        //             resNumber = parseInt(this.listOfTokensObj[this.pos].value) + parseInt(this.listOfTokensObj[endpos+1].value);
        //         }
        //         else if(this.listOfTokensObj[this.endpos] !== undefined && this.listOfTokensObj[this.endpos].value == '-'){
        //             console.log('minus');
        //             resNumber = parseInt(this.listOfTokensObj[this.pos].value) - parseInt(this.listOfTokensObj[endpos+1].value);
        //         }
        //         else if(this.listOfTokensObj[this.endpos] !== undefined && this.listOfTokensObj[this.endpos].value == '*'){
        //             console.log('product');
        //             resNumber = parseInt(this.listOfTokensObj[this.pos].value) * parseInt(this.listOfTokensObj[endpos+1].value);
        //         }
        //         else if(this.listOfTokensObj[this.endpos] !== undefined && this.listOfTokensObj[this.endpos].value == '/'){
        //             console.log('division');
        //             resNumber = parseInt(this.listOfTokensObj[this.pos].value) / parseInt(this.listOfTokensObj[endpos+1].value);
        //         }
        //         else {
        //             //console.log(`type of operator = ${typeof this.listOfTokensObj[this.endpos].value}`);
        //             console.log(`pos is ${endpos}`);
        //         }
        //         //resNumber = parseInt(this.listOfTokensObj[this.pos])
        //         endpos = endpos + 2;
        //     }
        //     // 3 + 4 + 3 circle
        //     if(endpos === this.pos + 1) {
        //         this.pos = this.pos + 1;
        //     }
        //     else {
        //         this.pos = endpos;
        //     }

        //     console.log(`resNumber = ${resNumber} `)
             this.pos = this.pos + 1 ;
        }
        else {
            console.log(`${this.validations[this.pos]} is not match`);
        }
    }

   /* operation() {
        if(this.tokensArray[this.pos] === '+') {
            this.match('+');
        }
        if(this.tokensArray[this.pos] === '-') {
            this.match('-');
        }
        if(this.tokensArray[this.pos] === '*') {
            this.match('*');
        }
        if(this.tokensArray[this.pos] ==='/') {
            this.match('/');
        }
    }*/
    
    shodow() {
        this.match('اندازه');
        this.exp();
        this.match('و');
        this.exp();
        this.match('و');
        this.match('رنگ');
        this.color();
        // if(this.tokensArray[this.pos] === 'طول') {
        //     this.match('طول');
        //     this.exp();
        //     this.match('و');
        //     this.match('عرض');
        //     this.exp();
        // }
        // if(this.tokensArray[this.pos] === 'عرض') {
        //     this.match('عرض');
        //     this.exp();
        //     this.match('و');
        //     this.match('طول');
        //     this.exp();
        // }
    }

    color() {
        if(this.tokensArray[this.pos] === 'ابی') {
            this.match('ابی');
        }
        else if(this.tokensArray[this.pos] === 'قرمز') {
            this.match('قرمز');
        }
        else if(this.tokensArray[this.pos] === 'سبز') {
            this.match('سبز');
        }
        else if(this.tokensArray[this.pos] === 'زرد') {
            this.match('سبز');
        }
    }

    /**utility functions */
    isNumeric(c) {
        return !isNaN(c);
    }

}


module.exports = LL1_Parser;
