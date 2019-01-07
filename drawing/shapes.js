const circleDraw = (cx , cy , r) => {
    return `<circle cx=\"${cx}\" cy=\"${cy}\" r=\"${r}\" stroke="black" stroke-width="3" fill="red" />`;
}

const circleDrawWithShadow = (cx , cy , r , color , id) => {
    return `<circle cx=\"${cx}\" cy=\"${cy}\" r=\"${r}\" stroke="black" stroke-width="3" fill="${color}" filter="url(#${id})"/>`;
}

/**x defines left position.  y defines right position. */
const rectangleDraw = (x , y , width , height) => {
    return `<rect x=\"${x}\" y=\"${y}\" width=\"${width}\" height=\"${height}\"
    style="fill:blue; stroke:pink;stroke-width:5; stroke-opacity:0.9" />`;
}

const rectangleDrawWithShadow = (x , y , width , height , color, id) => {
    return `<rect x=\"${x}\" y=\"${y}\" width=\"${width}\" height=\"${height}\"
    style="fill:${color}; stroke:pink; stroke-width:5; stroke-opacity:0.9" filter="url(#${id})"/>`;
}

const lineDraw = (x1 , y1 , x2 , y2) => {
    return `<line x1=\"${x1}\" y1=\"${y1}\" x2=\"${x2}\" y2=\"${y2}\" style="stroke:rgb(255,0,0);stroke-width:2" />`;
}

const lineDrawWithShadow = (x1 , y1 , x2 , y2 , id) => {
    return `<line x1=\"${x1}\" y1=\"${y1}\" x2=\"${x2}\" y2=\"${y2}\" style="stroke:rgb(255,0,0);stroke-width:2" filter="url(#${id})"/>`;
}

const ellipseDraw = (cx , cy , rx , ry) => {
    return `<ellipse cx=\"${cx}\" cy=\"${cy}\" rx=\"${rx}\" ry=\"${ry}\"
    style="fill:yellow;stroke:purple;stroke-width:2" />`;
}

const ellipseDrawWithShadow = (cx , cy , rx , ry , color , id) => {
    return `<ellipse cx=\"${cx}\" cy=\"${cy}\" rx=\"${rx}\" ry=\"${ry}\"
    style="fill:${color}; stroke:purple; stroke-width:2" filter="url(#${id})"/>`;
}

const shadow = () => {
    return `<defs>
    <filter id="f2" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>`;
}

module.exports = {
    circleDraw ,
    rectangleDraw ,
    lineDraw ,
    ellipseDraw ,
    shadow ,
    circleDrawWithShadow ,
    rectangleDrawWithShadow ,
    ellipseDrawWithShadow ,
    lineDrawWithShadow
};