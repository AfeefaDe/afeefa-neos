-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Jan 2017 um 14:57
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
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_category`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_category` (
  `persistence_object_identifier` char(36) COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:guid)',
  `entry_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `locale` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_category`
--

INSERT INTO `ddfa_main_domain_model_category` (`persistence_object_identifier`, `entry_id`, `locale`, `name`, `description`, `type`, `created`, `updated`) VALUES
('010cfae4-7506-425b-ba37-80e8d83427f0', '', '', 'general', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('07f88130-7d98-4a20-bbb8-d0d98f55c553', '55701e6a33160', 'de', 'community', '', 1, '2015-06-04 11:46:18', '2015-06-04 11:46:18'),
('5dddf63d-ccf6-44e2-8daf-81bb44507fdd', '55701e31bc4ef', 'de', 'language', '', 1, '2015-06-04 11:45:21', '2015-06-04 11:45:21'),
('744f41e9-799c-432b-a9a3-e78d471ec51a', '55701e5f83ba7', 'de', 'donation', '', 1, '2015-06-04 11:46:07', '2015-06-04 11:46:07'),
('adfb2457-819c-4574-ace1-56f5b38d8f96', '556e2704b4e91', 'de', 'leisure', '', 1, '2015-06-02 23:58:28', '2015-06-02 23:58:28'),
('d29bbe86-ecd6-42df-8054-70a90ec7b535', '55701e3a1dee3', 'de', 'jobs', '', 1, '2015-06-04 11:45:30', '2015-06-04 11:45:30'),
('df402493-f467-4472-8b98-9038d2ac967e', '55701e1d724b7', 'de', 'consultation', '', 1, '2015-06-04 11:45:01', '2015-06-04 11:45:01'),
('fa815876-ad1d-433e-87ff-8de20639e2b1', '55701e2712c4c', 'de', 'medic', '', 1, '2015-06-04 11:45:11', '2015-06-04 11:45:11');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_feedback`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_feedback` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `message` longtext COLLATE utf8_unicode_ci NOT NULL,
  `metadata` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_language`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_language` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `language` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rtl` tinyint(1) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_marketentry`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_marketentry` (
  `persistence_object_identifier` char(36) COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:guid)',
  `parent_entry_id` char(36) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '(DC2Type:guid)',
  `category_id` char(36) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '(DC2Type:guid)',
  `offer` tinyint(1) DEFAULT NULL,
  `datefrom` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateto` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timefrom` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timeto` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `area` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8_unicode_ci,
  `mail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `web` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subcategory` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(11) NOT NULL,
  `speakerpublic` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `speakerprivate` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagetype` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supportwanted` tinyint(1) DEFAULT NULL,
  `forchildren` tinyint(1) DEFAULT NULL,
  `spokenlanguages` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `internalcomment` longtext COLLATE utf8_unicode_ci,
  `entry_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `locale` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `certified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_marketentry`
--

INSERT INTO `ddfa_main_domain_model_marketentry` (`persistence_object_identifier`, `parent_entry_id`, `category_id`, `offer`, `datefrom`, `dateto`, `timefrom`, `timeto`, `area`, `name`, `description`, `mail`, `web`, `facebook`, `phone`, `subcategory`, `type`, `speakerpublic`, `speakerprivate`, `image`, `imagetype`, `supportwanted`, `forchildren`, `spokenlanguages`, `published`, `internalcomment`, `entry_id`, `locale`, `created`, `updated`, `certified`) VALUES
('02fe6de1-7f27-490a-aa79-0419b55e93a3', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Psychosoziale Beratungs- und Behandlungsstelle (PSBB) für Suchtgefährdete und –kranke der AWO KV Bautzen e.V.', 'siehe oben', 'siehe oben', 'siehe oben', '', '03594 703408 ', '', 0, 'Christiane Schiemank (Diplom-Sozialpädagogin/Diplom-Sozialarbeiterin)', 'Christiane Schiemank (Diplom-Sozialpädagogin/Diplom-Sozialarbeiterin)', NULL, NULL, 0, 0, '', 1, NULL, '58855a5fa4794', 'de', '2017-01-23 02:20:31', '2017-01-23 02:20:31', 0),
('08241022-c6f5-4a96-b285-6666bc863bc6', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Stadt Hoyerswerda, Beauftragter für Asyl und Integration', 'Ansprechpartner für die Bürgerschaft, Vereine und Verbände sowie Gewerbetreibende bei Fragen zum Thema Asyl und Integration, Vernetzung von Akteuren in der Stadt und Beratung zu entsprechenden Förderungen und Programmen.', 'kai.petschick@hoyerswerda-stadt.de', 'www.hoyerswerda.de', '', '03571 456402', 'authority', 0, 'Kai Petschick', 'Kai Petschick', NULL, NULL, 0, 0, 'Deutsch, Englisch', 1, NULL, '58855a483c3f4', 'de', '2017-01-23 02:20:08', '2017-01-23 02:20:08', 0),
('09084f2a-d67d-4144-9de0-810e59a6214f', NULL, 'adfb2457-819c-4574-ace1-56f5b38d8f96', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Begegnungscafé im Offenen Treff /  Jugendhaus Freizone', 'Montags zwischen 16 und 18 Uhr findet im Offenen Treff Freizone das Begegnungscafé statt, welches interessierte Menschen zum Beisammensein einlädt. Bei Fragen und Hilfsangeboten zum Thema Asyl und Integration können Interessenten in der parallel stattfindenden Bürgersprechstunde beraten werden.', 'buergerinfo-asyl@bischofswerda.de ', 'http://www.bischofswerda.de/rathaus-und-verwaltung/asyl-und-integration.html', '', '03594 716809', '', 0, 'Martina Jordan', 'Martina Jordan', NULL, NULL, 0, 0, '', 1, NULL, '58855a50ae386', 'de', '2017-01-23 02:20:16', '2017-01-23 02:20:16', 0),
('1026439f-6825-4f80-85bb-718a50444621', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Sozialverband VdK Sachsen e.V. - Beratungsstelle für behinderte und chronisch kranke Menschen', 'Eine Beratung ist nicht an eine Mitgliedschaft gebunden. Die Mitgliedschaft ist notwendig, wenn wir Sie gegenüber Behörden vertreten sollen. Eine Mitgliedschaft kann weiterhin erforderlich werden, wenn wir das komplette Ausfüllen von Anträgen für Sie übernehmen sollen.', 'kv-bautzen@vdk.de', 'http://www.vdk.de/kv-bautzen/ID40128', '', '03591 / 48 13 61', '', 0, 'Jörg Jonas', 'Jörg Jonas', NULL, NULL, 0, 0, '', 1, NULL, '58855a5d7f4ba', 'de', '2017-01-23 02:20:29', '2017-01-23 02:20:29', 0),
('12b2df9f-040d-4402-a3e3-eed8335c9044', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Selbsthilfekontaktstelle der Diakonie im Landkreis Bautzen', 'siehe oben', 'sks-hy@diakonie-hoyerswerda.de', 'http://selbsthilfe-landkreis-bautzen.de/, http://www.diakonie-goerlitz.de/beratungsdienste/selbsthilfekontaktstelle-landkreis-bautzen/sks-angebote.html', '', '03591 / 35 15 86 3', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a63943e6', 'de', '2017-01-23 02:20:35', '2017-01-23 02:20:35', 0),
('12f099fd-a260-475c-beb3-7ef28c0071b9', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas - Schuldnerberatung ', 'Außenstelle des Caritasverbands Dresden e.V.', '', 'https://www.caritas.de/adressen/caritasverband-fuer-dresden-e.-v/schuldnerberatung-radeberg/01454-radeberg/107760', '', '03528 9462118', '', 0, 'Irene Scheithauer', 'Irene Scheithauer', NULL, NULL, 0, 0, '', 1, NULL, '58855a57e03da', 'de', '2017-01-23 02:20:23', '2017-01-23 02:20:23', 0),
('1649d1ea-15ca-4812-8c61-ea4d6569962c', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas Verband Oberlausitz e.V.- Schwangerschaftsberatung, Einzel- und Paarberatung, Sexualpädagogik', 'Sexualpädagogik - Gruppenangebote für Schulen, Gemeinden, Kinder und Jugendliche sowie Eltern', 'schwangerschaftsberatung@caritas-oberlausitz.de', 'http://www.caritas-oberlausitz.de/cs1.htm#Schwangerschaftsberatung%20Bautzen', '', '03591 498260', '', 0, 'Gisela Grubert und Franziska Hennig', 'Gisela Grubert und Franziska Hennig', NULL, NULL, 0, 0, '', 1, NULL, '58855a5198915', 'de', '2017-01-23 02:20:17', '2017-01-23 02:20:17', 0),
('1a51b96c-11f7-41ae-bafe-34db18b3eef1', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Schwangeren- und Familienberatung der Diakonie Kamenz, Diakonisches Werk Kamenz e.V.', '- Beratung zu rechtlichen, psychosozialen und medizinischen Fragen, -Beratung zu Fragen der Familienplanung, Empfängnisverhütung und Sexualität , -Unterstützung bei der Vermittlung finanzieller Hilfen für Schwangere und Familien , -Beratung im Zusammenhang mit vorgeburtlichen Untersuchungen , -Beratung nach Schwangerschaftsabbruch, -Unterstützung bei der Bewältigung von Fehl- und Totgeburten , -Schwangerschaftskonfliktberatung nach § 219 StGB, -Paar- und Lebensberatung, -Gruppenveranstaltungen und Sexualpädagogik, -Beratung zu Kuren für Mütter, Väter bzw. Schwangere.            Die Beratung ist kostenfrei und unabhängig von Religion oder Weltanschauung. Wir unterliegen der gesetzlichen Schweigepflicht und beraten Sie auf Wunsch anonym.K57', 'sfb.dw-kamenz@evlks.de', 'http://www.diakonie-kamenz.de/beratungsdienste_schwangeren-_und_familienberatung_de.html', '', '03578 3854-40', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a683fad4', 'de', '2017-01-23 02:20:40', '2017-01-23 02:20:40', 0),
('1ebd23a3-3649-4ef3-b6be-be1e8040663d', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas Verband Oberlausitz e.V. - Soziale Beratung für Schuldner', '', 'schuldnerberatung@caritas-oberlausitz.de', 'http://www.caritas-oberlausitz.de/cs1.htm#Schuldner', '', '03578 374323', '', 0, 'Bernward Kreutzkam, Jochen Minihoffer ', 'Bernward Kreutzkam, Jochen Minihoffer ', NULL, NULL, 0, 0, '', 1, NULL, '58855a552895e', 'de', '2017-01-23 02:20:21', '2017-01-23 02:20:21', 0),
('205de282-737a-4714-869e-565f0100960f', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Willkommen in Bautzen e.V.', 'Der Verein WILLKOMMEN IN BAUTZEN e.V. wurde im Juni 2015 von engagierten Bautzener Bürgern aus dem Bündnis Bautzen bleibt Bunt heraus gegründet. Der Verein hat sich zum Ziel gesetzt, in Bautzen und Umgebung die ehrenamtliche Arbeit  für die in Bautzen lebenden Flüchtlinge durch eine transparente Verwaltung von Spenden und Preisgeldern, die Finanzierung von Projekten und Öffentlichkeitsarbeit zu unterstützen. Der Verein fördert alle Aktivitäten, die der Integration von Flüchtlingen in die Bautzener Gemeinschaft und der Toleranz gegenüber fremden Kulturen dienlich sind. Genauso werden Projekte gefördert, die sich gegen Fremdenfeindlichkeit und Rassismus richten. Der Verein ist gemeinnützig tätig, überparteilich, konfessionslos und nicht kommerziell.\n', 'info@willkommeninbautzen.de', 'www.willkommeninbautzen.de', 'https://de-de.facebook.com/willkommeninbautzen/', '', '', 0, 'Andreas von Geibler', 'Andreas von Geibler (Vorstandsvorsitzender), Karl-Heinz Biesold (Vorstandmitglied), Elisabeth Hauswald (Vorstandsmitglied),Katrin Heimbürger(Vorstandsmitglied), Astrid Riechmann (Schatzmeisterin)', NULL, NULL, 0, 0, '', 1, NULL, '58855a3f0a5fe', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59', 0),
('26fef2eb-5319-42d9-8ffd-fd9a6851ae68', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Bürgerbündnis Hoyerswerda hilft mit Herz', 'Hoyerswerda hilft mit Herz ist eine Bürgerinitiative der Stadt, welche sich gefunden hat, um den Geflüchteten in der Stadt zu helfen. Dies äußert sich in unterschiedlichen Arbeitsfeldern. Von ehrenamtlichen Deutschunterricht und Kinderbetreuung, zu Patenschaften und Unterstützung bei der Wohnungseinrichtung. Auch Geflüchtete können zum Bündnis kommen, sollten sie Unterstützung oder Beratung benötigen. ', 'BB-Hoy-hilft@t-online.de', 'www.hoyerswerda-hilft-mit-herz.de', '', '03571-6099905', '', 0, 'Luise Dosch', 'Luise Dosch', NULL, NULL, 0, 0, 'Deutsch, Englisch, Russisch', 1, NULL, '58855a43d4864', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03', 0),
('2cbfae38-05d5-4e69-b665-f6ac15ffc6ac', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Sozialberatung des Diakonischen Werkes Bautzen e.V. ', 'siehe unten', 'h.kreiss@diakonie-bautzen.de', 'http://www.diakonie-bautzen.de/BERATUNG-UND-HILFE/Sozialarbeit-und-soziale-Beratung.html', '', '03594 756143 (während der Sprechzeit) oder unter 03591  481650', '', 0, 'Hermann Kreiß', 'Hermann Kreiß', NULL, NULL, 0, 0, '', 1, NULL, '58855a5ac69f1', 'de', '2017-01-23 02:20:26', '2017-01-23 02:20:26', 0),
('2d51ddbb-baa7-4144-915f-ebcfef57e8f1', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Gruppe blickKONTAKT Wehrsdorf', 'Freiwilligeninitiative für das Flüchtlingsheim Wehrsdorf', 'gross.wehrsdorf@web.de', '', '', '035936/34268', '', 0, '', 'Katharina und Heino Groß', NULL, NULL, 0, 0, '', 1, NULL, '58855a439efd4', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03', 0),
('2fd701ce-b88f-423f-8dab-0529467097c9', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Koordinator AWO Kreisverband Lausitz e.V., Schwerpunkt Asyl', 'Der Koordinator für Asyl des AWO Kreisverbands Lausitz e.V. ist verantwortlich für den Bereich Asylunterkünfte der AWO und fungiert somit als Schnittstelle zwischen Partnereinrichtungen, Landes- und Bundesverbänden, politischen Stellen und Verwaltungen.', 'K.Stanulla@awo-lausitz.de', 'http://awo-lausitz.de/', '', '0163/6987501', '', 0, 'Kevin Stanulla', 'Kevin Stanulla', NULL, NULL, 0, 0, '', 1, NULL, '58855a4dbbf62', 'de', '2017-01-23 02:20:13', '2017-01-23 02:20:13', 0),
('31b2e6d3-1279-41fb-9d95-a065564ef02c', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Stadtbibliothek Radeberg', 'Die Stadtbibliothek Radeberg liegt mitten im Zentrum der Stadt und ist ein beliebter Treffpunkt für Jung und Alt. Die Bibliothek bietet durch ihre technisch moderne und behindertengerechte Ausstattung für Sie eine komfortable Nutzung und schafft Raum zum Lernen und Entspannen. Der Bestand bietet ein umfassendes Angebot an Romanen, Kinderbüchern, Fachliteratur sowie audiovisuelle Medien (DVD, CD, CD-ROM, Wii-Spiele). Seit Mai 2013 haben Sie zusätzlich die Möglichkeit, digitale Medien über die Oberlausitzer Onleihe auszuleihen. Zur Anmeldung in der Bibliothek benötigen Sie den Personalausweis oder ein anderes gültiges Dokument in Verbindung mit der amtlichen Meldebescheinigung. Die Ausleihe ist kostenlos. Gebühren entstehen für besondere Dienstleistungen oder bei Versäumnissen entsprechend der Benutzungsordnung, der Benutzungsordnung für Online-Dienste und der Gebührenordnung. In der Stadtbibliothek Radeberg finden jedes Jahr eine Reihe von Veranstaltungen statt, wie z. B.: Klassenführungen mit Interneteinführung, Autorenlesungen, Vorlesenachmittage für Kinder, lit. Veranstaltungen für Erwachsene, Bücherflohmarkt, Ausstellungen zu aktuellen Themen in Bibliotheksräumen. Außerdem ist in der Bibliothek ständig wechselnde Ausstellungen, organisiert vom Kunstverein Radeberg e. V.', 'bibliothek@radeberg.de', 'http://www.radeberg.de/inhalte/radeberg/_inhalt/bildung_soziales/bibliothek/bibliothek', '', '(03528) 44 23 80', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a683bda0', 'de', '2017-01-23 02:20:40', '2017-01-23 02:20:40', 0),
('3a5924c5-5993-4da3-a1ea-e64d09427ba6', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Diakonisches Werk Pirna e.V. - Jugendmigrationsdienst Pirna', 'Wir beraten, begleiten, informieren und unterstützen junge Menschen mit Migrationshintergrund im Alter von 12 bis 27 Jahren. Wir helfen bei der sprachlichen, beruflichen und sozialen Eingliederung. Wir geben Orientierungshilfen in allgemeinen Integrationsangelegenheiten, bei der Ausbildungs- und Berufswahl. Wir bieten Informationsveranstaltungen zu verschiedenen Themen sowie Bewerbungstrainings an. Schwerpunkte: - allgemeine Beratung in persönlichen und finanziellen Fragen,  Informationen zu Ausbildungssystem und Arbeitsmarkt, - berufliche Orientierung, -  Bewerbungshilfe, - Anerkennung ausländischer Abschlüsse ', 'jmd@diakonie-pirna.de ', 'http://www.diakonie-kamenz.de/beratungsdienste_angebote_fuer_migranten_de.html', '', '03578 3854-23', '', 0, 'Katrin Niederlag', 'Katrin Niederlag', NULL, NULL, 0, 0, 'deutsch, englisch, russisch', 1, NULL, '58855a67d4c56', 'de', '2017-01-23 02:20:39', '2017-01-23 02:20:39', 0),
('3a72eb64-797e-4b3e-ac7f-f0eb26c5a941', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Psychosoziale Beratungs- und Behandlungsstelle (PSBB) für Suchtgefährdete und –kranke der AWO KV Bautzen e.V.', 'siehe oben', 'siehe oben', 'siehe oben', '', '03591 3261140 (PSBB) , 03591 3632492 (Sozialdienst)', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a6164bf5', 'de', '2017-01-23 02:20:33', '2017-01-23 02:20:33', 0),
('4840c45d-b011-4535-a18a-fcc9d475edd9', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Suchtberatungs- und -behandlungsstelle der Diakonie Kamenz, Diakonisches Werk Kamenz e.V.', 'siehe oben', 'sbb.dw-kamenz@evlks.de', 'http://www.diakonie-kamenz.de/suchtberatungs-_und_-behandlungsstelle_wann_wo_de.html', '', 'Beratung nach telefonischer Terminvereinbarung Büro Kamenz Telefon 03578 3854-30 (für Ottendorf) , für Pulsnitz: 035955 749415', '', 0, 'Jens Gahrig (Ottendorf), Kerstin Rayczyk (Pulsnitz)', 'Jens Gahrig (Ottendorf), Kerstin Rayczyk (Pulsnitz)', NULL, NULL, 0, 0, '', 1, NULL, '58855a65e856c', 'de', '2017-01-23 02:20:37', '2017-01-23 02:20:37', 0),
('48f59abf-745c-4a96-a891-e08ec87180b2', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Leuchtturm-Majak e. V.', 'Leuchtturm-Majak eine Migrantenselbstorganisation. Sie existiert seit 2006. Ziel: Hilfe für Menschen mit und ohne Migrationshintergrung. Tätigkeiten: Arbeit mit Kinder und Jugendliche: Freizeit, außerschulische Bildung. Seit 2012 ist der Verein der anerkannten  Träger der freien Jugendhilfe gemäß §75 SGB VIII, Arbeit mit Migranten: Beratung, Begleitung, Sprachmittlung, Schulung, Sprachtraining, Freizeit, Arbeit mit Senioren: Seniorentreffen, Alltagsbegleitung, Stützpunkt für Demenzkranke und ihren Angehörigen, Freizeit, Kulturarbeit: Freizeit, Interkulturelle Begegnungen, Feste, Kulturbeiträge ', 'leuchtturm-majak@gmx.de', 'http://www.leuchtturm-majak.de/startseite.html ', '', '03591/5969094', '', 0, 'Natalia Dies', 'Natalia Dies', NULL, NULL, 0, 0, 'deutsch, russisch, arabisch, englisch', 1, NULL, '58855a4317ab8', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03', 0),
('520470dd-e27f-424c-abaf-57d4f8ef5a39', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Stadtbibliothek G. E. Lessing', 'Unterstützung bei Informationsrecherchen und Literatursuche,  Bibliothekseinführungen, Schüler-Seminare, Kinderveranstaltungen, Nutzung des Internets, Anfertigen von Kopien und Ausdrucken', 'bibliothek@stadt.kamenz.de', 'https://kamenz.bibliotheca-open.de/Willkommen.aspx', '', 'Tel.: 03578/379-288', '', 0, 'Marion Kutter, Bibliotheksleiterin', 'Marion Kutter, Bibliotheksleiterin', NULL, NULL, 0, 0, 'Deutsch, Englisch', 1, NULL, '58855a4870c39', 'de', '2017-01-23 02:20:08', '2017-01-23 02:20:08', 0),
('56a7fe27-8405-48e9-9b8d-2201a4cfe62a', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Sozialberatung des Diakonischen Werkes Bautzen e.V. ', 'In unserer Stadt bzw. unserem Landkreis gibt es eine Beratungsstelle, an die Sie sich mit Ihren Fragen und Problemen wenden können - die Allgemeine soziale Beratung bzw. Kirchenbezirkssozialarbeit der Diakonie Bautzen. Sie können hier klären, welchen Teil Ihres Problems Sie selbst bewältigen können und welchen Sie sich durch Information und Hilfe von außen abnehmen lassen können. Dafür dürfen Sie sich auch Zeit geben. Veränderung kommt selten schlagartig. U. a. dürfen sich auch Selbsthilfegruppen vertrauensvoll an uns wenden. Die fachlich kompetenten Mitarbeitenden bieten in regelmäßigen Sprechstunden und Hausbesuchen ihren Dienst kostenlos an. Kein Außenstehender wird etwas von Ihrem Anliegen erfahren, denn die Berater sind zur Verschwiegenheit verpflichtet. Die Beratung ist nicht an eine Kirchengehörigkeit gebunden. Unser Angebot: Anlaufstelle für Hilfesuchende, Hilfs- und Beratungsangebote für Einzelpersonen, Familien und Gruppen, Professionelle Beratung für Gemeindekreise, Kirchenvorstände, Mitarbeitende kirchlicher und kommunaler Dienste, Anhörung, Bearbeitung und/oder Vermittlung Ihres Anliegens, Vernetztes Hilfsangebot mit anderen sozialen Trägern, Ämtern und Behörden, Gemeinsames Erarbeiten eines Lösungskonzeptes für Ihre Probleme, Vermittlung von lebenspraktischen und finanziellen Hilfen, Psychosoziale Betreuung, Beratungsangebot für Familien- und Seniorenerholung, sowie Kuren und Freizeiten, Öffentlichkeitsarbeit durch Vorträge u. a. (Information, Prävention), Ehrenamtliche Mitarbeit', 'h.kreiss@diakonie-bautzen.de', 'http://www.diakonie-bautzen.de/BERATUNG-UND-HILFE/Sozialarbeit-und-soziale-Beratung.html', '', ' 03591  481650', '', 0, 'Hermann Kreiß', 'Hermann Kreiß', NULL, NULL, 0, 0, '', 1, NULL, '58855a5b48464', 'de', '2017-01-23 02:20:27', '2017-01-23 02:20:27', 0),
('58669ff1-6342-437a-a91e-07f44ca89e8c', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Bautzen bleibt bunt - Bürgerbündnis für Gastfreundschaft, Menschlichkeit und Toleranz', 'Das Bündnis Bautzen bleibt bunt setzt sich für eine Willkommenskultur Asylsuchender und Ausländer in Bautzen ein, zeigt Flagge für ein friedvolles Miteinander von Bürgern und Asylsuchenden und bezieht Stellung gegen rassistische, unmenschliche Äußerungen und Vorurteile. Mit dieser Gemeinschaft möchte gezeigt werden, dass Bautzen gastfreundlich, tolerant und weltoffen den Menschen gegenüber ist, die aufgrund von Notsituationen eine Bleibe in Deutschland suchen und hierbei auch in Bautzen untergebracht werden. Das Bündnis möchte damit ein Zeichen setzen gegen menschenfeindliche Vorurteile und Vorverurteilungen und eine positive Willkommenskultur schaffen.  Bautzen bleibt bunt – Budyšin wostanje pisany” steht für Weltoffenheit, Menschlichkeit und Toleranz! Es ist überparteilich, überkonfessionell, nichtkommerziell. ', 'info@bautzenbleibtbunt.de', 'http://www.bautzenbleibtbunt.de', 'https://www.facebook.com/bautzen.bleibt.bunt/', 'Bündnis: 03591/531 8076  Kontaktbüro: 0171/9792 101', '', 0, 'Hauptanprechpartnerin: Manja Gruhn, Kontaktbüro: Anne-Marie Russew', 'Hauptanprechpartnerin: Manja Gruhn, Kontaktbüro: Anne-Marie Russew', NULL, NULL, 0, 0, 'Deutsch, Englisch,???', 1, NULL, '58855a3f32b99', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59', 0),
('5932ddac-f658-4d7f-bd97-dcea432f2b41', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Bündnis für Humanität und Toleranz', 'Engagierte Bürgerinnen und Bürger, die Stadt Kamenz sowie Unternehmen der Stadt und Umgebung vereinen sich im Bündnis für Humanität und Toleranz zur Unterstützung der Asylsuchenden. Unser Anliegen  ist die Weiterentwicklung  einer Willkommenskultur und das Leben von Solidarität und Akzeptanz mit den hier ankommenden Menschen. Mit unserem Handeln wollen wir die Unterbringung, Betreuung und Unterstützung von Kriegsflüchtlingen und Asylbewerbern menschenwürdig gestalten und Barrieren überwinden helfen. Wir wenden uns gegen jede Form von Ausländerfeindlichkeit, Intoleranz und Rassismus.', 'buendniskamenz@gmx.de', 'http://www.buendnis-kamenz.de/', '', '03578 / 37 92 02 (Montags, während der Sprechzeit)', '', 0, 'Sprecher Richard Boes', 'Sprecher Richard Boes', NULL, NULL, 0, 0, 'deutsch, sorbisch, russisch', 1, NULL, '58855a4ccb47e', 'de', '2017-01-23 02:20:12', '2017-01-23 02:20:12', 0),
('6214d968-3c4d-4e62-830e-d96dfd25a0cb', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Psychosoziale Beratungs- und Behandlungsstelle (PSBB) für Suchtgefährdete und –kranke der AWO KV Bautzen e.V.', 'siehe oben', 'suchtberatung@awo-bautzen.de ', 'http://www.awo-bautzen.de/suchtberatungsstelle.html', '', '03591 3261140', '', 0, 'Josefine Hübner (Diplom-Sozialpädagogin)', 'Josefine Hübner (Diplom-Sozialpädagogin)', NULL, NULL, 0, 0, '', 1, NULL, '58855a601995c', 'de', '2017-01-23 02:20:32', '2017-01-23 02:20:32', 0),
('64b436df-ba16-44e5-8584-12e3ddac7cc1', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Internationaler Bund, IB Mitte gGmbH, Jugendmigrationsdienst Bautzen', 'Koordnierungsstelle für Integrationskurse Landkreis Bautzen: Beratung zu möglichen Kursangeboten, Antragsstellung beim Bundesamt, Zusammenstellung der Kurse, Einstufungstest, Vermittlung zum Kursträger, Betreuung währned und nach dem Kurs, Beratung und Vermittlug zu weiterführenden Angeboten            Angebote: Individuelle Integrationsförderung und -begeitung, gruppenpädagogische Angebote, Informations- und Bildungsangebote für Behörden, Netzwerkarbeit', 'jmd-bautzen@internationaler-bund.de', 'http://www.internationaler-bund.de/angebote/standort/202850', '', '03591/276761', '', 0, 'Steffen Deubner', 'Steffen Deubner', NULL, NULL, 0, 0, 'Deutsch, englisch, russich (wenig)', 1, NULL, '58855a3f0b772', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59', 0),
('67e9b62a-ea22-451c-a567-e906afb65e00', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas Verband Oberlausitz e.V.- Migrationsberatung für Erwachsene, Hilfe für Asylbewerber, Flüchtlinge und Ausländer', 'Sie können zu uns kommen, wenn Sie als Spätaussiedler in die Bundesrepublik Deutschland eingereist sind, \nals ausländischer Ehepartner mit einer Spätaussiedlerfamilie oder über die Familienzusammenführung in Deutschland eingereist sind, mit einem deutschen Partner leben oder verheiratet sind und einen Aufenthaltstitel für Deutschland in Ihrem ausländischen Pass haben, als ausländischer Bürger in Deutschland leben und Rat suchen, das 27. Lebensjahr vollendet haben oder Fragen haben, die nicht jugendtypisch sind.        Die Beratung ist kostenlos. Wir nehmen uns Zeit und beraten Sie: - zu allen Formalitäten und Anmeldungen am neuen Wohnort (Erstberatung), - zu den rechtlichen Gegebenheiten z. B. Zuwanderung, soziale Sicherung, - zum Leben in der Bundesrepublik Deutschland, - bei persönlichen Problemen und Schwierigkeiten, die mit der Zuwanderung entstehen, - über Möglichkeiten des Erlernens der deutschen Sprache in Sprachkursen', 'meb@caritas-oberlausitz.de', 'http://www.caritas-oberlausitz.de/migration02.htm, http://www.caritas-oberlausitz.de/2016%20Sprechzeiten%20Caritasverband.pdf', '', '03591 498250', '', 0, 'Andreas Rentsch (Dipl.-Sozialarbeiter FH)', 'Andreas Rentsch (Dipl.-Sozialarbeiter FH)', NULL, NULL, 0, 0, '', 1, NULL, '58855a50f14c7', 'de', '2017-01-23 02:20:16', '2017-01-23 02:20:16', 0),
('6ec11cbb-95bc-4984-ae73-ca01987f49d8', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Stadtbibliothek Bautzen/ Fahrbücherei', 'Die Fahrbücherei bedient im 14-täglichen Rhythmus Haltestellen im Stadtgebiet und im Landkreis. Der Fahrplan ist unter www.stadtbibliothek.de zu finden.', 'fahrbuecherei@bautzen.de', '', '', '03591/ 534 850', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a4c4bc9c', 'de', '2017-01-23 02:20:12', '2017-01-23 02:20:12', 0),
('755c6c2c-1dc4-4276-bd7a-2764995e9740', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Stadtbibliothek Radeberg - Außenstelle Liegau-Augustusbad', 'siehe oben', 'bibliothek@radeberg.de', 'http://www.radeberg.de/inhalte/radeberg/_inhalt/bildung_soziales/bibliothek/bibliothek', '', '', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a68c5757', 'de', '2017-01-23 02:20:40', '2017-01-23 02:20:40', 0),
('7bb251a3-8630-4430-ac4d-def79a2bc5b5', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Haselbachtal hilft - für ein Haselbachtal mit Herz und Verstand ', '(Heim in Häslich schließt Ende Januar 2017!) Wir wollen Flüchtlingen helfen, sich in unserer Gemeinde zurechtzufinden. Außerdem möchten wir Anwohner, Gemeindeverwaltung und Flüchtlinge unterstützen, wenn es in der Gemeinde wegen der neuen Situation zu Missverständnissen kommt. Wir sind davon überzeugt, dass es auf vielfältige Weise möglich ist, ein gemeinschaftliches und gutes Zusammenleben aller Menschen im Haselbachtal zu fördern. Uns ist bewusst, dass die neue Situation sowohl die Dorfgemeinschaft als auch die Asylbewerber vor Herausforderungen stellen wird – gerade weil Häslich und seine alte Schule bei Weitem kein idealer Ort für einen erfolgreichen Start in einem neuen Land sind. Gerade deshalb ist es wichtig, die Anwohner, Flüchtlinge und Gemeindeverwaltung bei der schwierigen neuen Aufgabe zu unterstützen. Wir wollen auf Missverständnisse, Konflikte und Frustration schnell und unkompliziert reagieren, indem wir vermitteln, erklären und praktische Lösungen suchen. Perspektivlosigkeit, Angst und Hass haben im Haselbachtal nichts verloren.', 'haselbachtal.hilft@gmx.de', 'https://haselbachtalhilft.wordpress.com/', 'https://de-de.facebook.com/haselbachtalhilft/', '', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a4d0a3b4', 'de', '2017-01-23 02:20:13', '2017-01-23 02:20:13', 0),
('7ecee134-1b46-4b52-bedd-b5f3b0d524e2', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas Verband Oberlausitz e.V. - Schwangerschaftsberatung, Einzel- und Paarberatung, Sexualpädagogik', '', 'schwangerschaftsberatung@caritas-oberlausitz.de', 'http://www.caritas-oberlausitz.de/cs1.htm#Schwangerschaftsberatung%20Kamenz', '', '03578 374322', '', 0, 'Gisela Grubert', 'Gisela Grubert', NULL, NULL, 0, 0, '', 1, NULL, '58855a52c623b', 'de', '2017-01-23 02:20:18', '2017-01-23 02:20:18', 0),
('812b0f9a-8dac-4add-a9b5-b69dab44b2d9', NULL, '744f41e9-799c-432b-a9a3-e78d471ec51a', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Tauschbörse für Kindersachen + Kleinhaushaltsgeräte', '', '', '', '', '03578 374321', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a555419e', 'de', '2017-01-23 02:20:21', '2017-01-23 02:20:21', 0),
('84babb64-6e7a-408c-8888-44e5773f1590', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Josua Gemeinde Bautzen', 'Die Josua Gemeinde ist eine freie evangelische Gemeinde, die 1988 gegründet wurde. Seit über zwei Jahren ist sie Mitglied beim Bund Freikirchlicher Pfingstgemeinden (BFP). Deren Ziel ist es, den Menschen in der Oberlausitz die Einladung zu einer persönlichen Beziehung mit Gott auf zeitgemäße Art und Weise nahezubringen. Die Josua Gemeinde sieht sich als Mitmachkirche mit vielen ehrenamtlichen Mitarbeitern in unterschiedlichen Bereichen. Neben den Sonntags und Freitags stattfindenden Gottendiensten und Suchgottesdiensten setzt sich die Gemeinde mittels verschiedener Angebote aktiv für Flüchtlinge ein. Als Angebote sind zu nennen:  offene Jugendarbeit Kinder- und Jugendzentrum Der Käller im Keller des Gemeindezentrums, Musikschule, Fahrradwerkstatt, BuFDi-Tätigkeiten, Deutschunterricht, Kleiderkammer, Hilfe auf Ämtern, Umzugshilfe', 'info@josua-gemeinde-bautzen.de', 'www.josua-gemeinde-bautzen.de', 'https://www.facebook.com/josuagemeindebautzen/', '03591 491653, 0177 8481819', '', 0, 'Alf Mudrich', 'Alf Mudrich', NULL, NULL, 0, 0, 'Deutsch, Englisch, Arabisch, Farsi', 1, NULL, '58855a473af6f', 'de', '2017-01-23 02:20:07', '2017-01-23 02:20:07', 0),
('877eab13-54ef-43aa-a4f7-8da01d65954e', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Suchtberatungsstelle der Diakonie Görlitz-Hoyerswerda', 'Außensprechstunde in Lauta (02991 Lauta, Rosa-Luxemburg-Straße 11) montags von 15:00 - 19:00 Uhr, Sprechstunden im Lausitzer Seenland Klinikum Hoyerswerda (02977 Hoyerswerda, Maria-Grollmuß-Straße 10) donnerstags von 09:00 - 12:00 Uhr.\n \nAußerhalb der Sprechzeiten können Termine vereinbart werden, um unserem Klientel in der aktuellen Situation zu entsprechen.', 'sbb@diakonie-hoyerswerda.de', 'http://www.diakonie-goerlitz.de/beratungsdienste/suchtberatungs-und-behandlungsstelle-hoyerswerda/kontakt-sbb-hy.html', '', '03571/428504', '', 0, 'Leiterin Kerstin Schönwald (Dipl.-Sozialpädagogin/Sozialtherapeutin (VT))', 'Leiterin Kerstin Schönwald (Dipl.-Sozialpädagogin/Sozialtherapeutin (VT))', NULL, NULL, 0, 0, '', 1, NULL, '58855a62a434d', 'de', '2017-01-23 02:20:34', '2017-01-23 02:20:34', 0),
('87c6ed7d-1462-4817-a01a-e90f055a87a2', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Bündnis Radeberger Land hilft e.V.', 'Seit der Gründung im Juni 2015 unterstützt der Verein Bündnis Radeberger Land hilft  Asylbewerber und Flüchtlinge rund um Radeberg ob dezentral in Wohnungen oder in einer zentralen Unterkunft untergebracht. Das Bündnis ist ein eingetragener, gemeinnütziger Verein, der sich aus Mitgliedsbeiträgen und Spenden finanziert. Zweck des Vereins ist die Hilfe und das Engagement für Menschen in Not, insbesondere für Migrantinnen und Migranten sowie die Förderung von nachbarschaftlichen Begegnungsmöglichkeiten im Sinne eines gedeihlichen Miteinanders. Nachdem die ersten Aktionen vor allem sehr spontanes Handeln erforderten, strukturiert sich das Bündnis nun seit September 2015 in themenbezogenen Arbeitsgemeinschaften: -  Die AG Spendenkoordination kümmert sich um die Organisation, Sortierung und Verteilung von Sachspenden. - Die AG Sprache und Verständigung organisiert ehrenamtliche Sprachkurse und Begegnungen. - Die AG Gesundheit und medizinische Versorgung hilft bei Arztbesuchen und ermöglicht Sprechzeiten. - Die AG Sport organisiert die Teilnahme an sportlichen Veranstaltungen und dem Vereinsleben. - Die AG Beschäftigung hat sich zum Ziel gesetzt, für die Flüchtlinge eine sinnvolle Beschäftigung zu bieten, die Ihnen hilft, in der Eintönigkeit des Lebens in der Unterkunft etwas Abwechslung zu finden und damit ein ruhiges Zusammenleben zu fördern. Sie steht dafür mit verschiedenen Organisationen in Verbindung, die stark befristete Tätigkeiten anbieten können.  - Die AG Logistik kümmert sich um Mobilitätsunterstützung, stellte Fahrradspenden zur Verfügung und organisiert Fahrdienste. - Die AG Integration, Familie, Begegnung kümmert sich um Patenschaften und bietet regelmäßige Mutter-Kind-Nachmittage zur Begegnung an. ', 'info@buendnis-radeberger-land-hilft.de', 'http://www.buendnis-radeberger-land-hilft.de/', '', '01520 5981920', '', 0, 'Vereinsvorstand Ulrich Hensel', 'Vereinsvorstand Ulrich Hensel', NULL, NULL, 0, 0, '', 1, NULL, '58855a4c97b11', 'de', '2017-01-23 02:20:12', '2017-01-23 02:20:12', 0),
('894c9ce1-963f-4ecc-8a99-a00ad6d1ae14', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'samo.fa-Hoyerswerda, Träger: RAA Hoyerswerda /Ostsachsen e.V.', 'samo.fa (Stärkung der Aktiven aus Migrantenorganisationen in der Flüchtlingsarbeit) ist ein bundesweites Modellprojekt in 30 Städten, dessen Ziel es ist, mithilfe lokaler Flüchtlingsarbeit die gleichberechtigte Teilhabe von Geflüchteten in allen Bereichen des lokalen und kommunalen Lebens zu stärken. Es wird von der Beauftragten der Bundesregierung für Migration, Flüchtlinge und Integration gefördert und wurde vom Bundesverband NEMO (Netzwerke von Migrantenorganisationen) ins Leben gerufen. Hauptziele sind: Erfahrungen, Fähigkeiten und Engagement von Menschen mit eigener Migrationsgeschichte in die lokalen Netzwerke der Arbeit mit Geflüchteten einbringen, durch die Förderung einer engen Zusammenarbeit der Aktiven mit Migrationsgeschichte dazu beitragen, deren Einsatz wirksamer zu machen (Koordinierung) und deren Potenziale zu stärken (Beratung, Qualifizierung, Erfahrungsaustausch), Migrantenorganisationen als wichtige Partner für gutes Ankommen und Teilhabe von Geflüchteten zu unterstützen und ihre Anerkennung auf gleicher Augenhöhe im lokalen und kommunalen Geschehen zu fördern. In Hoyerswerda trifft sich der samo.fa-Stammtisch regelmäßig, um Projekte zur Verbesserung der Situation Geflüchteter vorzubereiten und durchzuführen. Veranstaltungen wie Sprachcafés und Wandertage mit Schulklassen werden von Stammtischmitgliedern mit und ohne Migrationserfahrung organisiert. Für Fragen und Anregungen sind wir jederzeit dankbar und freuen uns über neue Gesichter.', 'paulick@raa-hoyerswerda.com', 'www.samofa.de, www.raa-hoyerswerda.de, www.bv-nemo.de', '', '03571-416072, Mobil: 01731-470330', '', 0, 'Cindy Paulick', 'Cindy Paulick', NULL, NULL, 0, 0, 'Deutsch, Englisch', 1, NULL, '58855a43ba003', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03', 0),
('8cb0930a-d92b-4c54-91be-fc6e0faa8de0', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Brigitte-Reimann Stadtbibliothek Hoyerswerda', 'Im Leistungsvergleich der Bibliotheken belegt die Brigitte-Reimann-Stadtbibliothek Platz 1 unter den gleich großen Einrichtungen in den neuen Bundesländern. Mit rund 70.000 Medieneinheiten, mehr als 300.000 Entleihungen und ca. 100.000 Besuchern im Jahr, gehört sie damit zu den zehn Bibliotheken, die bundesweit viermal Gold in allen vier erreichbaren Katergorien, Nutzung, Angebot, Wirtschaftlichkeit und Entwicklungspotential, erhielten. Das Herz des Bestandes bildet nach wie vor das Lesefutter – vom Bilderbuch bis zum 1000-Seiten Schmöker. Die inhaltlich wie technisch moderne Bibliothek, bietet auf zwei Etagen und über tausend Quadratmetern aber auch zahlreiche andere Medien, wie Gesellschaftsspiele, Zeitschriften, Hörbücher, DVD und Blu-ray Disc sowie Konsolenspiele. Neben Fachbuch und Hobbyratgeber hält die Bibliothek Sprachkurse, Wanderkarten, Stadtpläne und Regionalkundliches bereit. Im Internet-Café hat der Leser (übrigens auch ohne gültigen Benutzerausweis) Zugriff auf ca. 70 Zeitschriftentitel vom Anglerblatt Blinker bis zum Einrichtungsjournal Zu Hause wohnen. Spätestens seit der Teilnahme am fünfjährigen Bertelsmann-Projekt Bibliothek und Schule ist die Förderung der Medienkompetenz von Kindern und Jugendlichen ein Schwerpunkt. Fast täglich finden ein oder sogar mehrere bibliothekspädagogische Veranstaltungen, Bilderbuchkinos, Lesungen und Führungen statt. Vier der sieben Kollegen kümmern sich gern, unkompliziert und individuell um alle Altersstufen - von der Kindergartengruppe bis zum Seniorenverein. Auf die Lehrpläne abgestimmte Angebote finden sie unter dem Link Bibliothekspädagogik. Seit Frühjahr 2013 bietet die Stadt Hoyerswerda gemeinsam mit 11 anderen Städten der Oberlausitz unter www.onleihe-oberlausitz.de die Onleihe an.', 'info@bibliothek-hy.de', 'www.bibliothek-hy.de', '', '03571 / 60 77 53', '', 0, 'Annekathrin Trojahn', 'Annekathrin Trojahn', NULL, NULL, 0, 0, '', 1, NULL, '58855a692ee3e', 'de', '2017-01-23 02:20:41', '2017-01-23 02:20:41', 0),
('8d317cfb-e96a-491b-bc20-08ff50634eff', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Suchtberatungs- und -behandlungsstelle der Diakonie Kamenz, Diakonisches Werk Kamenz e.V.', 'Wir beraten betroffene Suchtkranke und Suchtgefährdete, deren Angehörige und andere interessierte Personen. Wir helfen und beraten bei Problemen und Fragen zu: Alkohol, illegalen Drogen, Medikamenten, Nikotin, Essstörungen, Spielsucht und andere. Wir bieten: Beratung und Behandlung, Gruppenangebote, Krankenhaussprechzeiten, Vermittlung in stationäre Behandlung, ambulante Nachsorge, niedrigeschwellige Kontaktangebote und Prävention', 'sbb.dw-kamenz@evlks.de', 'http://www.diakonie-kamenz.de/beratungsdienste_suchtberatungs-_und_-behandlungsstelle_de.html', '', '03578 3854-30', '', 0, 'Simone Mattukat', 'Simone Mattukat', NULL, NULL, 0, 0, '', 1, NULL, '58855a646d260', 'de', '2017-01-23 02:20:36', '2017-01-23 02:20:36', 0),
('92424105-5644-40c5-8423-f2ec3d24526f', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', ' Kreisvolkshochschule Bautzen (Regionalstellen in Bautzen, Kamenz, Radeberg)', 'Die Kreisvolkshochschule Bautzen bietet Angebote für verschiedene Adressaten: neben Angeboten zu Politik, Gesellschaft,Umwelt und Gesundheit lädt die VHS ein, um an kulturellen, kreativen oder sprachlichen Angeboten teil zu nehmen. Sprachangebote u.a. sind: soffene Deutschkurse A1-B2 (C1 auf Anfrage), Integrationskurse, geförderte Deutschkurse für Asylbewerber und Leistungsbezieher,  Prüfungen, Einbürgerungstest', ' info@kvhsbautzen.de, anja.schmidt@kvhsbautzen.de', 'www.kvhsbautzen.de', '', '03591 / 272 29-0 ', '', 0, 'Anja Schmidt (Fachbereichsleiterin Deutsch, Integration & Grundbildung)', 'Anja Schmidt (Fachbereichsleiterin Deutsch, Integration & Grundbildung)', NULL, NULL, 0, 0, 'Deutsch, Englisch, Spanisch, Französisch', 1, NULL, '58855a47f0fc2', 'de', '2017-01-23 02:20:07', '2017-01-23 02:20:07', 0),
('92d857a3-250a-4f5a-ba70-68c1496424bd', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'djo-Deutsche Jugend in Europa, Landesverband Sachsen e.V. Projektbüro Jugendverbandsarbeit für alle', 'Wir sind ein Jugendverband für interkulturelle, internationale und politische Jugendarbeit. Mit unseren Angeboten möchten wir dazu beitragen, die eigene Kultur und die Kultur anderer kennenzulernen, um so das gegenseitige Verständnis zu fördern. Dabei unterstützen und beraten wir junge Menschen und Jugendinitiativen bei der Realisierung eigener Ideen und bieten Gestaltungsräume für deren Umsetzung. Die djo ist ein Dachverband für Jugendmigrantenorganisationen und Migranteninitiativen. Sie präsentiert die Vielfalt an Belangen und Forderungen jugendlicher MigrantInnen - gegenüber Politik und auch als Lobby für die jungen Menschen in der Öffentlichkeit.                                  Das machen wir!\n- Jugendkulturarbeit z.B. Tanz-, Theater- und Musikprojekte\n- interkulturelle Jugendarbeit z.B. Projekte zur Vernetzung von Migrantenorganisationen und einheimischen Gruppen\n- Internationale Jugendarbeit z.B. internationale Jugendbegegnungen und Fachkräfteaustausch\n- Integrationsarbeit z.B. Stärkung junger Zuwanderer durch die Förderung ihrer Initiativen\n- Jugendbildung z.B. interkulturelle Jugendleiterausbildung\n- politische Jugendbildung z.B. Projekte zu den Themen Antirassismus, Demokratie und Partizipation sowie zu anderen Themen, die Euch interessieren.', 'olena.vasyuk@djo-sachsen.de', 'http://www.djo-sachsen.de/', 'https://www.facebook.com/djo.sachsen/', '0351/ 84 19 04 13, 0177/ 76 444 72', '', 0, 'Olena Vasyuk', 'Olena Vasyuk', NULL, NULL, 0, 0, 'Deusch, Russisch, English', 1, NULL, '58855a3ee680b', 'de', '2017-01-23 02:19:58', '2017-01-23 02:19:58', 0),
('94857a44-de4e-40d3-9c55-ae5779cb70d7', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas Verband Oberlausitz e.V. - Kontakt- und Beratungsstelle für Menschen mit psychischen Beeinträchtigungen', '', 'regionalstelle@caritas-hoyerswerda.de', 'http://www.dicvgoerlitz.caritas.de/62456.html', '', '03571 979256', '', 0, 'Mandy Schimmank', 'Mandy Schimmank', NULL, NULL, 0, 0, '', 1, NULL, '58855a5637106', 'de', '2017-01-23 02:20:22', '2017-01-23 02:20:22', 0),
('a527a81c-0f37-4a8f-acd5-1f2b6a821b41', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Stadtbibliothek Bautzen/ Kinder- und Jugendbibliothek', 'In der Kinder- und Jugendbibliothek umfasst das speziell auf Kinder und Jugendliche abgestimmte Medienangebot ebenso Bücher, Comics, Mangas, Sachliteratur aller Wissensgebiete für Freizeit, Hobby und Schule, CDs, DVDs, Konsolenspiele und Zeitschriften. Vormittags können verschiedene Projekte, Buchvorstellungen und Autorenlesungen und Ferienveranstaltungen einschließlich Bibliothekseinführungen durchgeführt bzw. besucht werden.', 'jugendbibliothek@bautzen.de', '', '', '03591/ 42 373', '', 0, 'Kristin Lehmann', 'Kristin Lehmann', NULL, NULL, 0, 0, '', 1, NULL, '58855a4b71120', 'de', '2017-01-23 02:20:11', '2017-01-23 02:20:11', 0),
('ae85e887-f744-400f-81e4-5152f8bdabb2', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Sozialverband VdK Sachsen e.V. - Offene Beratungsstelle für behinderte Menschen', 'siehe oben', 'kv-bautzen@vdk.de', 'http://www.vdk.de/kv-bautzen/ID40128', '', '03578 / 7036936', '', 0, 'Jörg Jonas', 'Jörg Jonas', NULL, NULL, 0, 0, '', 1, NULL, '58855a5d0eab0', 'de', '2017-01-23 02:20:29', '2017-01-23 02:20:29', 0),
('b0381ca6-0f51-43f2-beae-5e1d224cfe77', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Selbsthilfekontaktstelle der Diakonie im Landkreis Bautzen', 'Unsere Selbsthilfekontaktstelle ist Ansprechpartner für alle Fragen im Hinblick auf Selbsthilfe. In unserer Selbsthilfekontaktstelle können Interessierte, Betroffene und Selbsthilfegruppen (SHG) sowie Initiativen und Vereine, Beratung und Hilfe bei der Bewältigung von Problemen erhalten. Wir unterstützen Selbsthilfegruppen und -initiativen bei Gründung, Begleitung, Öffentlichkeitsarbeit und Organisation. Auch die Vernetzung mit Ämtern, Institutionen und Politik ist eine unserer Aufgaben. Erfahrungen austauschen, voneinander lernen, sich gegenseitig ermutigen und entlasten, gemeinsam Fähigkeiten aneignen, um so den Alltag besser zu meistern: das ist Selbsthilfe.        Selbsthilfegruppen nach Themen: - chronische Erkrankungen, -Menschen mit Behinderungen, - psychosoziale Bereiche, - Sucht , -Angehörigenhilfe, -Soziale und Seniorenselbsthilfe.                Die Teilnahme an einem Gruppentreffen ist kostenfrei. ', 'sks-hy@diakonie-hoyerswerda.de', 'http://selbsthilfe-landkreis-bautzen.de/, http://www.diakonie-goerlitz.de/beratungsdienste/selbsthilfekontaktstelle-landkreis-bautzen/sks-angebote.html', '', '03571 / 40 83 65', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a6390849', 'de', '2017-01-23 02:20:35', '2017-01-23 02:20:35', 0),
('b0566a16-1601-410f-b2f4-0779c2826067', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Beauftragter für Asyl und Integration der Stadt Bischofswerda', 'Der Beauftragte für Asyl und Integration der Stadt Bischofswerda ist Schnittstelle zwischen ehrenamtlichen Initiativen der Stadt Bischofswerda, dem Jobcenter des Landratsamtes Bautzen, der Agentur für Arbeit und der Stadt Bischofswerda. ', 'sascha.hache@bischofswerda.de', 'http://www.bischofswerda.de/rathaus-und-verwaltung/asyl-und-integration.html', '', '03594 786-216', 'authority', 0, 'Sascha Hache ', 'Sascha Hache ', NULL, NULL, 0, 0, '', 1, NULL, '58855a4fa18e4', 'de', '2017-01-23 02:20:15', '2017-01-23 02:20:15', 0),
('b93d6f73-21e3-4dea-b7bf-c45031c0f807', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Stadtbibliothek Bautzen/ Hauptbibliothek', 'Die Stadtbibliothek Bautzen ist eine öffentliche, für jedermann zugängliche Einrichtung der Stadt Bautzen, zu der die Hauptbibliothek, die Kinder- und Jugendbibliothek sowie die Fahrbücherei gehört. Die Anmeldung erfolgt persönlich unter Vorlage des Personalausweises oder eines gleichgestellten Dokumentes mit Lichtbild und Adresse. Der dabei ausgestellte Bibliotheksausweis ist in allen 3 Einrichtungen gültig. Die Ausleihe ist kostenlos, für Sonderdienstleistungen wie Fernleihe oder Ausdrucke u.a. entstehen Gebühren.                          In der Hauptbibliothek auf der Schloßstraße können Romane, Ratgeber- und Sachliteratur, Sprachkurse u.a. zum Erlernen der deutschen Sprache, fremdsprachige Literatur, Jugendromane, CDs, DVDs, Zeitungen und Zeitschriften, sowie Regionalliteratur und Noten entliehen werden. Im Lesesaal stehen Multimedia-Arbeitsplätze einschließlich Internet zur Verfügung. Nach vorheriger Anmeldung finden Bibliothekseinführungen für Klassen ab Jahrgangsstufe 8, Gruppen und Einzelpersonen sowie Einführungen in den  Bibliothekskatalog und die Onleihe Oberlausitz (eBook-Ausleihe) statt.                                                       Mit der Ausstellung eines Bibliotheksausweises besteht die Möglichkeit die Onleihe Oberlausitz – die Ausleihe von eBooks, eAudios und eVideos zu nutzen. Weitere elektronische Angebote sind der Brockhaus – ein Lexikon mit erweiterten Optionen und Verlinkungen, sowie die Datenbanken von Munzinger – Personen (20. und 21. Jahrhundert) und Länder, Duden – Wörterbücher und Basiswissen Schule. Die Pressedatenbank Genios  - Recherche in Tageszeitungen und ausgewählten Zeitschriften- rundet das Angebot ab', 'stadtbibliothek@bautzen.de / bibliotheksservice@bautzen.de', 'www.stadtbibliothek-bautzen.de', '', '03591/ 534 850', '', 0, 'Sabine Kempel / Karin Hahn', 'Sabine Kempel / Karin Hahn', NULL, NULL, 0, 0, 'Deutsch, Sorbisch', 1, NULL, '58855a48de005', 'de', '2017-01-23 02:20:08', '2017-01-23 02:20:08', 0),
('c424ad62-d9af-44bb-9b09-5859ef715859', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas Verband Oberlausitz e.V.- Migrationserstberatung für Erwachsene, Hilfe für Asylbewerber, Flüchtlinge und Ausländer', 'siehe oben', 'meb@caritas-oberlausitz.de, a.rentsch@caritas-oberlausitz.de', 'http://www.caritas-oberlausitz.de/migration02.htm', '', '03578 3743 20', '', 0, 'Andreas Rentsch (Dipl.-Sozialarbeiter FH)', 'Andreas Rentsch (Dipl.-Sozialarbeiter FH)', NULL, NULL, 0, 0, '', 1, NULL, '58855a514b73a', 'de', '2017-01-23 02:20:17', '2017-01-23 02:20:17', 0),
('c4cf35ae-fb48-4e35-9241-b96566f3a3fe', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Stadtbibliothek Bischofswerda', 'Die Bibliothek ist eine der ältesten Kultur- und Bildungseinrichtungen der Stadt Bischofswerda. Bereits im Jahr 1880 wurde sie gegründet und hat seitdem ihre Räumlichkeiten mehrere Male gewechselt und erweitert. Seit 1992 befindet sie sich in zentraler Lage der Stadt im sogenannten Bischofssitz. Die Bibliothek ist erreichbar über den Eingang von der Dresdener Str. oder durch den schönen Innenhof auf der Rückseite des Hauses. Auf einer Fläche von ca. 500 m² stehen den Besuchern ca. 33.000 Medien zur Verfügung. Der Bestand der Bibliothek wird ständig auf dem Laufenden gehalten. Dabei wird die Nachfrage der Leser und der Trend auf dem Literatur- und Medienmarkt natürlich berücksichtigt. Die Stadtbibliothek Bischofswerda ist auch im Bibo-Sax, dem Medienkatalog der öffentlichen Bibliotheken Sachsen, zu finden. Leserwünsche können somit auch aus anderen Bibliotheken realisiert werden. Unsere Bibliothek bietet Ihnen eine große Auswahl an Belletristik für Erwachsene, Jugendliche und Kinder, Sachliteratur für jede Altersklasse, Zeitschriften, DVDs, Musik-CDs, Wii- und PC-Spiele. ', 'stadtbibliothek@bischofswerda.de', 'http://www.bischofswerda.de/kultur-freizeit-und-tourismus/bibliothek.html', '', '03594 786-160', '', 0, '', '', NULL, NULL, 0, 0, '', 1, NULL, '58855a69a14c7', 'de', '2017-01-23 02:20:41', '2017-01-23 02:20:41', 0),
('c699ac1a-a931-4274-94fd-7a96b6f54f50', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Kreisvolkshochschule Bautzen / Regionalstelle Kamenz', 'siehe oben', 'siehe oben', 'www.kvhsbautzen.de', '', ' 03578 / 3096-0', '', 0, '', 'siehe oben', NULL, NULL, 0, 0, 'siehe oben', 1, NULL, '58855a484d684', 'de', '2017-01-23 02:20:08', '2017-01-23 02:20:08', 0),
('c7202b57-3a54-4593-9fec-90bd7d27210a', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Volkssolidarität KV Bautzen e.V.- Schuldner- und Insolvenzberatungberatung', 'Die Beratungen werden im Rahmen der persönlichen Hilfe, kostenlos und unter Einhaltung des Datenschutzes durchgeführt. - Wir analysieren mit der Gegenüberstellung der Einnahmen - Ausgaben Ihre finanzielle Situation und die Führung eines Haushaltbuches wird ermöglicht.  - Wir erarbeiten mit Ihnen und für Sie Schuldenbereinigungspläne, Ratenzahlungen und führen Vergleichsverhandlungen mit den Gläubigern.  -  Wir helfen Ihnen bei der Erstellung und beim Ausfüllen des Insolvenzantrages, wenn die außergerichtliche Schuldenregulierung mit Hilfe unserer Beratungsstelle durchgeführt wurde. - Wir sind vom Freistaat Sachsen anerkannte und geförderte Stelle (Insolvenzberatung)  und sind damit berechtigt Ihnen eine Bescheinigung über das Scheitern des Einigungsversuches (§305 Abs. 1 Nr. 1 InsO zu erteilen.\n\n ', 'ute.herrmann@volkssolidaritaet.de', 'https://volkssoli-bautzen.de/soziale%20dienste/schuldner-%20und%20verbraucherinsolvenz.html', '', '03594 743640', '', 0, 'Ute Herrmann', 'Ute Herrmann', NULL, NULL, 0, 0, '', 1, NULL, '58855a5862629', 'de', '2017-01-23 02:20:24', '2017-01-23 02:20:24', 0);
INSERT INTO `ddfa_main_domain_model_marketentry` (`persistence_object_identifier`, `parent_entry_id`, `category_id`, `offer`, `datefrom`, `dateto`, `timefrom`, `timeto`, `area`, `name`, `description`, `mail`, `web`, `facebook`, `phone`, `subcategory`, `type`, `speakerpublic`, `speakerprivate`, `image`, `imagetype`, `supportwanted`, `forchildren`, `spokenlanguages`, `published`, `internalcomment`, `entry_id`, `locale`, `created`, `updated`, `certified`) VALUES
('ca901c01-e050-45b8-9ae5-ef888dae7037', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Sozialverband VdK Sachsen e.V. - Offene Beratungsstelle für behinderte Menschen', 'siehe oben', 'ov-hoyerswerda@vdk.de', '', '', '03571-414947', '', 0, 'Ines Pattky', 'Ines Pattky', NULL, NULL, 0, 0, '', 1, NULL, '58855a5ee86b4', 'de', '2017-01-23 02:20:30', '2017-01-23 02:20:30', 0),
('caefe784-fc2b-43c8-a6b8-e2cd5071cf26', NULL, '744f41e9-799c-432b-a9a3-e78d471ec51a', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas Verband Oberlausitz e.V. - Sozialer Möbeldienst ', 'Das Angebot unseres Möbeldienstes können Sie tagesaktuell auf der Homepage ansehen. Ratenvereinbarungen sind möglich. Helfen Sie uns auch durch Ihre Möbelspende - rufen Sie an - wir vereinbaren kurzfristig einen Termin mit Ihnen und holen die Gegenstände bei Ihnen kostenlos ab.', 'moebeldienst@caritas-oberlausitz.de', 'http://www.moebeldienst-bautzen.de/', '', '03591 302014', '', 0, 'Thomas Zschornack', 'Thomas Zschornack', NULL, NULL, 0, 0, '', 1, NULL, '58855a53d5d10', 'de', '2017-01-23 02:20:19', '2017-01-23 02:20:19', 0),
('cde087b6-189a-436b-b245-60e7c9e5589e', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Steinhaus e.V.', 'Der Steinhaus e.V. ist ein gemeinnütziger Verein in der Funktion eines Soziokulturellen Zentrums und ist als ein solches Zentrum Mitglied im Landesverband Soziokultur Sachsen e.V..Im Herzen der Spreestadt ist das Steinhaus ein Ort der Begegnung und Kommunikation, des bürgerschaftlichen Engagements, des künstlerischen Austauschs und der kulturellen Produktion - für alle Generationen und sozialen Schichten. Es will Freiräume für interessenbezogene Freizeitgestaltung junger wie älterer Menschen schaffen sowie Orientierung und Hilfestellung bei der Verwirklichung individueller Lebensentwürfe bieten. Denn nicht alle Menschen verfügen über die gleichen Voraussetzungen, Chancen und Möglichkeiten, ihre Biografie erfolgreich zu gestalten', 'info@steinhaus-bautzen.de', 'www.steinhaus-bautzen.de', 'https://de-de.facebook.com/SteinhausBautzen/', '03591/5319966', '', 0, '', 'Geschäftsführer: Torsten Wiegel, Kulturelle Jugendbildung / Kids&Heroes: Reno Rössel,  Offene Kinder- und Jugendarbeit: Uwe Reschwamm, Kultur & Veranstaltungen: Alexander Noack', NULL, NULL, 0, 0, 'Deutsch & Englisch', 1, NULL, '58855a3f0d28e', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59', 0),
('ce6dde5c-b053-498c-b9b8-dd90db12c9c2', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Volkssolidarität KV Bautzen e.V.- Schuldner- und Insolvenzberatungberatung', 'siehe oben', 'ralf.dworatzek@volkssolidaritaet.de', 'https://volkssoli-bautzen.de/soziale%20dienste/schuldner-%20und%20verbraucherinsolvenz.html', '', '03591 5980860', '', 0, 'Ralf Dworatzek', 'Ralf Dworatzek', NULL, NULL, 0, 0, '', 1, NULL, '58855a5a07f7c', 'de', '2017-01-23 02:20:26', '2017-01-23 02:20:26', 0),
('d7f11608-d5dc-4f8a-a20c-4cfd84afde8d', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Psychosoziale Beratungs- und Behandlungsstelle (PSBB) für Suchtgefährdete und –kranke der AWO KV Bautzen e.V.', 'Wir unterstützen Betroffene und deren Angehörige bei Problemen in den Bereichen Alkohol, illegale Drogen, Medikamente, Glücksspiel, Nikotin, Essstörungen. In der Suchtberatungsstelle arbeiten:\nDiplom-Psychologen, Diplom-Sozialarbeiter/-pädagogen mit den Zusatzqualifikationen Sozialtherapeut Sucht (verhaltenstherapeutisch und psychoanalytisch orientiert) und Systemischer Familientherapeut.   \n\nAuf Wunsch beraten wir anonym. Wir unterliegen der Schweigepflicht. Überweisungsschein ist nicht erforderlich.\n Unsere Angebote für Betroffene und Angehörige sind: - Beratung und Betreuung (- Aufklärung und Information zu den Suchtmitteln, - Krisenintervention, -Vermittlung, usw.), - Gruppenangebote (Info-Gruppe Alkohol, Info-Gruppe Drogen, Nachsorge-Gruppen, Angehörigen-Seminar, usw.), - Tagesstrukturierende Angebote ( -Ausflüge, -Tagestreff, usw.)', 'suchtberatung@awo-bautzen.de ', 'http://www.awo-bautzen.de/suchtberatungsstelle.html', '', '03591 3261140', '', 0, 'Jana Stahn (Dipl.Psychologin)', 'Jana Stahn (Dipl.Psychologin)', NULL, NULL, 0, 0, '', 1, NULL, '58855a5ee868b', 'de', '2017-01-23 02:20:30', '2017-01-23 02:20:30', 0),
('d834eb3c-2bd3-4fe1-89b6-4c66b8c1c6ad', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Suchtberatungs- und -behandlungsstelle der Diakonie Kamenz, Diakonisches Werk Kamenz e.V.', 'siehe oben', 'sbb.dw-kamenz@evlks.de', 'http://www.diakonie-kamenz.de/suchtberatungs-_und_-behandlungsstelle_wann_wo_de.html', '', '03528 413307', '', 0, 'Anett Wehner', 'Anett Wehner', NULL, NULL, 0, 0, '', 1, NULL, '58855a650a05d', 'de', '2017-01-23 02:20:37', '2017-01-23 02:20:37', 0),
('dc688530-4e97-4c9f-9f86-44d070ba2e2f', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas - Regionalstelle Görlitz-  Sozialberatung sowie Kontakt- und Beratungsstelle für Menschen mit psychischen Beeinträchtigungen', '', 'regionalstelle@caritas-hoyerswerda.de', 'http://www.dicvgoerlitz.caritas.de/62456.html', '', '03571 979256', '', 0, 'Gabriele Hanschmidt', 'Gabriele Hanschmidt', NULL, NULL, 0, 0, '', 1, NULL, '58855a55bbea6', 'de', '2017-01-23 02:20:21', '2017-01-23 02:20:21', 0),
('e47b168e-c7ec-4c98-a23e-d367d89ad076', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Ausländerbeauftragte Landkreis Bautzen', 'Ansprechpartnerin bei allen integrationspolitischen Angelegenheiten, Hilfe und Beratung bei Fragen zur Integration, Hilfe und Beratung bei Diskriminierung aufgrund der Herkunft, eigenständige Öffentlichkeitsarbeit, Mitglied im Begleitausschuss Partnerschaften für Demokratie', 'auslaenderbeauftragte@lra-bautzen.de', 'http://www.landkreis-bautzen.de/13703.html', '', '03591 5251-87700', 'authority', 0, 'Anna Piętak-Malinowska', 'Anna Piętak-Malinowska', NULL, NULL, 0, 0, 'Deutsch, Polnisch, Englisch, Russisch', 1, NULL, '58855a44089f7', 'de', '2017-01-23 02:20:04', '2017-01-23 02:20:04', 0),
('e916c331-bf3a-4718-9089-f97af11b373a', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'RAA Hoyerswerda/ Ostsachsen e.V.', 'Die regionale Arbeitsstelle für Bildung, Demokratie und Lebensperspektive ist ein Verein, welcher mit vielen Aufgabenfeldern gefüllt ist. Frau Dosch im speziellen kümmert sich um die Unterstützung und Hilfeleistung der Geflüchteten und dem Ehrenamt. Sie übernimmt die Position eine zentrale Anlaufstelle, wenn es um Belange in der Geflüchtetenhilfe geht.  ', 'kontakt@raa-hoyerswerda.com', 'www.raa-hoyerswerda.com', '', '03571-416072', '', 0, 'Luise Dosch', 'Luise Dosch', NULL, NULL, 0, 0, 'Deutsch, Englisch, Russisch', 1, NULL, '58855a43b5800', 'de', '2017-01-23 02:20:03', '2017-01-23 02:20:03', 0),
('f112c391-86b6-4307-81db-dc43d4799cca', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Caritas Verband Oberlausitz e.V. - Allgemeine soziale Beratung', '', 'sozialberatung.bz@caritas-oberlausitz.de', 'http://www.caritas-oberlausitz.de/cs1.htm#AsB%20Bautzen', '', '03591 498240', '', 0, 'Andreas Deckwart', 'Andreas Deckwart', NULL, NULL, 0, 0, '', 1, NULL, '58855a5a21ccf', 'de', '2017-01-23 02:20:26', '2017-01-23 02:20:26', 0),
('f87f0353-565d-4212-a12e-dca8bafeb008', NULL, '010cfae4-7506-425b-ba37-80e8d83427f0', NULL, NULL, NULL, NULL, NULL, 'dresden', 'Partnerschaften für Demokratie, Netzwerk für Kinder- und Jugendarbeit', 'Koordinierungs- und Fachstelle im Rahmen des Bundesprogrammes Demokratie leben!. Förderung demokratischer Strukturen im ländlichen Raum durch Fördermittelvergabe, Antragsberatung und Jugendbeteiligungsprojekte. Zuständig für den Landkreis Bautzen.', 'friederike.beese@kijunetzwerk.de', 'lap-bautzen.de', '', '03594/704730', '', 0, 'Friederike Beese', 'Friederike Beese, Bernadette Zeller', NULL, NULL, 0, 0, 'Deutsch / Englisch / Sorbisch', 1, NULL, '58855a3f1ac74', 'de', '2017-01-23 02:19:59', '2017-01-23 02:19:59', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `flow_doctrine_migrationstatus`
--

CREATE TABLE IF NOT EXISTS `flow_doctrine_migrationstatus` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `flow_doctrine_migrationstatus`
--

INSERT INTO `flow_doctrine_migrationstatus` (`version`) VALUES
('20110613223837'),
('20110613224537'),
('20110620155001'),
('20110620155002'),
('20110714212900'),
('20110824124835'),
('20110824124935'),
('20110824125035'),
('20110824125135'),
('20110919164835'),
('20110920104739'),
('20110920125736'),
('20110923125535'),
('20110923125536'),
('20110923125537'),
('20110923125538'),
('20110925123119'),
('20110925123120'),
('20110928114048'),
('20111215172027'),
('20120328152041'),
('20120329220340'),
('20120329220341'),
('20120329220342'),
('20120329220343'),
('20120329220344'),
('20120412093748'),
('20120429213445'),
('20120429213446'),
('20120429213447'),
('20120429213448'),
('20120520211354'),
('20120521125401'),
('20120525141545'),
('20120625211647'),
('20120829124549'),
('20120930203452'),
('20120930211542'),
('20121001181137'),
('20121001201712'),
('20121001202223'),
('20121011140946'),
('20121014005902'),
('20121030221151'),
('20121031190213'),
('20130201104344'),
('20130213130515'),
('20130218100324'),
('20130319131400'),
('20130522131641'),
('20130522132835'),
('20130605174712'),
('20130702151425'),
('20130730151319'),
('20130919143352'),
('20130930182839'),
('20131111235827'),
('20131129110302'),
('20131205174631'),
('20140206124123'),
('20140208173140'),
('20140325173151'),
('20140826164246'),
('20141001151417'),
('20141003233738'),
('20141127195800'),
('20150211181736'),
('20151218141317'),
('20151218145012'),
('20151220141929'),
('20160122100852'),
('20160122160325'),
('20160211121621'),
('20160226165259'),
('20160226180518'),
('20160227192507'),
('20160319131631'),
('20160319141230');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_flow_mvc_routing_objectpathmapping`
--

CREATE TABLE IF NOT EXISTS `typo3_flow_mvc_routing_objectpathmapping` (
  `objecttype` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `uripattern` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pathsegment` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `identifier` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_flow_resource_publishing_abstractpublishingconfiguration`
--

CREATE TABLE IF NOT EXISTS `typo3_flow_resource_publishing_abstractpublishingconfiguration` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `dtype` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_flow_resource_resource`
--

CREATE TABLE IF NOT EXISTS `typo3_flow_resource_resource` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `resourcepointer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fileextension` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `publishingconfiguration` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_flow_resource_resourcepointer`
--

CREATE TABLE IF NOT EXISTS `typo3_flow_resource_resourcepointer` (
  `hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_flow_security_account`
--

CREATE TABLE IF NOT EXISTS `typo3_flow_security_account` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `party` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `accountidentifier` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `authenticationprovidername` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `credentialssource` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationdate` datetime NOT NULL,
  `expirationdate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_flow_security_account`
--

INSERT INTO `typo3_flow_security_account` (`persistence_object_identifier`, `party`, `accountidentifier`, `authenticationprovidername`, `credentialssource`, `creationdate`, `expirationdate`) VALUES
('9c88f113-3f4c-e98a-d8c0-e41daeb2364a', '9a697f54-d951-9867-63fd-498a09d8fae9', 'rudi', 'Typo3BackendProvider', 'bcrypt=>$2a$14$j.JYM5pmJA4ujch.BnKDnOk7294.0OT2HMDvcK7EvLD9Uzf.ZOB82', '2015-05-30 20:08:58', NULL),
('c1d44a1a-3e83-e44c-acf9-8bbfe81a96c1', '3f7b6774-413b-dc60-18af-a42bab30a764', 'felix', 'Typo3BackendProvider', 'bcrypt=>$2a$14$Iwc2AvzXDNQhMYI2pee4XuUHiql3R2wKbFYX1mD/BsF.S2MQSDHW.', '2015-10-08 16:58:38', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_flow_security_account_roles_join`
--

CREATE TABLE IF NOT EXISTS `typo3_flow_security_account_roles_join` (
  `flow_security_account` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `flow_policy_role` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_flow_security_account_roles_join`
--

INSERT INTO `typo3_flow_security_account_roles_join` (`flow_security_account`, `flow_policy_role`) VALUES
('9c88f113-3f4c-e98a-d8c0-e41daeb2364a', 'TYPO3.Neos:Administrator'),
('c1d44a1a-3e83-e44c-acf9-8bbfe81a96c1', 'TYPO3.Neos:Administrator');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_flow_security_authorization_resource_securitypublis_861cb`
--

CREATE TABLE IF NOT EXISTS `typo3_flow_security_authorization_resource_securitypublis_861cb` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `allowedroles` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:array)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_flow_security_policy_role`
--

CREATE TABLE IF NOT EXISTS `typo3_flow_security_policy_role` (
  `identifier` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sourcehint` varchar(6) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_flow_security_policy_role`
--

INSERT INTO `typo3_flow_security_policy_role` (`identifier`, `sourcehint`) VALUES
('Anonymous', 'system'),
('AuthenticatedUser', 'system'),
('Everybody', 'system'),
('TYPO3.Neos:Administrator', 'policy'),
('TYPO3.Neos:Editor', 'policy'),
('TYPO3.Setup:Administrator', 'policy'),
('TYPO3.TYPO3CR:Administrator', 'policy');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_flow_security_policy_role_parentroles_join`
--

CREATE TABLE IF NOT EXISTS `typo3_flow_security_policy_role_parentroles_join` (
  `flow_policy_role` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `parent_role` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_flow_security_policy_role_parentroles_join`
--

INSERT INTO `typo3_flow_security_policy_role_parentroles_join` (`flow_policy_role`, `parent_role`) VALUES
('TYPO3.Neos:Administrator', 'TYPO3.Neos:Editor'),
('TYPO3.Neos:Editor', 'TYPO3.TYPO3CR:Administrator');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_media_domain_model_asset`
--

CREATE TABLE IF NOT EXISTS `typo3_media_domain_model_asset` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `dtype` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `resource` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `caption` longtext COLLATE utf8_unicode_ci NOT NULL,
  `lastmodified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_media_domain_model_asset_tags_join`
--

CREATE TABLE IF NOT EXISTS `typo3_media_domain_model_asset_tags_join` (
  `media_asset` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `media_tag` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_media_domain_model_audio`
--

CREATE TABLE IF NOT EXISTS `typo3_media_domain_model_audio` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_media_domain_model_document`
--

CREATE TABLE IF NOT EXISTS `typo3_media_domain_model_document` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_media_domain_model_image`
--

CREATE TABLE IF NOT EXISTS `typo3_media_domain_model_image` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `imagevariants` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:array)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_media_domain_model_tag`
--

CREATE TABLE IF NOT EXISTS `typo3_media_domain_model_tag` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `label` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_media_domain_model_video`
--

CREATE TABLE IF NOT EXISTS `typo3_media_domain_model_video` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_neos_domain_model_domain`
--

CREATE TABLE IF NOT EXISTS `typo3_neos_domain_model_domain` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `site` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hostpattern` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_neos_domain_model_site`
--

CREATE TABLE IF NOT EXISTS `typo3_neos_domain_model_site` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nodename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `state` int(11) NOT NULL,
  `siteresourcespackagekey` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_neos_domain_model_site`
--

INSERT INTO `typo3_neos_domain_model_site` (`persistence_object_identifier`, `name`, `nodename`, `state`, `siteresourcespackagekey`) VALUES
('fda1de4a-b5a7-7e25-b931-200c6e19d492', 'dresdenfueralle.de', 'dresdenfuerallede', 1, 'DDFA.dresdenfueralleDe');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_neos_domain_model_user`
--

CREATE TABLE IF NOT EXISTS `typo3_neos_domain_model_user` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `preferences` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_neos_domain_model_user`
--

INSERT INTO `typo3_neos_domain_model_user` (`persistence_object_identifier`, `preferences`) VALUES
('3f7b6774-413b-dc60-18af-a42bab30a764', '56fae9bd-8141-cc8f-3041-72d7a5665078'),
('9a697f54-d951-9867-63fd-498a09d8fae9', '70f15606-3109-6ea2-6875-d24f3662041e');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_neos_domain_model_userpreferences`
--

CREATE TABLE IF NOT EXISTS `typo3_neos_domain_model_userpreferences` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `preferences` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:array)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_neos_domain_model_userpreferences`
--

INSERT INTO `typo3_neos_domain_model_userpreferences` (`persistence_object_identifier`, `preferences`) VALUES
('56fae9bd-8141-cc8f-3041-72d7a5665078', 'a:0:{}'),
('70f15606-3109-6ea2-6875-d24f3662041e', 'a:0:{}');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_party_domain_model_abstractparty`
--

CREATE TABLE IF NOT EXISTS `typo3_party_domain_model_abstractparty` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `dtype` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_party_domain_model_abstractparty`
--

INSERT INTO `typo3_party_domain_model_abstractparty` (`persistence_object_identifier`, `dtype`) VALUES
('3f7b6774-413b-dc60-18af-a42bab30a764', 'typo3_neos_user'),
('9a697f54-d951-9867-63fd-498a09d8fae9', 'typo3_neos_user');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_party_domain_model_electronicaddress`
--

CREATE TABLE IF NOT EXISTS `typo3_party_domain_model_electronicaddress` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `identifier` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `usagetype` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `approved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_party_domain_model_person`
--

CREATE TABLE IF NOT EXISTS `typo3_party_domain_model_person` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `primaryelectronicaddress` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_party_domain_model_person`
--

INSERT INTO `typo3_party_domain_model_person` (`persistence_object_identifier`, `name`, `primaryelectronicaddress`) VALUES
('3f7b6774-413b-dc60-18af-a42bab30a764', '44a02f86-76ca-e83f-0eaf-0b283b317905', NULL),
('9a697f54-d951-9867-63fd-498a09d8fae9', 'ac122227-c96a-b326-46e8-85d4ed5080e5', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_party_domain_model_personname`
--

CREATE TABLE IF NOT EXISTS `typo3_party_domain_model_personname` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `middlename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `othername` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `alias` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_party_domain_model_personname`
--

INSERT INTO `typo3_party_domain_model_personname` (`persistence_object_identifier`, `title`, `firstname`, `middlename`, `lastname`, `othername`, `alias`, `fullname`) VALUES
('44a02f86-76ca-e83f-0eaf-0b283b317905', '', 'Felix', '', 'S', '', 'felix', 'Felix S'),
('ac122227-c96a-b326-46e8-85d4ed5080e5', '', 'Rudi', '', 'Dutschke', '', 'rudi', 'Rudi Dutschke');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_party_domain_model_person_electronicaddresses_join`
--

CREATE TABLE IF NOT EXISTS `typo3_party_domain_model_person_electronicaddresses_join` (
  `party_person` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `party_electronicaddress` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_typo3cr_domain_model_contentobjectproxy`
--

CREATE TABLE IF NOT EXISTS `typo3_typo3cr_domain_model_contentobjectproxy` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `targettype` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `targetid` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_typo3cr_domain_model_nodedata`
--

CREATE TABLE IF NOT EXISTS `typo3_typo3cr_domain_model_nodedata` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `workspace` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contentobjectproxy` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `path` varchar(4000) COLLATE utf8_unicode_ci NOT NULL,
  `identifier` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sortingindex` int(11) DEFAULT NULL,
  `properties` longblob NOT NULL COMMENT '(DC2Type:objectarray)',
  `nodetype` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `removed` tinyint(1) NOT NULL,
  `hidden` tinyint(1) NOT NULL,
  `hiddenbeforedatetime` datetime DEFAULT NULL,
  `hiddenafterdatetime` datetime DEFAULT NULL,
  `hiddeninindex` tinyint(1) NOT NULL,
  `accessroles` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `version` int(11) NOT NULL DEFAULT '1',
  `parentpath` varchar(4000) COLLATE utf8_unicode_ci NOT NULL,
  `pathhash` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `dimensionshash` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `dimensionvalues` longblob NOT NULL COMMENT '(DC2Type:objectarray)',
  `parentpathhash` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `movedto` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_typo3cr_domain_model_nodedata`
--

INSERT INTO `typo3_typo3cr_domain_model_nodedata` (`persistence_object_identifier`, `workspace`, `contentobjectproxy`, `path`, `identifier`, `sortingindex`, `properties`, `nodetype`, `removed`, `hidden`, `hiddenbeforedatetime`, `hiddenafterdatetime`, `hiddeninindex`, `accessroles`, `version`, `parentpath`, `pathhash`, `dimensionshash`, `dimensionvalues`, `parentpathhash`, `movedto`) VALUES
('31fa62ff-200b-0b56-1e49-deabf47f1037', 'live', NULL, '/', '410bf676-9ecd-86a8-aacf-ba2da52e8d41', NULL, 0x613a303a7b7d, 'unstructured', 0, 0, NULL, NULL, 0, 'a:0:{}', 2, '', '6666cd76f96956469e7be39d750cc7d9', 'd751713988987e9331980363e24189ce', 0x613a303a7b7d, 'd41d8cd98f00b204e9800998ecf8427e', NULL),
('4428decc-cac8-e109-48a1-201d8260cfab', 'live', NULL, '/sites/dresdenfuerallede/main/node-54f1b805168ae', 'e39ac279-f34c-5280-68af-37287d967693', 300, 0x613a313a7b733a343a2274657874223b733a32343a223c703e4472657364656e2066c3bc7220616c6c653c2f703e223b7d, 'TYPO3.Neos.NodeTypes:Text', 0, 0, NULL, NULL, 0, 'a:0:{}', 6, '/sites/dresdenfuerallede/main', '0c06583f946e87062b919a19c29e2772', 'fb11fdde869d0a8fcfe00a2fd35c031d', 0x613a313a7b733a383a226c616e6775616765223b613a313a7b693a303b733a323a226465223b7d7d, 'af584b6a3eb5e7b539c83fba184f7bdd', NULL),
('59b9e520-8c0f-aa73-eab4-2d23bfcedccc', 'live', NULL, '/sites/dresdenfuerallede/main/node-54f1b805168ae', 'e39ac279-f34c-5280-68af-37287d967693', 300, 0x613a313a7b733a343a2274657874223b733a32343a223c703e4472657364656e20706f757220746f75733c2f703e223b7d, 'TYPO3.Neos.NodeTypes:Text', 0, 0, NULL, NULL, 0, 'a:0:{}', 3, '/sites/dresdenfuerallede/main', '0c06583f946e87062b919a19c29e2772', '8f21da181f6ce38197fcb78d49f5384e', 0x613a313a7b733a383a226c616e6775616765223b613a313a7b693a303b733a323a226672223b7d7d, 'af584b6a3eb5e7b539c83fba184f7bdd', NULL),
('7cb5b87a-e8f4-b876-a8bc-7e4f49b45221', 'live', NULL, '/sites/dresdenfuerallede/main/node-54f1b805168ae', 'e39ac279-f34c-5280-68af-37287d967693', 300, 0x613a313a7b733a343a2274657874223b733a32323a223c703e4472657364656e20666f7220616c6c3c2f703e223b7d, 'TYPO3.Neos.NodeTypes:Text', 0, 0, NULL, NULL, 0, 'a:0:{}', 2, '/sites/dresdenfuerallede/main', '0c06583f946e87062b919a19c29e2772', 'e781f29c8dd927c09735547a848e3459', 0x613a313a7b733a383a226c616e6775616765223b613a313a7b693a303b733a323a22656e223b7d7d, 'af584b6a3eb5e7b539c83fba184f7bdd', NULL),
('91badb95-ae75-0ec0-7c91-68fa832482d9', 'live', NULL, '/sites', '9460e006-066b-8ee1-1563-2b415049db8f', 100, 0x613a303a7b7d, 'unstructured', 0, 0, NULL, NULL, 0, 'a:0:{}', 1, '/', 'dbd87ae51cbf5240fea77283585e69d5', 'fb11fdde869d0a8fcfe00a2fd35c031d', 0x613a313a7b733a383a226c616e6775616765223b613a313a7b693a303b733a323a226465223b7d7d, '6666cd76f96956469e7be39d750cc7d9', NULL),
('a657b035-93d8-c3c8-7532-277b0258441a', 'live', NULL, '/sites/dresdenfuerallede/main', 'b9b91fea-b79e-6d8d-2ce5-77d518ddd3a2', 100, 0x613a303a7b7d, 'TYPO3.Neos:ContentCollection', 0, 0, NULL, NULL, 0, 'a:0:{}', 1, '/sites/dresdenfuerallede', 'af584b6a3eb5e7b539c83fba184f7bdd', 'fb11fdde869d0a8fcfe00a2fd35c031d', 0x613a313a7b733a383a226c616e6775616765223b613a313a7b693a303b733a323a226465223b7d7d, '5dacdbbff760a9c4b058d511f4db5f2c', NULL),
('a734137c-03d4-8302-11e2-11ee1f9da415', 'user-rudi', NULL, '/', '250d4eb9-935a-ff76-2fde-f85df7a3e9fe', NULL, 0x613a303a7b7d, 'unstructured', 0, 0, NULL, NULL, 0, 'a:0:{}', 2, '', '6666cd76f96956469e7be39d750cc7d9', 'd751713988987e9331980363e24189ce', 0x613a303a7b7d, 'd41d8cd98f00b204e9800998ecf8427e', NULL),
('be709782-a857-b6cb-956f-d84c600b04cb', 'user-felix', NULL, '/', 'a0a1f62d-d9be-97b8-18ec-a79716dec210', NULL, 0x613a303a7b7d, 'unstructured', 0, 0, NULL, NULL, 0, 'a:0:{}', 2, '', '6666cd76f96956469e7be39d750cc7d9', 'd751713988987e9331980363e24189ce', 0x613a303a7b7d, 'd41d8cd98f00b204e9800998ecf8427e', NULL),
('c638d98d-9f39-a346-bb70-c083c48065cd', 'live', NULL, '/sites/dresdenfuerallede/main/node-54f1b805168ae', 'e39ac279-f34c-5280-68af-37287d967693', 300, 0x613a313a7b733a343a2274657874223b733a32373a223c703ed984d984d8acd985d98ad8b9204472657364656e3c2f703e223b7d, 'TYPO3.Neos.NodeTypes:Text', 0, 0, NULL, NULL, 0, 'a:0:{}', 4, '/sites/dresdenfuerallede/main', '0c06583f946e87062b919a19c29e2772', '949ed3c0df05604ed5dfef100e761a5f', 0x613a313a7b733a383a226c616e6775616765223b613a313a7b693a303b733a323a226172223b7d7d, 'af584b6a3eb5e7b539c83fba184f7bdd', NULL),
('f596ccb4-183b-c33b-9e90-fb6df8da0158', 'live', NULL, '/sites/dresdenfuerallede/main/node-54f1b805168ae', 'e39ac279-f34c-5280-68af-37287d967693', 300, 0x613a313a7b733a343a2274657874223b733a33303a223c703ed8a8d8b1d8a7db8c20d987d985d987204472657364656e3c2f703e223b7d, 'TYPO3.Neos.NodeTypes:Text', 0, 0, NULL, NULL, 0, 'a:0:{}', 3, '/sites/dresdenfuerallede/main', '0c06583f946e87062b919a19c29e2772', 'c8bbc9fe235a39371546183fb65a456a', 0x613a313a7b733a383a226c616e6775616765223b613a313a7b693a303b733a323a226661223b7d7d, 'af584b6a3eb5e7b539c83fba184f7bdd', NULL),
('fd16ab48-6bec-535b-6cb2-7373ad253831', 'live', NULL, '/sites/dresdenfuerallede', '24edf9e6-970c-bf0d-00c3-dbfb9083d7b7', 100, 0x613a313a7b733a353a227469746c65223b733a343a22486f6d65223b7d, 'TYPO3.Neos.NodeTypes:Page', 0, 0, NULL, NULL, 0, 'a:0:{}', 1, '/sites', '5dacdbbff760a9c4b058d511f4db5f2c', 'fb11fdde869d0a8fcfe00a2fd35c031d', 0x613a313a7b733a383a226c616e6775616765223b613a313a7b693a303b733a323a226465223b7d7d, 'dbd87ae51cbf5240fea77283585e69d5', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_typo3cr_domain_model_nodedimension`
--

CREATE TABLE IF NOT EXISTS `typo3_typo3cr_domain_model_nodedimension` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `nodedata` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_typo3cr_domain_model_nodedimension`
--

INSERT INTO `typo3_typo3cr_domain_model_nodedimension` (`persistence_object_identifier`, `nodedata`, `name`, `value`) VALUES
('f17909d1-7ad7-67c7-9889-03014184fb50', '4428decc-cac8-e109-48a1-201d8260cfab', 'language', 'de'),
('a3769773-461f-a538-0781-8967e23e11d8', '59b9e520-8c0f-aa73-eab4-2d23bfcedccc', 'language', 'fr'),
('1ab6e5a0-d284-e5ef-2b75-90b4fe513c58', '7cb5b87a-e8f4-b876-a8bc-7e4f49b45221', 'language', 'en'),
('b1841f95-77be-4843-026f-d6c2b1589eb9', '91badb95-ae75-0ec0-7c91-68fa832482d9', 'language', 'de'),
('3b6a077a-7188-1246-bf97-b6d440b808d8', 'a657b035-93d8-c3c8-7532-277b0258441a', 'language', 'de'),
('74241af9-e9a4-87b9-2378-b9f64e4f45c9', 'c638d98d-9f39-a346-bb70-c083c48065cd', 'language', 'ar'),
('016ec972-8c46-64ea-66bc-ed3ba8482cbe', 'f596ccb4-183b-c33b-9e90-fb6df8da0158', 'language', 'fa'),
('f6924da4-f7af-bda2-32c5-f33c432badd1', 'fd16ab48-6bec-535b-6cb2-7373ad253831', 'language', 'de');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_typo3cr_domain_model_workspace`
--

CREATE TABLE IF NOT EXISTS `typo3_typo3cr_domain_model_workspace` (
  `baseworkspace` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rootnodedata` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `typo3_typo3cr_domain_model_workspace`
--

INSERT INTO `typo3_typo3cr_domain_model_workspace` (`baseworkspace`, `rootnodedata`, `name`) VALUES
(NULL, '31fa62ff-200b-0b56-1e49-deabf47f1037', 'live'),
('live', 'be709782-a857-b6cb-956f-d84c600b04cb', 'user-felix'),
('live', 'a734137c-03d4-8302-11e2-11ee1f9da415', 'user-rudi');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `typo3_typo3cr_migration_domain_model_migrationstatus`
--

CREATE TABLE IF NOT EXISTS `typo3_typo3cr_migration_domain_model_migrationstatus` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `version` varchar(14) COLLATE utf8_unicode_ci NOT NULL,
  `direction` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `applicationtimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `ddfa_main_domain_model_category`
--
ALTER TABLE `ddfa_main_domain_model_category`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `UNIQ_CCFEF30F47A46B0A` (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `ddfa_main_domain_model_feedback`
--
ALTER TABLE `ddfa_main_domain_model_feedback`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `ddfa_main_domain_model_language`
--
ALTER TABLE `ddfa_main_domain_model_language`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `flow_identity_ddfa_main_domain_model_language` (`code`,`persistence_object_identifier`);

--
-- Indizes für die Tabelle `ddfa_main_domain_model_location`
--
ALTER TABLE `ddfa_main_domain_model_location`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `UNIQ_942C630547A46B0A` (`persistence_object_identifier`), ADD KEY `IDX_942C630557875C8A` (`market_entry_id`);

--
-- Indizes für die Tabelle `ddfa_main_domain_model_marketentry`
--
ALTER TABLE `ddfa_main_domain_model_marketentry`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `UNIQ_23C7669D47A46B0A` (`persistence_object_identifier`), ADD KEY `IDX_23C7669D25FBE593` (`parent_entry_id`), ADD KEY `IDX_23C7669D12469DE2` (`category_id`);

--
-- Indizes für die Tabelle `flow_doctrine_migrationstatus`
--
ALTER TABLE `flow_doctrine_migrationstatus`
 ADD PRIMARY KEY (`version`);

--
-- Indizes für die Tabelle `typo3_flow_mvc_routing_objectpathmapping`
--
ALTER TABLE `typo3_flow_mvc_routing_objectpathmapping`
 ADD PRIMARY KEY (`objecttype`,`uripattern`,`pathsegment`);

--
-- Indizes für die Tabelle `typo3_flow_resource_publishing_abstractpublishingconfiguration`
--
ALTER TABLE `typo3_flow_resource_publishing_abstractpublishingconfiguration`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_flow_resource_resource`
--
ALTER TABLE `typo3_flow_resource_resource`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD KEY `IDX_B4D45B323CB65D1` (`resourcepointer`), ADD KEY `IDX_B4D45B32A4A851AF` (`publishingconfiguration`);

--
-- Indizes für die Tabelle `typo3_flow_resource_resourcepointer`
--
ALTER TABLE `typo3_flow_resource_resourcepointer`
 ADD PRIMARY KEY (`hash`);

--
-- Indizes für die Tabelle `typo3_flow_security_account`
--
ALTER TABLE `typo3_flow_security_account`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `flow3_identity_typo3_flow3_security_account` (`accountidentifier`,`authenticationprovidername`), ADD KEY `IDX_65EFB31C89954EE0` (`party`);

--
-- Indizes für die Tabelle `typo3_flow_security_account_roles_join`
--
ALTER TABLE `typo3_flow_security_account_roles_join`
 ADD PRIMARY KEY (`flow_security_account`,`flow_policy_role`), ADD KEY `IDX_ADF11BBC58842EFC` (`flow_security_account`), ADD KEY `IDX_ADF11BBC23A1047C` (`flow_policy_role`);

--
-- Indizes für die Tabelle `typo3_flow_security_authorization_resource_securitypublis_861cb`
--
ALTER TABLE `typo3_flow_security_authorization_resource_securitypublis_861cb`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_flow_security_policy_role`
--
ALTER TABLE `typo3_flow_security_policy_role`
 ADD PRIMARY KEY (`identifier`);

--
-- Indizes für die Tabelle `typo3_flow_security_policy_role_parentroles_join`
--
ALTER TABLE `typo3_flow_security_policy_role_parentroles_join`
 ADD PRIMARY KEY (`flow_policy_role`,`parent_role`), ADD KEY `IDX_D459C58E23A1047C` (`flow_policy_role`), ADD KEY `IDX_D459C58E6A8ABCDE` (`parent_role`);

--
-- Indizes für die Tabelle `typo3_media_domain_model_asset`
--
ALTER TABLE `typo3_media_domain_model_asset`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD KEY `IDX_B8306B8EBC91F416` (`resource`);

--
-- Indizes für die Tabelle `typo3_media_domain_model_asset_tags_join`
--
ALTER TABLE `typo3_media_domain_model_asset_tags_join`
 ADD PRIMARY KEY (`media_asset`,`media_tag`), ADD KEY `IDX_DAF7A1EB1DB69EED` (`media_asset`), ADD KEY `IDX_DAF7A1EB48D8C57E` (`media_tag`);

--
-- Indizes für die Tabelle `typo3_media_domain_model_audio`
--
ALTER TABLE `typo3_media_domain_model_audio`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_media_domain_model_document`
--
ALTER TABLE `typo3_media_domain_model_document`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_media_domain_model_image`
--
ALTER TABLE `typo3_media_domain_model_image`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_media_domain_model_tag`
--
ALTER TABLE `typo3_media_domain_model_tag`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_media_domain_model_video`
--
ALTER TABLE `typo3_media_domain_model_video`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_neos_domain_model_domain`
--
ALTER TABLE `typo3_neos_domain_model_domain`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `flow_identity_typo3_neos_domain_model_domain` (`hostpattern`), ADD KEY `IDX_F227E8F6694309E4` (`site`);

--
-- Indizes für die Tabelle `typo3_neos_domain_model_site`
--
ALTER TABLE `typo3_neos_domain_model_site`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `flow3_identity_typo3_typo3_domain_model_site` (`nodename`);

--
-- Indizes für die Tabelle `typo3_neos_domain_model_user`
--
ALTER TABLE `typo3_neos_domain_model_user`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `UNIQ_E3F98B13E931A6F5` (`preferences`);

--
-- Indizes für die Tabelle `typo3_neos_domain_model_userpreferences`
--
ALTER TABLE `typo3_neos_domain_model_userpreferences`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_party_domain_model_abstractparty`
--
ALTER TABLE `typo3_party_domain_model_abstractparty`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_party_domain_model_electronicaddress`
--
ALTER TABLE `typo3_party_domain_model_electronicaddress`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_party_domain_model_person`
--
ALTER TABLE `typo3_party_domain_model_person`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `UNIQ_C60479E15E237E06` (`name`), ADD KEY `IDX_C60479E1A7CECF13` (`primaryelectronicaddress`);

--
-- Indizes für die Tabelle `typo3_party_domain_model_personname`
--
ALTER TABLE `typo3_party_domain_model_personname`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_party_domain_model_person_electronicaddresses_join`
--
ALTER TABLE `typo3_party_domain_model_person_electronicaddresses_join`
 ADD PRIMARY KEY (`party_person`,`party_electronicaddress`), ADD KEY `IDX_759CC08F72AAAA2F` (`party_person`), ADD KEY `IDX_759CC08FB06BD60D` (`party_electronicaddress`);

--
-- Indizes für die Tabelle `typo3_typo3cr_domain_model_contentobjectproxy`
--
ALTER TABLE `typo3_typo3cr_domain_model_contentobjectproxy`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Indizes für die Tabelle `typo3_typo3cr_domain_model_nodedata`
--
ALTER TABLE `typo3_typo3cr_domain_model_nodedata`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `UNIQ_60A956B92DBEC7578D94001992F8FB01` (`pathhash`,`workspace`,`dimensionshash`), ADD UNIQUE KEY `UNIQ_60A956B9772E836A8D94001992F8FB012D45FE4D` (`identifier`,`workspace`,`dimensionshash`,`movedto`), ADD KEY `IDX_820CADC88D940019` (`workspace`), ADD KEY `IDX_820CADC84930C33C` (`contentobjectproxy`), ADD KEY `parentpath_sortingindex` (`parentpathhash`,`sortingindex`), ADD KEY `identifierindex` (`identifier`), ADD KEY `nodetypeindex` (`nodetype`), ADD KEY `IDX_60A956B92D45FE4D` (`movedto`);

--
-- Indizes für die Tabelle `typo3_typo3cr_domain_model_nodedimension`
--
ALTER TABLE `typo3_typo3cr_domain_model_nodedimension`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD UNIQUE KEY `UNIQ_6C144D3693BDC8E25E237E061D775834` (`nodedata`,`name`,`value`), ADD KEY `IDX_6C144D3693BDC8E2` (`nodedata`);

--
-- Indizes für die Tabelle `typo3_typo3cr_domain_model_workspace`
--
ALTER TABLE `typo3_typo3cr_domain_model_workspace`
 ADD PRIMARY KEY (`name`), ADD KEY `IDX_71DE9CFBE9BFE681` (`baseworkspace`), ADD KEY `IDX_71DE9CFBBB46155` (`rootnodedata`);

--
-- Indizes für die Tabelle `typo3_typo3cr_migration_domain_model_migrationstatus`
--
ALTER TABLE `typo3_typo3cr_migration_domain_model_migrationstatus`
 ADD PRIMARY KEY (`persistence_object_identifier`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ddfa_main_domain_model_location`
--
ALTER TABLE `ddfa_main_domain_model_location`
ADD CONSTRAINT `FK_942C630557875C8A` FOREIGN KEY (`market_entry_id`) REFERENCES `ddfa_main_domain_model_marketentry` (`persistence_object_identifier`);

--
-- Constraints der Tabelle `ddfa_main_domain_model_marketentry`
--
ALTER TABLE `ddfa_main_domain_model_marketentry`
ADD CONSTRAINT `FK_23C7669D12469DE2` FOREIGN KEY (`category_id`) REFERENCES `ddfa_main_domain_model_category` (`persistence_object_identifier`),
ADD CONSTRAINT `FK_23C7669D25FBE593` FOREIGN KEY (`parent_entry_id`) REFERENCES `ddfa_main_domain_model_marketentry` (`persistence_object_identifier`);

--
-- Constraints der Tabelle `typo3_flow_resource_resource`
--
ALTER TABLE `typo3_flow_resource_resource`
ADD CONSTRAINT `FK_B4D45B32A4A851AF` FOREIGN KEY (`publishingconfiguration`) REFERENCES `typo3_flow_resource_publishing_abstractpublishingconfiguration` (`persistence_object_identifier`),
ADD CONSTRAINT `typo3_flow_resource_resource_ibfk_1` FOREIGN KEY (`resourcepointer`) REFERENCES `typo3_flow_resource_resourcepointer` (`hash`);

--
-- Constraints der Tabelle `typo3_flow_security_account`
--
ALTER TABLE `typo3_flow_security_account`
ADD CONSTRAINT `typo3_flow_security_account_ibfk_1` FOREIGN KEY (`party`) REFERENCES `typo3_party_domain_model_abstractparty` (`persistence_object_identifier`);

--
-- Constraints der Tabelle `typo3_flow_security_account_roles_join`
--
ALTER TABLE `typo3_flow_security_account_roles_join`
ADD CONSTRAINT `FK_ADF11BBC23A1047C` FOREIGN KEY (`flow_policy_role`) REFERENCES `typo3_flow_security_policy_role` (`identifier`),
ADD CONSTRAINT `FK_ADF11BBC58842EFC` FOREIGN KEY (`flow_security_account`) REFERENCES `typo3_flow_security_account` (`persistence_object_identifier`);

--
-- Constraints der Tabelle `typo3_flow_security_authorization_resource_securitypublis_861cb`
--
ALTER TABLE `typo3_flow_security_authorization_resource_securitypublis_861cb`
ADD CONSTRAINT `FK_234846D521E3D446` FOREIGN KEY (`persistence_object_identifier`) REFERENCES `typo3_flow_resource_publishing_abstractpublishingconfiguration` (`persistence_object_identifier`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `typo3_flow_security_policy_role_parentroles_join`
--
ALTER TABLE `typo3_flow_security_policy_role_parentroles_join`
ADD CONSTRAINT `FK_D459C58E23A1047C` FOREIGN KEY (`flow_policy_role`) REFERENCES `typo3_flow_security_policy_role` (`identifier`),
ADD CONSTRAINT `FK_D459C58E6A8ABCDE` FOREIGN KEY (`parent_role`) REFERENCES `typo3_flow_security_policy_role` (`identifier`);

--
-- Constraints der Tabelle `typo3_media_domain_model_asset`
--
ALTER TABLE `typo3_media_domain_model_asset`
ADD CONSTRAINT `FK_B8306B8EBC91F416` FOREIGN KEY (`resource`) REFERENCES `typo3_flow_resource_resource` (`persistence_object_identifier`);

--
-- Constraints der Tabelle `typo3_media_domain_model_asset_tags_join`
--
ALTER TABLE `typo3_media_domain_model_asset_tags_join`
ADD CONSTRAINT `FK_DAF7A1EB1DB69EED` FOREIGN KEY (`media_asset`) REFERENCES `typo3_media_domain_model_asset` (`persistence_object_identifier`),
ADD CONSTRAINT `FK_DAF7A1EB48D8C57E` FOREIGN KEY (`media_tag`) REFERENCES `typo3_media_domain_model_tag` (`persistence_object_identifier`);

--
-- Constraints der Tabelle `typo3_media_domain_model_audio`
--
ALTER TABLE `typo3_media_domain_model_audio`
ADD CONSTRAINT `FK_A2E2074747A46B0A` FOREIGN KEY (`persistence_object_identifier`) REFERENCES `typo3_media_domain_model_asset` (`persistence_object_identifier`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `typo3_media_domain_model_document`
--
ALTER TABLE `typo3_media_domain_model_document`
ADD CONSTRAINT `FK_F089E2F547A46B0A` FOREIGN KEY (`persistence_object_identifier`) REFERENCES `typo3_media_domain_model_asset` (`persistence_object_identifier`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `typo3_media_domain_model_image`
--
ALTER TABLE `typo3_media_domain_model_image`
ADD CONSTRAINT `FK_7FA2358D47A46B0A` FOREIGN KEY (`persistence_object_identifier`) REFERENCES `typo3_media_domain_model_asset` (`persistence_object_identifier`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `typo3_media_domain_model_video`
--
ALTER TABLE `typo3_media_domain_model_video`
ADD CONSTRAINT `FK_C658EBFE47A46B0A` FOREIGN KEY (`persistence_object_identifier`) REFERENCES `typo3_media_domain_model_asset` (`persistence_object_identifier`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `typo3_neos_domain_model_domain`
--
ALTER TABLE `typo3_neos_domain_model_domain`
ADD CONSTRAINT `typo3_neos_domain_model_domain_ibfk_1` FOREIGN KEY (`site`) REFERENCES `typo3_neos_domain_model_site` (`persistence_object_identifier`);

--
-- Constraints der Tabelle `typo3_neos_domain_model_user`
--
ALTER TABLE `typo3_neos_domain_model_user`
ADD CONSTRAINT `typo3_neos_domain_model_user_ibfk_1` FOREIGN KEY (`preferences`) REFERENCES `typo3_neos_domain_model_userpreferences` (`persistence_object_identifier`),
ADD CONSTRAINT `typo3_neos_domain_model_user_ibfk_2` FOREIGN KEY (`persistence_object_identifier`) REFERENCES `typo3_party_domain_model_abstractparty` (`persistence_object_identifier`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `typo3_party_domain_model_person`
--
ALTER TABLE `typo3_party_domain_model_person`
ADD CONSTRAINT `typo3_party_domain_model_person_ibfk_1` FOREIGN KEY (`name`) REFERENCES `typo3_party_domain_model_personname` (`persistence_object_identifier`),
ADD CONSTRAINT `typo3_party_domain_model_person_ibfk_2` FOREIGN KEY (`primaryelectronicaddress`) REFERENCES `typo3_party_domain_model_electronicaddress` (`persistence_object_identifier`),
ADD CONSTRAINT `typo3_party_domain_model_person_ibfk_3` FOREIGN KEY (`persistence_object_identifier`) REFERENCES `typo3_party_domain_model_abstractparty` (`persistence_object_identifier`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `typo3_party_domain_model_person_electronicaddresses_join`
--
ALTER TABLE `typo3_party_domain_model_person_electronicaddresses_join`
ADD CONSTRAINT `typo3_party_domain_model_person_electronicaddresses_join_ibfk_1` FOREIGN KEY (`party_person`) REFERENCES `typo3_party_domain_model_person` (`persistence_object_identifier`),
ADD CONSTRAINT `typo3_party_domain_model_person_electronicaddresses_join_ibfk_2` FOREIGN KEY (`party_electronicaddress`) REFERENCES `typo3_party_domain_model_electronicaddress` (`persistence_object_identifier`);

--
-- Constraints der Tabelle `typo3_typo3cr_domain_model_nodedata`
--
ALTER TABLE `typo3_typo3cr_domain_model_nodedata`
ADD CONSTRAINT `FK_60A956B92D45FE4D` FOREIGN KEY (`movedto`) REFERENCES `typo3_typo3cr_domain_model_nodedata` (`persistence_object_identifier`) ON DELETE SET NULL,
ADD CONSTRAINT `FK_60A956B98D940019` FOREIGN KEY (`workspace`) REFERENCES `typo3_typo3cr_domain_model_workspace` (`name`) ON DELETE SET NULL,
ADD CONSTRAINT `typo3_typo3cr_domain_model_nodedata_ibfk_2` FOREIGN KEY (`contentobjectproxy`) REFERENCES `typo3_typo3cr_domain_model_contentobjectproxy` (`persistence_object_identifier`);

--
-- Constraints der Tabelle `typo3_typo3cr_domain_model_nodedimension`
--
ALTER TABLE `typo3_typo3cr_domain_model_nodedimension`
ADD CONSTRAINT `FK_6C144D3693BDC8E2` FOREIGN KEY (`nodedata`) REFERENCES `typo3_typo3cr_domain_model_nodedata` (`persistence_object_identifier`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `typo3_typo3cr_domain_model_workspace`
--
ALTER TABLE `typo3_typo3cr_domain_model_workspace`
ADD CONSTRAINT `FK_71DE9CFBBB46155` FOREIGN KEY (`rootnodedata`) REFERENCES `typo3_typo3cr_domain_model_nodedata` (`persistence_object_identifier`),
ADD CONSTRAINT `FK_71DE9CFBE9BFE681` FOREIGN KEY (`baseworkspace`) REFERENCES `typo3_typo3cr_domain_model_workspace` (`name`) ON DELETE SET NULL;
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
