-- phpMyAdmin SQL Dump
-- version 4.0.10.15
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 27. Jul 2016 um 15:54
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
('18eb1bee-1fb9-4232-9d3a-2bf9e0fd4a2a', '5b68c684-03be-4a92-94d2-6655d425701d', '13.750409', '51.061347', 'Glacisstraße 28', NULL, '01099', 'Dresden', '', 'Montag von 15.00-17.00 Uhr', '', '576fb7d049b76', 'de', '2016-06-26 13:09:04', '2016-06-26 13:09:04'),
('36904161-9c59-4a94-bcf3-ac65b39726ec', 'c0431510-afb3-480e-98bb-424b54a300eb', '13.773513', '51.047414', 'Haydnstr. 16', NULL, '01309', 'Dresden', 'Adventhaus', 'monatlich, Daten siehe Website', 'Bahn Linie 4,10,12 und Bus 64, Haltestelle Fetscherplatz', '5776d2080bb4c', 'de', '2016-07-01 22:26:48', '2016-07-18 12:13:58'),
('4e36c00a-e216-422b-9c20-ccedc4ee591f', '2e1ee26b-9d75-47e0-8326-1ca25af43189', '13.671453', '51.046644', ' Helbigsdorfer Weg 1', NULL, '01169', 'Dresden', 'VHS Dresden e.V. (Bildungsberatung Dresden)', '', 'Merianplatz Tram 1, 2, 6, 7, 8, 9, 10, 11, 12, 13 ', '57835ed1c8584', 'de', '2016-07-11 10:54:41', '2016-07-11 10:54:41'),
('7a3b667c-6a95-4b5a-9c95-9cd2567a9445', 'd011d4cd-53ce-4878-a34c-75514acc26fc', '13.803001', '51.025100', 'Schilfweg 3', NULL, '01237', 'Dresden', 'VHS Dresden e.V. (Bildungsberatung Dresden)', '', 'Marienberger Straße\nTram 1, 2 Bus 87, EV 1, EV 2 ', '57835d7b0f603', 'de', '2016-07-11 10:48:59', '2016-07-11 10:51:32'),
('8d7d974e-6660-4ec7-a23e-25fd99c60c79', '61e10658-b208-4cdc-8323-e17e0fc6d296', '13.800265', '51.033877', 'Bärensteiner Straße 33', NULL, '01277', 'Dresden', 'Sportanlage Bärensteiner Straße', 'Dienstag 14.30-16.00 Uhr', 'Haltestelle Bärensteiner Straße Bus 85', '5784ca0c0b98c', 'de', '2016-07-12 12:44:28', '2016-07-13 10:50:49'),
('a9b27c50-0c98-448a-8ddf-269da849592c', 'af7b5dda-1ddb-4144-b852-47fc689f8b7d', '13.731909', '51.028192', 'Bergstraße 53', NULL, '', 'Dresden', 'TU Dresden von-Gerber-Bau', '', 'Mommsenstraße Bus 66 352, 360, 366\r\nTechnische Universität (Fr.-Foerster-Platz) Bus 61, 63, 66 352, 360, 366, 424, 672', '577d141487a52', 'de', '2016-07-06 16:22:12', '2016-07-18 14:00:30');

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
