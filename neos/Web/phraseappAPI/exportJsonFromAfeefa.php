<?php
include('sql.php');

$locale = isset($_GET['locale']) && in_array($_GET['locale'], ['ar', 'de', 'en', 'es', 'fa', 'fr', 'ku', 'ps', 'ru', 'sq', 'sr', 'ti', 'tr', 'ur']) ? $_GET['locale'] : false;
$type = isset($_GET['type']) && in_array($_GET['type'], ['initiative', 'marketentry', 'location']) ? $_GET['type'] : false;

if (!$locale) die("no or wrong locale");
if (!$type) die("no or wrong type");

header('Content-Type: application/json; charset=utf-8');
header("Content-Disposition: attachment; filename=" . $type . "_" . date('Y_m_d', time()) . "_" . $locale . ".json");

if ($type == 'location') {
    $result = sql("select entry_id as eid,
        convert(cast(convert(name using utf8) as binary) using latin1) as n,
        convert(cast(convert(description using utf8) as binary) using latin1) as des,
        convert(cast(convert(openinghours using utf8) as binary) using latin1) as oh,
        persistence_object_identifier as poid
        from ddfa_main_domain_model_" . $type . "
        where locale = '" . $locale . "'");
} else {
    // $result = sql("select entry_id as eid,
    //     convert(cast(convert(name using utf8) as binary) using latin1) as n,
    //     convert(cast(convert(description using utf8) as binary) using latin1) as des,
    //     persistence_object_identifier as poid
    //     from ddfa_main_domain_model_" . $type . "
    //     where locale = '" . $locale . "'");
    $result = sql("select entry_id as eid,
        cast(convert(name using utf8) as binary) as n,
        cast(convert(description using utf8) as binary) as des,
        persistence_object_identifier as poid
        from ddfa_main_domain_model_" . $type . "
        where locale = '" . $locale . "' and area = 'dresden'");
}

$objects = [];
while ($object = mysqli_fetch_object($result)) {
    unset($arr);
    $arr['poid'] = $object->poid;

    if ($type == 'location' && isset($object->oh) && $object->oh != "")
        $arr['openinghours'] = $object->oh;
    if (isset($object->n) && $object->n != "")
        $arr['name'] = $object->n;
    if (isset($object->des) && $object->des != "")
        $arr['description'] = $object->des;

    if (sizeof($arr) > 1)
        $objects[$object->eid] = $arr;
}

echo json_encode(['entry' => $objects], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);
// echo json_encode([$type => $objects], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);