<?php
include('sql.php');
$server = "localhost";
$user = "dude";
$pass = "";
$link = mysqli_connect($server, $user, $pass);

$r = sql($link, "select convert(cast(convert(persistence_object_identifier USING utf8) AS BINARY) USING latin1) AS poi,
                convert(cast(convert(parent_entry_id USING utf8) AS BINARY) USING latin1) AS pei
                from ddfa_main_domain_model_marketentry where parent_entry_id is not null and name = '' and description = ''");

while ($m = mysqli_fetch_object($r)) {
    sql($link, "update ddfa_main_domain_model_location set market_entry_id = '" . $m->pei . "' where market_entry_id = '" . $m->poi . "'");

    sql($link, "delete from ddfa_main_domain_model_marketentry where persistence_object_identifier = '" . $m->poi . "'");
}

mysqli_close($link);
