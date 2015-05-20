<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Location;
use DDFA\Main\Utility\DDConst;
use ReflectionObject;
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

        $locations = $query->matching(
            $query->equals('locale', $locale)
        )->execute();

        return $this->addLocales($locations);
    }

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

    /**
     * returns the one localisation in $locale of the location (or nothing if the locale does not exist)
     *
     * @param Location $location
     * @param $locale
     * @return Location
     */
    public function findOneLocalized(Location $location, $locale)
    {
        if($location->getLocale() == $location)
            return $location;

        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd(
                $query->equals('entryId', $location->getEntryId()),
                $query->equals('locale', $locale)
            )
        )->execute()->getFirst();
    }

    /**
     * returns only all other localisations, without itself
     *
     * @param Location $location
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findLocalisations(Location $location)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd(
                $query->equals('entryId', $location->getEntryId()),
                $query->logicalNot(
                    $query->equals('Persistence_Object_Identifier', $location->getPersistenceObjectIdentifier())
                )
            )
        )->execute();
    }

    /**
     * returns all localisations of this location including itself
     *
     * @param Location $location
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllLocalisations(Location $location)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->equals('entryId', $location->getEntryId())
        )->execute();

    }

    /**
     * returns an array containing the locale codes of all available translations
     *
     * @param Location $location
     * @return array
     */
    public function findAllLocales(Location $location)
    {
        $r = array();
        $i = 0;
        foreach ($this->findAllLocalisations($location) as $localisation) {
            $r[$i] = $localisation->getLocale();
            ++$i;
        }
        return $r;
    }

    /**
     * returns an array containing the locale codes of all available translations
     *
     * @param Location $location
     * @return array
     */
    public function findLocales(Location $location)
    {
        $r = array();
        $i = 0;
        foreach ($this->findAllLocalisations($location) as $localisation) {
            $locale = $localisation->getLocale();
            if ($location->getLocale() != $locale) {
                $r[$i] = $locale;
                ++$i;
            }
        }
        return $r;
    }

    /**
     * @param $locations
     * @return mixed
     */
    private function addLocales($locations)
    {
        foreach ($locations as $l) {
            $locales = $this->findLocales($l);
            $l->numLocales = sizeof($locales);
            $l->locales = join(", ", $locales);
        }
        return $locations;
    }

    /**
     * @param Location $location
     * @return Location
     */
    public function hydrate(Location $location) {
        if($location->getLocale() != DDConst::LOCALE_STD) {
            $parentEntry = $this->findOneLocalized($location, DDConst::LOCALE_STD);
            $parentReflection = new ReflectionObject($parentEntry);
            $sourceReflection = new ReflectionObject($location);
            foreach($sourceReflection->getProperties() as $property) {
                $property->setAccessible(true);
                $value = $property->getValue($location);
                if($value == NULL || $value == "") {
                    $parentProperty = $parentReflection->getProperty($property->getName());
                    $parentProperty->setAccessible(true);
                    $property->setValue($location, $parentProperty->getValue($parentEntry));
                }
            }
        }
        return $location;
    }
}