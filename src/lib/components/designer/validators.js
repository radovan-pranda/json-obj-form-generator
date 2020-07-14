export function filterInt(value) {
  if (/^[-+]?(\d+|(\d+([e]|[E])[+]\d+))$/.test(value)) { // if (/^[-+]?(\d+|Infinity)$/.test(value)) { 
    return Number(value)
  } else {
    return NaN
  }
}

export function filterFloat(value) {
  if (/^[-+]?(\d+|(\d+[.]\d+)|(\d+([.]\d+)*([e]|[E])[-+]\d+))$/.test(value)) { // if (/^[-+]?(\d+|(\d+[.]\d+)|(\d+([.]\d+)*([e]|[E])[-+]\d+)|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
}

export function filterFloatWithPrecision(value, precision) {
  var prec = filterInt(precision);
  if (/^[-+]?(\d+|(\d+[.]\d+)|(\d+([.]\d+)*([e]|[E])[-+]\d+))$/.test(value) && +prec >= 0) { // if (/^[-+]?(\d+|(\d+[.]\d+)|(\d+([.]\d+)*([e]|[E])[-+]\d+)|Infinity)$/.test(value) && +prec >= 0) {
      try {
        return Number(Number(value).toFixed(prec));
      } catch (error) {
        return NaN;
      }
  } 
  
  return NaN;
}


export function filterFloatWithPrecisionString(value, precision) {
  var prec = filterInt(precision);
  if (/^[-+]?(\d+|(\d+[.]\d+)|(\d+([.]\d+)*([e]|[E])[-+]\d+))$/.test(value) && +prec >= 0) { // if (/^[-+]?(\d+|(\d+[.]\d+)|(\d+([.]\d+)*([e]|[E])[-+]\d+)|Infinity)$/.test(value) && +prec >= 0) {
      try {
        return Number(value).toFixed(prec);
      } catch (error) {
        return NaN;
      }
  } 
  
  return NaN;
}

export function intValid(value) {
  return ((/^[-+]?(\d+|(\d+([e]|[E])[+]\d+))$/.test(value))); // ((/^[-+]?(\d+|(\d+[.]\d+)|(\d+([.]\d+)*([e]|[E])[-+]\d+)|Infinity)$/.test(value)));
}

export function floatValid(value) {
  return (/^[-+]?(\d+|(\d+[.]\d+)|(\d+([.]\d+)*([e]|[E])[-+]\d+)|Infinity)$/.test(String(value)));
}




export function RGBtoCMYK(RGB)
{
  var rgb = RGB;
  if (rgb[0] === '#')
  {
    rgb = rgb.substring(1, rgb.length);
  }

  if (rgb.length === 6)
  {
    var r = parseInt(rgb.substring(0, 1), 16) / 255;
    var g = parseInt(rgb.substring(2, 4), 16) / 255;
    var b = parseInt(rgb.substring(5, 6), 16) / 255;
    
    if (r === 0 && g === 0 && b === 0) {
      return [0,0,0,100];
     }
    
     var c = 1 - r;
     var m = 1 - g;
     var y = 1 - b;
     var k = 0;
    
     var minCMY = Math.min(c, Math.min(m,y));
     c = ((c - minCMY) / (1 - minCMY)) * 100;
     m = ((m - minCMY) / (1 - minCMY)) * 100;
     y = ((y - minCMY) / (1 - minCMY)) * 100;
     k = minCMY * 100;

    /*
    var k = 1-Math.max(r,g,b);
    var c = (1-r-k) / (1-k); 
    var m = (1-g-k) / (1-k); 
    var y = (1-b-k) / (1-k);*/
    return [c.toFixed(0),m.toFixed(0), y.toFixed(0), k.toFixed(0)];
  }

  return [0,0,0,0];
}


export function CMYKtoRGB(CMYK)
{
  if (CMYK.length === 4)
  {
    var r = 255 * (1 - CMYK[0]/100) * (1 - CMYK[3]/100);
    var g = 255 * (1 - CMYK[1]/100) * (1 - CMYK[3]/100);
    var b = 255 * (1 - CMYK[2]/100) * (1 - CMYK[3]/100);
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
  }

  return '';
}

export function isRGB(value)
{
  return /^[#]([a-f]|[A-F]|[0-9]){6}$/.test(value);
}

export function getCMYK(value)
{
  var cmyk = value.replace(" ", "");
  cmyk = cmyk.substring(1, cmyk.length-1).split(',');
  if (cmyk.length === 4)
  {
    for (var i = 0; i < 4; i++)
    {
      if (!floatValid(cmyk[i]))
      {
        cmyk[i] = 0;
        continue;
      }

      cmyk[i] = filterInt(cmyk[i]);

      if (cmyk[i] > 100 || cmyk[i] < 0)
      {
        cmyk[i] = 0;
      }

    }
  }

  return [0,0,0,0];
}