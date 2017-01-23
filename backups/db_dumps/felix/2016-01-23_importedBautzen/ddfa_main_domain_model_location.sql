-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Jan 2017 um 02:36
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
('01829a4f-7cef-4c46-a5a8-ecc7f6e66e03', 'caefe784-fc2b-43c8-a6b8-e2cd5071cf26', '14.42515', '51.16362', 'Edison-Straße 17', '', '002625', 'Bautzen', '', '', '', '58855a53d5ed2', 'de', '2017-01-23 02:20:19', '2017-01-23 02:20:19'),
('03cbae83-d1c6-4b11-b3ca-f0227962e197', '2cbfae38-05d5-4e69-b665-f6ac15ffc6ac', '14.181941', '51.130217', 'Bautzener Straße 37', '', '001877', 'Bischofswerda', '', '', '', '58855a5ac6c99', 'de', '2017-01-23 02:20:26', '2017-01-23 02:20:26'),
('047014b9-dd42-4fd3-821f-02cea14b06cc', '3a5924c5-5993-4da3-a1ea-e64d09427ba6', '14.107289', '51.272953', 'Fichtestraße 8', '', '001917', 'Kamenz', '', '', '', '58855a67d4e1e', 'de', '2017-01-23 02:20:39', '2017-01-23 02:20:39'),
('07cb191b-8e2a-4128-9bfd-2f698d61c1c7', 'ca901c01-e050-45b8-9ae5-ef888dae7037', '14.268339', '51.447693', 'Liselotte-Herrmann-Str. 50a', '', '002977', 'Hoyerswerda', '', '', '', '58855a5ee8966', 'de', '2017-01-23 02:20:30', '2017-01-23 02:20:30'),
('0cf6c832-238c-4ce2-9daf-dd2b64fae287', '205de282-737a-4714-869e-565f0100960f', '14.423001', '51.181587', '', '', '002625', 'Bautzen', '', '', '', '58855a3f0a8c5', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59'),
('0d8046f0-3b4f-4e4a-a521-400cc4542b48', 'dc688530-4e97-4c9f-9f86-44d070ba2e2f', '14.27085', '51.43802', 'Ludwig-van-Beethoven-Straße 26', '', '002977', 'Hoyerswerda', '', '', '', '58855a55bc11e', 'de', '2017-01-23 02:20:21', '2017-01-23 02:20:21'),
('12246da3-c3c1-42ba-83cf-a2fe7fc9b3c0', '877eab13-54ef-43aa-a4f7-8da01d65954e', '14.23613', '51.43849', 'Schulstraße 5', '', '002977', 'Hoyerswerda', '', '', '', '58855a62a45fd', 'de', '2017-01-23 02:20:34', '2017-01-23 02:20:34'),
('12cff967-de9b-45fd-ba45-6498eb4b80fb', '1ebd23a3-3649-4ef3-b6be-be1e8040663d', '14.096299', '51.274334', 'Haydnstraße 8', '', '001917', 'Kamenz', '', '', '', '58855a5528be7', 'de', '2017-01-23 02:20:21', '2017-01-23 02:20:21'),
('132ae2dc-f56d-4817-84e6-7136879b9f2b', '3a72eb64-797e-4b3e-ac7f-f0eb26c5a941', '14.430628', '51.18436', 'Am Stadtwall 3', '', '002625', 'Bautzen', '', '', '', '58855a6164edd', 'de', '2017-01-23 02:20:33', '2017-01-23 02:20:33'),
('17723f89-e772-43ef-a88a-56bcd251844b', '92d857a3-250a-4f5a-ba70-68c1496424bd', '14.446848', '51.192657', 'Otto-Nagel-Str. 1', '', '002625', 'Bautzen', '', '', '', '58855a3ee6ac3', 'de', '2017-01-23 02:19:58', '2017-01-23 02:19:58'),
('209b5943-9219-44d9-b76e-91cdf8a20e0b', '7bb251a3-8630-4430-ac4d-def79a2bc5b5', '14.032749', '51.240734', '', '', '001920', 'Haselbachtal ', '', '', '', '58855a4d0a6f6', 'de', '2017-01-23 02:20:13', '2017-01-23 02:20:13'),
('2537342d-8eb4-465e-8143-22667cd25121', '02fe6de1-7f27-490a-aa79-0419b55e93a3', '14.17469', '51.12819', 'Am Lutherpark 7', '', '001877', 'Bischofswerda', '', '', '', '58855a5fa49d8', 'de', '2017-01-23 02:20:31', '2017-01-23 02:20:31'),
('2885c1fc-3d77-4165-8730-a957c64ac9e1', '26fef2eb-5319-42d9-8ffd-fd9a6851ae68', '14.2448', '51.43362', 'Dillinger Straße 1', '', '002977', 'Hoyerswerda', '', '', '', '58855a43d4bbd', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03'),
('2b317e75-b2b7-462d-bc3d-03f82a516570', '56a7fe27-8405-48e9-9b8d-2201a4cfe62a', '14.4342', '51.17441', 'Karl-Liebknecht-Straße 16', '', '002625', 'Bautzen', '', '', '', '58855a5b48701', 'de', '2017-01-23 02:20:27', '2017-01-23 02:20:27'),
('2c69a7ab-4463-464f-bc72-4bf2e8d0b4d3', '64b436df-ba16-44e5-8584-12e3ddac7cc1', '14.44858', '51.19133', 'Wilhelm-Ostwald-Str.19', '', '002625', 'Bautzen', '', '', '', '58855a3f0b933', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59'),
('2d414ec5-a738-4302-9f67-fe1bff0a80ea', 'c424ad62-d9af-44bb-9b09-5859ef715859', '14.096299', '51.274334', 'Haydnstraße 8', '', '001917', 'Kamenz', '', '', '', '58855a514bb37', 'de', '2017-01-23 02:20:17', '2017-01-23 02:20:17'),
('3b4581d7-6076-4610-8da3-813923558325', 'a527a81c-0f37-4a8f-acd5-1f2b6a821b41', '14.42755', '51.18153', 'Wendischer Graben 1', '', '002625 ', 'Bautzen', '', '', '', '58855a4b713a9', 'de', '2017-01-23 02:20:11', '2017-01-23 02:20:11'),
('3dbb4464-09ab-4a17-a26f-e9e2a87ec676', 'd834eb3c-2bd3-4fe1-89b6-4c66b8c1c6ad', '13.9246', '51.12142', 'Bruno-Thum-Weg 2', '', '001454', 'Radeberg', '', '', '', '58855a650a2db', 'de', '2017-01-23 02:20:37', '2017-01-23 02:20:37'),
('45559be9-ce2f-49c7-82f8-5ce1733d2770', '87c6ed7d-1462-4817-a01a-e90f055a87a2', '13.922354', '51.11841', 'Markt 19', '', '001454', 'Radeberg', '', '', '', '58855a4c97cd0', 'de', '2017-01-23 02:20:12', '2017-01-23 02:20:12'),
('47d59290-ef08-4019-aa0b-ee9043d56b56', '1649d1ea-15ca-4812-8c61-ea4d6569962c', '14.42895', '51.180624', 'Kirchplatz 2', '', '002625', 'Bautzen', '', '', '', '58855a5198b6a', 'de', '2017-01-23 02:20:17', '2017-01-23 02:20:17'),
('4b19c82d-89f6-4ba1-8dee-c52f76471257', '5932ddac-f658-4d7f-bd97-dcea432f2b41', '14.093038', '51.270127', 'Pulsnitzer Straße 11', '', '001917', 'Kamenz', '', '', '', '58855a4ccb747', 'de', '2017-01-23 02:20:12', '2017-01-23 02:20:12'),
('4f37eb1e-cb8a-4b17-ba9e-a875452100bf', '1a51b96c-11f7-41ae-bafe-34db18b3eef1', '14.107289', '51.272953', 'Fichtestraße 8', '', '001917', 'Kamenz', '', '', '', '58855a683fd2a', 'de', '2017-01-23 02:20:40', '2017-01-23 02:20:40'),
('5254f818-fdc4-4e4c-bb8c-2869cda0080c', '31b2e6d3-1279-41fb-9d95-a065564ef02c', '13.90118', '51.08304', 'Hauptstr. 2', '', '001454', 'Radeberg', '', '', '', '58855a683bf70', 'de', '2017-01-23 02:20:40', '2017-01-23 02:20:40'),
('53b7268e-c63b-4465-9800-df2426dd6133', 'f87f0353-565d-4212-a12e-dca8bafeb008', '14.1743', '51.12763', ' Lutherstraße 13', '', '001877', 'Bischofswerda', '', '', '', '58855a3f1af91', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59'),
('553142a4-e60b-4a1f-9bb8-7c46e0b0d716', '12f099fd-a260-475c-beb3-7ef28c0071b9', '13.903052', '51.108867', 'Heidestraße 70', '', '001454', 'Radeberg ', '', '', '', '58855a57e06a8', 'de', '2017-01-23 02:20:23', '2017-01-23 02:20:23'),
('5bb703d0-f595-4ab0-a2a6-e66ac557a051', 'ae85e887-f744-400f-81e4-5152f8bdabb2', '14.093038', '51.270127', 'Pulsnitzer Str. 11', '', '001917', 'Kamenz', '', '', '', '58855a5d0ed6a', 'de', '2017-01-23 02:20:29', '2017-01-23 02:20:29'),
('5cce48d0-e463-48c6-b7e7-88b95e761175', 'e47b168e-c7ec-4c98-a23e-d367d89ad076', '14.429462', '51.175784', 'Bahnhofstraße 9', '', '002625', 'Bautzen', '', '', '', '58855a4408ccb', 'de', '2017-01-23 02:20:04', '2017-01-23 02:20:04'),
('61d7377b-0156-4e66-be59-036b2bce1fbd', 'e916c331-bf3a-4718-9089-f97af11b373a', '14.27763', '51.429156', 'Im Industriegelände Straße B Nr.8', '', '002977', 'Hoyerswerda', '', '', '', '58855a43b5aae', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03'),
('7051d470-4779-49b2-a20e-5b2547793584', 'c7202b57-3a54-4593-9fec-90bd7d27210a', '14.18272', '51.12585', 'Bahnhofstraße 21', '', '001877', 'Bischofswerda', '', '', '', '58855a58628cd', 'de', '2017-01-23 02:20:24', '2017-01-23 02:20:24'),
('71939465-7aaf-44b6-84f1-3c57748c7e49', '94857a44-de4e-40d3-9c55-ae5779cb70d7', '14.108999', '51.282667', 'Straße der Einheit 2', '', '001917', 'Kamenz', '', '', '', '58855a56373b6', 'de', '2017-01-23 02:20:22', '2017-01-23 02:20:22'),
('7a5fb3fe-4111-4d49-a1a8-5f1f198ffce7', 'cde087b6-189a-436b-b245-60e7c9e5589e', '14.431904', '51.181205', 'Steinstr. 37', '', '002625', 'Bautzen', '', '', '', '58855a3f0d593', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59'),
('7a9c194d-b7d7-413a-9b5c-e2d8caf07a82', '48f59abf-745c-4a96-a891-e08ec87180b2', '14.446848', '51.192657', 'Otto-Nagel-Str. 1', '', '002625', 'Bautzen', '', '', '', '58855a4317c68', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03'),
('7f40e172-73ea-4abf-acdd-92fcbe3cc83c', '7ecee134-1b46-4b52-bedd-b5f3b0d524e2', '14.096299', '51.274334', 'Haydnstraße 8', '', '001917', 'Kamenz', '', '', '', '58855a52c6504', 'de', '2017-01-23 02:20:18', '2017-01-23 02:20:18'),
('84cc1277-bbd2-4686-a18f-4a1b54f45070', '6ec11cbb-95bc-4984-ae73-ca01987f49d8', '14.42146', '51.17211', 'Preuschwitzer Str. 20', '', '002625', 'Bautzen', '', '', '', '58855a4c4bf21', 'de', '2017-01-23 02:20:12', '2017-01-23 02:20:12'),
('872e93e6-868e-40b9-a76d-6fcd09744cbb', 'ce6dde5c-b053-498c-b9b8-dd90db12c9c2', '14.43389', '51.18694', 'Flinzstraße 15a', '', '002625', 'Bautzen', '', '', '', '58855a5a08218', 'de', '2017-01-23 02:20:26', '2017-01-23 02:20:26'),
('9586f074-3ee6-4d9c-a748-201608f2085d', '4840c45d-b011-4535-a18a-fcc9d475edd9', '13.826482', '51.184583', 'Fried-Walter-Straße 2', '', '001458', 'Ottendorf-Okrilla', '', '', '', '58855a65e8806', 'de', '2017-01-23 02:20:37', '2017-01-23 02:20:37'),
('9b46befd-1b3b-4c3b-ad54-5443b1fbe9ed', '58669ff1-6342-437a-a91e-07f44ca89e8c', '14.431904', '51.181205', 'Steinstr. 37', '', '002625', 'Bautzen', '', '', '', '58855a3f32e4e', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59'),
('9f56291a-79fe-4dfc-97bc-f4e88b798958', 'b0381ca6-0f51-43f2-beae-5e1d224cfe77', '14.253642', '51.438861', '', '', '0', 'Hoyerswerda', '', '', '', '58855a6390a01', 'de', '2017-01-23 02:20:35', '2017-01-23 02:20:35'),
('a855e127-8aea-4d8b-8e0c-29383ac36ff3', '812b0f9a-8dac-4add-a9b5-b69dab44b2d9', '14.096299', '51.274334', 'Haydnstraße 8', '', '001917', 'Kamenz', '', '', '', '58855a5554499', 'de', '2017-01-23 02:20:21', '2017-01-23 02:20:21'),
('aa1cbc73-cb47-47f0-8b07-9f16c09bc3dd', '92424105-5644-40c5-8423-f2ec3d24526f', '14.43649', '51.17036', 'Dr.-Peter-Jordan-Straße 21', '', '002625', 'Bautzen', '', '', '', '58855a47f124a', 'de', '2017-01-23 02:20:07', '2017-01-23 02:20:07'),
('ac9b70ec-7977-4c4e-8a8e-656ba2ac8ea2', 'f112c391-86b6-4307-81db-dc43d4799cca', '14.42895', '51.180624', 'Kirchplatz 2', '', '002625', 'Bautzen', '', '', '', '58855a5a220af', 'de', '2017-01-23 02:20:26', '2017-01-23 02:20:26'),
('af07f518-e6a0-4757-8c8b-aff8cc4e7577', '84babb64-6e7a-408c-8888-44e5773f1590', '14.43362', '51.17186', 'Dr.-Peter-Jordan-Str. 9', '', '002625', 'Bautzen', '', '', '', '58855a473b13b', 'de', '2017-01-23 02:20:07', '2017-01-23 02:20:07'),
('b0926538-1bbe-42c6-b1be-21c44c42e47c', '2fd701ce-b88f-423f-8dab-0529467097c9', '14.27044', '51.45213', 'Thomas-Müntzer-Str. 26', '', '002977', 'Hoyerswerda', '', '', '', '58855a4dbc1ae', 'de', '2017-01-23 02:20:13', '2017-01-23 02:20:13'),
('b66221d9-a8ca-4d16-9138-e101fe4b0356', 'c699ac1a-a931-4274-94fd-7a96b6f54f50', '14.113972', '51.288619', 'Macherstr. 144a', '', '001917', 'Kamenz', '', '', '', '58855a484d852', 'de', '2017-01-23 02:20:08', '2017-01-23 02:20:08'),
('b670cbb7-7499-482c-93bb-850b3df94dc8', '2d51ddbb-baa7-4144-915f-ebcfef57e8f1', '14.37572', '51.05435', 'Dresdner Str.33', '', '002689', 'Sohland', '', '', '', '58855a439f253', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03'),
('b77d76a3-b2f1-4bbc-9507-1c15ad6e2d13', '8d317cfb-e96a-491b-bc20-08ff50634eff', '14.107289', '51.272953', 'Fichtestraße 8', '', '001917', 'Kamenz', '', '', '', '58855a646d56b', 'de', '2017-01-23 02:20:36', '2017-01-23 02:20:36'),
('c6a7633b-5f0c-4ae0-a1f6-403bc5ac85c2', '09084f2a-d67d-4144-9de0-810e59a6214f', '14.1912', '51.12325', 'Belmsdorfer Straße 28', '', '001877', 'Bischofswerda', '', '', '', '58855a50ae612', 'de', '2017-01-23 02:20:16', '2017-01-23 02:20:16'),
('c929363b-cd18-4b53-8771-a2b6f79fffb1', '08241022-c6f5-4a96-b285-6666bc863bc6', '14.24321', '51.43901', 'Markt 1', '', '002977', 'Hoyerswerda', '', '', '', '58855a483c685', 'de', '2017-01-23 02:20:08', '2017-01-23 02:20:08'),
('c975bfb9-f506-4ea4-bb25-444e4a88467a', '894c9ce1-963f-4ecc-8a99-a00ad6d1ae14', '14.27763', '51.429156', 'Im Industriegelände Str. B Nr. 8', '', '002977', 'Hoyerswerda', '', '', '', '58855a43ba351', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03'),
('cbc58aca-5b52-4683-9d91-8f74a60024c4', '6214d968-3c4d-4e62-830e-d96dfd25a0cb', '14.38219', '51.09649', 'Dresdener Straße 35', '', '002681', 'Wilthen', '', '', '', '58855a6019b1b', 'de', '2017-01-23 02:20:32', '2017-01-23 02:20:32'),
('d161b56c-3902-4408-993d-143babcaa51d', '67e9b62a-ea22-451c-a567-e906afb65e00', '14.42895', '51.180624', 'Kirchplatz 2', '', '002625', 'Bautzen', '', '', '', '58855a50f1764', 'de', '2017-01-23 02:20:16', '2017-01-23 02:20:16'),
('d1a87d2e-4fe3-4d8e-9bff-7831eb9144ae', '520470dd-e27f-424c-abaf-57d4f8ef5a39', '14.095246', '51.272039', 'Lessingplatz 3', '', '001917', 'Kamenz', '', '', '', '58855a4870f15', 'de', '2017-01-23 02:20:08', '2017-01-23 02:20:08'),
('dee6bd88-27ae-4dc9-9d03-9c131462f27e', '8cb0930a-d92b-4c54-91be-fc6e0faa8de0', '14.25677', '51.43637', 'Dietrich-Bonhoeffer-Straße 6', '', '002977', 'Hoyerswerda', '', '', '', '58855a692f1c9', 'de', '2017-01-23 02:20:41', '2017-01-23 02:20:41'),
('e057e496-5772-4538-b1ce-45f9235fe7da', 'd7f11608-d5dc-4f8a-a20c-4cfd84afde8d', '14.44563', '51.17977', 'Löbauer Straße 48', '', '002625', 'Bautzen', '', '', '', '58855a5ee8a3e', 'de', '2017-01-23 02:20:30', '2017-01-23 02:20:30'),
('e454d43f-5f71-48a7-813b-31772a4a4e55', '1026439f-6825-4f80-85bb-718a50444621', '14.429835', '51.183108', 'Töpferstr. 17', '', '002625', 'Bautzen', '', '', '', '58855a5d7f684', 'de', '2017-01-23 02:20:29', '2017-01-23 02:20:29'),
('e461c5bf-d243-4bbb-b1a3-9c6c182a5355', 'b0566a16-1601-410f-b2f4-0779c2826067', '14.17918', '51.128133', 'Altmarkt 1', '', '001877', 'Bischofswerda', '', '', '', '58855a4fa1b6f', 'de', '2017-01-23 02:20:15', '2017-01-23 02:20:15'),
('e97d8114-f7c7-4147-8b37-3f7ec7009890', 'b93d6f73-21e3-4dea-b7bf-c45031c0f807', '14.42196', '51.18328', 'Schloßstraße 10/12', '', '002625', 'Bautzen', '', '', '', '58855a48de259', 'de', '2017-01-23 02:20:08', '2017-01-23 02:20:08'),
('f4cf5972-02e9-4fa8-a225-0bee75490b5b', 'c4cf35ae-fb48-4e35-9241-b96566f3a3fe', '14.17894', '51.12697', 'Dresdener Straße 1', '', '001877', 'Bischofswerda', '', '', '', '58855a69a165b', 'de', '2017-01-23 02:20:41', '2017-01-23 02:20:41'),
('fab9324c-a9da-4825-a3ea-b1674d96901a', '12b2df9f-040d-4402-a3e3-eed8335c9044', '14.423775', '51.182293', '', '', '0', 'Bautzen', '', '', '', '58855a6394684', 'de', '2017-01-23 02:20:35', '2017-01-23 02:20:35'),
('ff8360d1-ac38-496a-8091-b19d8a625d59', '755c6c2c-1dc4-4276-bd7a-2764995e9740', '13.900968', '51.137561', 'Rödertalstraße 73', '', '001454', 'Radeberg (OT Liegau-Augustusbad)', '', '', '', '58855a68c5922', 'de', '2017-01-23 02:20:40', '2017-01-23 02:20:40');

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
