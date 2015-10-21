<?php
include('sql.php');

$locale = isset($_GET['locale']) && in_array($_GET['locale'], ['de', 'en', 'ar', 'ur', 'fr', 'it', 'ti', 'sr', 'fa', 'ru']) ? $_GET['locale'] : false;
$type = isset($_GET['type']) && in_array($_GET['type'], ['initiative', 'marketentry', 'location']) ? $_GET['type'] : false;

if (!$locale) die("no or wrong locale, chose from 'de', 'en', 'ar', 'ur', 'fr', 'it', 'ti', 'sr', 'fa', 'ru'.");
if (!$type) die("no or wrong type, chose from 'initiative', 'marketentry', 'location'.");

header('Content-Type: application/json; charset=utf-8');
header("Content-Disposition: attachment; filename=" . $type . "_" . date('Y_m_d', time()) . "_" . $locale . ".json");

if ($type == 'location') {
    $result = sql("select entry_id as eid,
        convert(cast(convert(name using utf8) as binary) using latin1),
        convert(cast(convert(description using utf8) as binary) using latin1) as des,
        convert(cast(convert(openinghours using utf8) as binary) using latin1) as oh,
        persistence_object_identifier as poid
        from ddfa_main_domain_model_" . $type . "
        where locale = '" . $locale . "'");
} else {
    $result = sql("select entry_id as eid,
        convert(cast(convert(name using utf8) as binary) using latin1),
        convert(cast(convert(description using utf8) as binary) using latin1) as des,
        persistence_object_identifier as poid
        from ddfa_main_domain_model_" . $type . "
        where locale = '" . $locale . "'");
}

$objects = [];
while ($object = mysql_fetch_object($result)) {
    $arr['poid'] = $object->poid;


    if ($type == 'location' && isset($object->oh) && $object->oh != "")
        $arr['openinghours'] = $object->oh;
    if (isset($object->name) && $object->name != "")
        $arr['name'] = $object->name;
    if (isset($object->des) && $object->des != "")
        $arr['description'] = $object->des;

    if (sizeof($arr) > 1)
        $objects[$object->eid] = $arr;
}

echo json_encode([$type => $objects], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);