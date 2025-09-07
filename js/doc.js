document.write('<img src="' + bordertl + '" height="10" width="10" name="bordertl">');
for (var j = 0; j <= maxX; j++) document.write('<img src="' + bordertb + '" height="10" width="16">');
document.write('<img src="' + bordertr + '" height="10" width="10"><br>');
document.write('<img src="' + borderlr + '" height="26" width="10">');
document.write('<a onclick="return bombCountClick()"><img src="' + timeDigits[0].src + '" name="bomb100s" width="13" height="23"><img src="' + timeDigits[0].src + '" name="bomb10s" width="13" height="23"><img src="' + timeDigits[0].src + '" name="bomb1s" width="13" height="23"></a>');
document.write('<a onclick="return faceClick()"><img src="' + faceWait.src + '" name="face" style="margin-left:' + smileMargin + 'px;margin-right:' + smileMargin + 'px;" width="26" height="26"></a>');
document.write('<img src="' + timeDigits[0].src + '" name="time100s" width="13" height="23" alt=""><img src="' + timeDigits[0].src + '" name="time10s" width="13" height="23"><img src="' + timeDigits[0].src + '" name="time1s" width="13" height="23">');
document.write('<img src="' + borderlr + '" height="26" width="10"><br>');
document.write('<img src="' + borderjointl + '" height="10" width="10">');
for (var j = 0; j <= maxX; j++) {
    document.write('<img src="' + bordertb + '" height="10" width="16">');
}
document.write('<img src="' + borderjointr + '" height="10" width="10"><br>');
for (var i = 0; i <= maxY; i++) {
    document.write('<img src="' + borderlr + '" height="16" width="10">');
    for (var j = 0; j <= maxX; j++) document.write('<a onClick="" onmouseover="cursorHoldLoc(' + j + ',' + i + ')" onmouseout="cursorClearLoc(' + j + ',' + i + ')" ondragstart="ignoreDragging()" ondrag="ignoreDragging()" onmousedown="showMouseDown();" onmouseup="cellClick(' + j + ',' + i + ', event)"><img src="' + blankCell.src + '" name="cellIm' + j + '_' + i + '" height="16" width="16"></a>');
    document.write('<img src="' + borderlr + '" height="16" width="10"><br>');
}
document.write('<img src="' + borderbl + '" height="10" width="10">');
for (var j = 0; j <= maxX; j++) {
    document.write('<img src="' + bordertb + '" height="10" width="16">');
}
document.write('<img src="' + borderbr + '" height="10" width="10"><br></div></div>');
