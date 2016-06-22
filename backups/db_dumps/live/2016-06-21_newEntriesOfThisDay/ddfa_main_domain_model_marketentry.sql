-- phpMyAdmin SQL Dump
-- version 4.0.10.15
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 22. Jun 2016 um 01:28
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
  PRIMARY KEY (`persistence_object_identifier`),
  UNIQUE KEY `UNIQ_23C7669D47A46B0A` (`persistence_object_identifier`),
  KEY `IDX_23C7669D25FBE593` (`parent_entry_id`),
  KEY `IDX_23C7669D12469DE2` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_marketentry`
--

INSERT INTO `ddfa_main_domain_model_marketentry` (`persistence_object_identifier`, `parent_entry_id`, `category_id`, `offer`, `datefrom`, `dateto`, `timefrom`, `timeto`, `area`, `name`, `description`, `mail`, `web`, `facebook`, `phone`, `subcategory`, `type`, `speakerpublic`, `speakerprivate`, `image`, `imagetype`, `supportwanted`, `forchildren`, `spokenlanguages`, `published`, `internalcomment`, `entry_id`, `locale`, `created`, `updated`) VALUES
('d32b7413-a98c-46be-9ff3-9559f67098c3', NULL, '07f88130-7d98-4a20-bbb8-d0d98f55c553', NULL, '', '', '', '', 'dresden', 'Initiative zur Unterstützung geflüchteter Frauen in Dresden - ABC-Tische', 'Die Initiative zur Unterstützung geflüchteter Frauen bietet  samstags (15:00-17:00 Uhr) und dienstags (16:00-17:30 Uhr) ABC-Tische ausschließlich von und für Frauen in der Erstaufnahmeeinrichtung Hamburger Straße an. Freiwillige Helferinnen unterstützen die geflüchteten Frauen dort beim Erlernen der deutschen Sprache.  \r\n\r\nHelferinnen, die entweder direkt beim Deutschunterricht mitmachen, als Kinderbetreuerinnen helfen und/ oder im Organisationsteam mitarbeiten  möchten, sind herzlich willkommen.   \r\n\r\nKontakt: \r\nKonstanze Rehle \r\nEmail: IUGF-Dresden@web.de \r\nwww.facebook.com/iugfd ', 'IUGF-Dresden@web.de', '', '', '', 'meeting-place', 0, 'Konstanze Rehle ', '', '', '', 1, 1, '', 1, NULL, '57699d92cfcf2', 'de', '2016-06-21 22:03:30', '2016-06-21 22:08:48'),
('6ae9f10c-27a8-4c87-9cac-c15f851c8649', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, '2016-11-30', '', '20:00', '', 'dresden', 'Gespräch „Vom Brandenburger Tor bis Buchenwald – subversive Entwürfe von Hoheisel und Bachler“', 'Gespräch:\r\n„Vom Brandenburger Tor bis Buchenwald – subversive Entwürfe von Hoheisel und Bachler“ \r\n\r\nAnke Binnwerg mit Thomas Bachler und Horst Hoheisel\r\n\r\nVeranstalter:\r\nDenk Mal Fort! e.V. – Die Erinnerungswerkstatt Dresden', 'h.hase@denkmalfort.de', 'http://www.denkmalfort.de', '', '+49-163-88 29 954', 'political-education', 2, '', '', '', '', 0, 0, '', 1, NULL, '57699830ebc86', 'de', '2016-06-21 21:40:32', '2016-06-21 21:40:32'),
('a7f138cc-d45b-46e2-99f6-5fb4224136cb', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, '2016-11-02', '', '20:00', '', 'dresden', 'Gespräch „Ehrenhain für die Regimenter der Dresdner Garnison auf dem Nordfriedhof in Dresden – Kriegerdenkmale des Ersten Weltkrieges. Historischer Ballast oder notwendige Erinnerungsorte?“ ', 'Gespräch:\r\n„Ehrenhain für die Regimenter der Dresdner Garnison auf dem Nordfriedhof in Dresden – Kriegerdenkmale des Ersten Weltkrieges. Historischer Ballast oder notwendige Erinnerungsorte?“ \r\n\r\nHans-Joachim Jäger mit Holger Hase und Justus H. Ulbricht\r\n\r\nVeranstalter:\r\nDenk Mal Fort! e.V. – Die Erinnerungswerkstatt Dresden', 'h.hase@denkmalfort.de', 'http://www.denkmalfort.de', '', '+49-163-88 29 954', 'political-education', 2, '', '', '', '', 0, 0, '', 1, NULL, '57699789e3a7e', 'de', '2016-06-21 21:37:45', '2016-06-21 21:37:45'),
('3df1b1a2-2ed6-4089-bddb-9fb60e0f4e8d', NULL, 'd29bbe86-ecd6-42df-8054-70a90ec7b535', NULL, '2016-10-19', '', '20:00', '', 'dresden', 'Gespräch „Sowjetischer Garnisonfriedhof in Dresden – Vergessene Opfer? Dresden und die Toten des Kalten Krieges“', 'Gespräch:\r\n„Sowjetischer Garnisonfriedhof in Dresden – Vergessene Opfer? Dresden und die Toten des Kalten Krieges“ \r\n\r\nKlaus-Dieter Müller mit Gunther Butzmann und Lutz Prieß\r\n\r\nVeranstalter:\r\nDenk Mal Fort! e.V. – Die Erinnerungswerkstatt Dresden', 'h.hase@denkmalfort.de', 'http://www.denkmalfort.de', '', '+49-163-88 29 954', 'political-education', 2, '', '', '', '', 0, 0, '', 1, NULL, '576996ef5f17c', 'de', '2016-06-21 21:35:11', '2016-06-21 21:35:29'),
('a94da8c4-437f-4502-b6eb-47eb3ab84c1c', NULL, 'df402493-f467-4472-8b98-9038d2ac967e', NULL, NULL, NULL, NULL, NULL, NULL, 'Bildungsberatung Dresden', 'Bildungsberatung - In unseren Beratungsstellen gibt es kostenfreie und unabhängige Beratung zu allen Fragen rund um Bildung, Beruf und Beschäftigung.', 'beratung@bildungsbahnen.de', 'www.bildungsberatung-dresden.de ', 'https://www.facebook.com/bildungsberatung.dresden', '03514888484', NULL, 0, '', NULL, NULL, NULL, 0, 0, 'de,en', 0, NULL, '57695eabd57e2', 'de', '2016-06-21 17:35:07', '2016-06-21 17:35:07'),
('5b68c684-03be-4a92-94d2-6655d425701d', '2c8b4eb1-7bbc-41bb-8abb-9ae27081c505', '07f88130-7d98-4a20-bbb8-d0d98f55c553', NULL, '', '', '', '', 'dresden', 'Frauencafé im Montagscafé', 'Das Montagscafé des Staatsschauspiel Dresden öffnet jeden Montag von 15.00-17.00 Uhr seine Räume als Treffpunkt geflüchteter und einheimischer Frauen. Hier kann man gemeinsam tanzen, basteln, singen, Deutsch lernen oder einfach nur bei einem Tee zusammensitzen. Immer wieder machen wir auch Ausflüge (z. B. in Museen, zu Workshops o. ä.) Das aktuelle Programm ist auf unserer Internetseite oder bei Facebook einsehbar.\r\n\r\nDas Frauencafé ist wöchentlich und für alle Frauen geöffnet! Wir freuen uns auf Sie und Euch!', 'montagscafe@staatsschauspiel-dresden.de', 'http://www.staatsschauspiel-dresden.de/home/montagscafe/', 'http://www.facebook.com/montagscafedresden/', '03514913617', '', 0, 'David Lenard', '', '', '', 0, 0, '', 1, NULL, '5767c9a05302c', 'de', '2016-06-20 12:46:56', '2016-06-20 20:52:15');

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ddfa_main_domain_model_marketentry`
--
ALTER TABLE `ddfa_main_domain_model_marketentry`
  ADD CONSTRAINT `FK_23C7669D12469DE2` FOREIGN KEY (`category_id`) REFERENCES `ddfa_main_domain_model_category` (`persistence_object_identifier`),
  ADD CONSTRAINT `FK_23C7669D25FBE593` FOREIGN KEY (`parent_entry_id`) REFERENCES `ddfa_main_domain_model_marketentry` (`persistence_object_identifier`);
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
