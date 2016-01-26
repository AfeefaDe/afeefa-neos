<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Scope("singleton")
 */
class MarketEntryRepository extends AbstractTranslationRepository
{
    /**
     * @Flow\Inject
     * @var LanguageRepository
     */
    protected $languageRepository;
}