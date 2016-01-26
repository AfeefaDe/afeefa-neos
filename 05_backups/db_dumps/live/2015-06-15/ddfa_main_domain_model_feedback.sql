-- phpMyAdmin SQL Dump
-- version 4.2.13.2
-- http://www.phpmyadmin.net
--
-- Host: db1118.mydbserver.com
-- Erstellungszeit: 15. Jun 2015 um 11:50
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
('5fb95d84-41b8-4309-883c-a47be6b69b37', 'Kirsten von der Heiden', 'kontakt@willkommensbuendis-freital.de', 'Liebes AFEEFA-Team,\n\nkönnten Sie bitte den Eintrag für die Kontaktperson unseres Bündnisses:\nhttp://afeefa.de/#557708389ed53\nändern?\n\nBitte vermerken Sie:\nK. v. d. Heiden\n\n\nVielen Dank für Ihre Mühe,\n\nK. v. .d Heiden\n', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-12 14:12:29', '2015-06-12 14:12:29'),
('6fee9557-5845-4edd-aa92-405a5ead8984', 'theo / Amnesty Hochschulgruppe', 'ai-hsg-dresden@web.de', 'Hallo liebes Afeefa Team,\n\nwir haben uns gefragt, ob es auch Ziel der Plattform ist einzelne veranstaltungen (Kundgebungen, Informationsabende, etc...) über diese Plattform zu bewerben. Und wenn ja, unter welchem Punkt dies geschehen soll.\n\nmfg\ntheo', 'false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true,false,true', '2015-06-12 12:30:02', '2015-06-12 12:30:02');

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
