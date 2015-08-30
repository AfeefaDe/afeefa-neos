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

--
-- Daten für Tabelle `ddfa_main_domain_model_feedback`
--

INSERT INTO `ddfa_main_domain_model_feedback` (`persistence_object_identifier`, `author`, `mail`, `message`, `metadata`, `created`, `updated`) VALUES
('2652ef4d-e027-4ca1-84ff-e47c217dfdb0', 'felix', 'felix@afeefa.de', 'metadaten LIVE test', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,true,true,true,false,true', '2015-07-15 11:09:56', '2015-07-15 11:09:56'),
('2a6bc5f1-20a9-45cb-ab97-676971244e53', 'winfried schenk', 'winfried.schenk@meindd.de', 'Liebes Afeefa-Team,\n\nich würde gern einen Bericht über das erste Echo auf die Einrichtung der Afeefa-Plattform schreiben.\n- wie wird sie besucht?\n- welche Sprache ist unter den Besuchern am meisten gefragt\n- gibt es Gesuche und Angebote? Wie werden neue Angebote/Gesuche gekennzeichnet? Könnte man die vielleicht wie aktuelle Kommentare einblenden?\n- Was sind eure nächsten Schritte?\n\nWer würde mit mir telefonieren?\n\nViele Grüße\n\nWinfried Schenk\nmenschen-in-dresden.de', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,true,true,false,true', '2015-06-22 11:18:18', '2015-06-22 11:18:18'),
('30e9675c-c5db-4b03-9b7c-e9ad23fc3c7f', 'Isabel Kasprowiak', 'isabelkasprowiak@gmail.com', 'Liebes Afeefa-Team, \n\ntolles Projekt. Schön, dass es Menschen gibt die handeln und nicht nur zuschauen. Ich bin in der Start Up Szene in Berlin und Köln unterwegs und wir haben auch bereits überlegt, was man im Digitalen Bereich tun könnten, um Asylbewerbern den Start hier in Deutschland zu vereinfachen. Wir haben auch an eine Plattform gedacht auf der Flüchtlinge und Engagierte nicht nur Informationen bekommen, sondern sich auch vernetzen können. Also eine Soziale Community. \nNun meine Frage an euch: habt ihr vor eure Plattform deutschlandweit anzubieten? Bisher seid ihr ''nur'' in Dresden aktiv, richtig? \n\nLiebe Grüße, Isabel ', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,false,false,true,false,true', '2015-08-18 11:19:03', '2015-08-18 11:19:03'),
('3104e672-636f-4e82-80e2-ecfe49164002', 'silke genuit', 'genuit@gmail.com', 'Hi Team - Love this app / website! Had the same idea for CH... would this app / website be able to be adjusted to CH / Zurich? Would be interested to learn more about it....!! Thanks & KR\nSilke', 'true,false,false,false,false,false,false,true,false,false,false,true,false,false,false,false,false,0,0,true,true,false,true', '2015-07-20 10:12:51', '2015-07-20 10:12:51'),
('48307d08-d377-4fb0-8745-b8a37c3375a5', 'Holger Seifert', 'holger.seifert@museen-dresden.de', 'Hallo, die Museen der Stadt Dresden - so auch die Technischen Sammlungen, wo ich tätig bin - bieten jeden Freitag ab 12 Uhr (teilweise ab 13 Uhr) kostenlosen Eintritt in die Häuser an. Vielleicht könnt ihr das in Euer Karte unter "Freizeit" oder "Kinder & Jugendliche" mit aufnehmen?\n\nViele Grüße,\nHolger Seifert', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-08-17 12:52:07', '2015-08-17 12:52:07'),
('5fb95d84-41b8-4309-883c-a47be6b69b37', 'Kirsten von der Heiden', 'kontakt@willkommensbuendis-freital.de', 'Liebes AFEEFA-Team,\n\nkönnten Sie bitte den Eintrag für die Kontaktperson unseres Bündnisses:\nhttp://afeefa.de/#557708389ed53\nändern?\n\nBitte vermerken Sie:\nK. v. d. Heiden\n\n\nVielen Dank für Ihre Mühe,\n\nK. v. .d Heiden\n', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-12 14:12:29', '2015-06-12 14:12:29'),
('6fee9557-5845-4edd-aa92-405a5ead8984', 'theo / Amnesty Hochschulgruppe', 'ai-hsg-dresden@web.de', 'Hallo liebes Afeefa Team,\n\nwir haben uns gefragt, ob es auch Ziel der Plattform ist einzelne veranstaltungen (Kundgebungen, Informationsabende, etc...) über diese Plattform zu bewerben. Und wenn ja, unter welchem Punkt dies geschehen soll.\n\nmfg\ntheo', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-12 12:30:02', '2015-06-12 12:30:02'),
('79b67286-094d-4ed2-84bd-97667e38f7f7', 'felix', 'felix@afeefa.de', 'metadaten LIVE test', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,true,true,true,false,true', '2015-07-15 11:09:19', '2015-07-15 11:09:19'),
('8ec8c15f-be89-4cb2-abf5-691664c7c7ef', 'Konrad Ehelebe', 'k.ehelebe@gmail.com', 'Hallo liebe Leute,\n\nerstmal herzlichen Dank für die tolle Arbeit. Ich habe ein paar Hinweise:\n1. Es wäre denke ich sinnvoll die Sozialkaufhäuser der Stadt (z.B. vom SUFW in Gorbitz), wo nur Menschen mit Dresdenpass zu sehr günstigen Preisen einkaufen können, sollten ALLE mit auf die Karte, da sie die zentralen Spendensammlepunkte sind...\n2. Die Gemeinschaftsunterkunft in der Tharander Straße ist falsch eingezeichnet, sie ist in der Tharandter Straße 8...\n\nSo viel als erste Hinweise, mir fällt bestimmt später nochmal mehr ein =)\n\nLiebe Grüße,\n\nKonrad', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-30 10:31:14', '2015-06-30 10:31:14'),
('a06091a0-4a8c-46ac-a1e6-850c7b71938b', 'felix', 'felix@afeefa.de', 'metadaten LIVE test', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,true,true,true,false,true', '2015-07-15 11:10:57', '2015-07-15 11:10:57'),
('adf22326-dc76-4cfc-bb34-7c6ad1d6677a', 'felix', 'felix@afeefa.de', 'test vom surface 3', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,true,true,true,false,true', '2015-07-16 22:42:11', '2015-07-16 22:42:11'),
('be2ef37b-6641-4bf1-8b8d-94845ff8cefc', 'Umsonstladen Dresden', 'UmsonstladenDD@web.de', 'Danke für diese sehr, sehr tolle Seite. Wir werden in nächster Zeit einiges zum Freital-Support hier eintragen.', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,true,true,false,true', '2015-07-03 10:30:59', '2015-07-03 10:30:59'),
('edc458b1-9ea4-4b60-8bfa-6c6c4138070c', 'Maria Consuelo Revilla Nebreda', 'mconsuelo.revilla.nebreda@posteo.de', 'Hallo! Wir möchten ein Angebot aufgeben aber es klappt nicht, woran kann es liegen? Zu viel Text? Danke! Chelo', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-08-05 16:41:11', '2015-08-05 16:41:11'),
('f315c8f2-6dee-4624-9b39-82aaa2200f97', 'Ruth Borchers', 'ruth-borchers@web.de', 'Hi!\n\nErgänzungen zum Eintrag der Kontaktgruppe Asyl e.V.:\n\nDa wir am Emerich-Ambros-Ufer nur unsere Postadresse haben, aber sonst dort nicht aktiv sind, sollte unser Standort in die Johannstadt (Florian-Geyer-Str. 48) verlegt werden.\n\nErgänzen möchte ich auch gerne als erstes Schlagwort "Soziokulturelle Aktivitäten" neben "Beratung".\n\nUnd zu den "Öffnungszeiten": Sonntags nachmittags regelmäßiger Fußballtreff im Ostragehege, genaue Zeiten siehe Facebook.\n\nEvtl. auch ein extra Eintrag hierfür? Dann könnte unter der Florian-Geyer-Str. die Beratung stehen bleiben und ins Ostragehege der Fußballtreff gelegt werden. Beschreibender Text jeweils der gleiche.\n\nSchönen Dank, Ruth', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,false,false,true,false,true', '2015-06-22 20:41:54', '2015-06-22 20:41:54');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `ddfa_main_domain_model_feedback`
--
ALTER TABLE `ddfa_main_domain_model_feedback`
 ADD PRIMARY KEY (`persistence_object_identifier`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
