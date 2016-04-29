<?php
function sql($link, $query, $variant = 1)
{

    ///////////////
    // DB Config //
    ///////////////

    // localhost joschka
    $db = "neos";

    // localhost felix
//    $server = "localhost";
//    $user = "root";
//    $pass = "";
//    $db = "afeefa_neos";


    /////////////
    // Connect //
    /////////////


    if (!$link) {
        die("<div class='error'>No connection to database! :(</div><br />");
    }

    mysqli_query($link, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
    $db_selected = mysqli_select_db($link, $db);
    if (!$db_selected) {
        die ("<div class='error'>Could not find data in the database... sorry :(</div><br />");
    } else {

        switch ($variant) {
            case 1:
                $result = mysqli_query($link, $query)
                or die ("<div class='error'>Be afraid: an error occurred while reading data. :(</div><br />" . mysqli_error($link));
                return $result;
                break;

            case 2:
                mysqli_query($link, $query)
                or die ("<div class='error'>We have a little bit of a situation here and some trouble to write your data to the database... sorry :(</div><br />" . mysql_error());
                return mysqli_insert_id($link);
                break;
        }
    }

    //mysqli_close($link);
    return true;
}