<?php

include('sql.php');

if (isset($_GET['rollback']) && $_GET['rollback'] == '1') {
    $result = sql("select convert(cast(convert(persistence_object_identifier using utf8) as binary) using latin1) as id,
convert(cast(convert(market_entry_id using utf8) as binary) using latin1) as ini from ddfa_main_domain_model_location");

    while ($i = mysql_fetch_object($result)) {
        if ($i->ini != null)
            sql("update ddfa_main_domain_model_location set market_entry_id = null, initiative_id = '" . $i->ini . "' where persistence_object_identifier = '" . $i->id . "' ");
    }

} else {

    $result = sql("select convert(cast(convert(persistence_object_identifier using utf8) as binary) using latin1) as id,
convert(cast(convert(initiative_id using utf8) as binary) using latin1) as ini from ddfa_main_domain_model_location");

    while ($i = mysql_fetch_object($result)) {
        if ($i->ini != null)
            sql("update ddfa_main_domain_model_location set initiative_id = null, market_entry_id = '" . $i->ini . "' where persistence_object_identifier = '" . $i->id . "' ");
    }
}
