<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Location;
use DDFA\Main\Utility\DDConst;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Scope("singleton")
 */
class LocationRepository extends AbstractTranslationRepository
{
    public function findAllOfInitiative()
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->equals('type', DDConst::LOCATION_INI)
        )->execute();
    }

    public function findAllOfMarketEntry()
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->equals('type', DDConst::LOCATION_MARKET)
        )->execute();
    }

    public function findAllOfEvent()
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->equals('type', DDConst::LOCATION_EVENT)
        )->execute();
    }

    public function findAllOfInitiativeLocalized($locale)
    {
        $query = $this->createQuery();
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::LOCATION_INI),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->addLocales($locations);
    }

    public function findAllOfMarketEntryLocalized($locale)
    {
        $query = $this->createQuery();
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::LOCATION_MARKET),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->addLocales($locations);
    }

    public function findAllOfEventLocalized($locale)
    {
        $query = $this->createQuery();
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::LOCATION_EVENT),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->addLocales($locations);
    }
}