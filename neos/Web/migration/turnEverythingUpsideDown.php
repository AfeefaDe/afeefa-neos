<?php
include('sql.php');
$server = "localhost";
$user = "dude";
$pass = "";
$link = mysqli_connect($server, $user, $pass);

function createGuid()
{
    if (function_exists('com_create_guid') === true) {
        return trim(com_create_guid(), '{}');
    }

    return strtolower(sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535)));
}

sql($link, "SET FOREIGN_KEY_CHECKS = 0");


$result = sql($link, "SELECT convert(cast(convert(persistence_object_identifier USING utf8) AS BINARY) USING latin1) AS a,
                convert(cast(convert(market_entry_id USING utf8) AS BINARY) USING latin1) AS b,
                category_id  AS c,
                type AS d,
                entry_id AS e,
                convert(cast(convert(name USING utf8) AS BINARY) USING latin1) AS f,
                convert(cast(convert(description USING utf8) AS BINARY) USING latin1) AS g,
                convert(cast(convert(mail USING utf8) AS BINARY) USING latin1) AS h,
                convert(cast(convert(web USING utf8) AS BINARY) USING latin1) AS i,
                convert(cast(convert(facebook USING utf8) AS BINARY) USING latin1) AS j,
                convert(cast(convert(phone USING utf8) AS BINARY) USING latin1) AS k,
                convert(cast(convert(locale USING utf8) AS BINARY) USING latin1) AS l,
                convert(cast(convert(speakerpublic USING utf8) AS BINARY) USING latin1) AS m,
                convert(cast(convert(speakerprivate USING utf8) AS BINARY) USING latin1) AS n,
                IFNULL(supportwanted, NULL) AS o,
                convert(cast(convert(spokenlanguages USING utf8) AS BINARY) USING latin1) AS p,
                convert(cast(convert(created USING utf8) AS BINARY) USING latin1) AS q,
                convert(cast(convert(updated USING utf8) AS BINARY) USING latin1) AS r,
                convert(cast(convert(subcategory USING utf8) AS BINARY) USING latin1) AS s,
                convert(cast(convert(internalcomment USING utf8) AS BINARY) USING latin1) AS t,
                forchildren AS u,
                lon,
                lat,
                convert(cast(convert(street USING utf8) AS BINARY) USING latin1) AS street,
                convert(cast(convert(district USING utf8) AS BINARY) USING latin1) AS dist,
                convert(cast(convert(zip USING utf8) AS BINARY) USING latin1) AS zip,
                convert(cast(convert(city USING utf8) AS BINARY) USING latin1) AS city,
                convert(cast(convert(placename USING utf8) AS BINARY) USING latin1) AS placename,
                convert(cast(convert(openinghours USING utf8) AS BINARY) USING latin1) AS oh,
                convert(cast(convert(arrival USING utf8) AS BINARY) USING latin1) AS arr
                FROM ddfa_main_domain_model_old_location");

while ($i = mysqli_fetch_object($result)) {
    $newUuid = createGuid();

    if ($i->l == 'de') {
        echo "parent migration <br>";

        sql($link, "INSERT INTO ddfa_main_domain_model_marketentry SET
                persistence_object_identifier = '" . $newUuid . "',
                entry_id = '" . $i->e . "',
                name = convert(cast(convert('" . mysqli_real_escape_string($link, $i->f) . "' USING latin1) AS BINARY) USING utf8),
                description = convert(cast(convert('" . mysqli_real_escape_string($link, $i->g) . "' USING latin1) AS BINARY) USING utf8),
                mail = '" . $i->h . "',
                web = '" . $i->i . "',
                facebook = '" . $i->j . "',
                phone = '" . $i->k . "',
                locale = '" . $i->l . "',
                category_id = '" . $i->c . "',
                speakerpublic = '" . $i->m . "',
                speakerprivate = '" . $i->n . "',
                image = NULL,
                imagetype = NULL,
                supportwanted = '" . ($i->o == '' ? 0 : $i->o) . "',
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
                forchildren = '" . ($i->u == '' ? 0 : $i->u) . "',
                area = 'dresden',
                timefrom = NULL,
                timeto = NULL,
                parent_entry_id = '" . ($i->b == '' ? null : $i->b) . "'
            ");

        sql($link, "INSERT INTO ddfa_main_domain_model_location SET
                persistence_object_identifier = '" . $i->a . "',
                 market_entry_id = '" . $newUuid . "',
                entry_id = '" . $i->e . "',
                locale = '" . $i->l . "',
                created = '" . $i->q . "',
                updated = '" . $i->r . "',
                lon = convert(cast(convert('" . mysqli_real_escape_string($link, $i->lon) . "' USING latin1) AS BINARY) USING utf8),
                lat = convert(cast(convert('" . mysqli_real_escape_string($link, $i->lat) . "' USING latin1) AS BINARY) USING utf8),
                street = convert(cast(convert('" . mysqli_real_escape_string($link, $i->street) . "' USING latin1) AS BINARY) USING utf8),
                district = convert(cast(convert('" . mysqli_real_escape_string($link, $i->dist) . "' USING latin1) AS BINARY) USING utf8),
                zip = convert(cast(convert('" . mysqli_real_escape_string($link, $i->zip) . "' USING latin1) AS BINARY) USING utf8),
                city = convert(cast(convert('" . mysqli_real_escape_string($link, $i->city) . "' USING latin1) AS BINARY) USING utf8),
                placename = convert(cast(convert('" . mysqli_real_escape_string($link, $i->placename) . "' USING latin1) AS BINARY) USING utf8),
                openinghours = convert(cast(convert('" . mysqli_real_escape_string($link, $i->oh) . "' USING latin1) AS BINARY) USING utf8),
                arrival = convert(cast(convert('" . mysqli_real_escape_string($link, $i->arr) . "' USING latin1) AS BINARY) USING utf8)
            ");

        echo "parent migration finished <br>";
    } else {
        echo "translation migration<br>";

        sql($link, "INSERT INTO ddfa_main_domain_model_marketentry SET
                persistence_object_identifier = '" . $newUuid . "',
                entry_id = '" . $i->e . "',
                name = convert(cast(convert('" . mysqli_real_escape_string($link, $i->f) . "' USING latin1) AS BINARY) USING utf8),
                description = convert(cast(convert('" . mysqli_real_escape_string($link, $i->g) . "' USING latin1) AS BINARY) USING utf8),
                mail = '" . $i->h . "',
                web = '" . $i->i . "',
                facebook = '" . $i->j . "',
                phone = '" . $i->k . "',
                locale = '" . $i->l . "',
                category_id = '" . $i->c . "',
                speakerpublic = '" . $i->m . "',
                speakerprivate = '" . $i->n . "',
                image = NULL,
                imagetype = NULL,
                supportwanted = '" . ($i->o == '' ? 0 : $i->o) . "',
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
                forchildren = '" . ($i->u == '' ? 0 : $i->u) . "',
                area = 'dresden',
                timefrom = NULL,
                timeto = NULL,
                parent_entry_id = NULL
            ");

        sql($link, "INSERT INTO ddfa_main_domain_model_location SET
                persistence_object_identifier = '" . $i->a . "',
                entry_id = '" . $i->e . "',
                locale = '" . $i->l . "',
                created = '" . $i->q . "',
                updated = '" . $i->r . "',
                lon = convert(cast(convert('" . mysqli_real_escape_string($link, $i->lon) . "' USING latin1) AS BINARY) USING utf8),
                lat = convert(cast(convert('" . mysqli_real_escape_string($link, $i->lat) . "' USING latin1) AS BINARY) USING utf8),
                street = convert(cast(convert('" . mysqli_real_escape_string($link, $i->street) . "' USING latin1) AS BINARY) USING utf8),
                district = convert(cast(convert('" . mysqli_real_escape_string($link, $i->dist) . "' USING latin1) AS BINARY) USING utf8),
                zip = convert(cast(convert('" . mysqli_real_escape_string($link, $i->zip) . "' USING latin1) AS BINARY) USING utf8),
                city = convert(cast(convert('" . mysqli_real_escape_string($link, $i->city) . "' USING latin1) AS BINARY) USING utf8),
                placename = convert(cast(convert('" . mysqli_real_escape_string($link, $i->placename) . "' USING latin1) AS BINARY) USING utf8),
                openinghours = convert(cast(convert('" . mysqli_real_escape_string($link, $i->oh) . "' USING latin1) AS BINARY) USING utf8),
                arrival = convert(cast(convert('" . mysqli_real_escape_string($link, $i->arr) . "' USING latin1) AS BINARY) USING utf8)
            ");

        echo "translation migration finished <br>";
    }

    unset($i);
}

sql($link, "SET FOREIGN_KEY_CHECKS = 1");

sql($link, "update ddfa_main_domain_model_marketentry set parent_entry_id = null where parent_entry_id = ''");

mysqli_close($link);
