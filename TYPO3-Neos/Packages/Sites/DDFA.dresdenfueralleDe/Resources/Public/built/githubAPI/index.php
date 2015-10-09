<?php

// see https://github.com/tan-tan-kanarek/github-php-client/blob/master/client.md
require_once('github-php-client-master/client/GitHubClient.php');

$username = 'felixkamille';
$password = 'Feli-0411';

var_dump($_POST);

if(isset($_POST)){

	$client = new GitHubClient();
	$client->setCredentials($username, $password);
	
	$owner = 'foobar0112';
	$repo = 'dd4all-website';

	$title = $body = '';
	$assignee = $milestone = $labels = null;

	// normal feedback
	if($_POST['type'] == 'feedback'){
		
		$title = "Feedback von " . $_POST['data']['author'];
		
		$body .= "- [ ] geantwortet\n";
		$body .= "- [ ] abgeschlossen\n\n";
		
		$body .= $_POST['data']['author'] . " (" . $_POST['data']['mail'] . ") schrieb:\n";

		$body .= "```\n" . $_POST['data']['message'] . "\n```" . "\n\n";
		
		$body .= "_" . $_POST['metadata'] . "_";
		
		$labels = array("feedback");
	}
	// offer/request (MarketEntry)
	else if($_POST['type'] == 'marketentry'){

		
		$title_type = filter_var($_POST['data']['offer'], FILTER_VALIDATE_BOOLEAN) ? "Angebot" : "Gesuch";
		$title = $title_type . " von " . $_POST['data']['speakerPublic'];
		
		$body .= "- [ ] technisch geprüft\n";
		$body .= "- [ ] inhaltlich geprüft\n";
		$body .= "- [ ] Rückfragen an AutorIn gestellt (optional)\n";
		$body .= "- [ ] veröffentlicht\n";
		$body .= "- [ ] AutorIn benachrichtigt\n";
		$body .= "- [ ] durch AutorIn bestätigt (optional)\n";
		$body .= "- [ ] gepostet auf fb o.ä. (optional)\n\n";
		
		$body .= "__" . $_POST['data']['speakerPublic'] . " (" . $_POST['data']['mail'] . ") hat folgendes " . $title_type . ":__\n";

		$body .= "#### " . ($_POST['data']['name'] ? $_POST['data']['name'] : "-") . "\n";
		$body .= "```\n" . ($_POST['data']['description'] ? $_POST['data']['description'] : " ") . "\n```\n";
		$body .= "Kontaktperson: `" . ($_POST['data']['speakerPublic'] ? $_POST['data']['speakerPublic'] : " ") . "`\n";
		$body .= "Sprachen: `" . ($_POST['data']['spokenLanguages'] ? $_POST['data']['spokenLanguages'] : " ") . "`\n";
		$body .= "mail: `" . ($_POST['data']['mail'] ? $_POST['data']['mail'] : " ") . "`\n";
		$body .= "web: `" . ($_POST['data']['web'] ? $_POST['data']['web'] : " ") . "`\n";
		$body .= "facebook: `" . ($_POST['data']['facebook'] ? $_POST['data']['facebook'] : " ") . "`\n";
		$body .= "Telefon: `" . ($_POST['data']['phone'] ? $_POST['data']['phone'] : " ") . "`\n";
		$body .= "Straße: `" . ($_POST['data']['street'] ? $_POST['data']['street'] : " ") . "`\n";
		$body .= "PLZ: `" . ($_POST['data']['zip'] ? $_POST['data']['zip'] : " ") . "`\n";
		$body .= "Ort: `" . ($_POST['data']['city'] ? $_POST['data']['city'] : " ") . "`\n";
		$body .= "von: `" . ($_POST['data']['dateFrom'] ? $_POST['data']['dateFrom'] : " ") . "`\n";
		$body .= "bis: `" . ($_POST['data']['dateTo'] ? $_POST['data']['dateTo'] : " ") . "`\n";
		$body .= "Wdh.: `" . ($_POST['data']['datePeriodic'] ? $_POST['data']['datePeriodic'] : " ") . "`\n";
		// TODO print category

		$labels = array("feedback");
	}

	$client->issues->createAnIssue($owner, $repo, $title, $body, $assignee, $milestone, $labels);
}
?>