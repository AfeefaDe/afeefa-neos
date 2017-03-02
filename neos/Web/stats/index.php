<!-- CSS -->
<style>
body {
	font-family: sans-serif;
}
.dataPrint {display: none;}
</style>

<!-- script includes -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/chart.js/dist/Chart.js"></script>


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

<?php
$times = [
	"2015-05-31",
	"2015-06-31",
	"2015-07-31",
	"2015-08-31",
	"2015-09-31",
	"2015-10-31",
	"2015-11-31",
	"2015-12-31",
	"2016-01-31",
	"2016-02-31",
	"2016-03-31",
	"2016-04-31",
	"2016-05-31",
	"2016-06-31",
	"2016-07-31",
	"2016-08-31",
	"2016-09-31",
	"2016-10-31",
	"2016-11-31",
	"2016-12-31",
	"2017-01-31",
	"2017-02-31",
	"2017-03-31",
	"2017-04-31",
	"2017-05-31",
	"2017-06-31"
];

// orga trend
$data_orga_trend = [];
for($i=0;$i<count($times);$i++){
	$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=0 AND created<='" .$times[$i]. "'");
	array_push($data_orga_trend,$result->num_rows);
}

// event trend
$data_orga_event = [];
for($i=0;$i<count($times);$i++){
	$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=2 AND created<='" .$times[$i]. "'");
	array_push($data_orga_event,$result->num_rows);
}

// ad trend
$data_orga_ad = [];
for($i=0;$i<count($times);$i++){
	$result = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE published=1 AND locale='de' AND type=1 AND created<='" .$times[$i]. "'");
	array_push($data_orga_ad,$result->num_rows);
}
?>

<span class="dataPrint" id="data_entryTrend_labels">
	<?php echo implode(",",$times) ?>
</span>
<span class="dataPrint" id="data_trend_orga">
	<?php echo implode(",",$data_orga_trend) ?>
</span>
<span class="dataPrint" id="data_trend_event">
	<?php echo implode(",",$data_orga_event) ?>
</span>
<span class="dataPrint" id="data_trend_ad">
	<?php echo implode(",",$data_orga_ad) ?>
</span>

<canvas id="entriesTrend" width="600" height="400"></canvas>

<script>
var ctx = $("#entriesTrend");
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
    	labels: $('#data_entryTrend_labels').text().split(","),
    	datasets: [
        {
            label: "Number of Orgas",
            fill: false,
            lineTension: 0.1,
            // backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgb(63, 127, 191)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgb(63, 127, 191)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            // pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: $('#data_trend_orga').text().split(","),
            spanGaps: false
        },
        {
            label: "Number of Events",
            fill: false,
            lineTension: 0.1,
            // backgroundColor: "rgba(10,112,60,0.4)",
            borderColor: "rgb(178, 76, 76)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgb(178, 76, 76)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            // pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: $('#data_trend_event').text().split(","),
            spanGaps: false
        },
        {
            label: "Number of Ads",
            fill: false,
            lineTension: 0.1,
            // backgroundColor: "rgba(10,10,60,0.4)",
            borderColor: "rgb(223, 223, 62)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgb(223, 223, 62)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            // pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: $('#data_trend_ad').text().split(","),
            spanGaps: false
        }
    ]
    },
    options: {
    	responsive: false
    }
});	
</script>

<h2>Translations</h2>

<?php
$data_orga_translations = [];
for($i=0;$i<count($languages);$i++){
	$result = sql("SELECT translation.name, translation.locale, root.name, root.locale FROM `ddfa_main_domain_model_marketentry` AS translation INNER JOIN `ddfa_main_domain_model_marketentry` AS root ON translation.entry_id=root.entry_id WHERE root.locale='de' AND root.published=1 AND translation.type=0 AND translation.locale='" .$languages[$i]. "'");
	array_push($data_orga_translations,$result->num_rows);

	// echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$orgas_count*100) . "%)<br>";
} ?>

<span class="dataPrint" id="data_translations_labels">
	<?php echo implode(",",$languages) ?>
</span>
<span class="dataPrint" id="data_translations_orga">
	<?php echo implode(",",$data_orga_translations) ?>
</span>

<canvas id="translationCoverage" width="600" height="400"></canvas>

<script>
var ctx = $("#translationCoverage");
var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
    	labels: $('#data_translations_labels').text().split(","),
	    datasets: [
	        {
	            label: "Orgas",
	            backgroundColor: [
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)',
	                'rgba(63, 127, 191, 0.2)'
	            ],
	            borderColor: [
	                'rgba(63, 127, 191,1)',
	                'rgba(63, 127, 191,1)',
	                'rgba(63, 127, 191,1)',
	                'rgba(63, 127, 191,1)',
	                'rgba(63, 127, 191,1)',
	                'rgba(63, 127, 191,1)'
	            ],
	            borderWidth: 1,
	            data: $('#data_translations_orga').text().split(","),
	        },
	        {
	            label: "Events",
	            backgroundColor: [
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)',
	                'rgba(178, 76, 76, 0.2)'
	            ],
	            borderColor: [
	                'rgba(178, 76, 76,1)',
	                'rgba(178, 76, 76,1)',
	                'rgba(178, 76, 76,1)',
	                'rgba(178, 76, 76,1)',
	                'rgba(178, 76, 76,1)',
	                'rgba(178, 76, 76,1)'
	            ],
	            borderWidth: 1,
	            data: [15, 30, 150]
	        }
	    ]
    },
    options: {
    	responsive: false
    }
});
</script>

<table>
<tr>
<td width="150">
	<p><small>Orgas</small></p>
	<?php
	for($i=0;$i<count($languages);$i++){
		$result = sql("SELECT translation.name, translation.locale, root.name, root.locale FROM `ddfa_main_domain_model_marketentry` AS translation INNER JOIN `ddfa_main_domain_model_marketentry` AS root ON translation.entry_id=root.entry_id WHERE root.locale='de' AND root.published=1 AND translation.type=0 AND translation.locale='" .$languages[$i]. "'");

		echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$orgas_count*100) . "%)<br>";
	} ?>
</td>
<td width="150">
	<p><small>Events</small></p>
	<?php
	for($i=0;$i<count($languages);$i++){
		$result = sql("SELECT translation.name, translation.locale, root.name, root.locale FROM `ddfa_main_domain_model_marketentry` AS translation INNER JOIN `ddfa_main_domain_model_marketentry` AS root ON translation.entry_id=root.entry_id WHERE root.locale='de' AND root.published=1 AND translation.type=2 AND translation.locale='" .$languages[$i]. "'");

		echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$events_count*100) . "%)<br>";
	} ?>
</td>
<td width="150">
	<p><small>Ads</small></p>
	<?php
	for($i=0;$i<count($languages);$i++){
		$result = sql("SELECT translation.name, translation.locale, root.name, root.locale FROM `ddfa_main_domain_model_marketentry` AS translation INNER JOIN `ddfa_main_domain_model_marketentry` AS root ON translation.entry_id=root.entry_id WHERE root.locale='de' AND root.published=1 AND translation.type=1 AND translation.locale='" .$languages[$i]. "'");

		echo $languages[$i] . ": " . $result->num_rows . " (" . round($result->num_rows/$ads_count*100) . "%)<br>";
	} ?>
</td>
</tr>
</table>
