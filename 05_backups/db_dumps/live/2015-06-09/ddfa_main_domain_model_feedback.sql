-- phpMyAdmin SQL Dump
-- version 4.2.13.2
-- http://www.phpmyadmin.net
--
-- Host: db1118.mydbserver.com
-- Erstellungszeit: 09. Jun 2015 um 20:44
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
('148ae55c-9ced-4b29-aa28-15d7800e873c', 'Hannes', 'johannes.kroeger@hcu-hamburg.de', 'Moin!\n\nOSM-Attribution fehlt ;)\nWeil es öfters mal auffällt, mögt ihr mir sagen, ob Mapbox da überhaupt drauf hinweist? Habt ihr irgendwelche fertigen Codeschnipsel verwendet? Ich würde halt gerne herausfinden, warum das immer wieder passiert und wie das verbessert werden kann!\n\nSuper schicke Karte!\n\nViele Grüße, Hannes', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,true,true,false,true', '2015-06-08 11:23:43', '2015-06-08 11:23:43'),
('149d6285-d9e5-4cef-a9e4-e0e3aaf93de9', 'Tobias Fried', 'fried@caritas-dresden.de', 'Noch ein Hinweis: das Netzwerk Leuben ist bunt hat eine eigene Webseite: leuben-ist-bunt.de\nVG, Tobias Fried', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-09 11:45:39', '2015-06-09 11:45:39'),
('1e0d9422-1877-4b89-8b75-661e6f179fb5', 'V. Gottmann', 'info@qm-prohlis.de', '... und manche Angebote saufen in der Elbe ab.', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,false,false,true,false,true', '2015-06-07 17:00:49', '2015-06-07 17:00:49'),
('3ef25c71-d9ec-487e-8c20-2151b22b6a70', 'Marek', 'marek.wysocki11@gmail.com', 'Traumaambulanz Seelische Gesundheit im Uniklinikum falsch dargestellt. \nRichtige Adresse:\nLukasstraße 3, 01069 Dresden, Seiteneingang links\nTel.: 0351 41726750\nFax: 0351 41726755\nE-Mail: traumaambulanz@uniklinikum-dresden.de\nTerminvereinbarung:\nMo, Di, Do 08.00 - 14.30 Uhr\nMi 10.00 - 18.00 Uhr\nFr 08.00 - 12.00 Uhr\n\nUnter http://traumanetz-sachsen.de/hilfsangebote/ sind zudem weitere Beratungsstellen für Kinder und Erwachsene zu finden.\n\nLG', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,false,false,true,false,true', '2015-06-06 09:43:38', '2015-06-06 09:43:38'),
('4284447c-f0a3-4806-8501-1afe4a6daa31', 'MIlena Koch', 'milenakoch@gmx.net', 'Hallo afeefa-Team!\nDanke für die tolle Seite! Kerstin Albrecht und ich machen zusammen das Projekt "Einladungsamt" - könnt ihr uns in eure Liste mit aufnehmen? Infos findet ihr unter www.einladungsamt-dresden.jimdo.com. Viele Grüße, Milena', 'true,false,false,false,false,false,false,true,false,false,false,true,false,false,false,false,false,0,0,true,true,false,true', '2015-06-07 22:48:02', '2015-06-07 22:48:02'),
('4a0f6221-27e3-42f7-97cf-0f3c0749279e', 'presse', 'hgghgvhg@ggh', 'wie tickt der deutsche?', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,true,true,true,false,true', '2015-06-05 11:54:24', '2015-06-05 11:54:24'),
('5b093240-ebdd-4c1b-9d9d-fd660a338b10', 'Birthe Vollmar', 'b.vollmar@sprachmobil.com', 'Liebes Team,\nin der Tannenstraße e.V. befindet sich der Kästner Kolleg e.V., eine Sprachschule, die z.B. den DAMF-Sprachkursen unentgeltlich Räume für Unterricht zur Verfügung stellt.\nWir würden uns freuen, wenn Ihr den Verein in die Karte aufnehmen könntet.\nDankeschön und herzliche Grüße,\nBirthe Vollmar', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-07 07:38:20', '2015-06-07 07:38:20'),
('8486b4bc-9a23-4c02-a588-e95eb8ac9d38', 'Felix', 'felix@schoenfelds.org', 'live test', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,true,true,true,false,true', '2015-06-08 13:33:26', '2015-06-08 13:33:26'),
('854c4a7d-2dbd-41c0-9481-cd1dbc1147c3', 'Andreas Ermer', 'info@leuben-ist-bunt.de', 'Hallo,\n\ndanke für die tolle Seite!\nKönnt ihr bei "Leuben ist bunt" unsere neue Homepage www.leuben-ist-bunt.de und die neue E-Mail info@leuben-ist-bunt.de einpflegen bzw. die VSP-Kontaktdaten ersetzen. Danke.\nEvtl. werden wir die Leubener Angebote (Sprachkurse, Sportangebot) noch einmal detailliert bewerben.\n\nViele Grüße\nAndreas Ermer', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-08 13:53:05', '2015-06-08 13:53:05'),
('97ca77c7-7168-489a-a3ec-0d3e1f8c00bd', 'Friederike Schulz', 'schulz-friederike@gmx.de', 'Sehr geehrte Damen und Herren,\nmir scheint diese Seite gut durchdacht; sie ist wirklich informativ und gut verständlich. \nIch werde sie meinen Schülern (junge Migranten in einer Vorbereitungsklasse) und meinen Kollegen empfehlen.\nVielen Dank und alles Gute.\nFriederike Schulz', 'true,false,false,false,false,false,false,true,false,false,false,true,false,false,false,false,false,0,0,true,true,false,true', '2015-06-07 09:14:09', '2015-06-07 09:14:09'),
('995f0ed2-cd3a-43b9-bd7e-75c9922e63e2', 'Tobias Fried', 'fried@caritas-dresden.de', '...außerdem ist das Netzwerk Leuben ist bunt erreichbar unter info@leuben-ist-bunt.de, die alte Mailadresse ist nicht mehr aktuell.\nTobias Fried', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-09 11:48:10', '2015-06-09 11:48:10'),
('b8b6a950-2f6d-463d-a7a7-992939808a39', 'Tobias Fried', 'fried@caritas-dresden.de', 'Hallo, schön dass ihr online seid!\nBei der Reicker Straße 89 handelt es sich nicht um die Caritas-Kleiderkammer sondern den Kleiderladen der Heilsarmee...\nDanke für die Berichtigung,\nTobias Fried', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-09 11:43:45', '2015-06-09 11:43:45'),
('c41b0371-a177-4c8b-bb5a-7c49f47d94ca', 'winfried schenk', 'winfried.schenk@meindd.de', 'Hallo, ich hätte gern für die Berichterstattung bei menschen-in-dresden.de die afeefa-Grafik digital. Lässt sich das einrichten?\n\nVielen Dank\n\nWinfried Schenk', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-05 17:02:18', '2015-06-05 17:02:18'),
('eb94b004-ba0c-40d7-b28e-0e0a688bbdd4', 'Veronika Gottmann', 'info@qm-prohlis.de', 'Hallo,\n\nerst mal vielen Dank für die geleistete Arbeit. Sieht auf den ersten Blick und Versuch super aus.\nKönnt ihr bei den Texten Silbentrennung einführen?\nGibt es irgendwo eine kleine Bedienungsanleitung?\nMfG\n\nV. Gottmann, \nQM prohlis\nP.S. Meine Daten stimmen!', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,false,false,true,false,true', '2015-06-07 16:57:14', '2015-06-07 16:57:14'),
('eceef319-debe-42e3-a508-2d94c68f0b08', 'Nils Krüger', 'nilz42@gmx.de', 'Zunächst einmal vielen Dank für die tolle Arbeit!\nDie Website ist große Klasse und besser als ich sie mir vorgestellt habe.\nWas man meiner Meinung nach noch hinzufügen könnte, wäre eine Suchfunktion und/oder ein Überblick für die einzelnen Kategorien. Sodass man beispielsweise rechts in der Legende auf "Übersetzungen" klickt, um eine Liste der Übersetzungsangebote zu sehen und/oder alle anderen Angebote auszublenden.', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,false,false,true,false,true', '2015-06-06 20:28:18', '2015-06-06 20:28:18'),
('ef4bf586-f1af-46e9-8fc6-cd84bc24350a', 'felix', 'felix@schoenfelds.org', 'live test', 'false,false,true,false,false,false,true,false,true,false,false,true,false,false,false,false,true,true,true,false,true', '2015-06-08 13:38:56', '2015-06-08 13:38:56');

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
