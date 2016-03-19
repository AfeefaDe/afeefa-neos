<?php

namespace DDFA\Main\Utility;


abstract class DDConst
{
    const OWNER_INI = 0;
    const OWNER_MARKET = 1;
    const OWNER_EVENT = 2;
    const OWNER_BASIC = 3;

    const LOCALE_STD = "de";
    const LOCALE_NXT = "en"; //locale that is provided to translate first

    const MEDIA_IMAGE = "typo3_media_image";

    const LOCATION_SUPPLEMENT_PROPS = ["name", "description", "arrival", "mail", "web", "facebook", "phone", "rating", "speakerPublic", "speakerPrivate", "category", "subCategory", "spokenLanguages", "forChildren", "supportWanted", "type", "image", "imageType"];

}