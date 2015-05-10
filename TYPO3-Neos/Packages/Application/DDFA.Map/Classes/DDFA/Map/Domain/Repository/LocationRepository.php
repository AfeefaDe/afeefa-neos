<?php
namespace DDFA\Map\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Map".              *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Utility\DDConst;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Persistence\Repository;

/**
 * @Flow\Scope("singleton")
 */
class LocationRepository extends Repository
{
    public function findAllLocalized($locale)
    {
        $query = $this->createQuery();
        $locations = $query->matching($query->equals('locale', $locale))->execute();
        foreach ($locations as $l) {
            $l->numLangs = $this->countLocalisations($l->getEntryId());
        }
        return $locations;
    }

    public function findAllOfInitiative()
    {
        $query = $this->createQuery();
        return $query->matching($query->equals('type', DDConst::LOCATION_INI))->execute();
    }

    public function findAllOfMarketEntry()
    {
        $query = $this->createQuery();
        return $query->matching($query->equals('type', DDConst::LOCATION_MARKET))->execute();
    }

    public function findAllOfEvent()
    {
        $query = $this->createQuery();
        return $query->matching($query->equals('type', DDConst::LOCATION_EVENT))->execute();
    }

    public function findAllOfInitiativeLocalized($locale)
    {
        $query = $this->createQuery();
        return $query->matching($query->equals('type', DDConst::LOCATION_INI))->matching($query->equals('locale', $locale))->execute();
    }

    public function findAllOfMarketEntryLocalized($locale)
    {
        $query = $this->createQuery();
        return $query->matching($query->equals('type', DDConst::LOCATION_MARKET))->matching($query->equals('locale', $locale))->execute();
    }

    public function findAllOfEventLocalized($locale)
    {
        $query = $this->createQuery();
        return $query->matching($query->equals('type', DDConst::LOCATION_EVENT))->matching($query->equals('locale', $locale))->execute();
    }

    public function findLocalisations($entryID)
    {
        $query = $this->createQuery();
        return $query->matching($query->equals('entryId', $entryID))->execute();
    }

    public function countLocalisations($entryID)
    {
        return $this->findLocalisations($entryID)->count();
    }
}