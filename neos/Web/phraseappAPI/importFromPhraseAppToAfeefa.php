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


// $locales = ['ar', 'de', 'en', 'es', 'fa', 'fr', 'ku', 'ps', 'ru', 'sq', 'sr', 'ti', 'tr', 'ur'];
// WITHOUT DE!
$locales = ['ar', 'en', 'es', 'fa', 'fr', 'ku', 'ps', 'ru', 'sq', 'sr', 'ti', 'tr', 'ur'];

//////////////////////////////
// FETCH FROM PHRASEAPP API //
//////////////////////////////
foreach ($locales as $locale){
	
	echo '<h3>'.$locale.'</h3>';
	for($page = 1; $page <= 1000; $page++) {
		
		$response2 = $clientPhraseApp->request('GET', 'projects/' .$configPhraseApp['projects']['marketentry']['project_id']. '/locales/' . $locale . '/translations', array(
			'query' => [
				'access_token' => $configPhraseApp['projects']['marketentry']['accessToken']
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
		// die( var_dump($json) );

		if( count($json) < 1 ) break;

		foreach ($json as $key => $value){

			$entryId = explode(".", $value->key->name)[1];
			$attribute = explode(".", $value->key->name)[2];
			$translation = mysql_real_escape_string($value->content);

			$result1 = sql("select * from ddfa_main_domain_model_marketentry 
				where locale='" . $locale . "' AND entry_id='" . $entryId . "'");

			// if entry does not exist: create new translation
			if( intval($result1->num_rows) == 0 ) {
				// DO not create new entries in german
				if( $locale == 'de' ) continue;
				if( $translation == '' ) continue;

				$type_baseEntryDE = 666;

				// fetch necessary attributes from DE base entry
				$r_baseEntryDE = sql("select * from ddfa_main_domain_model_marketentry 
				where locale='de' AND entry_id='" . $entryId . "'");
				if( intval($r_baseEntryDE->num_rows) == 0 ) {
					echo 'warning: DE base entry missing';
				}
				else if( intval($r_baseEntryDE->num_rows) == 1 ) {
					while ($baseEntryDE = mysqli_fetch_object($r_baseEntryDE)) {
						$type_baseEntryDE = intval($baseEntryDE->type);
					}

					// create new entry
	    		$newUuid = createGuid();
					$result2 = sql("INSERT INTO ddfa_main_domain_model_marketentry SET
	                persistence_object_identifier = '" . $newUuid . "',
	                entry_id = '" . $entryId . "',
	                locale = '" . $locale . "',"
	                . $attribute . " = '" . $translation . "',
	                area = 'dresden',
	                created = now(),
	                updated = now(),
	                type = " . $type_baseEntryDE
	            );
	                
					// $result2 = sql("INSERT INTO ddfa_main_domain_model_marketentry 
					// 	(locale, entry_id, created, updated, " . $attribute . ") 
					// 	VALUES ('" .$locale. "','" .$entryId. "',now(),now(),'" .$translation. "')");
					echo $entryId . '.' . $attribute . ' > ' . $translation . ' :: '.$result2.'<br>';
				}
			}
			// if entry exists, update:
	    else if( intval($result1->num_rows) == 1 ) {
				$result3 = sql("update ddfa_main_domain_model_marketentry 
					set " . $attribute . "=convert('" . $translation . "'using utf8) 
					where locale='" . $locale . "' AND entry_id='" . $entryId . "'");
				echo $entryId . '.' . $attribute . ' > ' . $translation . ' :: '.$result3.'<br>';
			}
			// anything else: catch whatever went wrong when this happens
			else {
				echo 'warning: at least 2 translations with the same entryId and locale';
			}
			
		}

	}
	
}

$result4 = sql("DELETE FROM `ddfa_main_domain_model_marketentry` 
	WHERE (`name` = '' OR `name` IS NULL) 
	AND (`description` = ''  OR `description` IS NULL) 
	AND `locale` != 'de'");
echo "<h4>empty translations deleted (where name and desc is empty string, locale != de) :: " . $result4 . "</h4>";