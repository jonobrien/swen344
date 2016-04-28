<?php

$json = file_get_contents("info.txt");

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