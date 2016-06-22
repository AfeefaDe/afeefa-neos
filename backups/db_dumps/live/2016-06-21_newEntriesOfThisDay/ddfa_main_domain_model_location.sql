-- phpMyAdmin SQL Dump
-- version 4.0.10.15
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 22. Jun 2016 um 01:30
-- Server Version: 5.1.73-log
-- PHP-Version: 5.6.21

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `afeefa_neos_live`
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
  `updated` datetime NOT NULL,
  PRIMARY KEY (`persistence_object_identifier`),
  UNIQUE KEY `UNIQ_942C630547A46B0A` (`persistence_object_identifier`),
  KEY `IDX_942C630557875C8A` (`market_entry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_location`
--

INSERT INTO `ddfa_main_domain_model_location` (`persistence_object_identifier`, `market_entry_id`, `lon`, `lat`, `street`, `district`, `zip`, `city`, `placename`, `openinghours`, `arrival`, `entry_id`, `locale`, `created`, `updated`) VALUES
('446c96cf-50bb-4c38-a8b1-dca2ce38e5a6', 'd32b7413-a98c-46be-9ff3-9559f67098c3', '13.702611', '51.058573', 'Hamburger Straße 17-24', NULL, '01067', 'Dresden', 'Erstaufnahmeeinrichtung (EAE) Hamburger Straße', '', 'Straßenbahnlinie 1: Haltestelle Technisches Rathaus', '57699e38260f4', 'de', '2016-06-21 22:06:16', '2016-06-21 22:08:48'),
('0796360f-e243-4d59-bfa0-b42e382e8caf', '6ae9f10c-27a8-4c87-9cac-c15f851c8649', '13.720586', '51.056122', 'Wachsbleichstr. 4a', NULL, '01067', 'Dresden', 'Motorenhalle', '', 'Mit S1 oder S2 (S-Bahn): Haltestelle Dresden Mitte\r\nMit Straßenbahnlinie 1, 2, 6 und 10: Haltestelle Dresden Mitte', '57699830ecb84', 'de', '2016-06-21 21:40:32', '2016-06-21 21:40:32'),
('3f8191c3-7ea5-4c02-901e-b41156e55150', 'a7f138cc-d45b-46e2-99f6-5fb4224136cb', '13.720586', '51.056122', 'Wachsbleichstr. 4a', NULL, '01067', 'Dresden', 'Motorenhalle', '', 'Mit S1 oder S2 (S-Bahn): Haltestelle Dresden Mitte\r\nMit Straßenbahnlinie 1, 2, 6 und 10: Haltestelle Dresden Mitte', '57699789e5337', 'de', '2016-06-21 21:37:45', '2016-06-21 21:37:45'),
('4f83ff66-e949-44cb-954a-f664b4e3bcf4', '3df1b1a2-2ed6-4089-bddb-9fb60e0f4e8d', '13.720586', '51.056122', 'Wachsbleichstr. 4a', NULL, '01067', 'Dresden', 'Motorenhalle', '', 'Mit S1 oder S2 (S-Bahn): Haltestelle Dresden Mitte\r\nMit Straßenbahnlinie 1, 2, 6 und 10: Haltestelle Dresden Mitte', '576996ef7bf24', 'de', '2016-06-21 21:35:11', '2016-06-21 21:35:29'),
('3927661a-3e55-4f59-89e9-2bfeabacdf42', 'a2727728-53c9-4496-9014-c56c54169fe3', NULL, NULL, 'Schilfweg 3', NULL, '01237', 'Dresden', 'VHS Dresden e.V. (Bildungsberatung Dresden)', NULL, NULL, '57695f032d2b9', 'de', '2016-06-21 17:36:35', '2016-06-21 17:36:35'),
('17fbb9cd-55dc-495e-9dfc-eb3bd176233c', '08e90451-96ba-48bc-b89c-3a25f69eea1a', NULL, NULL, 'Helbigsdorfer Weg 1', NULL, '01169', 'Dresden', 'VHS Dresden e.V. (Bildungsberatung Dresden)', NULL, NULL, '57695ee7d1651', 'de', '2016-06-21 17:36:07', '2016-06-21 17:36:07'),
('9104becf-6abb-4fe3-abf0-da5620a837fd', 'a94da8c4-437f-4502-b6eb-47eb3ab84c1c', NULL, NULL, 'Gerokstraße 20', NULL, '01307', 'Dresden', 'VHS Dresden e.V. (Bildungsberatung Dresden)', NULL, NULL, '57695eabdd9de', 'de', '2016-06-21 17:35:07', '2016-06-21 17:35:07');

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
