-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 13. Mrz 2017 um 14:15
-- Server Version: 5.6.21
-- PHP-Version: 5.6.3

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `afeefa_neos_new`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_location`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_location` (
  `persistence_object_identifier` char(36) COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:guid)',
  `market_entry_id` char(36) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '(DC2Type:guid)',
  `lon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lat` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `placename` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `openinghours` longtext COLLATE utf8_unicode_ci,
  `arrival` longtext COLLATE utf8_unicode_ci,
  `entry_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `locale` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_location`
--

INSERT INTO `ddfa_main_domain_model_location` (`persistence_object_identifier`, `market_entry_id`, `lon`, `lat`, `street`, `district`, `zip`, `city`, `placename`, `openinghours`, `arrival`, `entry_id`, `locale`, `created`, `updated`) VALUES
('01dee526-3006-44d0-885b-1b4c39f4d598', 'c7014b9b-cd15-480d-a7ee-536b0ec87568', '13.743297', '51.060911', 'Hauptstraße 23', '', '001097', 'Dresden', 'Dreikönigskirche/Kleiner Festsaal', '', '', '58c69a81d3e3b', 'de', '2017-03-13 14:11:29', '2017-03-13 14:11:29'),
('02f73f92-95d8-4be0-99fd-ceb35732abdb', '1720ad80-c576-476e-a5cc-29934202101e', '13.77875', '51.02144', 'Rudolf-Bergander-Ring 3', '', '0', 'Dresden', '1. Oberschule Dresden', '', '', '58c69a3393ecd', 'de', '2017-03-13 14:10:11', '2017-03-13 14:10:11'),
('07dfe296-07a6-4ec2-8b0b-b27d3d9144ad', 'b9587f3b-2a31-453a-934c-56d03172b79a', '13.75062', '51.0616', 'Glacisstraße 28', '', '0', 'Dresden', 'Kleines Haus', '', '', '58c69a765d7c7', 'de', '2017-03-13 14:11:18', '2017-03-13 14:11:18'),
('08426b5b-3a44-4b14-8802-fba4b640812e', '646f2bb1-884b-462b-ae98-3127136e4361', '13.743011', '51.050073', 'Wilsdruffer Straße 2', '', '0', 'Dresden', 'Landhaus Dresden', '', '', '58c69a73247f7', 'de', '2017-03-13 14:11:15', '2017-03-13 14:11:15'),
('0950b8ab-d824-4cce-a658-500c2775a5a6', '5b37b36b-5b07-494e-beab-adbc995478b9', '13.734798', '51.041525', 'Prager Straße 2', '', '001069', 'Dresden', 'Passage im Geschäftshaus Prager Spitze', '', '', '58c69a332f220', 'de', '2017-03-13 14:10:11', '2017-03-13 14:10:11'),
('0d1e52a8-c942-4c41-adc1-bff811644bed', '7ab23aec-2eee-4903-b8d6-93c53df8ec1d', '13.7579', '51.08141', 'Elisabeth-Boer-Straße 1', '', '0', 'Dresden', 'Stadtarchiv Dresden', '', '', '58c69a9008476', 'de', '2017-03-13 14:11:44', '2017-03-13 14:11:44'),
('0f2a40bb-d870-4340-8aab-203b461606d9', '2380f5be-6c17-4c7a-af34-7ab5d5a36277', '13.77184', '51.05283', 'Fiedlerstraße 2', '', '0', 'Dresden', 'Gemeindezentrum an der Trinitatiskirchruine', '', '', '58c69a9637c5c', 'de', '2017-03-13 14:11:50', '2017-03-13 14:11:50'),
('0f2ffaa6-70f4-452a-ad25-c5f1298af7bd', '15fa281f-9919-4fa2-98bb-69080f847355', '13.739196', '51.049157', 'Kreuzstraße 7', '', '001067', 'Dresden', 'ÖIZ Dresden', '', '', '58c69a82ebcbd', 'de', '2017-03-13 14:11:30', '2017-03-13 14:11:30'),
('12964a58-79e8-4c4b-a707-f118641f73ff', '135aca1c-dd81-4431-871e-6bd487609def', '13.69332', '51.01022', 'Rathausplatz 1', '', '0', 'Dresden', 'Neues Rathaus', '', '', '58c69a4f14e7e', 'de', '2017-03-13 14:10:39', '2017-03-13 14:10:39'),
('197069a5-4d84-4a52-b0d7-cb330b3e2ddc', '0532ba6a-7a1f-4b86-a416-5a42a87a6cab', '13.76564', '51.04721', 'Stephanienplatz 2', '', '0', 'Dresden', 'Wir sind Paten', '', '', '58c69a3c4e0c7', 'de', '2017-03-13 14:10:20', '2017-03-13 14:10:20'),
('1b670b73-7c0d-4d0c-9c15-bd4af8677222', '20c242e9-efe1-40fb-953c-2c71016098d9', '13.741956', '51.04817', 'Rathausplatz 1', '', '001067', 'Dresden', 'Neues Rathaus Dresden', '', '', '58c69a692a538', 'de', '2017-03-13 14:11:05', '2017-03-13 14:11:05'),
('1c4b169b-3a6f-41ed-9186-3871cf297396', '61ff8b9f-3162-452f-87e1-978a3d0c64ae', '13.75571', '51.0644', 'Martin-Luther-Straße 21', '', '0', 'Dresden', 'WIR AG', '', '', '58c69a5165d41', 'de', '2017-03-13 14:10:41', '2017-03-13 14:10:41'),
('1d80d1db-cb0d-4a6c-9979-b68e1a2bb83b', '85d2919b-65d3-48a7-b686-0e04088f5caa', '13.769369', '51.021368', 'Dohnaer Straße 53', '', '0', 'Dresden', 'Kirchgemeinde St. Petrus', '', '', '58c69a37d5d4f', 'de', '2017-03-13 14:10:15', '2017-03-13 14:10:15'),
('20709bf0-40f2-4550-b69b-29062b184742', 'c52a22b3-ea16-4a60-8aeb-5abbadb21a79', '13.769624', '51.013728', 'Karl-Laux-Str. 5', '', '001219', 'Dresden', 'SPIKE Dresden', '', '', '58c69a70ab4a0', 'de', '2017-03-13 14:11:12', '2017-03-13 14:11:12'),
('21cd5eed-cea1-49ae-a13a-7361960e82b4', '5f5e8da3-3681-4ba3-acb3-110c9fd3a3d8', '13.760764', '51.055917', 'Elisenstraße 35', '', '001307', 'Dresden', 'Johannstädter Kulturtreff e.V.', '', '', '58c69a402110f', 'de', '2017-03-13 14:10:24', '2017-03-13 14:10:24'),
('222b21d3-be0d-4cb1-9192-3c7e2b1974c0', '2ab64866-23a5-4028-9342-005dcb347c9c', '13.75697', '51.05104', 'Pillnitzer Straße 39', '', '0', 'Dresden', 'St.-Benno-Gymnasium Dresden', '', '', '58c69a855d845', 'de', '2017-03-13 14:11:33', '2017-03-13 14:11:33'),
('22c3a4ed-4fe4-42b5-b2c2-cc692223ae53', '3b7e3637-1325-4db5-8123-28c26dc3f823', '13.75936', '51.06516', 'Prießnitzstraße 18', '', '0', 'Dresden', 'Stadtteilhaus Dresden-Neustadt', '', '', '58c69a7c19d5f', 'de', '2017-03-13 14:11:24', '2017-03-13 14:11:24'),
('28c925e8-59ba-4577-988c-7780487545ce', '1daa3d97-41a3-4461-acab-80d96e96451a', '13.743136', '51.061001', 'vor der Dreikönigskirche', '', '0', 'Dresden', 'Dresden (vor der Dreikönigskirche)', '', '', '58c69a52c0f9f', 'de', '2017-03-13 14:10:42', '2017-03-13 14:10:42'),
('29c16560-efa0-4655-9c73-62892191ad67', '57534429-5de4-4d43-bd9d-9f2985ef4188', '13.720674', '51.056022', 'Wachsbleichstr. 4a', '', '001067', 'Dresden', 'riesa efau', '', '', '58c69a21c4a20', 'de', '2017-03-13 14:09:53', '2017-03-13 14:09:53'),
('2bf72749-108b-4fc9-9756-60b516cb2a7b', '9a54dcc9-5716-4a3b-a16f-9dbcf4616c29', '13.789476', '51.036566', 'Schlüterstraße 7', '', '0', 'Dresden', 'Grünes Büro', '', '', '58c69a54e354e', 'de', '2017-03-13 14:10:44', '2017-03-13 14:10:44'),
('2d47428b-597a-4a0e-90d6-2a7affad0f06', '407b33df-080a-4a2c-8698-0fff95ff3c15', '13.729814', '51.049494', 'Annenstraße 10', '', '001067', 'Dresden', 'Volkshochschule Dresden', '', '', '58c69a3333228', 'de', '2017-03-13 14:10:11', '2017-03-13 14:10:11'),
('3129c2fd-0927-4f8d-948e-569779e99e0f', '5981abd5-b771-42d4-99df-6bc32a53c543', '13.729814', '51.049494', 'Annenstraße 10', '', '0', 'Dresden', 'VHS Dresden', '', '', '58c69a79d1238', 'de', '2017-03-13 14:11:21', '2017-03-13 14:11:21'),
('32175345-8810-4981-9634-5ed53ee44d24', '912df27c-6cdf-48a3-a6ba-b230c3722738', '13.760764', '51.055917', 'Elisenstraße 35', '', '001307', 'Dresden', 'Johannstädter Kulturtreff e.V.', '', '', '58c69a7041052', 'de', '2017-03-13 14:11:12', '2017-03-13 14:11:12'),
('322c560d-0cad-43b5-802b-0bda089bbe48', 'e02efe8d-eda6-4355-bbcd-3be6735bae59', '13.694276', '51.043802', 'Rudolf-Renner-Straße 51', '', '001159', 'Dresden', 'Bürgerbüro Dr. Eva-Maria Stange', '', '', '58c69a1c4964a', 'de', '2017-03-13 14:09:48', '2017-03-13 14:09:48'),
('32a0637a-c1e2-44a3-a31d-e4a612e95205', '0a2f2666-1275-4956-a855-b4ec6043f253', '13.747594', '51.072129', 'Bischofsplatz 6', '', '0', 'Dresden', 'Grüne Ecke', '', '', '58c69a6e794e3', 'de', '2017-03-13 14:11:10', '2017-03-13 14:11:10'),
('33c81446-fda6-4f75-82f1-66fe23e7a78e', 'de46e2b5-236f-4739-bb6e-284fe0eb47e7', '13.7098', '51.05695', 'Berliner Straße 65', '', '0', 'Dresden', 'Kreativzentrum Omnibus', '', '', '58c69a9add938', 'de', '2017-03-13 14:11:54', '2017-03-13 14:11:54'),
('33f90144-788e-4f0b-959d-a3d5a5d902cc', '7f66a1c0-b426-4723-8f9a-bf0e910b22c1', '13.672399', '51.048774', 'Leutewitzer Ring 75', '', '0', 'Dresden', 'GO IN', '', '', '58c69a6d7c454', 'de', '2017-03-13 14:11:09', '2017-03-13 14:11:09'),
('38f392c5-a846-4404-ac99-105ffebe7599', '6c171a96-f9d4-4857-b004-30edc79cf4fb', '13.833684', '51.028694', 'Österreicher Straße 13', '', '001279', 'Dresden', 'Bibliothek Laubegast', '', '', '58c69a768230f', 'de', '2017-03-13 14:11:18', '2017-03-13 14:11:18'),
('3909e536-7728-40d1-b5c3-cc5a29e1854f', '5e0fd76f-c084-4916-9d4f-d1f6b128a5ac', '13.737262', '51.050409', '', '', '0', 'Dresden', 'Dresden (Ort wird noch bekanntgegeben)', '', '', '58c69a6609dff', 'de', '2017-03-13 14:11:02', '2017-03-13 14:11:02'),
('3a590815-98f1-4aa9-9a5c-c1ca17ef0135', 'ec17c7fc-890f-45b1-8b55-6893d6c04219', '13.741956', '51.04817', 'Rathausplatz 1', '', '001067', 'Dresden', 'Neues Rathaus Dresden', '', '', '58c69a592153b', 'de', '2017-03-13 14:10:49', '2017-03-13 14:10:49'),
('3c7ca0d2-63de-4c92-aba6-69ff8ccc36d9', 'deb0f1c1-8d2d-4562-89b4-75eaacbc090d', '13.729814', '51.049494', 'Annenstraße 10', '', '001067', 'Dresden', 'Volkshochschule Dresden', '', '', '58c69a619b279', 'de', '2017-03-13 14:10:57', '2017-03-13 14:10:57'),
('3e605726-552a-4b74-950a-352ff677de39', 'd23b679a-b5a4-41bd-9975-393782afd3d2', '13.756762', '51.064582', 'Martin-Luther-Platz 5', '', '0', 'Dresden', 'Jugendkeller der Martin-Luther-Gemeinde', '', '', '58c69a4921ad8', 'de', '2017-03-13 14:10:33', '2017-03-13 14:10:33'),
('432b2b67-e539-490e-b670-677e72e2032c', '531618bf-38b2-49b2-9482-75426b3d8ae7', '13.720674', '51.056022', 'Wachsbleichstr. 4a', '', '001067', 'Dresden', 'riesa efau', '', '', '58c69a295f197', 'de', '2017-03-13 14:10:01', '2017-03-13 14:10:01'),
('446a8936-4054-433e-953f-c453f0cf6ead', 'e6fe5911-ef00-4fb5-8c6e-80d8dddefc2f', '13.741522', '51.051873', 'Neumarkt', '', '0', 'Dresden', 'Frauenkirche Dresden', '', '', '58c69a7f96973', 'de', '2017-03-13 14:11:27', '2017-03-13 14:11:27'),
('45c18a3a-b1a8-4a3d-bec9-738cce17bd85', '59deeec0-e2cc-4a5f-b828-08c162480127', '13.71052', '51.09209', 'Kopernikusstraße 40', '', '0', 'Dresden', 'Apostelkirche Dresden', '', '', '58c69a8ad7fde', 'de', '2017-03-13 14:11:38', '2017-03-13 14:11:38'),
('4621e736-9a2e-4a0b-8c7e-30a30ae9f15b', '4bc0f948-d6e7-4d5f-aa91-a14badaccd0b', '13.78175', '51.03365', 'Bodenbacher Str. 24', '', '001277', 'Dresden', 'Ev.-Luth. Kirchgemeinde Dresden-Gruna-Seidnitz, Gemeindehaus Gruna', '', '', '58c69a953c3e9', 'de', '2017-03-13 14:11:49', '2017-03-13 14:11:49'),
('4e0a8d9a-4de5-4a8b-90d6-cf6d1fabfdc6', '0c6904ce-eebd-49e1-9768-b83ce50f8e8f', '13.734798', '51.041525', 'Prager Straße 2', '', '001069', 'Dresden', 'Passage im Geschäftshaus Prager Spitze', '', '', '58c69a28c41ff', 'de', '2017-03-13 14:10:00', '2017-03-13 14:10:00'),
('4e679026-8a91-44ed-a2da-96d3d6d79592', 'ca709f51-6fb3-4863-80c0-b34fc88bc7eb', '13.747374', '51.06752', 'Königsbrücker Straße 26', '', '001099', 'Dresden', 'Bibliothek Neustadt (Städtische Bibliotheken Dresden)', '', '', '58c69a8c4a127', 'de', '2017-03-13 14:11:40', '2017-03-13 14:11:40'),
('5100c66c-7511-4130-8800-a72961616b4d', 'e765de8b-36d7-448a-8da7-07d6e02cdb5f', '13.810093', '51.049559', 'Reinhold-Becker-Str. 5', '', '001277', 'Dresden', 'Brücke-Most-Stiftung', '', '', '58c69a747ae19', 'de', '2017-03-13 14:11:16', '2017-03-13 14:11:16'),
('53fe1481-942b-4bfd-b76e-22785cd01b3f', '4e865657-3a78-47e1-afaf-e29b2b8863cd', '13.7579', '51.08141', 'Elisabeth-Boer-Straße 1', '', '0', 'Dresden', 'Stadtarchiv Dresden', '', '', '58c69a8d74ec1', 'de', '2017-03-13 14:11:41', '2017-03-13 14:11:41'),
('571f7377-eb87-4a9e-a30a-a83e7354b8e5', '414ec0ac-9594-4cb6-87b9-c0eb4487a872', '13.737262', '51.050409', '', '', '0', 'Dresden', 'Dresden (Ort wird noch bekanntgegeben)', '', '', '58c69a524de13', 'de', '2017-03-13 14:10:42', '2017-03-13 14:10:42'),
('5d5e519e-e067-445d-928e-72eae16a9ce6', 'b56726c0-c37f-4502-beee-9db37801ca88', '13.75062', '51.0616', 'Glacisstraße 28', '', '0', 'Dresden', 'Kleines Haus', '', '', '58c69a80a16b1', 'de', '2017-03-13 14:11:28', '2017-03-13 14:11:28'),
('5e36cc4d-3d76-4dea-b924-09eeb33de247', '764e0529-7726-4a63-bc25-cd155fbcc69a', '13.759443', '51.02921', 'Oskarstr. 1', '', '001219', 'Dresden', 'FrauenBildungsHaus Dresden e.V.', '', '', '58c69a88387df', 'de', '2017-03-13 14:11:36', '2017-03-13 14:11:36'),
('60a117c7-8240-45cc-8c52-afda6c7466a6', 'e57b1e57-755c-4134-a8cd-1bea3f5c45bc', '13.62243', '50.9786', 'Richard-Wolff-Straße 1', '', '0', 'Freital', 'Turnhalle der Oberschule „Geschwister Scholl“ Hainsberg', '', '', '58c69a9c78ec3', 'de', '2017-03-13 14:11:56', '2017-03-13 14:11:56'),
('6bfcb1e7-6980-481c-b7a9-277df898e331', '34fa36c6-665c-4098-a6b2-4cdace5912bd', '13.720674', '51.056022', 'Wachsbleichstr. 4a', '', '001067', 'Dresden', 'riesa efau', '', '', '58c69a9c2d9be', 'de', '2017-03-13 14:11:56', '2017-03-13 14:11:56'),
('6cc31d78-3e06-4dd7-b175-29e4090d060e', '366bed37-9bf5-42aa-9d60-bc1bdb96200c', '13.737262', '51.050409', '', '', '0', 'Dresden', 'Gemeindehaus Ev.-Luth. Laurentiuskirchgemeinde Dresden', '', '', '58c69a69b2f51', 'de', '2017-03-13 14:11:05', '2017-03-13 14:11:05'),
('6df906bc-d8dd-4560-9b64-1f5098a5efae', '5ee59ba0-80de-44c1-81c5-a1b12d2790dc', '13.694276', '51.043802', 'Rudolf-Renner-Straße 51', '', '001159', 'Dresden', 'Bürgerbüro Dr. Eva-Maria Stange', '', '', '58c69aa1a963a', 'de', '2017-03-13 14:12:01', '2017-03-13 14:12:01'),
('6fd411f3-d6d7-4a81-9c60-9404cac20e4c', '41554a37-1e90-4a7c-964a-8ede152314a9', '13.720674', '51.056022', 'Wachsbleichstr. 4a', '', '001067', 'Dresden', 'riesa efau', '', '', '58c69a9b63cfc', 'de', '2017-03-13 14:11:55', '2017-03-13 14:11:55'),
('737b9131-de94-4759-bbf0-270256962b55', '1d311711-0ddd-4f01-8231-f722e42a84c4', '13.7579', '51.08141', 'Elisabeth-Boer-Straße 1', '', '0', 'Dresden', 'Stadtarchiv Dresden', '', '', '58c69a5fa8267', 'de', '2017-03-13 14:10:55', '2017-03-13 14:10:55'),
('74380747-208f-482f-9a56-9f328ad011bc', '113c6a0f-1860-456d-862c-5639a76a283b', '13.7098', '51.05695', 'Berliner Straße 65', '', '0', 'Dresden', 'Kreativzentrum Omnibus', '', '', '58c69a4485506', 'de', '2017-03-13 14:10:28', '2017-03-13 14:10:28'),
('74e60f98-1739-44d5-809f-5180544df12a', '66eb7ed9-16cc-4038-b516-25d14b3b2c18', '13.7427', '51.061749', 'Königstraße 15', '', '001097', 'Dresden', 'Kinder- und Jugendgalerie EINHORN', '', '', '58c69a957963c', 'de', '2017-03-13 14:11:49', '2017-03-13 14:11:49'),
('7537c7e3-9e1c-4128-980a-9b34cafbeca6', '6adb2b44-b97d-4340-9b89-df4c0287bbad', '13.806499', '51.039399', 'Schandauer Straße 73', '', '0', 'Dresden', 'Programmkino Ost', '', '', '58c69a38ca3ab', 'de', '2017-03-13 14:10:16', '2017-03-13 14:10:16'),
('757e0cac-e40a-46d4-9d37-9c62c330b8b7', 'f9b42421-d1a0-4cc4-89ce-c5f63c4317d0', '13.750713', '51.066175', 'Alaunstraße 36-40', '', '0', 'Dresden', 'scheune', '', '', '58c69a8b54f27', 'de', '2017-03-13 14:11:39', '2017-03-13 14:11:39'),
('78feea86-d70b-4e58-89a2-d049dd3da90f', '66807d1c-c748-47af-9801-ca7c3ffbfbb4', '13.741956', '51.04817', 'Rathausplatz 1', '', '001067', 'Dresden', 'Neues Rathaus Dresden', '', '', '58c69aa279fb9', 'de', '2017-03-13 14:12:02', '2017-03-13 14:12:02'),
('79c06ce5-41ce-46a8-9ba2-5e052eed898e', '9b765aee-0e4c-4eab-b8df-ce2755bc6ef4', '13.723524', '51.053505', 'Wettiner Platz', '', '0', 'Dresden', 'Treffpunkt Wettiner Platz', '', '', '58c69a2cd44ab', 'de', '2017-03-13 14:10:04', '2017-03-13 14:10:04'),
('7a7ef4ed-207c-4391-b2e2-c15eaff7f16b', '02e6cd78-b3d9-4c4c-8a45-ba3fa87f1429', '13.73776', '51.06676', 'Eisenbahnstraße 1', '', '001067', 'Dresden', 'Blaue Fabrik', '', '', '58c69a7d413e1', 'de', '2017-03-13 14:11:25', '2017-03-13 14:11:25'),
('7ac55096-bf2e-49fd-b2ee-04eaa497aac5', '2f784fb7-ee7e-4568-9b17-daa7fb09763a', '13.729814', '51.049494', 'Annenstraße 10', '', '0', 'Dresden', 'VHS Dresden', '', '', '58c69a812b142', 'de', '2017-03-13 14:11:29', '2017-03-13 14:11:29'),
('7b82409d-5b52-4eeb-895c-dc904c6ded76', '3b426a3e-8225-4961-ad74-6c1dc01a88fb', '13.797896', '51.005567', 'Prohliser Allee 10', '', '0', 'Dresden', 'Bibliothek Prohlis', '', '', '58c69a255ef99', 'de', '2017-03-13 14:09:57', '2017-03-13 14:09:57'),
('7c141e2b-0078-4927-b4b2-55302ce94298', 'da61ac9b-9149-4066-8e71-290645fdcab3', '13.75571', '51.0644', 'Martin-Luther-Straße 21', '', '0', 'Dresden', 'WIR AG', '', '', '58c69a433f0fc', 'de', '2017-03-13 14:10:27', '2017-03-13 14:10:27'),
('80e99371-7757-47bd-b938-8dcbe8e21e5a', 'ac16ed8c-45dd-44b4-922b-04ade21b2856', '13.737262', '51.050409', '', '', '0', 'Dresden', 'Dresden (Ort wird noch bekanntgegeben)', '', '', '58c69a9198df1', 'de', '2017-03-13 14:11:45', '2017-03-13 14:11:45'),
('85e8e86d-5504-4093-9a6a-c979dc24e199', 'f5219d4a-2d8c-48a2-b5f3-bb8fb2a5c345', '13.75571', '51.0644', 'Martin-Luther-Straße 21', '', '0', 'Dresden', 'WIR AG', '', '', '58c69a2161efd', 'de', '2017-03-13 14:09:53', '2017-03-13 14:09:53'),
('8b0b7d31-6a78-4db9-8dd8-4ff4d623b2f2', '4f911e41-fe89-4bb4-9cc4-acd2dc39ab6b', '13.77184', '51.05283', 'Fiedlerstraße 2', '', '001307', 'Dresden', 'Gemeindezentrum Ev.-Luth. Johanneskirchgemeinde', '', '', '58c69a8bd6500', 'de', '2017-03-13 14:11:39', '2017-03-13 14:11:39'),
('8bc1288b-a3c1-476f-a106-c441c0902209', '5e8f884a-6f87-4b41-818b-1fc9ce22e71a', '13.711931', '51.050391', 'Cottaer Straße 4', '', '0', 'Dresden', 'GEW Dresden', '', '', '58c69a2e571aa', 'de', '2017-03-13 14:10:06', '2017-03-13 14:10:06'),
('8fc27c16-1826-49f8-9c63-586dd3140001', 'a20e3702-5a1a-426c-a247-415944e13659', '13.737262', '51.050409', '', '', '0', 'Dresden', 'Auf Anfrage', '', '', '58c69a91176a8', 'de', '2017-03-13 14:11:45', '2017-03-13 14:11:45'),
('92439fe0-652f-44fc-b56e-c237f15cd5a1', '903421cc-9c1d-4f85-bab0-edc9a33fb50b', '13.726197', '51.054441', 'Schützengasse 16', '', '001067', 'Dresden', 'Umweltzentrum Dresden', '', '', '58c69a871ed56', 'de', '2017-03-13 14:11:35', '2017-03-13 14:11:35'),
('94de92de-4b7b-4f46-a98c-5721ba35b55f', 'f09d7d60-da42-4aa1-8597-49623e7a64c1', '13.77184', '51.05283', 'Fiedlerstraße 2', '', '0', 'Dresden', 'Gemeindezentrum (an der Trinitatiskirchruine)', '', '', '58c69a96c0c13', 'de', '2017-03-13 14:11:50', '2017-03-13 14:11:50'),
('96481e96-8989-4ad5-a39e-a129e79a577a', 'd5de126b-2cfe-4ac6-8bd6-03ce9d614958', '13.817689', '51.01336', 'Rottwerndorfer Straße 1', '', '0', 'Dresden', 'Himmelfahrtskirche Leuben', '', '', '58c69a44c38c7', 'de', '2017-03-13 14:10:28', '2017-03-13 14:10:28'),
('9982a288-ea69-4f28-901a-e4e18270017e', '33d2b72f-f1d8-4afa-ad0a-adf7789dfeee', '13.75062', '51.0616', 'Glacisstraße 28', '', '001099', 'Dresden', 'Staatsschauspiel Dresden, Kleines Haus Mitte', '', '', '58c69a6fba789', 'de', '2017-03-13 14:11:11', '2017-03-13 14:11:11'),
('9a1c62c3-6fd3-48da-892d-5cb76d29a1aa', 'a737efd6-e031-4269-a4fb-5b6d645901b8', '13.74517', '51.05237', 'Brühlscher Garten 1', '', '001067', 'Dresden', 'Studentenclub Bärenzwinger', '', '', '58c69a710caca', 'de', '2017-03-13 14:11:13', '2017-03-13 14:11:13'),
('9cabce50-daac-4218-87f0-4343a9d84436', '86f9135a-5c25-47f9-955c-860fddd022ba', '13.78175', '51.03365', 'Bodenbacher Str. 24', '', '001277', 'Dresden', 'Gemeindehaus der Ev.-Luth. Kirchgemeinde Gruna-Seidnitz', '', '', '58c69a1caab17', 'de', '2017-03-13 14:09:48', '2017-03-13 14:09:48'),
('9eafe019-4bf9-4dab-93fa-17e1b00dce21', 'e5183492-b946-435b-9337-686ef56ad415', '13.694276', '51.043802', 'Rudolf-Renner-Straße 51', '', '001159', 'Dresden', 'Bürgerbüro Dr. Eva-Maria Stange', '', '', '58c69a8132e07', 'de', '2017-03-13 14:11:29', '2017-03-13 14:11:29'),
('9efb5584-dd70-4a1e-81e9-f048c667af80', '05cbd020-72a1-4a26-8ac1-aaed88b84bb9', '13.756762', '51.064582', 'Martin-Luther-Platz 5', '', '0', 'Dresden', 'Jugendkeller der Martin-Luther-Gemeinde', '', '', '58c69a4b5b1fb', 'de', '2017-03-13 14:10:35', '2017-03-13 14:10:35'),
('9f14d885-6efc-4df2-99aa-455b0b87fbc4', '1b339298-d5e2-4d22-8eba-8094b685ff76', '13.75571', '51.0644', 'Martin-Luther-Straße 21', '', '0', 'Dresden', 'WIR AG', '', '', '58c69a614e457', 'de', '2017-03-13 14:10:57', '2017-03-13 14:10:57'),
('a0737a68-595b-4e72-8ca9-abdf0d74c8f2', 'f582ca04-388c-4225-a5f8-dd2aee92c4ba', '13.806874', '51.006832', 'Niedersedlitzer Straße 50', '', '0', 'Dresden', 'Jugendhaus Prohlis', '', '', '58c69a8ba1a96', 'de', '2017-03-13 14:11:39', '2017-03-13 14:11:39'),
('a21ed60d-3c48-4386-b27a-302dacc485ba', '4f7093e3-b29a-4f4b-afff-c22a8dd8cb6a', '13.734798', '51.041525', 'Prager Straße 2', '', '001069', 'Dresden', 'Passage im Geschäftshaus Prager Spitze', '', '', '58c69a2d72667', 'de', '2017-03-13 14:10:05', '2017-03-13 14:10:05'),
('a3e23beb-e3e4-4b69-9329-a68a6ea1296c', '121a51cc-51b3-49f7-9fb1-dda379d45a4a', '13.789476', '51.036566', 'Schlüterstraße 7', '', '0', 'Dresden', 'Grünes Büro', '', '', '58c69a9f62924', 'de', '2017-03-13 14:11:59', '2017-03-13 14:11:59'),
('a41ce66a-75db-45e7-b518-542e00a57bbe', '5a12725f-a599-48b4-975a-9c368f75b8bf', '13.7427', '51.061749', 'Königstr. 15', '', '001097', 'Dresden', 'Kulturrathaus Dresden', '', '', '58c69a7743c7e', 'de', '2017-03-13 14:11:19', '2017-03-13 14:11:19'),
('ab03df27-d359-4fb9-b8d1-15c2688117bc', 'af7540d7-ac0f-4247-a6b6-11d7a2ed57cf', '13.7579', '51.08141', 'Elisabeth-Boer-Straße 1', '', '0', 'Dresden', 'Stadtarchiv Dresden', '', '', '58c69a5d81e8d', 'de', '2017-03-13 14:10:53', '2017-03-13 14:10:53'),
('ab0f27dc-3c44-4da5-8a62-89a88551f2ae', 'ddb41849-6a9e-4b68-8657-a9c5a50d5fab', '13.7586', '51.06507', 'Pulsnitzer Straße 18', '', '0', 'Dresden', 'DIWAN Café', '', '', '58c69a5a8aec4', 'de', '2017-03-13 14:10:50', '2017-03-13 14:10:50'),
('ab703f7e-0a57-48ad-8012-1dddd855302a', 'a9232d67-6d09-4d33-b5c1-5d633da70a85', '13.669109', '51.04518', 'Merianplatz 4', '', '0', 'Dresden', 'SG Westhang – Schreibwerkstatt Gorbitz im Mittelplunkt des DPBV e.V.', '', '', '58c69a3dec47c', 'de', '2017-03-13 14:10:21', '2017-03-13 14:10:21'),
('acdd37db-26e4-442a-9006-dcb3ccae20cc', '0c0d9dbf-a98f-45aa-9375-3a4499d57632', '13.797896', '51.005567', 'Prohliser Allee 10', '', '0', 'Dresden', 'Bibliothek Prohlis', '', '', '58c69a200840c', 'de', '2017-03-13 14:09:52', '2017-03-13 14:09:52'),
('add031ad-6501-4191-9b59-9356a4f5cab0', 'd061bba2-85c6-4d9c-9375-d356d23929dc', '13.75062', '51.0616', 'Glacisstraße 28', '', '0', 'Dresden', 'Kleines Haus', '', '', '58c69a6aee005', 'de', '2017-03-13 14:11:06', '2017-03-13 14:11:06'),
('b143ffeb-26d8-4ed5-9cd6-059d8ece6740', '64e49b05-2c47-43d2-bf38-7028e51a1552', '13.755891', '51.063211', 'Bautzner Straße 49', '', '0', 'Dresden', 'Kultur Aktiv, Galerie NEUE OSTEN', '', '', '58c69aa151bde', 'de', '2017-03-13 14:12:01', '2017-03-13 14:12:01'),
('b44717c5-faae-41dd-b9e8-500ead494b40', 'b09ed2c2-7a84-4b1e-a1e8-d08bf59e485d', '13.729814', '51.049494', 'Annenstraße 10', '', '001067', 'Dresden', 'Volkshochschule Dresden', '', '', '58c69a572abe3', 'de', '2017-03-13 14:10:47', '2017-03-13 14:10:47'),
('bbdc66c9-e5bc-4f87-b104-d48100dee2cb', '5e8b98cd-3cf7-468a-adf3-cdad1900342c', '13.755891', '51.063211', 'Bautzner Straße 49', '', '0', 'Dresden', 'Kultur Aktiv, Galerie NEUE OSTEN', '', '', '58c69aa1253d9', 'de', '2017-03-13 14:12:01', '2017-03-13 14:12:01'),
('bd35ea2b-7d2f-4a07-ae8d-8cf5324ec84f', 'ec2785ad-b411-4e0d-b259-2af3fdc50272', '13.75571', '51.0644', 'Martin-Luther-Straße 21', '', '0', 'Dresden', 'WIR AG', '', '', '58c69a42c2186', 'de', '2017-03-13 14:10:26', '2017-03-13 14:10:26'),
('be576a71-ff30-437b-bcc0-0a070d52ec0f', 'b835310f-74c9-4a2a-9931-2b6b543f20cb', '13.769624', '51.013728', 'Karl-Laux-Str. 5', '', '001219', 'Dresden', 'SPIKE Dresden', '', '', '58c69a973ca96', 'de', '2017-03-13 14:11:51', '2017-03-13 14:11:51'),
('bf48c88a-19aa-4652-a217-d123adfe0800', 'b0f1593a-492f-48a8-b923-650966d7aa78', '13.756762', '51.064582', 'Martin-Luther-Platz 5', '', '0', 'Dresden', 'Jugendkeller der Martin-Luther-Gemeinde', '', '', '58c69a4e33bad', 'de', '2017-03-13 14:10:38', '2017-03-13 14:10:38'),
('bfb66aa4-9c67-4ae5-9cd5-0b2ca920a146', '09749f04-2ee4-4f74-a1c6-60fb43cda779', '13.7391', '51.04789', 'An der Kreuzkirche 6', '', '001067', 'Dresden', 'Mauersberger Saal', '', '', '58c69a53943dd', 'de', '2017-03-13 14:10:43', '2017-03-13 14:10:43'),
('c20b9984-fb00-4e0b-abde-45eeeca9ad4f', '8a339cea-d779-4feb-9d65-28fa3d766b80', '13.741956', '51.04817', 'Rathausplatz 1', '', '001067', 'Dresden', 'Neues Rathaus Dresden', '', '', '58c69a4d4db64', 'de', '2017-03-13 14:10:37', '2017-03-13 14:10:37'),
('c57dc336-88d9-493d-a0f5-f0e315133e34', 'cd1a56fd-5f2c-43ea-8ebe-4d4774afcc9c', '13.757847', '51.046467', 'Marschnerstraße 2', '', '0', 'Dresden', 'Marwa Elsherbiny Kultur- und Bildungszentrum Dresden', '', '', '58c69a2765311', 'de', '2017-03-13 14:09:59', '2017-03-13 14:09:59'),
('c7e41962-aed4-4aeb-b4ad-4c1e398fadd1', '3ddf75c4-9359-4440-88e7-49e1ae3ae513', '13.741956', '51.04817', 'Rathausplatz 1', '', '001067', 'Dresden', 'Neues Rathaus Dresden', '', '', '58c69a6305195', 'de', '2017-03-13 14:10:59', '2017-03-13 14:10:59'),
('ca1f3b3b-fc63-4e49-baca-6057855b8ee0', '6066861e-8873-4180-9ebc-87e510515a76', '13.760764', '51.055917', 'Elisenstraße 35', '', '001307', 'Dresden', 'Johannstädter Kulturtreff e.V.', '', '', '58c69a9a37a6e', 'de', '2017-03-13 14:11:54', '2017-03-13 14:11:54'),
('cbc399dd-9c70-47d5-a542-3773f106660c', 'be800db5-9f4c-431e-bcf9-bf128dc6412e', '13.833684', '51.028694', 'Österreicher Straße 13', '', '001279', 'Dresden', 'Bibliothek Laubegast', '', '', '58c69a4306e6b', 'de', '2017-03-13 14:10:27', '2017-03-13 14:10:27'),
('cca0a4d0-36f7-48b9-8b61-f223b2b43d6e', 'e5cee0ee-9a4f-4045-8583-c3e7451a5f92', '13.737262', '51.050409', '', '', '0', 'Dresden', 'Haltestelle Hauptbahnhof-Nord (ehemals Soup-Café)', '', '', '58c69a3a5abdd', 'de', '2017-03-13 14:10:18', '2017-03-13 14:10:18'),
('cd225b97-2973-4589-8e3c-576b315c2a35', 'aa428949-d892-4c4a-910a-0833e27dfd93', '13.74938', '51.0505', 'Zirkusstraße 7', '', '001069', 'Dresden', 'Marie-Curie-Gymnasium Dresden, Festsaalgebäude', '', '', '58c69aa28b210', 'de', '2017-03-13 14:12:02', '2017-03-13 14:12:02'),
('cd790a00-c395-4538-9ccb-7a121d16d27e', 'e479a554-408f-4088-a675-cf2547af95c9', '13.720674', '51.056022', 'Wachsbleichstr. 4a', '', '001067', 'Dresden', 'riesa efau', '', '', '58c69a9b25d05', 'de', '2017-03-13 14:11:55', '2017-03-13 14:11:55'),
('cdd128f0-83d0-40cb-bf53-7fa179ab3e72', '454d3013-e34a-4d0d-a904-13913a83b229', '13.755891', '51.063211', 'Bautzner Straße 49', '', '0', 'Dresden', 'Kultur Aktiv, Galerie NEUE OSTEN', '', '', '58c69a7be1f6a', 'de', '2017-03-13 14:11:23', '2017-03-13 14:11:23'),
('ce1db1ef-9610-42c6-b019-d4bdad269ab4', '825c137e-bb21-406d-9e4e-fdc90f79bc30', '13.738002', '51.052632', 'Haus der Kathedrale, Schloßstraße 24', '', '0', 'Dresden', 'Katholische Akademie', '', '', '58c69a86a2efd', 'de', '2017-03-13 14:11:34', '2017-03-13 14:11:34'),
('d0a585ce-b57a-49a3-b2f9-30a230a56f0a', '588d1010-3bda-42d8-bc52-62a401143cec', '13.779714', '51.018438', 'Ott-Dix-Ring 61', '', '001219', 'Dresden', 'Stadtteilbibliothek Strehlen im O. D. C.', '', '', '58c69a6596e25', 'de', '2017-03-13 14:11:01', '2017-03-13 14:11:01'),
('d0df8384-e76c-4ffe-8222-50853eb30750', '8e5378f6-2182-44c8-b706-53acef1be792', '13.7427', '51.061749', 'Königstraße 15', '', '001097', 'Dresden', 'Kinder- und Jugendgalerie EINHORN', '', '', '58c69a31d3a33', 'de', '2017-03-13 14:10:09', '2017-03-13 14:10:09'),
('d19cfb56-1515-47f4-94b8-a4276c3838df', 'fb39f8ac-7444-4b73-b146-39d9f0c7e9df', '13.760764', '51.055917', 'Elisenstraße 35', '', '001307', 'Dresden', 'Johannstädter Kulturtreff e.V.', '', '', '58c69a7ae00e7', 'de', '2017-03-13 14:11:22', '2017-03-13 14:11:22'),
('d28c3f1c-a4db-4402-a1a6-6418e110a87b', '7cace825-b304-4277-bc54-0f56eaacbd21', '13.747374', '51.06752', 'Königsbrücker Straße 26', '', '001099', 'Dresden', 'Bibliothek Neustadt (Städtische Bibliotheken Dresden)', '', '', '58c69a27de285', 'de', '2017-03-13 14:09:59', '2017-03-13 14:09:59'),
('d43fa745-fb37-426c-899a-fcbe8501e3c3', '286be9ab-4a1d-4e5d-8ba7-8684bb1f630e', '13.7485', '51.06445', 'Alaunstraße 13 a', '', '0', 'Dresden', 'Innerspace Dresden', '', '', '58c69a320e0dc', 'de', '2017-03-13 14:10:10', '2017-03-13 14:10:10'),
('d6604d03-adff-4c81-9cb8-e04487f38e16', '5ab23f67-f9df-4f85-bfcc-5f521b4759ff', '13.747374', '51.06752', 'Königsbrücker Straße 26', '', '001099', 'Dresden', 'Bibliothek Neustadt (Städtische Bibliotheken Dresden)', '', '', '58c69a7b8975a', 'de', '2017-03-13 14:11:23', '2017-03-13 14:11:23'),
('da9cfd0c-471a-43b3-aa59-0fddc6a9f9a4', '268565b3-cfd7-45a0-8746-b97036da45be', '13.743011', '51.050073', 'Wilsdruffer Str. 2', '', '001067', 'Dresden', 'Stadtmuseum Dresden', '', '', '58c69a329815b', 'de', '2017-03-13 14:10:10', '2017-03-13 14:10:10'),
('db5bd208-2369-49bb-993c-cc25b442e0eb', '2dae30a7-7f49-41bd-b11f-815ab17bfb27', '13.7391', '51.04789', 'An der Kreuzkirche 6', '', '001067', 'Dresden', 'Mauersberger Saal', '', '', '58c69a56ed749', 'de', '2017-03-13 14:10:46', '2017-03-13 14:10:46'),
('de760a4f-3f19-4309-9f8c-b8aa967b3db1', '6f95c365-5141-4146-9bd8-687b42ee1c4c', '13.756762', '51.064582', 'Martin-Luther-Platz 5', '', '0', 'Dresden', 'Integrations- und Ausländerbeirat Dresden', '', '', '58c69a60bf920', 'de', '2017-03-13 14:10:56', '2017-03-13 14:10:56'),
('e3866823-d6bb-4764-9732-f72fe43d352d', '2655e830-5dfc-4a30-bc71-734cf3c68d35', '13.741956', '51.04817', 'Rathausplatz 1', '', '001067', 'Dresden', 'Neues Rathaus Dresden', '', '', '58c69a9041a0c', 'de', '2017-03-13 14:11:44', '2017-03-13 14:11:44'),
('e4612d58-d7c7-4c44-bc85-bdbecefb12b2', 'e9586c5a-4365-47a9-8447-19db1fc38561', '13.75062', '51.0616', 'Glacisstraße 28', '', '0', 'Dresden', 'Kleines Haus', '', '', '58c69a865926c', 'de', '2017-03-13 14:11:34', '2017-03-13 14:11:34'),
('e493974e-0dcb-4982-b877-474fae2b2a54', 'd7d3071b-9924-448d-b924-9a21465aff54', '13.760764', '51.055917', 'Elisenstraße 35', '', '001307', 'Dresden', 'Johannstädter Kulturtreff e.V.', '', '', '58c69a6aed626', 'de', '2017-03-13 14:11:06', '2017-03-13 14:11:06'),
('e49d60ca-4f8c-4af6-8111-62aa6b6bed0f', '1d6154b9-ab25-43b7-b6e1-13f56b04f21f', '13.66945', '51.04542', 'Merianplatz 4', '', '001169', 'Dresden', 'Bibliothek Gorbitz', '', '', '58c69a1c1fe64', 'de', '2017-03-13 14:09:48', '2017-03-13 14:09:48'),
('e9b6db00-7f70-4a27-b35c-462d40ff57a9', '41d218f5-4af6-4f80-b3b4-b42159e80b28', '13.806499', '51.039399', 'Schandauer Straße 73', '', '0', 'Dresden', 'Programmkino Ost', '', '', '58c69a4655bae', 'de', '2017-03-13 14:10:30', '2017-03-13 14:10:30'),
('ea1d7afb-24fc-4f19-92e3-eaeb2eabff52', '8a3434df-52fd-47ec-827d-7a029ea02c14', '13.734798', '51.041525', 'Prager Straße 2', '', '001069', 'Dresden', 'Ladenfenster direkt an der Haltestelle Hauptbahnhof Nord', '', '', '58c69a90d743d', 'de', '2017-03-13 14:11:44', '2017-03-13 14:11:44'),
('eb8b2949-9ab8-487e-8f9e-65f0d5656aad', '9aa647b9-056f-430c-b5ce-2782479f9d27', '13.76556', '51.026731', 'Elsa-Brändström-Straße 1', '', '0', 'Dresden', 'Gemeindehaus Christuskirche', '', '', '58c69a864c46a', 'de', '2017-03-13 14:11:34', '2017-03-13 14:11:34'),
('edffa5b3-cb38-48a3-8dcf-a92e1ba89044', 'ffdeb7ac-50d4-4aa3-8680-bd570b9d218f', '13.75571', '51.0644', 'Martin-Luther-Straße 21', '', '0', 'Dresden', 'WIR AG', '', '', '58c69a257eb30', 'de', '2017-03-13 14:09:57', '2017-03-13 14:09:57'),
('ee2f6364-752f-404c-b146-b5439a3d946d', 'c11ae939-c91a-4552-9e54-0555c148bc27', '13.720674', '51.056022', 'Wachsbleichstr. 4a', '', '001067', 'Dresden', 'riesa efau', '', '', '58c69a22c68ae', 'de', '2017-03-13 14:09:54', '2017-03-13 14:09:54'),
('ee99f8e9-1387-4ede-b3a9-18279141cfbb', '296d5000-c533-47e0-87b4-7439653591e3', '13.744997', '51.061693', 'Jorge-Gomondai-Platz', '', '0', 'Dresden', '', '', '', '58c69a6091a95', 'de', '2017-03-13 14:10:56', '2017-03-13 14:10:56'),
('f469e3b0-3311-46da-af26-c20e20afb5e5', '450bb251-ea80-428f-a661-14f7e77af97b', '13.76504', '51.07185', 'Marienallee 5', '', '001099', 'Dresden', 'Freie Waldorfschule Dresden', '', '', '58c69a36e8f43', 'de', '2017-03-13 14:10:14', '2017-03-13 14:10:14'),
('f5a2b7c1-0693-40b9-b5da-398b7aa2542c', '1f2fa019-496e-4496-bfb4-61854f24e351', '13.760764', '51.055917', 'Elisenstraße 35', '', '001307', 'Dresden', 'Johannstädter Kulturtreff e.V.', '', '', '58c69a923d535', 'de', '2017-03-13 14:11:46', '2017-03-13 14:11:46'),
('f807f307-9b2d-4ae3-8900-c8f4782ecd1d', 'd23ec402-dc68-4fd5-afd6-9cd51940da0b', '13.78175', '51.03365', 'Bodenbacher Straße 24', '', '0', 'Dresden', 'Gemeindehaus Gruna', '', '', '58c69a95ef1ca', 'de', '2017-03-13 14:11:49', '2017-03-13 14:11:49');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `ddfa_main_domain_model_location`
--
ALTER TABLE `ddfa_main_domain_model_location`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `UNIQ_942C630547A46B0A` (`persistence_object_identifier`), ADD KEY `IDX_942C630557875C8A` (`market_entry_id`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ddfa_main_domain_model_location`
--
ALTER TABLE `ddfa_main_domain_model_location`
ADD CONSTRAINT `FK_942C630557875C8A` FOREIGN KEY (`market_entry_id`) REFERENCES `ddfa_main_domain_model_marketentry` (`persistence_object_identifier`);
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
