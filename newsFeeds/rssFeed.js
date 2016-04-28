// remove the posts before adding new ones 
		// for each different rss feed click
		function clean() {
			var list = document.getElementById("feedBase");
			var MAX_ELEMENTS = 3; // base menu has 5 items
			while (MAX_ELEMENTS < list.childNodes.length) {
				list.removeChild(list.childNodes[MAX_ELEMENTS]);
			}
		}
	
		// load the feeds
		google.load("feeds", "1");
		function initialize(urlString) {
		  var feed = new google.feeds.Feed(urlString);
		  feed.setNumEntries(20); // get X entries TODO -- dynamically get more....
		  feed.load(function(result) {
			if (!result.error) {
			  var container = document.getElementById("feed");
			  //$('#feed').empty(); // clear content on new feed selection
			  clean()
			  for (var i = 0; i < result.feed.entries.length; i++) {
				var entry = result.feed.entries[i];
				var entryStr = '<div class="ui segment attached"><div class="basic ui item icon"><a target="blank" href="'
					+ entry.link + '"><i class="linkify icon"></i></a>&nbsp;&nbsp;' + entry.title + '</div></div>';
				console.log(entryStr);
				var div = $(entryStr);
				//div.appendChild(document.createTextNode(entry.title));
				$('#feedBase').append(div);
			  }
			}
		  });
		}
		google.setOnLoadCallback(initialize);