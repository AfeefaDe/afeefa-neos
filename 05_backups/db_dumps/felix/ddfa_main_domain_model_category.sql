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
-- Tabellenstruktur für Tabelle `ddfa_main_domain_model_category`
--

CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_category` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `entry_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `locale` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_category`
--

INSERT INTO `ddfa_main_domain_model_category` (`persistence_object_identifier`, `entry_id`, `locale`, `name`, `description`, `created`, `updated`, `type`) VALUES
('07f88130-7d98-4a20-bbb8-d0d98f55c553', '55701e6a33160', 'de', 'community', '', '2015-06-04 11:46:18', '2015-06-04 11:46:18', 1),
('102ec0ae-84c5-40bd-a991-7e84192d2cd7', '556a30ce2e99e', 'de', 'wifi', '', '2015-05-30 23:51:10', '2015-05-30 23:51:10', 3),
('12914a3d-0cb5-4646-be56-3f671d737977', '55701e55ea33f', 'de', 'children', '', '2015-06-04 11:45:57', '2015-06-04 11:45:57', 1),
('21484033-ae7d-4dbe-9a75-f073f7216a3e', '556b56a26651c', 'de', 'other', '', '2015-05-31 20:44:50', '2015-05-31 20:44:50', 3),
('29eaaac1-a0c8-47da-806c-078e48553588', '556a3164ada0f', 'de', 'islam', '', '2015-05-30 23:53:40', '2015-05-30 23:53:59', 3),
('4e058e43-58cd-4175-b3f9-dadbcbf2534c', '556a31592d1e2', 'de', 'jewish', '', '2015-05-30 23:53:29', '2015-05-30 23:53:29', 3),
('56035892-7f04-41f9-b91f-75a9ef4c4f69', '556b5499ba54c', 'de', 'donation', '', '2015-05-31 20:36:09', '2015-05-31 20:36:09', 0),
('5cd18ce7-923d-47ff-af66-7f4286f420d0', '556b5697d4951', 'de', 'other', '', '2015-05-31 20:44:39', '2015-05-31 20:44:39', 1),
('5dddf63d-ccf6-44e2-8daf-81bb44507fdd', '55701e31bc4ef', 'de', 'german', '', '2015-06-04 11:45:21', '2015-06-04 11:45:21', 1),
('744f41e9-799c-432b-a9a3-e78d471ec51a', '55701e5f83ba7', 'de', 'donation', '', '2015-06-04 11:46:07', '2015-06-04 11:46:07', 1),
('79c85766-09b5-4bbe-b29e-ce093243a034', '556b54802b47d', 'de', 'translation', '', '2015-05-31 20:35:44', '2015-05-31 20:35:44', 0),
('8506e6e6-6c1f-4117-8236-12bbb154bedc', '556b54a869cb5', 'de', 'community', '', '2015-05-31 20:36:24', '2015-05-31 20:36:24', 0),
('85be42e3-e597-44c1-b743-bb675169d94c', '556a0e081e58e', 'de', 'consultation', '', '2015-05-30 21:22:48', '2015-05-30 21:22:48', 0),
('a138e755-17ec-439c-9c6b-088a6209c6a9', '556b548f65630', 'de', 'children', '', '2015-05-31 20:35:59', '2015-05-31 20:35:59', 0),
('a657ca53-59eb-41ad-b2eb-75d91dd6e6f5', '556b547390f6e', 'de', 'leisure', '', '2015-05-31 20:35:31', '2015-05-31 20:35:31', 0),
('adfb2457-819c-4574-ace1-56f5b38d8f96', '556e2704b4e91', 'de', 'leisure', '', '2015-06-02 23:58:28', '2015-06-02 23:58:28', 1),
('b4e52b49-2e9f-4621-b3e0-a0ef8fc86bdb', '556b545130d6e', 'de', 'medic', '', '2015-05-31 20:34:57', '2015-05-31 20:34:57', 0),
('b63f01d2-3573-48dc-83a5-6c9577cfbc6b', '55701e467832a', 'de', 'translation', '', '2015-06-04 11:45:42', '2015-06-04 11:45:42', 1),
('bbf6424c-505c-49f5-aa2b-0c3f85ac1a5d', '556b568e7915d', 'de', 'other', '', '2015-05-31 20:44:30', '2015-05-31 20:44:30', 0),
('bcfdac93-ea24-4ed3-bd66-7cfd1c1c99d1', '556b545c05d59', 'de', 'german', '', '2015-05-31 20:35:08', '2015-05-31 20:35:08', 0),
('beb17367-cb5b-481d-9174-8f10603783e2', '556b54692e760', 'de', 'jobs', '', '2015-05-31 20:35:21', '2015-05-31 20:35:21', 0),
('c29989c8-f729-4976-b68b-53b80dc23df2', '556a30f5c5375', 'de', 'christian', '', '2015-05-30 23:51:49', '2015-05-30 23:54:15', 3),
('c76d965c-eacc-4b33-9e4c-ec9b1fc39043', '556b55637177d', 'de', 'shop', '', '2015-05-31 20:39:31', '2015-05-31 20:39:31', 3),
('cdc09224-a647-48ff-9971-87b22896f76a', '556a30dc23b45', 'de', 'housing', '', '2015-05-30 23:51:24', '2015-05-30 23:51:24', 3),
('d29bbe86-ecd6-42df-8054-70a90ec7b535', '55701e3a1dee3', 'de', 'jobs', '', '2015-06-04 11:45:30', '2015-06-04 11:45:30', 1),
('df402493-f467-4472-8b98-9038d2ac967e', '55701e1d724b7', 'de', 'consultation', '', '2015-06-04 11:45:01', '2015-06-04 11:45:01', 1),
('e39fd3c8-c86a-43f8-a37e-9e6e999bda94', '556a2fa08904d', 'de', 'public', '', '2015-05-30 23:46:08', '2015-05-30 23:50:50', 3),
('fa815876-ad1d-433e-87ff-8de20639e2b1', '55701e2712c4c', 'de', 'medic', '', '2015-06-04 11:45:11', '2015-06-04 11:45:11', 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `ddfa_main_domain_model_category`
--
ALTER TABLE `ddfa_main_domain_model_category`
 ADD PRIMARY KEY (`persistence_object_identifier`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
