<?php
header('Access-Control-Allow-Headers: x-requested-with');
header('Access-Control-Allow-Origin: https://afeefa.de');
header('Access-Control-Allow-Methods: POST');

require_once('MessageCenter.php');

//var_dump($_POST);


if (isset($_POST) && isset($_POST['action'])) {

    $MC = MessageCenter::Instance();
    
    switch( $_POST['action'] ){
        case 'github':
            $MC->createGithubIssue($_POST['data']);
            break;
        case 'mail':
            $MC->sendMail(
                [$_POST['data']['mail_fromMail'] => $_POST['data']['mail_fromName']],
                $_POST['data']['mail_to'],
                $_POST['data']['mail_subject'],
                $_POST['data']['mail_bodyPlain'],
                $_POST['data']['mail_replyTo'],
                $_POST['data']['mail_bodyHtml']
            );
            break;
    }

}