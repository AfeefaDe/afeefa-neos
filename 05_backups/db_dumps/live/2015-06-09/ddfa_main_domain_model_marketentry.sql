-- phpMyAdmin SQL Dump
-- version 4.2.13.2
-- http://www.phpmyadmin.net
--
-- Host: db1118.mydbserver.com
-- Erstellungszeit: 09. Jun 2015 um 20:45
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
('d39d417b-3623-4de0-98c2-c823fc6f6711', '1854-01-01 00:00:00', '1854-01-01 00:00:00', 6, 999, '5577140dbbe2d', 'Bikes for Refugees', 'Cycling in Dresden - Bikes for Refugees\nIt is tremendously practical to have a bike in Dresden. Refugees, who arrived in Dresden, could surely use bikes. We are asking people to donate bikes which they do not need anymore. These donated bikes are often older or broken ones, which we need to repair, before they can be used. Therefor we need time and help. For that we meet at 20 of June (Saturday) between 12 p.m. and 6 p.m. at the Laborschule (lab school) Dresden in Gorbitz.\n\nThe event is for free. We can show people how to ride a bike. Children are welcome, play equipment at the area of the school is available. We provide food for everyone and we are glad if someone brings food in addition.\n\nWhen: 20th June, 12 p.m.- 6 p.m.\nWhere: Laborschule (labschool), Espenstrasse 3, 01169 Dresden (tram line 2 and 7 stop Kirschenstraße)(watch out for signs "Laborschule")\n\nምዝዋር ብሽክለታ ኣብ ድረስደን - ብሽክለታታት ንስደተኛታት\nኣብ ከተማ ድረስደን ብሽክለታ ምህላው ኣዝዩ ክውንነታዊ እዩ።  ኣብ ቀረባ እዋን ዝመጹ ስደተኛታት ብርግጽ ብሽክለታታት ክጥቀሙ ይኽእሉ እዮም። ሰባት ዛጊት ዘይጥቀሙለን ብሽክለታታቶም ከወፉዩልና ንሓቶም ኣለና። እዘን ዝተወፈያ ብሽክለታታት መብዛሕትኡ ግዜ ኣረግቶትን ዝተሰብራን ስለዝኾና ቕድሚ ኣብ ኣገልግሎት ምውዓለን ከነተዓራርየን ኣለና። ስለዚ ግዜን ሓገዝን የድልየና እዩ። ነዚ ምኽንያት ንሰነ ዕለት 20 (ቀዳም) ካብ ሰዓት 12:00 ቀትሪ ክሳብ ሰዓት 6:00 ድ.ቀ. ኣብ Laborschule (ቤት-ትምህርቲ ላቦራቶሪ) ድረስደን ኣብ (Gorbitz)ጎርቢትስ ክንራኸብ ኢና።\n\nኣብኡ ምስታፍ ነጻ እዩ። ብሽክለታ ኣዘዋውራ ከነላምድ ኢና። ቆሎዑ ክመጹ ውን ነተባብዕ: ኣብ ቀጽሪ እቲ ቤት-ትምህርት መጻወቲ ቆልዑ ኣሎ። ንኹሉ ዝኽውን መግቢ ክንቅርብ ኢና: ብተወሳኺ መግቢ ተማሊኡ ዝመጽእ እንተድኣ ሃልዩ ኸኣ ጽቡቕ።\n\nመዓስ: 20 ሰነ ሰዓት 12:00 ቀ. – 6:00 ድ.ቀ.\nኣበይ: Laborschule (ቤት-ትምህርቲ ላቦራቶሪ):Espenstrasse 3 ( አስፐንሽትራሰ 3); 01169 ድረስደን (መስመር ባቡር ከተማ ቁጽሪ 2 ከምኡ ውን ቁጽሪ 7) ("Laborschule") ዝብል ምልክት ኣስተብህል)\n\nFaire du vélo à Dresden\nD`avoir un vélo est très pratique et facilite la vie quotidienne des réfugiés. Nous supportons des réfugiés qui vivent à Dresde et qu`ont besoin des vélos. Pour la deuxième fois nous avons adressé aux habitants à Dresden de nous donner des vélos qu`ils n`ont plus besoin. Car la plupart des vélos donnés va etre vieux nous devons les réparer avec VOUS avant l`usage.\nOn se recontre *le 20 juin 2015, de 12.00 à 18.00 heures, à l`école Laborschule, Espenstrasse 3, 01169 Dresden (Prenez-vous les trams numéros 2 et 7, sortez à la station Kirschenstraße).*\nL`action est gratuit. Nous pouvons vous s`aider d`apprendre à rouler à vélo. Des enfants sont bienvenus et sur le terrain il y a des jouets. Aussi nous vous offrons quelque chose à manger et nous nous réjouissons d`aliments apportés.\n\nС велосипедом по Дрездену\nТы ищеш велосипед, но не знаеш где взять?\nМы получим от жителей Дрездена велосипеды, которыйе им больше не нужны. Идёт реч о старых велосипедах которые мы можем отремонтировать вместе, прежди чем их изпользовать. Это вс ё мы можем сделать 20 июня, с 12 часов до 18 часов. На територии\n« Laborschule» в Dresden Gorbitz.\nЭта акция безплатная. Мы можем тоже научить людей кататса на велосипеде. Мы очень рады детям, на територие находитса дегская плащадка. Также будет вазможность покушатьи мы будем рады если вы что то принесёте с с бой. \nКогда: 20 иююня, от 12 -18 часов\nГде: Laborschule, Espenstrasse 3, 01169 Dresden (астановка Kirschenstrasse, с трамвайом 2 или 7)\n\nدوچرخه سواری در درسدن – دوچرخه برای پناهنده ها\n\n باشه، و حتی پناهنده هایی که تازه وارد شهر می شن، می تونن به راحتی ازش استفاده کنن.\nما از کسانیکه دوچرخه اضافه یا بدون استفاده دارن، خواهش می‌کنیم که اونا رو به ما بدن. اما بیشتر این دوچرخه ها قدیمی یا خراب هستن و ما برای تعمیر و قابل استفاده کردنشون نیاز به زمان و کمک داریم.\nبه همین دلیل، روز بیست یونی (یکشنبه) بین ساعت 12 ظهر تا 6 بعدازظهر، همدیگه رو توی لابورشوله (Laborschule) درسدن واقع در گوربیتس (Gorbitz) می بینیم.\nاین برنامه به صورت رایگان برگزار می شه و ما توش به کسانیکه دوست دارن، دوچرخه سواری یاد می دیم. از اومدن بچه‌ها هم خوشحال می شیم و براشون تو محوطه مدرسه وسیله بازی وجود داره.\nخوراکی برای پذیرایی از همه هست، اما خوشحال می شیم اگه کسی بخواد همراه خودش خوراکی دیگه ای هم بیاره.\n\nزمان: 20 یونی، 12 ظهر تا 6 بعدازظهر\nمکان: لابورشوله (Laborschule)، اسپن اشتراسه (Espenstraße) شماره 3 , 01169 درسدن (ترام 2 یا 7، ایستگاه کیرشن اشتراسه (Kirschenstraße) – حواستون به تابلوی “Laborschule“ باشه!)\n\nقيادة الد راجه في درسدن\n\nشئ جيد الحصول على د راجه، لذلك يحتاج المهجرين الذين وصلو الى درسدن، لهذه الد راجات\n\nللمره الثانيه ندعو الجميع للتبرع بلد راجات القد يمه و التي لا حاجة بها,حيث نقوم نحن بإصلاحها  و استخدامها، لذلك نحن بحاجة الوقت و المساعده، في اليوم 20. 06 .2015 \nمن الساعه 12-إلى 18   في  Laborschule Dresden in Gorbitz.\nهذا العمل غير مدفوع، بإمكاننا أيضا تعليم قيادة الد راجه، ونرحب أيضا بلأطفال و لهم مكان للعب،\nيوجد بعض الطعام، وبإمكانكم احضار الطعام ايضا،\n\nالموعد: 20. Juni, 12:00 - 18:00 Uhr\nالمكان:Laborschule, Espenstrasse 3, 01169 Dresden\n (Straßenbahn Linie 2 und 7 Haltestelle Kirschenstraße\n\n\n', 'bikes4refugees@notraces.net', 'http://bikes.fueralle.org', '', '0351-2644645', NULL, 'de', 'Carsten Ungewitter', NULL, NULL, NULL, NULL, 'dt., engl.', '2015-06-09 18:27:57', '2015-06-09 18:27:57', 1, 0, '744f41e9-799c-432b-a9a3-e78d471ec51a'),
('e388e31c-bea9-49e9-9bc6-51d89e6d951f', NULL, NULL, 6, 1, '5575958554574', 'German lessons in Freiberg', 'There are german lessons for beginners every monday and wednesday in the Chemnitzer Str. 50 (basement) starting 2:00 pm. You don''t need to apply, just join in.', 'elstnerv@googlemail.com', '', '', '', 3, 'de', 'Jacqueline Elstner', '', '', 'logo', NULL, 'English, German', '2015-06-08 15:15:49', '2015-06-09 17:40:40', 1, 1, '5dddf63d-ccf6-44e2-8daf-81bb44507fdd'),
('e6880bc5-9afc-42b6-b765-b28ca266d02a', NULL, NULL, NULL, NULL, '5570b6ac8936a', 'Fußballspielen für asylsuchende Migranten', ' jeden Mittwoch (außer Ferienzeit) von 16.30 bis 18.30 Uhr\nTurnhalle der 25. Grund- und Oberschule', '', '', '', '', 3, 'de', '', '', '', 'logo', NULL, '', '2015-06-04 22:35:56', '2015-06-04 22:35:56', 1, 1, 'a657ca53-59eb-41ad-b2eb-75d91dd6e6f5');

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
