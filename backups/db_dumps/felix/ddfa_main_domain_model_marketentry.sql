-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Jun 2015 um 00:14
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
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_marketentry`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_marketentry` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `datefrom` datetime NOT NULL,
  `dateto` datetime NOT NULL,
  `dateday` int(11) NOT NULL,
  `dateperiodic` int(11) NOT NULL,
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
('0c0489f7-f932-46d2-8353-cb93a6fbb846', '1854-01-01 00:00:00', '1854-01-01 00:00:00', 6, 999, '5570c94957be4', 'dfsdf', 'sdfsdf', 'ajdfsdf@sdsdf', '', '', '', NULL, 'de', 'asdasd', NULL, NULL, NULL, NULL, '', '2015-06-04 23:55:21', '2015-06-04 23:55:21', 0, 0, '5dddf63d-ccf6-44e2-8daf-81bb44507fdd');

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
