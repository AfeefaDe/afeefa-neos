<?php
include('sql.php');

$locale = isset($_GET['locale']) && in_array($_GET['locale'], ['de', 'en', 'ar', 'ur', 'fr', 'it', 'ti', 'se', 'fa', 'ru']) ? $_GET['locale'] : false;
$type = isset($_GET['type']) && in_array($_GET['type'], ['initiative', 'marketentry', 'location']) ? $_GET['type'] : false;

if (!$locale) die("no or wrong locale, chose from 'de', 'en', 'ar', 'ur', 'fr', 'it', 'ti', 'se', 'fa', 'ru'.");
if (!$type) die("no or wrong type, chose from 'initiative', 'marketentry', 'location'.");

header('Content-Type: application/json; charset=utf-8');
header("Content-Disposition: attachment; filename=" . $type . "_" . date('Y_m_d', time()) . "_" . $locale . ".json");

if ($type == 'location')
    $result = sql("select entry_id as e, convert(cast(convert(name using utf8) as binary) using latin1) as n, convert(cast(convert(description using utf8) as binary) using latin1) as d, convert(cast(convert(openinghours using utf8) as binary) using latin1) as o, persistence_object_identifier as poid from ddfa_main_domain_model_" . $type . " where locale = '" . $locale . "'");
else
    $result = sql("select entry_id as e, convert(cast(convert(name using utf8) as binary) using latin1) as n, convert(cast(convert(description using utf8) as binary) using latin1) as d, persistence_object_identifier as poid from ddfa_main_domain_model_" . $type . " where locale = '" . $locale . "'");

$inis = array();
while ($i = mysql_fetch_object($result)) {
    if ($type == 'location')
        $inis[$i->e] = ['name' => $i->n, 'description' => $i->d, 'poid' => $i->poid, 'openinghours' => $i->o];
    else
        $inis[$i->e] = ['name' => $i->n, 'description' => $i->d, 'poid' => $i->poid];
}

echo json_encode(array($type => $inis), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);