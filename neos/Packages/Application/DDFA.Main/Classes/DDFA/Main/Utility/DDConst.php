<?php

namespace DDFA\Main\Utility;


abstract class DDConst
{
    const OWNER_INI = 0;
    const OWNER_MARKET = 1;
    const OWNER_EVENT = 2;
    const OWNER_BASIC = 3;
    const LOCATION = -1;

    const LOCALE_STD = "de";
    const LOCALE_NXT = "en"; //locale that is provided to translate first

    const MEDIA_IMAGE = "typo3_media_image";

    const ME_SUPPLEMENT_PROPS = ["offer", "dateFrom", "dateTo", "timeFrom", "timeTo", "area", "name", "description", "mail", "web", "facebook", "phone", "subCategory", "speakerPublic", "speakerPrivate", "image", "imageType", "supportWanted", "category", "spokenLanguages", "forChildren"];

    const L_HYDRATE_PROPS = ["street", "city", "placename", "openingHours", "arrival"];

}