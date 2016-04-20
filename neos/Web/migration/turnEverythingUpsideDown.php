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
    echo "nope";

} else {

    $result = sql("SELECT convert(cast(convert(persistence_object_identifier USING utf8) AS BINARY) USING latin1) AS a,
convert(cast(convert(market_entry_id USING utf8) AS BINARY) USING latin1) AS b,
convert(cast(convert(category_id USING utf8) AS BINARY) USING latin1) AS c,
convert(cast(convert(type USING utf8) AS BINARY) USING latin1) AS d,
convert(cast(convert(entry_id USING utf8) AS BINARY) USING latin1) AS e,
convert(cast(convert(name USING utf8) AS BINARY) USING latin1) AS f,
convert(cast(convert(description USING utf8) AS BINARY) USING latin1) AS g,
convert(cast(convert(mail USING utf8) AS BINARY) USING latin1) AS h,
convert(cast(convert(web USING utf8) AS BINARY) USING latin1) AS i,
convert(cast(convert(facebook USING utf8) AS BINARY) USING latin1) AS j,
convert(cast(convert(phone USING utf8) AS BINARY) USING latin1) AS k,
convert(cast(convert(locale USING utf8) AS BINARY) USING latin1) AS l,
convert(cast(convert(speakerpublic USING utf8) AS BINARY) USING latin1) AS m,
convert(cast(convert(speakerprivate USING utf8) AS BINARY) USING latin1) AS n,
convert(cast(convert(supportwanted USING utf8) AS BINARY) USING latin1) AS o,
convert(cast(convert(spokenlanguages USING utf8) AS BINARY) USING latin1) AS p,
convert(cast(convert(created USING utf8) AS BINARY) USING latin1) AS q,
convert(cast(convert(updated USING utf8) AS BINARY) USING latin1) AS r,
convert(cast(convert(subcategory USING utf8) AS BINARY) USING latin1) AS s,
convert(cast(convert(internalcomment USING utf8) AS BINARY) USING latin1) AS t,
convert(cast(convert(forchildren USING utf8) AS BINARY) USING latin1) AS u FROM ddfa_main_domain_model_location");

    while ($i = mysql_fetch_object($result)) {
        $newUuid = createGuid();
        if ($i->b != null && $i->b != '') {
            sql("INSERT INTO ddfa_main_domain_model_marketentry SET
                persistence_object_identifier = '" . $newUuid . "',
                entry_id = '" . $i->e . "',
                name = convert(cast(convert('" . mysql_escape_string($i->f) . "' USING latin1) AS BINARY) USING utf8),
                description = convert(cast(convert('" . mysql_escape_string($i->g) . "' USING latin1) AS BINARY) USING utf8),
                mail = '" . $i->h . "',
                web = '" . $i->i . "',
                facebook = '" . $i->j . "',
                phone = '" . $i->k . "',
                rating = NULL,
                locale = '" . $i->l . "',
                category_id = '" . $i->c . "',
                speakerpublic = '" . $i->m . "',
                speakerprivate = '" . $i->n . "',
                image = NULL,
                imagetype = NULL,
                supportwanted = '" . $i->o . "',
                spokenlanguages = '" . $i->p . "',
                created = '" . $i->q . "',
                updated = '" . $i->r . "',
                offer = '1',
                published = '1',
                type = '" . $i->d . "',
                subcategory = '" . $i->s . "',
                internalcomment = '" . $i->t . "',
                datefrom = NULL,
                dateto = NULL,
                forchildren = '" . $i->u . "',
                area = 'dresden',
                timefrom = NULL,
                timeto = NULL,
                parent_entry_id = '" . $i->b . "'
            ");
            sql("UPDATE ddfa_main_domain_model_location SET market_entry_id = '" . $newUuid . "'
                WHERE persistence_object_identifier = '" . $i->a . "'");

        } else {
            sql("SET FOREIGN_KEY_CHECKS = 0");
            sql("INSERT INTO ddfa_main_domain_model_marketentry SET
                persistence_object_identifier = '" . $newUuid . "',
                entry_id = '" . $i->e . "',
                name = convert(cast(convert('" . mysql_escape_string($i->f) . "' USING latin1) AS BINARY) USING utf8),
                description = convert(cast(convert('" . mysql_escape_string($i->g) . "' USING latin1) AS BINARY) USING utf8),
                mail = '" . $i->h . "',
                web = '" . $i->i . "',
                facebook = '" . $i->j . "',
                phone = '" . $i->k . "',
                rating = NULL,
                locale = '" . $i->l . "',
                category_id = '" . $i->c . "',
                speakerpublic = '" . $i->m . "',
                speakerprivate = '" . $i->n . "',
                image = NULL,
                imagetype = NULL,
                supportwanted = '" . $i->o . "',
                spokenlanguages = '" . $i->p . "',
                created = '" . $i->q . "',
                updated = '" . $i->r . "',
                offer = '1',
                published = '1',
                type = '" . $i->d . "',
                subcategory = '" . $i->s . "',
                internalcomment = '" . $i->t . "',
                datefrom = NULL,
                dateto = NULL,
                forchildren = '" . $i->u . "',
                area = 'dresden',
                timefrom = NULL,
                timeto = NULL,
                parent_entry_id = NULL
            ");
        }
    }
}
