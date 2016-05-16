<?php
include('sql.php');
$server = "localhost";
$user = "dude";
$pass = "";
$link = mysqli_connect($server, $user, $pass);

$r1 = sql($link, "SELECT a.persistence_object_identifier as p, b.entry_id as e
                    FROM ddfa_main_domain_model_marketentry a INNER JOIN ddfa_main_domain_model_marketentry b
                        ON a.parent_entry_id = b.persistence_object_identifier
                    WHERE a.locale != b.locale");

while ($m = mysqli_fetch_object($r1)) {
    $r2 = sql($link, "select persistence_object_identifier as id from ddfa_main_domain_model_marketentry where entry_id = '" . $m->e . "' and locale = 'de'");
    $n = mysqli_fetch_object($r2);
    sql($link, "update ddfa_main_domain_model_marketentry set parent_entry_id = '" . $n->id . "' where persistence_object_identifier = '" . $m->p . "'");
}
mysqli_close($link);
