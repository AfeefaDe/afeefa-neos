<?php

include('sql.php');

function createGuid()
{
    if (function_exists('com_create_guid') === true) {
        return trim(com_create_guid(), '{}');
    }

    return strtolower(sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535)));
}

if (isset($_GET['rollback']) && $_GET['rollback'] == '1') {
//    $result = sql("select convert(cast(convert(persistence_object_identifier using utf8) as binary) using latin1) as id from ddfa_main_domain_model_initiative");
//    while ($i = mysql_fetch_object($result)) {
//        sql("delete from ddfa_main_domain_model_marketentry where persistence_object_identifier = '" . $i->id . "'");
//    }

} else {

    $result = sql("select convert(cast(convert(persistence_object_identifier using utf8) as binary) using latin1) as a,
convert(cast(convert(market_entry_id using utf8) as binary) using latin1) as b,
convert(cast(convert(category_id using utf8) as binary) using latin1) as c,
convert(cast(convert(type using utf8) as binary) using latin1) as d,
convert(cast(convert(entry_id using utf8) as binary) using latin1) as e,
convert(cast(convert(name using utf8) as binary) using latin1) as f,
convert(cast(convert(description using utf8) as binary) using latin1) as g,
convert(cast(convert(mail using utf8) as binary) using latin1) as h,
convert(cast(convert(web using utf8) as binary) using latin1) as i,
convert(cast(convert(facebook using utf8) as binary) using latin1) as j,
convert(cast(convert(phone using utf8) as binary) using latin1) as k,
convert(cast(convert(locale using utf8) as binary) using latin1) as l,
convert(cast(convert(speakerpublic using utf8) as binary) using latin1) as m,
convert(cast(convert(speakerprivate using utf8) as binary) using latin1) as n,
convert(cast(convert(supportwanted using utf8) as binary) using latin1) as o,
convert(cast(convert(spokenlanguages using utf8) as binary) using latin1) as p,
convert(cast(convert(created using utf8) as binary) using latin1) as q,
convert(cast(convert(updated using utf8) as binary) using latin1) as r,
convert(cast(convert(subcategory using utf8) as binary) using latin1) as s,
convert(cast(convert(internalcomment using utf8) as binary) using latin1) as t,
convert(cast(convert(forchildren using utf8) as binary) using latin1) as u from ddfa_main_domain_model_location");

    while ($i = mysql_fetch_object($result)) {
        if ($i->b != null && $i->b != '') {
            $newUuid = createGuid();
            sql("insert into ddfa_main_domain_model_marketentry values (
    '" . $newUuid . "',
    '" . $i->e . "',
    convert(cast(convert('" . mysql_escape_string($i->f) . "' using latin1) as binary) using utf8),
    convert(cast(convert('" . mysql_escape_string($i->g) . "' using latin1) as binary) using utf8),
    '" . $i->h . "',
    '" . $i->i . "',
    '" . $i->j . "',
    '" . $i->k . "',
    null,
    '" . $i->l . "',
    '" . $i->c . "',
    '" . $i->m . "',
    '" . $i->n . "',
    null,
    null,
    '" . $i->o . "',
    '" . $i->p . "',
    '" . $i->q . "',
    '" . $i->r . "',
    '0',
    '1',
    '" . $i->b . "',
    '" . $i->d . "',
    '" . $i->s . "',
    '" . $i->t . "',
    null,
    null,
    '" . $i->u . "',
    'dresden',
    null,
    null
    )");
        } else {
            sql("insert into ddfa_main_domain_model_marketentry values ('" . $i->a . "',
    '" . $i->b . "',
    convert(cast(convert('" . mysql_escape_string($i->u) . "' using latin1) as binary) using utf8),
    convert(cast(convert('" . mysql_escape_string($i->c) . "' using latin1) as binary) using utf8),
    '" . $i->d . "',
    '" . $i->e . "',
    '" . $i->f . "',
    '" . $i->g . "',
    '" . $i->h . "',
    '" . $i->i . "',
    '" . $i->j . "',
    '" . $i->k . "',
    '" . $i->l . "',
    '" . $i->m . "',
    '" . $i->n . "',
    convert(cast(convert('" . mysql_escape_string($i->o) . "' using latin1) as binary) using utf8),
    '" . $i->p . "',
    '" . $i->q . "',
    '1',
    '1',
    null,
    '0',
    '" . $i->s . "',
    '" . $i->t . "',
    null,
    null,
    null,
    null,
    0,
    'dresden')");
        }
    }
}
