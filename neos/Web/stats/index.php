<?php
include('sql.php');
// header('Content-Type: application/json; charset=utf-8');

$languages =
	[
		'de',
		'en',
		'ar',
		'fa',
		'fr',
		'ru',
		'ps',
		'ku',
		'es',
		'sq',
		'sr',
		'ti',
		'tr',
		'ur'
	];

// entries gesamt
$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de'");
$entries_count = $result->num_rows;

// orgas gesamt
$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=0");
$orgas_count = $result->num_rows;

// events gesamt
$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=2");
$events_count = $result->num_rows;

// ads gesamt
$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=1");
$ads_count = $result->num_rows;
?>

<h1>Afeefa Statistics</h1>

<h2>Entries</h2>

<p>Gesamt: <?php echo $entries_count ?></p>
<p>Orgas: <?php echo $orgas_count ?></p>
<p>Events: <?php echo $events_count ?></p>
<p>Ads: <?php echo $ads_count ?></p>

<h2>Translations</h2>

<p><small>Statistik derzeit noch leicht verfälscht, da auch unveröffentlichte Übersetzungen gezählt werden. Die oben angegebene Gesamtanzahl aller Einträge (Orgas, Events, Ads) ist korrekt, hier werden nur veröffentlichte gezählt. Die Übersetzungen sind aber als separater Eintrag in der Datenbank immer unveröffentlicht und werden einfach ihrem deutschen Root Entry zugeordnet, der wiederum dann den published Status regelt. Man müsste korrekterweise also nur solche Translations zählen, deren zugehöriger deutscher Eintrag published ist. Man sieht den Fehler in der Übersetzungsabdeckung >100%</small></p>

<p><strong>Orgas</strong></p>
<?php
for($i=0;$i<count($languages);$i++){
	$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE type=0 AND locale='" .$languages[$i]. "'");

	echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$orgas_count*100) . "%)<br>";
} ?>

<p><strong>Events</strong></p>
<?php
for($i=0;$i<count($languages);$i++){
	$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE type=2 AND locale='" .$languages[$i]. "'");

	echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$events_count*100) . "%)<br>";
} ?>

<p><strong>Small ads (Börse)</strong></p>
<?php
for($i=0;$i<count($languages);$i++){
	$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE type=1 AND locale='" .$languages[$i]. "'");

	echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$ads_count*100) . "%)<br>";
} ?>
