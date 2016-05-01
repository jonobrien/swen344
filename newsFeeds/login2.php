<?php

$json = <<< JSON
{
    "users": {
    
        "Jennifer": {
            "pw":"plaintext",
			"favorites":[
				{"cat":"thelinkhere",
				"dog":"secondfavoritedInfoHere"
				}
			]
        },
        "James": {
            "status":"Active",
            "age":56,
            "count":10,
            "progress":0.0029857,
            "bad":0
        }
    }
}

JSON;

$jsonIterator = new RecursiveIteratorIterator(
    new RecursiveArrayIterator(json_decode($json, TRUE)),
    RecursiveIteratorIterator::SELF_FIRST);

foreach ($jsonIterator as $key => $val) {
    if(is_array($val)) {
        echo "";
        echo nl2br("$key: ---> $val \n");
    } else {
        echo nl2br("$key => $val\n");
    }
}

?>