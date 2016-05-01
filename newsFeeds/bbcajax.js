E = false;

// global request and XML document objects
var req;

//MAIN TICKER FUNCTION
//SET PREFERENCE VARIABLES
var myTimer;
var theCharacterTimeout = 50;
var theStoryTimeout = 5000;
// Ticker startup function
function startTicker() {
    //clear the ticker timer
    window.clearTimeout(myTimer);
    // Define run time values
    //Feed Name
    document.getElementById("whichFeed").innerHTML = '<small><a href="' + req.responseXML.getElementsByTagName("link")[0].firstChild.nodeValue + '">' + req.responseXML.getElementsByTagName("title")[0].firstChild.nodeValue + '<\/a><\/small>';
    //Feed Date
    document.getElementById("feedDate").innerHTML = '<small>' + req.responseXML.getElementsByTagName("lastBuildDate")[0].firstChild.nodeValue + '<\/small>';
    //Get the Items array
    items = req.responseXML.getElementsByTagName("item");
    theItemCount = items.length;
    theCurrentStory = -1;
    theCurrentLength = 0;
    // Locate base objects
    if (document.getElementById) {
            //Write the anchor text for the ticker
            document.getElementById("details").innerHTML = '<h3><a id="tickerAnchor" href="#"><\/a><\/h3><p><span id="tickerStory"><\/span><\/p>';
            theAnchorObject = document.getElementById("tickerAnchor");
            theStoryObject = document.getElementById("tickerStory");
            runTheTicker();
        } else {
            return true;
    }
}

// Ticker main run loop function
function runTheTicker() {
    var myTimeout;
    // Go for the next story data block
    if(theCurrentLength == 0) {
        theCurrentStory++;
        theCurrentStory = theCurrentStory % theItemCount;
        
        theStoryHeader = getElementTextNS("", "title", items[theCurrentStory], 0);
        theStorySummary = getElementTextNS("", "description", items[theCurrentStory], 0);
        theTargetLink = getElementTextNS("", "link", items[theCurrentStory], 0);

        theAnchorObject.innerHTML = theStoryHeader;
        theAnchorObject.href = theTargetLink;

    }
    // Stuff the current ticker text into the anchor
    theStoryObject.innerHTML = theStorySummary.substring(0,theCurrentLength);
    // Modify the length for the substring and define the timer
    if(theCurrentLength < theStorySummary.length) {
        theCurrentLength++;
        myTimeout = theCharacterTimeout;
    } else {
        theCurrentLength = 0;
        myTimeout = theStoryTimeout;
    }
    // Call up the next cycle of the ticker
    myTimer = window.setTimeout("runTheTicker()", myTimeout);
}

// retrieve XML document (reusable generic function);
function loadXMLDoc(url) {
    // Display loading flag
    startLoadFlag();
    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.onreadystatechange = processReqChange;
        req.open("GET", url, true);
		req.setRequestHeader( 'Access-Control-Allow-Origin ', '*');
        req.send(null);
    // branch for IE/Windows ActiveX version
    } else if (window.ActiveXObject) {
        isIE = true;
        req = new ActiveXObject("Microsoft.XMLHTTP");
        if (req) {
            req.onreadystatechange = processReqChange;
            req.open("GET", url, true);
            req.send();
        }
    }
}

// handle onreadystatechange event of req object
function processReqChange() {
    // only if req shows "loaded"
    if (req.readyState == 4) {
        // only if "OK"
        if (req.status == 200) {
            stopLoadFlag();
            startTicker();
        } else {
            // Stop displaying loading flag
            stopLoadFlag();
            alert("There was a problem retrieving the XML data:\n" + req.statusText);
        }
    }
}

// DISPLAY LOADING ANIMATION
function startLoadFlag() {
    document.getElementById('details').innerHTML = '<p id="LoadMsg"><img src="g/loadani.gif" alt="" width="50" height="50" /><\/p>';
}

// HIDE LOADING ANIMATION
function stopLoadFlag() {
    document.getElementById('details').innerHTML = "";
}

// retrieve text of an XML document element, including
// elements using namespaces
function getElementTextNS(prefix, local, parentElem, index) {
    var result = "";
    if (prefix && isIE) {
        // IE/Windows way of handling namespaces
        result = parentElem.getElementsByTagName(prefix + ":" + local)[index];
    } else {
        // the namespace versions of this method
        // (getElementsByTagNameNS()) operate
        // differently in Safari and Mozilla, but both
        // return value with just local name, provided
        // there aren't conflicts with non-namespace element names
        result = parentElem.getElementsByTagName(local)[index];
    }
    if (result) {
        // get text, accounting for possible
        // whitespace (carriage return) text nodes
        if (result.childNodes.length > 1) {
            return result.childNodes[1].nodeValue;
        } else {
            return result.firstChild.nodeValue;
        }
    } else {
        return "n/a";
    }
}
