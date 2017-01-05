-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Jan 2017 um 20:59
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
('000c878e-1212-48c3-8ed1-1009165fbd6c', '3ad29bee-a765-45f9-9852-14e1b27dd694', '13.725164', '51.055356', 'Könneritzstr. 25 ', '', '01067', 'Dresden', 'Donner u. Partner GmbH Sachsen - Zentrum für Bildung und Arbeit', '', '', '586ea52489fbd', 'de', '2017-01-05 20:57:24', '2017-01-05 20:57:24'),
('01dcb339-0102-4525-bb49-d17098871893', 'fe5e90c4-3b94-4671-8542-48a8b0c1ea3f', '13.77081', '51.05809', 'Blumenstr. 80 ', '', '01307', 'Dresden', 'DAA Deutsche Angestellten Akademie GmbH', '', '', '586ea5390d7ad', 'de', '2017-01-05 20:57:45', '2017-01-05 20:57:45'),
('0e9c5785-014d-4ef4-b535-9b73232c8c40', '22058663-336b-4d31-a97e-edee3ad87204', '13.725164', '51.055356', 'Könneritzstr. 25 ', '', '01067', 'Dresden', 'Euro-Schulen GmbH - Euro-Schulen Dresden - Meißen', '', '', '586ea523cb826', 'de', '2017-01-05 20:57:23', '2017-01-05 20:57:23'),
('142d8836-e0ce-4387-bd94-89e25c3d33ec', '1147ca4a-71c0-4933-8200-b1228bff7df7', '13.67138', '51.04657', 'Helbigsdorfer Weg 1 ', '', '01169', 'Dresden', 'VHS Dresden e. V.', '', '', '586ea54ccebe7', 'de', '2017-01-05 20:58:04', '2017-01-05 20:58:04'),
('1b19ab68-b684-4871-8851-30899e1b9a25', '2e3eb234-1a0e-43f2-a095-4d17697886af', '13.772731', '51.03099', 'Karcherallee 41 ', '', '01277', 'Dresden', 'inlingua Sprachschule Dresden GmbH & Co.', '', '', '586ea543e0bca', 'de', '2017-01-05 20:57:55', '2017-01-05 20:57:55'),
('24f4ffa1-1dc1-4077-8489-66c62f0aae24', '1e1f35ba-27c2-44fc-a70d-5c64118ed54f', '13.71905', '51.0544', 'Löbtauer Str. 4-6 ', '', '01067', 'Dresden', 'bam GmbH', '', '', '586ea52a20ae4', 'de', '2017-01-05 20:57:30', '2017-01-05 20:57:30'),
('297647d3-69fe-44f2-ab37-90142b8cf1b9', '469dead0-396a-415f-a78e-1ec0b6e012bd', '13.743519', '51.023919', 'Paradiesstr. 42 ', '', '01217', 'Dresden', 'LOESERnet.com GmbH', '', '', '586ea53dcd1e5', 'de', '2017-01-05 20:57:49', '2017-01-05 20:57:49'),
('2ca04817-56be-46c7-b065-3cae69ad951d', '956316b7-1f92-4596-ae34-bd0d70ce0a1d', '13.740882', '51.064858', 'Schlesischer Platz 2 ', '', '01097', 'Dresden', 'FremdSprachenSchule for everyone GmbH', '', '', '586ea52b7c264', 'de', '2017-01-05 20:57:31', '2017-01-05 20:57:31'),
('2d7421d7-f7de-4092-8b7b-b34f2e65a0e5', '8020dbda-423e-4494-8f41-310bf9941227', '13.715767', '51.087272', 'Boxdorfer Straße  1-3 ', '', '01239', 'Dresden', 'VHS Dresden e. V.', '', '', '586ea54c33471', 'de', '2017-01-05 20:58:04', '2017-01-05 20:58:04'),
('2d8f3b74-abd1-42b4-927d-c4f66a7dd7cd', '9185034c-fd57-487c-8a3e-ac185d5f5e4a', '13.729814', '51.049494', 'Annenstr. 10 ', '', '01067', 'Dresden', 'VHS Dresden e. V.', '', '', '586ea52476b59', 'de', '2017-01-05 20:57:24', '2017-01-05 20:57:24'),
('2eb008ed-d810-473f-b020-a5417b2802c7', '86c5c0ba-d10e-437d-a4a0-c5f8d09d9c83', '13.75431', '51.06308', 'Bautzner Str. 41 ', '', '01099', 'Dresden', 'difo Dresdner Institut für Fortbildung', '', '', '586ea53068af7', 'de', '2017-01-05 20:57:36', '2017-01-05 20:57:36'),
('2ee49b1b-b4fd-4a28-974b-0a53290b8a83', '4cc31259-01d3-40e6-a9f1-5a076340b40d', '13.728678', '51.051837', 'Hertha-Lindner-Str. 10-12 ', '', '01067', 'Dresden', 'FremdSprachenSchule for everyone GmbH', '', '', '586ea523cb3c3', 'de', '2017-01-05 20:57:23', '2017-01-05 20:57:23'),
('34f8e28c-e502-4df8-a297-3c1b23b697ea', '72461a98-c0e3-4bb8-a333-f0ea018c3cb0', '13.764116', '51.052399', 'Gerokstr. 22 ', '', '01307', 'Dresden', 'VHS Dresden e. V.', '', '', '586ea531f3b6e', 'de', '2017-01-05 20:57:37', '2017-01-05 20:57:37'),
('35b1e986-d330-4074-9a79-3fd9d675ce45', '3e6598fc-f041-49b3-91c5-3bcc96190ba8', '13.763702', '51.052903', 'Gerokstr. 20 ', '', '01307', 'Dresden', 'VHS Dresden e. V.', '', '', '586ea5311da2f', 'de', '2017-01-05 20:57:37', '2017-01-05 20:57:37'),
('40b91c07-fca1-42f0-8be0-162c5a976aa7', '2b57f484-cb0d-4847-b136-141d8df2fd11', '13.76329', '51.02409', 'Lockwitzer Str. 23-27 ', '', '01219', 'Dresden', 'WBS TRAINING AG Dresden', '', '', '586ea5460e136', 'de', '2017-01-05 20:57:58', '2017-01-05 20:57:58'),
('476393af-192f-4313-98e5-e15f1b0bb199', '7805590f-bd21-4169-8dc6-22547d20e7e0', '13.71443', '51.03742', 'Nossener Brücke 8-12 ', '', '01187', 'Dresden', 'inlingua Sprachschule Dresden GmbH & Co.', '', '', '586ea538005d1', 'de', '2017-01-05 20:57:44', '2017-01-05 20:57:44'),
('4a0f7c5a-4a2b-4616-9921-a821815be428', 'a3cefcf7-81af-4ade-bdf1-fadc97cc80ea', '13.70954', '51.0333', 'Würzburger Str. 35 ', '', '01187', 'Dresden', 'KOMPASS Kompetenzen passgenau vermitteln gGmbH', '', '', '586ea53b812d0', 'de', '2017-01-05 20:57:47', '2017-01-05 20:57:47'),
('4e89da5b-3483-4bab-ba53-0046dd07c09f', 'a06c42bd-6c7b-4dd0-96de-a2b063c48522', '13.74795', '51.03059', 'Weberplatz 2 ', '', '01217', 'Dresden', 'ASG-anerkannte Schulgesellschaft mbH', '', '', '586ea5385268c', 'de', '2017-01-05 20:57:44', '2017-01-05 20:57:44'),
('6ea5fcb7-7fea-406b-b29b-0e611a1489a8', '4472ab3d-29a9-4de5-b51c-411ed9c695e4', '13.743021', '51.049327', 'Wilsdruffer Str. 5 ', '', '01067', 'Dresden', 'FremdSprachenSchule for everyone GmbH', '', '', '586ea5243a48d', 'de', '2017-01-05 20:57:24', '2017-01-05 20:57:24'),
('a9e39c3e-5dfe-42cf-a490-67239e65a3dc', '73fa9373-f1e3-4ad4-8fd8-867658adff8e', '13.77029', '51.07214', 'Stauffenbergallee 4 ', '', '01099', 'Dresden', 'DPFA -Weiterbildung GmbH, Bildungszentrum Dresden', '', '', '586ea5409f1a0', 'de', '2017-01-05 20:57:52', '2017-01-05 20:57:52'),
('ab906a0e-1202-44ff-8c93-bcb437f668ab', 'ba5e739f-f1ca-457f-8676-83b86c2748d3', '13.788874', '51.052387', 'Mendelssohnallee 8 ', '', '01309', 'Dresden', 'Mitteldeutsches Institut für Qualifikation und berufliche Rehabilitation Erfurt', '', '', '586ea549bbb8f', 'de', '2017-01-05 20:58:01', '2017-01-05 20:58:01'),
('b010be9d-a6ac-4669-9ef4-68b51ea7fecb', '8a38e4fc-0df6-42b5-8cd8-01f1c2c587c5', '13.76329', '51.02409', 'Lockwitzer Str. 23-27 ', '', '01219', 'Dresden', 'WBS', '', '', '586ea54603d10', 'de', '2017-01-05 20:57:58', '2017-01-05 20:57:58'),
('b3a89df8-b242-414b-a580-1950ff99812b', 'de4ea92c-e36a-405a-ba52-31504acd1926', '13.73195', '51.042082', 'Wiener Platz 6 ', '', '01069', 'Dresden', 'Euro-Schulen GmbH - Euro-Schulen Dresden - Meißen', '', '', '586ea52a7201d', 'de', '2017-01-05 20:57:30', '2017-01-05 20:57:30'),
('b7d0a75c-2a94-4ccc-945b-9893140e9072', '2c45907b-2e1b-4132-ba89-f9c80d752c23', '13.752436', '51.05987', 'Hoyerswerdaer Str. 3 ', '', '01099', 'Dresden', 'comcenter', '', '', '586ea52ae56a6', 'de', '2017-01-05 20:57:30', '2017-01-05 20:57:30'),
('ba835518-4547-4e47-aee2-435df733cc42', '55e00d24-3415-4440-be8d-4442a9a9a9c5', '13.711805', '51.034702', 'Bamberger Str. 7 ', '', '01187', 'Dresden', 'Kulturakademie Dresden Gesellschaft für soziale und kulturelle Bildung, gemeinnützige GmbH', '', '', '586ea53a68a54', 'de', '2017-01-05 20:57:46', '2017-01-05 20:57:46'),
('c24400a1-cb53-4046-985b-ac3a16e86b7d', 'f6b1564a-036f-4511-b298-4da5f3f106f8', '13.717117', '51.039397', 'Werdauer Str. 1-3 ', '', '01069', 'Dresden', 'AFW Akademie für Weiterbildung GmbH - Bildungszentrum Dresden', '', '', '586ea53178eee', 'de', '2017-01-05 20:57:37', '2017-01-05 20:57:37'),
('c794a701-b180-4f3c-b997-a134b5d8c055', '6dba36b9-f635-44b8-b36d-bb6b2ee8747e', '13.740574', '51.036314', 'Strehlener Str. 14 ', '', '01069', 'Dresden', 'Institut für Bildung und Sicherheit -IBS Erfurt-', '', '', '586ea52bf2588', 'de', '2017-01-05 20:57:31', '2017-01-05 20:57:31'),
('cc8476ab-8b88-4ec4-8caf-09a6ddd2f6a5', '7ded93a2-852e-4527-8c40-6188974404b8', '13.72608', '51.08676', 'Großenhainer Str. 132 ', '', '01129', 'Dresden', 'ASG-anerkannte Schulgesellschaft mbH', '', '', '586ea549abdac', 'de', '2017-01-05 20:58:01', '2017-01-05 20:58:01'),
('d68491da-7011-4106-a777-6bc1ab8f2a16', '558efa2c-2d03-40f4-b9e8-e624dbd42773', '13.768748', '51.083625', 'Am Lagerplatz 8 ', '', '01099', 'Dresden', 'Handwerkskammer Dresden', '', '', '586ea549d977b', 'de', '2017-01-05 20:58:01', '2017-01-05 20:58:01'),
('dc394e33-5377-45f3-b5cc-e503be20a39c', 'a73b6ced-f408-451c-94c1-d4a6a3923309', '13.725164', '51.055356', 'Könneritzstr. 25 ', '', '01067', 'Dresden', 'FremdSprachenSchule for everyone GmbH', '', '', '586ea52499076', 'de', '2017-01-05 20:57:24', '2017-01-05 20:57:24'),
('e0a4244d-6734-4d7f-8851-1459624dcaa3', 'cca60edb-b3c5-413f-b92c-850efac3cdf8', '13.745925', '51.034251', 'Semperstr. 2 ', '', '01069', 'Dresden', 'RBZ Eckert', '', '', '586ea536a4717', 'de', '2017-01-05 20:57:42', '2017-01-05 20:57:42'),
('e0a814be-974b-44d2-9569-9104f97be5e8', '221239b8-c4f9-45b6-8510-117372b9a180', '13.742049', '51.033685', 'Schnorrstr. 70 ', '', '01069', 'Dresden', 'Bildungsinstitut des Handels e.V.', '', '', '586ea533253fc', 'de', '2017-01-05 20:57:39', '2017-01-05 20:57:39'),
('ee0c4eb9-3fd8-4d4e-b2b6-20956f6e15da', '32a3a36a-1bd0-4d36-b8e5-ad07fd911006', '13.757988', '51.063978', 'Pulsnitzer Str. 6 ', '', '01099', 'Dresden', 'difo Dresdner Institut für Fortbildung', '', '', '586ea53272145', 'de', '2017-01-05 20:57:38', '2017-01-05 20:57:38'),
('f1e80706-5e3f-4f2a-b584-05d387028aec', '74be5fd6-f4d1-45f9-bed1-522d883aa323', '13.743476', '51.065023', 'Erna-Berger-Str. 15 ', '', '01097', 'Dresden', 'FremdSprachenSchule for everyone GmbH', '', '', '586ea52b53013', 'de', '2017-01-05 20:57:31', '2017-01-05 20:57:31'),
('f5654577-df7b-41e3-9a9e-e26263dfbe43', 'a6635096-d19d-45e6-91ec-de8e655dce1a', '13.699403', '51.034952', 'Mohorner Str. 19a ', '', '01159', 'Dresden', 'Euro-Schulen GmbH - Euro-Schulen Dresden - Meißen', '', '', '586ea5405a3ff', 'de', '2017-01-05 20:57:52', '2017-01-05 20:57:52'),
('fcaf41db-368c-43d8-b671-b5bc2f2acbc0', '1eed03d0-07f2-4330-894c-a979dbea1978', '13.729796', '51.081562', 'Großenhainer Str. 99 ', '', '01127', 'Dresden', 'die Sprachwerkstatt GmbH', '', '', '586ea540eb094', 'de', '2017-01-05 20:57:52', '2017-01-05 20:57:52');

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
