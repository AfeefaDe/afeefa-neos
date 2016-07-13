<?php
include('sql.php');

function createGuid()
{
    if (function_exists('com_create_guid') === true) {
        return trim(com_create_guid(), '{}');
    }

    return strtolower(sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535)));
}

$result = sql("SELECT m.persistence_object_identifier AS a, m.created AS c, m.updated AS u, m.type AS t 
FROM ddfa_main_domain_model_marketentry m, ddfa_main_domain_model_location l
WHERE l.market_entry_id = m.persistence_object_identifier AND m.parent_entry_id IS NULL
GROUP BY a
HAVING count(l.persistence_object_identifier) > 1");

while ($i = mysqli_fetch_object($result)) {

    $result2 = sql("SELECT *
    FROM ddfa_main_domain_model_location l
    WHERE l.market_entry_id = '" . $i->a . "'");

    while ($j = mysqli_fetch_object($result2)) {
        $newUuid = createGuid();

        sql("INSERT INTO ddfa_main_domain_model_marketentry SET
                persistence_object_identifier = '" . $newUuid . "',
                entry_id = '" . uniqid("", true) . "',
                name = NULL,
                description = NULL,
                mail = NULL,
                web = NULL,
                facebook = NULL,
                phone = NULL,
                locale = 'de',
                category_id = NULL,
                speakerpublic = NULL,
                speakerprivate = NULL,
                image = NULL,
                imagetype = NULL,
                supportwanted = '0',
                spokenlanguages = NULL,
                created = '" . $i->c . "',
                updated = '" . $i->u . "',
                offer = '0',
                published = '1',
                type = '" . $i->t . "',
                subcategory = '',
                internalcomment = NULL,
                datefrom = NULL,
                dateto = NULL,
                forchildren = '0',
                area = 'dresden',
                timefrom = NULL,
                timeto = NULL,
                parent_entry_id = '$i->a'
            ", 2);

        sql("UPDATE ddfa_main_domain_model_location 
        SET market_entry_id='" . $newUuid . "' 
        WHERE persistence_object_identifier = '" . $j->persistence_object_identifier . "'
    ", 2);
    }

    unset($i);
}