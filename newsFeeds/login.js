
/* This script and many more are available free online at
The JavaScript Source :: http://www.javascriptsource.com
Created by: Patrick Clinger :: http://www.freewebs.com/google_game/ */

function lastVisit() {
  var lastvisit=new Object()
  lastvisit.firstvisitmsg="This is your first visit to this page. Welcome!" //Change first visit message here
  lastvisit.subsequentvisitmsg="Welcome back visitor! Your last visit was on <b>[displaydate]</b>" // Change subsequent visit message here

  lastvisit.getCookie=function(Name) { // get cookie value
    var re=new RegExp(Name+"=[^;]+", "i"); // construct RE to search for target name/value pair
    if (document.cookie.match(re)) // if cookie found
      return document.cookie.match(re)[0].split("=")[1] // return its value
      return ""
  }
  lastvisit.setCookie=function(name, value, days) { // set cookie value
    var expireDate = new Date()
    //set "expstring" to either future or past date, to set or delete cookie, respectively
    var expstring=expireDate.setDate(expireDate.getDate()+parseInt(days))
    document.cookie = name+"="+value+"; expires="+expireDate.toGMTString()+"; path=/";
  }

  lastvisit.showmessage=function() {
  if (lastvisit.getCookie("visitcounter")=="") { // if first visit
    lastvisit.setCookie("visitcounter", 2, 730) // set "visitcounter" to 2 and for 730 days (2 years)
    document.getElementById('loggedInLast').innerHTML=(lastvisit.firstvisitmsg)
  } else
    document.getElementById('loggedInLast').innerHTML=(lastvisit.subsequentvisitmsg.replace("\[displaydate\]", new Date().toLocaleString()))
  }
  lastvisit.showmessage()
}

function login(name, pw) {
	// if returning user
	// last visit
	console.log(name);
	console.log(pw);
	
}


function loginCheck (divID) {
	console.log(divID);
	$('#weatherRSS, #bbcRSS, #espnRSS').on('click', function() {
		// not logged in
		if (localStorage.getItem('loggedIn') === undefined ) {
			console.log('login check on menu');
			
			// call login dropdown to allow logging in
		}
		else { // logged in
			console.log('else')
			if (divID == 'weather' ) {
				getRSS("http://rss.weather.com/rss/national/rss_nwf_rss.xml?cm_ven=NWF&cm_cat=rss&par=NWF_rss");
			}
			else if (divID == 'bbc') {
				getRSS("http://feeds.bbci.co.uk/news/system/latest_published_content/rss.xml");
			}
			else if (divID == 'espn' ) {
				getRSS("http://espn.go.com/espn/rss/news");
			}
			console.log('innerhtml');
			lastVisit()
		}
		});
	};

