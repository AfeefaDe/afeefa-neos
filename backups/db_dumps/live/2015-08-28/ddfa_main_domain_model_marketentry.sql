-- phpMyAdmin SQL Dump
-- version 4.2.13.2
-- http://www.phpmyadmin.net
--
-- Host: db1118.mydbserver.com
-- Erstellungszeit: 28. Aug 2015 um 10:58
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
('1c9e3098-4720-45d1-9210-7cd1a3ef75e8', NULL, NULL, NULL, 3, '557eadc4701fd', 'Volkshochschule Dresden e.V.', 'Wir bieten: kostenfreie Einstufungstests, Unterstützung bei der Beantragung der Berechtigung zur Teilnahme am Integrationskurs, monatliche Starts neuer Deutschkurse (tagsüber, abends), Deutschprüfungen auf allen Niveaustufen, monatliche Termine für Einbürgerungstests mit entsprechenden Vorbereitungskursen\r\n\r\nDie Volkshochschule Dresden ist zugelassener Träger des Bundesamtes für Migration und Flüchtlinge für Integrationskurse.\r\n', 'ulrike.struck@vhs-dresden.de', 'htttp://www.vhs-dresden.de', 'http://www.facebook.com/Volkshochschule.Dresden', '0351 254400', 3, 'de', 'Ulrike Struck', '', '', 'logo', NULL, 'Deutsch, Englisch, Französisch, Russisch, Spanisch', '2015-06-15 12:49:40', '2015-06-16 15:03:49', 1, 1, '5dddf63d-ccf6-44e2-8daf-81bb44507fdd'),
('25f59b31-3778-4bf6-a667-ddab7c394c48', '2015-06-23 00:00:00', '2015-12-22 00:00:00', NULL, 1, '5587ac6088922', 'SprachTreff für Asylsuchende', 'Jeden Dienstag von 16 bis 18 Uhr, Kirchgemeinde St. Christphorus, Hermann-Seidel-Straße 3 in 01279 Laubegast. Bei Kaffee und Tee, beim gemeinsamen Gespräch, beim Kochen, Spielen, Spazieren gehen begegnen sich Laubegaster Bürger und Asylsuchende aus ganz Dresden. Man lernt sich kennen, die Asylsuchenden können deutsch sprechen üben und Kontakte knüpfen.', 'vitae@cvjm-dresden.de', 'http://www.laubegast-ist-bunt.d', 'https://www.facebook.com/laubegastistbunt', '0351-25300190', NULL, 'de', 'Claus Dethleff', NULL, NULL, NULL, NULL, 'Deutsch, Englisch', '2015-06-22 08:34:08', '2015-06-22 08:34:08', 1, 1, 'adfb2457-819c-4574-ace1-56f5b38d8f96'),
('4477fd3c-ffba-49cd-aa4b-a562c9d9ef3c', NULL, NULL, NULL, NULL, '55d7918e5ffab', 'Offenes Werkstattzentrum #Rosenwerk', 'Das #Rosenwerk befindet sich in einem Gewerbegebiet nahe der Innenstadt. Eingebettet im Nirgendwo zwischen dem Löbtauer Heizkraftwerk, dem Hauptbahnhof und Dresden Mitte. Die offene Produktionsinfrastruktur der zwei Werkstattprojekte Werk.Stadt.Laden. und FabLabDD stellt Geräte und Verfahren, die über die Möglichkeiten des Einzelnen hinausgehen. Ihre Nutzung ist für alle möglich, von der Nachbarschaft  Hobbybastlern und Familien über zivilgesellschaftlichen Akteure, Kunst- und Kulturschaffende und natürlich auch für Menschen die hier Asyl suchen aber nicht nichts tun möchten!\n', 'vorstand@konglomerat.org', 'http://www.rosenwerk.co', 'https://www.facebook.com/wsl21', '+491721407156', NULL, 'de', 'Matthias Röder', NULL, NULL, NULL, NULL, 'Deutsch, Englisch', '2015-08-21 23:01:02', '2015-08-21 23:01:02', 1, 0, 'd29bbe86-ecd6-42df-8054-70a90ec7b535'),
('48e9a54f-41a5-4b9d-9e28-8a540b9cb508', NULL, NULL, NULL, 1, '557b43a370933', 'Deutschkurs Versöhnungskirche', 'Im Gemeindehaus der Versöhnungskirche finden durch ehrenamtliche Helfer der Kirchgemeinde Dresden-Blasewitz und weiterer Gemeinden regelmäßig Deutschkurse statt. Die Anzahl der Helfer entspricht dabei meist denen der Schüler, sodass im Zweiergespräch intensiv deutsch gelernt werden kann.', 'schoenhoeferAM@gmx.de', 'http://kirchgemeinde-dresden-blasewitz.de', '', '0351 50196590', 3, 'de', 'Frau Schönhöfer', '', '', 'logo', NULL, 'Deutsch', '2015-06-12 22:40:03', '2015-06-13 23:05:56', 1, 1, '5dddf63d-ccf6-44e2-8daf-81bb44507fdd'),
('635f6c9d-a63b-4087-b4c6-e45b3329f2d1', NULL, NULL, NULL, NULL, '559252adbc796', 'Spendensammelstelle "Willkommen in Löbtau"', 'Im Hinterhaus der Emil-Überall Straße 6 werden jeden Dienstag und Freitag 17-18Uhr Spenden gesammelt und ausgegeben.', 'susanne1@pitzkorb.de', 'http://www.willkommen-in-loebtau.de', '', '', 3, 'de', 'Susanne Pitz', '', '', 'logo', NULL, '', '2015-06-30 10:26:21', '2015-08-19 22:03:31', 1, 1, '56035892-7f04-41f9-b91f-75a9ef4c4f69'),
('6a0ef692-f9ca-4921-be0d-2c00248f9b02', NULL, NULL, NULL, NULL, '558a65e88d39a', 'Euro-Schulen Dresden - Deutschkurse', 'ESF-finanzierte Deutschkurse für Asylbewerber ab der Sprachniveaustufe A1, Anmeldung innerhalb der Sprechzeiten (montags und dienstags, jeweils 8:30-12:30Uhr und 14:30-16Uhr), Einstufungstests und Kursbeginne fortlaufend', 'dresden@eso.de', 'http://www.eso.de/dresden/', '', '0351 - 4845120', 3, 'de', 'Malgorzata Büttner', '', '', 'logo', NULL, 'Deutsch/ Englisch/ Russisch', '2015-06-24 10:10:16', '2015-08-25 10:04:26', 1, 1, '12914a3d-0cb5-4646-be56-3f671d737977'),
('7fe2a85e-ddb7-4bbb-bab6-0ed8b6cbcdcb', NULL, NULL, NULL, NULL, '559f7239da3fb', 'Willkommensbündnis Dippoldiswalde', 'Wir sind ein Bündnis, welches Unterstützung für Asylbewerber aus unserer Region anbietet und mit Ihnen gemeinsam für ein tolerantes Miteinander einstehen und werben.', 'willkommensbuendnis.dw@gmail.com', '', 'https://www.facebook.com/pages/Dippser-mit-Herz-Willkommensb%C3%BCndnis-Dippoldiswalde/755095361265150?fref=ts', '', 3, 'de', 'Lis-Marie Leuteritz; Desireé Wagner', '', '', 'logo', NULL, 'Deutsch, Englisch', '2015-07-10 09:20:25', '2015-08-19 22:58:15', 1, 1, '12914a3d-0cb5-4646-be56-3f671d737977'),
('85aeb42d-cc88-4700-99cb-6e01bce5408e', NULL, NULL, NULL, NULL, '557f1574b3297', 'Einladungsamt Dresden', 'Das Einladungsamt vermittelt Einladungen zum Essen zwischen Dresdnern und Zugezogenen aus aller Welt. \nDresdner, die Lust auf interkulturelle Kontakte haben und jemandem das Ankommen in der Stadt erleichtern wollen und \nMigranten, die Lust haben, mit Menschen, die schon länger hier leben, gemeinsam zu essen, die Kultur kennen zu lernen und die Sprache zu üben, können sich über die Webseite anmelden. \nWir vermitteln das erste Treffen, dem gerne weitere folgen können. ', 'einladung-dresden@web.de', 'http:/www.einladungsamt-dresden.jimdo.com', 'http:/www.facebook.com/einladungsamtdresden', '', NULL, 'de', '', NULL, NULL, NULL, NULL, '', '2015-06-15 20:12:04', '2015-06-15 20:12:04', 1, 1, 'adfb2457-819c-4574-ace1-56f5b38d8f96'),
('877524fe-691e-4093-bc11-40cec95fe936', NULL, NULL, NULL, NULL, '55ddf8a38ae25', 'Bouldern Climbing', 'Bouldern is a kind of climbing. Bouldern means climbing along a wall	outside or inside a special house or room. It is a sport for people who want to push themselves to their limits or beyond. It just means having fun with other people. You don''t need special equipment, just climbing shoes to help secure footholds. If you are interested in trying that, you are welcome doing it with us.', 's.foerster79@gmail.com', '', 'http://www.facebook.com/climbingforall.dresden', '', NULL, 'de', 'S.Foerster', NULL, NULL, NULL, NULL, 'english', '2015-08-26 19:34:27', '2015-08-26 19:34:27', 1, 0, 'adfb2457-819c-4574-ace1-56f5b38d8f96'),
('9d6ad4a2-efb9-4c72-a658-5a0a74ba21f2', NULL, NULL, NULL, NULL, '55dc8100820a7', 'Kinder- und Jugendhaus "Parkhaus" Klotzsche', 'Öffnungszeiten:\nMo. - Do. 13.00 - 18:30 Uhr\nFr. 13.00 - 16.00 Uhr', 'kjhparkhaus@gmail.com', 'http://www.parkhaus-klotzsche.de', 'https://www.facebook.com/parkhaus.klotzsche', '0351-8904949', NULL, 'de', 'Claudia Peter, Martin Kretschmar', NULL, NULL, NULL, NULL, 'Deustch, Englisch', '2015-08-25 16:51:44', '2015-08-25 16:51:44', 1, 0, 'adfb2457-819c-4574-ace1-56f5b38d8f96'),
('acefdb54-a068-484f-84f7-e2fe9ba510e0', NULL, NULL, 6, 0, '55786558b9c07', 'KulturLoge Dresden', 'Die KulturLoge Dresden vermittelt kostenlos Restkarten der meisten Dresdner Kulturinstitutionen und der vier größten Sportvereine an sozial schwache Menschen. Der Schwerpunkt der Arbeit 2015 liegt in der Förderung der Teilhabe von Asylsuchenden und Flüchtlingen. ', 'info@kulturloge-dresden.de', 'http://www.kulturloge-dresden.de', 'http://www.facebook.com/kulturloge-dresden', '03513158119', 3, 'de', 'Heidrun Frank', '', '', 'logo', NULL, 'Deutsch, Englisch', '2015-06-10 18:27:04', '2015-06-13 20:29:09', 1, 1, 'a657ca53-59eb-41ad-b2eb-75d91dd6e6f5'),
('bff930d3-63bd-4bd8-8fea-a79bc61162c0', NULL, NULL, NULL, NULL, '559114b6692f9', 'Fußballtreff "Willkommen in Löbtau"', 'Jeden Freitag um 15.00 Uhr treffen sich Mitglieder des Netzwerkes "Willkommen in Löbtau" mit Geflüchteten zum Fußballspielen aud dem Kunstrasenplatz in der Hebbelstraße 21. Kommt gerne vorbei!', 'k.ehelebe@gmail.com', 'http://www.willkommen-in-loebtau.de', '', '016097693884', 3, 'de', 'Konrad Ehelebe', '', '', 'logo', NULL, '', '2015-06-29 11:49:42', '2015-08-19 23:02:51', 1, 1, 'a657ca53-59eb-41ad-b2eb-75d91dd6e6f5'),
('c01c93f8-0d97-4143-9e98-e9120042202e', NULL, NULL, NULL, NULL, '557c9a60744aa', 'Begegnungsstelle Asyl Versöhnungskirche', 'Gesprächsangebot an Asylbewerber, Unterstützung und Begleitung bei aktuellen Problemen\r\n\r\nEhrenamtliche Helfer der Kirchgemeinde Dresden-Blasewitz und weiterer Gemeinden bieten hier die Möglichkeit an, bei Kaffee und Kuchen miteinander ins Gespräch zu kommen, zuzuhören und bei aktuellen Problemen Hilfestellung zu geben.', 'struempfel.johannes@gmail.com', 'http://kirchgemeinde-dresden-blasewitz.de', '', ' 0160 97886255', 3, 'de', 'Herr Strümpfel', '', '', 'logo', NULL, 'Deutsch, Englisch', '2015-06-13 23:02:24', '2015-06-13 23:05:06', 1, 1, '07f88130-7d98-4a20-bbb8-d0d98f55c553'),
('c4c842e6-0961-4395-a9cc-4fe58ea246ce', NULL, NULL, NULL, 1, '5587ab834bbd4', 'Deutschkurse für Asylsuchende', 'Deutsch für Anfänger: jeden Montag von 10:30 - 12:00 Uhr sowie jeden Mittwoch von 19:00 - 20:30 Uhr im Kinder- und Jugendhaus Chilli, Österreicher Straße 54 in Laubegast (Endhaltestelle der Linie 4). Anmeldung nicht erforderlich.', 'vitae@cvjm-dresden.de', 'http://www.laubegast-ist-bunt.de', 'https://www.facebook.com/laubegastistbunt', '0351-25300190', 3, 'de', 'Claus Dethleff', '', '', 'logo', NULL, 'Deutsch, Englisch', '2015-06-22 08:30:27', '2015-08-19 21:37:54', 1, 1, '5dddf63d-ccf6-44e2-8daf-81bb44507fdd'),
('ceb2e716-846a-44e6-abd1-0d6f97a94a44', NULL, NULL, NULL, NULL, '55780217dc8fa', 'Rugby Cricket Dresden e.V.', 'Rugby Cricket Dresden e.V. - anerkannter Integrationsstützpunkt des DOSB; Rugby, Cricket, Hurling und Aussie Rulez; gemeinsames Training (Trainingszeiten siehe Websites): www.dresdenrugby.de /\r\nhttp://rcd.play-cricket.com/website/web_pages/157490 /\r\nhttp://dresdenhurling.wix.com/ddgaa#!about/aboutPage / http://dd-wolves.jimdo.com/', 'dresdenrugby@gmail.com', 'http://www.dresdenrugby.de/', 'https://www.facebook.com/rugby.dresden', '', 3, 'de', 'Frank Bösenberg', '', '', 'logo', NULL, 'Deutsch, Englisch, Hindi (Cricket)', '2015-06-10 11:23:35', '2015-06-10 11:23:35', 1, 1, 'a657ca53-59eb-41ad-b2eb-75d91dd6e6f5'),
('d04bf794-83fb-4c11-b13f-35a98fd4938a', NULL, NULL, NULL, NULL, '557f33bb2f536', 'BRN Sonntagsfrühstück', '', '', 'http://einladungsamt-dresden.jimdo.com/', 'https://www.facebook.com/events/484354121715214/', '', 3, 'de', 'Einladungsamt Dresden', '', '', 'logo', NULL, 'viele', '2015-06-15 22:21:15', '2015-06-15 22:26:40', 1, 1, '07f88130-7d98-4a20-bbb8-d0d98f55c553'),
('d187634e-68e1-405b-8754-4ab41fe0c6c4', NULL, NULL, NULL, NULL, '558a6c95e9092', 'Jugendhaus Eule', 'Offener Jugendtreff des Deutschen Kinderschutzbund, Ortsverband Dresden e.V.\n\nMo 15 - 18 Uhr\nDi 16 - 20 Uhr\nMi 15 - 20 Uhr\nDo 16 - 20 Uhr\nFr 16 - 20 Uhr\n\nBesucht uns zum Billard-Spielen, Musik-Hören und -Machen, zum gemeinsamen Kochen und Essen ...\n\nDas Team des Jugendhauses steht euch mit Zeit, Wissen und Kontakten zur Verfügung.', 'eule@kinderschutzbund-dresden.de', 'http://www.clubeule-dresden.de', 'https://www.facebook.com/pages/Jugendhaus-Eule/1867360306822866', '0351/4569156', NULL, 'de', 'Manuela Kunz', NULL, NULL, NULL, NULL, 'Deutsch, Englisch', '2015-06-24 10:38:45', '2015-06-24 10:38:45', 1, 0, 'adfb2457-819c-4574-ace1-56f5b38d8f96'),
('d39d417b-3623-4de0-98c2-c823fc6f6711', NULL, NULL, NULL, NULL, '5577140dbbe2d', 'Bikes for Refugees', 'It is tremendously practical to have a bike in Dresden. Refugees, who arrived in Dresden, could surely use bikes. We are asking people to donate bikes which they do not need anymore. These donated bikes are often older or broken ones, which we need to repair, before they can be used. Therefor we need time and help. For that we meet at 20 of June (Saturday) between 12 p.m. and 6 p.m. at the Laborschule (lab school) Dresden in Gorbitz.\r\n\r\nThe event is for free. We can show people how to ride a bike. Children are welcome, play equipment at the area of the school is available. We provide food for everyone and we are glad if someone brings food in addition.\r\n\r\nWhen: 20th June, 12 p.m.- 6 p.m.\r\nWhere: Laborschule (labschool), Espenstrasse 3, 01169 Dresden (tram line 2 and 7 stop Kirschenstraße)(watch out for signs "Laborschule")', 'bikes4refugees@notraces.net', 'http://bikes.fueralle.org', '', '0351-2644645', 3, 'de', 'Carsten Ungewitter', '', '', 'logo', NULL, 'Deutsch, Englisch', '2015-06-09 18:27:57', '2015-06-13 20:44:29', 1, 1, '56035892-7f04-41f9-b91f-75a9ef4c4f69'),
('dac41ae8-189f-4a7c-b15a-74fcbf392340', NULL, NULL, NULL, NULL, '558151dd7157f', 'Projekt "Flüchtlinge in unserer Stadt Dresden" Koordinierung ehrenamtlicher Hilfe in den Dresdner Kirchgemeinden (ÖIZ)', 'Das Ökumenische Informationszentrum (ÖIZ) ist ein gemeinnütziger Verein mit den Schwerpunkten Ökumene, Frieden, Umwelt, Entwicklungspolitik und Beratung von Migranten in Deutschland. \nDie Koordinierungsstelle "Flüchtlinge in unserer Stadt" unterstützt, begleitet und vernetzt kirchgemeindliche Initiativen in der Arbeit mit Asylsuchenden in Dresden.', 'ehrenamt-asyl@infozentrum-dresden.de', 'http://www.infozentrum-dresden.de', '', '0176-41828673', NULL, 'de', 'Michaela Schoffer', NULL, NULL, NULL, NULL, 'deutsch, englisch, russisch', '2015-06-17 12:54:21', '2015-06-17 12:54:21', 1, 0, '5cd18ce7-923d-47ff-af66-7f4286f420d0'),
('df9b60c0-5023-42e9-a7f7-80ca4864cc2b', NULL, NULL, NULL, NULL, '559e947365756', 'K²-Kulturkiste Pirna', 'Die Räume bieten Platz für kleinere Ausstellungen, Vorträge, Filmbesprechungen, Lesungen und Seminare. In einem weiteren Raum ist eine Bibliothek mit über 700 Büchern eingerichtet. Bei uns gibt es auch einen offenen PC-Arbeitsplatz, WLAN und diverse Informationsmaterialien.\r\n\r\nBei uns sollen sich Menschen wohl fühlen und frei von Diskriminierungen und Bedrohungen zusammen sein können. Lasst uns dies gemeinsam gestalten!', 'kulturkiste@akubiz.de', 'http://www.k2-kulturkiste.de', '', '', 3, 'de', '', '', '', 'logo', NULL, 'Deutsch, Englisch', '2015-07-09 17:34:11', '2015-07-22 18:20:50', 1, 1, '07f88130-7d98-4a20-bbb8-d0d98f55c553'),
('e388e31c-bea9-49e9-9bc6-51d89e6d951f', NULL, NULL, 6, 1, '5575958554574', 'German lessons in Freiberg', 'There are german lessons for beginners every monday and wednesday in the Chemnitzer Str. 50 (basement) starting 2:00 pm. You don''t need to apply, just join in.', 'elstnerv@googlemail.com', '', '', '', 3, 'de', 'Jacqueline Elstner', '', '', 'logo', NULL, 'English, German', '2015-06-08 15:15:49', '2015-08-19 20:53:26', 1, 1, '12914a3d-0cb5-4646-be56-3f671d737977'),
('ed6eaacb-8dcc-42c9-932d-53b53352257b', '1854-01-01 00:00:00', '1854-01-01 00:00:00', 6, 999, '55775d62ca323', 'Akifra e.V. ', 'Vermittlung von Tandem-Patenschaften für Geflüchtete', 'akifra.dresden@gmail.com', 'http://akifra.org/', '', '', NULL, 'de', '', NULL, NULL, NULL, NULL, 'Deutsch, Englisch, Französisch ', '2015-06-09 23:40:50', '2015-06-09 23:40:50', 1, 1, '07f88130-7d98-4a20-bbb8-d0d98f55c553'),
('f534ae8f-133e-42f8-a454-cc464093c1a3', NULL, NULL, NULL, 1, '55804e2f6230d', 'Streetwork-Büro', 'Wir (Alina, Sascha, Reiko) sind als Streetworker/Sozialarbeiter auf den Straßen im Ortsamt Blasewitz unterwegs. In unserem Büro am Stresemannplatz 9 haben wir jeden Mittwoch zwischen 16:00-19:00 Uhr offene Beratungszeit (und facebook-chat) für vorwiegend junge Menschen zwischen 14-27 Jahren.\nanonym & kostenlos & Schweigepflicht\n\n(Küche & Bad/Dusche vorhanden)/ Fremdsprachen: Englisch', 'sofa9@roter-baum.de', 'http://roter-baum.de/streetwork', 'https://www.facebook.com/sofaneun', '0351-3148945', NULL, 'de', 'Reiko Fitzke', NULL, NULL, NULL, NULL, 'deutsch, englisch', '2015-06-16 18:26:23', '2015-06-16 18:26:23', 1, 0, '12914a3d-0cb5-4646-be56-3f671d737977'),
('f70e0069-60a5-4eaa-8599-0ae8dc707dae', NULL, NULL, NULL, NULL, '557ff017052ef', 'Frauentreff', '', 'schulz.anna@posteo.de', '', '', '', 3, 'de', 'Anna', '', '', 'logo', NULL, 'deutsch, english, francais, espanol', '2015-06-16 11:44:55', '2015-06-22 19:38:28', 1, 1, 'a657ca53-59eb-41ad-b2eb-75d91dd6e6f5');

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
