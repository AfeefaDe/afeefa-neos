-- MySQL dump 10.13  Distrib 5.6.24, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: neos-dd4all
-- ------------------------------------------------------
-- Server version	5.6.24-0ubuntu2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ddfa_main_domain_model_language`
--

DROP TABLE IF EXISTS `ddfa_main_domain_model_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ddfa_main_domain_model_language` (
  `persistence_object_identifier` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `language` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rtl` tinyint(1) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`persistence_object_identifier`),
  UNIQUE KEY `flow_identity_ddfa_main_domain_model_language` (`code`,`persistence_object_identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddfa_main_domain_model_language`
--

LOCK TABLES `ddfa_main_domain_model_language` WRITE;
/*!40000 ALTER TABLE `ddfa_main_domain_model_language` DISABLE KEYS */;
INSERT INTO `ddfa_main_domain_model_language` VALUES ('086b68a7-c101-4922-977b-7d77bb860ac8','ar','العربية (Arabic)',1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('1ca3f807-e755-4d0e-9382-4a59b73b559c','fa','فارسی (Persian)',1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('4c9d8930-2314-46cb-81b6-85ed154d628a','fr','Français',0,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('521c1c80-0074-4a7f-a9c2-52c119d7b7c3','en','English',0,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('52ba3ee7-e806-4597-9e2c-c76759a94707','sr','Serbian',0,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('6c8b0f53-099a-4d9b-9262-b40225c2e2ba','ur','Urdu',1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('89bf260b-95a0-4ae3-8e8f-f203103f69aa','ru','Russian',0,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('90504c74-bf42-45d9-818f-21076db6a461','it','Italian',0,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('a2938e05-3e95-4658-b2d9-3c2fd4d43fe8','de','German',0,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('bc0e89ae-f3b5-4e22-8099-92f270b0c39f','ti','Tigrinya',0,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `ddfa_main_domain_model_language` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-04 22:54:57
