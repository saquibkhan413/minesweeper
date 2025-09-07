document.write('</div>');
function closep(n) {
    var t = ["toppane", "middlepane", "bottompane", "leftpane", "rightpane"];
    var dv = document.getElementById(t[n]);
    dv.style.display = "none";
    rsz();
}
function ev(a) {
    gtag('event', a);
}
setInterval(function () {
    ev('4_minutes');
}, 240000);
window.onbeforeunload = function () {
    ev('unload');
    return undefined;
};
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") {
        ev('lost_focus');
    }
});
useQuestionMarks = !(getCookie("useQuestionMarks") == 'false');
useMacroOpen = !(getCookie("useMacroOpen") == 'false');
useFirstClickUseful = !(getCookie("useFirstClickUseful") == 'false');
openRemaining = (getCookie("openRemaining") == 'true');
allowDisarm = (getCookie("allowDisarm") == 'true');
allowHints = !(getCookie("allowHints") == 'false');
maxCells = (maxX + 1) * (maxY + 1) - 1;
maxStackHeight = 300;
cellArray = new Array(maxCells + 1);
function constructCell() {
    this.isBomb = false;
    this.isExposed = false;
    this.isFlagged = false;
    this.isDisarmed = false;
    this.isQuestion = false;
    this.isMarked = false;
    this.neighborBombs = 0;
}
for (var l = 0; l <= maxCells; l++) cellArray[l] = new constructCell();
markedArray = new Array(maxStackHeight);
dead = false;
win = false;
bombsFlagged = 0;
cellsOpen = 0;
markedCount = -1;
highestStackHeight = -1;
numMoves = 0;
openRemainingUsed = false;
allowDisarmUsed = false;
allowHintsUsed = false;
lastClickOnMenu = false;
disarmed = 0;
hints = 0;
paused = false;
clockMoving = false;
clockActive = false;
killLastClock = false;
clockCurrent = -1;
fuseBurning = false;
fuseRemaining = 0;
disarmX = 0;
disarmY = 0;
function arrayIndexOf(x, y) { return x + y * (maxX + 1); }
function imageIndexOf(x, y) { return x + (y + 2) * (maxX + 3) + 27; }
function checkBounds(x, y) { return (0 <= x && x <= maxX && 0 <= y && y <= maxY); }
function closeAllMenus() {
    closeMenu("divMenuOpt");
    closeMenu("divMenuGame");
}
function closeMenu(selectedMenu) {
    document.getElementById(selectedMenu).style.visibility = "hidden";
}
function openMenu(selectedMenu) {
    document.getElementById(selectedMenu).style.visibility = "visible";
}
function menuSetOptionChecks(cookieVar, imageLoc) {
    if (cookieVar) imageLoc.src = checked.src; else imageLoc.src = notchecked.src;
}
function menusSetAllOptionChecks(thisMenu) {
    if (thisMenu == "divMenuGame") {
        document.imBeginner.src = notchecked.src;
        document.imIntermediate.src = notchecked.src;
        document.imExpert.src = notchecked.src;
        document.imCustom.src = notchecked.src;
        if (gameFormat == "Beginner") document.imBeginner.src = checked.src;
        else if (gameFormat == "Intermediate") document.imIntermediate.src = checked.src;
        else if (gameFormat == "Expert") document.imExpert.src = checked.src;
        else document.imCustom.src = checked.src;
    } else if (thisMenu == "divMenuOpt") {
        menuSetOptionChecks(useQuestionMarks, document.imMarks);
        menuSetOptionChecks(useMacroOpen, document.imUseMacro);
        menuSetOptionChecks(useFirstClickUseful, document.imFirst);
        menuSetOptionChecks(openRemaining, document.imRemaining);
        menuSetOptionChecks(allowDisarm, document.imDisarm);
        menuSetOptionChecks(allowHints, document.imHints);
    }
}
function menuClick(thisMenu) {
    visibleTest = document.getElementById(thisMenu).style.visibility == "visible";
    closeAllMenus();
    if (!visibleTest) { menusSetAllOptionChecks(thisMenu); openMenu(thisMenu); }
    lastClickOnMenu = true;
    return false;
}
function menuMouseOver(currentMenu) {
    visibleTestGeneral = (document.getElementById("divMenuGame").style.visibility == "visible" || document.getElementById("divMenuOpt").style.visibility == "visible");
    visibleTestSpecific = document.getElementById(currentMenu).style.visibility == "visible";
    if (visibleTestGeneral && !visibleTestSpecific) { menuClick(currentMenu); lastClickOnMenu = false; }
    return false;
}
function clickInBrowser() {
    if (!lastClickOnMenu) {
        closeMenu("divMenuOpt");
        closeMenu("divMenuGame");
    }
    lastClickOnMenu = false;
}
function menuItemClick(thisMsg) {
    if (thisMsg == "New") faceClick();
    else if (thisMsg == "Pause") doPause();
    else if (thisMsg == "Beginner" || thisMsg == "Intermediate" || thisMsg == "Expert") {
        setCookie("gameFormat", thisMsg);
        window.location.href = window.location.href;
    } else if (thisMsg == "Custom") {
        var e = document.getElementById("window8");
        var disp = e.style.display;
        hideallwindows();
        if (disp == "none") e.style.display = "block";
        document.getElementById("maxY").value = maxY + 1;
        document.getElementById("maxX").value = maxX + 1;
        document.getElementById("maxNumBombs").value = maxNumBombs;
    } else if (thisMsg == "Marks") {
        useQuestionMarks = !useQuestionMarks;
        setCookie("useQuestionMarks", useQuestionMarks);
    } else if (thisMsg == "Area") {
        useMacroOpen = !useMacroOpen;
        setCookie("useMacroOpen", useMacroOpen);
    } else if (thisMsg == "First") {
        useFirstClickUseful = !useFirstClickUseful;
        setCookie("useFirstClickUseful", useFirstClickUseful);
    } else if (thisMsg == "Remaining") {
        openRemaining = !openRemaining;
        updateNumBombs();
        setCookie("openRemaining", openRemaining);
    } else if (thisMsg == "Disarm") {
        allowDisarm = !allowDisarm;
        setCookie("allowDisarm", allowDisarm);
    } else if (thisMsg == "Hints") {
        allowHints = !allowHints;
        setCookie("allowHints", allowHints);
    }   ;
    closeAllMenus();
    return false;
}
function hideDisarm() {
    document.getElementById("divDisarm").style.visibility = "hidden";
    document.face.src = faceSmile.src;
}
function hidePause() {
    document.getElementById("divPause").style.visibility = "hidden";
    paused = false;
}
function clearBoardImages() {
    for (var j = 0; j <= maxY; j++) for (var i = 0; i <= maxX; i++) with (cellArray[arrayIndexOf(i, j)])
        document.images[imageIndexOf(i, j)].src = blankCell.src;
}
function clearBoard() {
    for (var i = 0; i <= maxX; i++) for (var j = 0; j <= maxY; j++) with (cellArray[arrayIndexOf(i, j)]) {
        isExposed = false;
        isBomb = false;
        isFlagged = false;
        isMarked = false;
        isQuestion = false;
        neighborBombs = 0;
    }
}
function updateClock() {
    tempClock = clockCurrent;
    if (tempClock < 0) tempClock = 0;
    if (tempClock > 999) tempClock = 999;
    digit = tempClock % 10;
    document.time1s.src = timeDigits[digit].src;
    digit = Math.floor(tempClock / 10 % 10);
    document.time10s.src = timeDigits[digit].src;
    digit = Math.floor(tempClock / 100);
    document.time100s.src = timeDigits[digit].src;
}
function clockStop() { clockMoving = false; }
function clockClear() {
    clockCurrent = -1;
    updateClock();
    clockMoving = false;
}
function updateNumBombs() {
    var h = maxNumBombs - bombsFlagged;
    if (!dead && !win && openRemaining && h == 0) {
        document.bomb1s.src = movesDigits0.src;
        document.bomb10s.src = movesDigits0.src;
        document.bomb100s.src = movesDigits0.src;
    } else {
        if (h < -99) h = -99;
        digit = Math.abs(h) % 10;
        document.bomb1s.src = timeDigits[digit].src;
        digit = Math.floor(Math.abs(h) / 10 % 10);
        document.bomb10s.src = timeDigits[digit].src;
        digit = Math.floor(Math.abs(h) / 100 % 10);
        document.bomb100s.src = timeDigits[digit].src;
        if (h < 0) document.bomb100s.src = timeNeg.src;
    }
}
function addNeighbor(x, y) {
    if (checkBounds(x, y)) cellArray[arrayIndexOf(x, y)].neighborBombs++;
}
function placeBomb(x, y) {
    with (cellArray[arrayIndexOf(x, y)]) if (!isBomb && !isExposed) {
        isBomb = true;
        for (var i = x - 1; i <= x + 1; i++) for (var j = y - 1; j <= y + 1; j++) addNeighbor(i, j);
        return true;
    } else return false;
}
function placeBombRandomLoc() {
    bombPlaced = false;
    while (!bombPlaced) {
        with (Math) {
            i = floor(random() * (maxX + 1));
            j = floor(random() * (maxY + 1));
        }
        bombPlaced = placeBomb(i, j);
    }
}
function makeBoard() {
    clearBoard();
    bombsFlagged = 0;
    cellsOpen = 0;
    updateNumBombs();
    hints = 0;
    disarmed = 0;
    bombsToPlace = maxNumBombs;
    while (bombsToPlace != 0) {
        placeBombRandomLoc();
        bombsToPlace--;
    }
}
function faceClick_first() {
    document.face.src = faceWait.src;
    hideDisarm();
    hidePause();
    numMoves = 0;
    closeAllMenus();
    clockClear();
    makeBoard();
    clearBoardImages();
    forceFocus();
    dead = false;
    win = false;
    openRemainingUsed = false;
    allowDisarmUsed = false;
    allowHintsUsed = false;
    document.face.src = faceSmile.src;
    return false;
}
faceClick_first();
function showMouseDown(e) {
    if (!dead && !win) {
        closeAllMenus();
        document.face.src = faceOoh.src;
    }
}
function ignoreDragging() {
    try {
        window.event.returnValue = false;
    }
    catch (e) { }
    return false;
}
function removeNeighbor(x, y) {
    if (checkBounds(x, y)) cellArray[arrayIndexOf(x, y)].neighborBombs--;
}
function removeBomb(x, y) {
    for (var i = x - 1; i <= x + 1; i++) for (var j = y - 1; j <= y + 1; j++) removeNeighbor(i, j);
    cellArray[arrayIndexOf(x, y)].isBomb = false;
}
function ticClock() {
    if (!killLastClock) {
        if (clockMoving) clockCurrent++;
        if (clockMoving && clockCurrent < 1000) updateClock();
        clockActive = clockMoving;
        if (clockActive) setTimeout(ticClock, 1000);
    }
    killLastClock = false;
}
function clockStart() {
    clockWasActive = clockActive;
    clockMoving = true;
    ticClock();
    if (clockWasActive) killLastClock = true;
}
function firstClick(x, y) {
    if (!useFirstClickUseful) {
        if (cellArray[arrayIndexOf(x, y)].isBomb) {
            placeBombRandomLoc();
            removeBomb(x, y);
        }
    } else {
        var i, j;
        for (i = x - 1; i <= x + 1; i++) for (j = y - 1; j <= y + 1; j++) if (checkBounds(i, j))
            cellArray[arrayIndexOf(i, j)].isExposed = true;
        for (i = x - 1; i <= x + 1; i++) for (j = y - 1; j <= y + 1; j++) if (checkBounds(i, j) && cellArray[arrayIndexOf(i, j)].isBomb) {
            removeBomb(i, j);
            placeBombRandomLoc();
        }
        for (i = x - 1; i <= x + 1; i++) for (j = y - 1; j <= y + 1; j++) if (checkBounds(i, j))
            cellArray[arrayIndexOf(i, j)].isExposed = false;
    }
    clockStart();
}
function constructMarkedCell() {
    this.x = -1;
    this.y = -1;
}
function markCellToOpen(x, y) {
    ++markedCount;
    if (highestStackHeight < markedCount) {
        ++highestStackHeight;
        markedArray[markedCount] = new constructMarkedCell();
    }
    markedArray[markedCount].x = x;
    markedArray[markedCount].y = y;
    cellArray[arrayIndexOf(x, y)].isMarked = true;
}
function markMatrixToOpen(x, y) {
    for (var i = x - 1; i <= x + 1; i++) for (var j = y - 1; j <= y + 1; j++) if (checkBounds(i, j)) with (cellArray[arrayIndexOf(i, j)])
        if ((!isExposed) && (!isMarked) && (!isFlagged)) markCellToOpen(i, j);
}
function winShowFlags() {
    for (var i = 0; i <= maxX; i++) for (var j = 0; j <= maxY; j++) with (cellArray[arrayIndexOf(i, j)]) if (!isExposed && !isFlagged) {
        isFlagged = true;
        document.images[imageIndexOf(i, j)].src = bombFlagged.src;
    }
}
function deathShowBombs() {
    for (var i = 0; i <= maxX; i++) for (var j = 0; j <= maxY; j++) with (cellArray[arrayIndexOf(i, j)]) if (!isExposed) {
        if (isBomb && !isFlagged) document.images[imageIndexOf(i, j)].src = bombRevealed.src;
        else if (!isBomb && isFlagged) document.images[imageIndexOf(i, j)].src = bombMisFlagged.src;
    }
}
function openCellDeath(x, y) {
    with (cellArray[arrayIndexOf(x, y)]) {
        document.images[imageIndexOf(x, y)].src = bombDeath.src;
        document.face.src = faceDead.src;
        var e = document.getElementById("window9");
        var disp = e.style.display;
        if (disp == "block") e.style.display = "none";
        isExposed = true;
        dead = true;
        updateNumBombs();
        deathShowBombs();
    }
}
function winShowWindow() {
    win = true;
    setCookie("gameTime", clockCurrent);
    setCookie("numMoves", numMoves);
    setCookie("openRemainingUsed", openRemainingUsed);
    setCookie("allowDisarmUsed", allowDisarmUsed);
    setCookie("allowHintsUsed", allowHintsUsed);
    if (hints == 0 && disarmed == 0) {
        document.face.src = faceWin.src;
        var e = document.getElementById("window9");
        var disp = e.style.display;
        hideallwindows();
        if (disp == "none") e.style.display = "block";
        document.getElementById("gameTime").textContent = clockCurrent;
        var gameTime = clockCurrent;
        if (gameTime > 999) gameTime = 999;
        var highTime = parseInt(getCookie(gameFormat), 10);
        var newRecord = 0;
        if (gameTime < highTime || isNaN(highTime)) {
            newRecord = 1;
            highTime = gameTime;
            setCookie(gameFormat, highTime);
        }
        if (gameFormat == "Custom") document.getElementById("gameFormat2").textContent = "Your game parameters were: " + (maxX + 1) + "×" + (maxY + 1) + " with " + maxNumBombs + " bombs.";
        else {
            var gf;
            if (gameFormat == "Beginner") gf = "Beginner";
            if (gameFormat == "Intermediate") gf = "Intermediate";
            if (gameFormat == "Expert") gf = "Expert";
            document.getElementById("gameFormat2").textContent = "Your best " + gf + " time is: " + highTime;
        }
        document.getElementById("numMoves").textContent = numMoves;
        if (newRecord && gameFormat != "Custom") document.getElementById("nr").innerText = "New Record!";
        else document.getElementById("nr").innerText = "";
    } else {
        document.face.src = facePirate.src;
        var e = document.getElementById("window9");
        var disp = e.style.display;
        if (disp == "block") e.style.display = "none";
    }
}
function openCell(x, y) {
    with (cellArray[arrayIndexOf(x, y)]) if (isBomb) {
        clockStop();
        if (allowDisarm) {
            showDisarm(); //maxX, maxY);
            disarmX = x;
            disarmY = y;
            markedCount = -1;
            for (l = 0; l <= maxCells; l++) cellArray[l].isMarked = false;
        } else openCellDeath(x, y);
    } else {
        document.images[imageIndexOf(x, y)].src = cellOpenIm[neighborBombs].src;
        isExposed = true;
        isMarked = false;
        ++cellsOpen;
        if (neighborBombs == 0 && !isBomb) markMatrixToOpen(x, y);
        if (cellsOpen + maxNumBombs - 1 == maxCells) {
            clockStop();
            winShowFlags();
            winShowWindow();
        }
    }
}
function openAllMarked() {
    while (markedCount >= 0) {
        markedCount--;
        with (markedArray[markedCount + 1]) openCell(x, y);
    }
}
function checkFlagged(x, y) {
    if (checkBounds(x, y)) return cellArray[arrayIndexOf(x, y)].isFlagged ? 1 : 0;
    return 0;
}
function checkFlaggedMatrix(x, y) {
    count = 0;
    for (var i = x - 1; i <= x + 1; i++) for (var j = y - 1; j <= y + 1; j++) if (i != x || j != y) count += checkFlagged(i, j);
    return count;
}
function cellClick(x, y, e) {
    closeAllMenus();
    if (!dead && !win) {
        document.face.src = faceSmile.src;
        numMoves++;
        if (e.button != 2) {
            if (!clockMoving) firstClick(x, y);
            with (cellArray[arrayIndexOf(x, y)]) if (isExposed) {
                if (useMacroOpen && checkFlaggedMatrix(x, y) == neighborBombs) {
                    markMatrixToOpen(x, y);
                    openAllMarked();
                }
            } else if (!isFlagged) {
                markCellToOpen(x, y);
                openAllMarked();
            }
            if (win) {
                bombsFlagged = maxNumBombs;
                updateNumBombs();
            }
        } else if (x > -1) with (cellArray[arrayIndexOf(x, y)]) if (!isExposed) {
            if (isFlagged) {
                bombsFlagged--;
                isFlagged = false;
                if (!useQuestionMarks) document.images[imageIndexOf(x, y)].src = blankCell.src;
                else {
                    isQuestion = true;
                    document.images[imageIndexOf(x, y)].src = (bombQuestion.src);
                }
            } else {
                if (isQuestion) {
                    isQuestion = false;
                    document.images[imageIndexOf(x, y)].src = blankCell.src;
                } else {
                    isFlagged = true;
                    ++bombsFlagged;
                    document.images[imageIndexOf(x, y)].src = bombFlagged.src;
                }
            }
            updateNumBombs();
        }
    }
    forceFocus();
}
function faceClick() {
    if (fuseBurning) return false;
    faceClick_first();
    var e = document.getElementById("window9");
    var disp = e.style.display;
    if (disp == "block") e.style.display = "none";
    return false;
}
document.onkeydown = checkKeyDown;
function checkKeyDown(e) {
    var chr = e.which || e.keyCode;
    if (chr == 113) faceClick();
    if (chr == 80) doPause();
    if (chr == 72) doHint(e);
}
function doHint(e) {
    if (allowHints && !dead && !win && clockMoving && pointingAtX > -1) with (cellArray[arrayIndexOf(pointingAtX, pointingAtY)]) if ((!isExposed) && (!isFlagged) && (!isQuestion) && (!isMarked)) {
        if (isBomb) document.images[imageIndexOf(pointingAtX, pointingAtY)].src = bombShadow.src;
        else if (neighborBombs == 0) cellClick(pointingAtX, pointingAtY, e);
        else document.images[imageIndexOf(pointingAtX, pointingAtY)].src = cellShadowIm[neighborBombs].src;
        hints++;
    }
}
function doUnpause() {
    if (!dead && !win && !clockMoving && paused) {
        document.face.src = faceSmile.src;
        hidePause();
        clockStart();
    }
}
function doPause() {
    if (!dead && !win && clockMoving && !paused) {
        paused = true;
        clockStop();
        with (document.getElementById("divPause").style) {
            left = "7px";
            top = "67px";
            width = 16 * (maxX + 1) + "px";
            height = 16 * (maxY + 1) + "px";
            visibility = "visible";
        }
        document.face.src = faceWait.src;
    } else doUnpause();
}
function fuseStop() {
    hideDisarm();
    fuseBurning = false;
}
function acceptFate() {
    fuseStop();
    openCellDeath(disarmX, disarmY);
}
function ticFuse() {
    if (fuseBurning) {
        if (fuseRemaining <= 0) {
            if (!clockMoving) acceptFate();
        } else {
            let d1 = Math.floor(fuseRemaining / 10);
            let d2 = fuseRemaining % 10;
            document.getElementById("detonateCountdown").innerHTML = d1 + "." + d2;
            setTimeout("ticFuse()", 100);
        }
        fuseRemaining--;
    }
}
function disarmMine() {
    fuseStop();
    ++disarmed;
    ++bombsFlagged;
    updateNumBombs();
    with (cellArray[arrayIndexOf(disarmX, disarmY)]) {
        isFlagged = true;
        isDisarmed = true;
        isExposed = true;
    }
    document.images[imageIndexOf(disarmX, disarmY)].src = bombDisarmed.src;
    clockStart();
}
function showDisarm() {
    with (document.getElementById("divDisarm").style) {
        left = "7px";
        top = "67px";
        width = 16 * (maxX + 1) + "px";
        height = 16 * (maxY + 1) + "px";
        visibility = "visible";
        fuseRemaining = 30;
        fuseBurning = true;
        ticFuse();
        document.face.src = faceOoh.src;
    }
}
function zoomDoTransform() {
    var elem = document.getElementById("gamediv");
    elem.style.transform = "scale(" + zoomPower() + ")";
    setCookie("zoomLevel", zoomLevel);
    var elem2 = document.getElementById("container");
    elem2.style.width = gwidth() + "px";
    elem2.style.height = gheight() + "px";
    rsz();
}

