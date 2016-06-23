<?php
include('sql.php');

// $r = sql($link, "select convert(cast(convert(persistence_object_identifier USING utf8) AS BINARY) USING latin1) AS poi,
//                 convert(cast(convert(parent_entry_id USING utf8) AS BINARY) USING latin1) AS pei
//                 from ddfa_main_domain_model_marketentry where parent_entry_id is not null and name = '' and description = ''");

// while ($m = mysqli_fetch_object($r)) {
//     sql($link, "update ddfa_main_domain_model_location set market_entry_id = '" . $m->pei . "' where market_entry_id = '" . $m->poi . "'");

//     sql($link, "delete from ddfa_main_domain_model_marketentry where persistence_object_identifier = '" . $m->poi . "'");
// }

// select all child entries
$r = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE `parent_entry_id` IS NOT NULL AND `locale` = 'de'");

// check number of translations for each child
while ($child = mysqli_fetch_object($r)) {
    
  // get all translations of the child
	$r2 = sql("SELECT * FROM `ddfa_main_domain_model_marketentry` WHERE `entry_id` = '" . $child->entry_id . "'");
  
  // print info
  echo $child->entry_id . ' (' . $child->name .') > #translations: ' . $r2->num_rows . '<br>';

  // if child has only DE translation, delete it and move location to parent
  if( intval($r2->num_rows) < 2 && $child->locale == 'de') {
  	// get location of the child
  	$r3 = sql("SELECT * FROM `ddfa_main_domain_model_location` WHERE `market_entry_id` = '" . $child->persistence_object_identifier . "'");
  	
  	// move location to parent
  	while ($location = mysqli_fetch_object($r3)) {
  		sql("UPDATE `ddfa_main_domain_model_location` SET `market_entry_id` = '" . $child->parent_entry_id . "' WHERE `persistence_object_identifier` = '" . $location->persistence_object_identifier . "'");
  		echo '> location: ' . $location->persistence_object_identifier . ' (' . $location->placename . ')<br><br>';
  	}

  	// delete child
  	sql("DELETE FROM `ddfa_main_domain_model_marketentry` WHERE `persistence_object_identifier` = '" . $child->persistence_object_identifier . "'");
  	
  } else {
  	echo '<br>';
  	echo 'skipped: ' . $child->entry_id . ' (' . $child->name .') > #translations: ' . $r2->num_rows . '<br><br>';	
  }
}
