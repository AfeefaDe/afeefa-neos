-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 30. Mai 2015 um 11:18
-- Server Version: 5.6.21
-- PHP-Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `ddfa_neos`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_location`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_location` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `initiative_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `market_entry_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `event_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_id` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lat` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `scope` tinyint(1) DEFAULT NULL,
  `openinghours` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(11) NOT NULL,
  `entry_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `web` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `locale` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `facebook` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `speakerpublic` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `speakerprivate` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagetype` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supportwanted` tinyint(1) DEFAULT NULL,
  `spokenlanguages` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_location`
--

INSERT INTO `ddfa_main_domain_model_location` (`persistence_object_identifier`, `initiative_id`, `market_entry_id`, `event_id`, `category_id`, `lon`, `lat`, `street`, `district`, `zip`, `city`, `scope`, `openinghours`, `type`, `entry_id`, `name`, `description`, `mail`, `web`, `phone`, `rating`, `locale`, `created`, `updated`, `facebook`, `speakerpublic`, `speakerprivate`, `image`, `imagetype`, `supportwanted`, `spokenlanguages`) VALUES
('142720c7-ae52-4b14-871f-a7f39be18239', 'd6c0ed14-1679-471b-b9d1-bab8653f1d2c', NULL, NULL, NULL, '13.69432', '51.03803', 'Clara-Zetkin-Straße 30 (Hoffnungskirche)', 'dis36', '01159', 'Dresden', 0, '', 0, '5564d860647d9', 'Willkommen in Löbtau', '', '', '', '', 3, 'de', '2015-05-26 22:32:32', '2015-05-26 22:32:32', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('b7b9b244-ea4e-4a2c-b8be-c7e375417fa1', 'b517f0da-080d-4027-a7a5-0650580c9eeb', NULL, NULL, NULL, '13.68406', '51.10749', 'August-Bebel-Straße 49', 'dis1', '01445', 'Radebeul', 0, '', 0, '5564581a5a4d3', 'Bündnis Buntes Radebeul', '', '', '', '', 3, 'de', '2015-05-26 13:25:14', '2015-05-26 13:25:14', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('de1b5c3f-794b-4350-b86e-2bc7c1b18f34', '5e4807ec-48d5-cefd-62fc-d30d9b1998e2', NULL, NULL, NULL, '13.7391965', '51.0491571', 'Kreuzstraße 7', 'dis23', '01067', 'Dresden', 0, 'Montag 10-13 und 13-16; Dienstag 13-17; Mittwoch 14-17; Freitag 10-13', 0, '5561b15e546ea', 'Cabana Migrationsberatung', '', '', '', '', 3, 'de', '2015-05-24 13:09:18', '2015-05-24 13:09:18', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('e37850f4-851e-4cdd-895e-553d1034fe57', '079ac720-80a7-4e83-89b1-820d5acd7a67', NULL, NULL, NULL, '13.8379731', '51.0242401', 'Österreicher Str. 54', 'dis32', '01279', 'Dresden', 1, '', 0, '556481fb0c114', 'Laubegast ist Bunt', '', '', '', '', 3, 'de', '2015-05-26 16:23:55', '2015-05-26 16:23:55', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('e53755e2-b1fd-4b6c-a0ba-99cfcc944b7c', 'cef95b30-5c74-4076-b7c9-c4a049802694', NULL, NULL, NULL, '13.70205', '51.05225', 'Emerich-Ambros-Ufer 42', 'dis1', '01159', 'Dresden', 0, 'Beratungsangebot: freitags 16:00 Uhr bis 18:00 Uhr im Keller der Gemeinschaftsunterkunft Florian-Geyer-Straße 48', 0, '556457b08b67d', 'Kontaktgruppe Asyl e.V.', '', '', '', '', 3, 'de', '2015-05-26 13:23:28', '2015-05-26 13:23:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('f620147d-f549-4210-bbb2-2c68d8b6b395', 'cef95b30-5c74-4076-b7c9-c4a049802694', NULL, NULL, NULL, '13.764605', '51.0578011', 'Florian-Geyer-Straße 48', 'dis25', '01307', 'Dresden', 0, 'Freitags 16:00 bis 18:00 Uhr', 0, '5564d6be0e1a6', 'Beratungsstelle', 'im Keller der Gemeinschaftsunterkunft', '', '', '', 3, 'de', '2015-05-26 22:25:34', '2015-05-26 22:25:34', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `ddfa_main_domain_model_location`
--
ALTER TABLE `ddfa_main_domain_model_location`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD KEY `IDX_942C6305AB7D9771` (`initiative_id`), ADD KEY `IDX_942C630557875C8A` (`market_entry_id`), ADD KEY `IDX_942C630571F7E88B` (`event_id`), ADD KEY `IDX_942C630512469DE2` (`category_id`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ddfa_main_domain_model_location`
--
ALTER TABLE `ddfa_main_domain_model_location`
ADD CONSTRAINT `FK_942C630512469DE2` FOREIGN KEY (`category_id`) REFERENCES `ddfa_main_domain_model_category` (`persistence_object_identifier`),
ADD CONSTRAINT `FK_942C630557875C8A` FOREIGN KEY (`market_entry_id`) REFERENCES `ddfa_main_domain_model_marketentry` (`persistence_object_identifier`),
ADD CONSTRAINT `FK_942C630571F7E88B` FOREIGN KEY (`event_id`) REFERENCES `ddfa_main_domain_model_event` (`persistence_object_identifier`),
ADD CONSTRAINT `FK_942C6305AB7D9771` FOREIGN KEY (`initiative_id`) REFERENCES `ddfa_main_domain_model_initiative` (`persistence_object_identifier`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
