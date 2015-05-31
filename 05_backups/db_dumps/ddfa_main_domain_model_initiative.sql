-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 30. Mai 2015 um 11:29
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
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_initiative`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_initiative` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `web` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_id` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `entry_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
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
-- Daten für Tabelle `ddfa_main_domain_model_initiative`
--

INSERT INTO `ddfa_main_domain_model_initiative` (`persistence_object_identifier`, `name`, `description`, `mail`, `web`, `phone`, `category_id`, `entry_id`, `rating`, `locale`, `created`, `updated`, `facebook`, `speakerpublic`, `speakerprivate`, `image`, `imagetype`, `supportwanted`, `spokenlanguages`) VALUES
('079ac720-80a7-4e83-89b1-820d5acd7a67', 'Laubegast ist Bunt', 'Das Bürgernetzwerk Laubegast ist Bunt bemüht sich bereits seit 2010 intensiv um Demokratieförderung, Weltoffenheit und Toleranz im Stadtteil. Seit 2014 ist die Flüchtlingshilfe einer der Arbeitsschwerpunkte.', 'vitae@cvjm-dresden.de', 'http://www.laubegast-ist-bunt.de', '0157-87828576', NULL, '5564813558490', 0, 'de', '2015-05-26 16:20:37', '2015-05-26 16:20:37', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('4ddfb4a5-8dd0-49fb-968f-c37084fb96d4', 'DAMF Deutschkurse für Asylsuchende', 'Deutschkurse von Alphabetisierung bis Ende A1 in 6 Niveaustufen für Asylsuchende, die kein oder noch kein Recht auf ESF- oder Integrationskurse haben; 60 ehrenamtliche Lehrer_innen unterrichten ca. 30 Kurse; 4x pro Jahr Einstufungstests und Neustarts von ', 'damf-dd@gmx.de', 'http://damf.blogsport.de', '', NULL, '55645729b6b22', 0, 'de', '2015-05-26 13:21:13', '2015-05-26 13:21:13', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('5e4807ec-48d5-cefd-62fc-d30d9b1998e2', 'Ökumenisches Informationszentrum e.V.', 'Bereitstellung eines bedarfsorientierten und individuellen Beratungsangebots für Migranten', 'cabana@infozentrum-dresden.de', 'http://www.infozentrum-dresden.de', '(0351) 492 33 67, (0351) 492 33 62', NULL, '', NULL, '', '0000-00-00 00:00:00', '2015-05-26 13:03:42', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('b517f0da-080d-4027-a7a5-0650580c9eeb', 'Bündnis Buntes Radebeul', 'Deutschkurse durch ehrenamtliche LehrerInnen für unterschiedliche Niveaustufen, einschl. Alphabetisierungskurs, Ziel A1/A2 als Basis für staatl. gef. Sprachkurse, vertiefende Übungsgruppen; Begleitung Asylsuchender zu Behörden, Ärzten, Arbeitgebern etc.; ', 'info@buntes-radebeul.de', 'http://www.buntes-radebeul.de', '0351-8383457, 0351-8301729, 0351-8306074', NULL, '556457e2c6e05', 0, 'de', '2015-05-26 13:24:18', '2015-05-26 13:24:18', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cef95b30-5c74-4076-b7c9-c4a049802694', 'Kontaktgruppe Asyl e.V.', 'Wir, die Mitglieder der Kontaktgruppe Asyl (e. V.; kurz KoGA), unterstützen Asylsuchende und Geflüchtete in Dresden beim Bewältigen der vielen bürokratischen Hürden und schaffen Kontakt- und Begegnungsmöglichkeiten. Mit Respekt knüpfen wir an die Stärken ', 'kontaktgruppe-asyl@web.de', 'http://kontaktgruppeasyl.blogsport.de/', '', NULL, '55645751d24dd', 0, 'de', '2015-05-26 13:21:53', '2015-05-26 13:21:53', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('d6c0ed14-1679-471b-b9d1-bab8653f1d2c', 'Willkommen in Löbtau', 'Das Netzwerk “Willkommen in Löbtau” möchte die geflüchteten Menschen dabei unterstützen, in unserem Stadtteil anzukommen. Mit unserer Arbeit wollen wir eine Brücke schlagen zwischen neuen und alteingesessenen LöbtauerInnen. Das Netzwerk besteht aus engagi', 'kontakt@willkommen-in-loebtau.de', 'http://www.willkommen-in-loebtau.de', '01577-5350441', NULL, '5564d806c5c39', NULL, 'de', '2015-05-26 22:31:02', '2015-05-26 22:31:02', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('ecdd98f9-4d08-46db-9b93-d18701fa8adc', 'Das interkulturelle Sofa', 'Gesprächsangebote, Vernetzung zwischen Asylbewerbern und Dresdnern, Integration durch gemeinsame Sofa-Touren, Veranstaltungen für Flüchtlinge, regelmäßige Treffen,  Öffentlichkeitsarbeit für Integration (mit dem Sofa), ehrenamtlich, Deutsch reden, interku', 'kultursofa.dresden@afropa.org', 'http://www.afropa.org', '017696910468', NULL, '5564d7cc6512a', NULL, 'de', '2015-05-26 22:30:04', '2015-05-26 22:30:04', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `ddfa_main_domain_model_initiative`
--
ALTER TABLE `ddfa_main_domain_model_initiative`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD KEY `IDX_F4B3E5EA12469DE2` (`category_id`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ddfa_main_domain_model_initiative`
--
ALTER TABLE `ddfa_main_domain_model_initiative`
ADD CONSTRAINT `FK_F4B3E5EA12469DE2` FOREIGN KEY (`category_id`) REFERENCES `ddfa_main_domain_model_category` (`persistence_object_identifier`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
