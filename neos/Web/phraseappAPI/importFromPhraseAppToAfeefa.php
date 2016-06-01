<?php
include('sql.php');

require 'vendor/autoload.php';
use GuzzleHttp\Client;

///////////
// SETUP //
///////////
$dev = true;

$configPhraseApp = array(
	'projects' => [
		'marketentry' => [
			'project_id' => $dev ? '26a2226676a2c292ab0bcf8c8adc9e42' : 'e989a075962418d0e05398d2fc107265',
			'accessToken' => 'a1bf71362733ee24d1b170b33f9f067ebbc8b15695dbd4e6c6710f96d9b8b80a'
		]
	]
);

$clientPhraseApp = new Client([
	// Base URI is used with relative requests
	'base_uri' => 'https://api.phraseapp.com/api/v2/',
	// You can set any number of default request options.
	'timeout'  => 2.0,
	"verify" => false
]);


$locales = ['ar', 'de', 'en', 'es', 'fa', 'fr', 'ku', 'ps', 'ru', 'sq', 'sr', 'ti', 'tr', 'ur'];
$types = ['marketentry'];

//////////////////////////////
// FETCH FROM PHRASEAPP API //
//////////////////////////////
foreach ($types as $type){
	foreach ($locales as $locale){
		
		echo '<h3>'.$locale.'</h3>';
		for($page = 1; $page <= 1000; $page++) {
			
			$response2 = $clientPhraseApp->request('GET', 'projects/' .$configPhraseApp['projects'][$type]['project_id']. '/locales/' . $locale . '/translations', array(
				'query' => [
					'access_token' => $configPhraseApp['projects'][$type]['accessToken']
				],
				'multipart' => array(
					[
						'name'     => 'q',
						'contents' => ''
						// 'contents' => 'unverified:true'
					],
					[
						'name'     => 'page',
						'contents' => strval($page)
					]
				)
			));

			// echo $response2->getBody();

			$json = json_decode( $response2->getBody());
			// var_dump($json);
			if( count($json) < 1 ) break;

			foreach ($json as $key => $value){

				$entryId = explode(".", $value->key->name)[1];
				$attribute = explode(".", $value->key->name)[2];
				$translation = mysql_real_escape_string($value->content);

				$result = sql("update ddfa_main_domain_model_" . $type . "
					set " . $attribute . "=convert('" . $translation . "'using utf8)
					where locale='" . $locale . "' AND entry_id='" . $entryId . "'");
				echo $entryId . ' > ' . $translation . ' ('.$result.')<br>';
			}

		}
		
	}
}