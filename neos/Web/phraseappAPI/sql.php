<?php
function sql($query, $variant = 1) {
    
    ///////////////
    // DB Config //
    ///////////////

    // localhost joschka
    // $server = "localhost";
    // $user = "dude";
    // $pass = "";
    // $db = "neos";

    // localhost felix
    // $server = "localhost";
    // $user = "root";
    // $pass = "";
    // $db = "afeefa_neos_new";

    // uberspace
    $server = "localhost";
    $user = "afeefa";
    $pass = "eeceiNg4achaiyeing";
    $db = "afeefa_neos_live";

    /////////////
    // Connect //
    /////////////
    
    $link = mysqli_connect($server, $user, $pass);
    if (!$link) {
        die("<div class='error'>No connection to database! :(</div><br />");
    }
    mysqli_set_charset($link, 'utf8');

    $db_selected = mysqli_select_db($link, $db);
    if (!$db_selected) {
        die ("<div class='error'>Could not find data in the database... sorry :(</div><br />");
    }

    else {

        switch ($variant) {
            case 1:
                $result = mysqli_query($link, $query)
                or die ("<div class='error'>Be afraid: an error occurred while reading data. :(</div><br />".mysqli_error($link).'<br>query: '.$query);
                return $result;
                break;

            case 2:
                mysqli_query($link, $query)
                or die ("<div class='error'>We have a little bit of a situation here and some trouble to write your data to the database... sorry :(</div><br />".mysqli_error($link));
                return mysqli_insert_id($link);
                break;
        }
    }

    mysqli_close($link);
    return true;
}

// Utility functions
function createGuid()
{
    if (function_exists('com_create_guid') === true) {
        return trim(com_create_guid(), '{}');
    }

    return strtolower(sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535)));
}