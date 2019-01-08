const fs = require('fs');
const file = fs.createWriteStream('test.txt');
const Lexer = require('./lexer');
const Parser = require('./LL1_Parser');

const shapes = require('../drawing/shapes');

//let lines = [];
//let allLinesTokens = [];

// fs.readFileSync('file.txt').toString().split('\r\n').forEach( (line) =>  {  
//     lines.push(line);
// })

/*lex the sentense */
const line = fs.readFileSync('file.txt').toString();

const lexer = new Lexer()

lexer.input(line);
lexer.token();
const listOfTokens = lexer.getListOfTokens();

//console.log(listOfTokens);
console.log('\n');
/* End lex the sentence */

/* parser segment */
const parser = new Parser(listOfTokens);
const tokensArray = parser.tokensArray;
//console.log(tokensArray);

let result = true;
const bools = [];
bools[0] = false;
bools[1] = true;
bools[2] = true;
bools[3] = false;

for(i=0; i< bools.length; i++) {
    if(bools[i] === false) {
        result = false;
    }
}

//console.log(parser.sentence());

/**shapes strings */
let circleSvgCode="";
let rectangleSvgCode="";
let ellipseSvgCode="";
let lineSvgCode="";
let shadowSvgCode = shapes.shadow();

/**end shapes strings */
const isLL1 = parser.sentence();
//console.log(`coordinates ${parser.circleFirstCoordinates}`);
if(isLL1) {
   
    //یک دایره به شعاع 5 و مختصات 6 و 7 رسم کن
    if(tokensArray.includes('دایره')) {
        let cx , cy , r , color;
        if(parser.circleFirstRadius) {
            cx = tokensArray[7];
            cy = tokensArray[9];
            r = tokensArray[4];
            //یک دایره به شعاع 5 و مختصات 6 و 7 رسم کن و سایه ای به اندازه 4 و 7 و رنگ قرمز رسم کن
            if(tokensArray.includes('سایه')) {
                color = tokensArray[22];
                if(color === 'قرمز') {
                    color = 'red';
                }
                else if(color ==='ابی'){
                    color = 'blue';
                }
                else if(color ==='سبز'){
                    color = 'green';
                }
                else if(color ==='زرد'){
                    color : 'yellow';
                }
                //console.log(color);
                circleSvgCode = shadowSvgCode.concat('\r\n' , shapes.circleDrawWithShadow(cx , cy , r ,color , 'f2'));
            }
            //یک دایره به شعاع 5 و مختصات 6 و 7 رسم کن
            else {
                circleSvgCode = shapes.circleDraw(cx , cy , r);
            }
        }
        //یک دایره به مختصات 5 و 6 و شعاع 6 رسم کن
        else {
            cx = tokensArray[4];
            cy = tokensArray[6];
            r = tokensArray[9];
            

            //یک دایره به مختصات 6 و 7 و شعاع 5 رسم کن و سایه ای به اندازه 4 و 7 و رنگ قرمز رسم کن
            if(tokensArray.includes('سایه')) {

                color = tokensArray[22];
                if(color === 'قرمز') {
                    color = 'red';
                }
                else if(color ==='ابی'){
                    color = 'blue';
                }
                else if(color ==='سبز'){
                    color = 'green';
                }
                else if(color ==='زرد'){
                    color : 'yellow';
                }
                circleSvgCode = shadowSvgCode.concat('\r\n' , shapes.circleDrawWithShadow(cx , cy , r , color , 'f2'));
            }
            //یک دایره به مختصات 5 و 6 و شعاع 6 رسم کن
            else {
                circleSvgCode = shapes.circleDraw(cx , cy , r);
            }
            
        }
    }
    //یک مستطیل به اندازه 50 و 40 و مختصات 100 و 100 رسم کن
    else if(tokensArray.includes('مستطیل')) {
        let x ,y , width , height , color;

        if(parser.rectangleFirstSize) {
            
            x = tokensArray[9];
            y = tokensArray[11];
            width = tokensArray[4];
            height = tokensArray[6];
            // یک مستطیل به اندازه 50 و 40 و مختصات 100 و 100 رسم کن و سایه ای به اندازه 4 و 7 و رنگ قرمز رسم کن
            if(tokensArray.includes('سایه')) {
                color = tokensArray[24];
                if(color === 'قرمز') {
                    color = 'red';
                }
                else if(color ==='ابی'){
                    color = 'blue';
                }
                else if(color ==='سبز'){
                    color = 'green';
                }
                else if(color ==='زرد'){
                    color : 'yellow';
                }
                console.log(color);
                rectangleSvgCode = shadowSvgCode.concat('\r\n' , shapes.rectangleDrawWithShadow(x , y , width , height ,color , 'f2'));
            }
            //یک مستطیل به اندازه 5 و 8 و مختصات 5 و 6 رسم کن
            else {
                rectangleSvgCode = shapes.rectangleDraw(x , y , width , height );
            }
        }
        //یک مستطیل به مختصات 6 و 7 و اندازه 5 و 6 رسم کن
        else {
            x = tokensArray[4];
            y = tokensArray[6];
            width = tokensArray[9];
            height = tokensArray[11];
            // یک مستطیل به مختصات 5 و 8 و اندازه 5 و 6 رسم کن و سایه ای به اندازه 4 و 7 و رنگ قرمز رسم کن
            if(tokensArray.includes('سایه')) {
                color = tokensArray[24];
                if(color === 'قرمز') {
                    color = 'red';
                }
                else if(color ==='ابی'){
                    color = 'blue';
                }
                else if(color ==='سبز'){
                    color = 'green';
                }
                else if(color ==='زرد'){
                    color : 'yellow';
                }
                console.log(color);
                rectangleSvgCode = shadowSvgCode.concat('\r\n' , shapes.rectangleDrawWithShadow(x , y , width , height ,color , 'f2'));
            }
            //یک مستطیل به مختصات 5 و 8 و اندازه 5 و 6 رسم کن
            else {
                rectangleSvgCode = shapes.rectangleDraw(x , y , width , height );
            }
        }
    }
    else if(tokensArray.includes('بیضی')) {
        let cx ,cy , rx , ry , color;

        if(parser.ellipseFirstRadius) {
            
            cx = tokensArray[10];
            cy = tokensArray[12];
            rx = tokensArray[4];
            ry = tokensArray[7];
            // یک بیضی به شعاع 20 و شعاع 35 و مختصات 100 و 100 رسم کن و سایه ای به اندازه 4 و 5 و رنگ سبز رسم کن
            if(tokensArray.includes('سایه')) {
                color = tokensArray[25];
                if(color === 'قرمز') {
                    color = 'red';
                }
                else if(color ==='ابی'){
                    color = 'blue';
                }
                else if(color ==='سبز'){
                    color = 'green';
                }
                else if(color ==='زرد'){
                    color : 'yellow';
                }
                console.log(color);
                ellipseSvgCode = shadowSvgCode.concat('\r\n' , shapes.ellipseDrawWithShadow(cx , cy , rx , ry ,color , 'f2'));
            }
            //یک بیضی به شعاع 20 و شعاع 35 و مختصات 100 و 100 رسم کن
            else {
                ellipseSvgCode = shapes.ellipseDraw(cx , cy , rx , ry );
            }
        }
        //یک بیضی به مختصات 4 و 6 و شعاع 7 و شعاع 8 رسم کن 
        else {
            cx = tokensArray[4];
            cy = tokensArray[6];
            rx = tokensArray[9];
            ry = tokensArray[12];
            // یک بیضی به مختصات 4 و 6 و شعاع 7 و شعاع 8 رسم کن و سایه ای به اندازه 4 و 5 و رنگ سبز رسم کن
            if(tokensArray.includes('سایه')) {
                color = tokensArray[25];
                if(color === 'قرمز') {
                    color = 'red';
                }
                else if(color ==='ابی'){
                    color = 'blue';
                }
                else if(color ==='سبز'){
                    color = 'green';
                }
                else if(color ==='زرد'){
                    color : 'yellow';
                }
                console.log(color);
                ellipseSvgCode = shadowSvgCode.concat('\r\n' , shapes.ellipseDrawWithShadow(cx , cy , rx , ry ,color , 'f2'));
            }
            //یک بیضی به مختصات 4 و 6 و شعاع 7 و شعاع 8 رسم کن 
            else {
                ellipseSvgCode = shapes.ellipseDraw(cx , cy , rx , ry );
            }
        }
    }
    //یک خط از مختصات 5 و 6 به مختصات 7 و 8 رسم کن
    else if(tokensArray.includes('خط')) {
        let x1 , y1 , x2 , y2;
        x1 = tokensArray[4];
        y1 = tokensArray[6];
        x2 = tokensArray[9];
        y2 = tokensArray[11];

        //یک خط از مختصات 5 و 6 به مختصات 7 و 8 رسم کن و سایه ای به اندازه 4 و 5 و رنگ سبز رسم کن
        if(tokensArray.includes('سایه')) {
            
            lineSvgCode = shadowSvgCode.concat('\r\n' , shapes.lineDrawWithShadow(x1 , y1 , x2 , y2 , 'f2'));
        }
        //یک خط از مختصات 5 و 6 به مختصات 7 و 8 رسم کن
        else {
            lineSvgCode = shapes.lineDraw(x1 , y1 , x2 , y2 );
        }

    }
}

//console.log(lineSvgCode);

const svg = [
    circleSvgCode ,
    lineSvgCode ,
    rectangleSvgCode ,
    ellipseSvgCode
];

const filteredArrayOfSvgs = svg.filter( (item) => {
    return item !== '';
});

let strSvg = filteredArrayOfSvgs[0];

console.log(`strSvg: ${strSvg}`);
if(strSvg === undefined) {
    strSvg = 'your syntax is invalid :)';
}
console.log(`strSvg: ${strSvg}`);
//console.log(strSvg);
    
// const isNumeric = (c) => {
//     return !isNaN(c);
// }

// //console.log(isNumeric('324732'));
// let isNumber;
// const method = (xc) => {
//     isNumber = isNumeric(xc);

//     console.log('thats good');
// }

// method('232');
// console.log(isNumber);


module.exports = {
    strSvg 
};