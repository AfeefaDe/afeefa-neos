<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".              *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Location;
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
            $l->numLangs = $this->countLocalisations($l) + 1;
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

    public function findLocalisations(Location $location)
    {
        $query = $this->createQuery();
        return $query->matching($query->equals('entryId', $location->getEntryId()))
            ->matching($query->logicalNot($query->equals('Persistence_Object_Identifier', $location->getId())))->execute();

    }

    public function countLocalisations(Location $location)
    {
        return $this->findLocalisations($location)->count();
    }
}