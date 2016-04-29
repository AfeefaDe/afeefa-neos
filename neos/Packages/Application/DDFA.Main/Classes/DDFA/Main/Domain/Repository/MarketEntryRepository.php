<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\MarketEntry;
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


    /**
     * @param $id
     * @return MarketEntry
     */
    public function findById($id) {
        $query = $this->createQuery();
        $query = $query->matching($query->equals('Persistence_Object_Identifier', $id));
        return $query->execute()->getFirst();
    }
}