function rsz() {
    var dim1 = document.getElementById("container").getBoundingClientRect();
    var dim2 = document.getElementById("content").getBoundingClientRect();
    var rt = document.body.scrollWidth - Math.min(dim1.left, dim2.left) + 10;
    var tp = dim1.top;
    var lt = Math.max(dim1.right, dim2.right) + 10;
    with (document.getElementById("leftpane").style) {
        top = tp + "px";
        right = rt + "px";
    }
    with (document.getElementById("rightpane").style) {
        top = tp + "px";
        left = lt + "px";
    }
}
window.onresize = rsz;
function cellTouch() {
    if (pointingAtX > -1) {
        if (cellArray[arrayIndexOf(pointingAtX, pointingAtY)].isExposed) cellClick(pointingAtX, pointingAtY, 1);
        else {
            if (!clockMoving) cellClick(pointingAtX, pointingAtY, 1);
            else cellClick(pointingAtX, pointingAtY, 2);
        }
    }
}
function openAll() {
    allOK = true;
    for (var i = 0; i <= maxX; i++) for (var j = 0; j <= maxY; j++) with (cellArray[arrayIndexOf(i, j)]) if (!isExposed) {
        if (isBomb && !isFlagged) {
            document.images[imageIndexOf(i, j)].src = bombDeath.src;
            allOK = false;
        } else if (!isBomb && isFlagged) document.images[imageIndexOf(i, j)].src = bombMisFlagged.src;
        else if (!isBomb) document.images[imageIndexOf(i, j)].src = cellOpenIm[neighborBombs].src;
    }
    return allOK;
}
function bombCountClick() {
    closeAllMenus();
    if (!dead && !win && openRemaining && maxNumBombs == bombsFlagged) {
        clockStop();
        numMoves++;
        openRemainingUsed = true;
        if (openAll()) {
            winShowWindow();
            updateNumBombs();
        } else {
            dead = true;
            updateNumBombs();
            document.face.src = faceDead.src;
        }
    }
    forceFocus();
    return false;
}
function launchGame() {
    n_maxX = document.getElementById("maxX").value;
    n_maxY = document.getElementById("maxY").value;
    n_maxNumBombs = document.getElementById("maxNumBombs").value;
    maxLegalBombs = Math.round(n_maxX * n_maxY / 3);
    if (isNaN(n_maxX) || n_maxX < 8 || n_maxX > 32 || isNaN(n_maxY) || n_maxY < 8 || n_maxY > 24 || isNaN(n_maxNumBombs) || n_maxNumBombs < 1 || n_maxNumBombs > maxLegalBombs) alert("Your Minesweeper dimensions are invalid:\n\tWidth: from 8 to 32\n\tHeight: from 8 to 24\n\tBombs: 1 to 1/3 of squares");
    else {
        setCookie("gameFormat", "Custom");
        maxX = n_maxX - 1;
        maxY = n_maxY - 1;
        maxNumBombs = n_maxNumBombs;
        setCookie("maxX", maxX);
        setCookie("maxY", maxY);
        setCookie("maxNumBombs", maxNumBombs);
        window.location.href = window.location.href;
    }
}
function reloadpersonalbest() {
    var bestBeginner = parseInt(getCookie("Beginner"), 10);
    if (isNaN(bestBeginner)) bestBeginner = 999;
    var bestIntermediate = parseInt(getCookie("Intermediate"), 10);
    if (isNaN(bestIntermediate)) bestIntermediate = 999;
    var bestExpert = parseInt(getCookie("Expert"), 10);
    if (isNaN(bestExpert)) bestExpert = 999;
    document.getElementById("bestBeginner").textContent = bestBeginner;
    document.getElementById("bestIntermediate").textContent = bestIntermediate;
    document.getElementById("bestExpert").textContent = bestExpert;
}
function scoresReset() {
    setCookie("Beginner", 999);
    setCookie("Intermediate", 999);
    setCookie("Expert", 999);
    reloadpersonalbest();
}
