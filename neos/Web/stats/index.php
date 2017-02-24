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

<p><?php echo $entries_count ?> <small>gesamt</small></p>
<p><?php echo $orgas_count ?> <small>Orgas</small></p>
<p><?php echo $events_count ?> <small>Events</small></p>
<p><?php echo $ads_count ?> <small>Ads</small></p>

<p><strong>zeitliche Entwicklung</strong></p>
<table>
<tr>
<td width="150">
	<p><small>Orgas</small></p>
	<?php
	// 2016 Januar bis November
	for($i=2;$i<=12;$i++){
		$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=0 AND created<'2016-0" .$i. "-01'");
		echo "2016-" . ($i-1) . ": " . $result->num_rows . "<br>";
	}

	// 2016 Dezember
	$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=0 AND created<'2017-01-01'");
		echo "2016-12: " . $result->num_rows . "<br>";

	// 2017 Januar bis November
	for($i=2;$i<=12;$i++){
		$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=0 AND created<'2017-0" .$i. "-01'");
		echo "2017-" . ($i-1) . ": " . $result->num_rows . "<br>";
	}
	?>
</td>
<td width="150">
	<p><small>Events</small></p>
	<?php
	// 2016 Januar bis November
	for($i=2;$i<=12;$i++){
		$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=2 AND created<'2016-0" .$i. "-01'");
		echo "2016-" . ($i-1) . ": " . $result->num_rows . "<br>";
	}

	// 2016 Dezember
	$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=2 AND created<'2017-01-01'");
		echo "2016-12: " . $result->num_rows . "<br>";

	// 2017 Januar bis November
	for($i=2;$i<=12;$i++){
		$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=2 AND created<'2017-0" .$i. "-01'");
		echo "2017-" . ($i-1) . ": " . $result->num_rows . "<br>";
	}
	?>
</td>
<td width="150">
	<p><small>Ads</small></p>
	<?php
	// 2016 Januar bis November
	for($i=2;$i<=12;$i++){
		$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=1 AND created<'2016-0" .$i. "-01'");
		echo "2016-" . ($i-1) . ": " . $result->num_rows . "<br>";
	}

	// 2016 Dezember
	$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=1 AND created<'2017-01-01'");
		echo "2016-12: " . $result->num_rows . "<br>";

	// 2017 Januar bis November
	for($i=2;$i<=12;$i++){
		$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=1 AND created<'2017-0" .$i. "-01'");
		echo "2017-" . ($i-1) . ": " . $result->num_rows . "<br>";
	}
	?>
</td>
</tr>
</table>

<h2>Translations</h2>

<p><small>Statistik derzeit noch leicht verfälscht, da auch unveröffentlichte Übersetzungen gezählt werden. Die oben angegebene Gesamtanzahl aller Einträge (Orgas, Events, Ads) ist korrekt, hier werden nur veröffentlichte gezählt. Die Übersetzungen sind aber als separater Eintrag in der Datenbank immer unveröffentlicht und werden einfach ihrem deutschen Root Entry zugeordnet, der wiederum dann den published Status regelt. Man müsste korrekterweise also nur solche Translations zählen, deren zugehöriger deutscher Eintrag published ist. Man sieht den Fehler in der Übersetzungsabdeckung >100%</small></p>

<table>
<tr>
<td width="150">
	<p><small>Orgas</small></p>
	<?php
	for($i=0;$i<count($languages);$i++){
		$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE type=0 AND locale='" .$languages[$i]. "'");

		echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$orgas_count*100) . "%)<br>";
	} ?>
</td>
<td width="150">
	<p><small>Events</small></p>
	<?php
	for($i=0;$i<count($languages);$i++){
		$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE type=2 AND locale='" .$languages[$i]. "'");

		echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$events_count*100) . "%)<br>";
	} ?>
</td>
<td width="150">
	<p><small>Ads</small></p>
	<?php
	for($i=0;$i<count($languages);$i++){
		$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE type=1 AND locale='" .$languages[$i]. "'");

		echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$ads_count*100) . "%)<br>";
	} ?>
</td>
</tr>
</table>
