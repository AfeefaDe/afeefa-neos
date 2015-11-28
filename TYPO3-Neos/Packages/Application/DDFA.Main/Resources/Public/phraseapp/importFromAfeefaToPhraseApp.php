<?php

require 'vendor/autoload.php';
use GuzzleHttp\Client;

///////////
// SETUP //
///////////
$step = isset($_GET['step']) ? $_GET['step'] : null;

$configPhraseApp = array(
    'accessToken' => 'a1bf71362733ee24d1b170b33f9f067ebbc8b15695dbd4e6c6710f96d9b8b80a',
    'project_id' => 'e989a075962418d0e05398d2fc107265',
    'de_locale_id' => 'daae43d981d643eeaf4e6c6827e8592a'
);

$clientAfeefa = new Client([
    // Base URI is used with relative requests
    'base_uri' => $_SERVER["SERVER_NAME"] . '/_Resources/Static/Packages/DDFA.Main/phraseapp/exportJsonFromAfeefa.php',
    // You can set any number of default request options.
    // 'timeout'  => 2.0,
    // "verify" => false
]);

$clientPhraseApp = new Client([
    // Base URI is used with relative requests
    'base_uri' => 'https://api.phraseapp.com/api/v2/',
    // You can set any number of default request options.
    'timeout'  => 2.0,
    "verify" => false
]);


$locales = ['de', 'en', 'ar', 'ur', 'fr', 'it', 'ti', 'sr', 'fa', 'ru'];
$types = ['initiative', 'marketentry'];


////////////////////////
// Export from Afeefa //
////////////////////////
if($step == 'exportFromAfeefa'){

    // request JSON and save to file
    foreach ($types as $type){
        foreach ($locales as $locale){

            $response = $clientAfeefa->request('GET', '', array(
                'query' => [
                    'type' => $type,
                    'locale' => $locale
                ]
            ));

            $file = fopen("jsonExportFromAfeefa/".$type. '_' . date("Y-m-d") . '_' .$locale. '.json', "w") or die("Unable to open file!");
            fwrite($file, $response->getBody());
            fclose($file);
        }
    }

}


///////////////////////////////////
// Import into PhraseApp via API //
///////////////////////////////////
else if($step == 'importToPhraseApp'){

    foreach ($types as $type){
        foreach ($locales as $locale){
            
            // $response = $clientAfeefa->request('GET', '', array(
            //     'query' => [
            //         'type' => $type,
            //         'locale' => $locale
            //     ]
            // ));
            
            $response2 = $clientPhraseApp->request('POST', 'projects/' .$configPhraseApp['project_id']. '/uploads', array(
                'query' => [
                    'access_token' => $configPhraseApp['accessToken']
                ],
                'multipart' => array(
                    [
                        'name'     => 'file',
                        // 'contents' => $response->getBody()
                        'contents' => fopen('./jsonExportFromAfeefa/' .$type. '_' . date("Y-m-d") . '_' .$locale. '.json', 'r')
                    ],
                    [
                        'name'     => 'file_format',
                        'contents' => 'nested_json'
                    ],
                    [
                        'name'     => 'locale_id',
                        // 'contents' => $configPhraseApp[ $locale.'_locale_id']
                        'contents' => $locale
                    ],
                    [
                        'name'     => 'update_translations',
                        'contents' => 'true'
                    ]
                )
            ));

            echo $response2->getBody();
            
        }
    }
}

else { echo 'Define a valid step as GET parameter: ?step=[exportFromAfeefa|importToPhraseApp]'; }

?>