<?php
include('sql.php');

header('Content-Type: text/csv; charset=utf-8');
header("Content-Disposition: attachment; filename=".date('Y_m_d', time())."_export_ini_de.csv");

$output = fopen('php://output', 'w');

fputcsv($output, array('entryID', 'Typ', 'Name', 'Orga', 'Beschreibung', 'Oeffnungszeiten'));

$result = sql("select l.entry_id, l.type, l.name, i.name, l.description, l.openinghours
from ddfa_main_domain_model_location as l, ddfa_main_domain_model_initiative as i
where l.initiative_id = i.persistence_object_identifier and i.locale = 'de' and l.locale = 'de' and l.type = '0'
      and (l.description IS NULL or l.description = '') and (i.description IS NULL or i.description = '')");

while ($row = mysql_fetch_row($result)) fputcsv($output, $row);