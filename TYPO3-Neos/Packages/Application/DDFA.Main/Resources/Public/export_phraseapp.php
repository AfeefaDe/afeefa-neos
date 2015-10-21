<?php
include('sql.php');

$locale = in_array($_GET['locale'], ['de', 'en', 'ar', 'ur', 'fr', 'it', 'ti', 'se', 'fa', 'ru']) ? $_GET['locale'] : false;

if (!$locale) die('wrong or no locale');

//header('Content-Type: application/json; charset=utf-8');
//header("Content-Disposition: attachment; filename=".date('Y_m_d', time())."_phraseappexport_".$locale.".json");

/*$output = fopen('php://output', 'w');

fputcsv($output, array('entryID', 'Typ', 'Name', 'Orga', 'Beschreibung', 'Oeffnungszeiten'));

$result = sql("select l.entry_id, l.type, l.name, i.name, l.description, l.openinghours
from ddfa_main_domain_model_location as l, ddfa_main_domain_model_initiative as i
where l.initiative_id = i.persistence_object_identifier and i.locale = 'de' and l.locale = 'de' and l.type = '0'
      and (l.description IS NULL or l.description = '') and (i.description IS NULL or i.description = '')");

while ($row = mysql_fetch_row($result)) fputcsv($output, $row);*/

$result = sql("select i.entry_id as e, CAST(i.name AS CHAR CHARACTER SET utf8) as n, i.description as d, i.persistence_object_identifier as id
from ddfa_main_domain_model_initiative as i
where i.locale = '" . $locale . "'");

$inis = array();
while ($i = mysql_fetch_object($result)) {
    $inis[$i->e] = ['name' => $i->n, 'description' => $i->d, 'id' => $i->id];
}

var_dump($inis);

echo json_encode(array('initiatives' => $inis), JSON_UNESCAPED_UNICODE);

echo json_last_error_msg();