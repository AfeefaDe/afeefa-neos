-- phpMyAdmin SQL Dump
-- version 4.2.13.2
-- http://www.phpmyadmin.net
--
-- Host: db1118.mydbserver.com
-- Erstellungszeit: 15. Jun 2015 um 11:51
-- Server Version: 5.5.28
-- PHP-Version: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `usr_p256313_2`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_marketentry`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_marketentry` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `datefrom` datetime DEFAULT NULL,
  `dateto` datetime DEFAULT NULL,
  `dateday` int(11) DEFAULT NULL,
  `dateperiodic` int(11) DEFAULT NULL,
  `entry_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8_unicode_ci,
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
  `updated` datetime NOT NULL,
  `offer` tinyint(1) NOT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `category_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_marketentry`
--

INSERT INTO `ddfa_main_domain_model_marketentry` (`persistence_object_identifier`, `datefrom`, `dateto`, `dateday`, `dateperiodic`, `entry_id`, `name`, `description`, `mail`, `web`, `facebook`, `phone`, `rating`, `locale`, `speakerpublic`, `speakerprivate`, `image`, `imagetype`, `supportwanted`, `spokenlanguages`, `created`, `updated`, `offer`, `published`, `category_id`) VALUES
('48e9a54f-41a5-4b9d-9e28-8a540b9cb508', NULL, NULL, NULL, 1, '557b43a370933', 'Deutschkurs Versöhnungskirche', 'Im Gemeindehaus der Versöhnungskirche finden durch ehrenamtliche Helfer der Kirchgemeinde Dresden-Blasewitz und weiterer Gemeinden regelmäßig Deutschkurse statt. Die Anzahl der Helfer entspricht dabei meist denen der Schüler, sodass im Zweiergespräch intensiv deutsch gelernt werden kann.', 'schoenhoeferAM@gmx.de', 'http://kirchgemeinde-dresden-blasewitz.de', '', '0351 50196590', 3, 'de', 'Frau Schönhöfer', '', '', 'logo', NULL, 'Deutsch', '2015-06-12 22:40:03', '2015-06-13 23:05:56', 1, 1, '5dddf63d-ccf6-44e2-8daf-81bb44507fdd'),
('acefdb54-a068-484f-84f7-e2fe9ba510e0', NULL, NULL, 6, 0, '55786558b9c07', 'KulturLoge Dresden', 'Die KulturLoge Dresden vermittelt kostenlos Restkarten der meisten Dresdner Kulturinstitutionen und der vier größten Sportvereine an sozial schwache Menschen. Der Schwerpunkt der Arbeit 2015 liegt in der Förderung der Teilhabe von Asylsuchenden und Flüchtlingen. ', 'info@kulturloge-dresden.de', 'http://www.kulturloge-dresden.de', 'http://www.facebook.com/kulturloge-dresden', '03513158119', 3, 'de', 'Heidrun Frank', '', '', 'logo', NULL, 'Deutsch, Englisch', '2015-06-10 18:27:04', '2015-06-13 20:29:09', 1, 1, 'a657ca53-59eb-41ad-b2eb-75d91dd6e6f5'),
('c01c93f8-0d97-4143-9e98-e9120042202e', NULL, NULL, NULL, NULL, '557c9a60744aa', 'Begegnungsstelle Asyl Versöhnungskirche', 'Gesprächsangebot an Asylbewerber, Unterstützung und Begleitung bei aktuellen Problemen\r\n\r\nEhrenamtliche Helfer der Kirchgemeinde Dresden-Blasewitz und weiterer Gemeinden bieten hier die Möglichkeit an, bei Kaffee und Kuchen miteinander ins Gespräch zu kommen, zuzuhören und bei aktuellen Problemen Hilfestellung zu geben.', 'struempfel.johannes@gmail.com', 'http://kirchgemeinde-dresden-blasewitz.de', '', ' 0160 97886255', 3, 'de', 'Herr Strümpfel', '', '', 'logo', NULL, 'Deutsch, Englisch', '2015-06-13 23:02:24', '2015-06-13 23:05:06', 1, 1, '07f88130-7d98-4a20-bbb8-d0d98f55c553'),
('ceb2e716-846a-44e6-abd1-0d6f97a94a44', NULL, NULL, NULL, NULL, '55780217dc8fa', 'Rugby Cricket Dresden e.V.', 'Rugby Cricket Dresden e.V. - anerkannter Integrationsstützpunkt des DOSB; Rugby, Cricket, Hurling und Aussie Rulez; gemeinsames Training (Trainingszeiten siehe Websites): www.dresdenrugby.de /\r\nhttp://rcd.play-cricket.com/website/web_pages/157490 /\r\nhttp://dresdenhurling.wix.com/ddgaa#!about/aboutPage / http://dd-wolves.jimdo.com/', 'dresdenrugby@gmail.com', 'http://www.dresdenrugby.de/', 'https://www.facebook.com/rugby.dresden', '', 3, 'de', 'Frank Bösenberg', '', '', 'logo', NULL, 'Deutsch, Englisch, Hindi (Cricket)', '2015-06-10 11:23:35', '2015-06-10 11:23:35', 1, 1, 'a657ca53-59eb-41ad-b2eb-75d91dd6e6f5'),
('d39d417b-3623-4de0-98c2-c823fc6f6711', NULL, NULL, NULL, NULL, '5577140dbbe2d', 'Bikes for Refugees', 'It is tremendously practical to have a bike in Dresden. Refugees, who arrived in Dresden, could surely use bikes. We are asking people to donate bikes which they do not need anymore. These donated bikes are often older or broken ones, which we need to repair, before they can be used. Therefor we need time and help. For that we meet at 20 of June (Saturday) between 12 p.m. and 6 p.m. at the Laborschule (lab school) Dresden in Gorbitz.\r\n\r\nThe event is for free. We can show people how to ride a bike. Children are welcome, play equipment at the area of the school is available. We provide food for everyone and we are glad if someone brings food in addition.\r\n\r\nWhen: 20th June, 12 p.m.- 6 p.m.\r\nWhere: Laborschule (labschool), Espenstrasse 3, 01169 Dresden (tram line 2 and 7 stop Kirschenstraße)(watch out for signs "Laborschule")', 'bikes4refugees@notraces.net', 'http://bikes.fueralle.org', '', '0351-2644645', 3, 'de', 'Carsten Ungewitter', '', '', 'logo', NULL, 'Deutsch, Englisch', '2015-06-09 18:27:57', '2015-06-13 20:44:29', 1, 1, '56035892-7f04-41f9-b91f-75a9ef4c4f69'),
('e388e31c-bea9-49e9-9bc6-51d89e6d951f', NULL, NULL, 6, 1, '5575958554574', 'German lessons in Freiberg', 'There are german lessons for beginners every monday and wednesday in the Chemnitzer Str. 50 (basement) starting 2:00 pm. You don''t need to apply, just join in.', 'elstnerv@googlemail.com', '', '', '', 3, 'de', 'Jacqueline Elstner', '', '', 'logo', NULL, 'English, German', '2015-06-08 15:15:49', '2015-06-09 17:40:40', 1, 1, '5dddf63d-ccf6-44e2-8daf-81bb44507fdd'),
('ed6eaacb-8dcc-42c9-932d-53b53352257b', '1854-01-01 00:00:00', '1854-01-01 00:00:00', 6, 999, '55775d62ca323', 'Akifra e.V. ', 'Vermittlung von Tandem-Patenschaften für Geflüchtete', 'akifra.dresden@gmail.com', 'http://akifra.org/', '', '', NULL, 'de', '', NULL, NULL, NULL, NULL, 'Deutsch, Englisch, Französisch ', '2015-06-09 23:40:50', '2015-06-09 23:40:50', 1, 1, '07f88130-7d98-4a20-bbb8-d0d98f55c553'),
('f2017b2f-d0d7-4475-9597-07b90628a210', NULL, NULL, NULL, NULL, '557b5473952fd', 'Syria: Beyond the Frame', 'What is happening now in Syria? What is the genesis of this cruel domestic war? What can I do to help Syrian? If you want to find the answer of any of this question, next Road me event is for you.\r\n\r\nOn 17th of June in frames of Road Me project we won’t show any travel pictures, instead we will tell you a story of filmmaker Tamer Alawam and his photographer Claudia Ruff, who wanted to show us the Syrian civil war from the inside. It was supposed to become a film about love, hope and respect for the people, who have, for four years now, been confronted with the realities of war. But the vision the two of them shared was destroyed in a grenade attack on September 9th 2012, during which Tamer lost his life. All that is left, is Tamer''s perspective in form of digital film footage on a hard drive which Claudia brought back to Germany … Now two filmmakers, our guests and Tamer´s friends are trying to answer some questions connected with Tamer`s decision to leave Germany and go to the war. They will present a project of documentary movie ‘Beyond the frame’ about Tamer’s and his determination to act…\r\n\r\nBeside presentation of movie concept we will have discussion about background of the syrian conflict. Two former members of the syrian opposition will give us first hand information about the civil war in Syria.\r\n\r\nIf you want to get more information or support the project click:\r\n\r\nhttps://www.indiegogo.com/projects/beyond-the-frame-zwischen-berlin-und-aleppo#/story', 'uwe.nadler@ravir.de', 'http://www.ravir.de/projekte/beyond_the_frame/', 'https://www.facebook.com/pages/Beyond-the-Frame/1445381635777224?ref=hl', '', 3, 'de', 'Uwe Nadler', '', '', 'logo', NULL, 'Deutsch, Englisch, Arabisch', '2015-06-12 23:51:47', '2015-06-13 23:26:32', 1, 1, '21484033-ae7d-4dbe-9a75-f073f7216a3e');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `ddfa_main_domain_model_marketentry`
--
ALTER TABLE `ddfa_main_domain_model_marketentry`
 ADD PRIMARY KEY (`persistence_object_identifier`), ADD KEY `IDX_23C7669D12469DE2` (`category_id`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ddfa_main_domain_model_marketentry`
--
ALTER TABLE `ddfa_main_domain_model_marketentry`
ADD CONSTRAINT `FK_23C7669D12469DE2` FOREIGN KEY (`category_id`) REFERENCES `ddfa_main_domain_model_category` (`persistence_object_identifier`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
