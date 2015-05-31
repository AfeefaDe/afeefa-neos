-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 31. Mai 2015 um 21:17
-- Server Version: 5.6.21
-- PHP-Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `afeefa_neos`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_initiative`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_initiative` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `entry_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `web` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `locale` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `speakerpublic` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `speakerprivate` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagetype` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supportwanted` tinyint(1) DEFAULT NULL,
  `spokenlanguages` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_initiative`
--

INSERT INTO `ddfa_main_domain_model_initiative` (`persistence_object_identifier`, `category_id`, `entry_id`, `name`, `description`, `mail`, `web`, `facebook`, `phone`, `rating`, `locale`, `speakerpublic`, `speakerprivate`, `image`, `imagetype`, `supportwanted`, `spokenlanguages`, `created`, `updated`) VALUES
('079ac720-80a7-4e83-89b1-820d5acd7a67', NULL, '5564813558490', 'Laubegast ist Bunt', 'Das Bürgernetzwerk Laubegast ist Bunt bemüht sich bereits seit 2010 intensiv um Demokratieförderung, Weltoffenheit und Toleranz im Stadtteil. Seit 2014 ist die Flüchtlingshilfe einer der Arbeitsschwerpunkte.', 'vitae@cvjm-dresden.de', 'http://www.laubegast-ist-bunt.de', NULL, '0157-87828576', 0, 'de', NULL, NULL, NULL, NULL, NULL, NULL, '2015-05-26 16:20:37', '2015-05-26 16:20:37'),
('0809a340-b53f-4598-a677-4875ed5314f6', NULL, '556b5ca38d2a5', '', 'تقديم الخدمات الموجهة نحو الطلب والاستشارات الفردية للمهاجرين', NULL, NULL, NULL, NULL, NULL, 'ar', NULL, NULL, NULL, NULL, NULL, NULL, '2015-05-31 21:12:10', '2015-05-31 21:14:22'),
('4ddfb4a5-8dd0-49fb-968f-c37084fb96d4', NULL, '55645729b6b22', 'DAMF Deutschkurse für Asylsuchende', 'Deutschkurse von Alphabetisierung bis Ende A1 in 6 Niveaustufen für Asylsuchende, die kein oder noch kein Recht auf ESF- oder Integrationskurse haben; 60 ehrenamtliche Lehrer_innen unterrichten ca. 30 Kurse; 4x pro Jahr Einstufungstests und Neustarts von ', 'damf-dd@gmx.de', 'http://damf.blogsport.de', NULL, '', 0, 'de', NULL, NULL, NULL, NULL, NULL, NULL, '2015-05-26 13:21:13', '2015-05-26 13:21:13'),
('5e4807ec-48d5-cefd-62fc-d30d9b1998e2', NULL, '', 'Ökumenisches Informationszentrum e.V.', 'Bereitstellung eines bedarfsorientierten und individuellen Beratungsangebots für Migranten', 'cabana@infozentrum-dresden.de', 'http://www.infozentrum-dresden.de', NULL, '(0351) 492 33 67, (0351) 492 33 62', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2015-05-26 13:03:42'),
('7754ad4e-fafb-410f-b2bf-bb0257abb5b9', '85be42e3-e597-44c1-b743-bb675169d94c', '556b5ca38d2a5', 'Ökumenisches Informationszentrum e.V.', 'Bereitstellung eines bedarfsorientierten und individuellen Beratungsangebots für Migranten', 'cabana@infozentrum-dresden.de', 'http://www.infozentrum-dresden.de', '', '(0351) 492 33 67, (0351) 492 33 62', 3, 'de', 'Grit Gabler, Annegret Krellner, In Am Sayad Mahmood', '', NULL, NULL, NULL, 'Deutsch, Englisch, Portugiesisch, Niederländisch, Russisch, Tschechisch, Arabisch, Persisch', '2015-05-31 21:10:27', '2015-05-31 21:10:27'),
('b517f0da-080d-4027-a7a5-0650580c9eeb', NULL, '556457e2c6e05', 'Bündnis Buntes Radebeul', 'Deutschkurse durch ehrenamtliche LehrerInnen für unterschiedliche Niveaustufen, einschl. Alphabetisierungskurs, Ziel A1/A2 als Basis für staatl. gef. Sprachkurse, vertiefende Übungsgruppen; Begleitung Asylsuchender zu Behörden, Ärzten, Arbeitgebern etc.; ', 'info@buntes-radebeul.de', 'http://www.buntes-radebeul.de', NULL, '0351-8383457, 0351-8301729, 0351-8306074', 0, 'de', NULL, NULL, NULL, NULL, NULL, NULL, '2015-05-26 13:24:18', '2015-05-26 13:24:18'),
('cef95b30-5c74-4076-b7c9-c4a049802694', NULL, '55645751d24dd', 'Kontaktgruppe Asyl e.V.', 'Wir, die Mitglieder der Kontaktgruppe Asyl (e. V.; kurz KoGA), unterstützen Asylsuchende und Geflüchtete in Dresden beim Bewältigen der vielen bürokratischen Hürden und schaffen Kontakt- und Begegnungsmöglichkeiten. Mit Respekt knüpfen wir an die Stärken ', 'kontaktgruppe-asyl@web.de', 'http://kontaktgruppeasyl.blogsport.de/', NULL, '', 0, 'de', NULL, NULL, NULL, NULL, NULL, NULL, '2015-05-26 13:21:53', '2015-05-26 13:21:53'),
('d6c0ed14-1679-471b-b9d1-bab8653f1d2c', NULL, '5564d806c5c39', 'Willkommen in Löbtau', 'Das Netzwerk “Willkommen in Löbtau” möchte die geflüchteten Menschen dabei unterstützen, in unserem Stadtteil anzukommen. Mit unserer Arbeit wollen wir eine Brücke schlagen zwischen neuen und alteingesessenen LöbtauerInnen. Das Netzwerk besteht aus engagi', 'kontakt@willkommen-in-loebtau.de', 'http://www.willkommen-in-loebtau.de', NULL, '01577-5350441', NULL, 'de', NULL, NULL, NULL, NULL, NULL, NULL, '2015-05-26 22:31:02', '2015-05-26 22:31:02'),
('ecdd98f9-4d08-46db-9b93-d18701fa8adc', NULL, '5564d7cc6512a', 'Das interkulturelle Sofa', 'Gesprächsangebote, Vernetzung zwischen Asylbewerbern und Dresdnern, Integration durch gemeinsame Sofa-Touren, Veranstaltungen für Flüchtlinge, regelmäßige Treffen,  Öffentlichkeitsarbeit für Integration (mit dem Sofa), ehrenamtlich, Deutsch reden, interku', 'kultursofa.dresden@afropa.org', 'http://www.afropa.org', NULL, '017696910468', NULL, 'de', NULL, NULL, NULL, NULL, NULL, NULL, '2015-05-26 22:30:04', '2015-05-26 22:30:04');

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
