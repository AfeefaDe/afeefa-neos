<?php
function sql($request, $variant = 1)
{

    ///////////////
    // DB Config //
    ///////////////

    // localhost joschka
    $server = "localhost";
    $user = "dude";
    $pass = "";
    $db = "neos";

    // localhost felix
//    $server = "localhost";
//    $user = "root";
//    $pass = "";
//    $db = "afeefa_neos";


    /////////////
    // Connect //
    /////////////

    $link = mysql_connect($server, $user, $pass);
    if (!$link) {
        die("<div class='error'>No connection to database! :(</div><br />");
    }

    mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);
    $db_selected = mysql_select_db($db, $link);
    if (!$db_selected) {
        die ("<div class='error'>Could not find data in the database... sorry :(</div><br />");
    } else {

        switch ($variant) {
            case 1:
                $result = mysql_query($request)
                or die ("<div class='error'>Be afraid: an error occurred while reading data. :(</div><br />" . mysql_error());
                return $result;
                break;

            case 2:
                mysql_query($request)
                or die ("<div class='error'>We have a little bit of a situation here and some trouble to write your data to the database... sorry :(</div><br />" . mysql_error());
                return mysql_insert_id();
                break;
        }
    }

    mysql_close($link);
    return true;
}