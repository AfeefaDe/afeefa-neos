<?php
include('sql.php');
$server = "localhost";
$user = "dude";
$pass = "";
$link = mysqli_connect($server, $user, $pass);

$r = sql($link, "SELECT
   persistence_object_identifier AS poi
FROM ddfa_main_domain_model_marketentry a
WHERE a.locale != 'de' AND a.description = '' AND a.name = ''");

while ($m = mysqli_fetch_object($r)) {
    sql($link, "DELETE FROM ddfa_main_domain_model_marketentry WHERE persistence_object_identifier = '" . $m->poi . "'");
}

$r = sql($link, "SELECT
   persistence_object_identifier AS poi
FROM ddfa_main_domain_model_location a
WHERE a.locale != 'de' AND a.arrival = '' AND a.openinghours = '' AND a.placename = ''");

while ($l = mysqli_fetch_object($r)) {
    sql($link, "DELETE FROM ddfa_main_domain_model_location WHERE persistence_object_identifier = '" . $l->poi . "'");
}

mysqli_close($link);
