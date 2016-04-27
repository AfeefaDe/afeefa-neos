
CREATE TABLE IF NOT EXISTS `ddfa_main_domain_model_language` (
  `persistence_object_identifier` char(36) COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:guid)',
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `language` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rtl` tinyint(1) NOT NULL,
  `created` datetime,
  `updated` datetime,
  PRIMARY KEY (`persistence_object_identifier`),
  UNIQUE KEY `flow_identity_ddfa_main_domain_model_language` (`code`,`persistence_object_identifier`),
  UNIQUE KEY `UNIQ_1E699B7B47A46B0A` (`persistence_object_identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `ddfa_main_domain_model_language`
--

INSERT INTO `ddfa_main_domain_model_language` (`persistence_object_identifier`, `code`, `language`, `rtl`) VALUES
('086b68a7-c101-4922-977b-7d77bb860ac8', 'ar', 'العربية (Arabic)', 1),
('1ca3f807-e755-4d0e-9382-4a59b73b559c', 'fa', 'فارسی (Persian)', 1),
('4c9d8930-2314-46cb-81b6-85ed154d628a', 'fr', 'Français', 0),
('521c1c80-0074-4a7f-a9c2-52c119d7b7c3', 'en', 'English', 0),
('52ba3ee7-e806-4597-9e2c-c76759a94707', 'sr', 'Serbian', 0),
('6c8b0f53-099a-4d9b-9262-b40225c2e2ba', 'ur', 'Urdu', 1),
('89bf260b-95a0-4ae3-8e8f-f203103f69aa', 'ru', 'Russian', 0),
('90504c74-bf42-45d9-818f-21076db6a461', 'it', 'Italian', 0),
('a2938e05-3e95-4658-b2d9-3c2fd4d43fe8', 'de', 'German', 0),
('bc0e89ae-f3b5-4e22-8099-92f270b0c39f', 'ti', 'Tigrinya', 0);