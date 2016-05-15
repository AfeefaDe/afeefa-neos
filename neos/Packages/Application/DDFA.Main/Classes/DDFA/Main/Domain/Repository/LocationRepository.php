<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Actor;
use DDFA\Main\Domain\Model\Location;
use DDFA\Main\Domain\Model\MarketEntry;
use DDFA\Main\Utility\DDConst;
use ReflectionObject;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Persistence\QueryInterface;

/**
 * @Flow\Scope("singleton")
 */
class LocationRepository extends AbstractTranslationRepository
{
    /**
     * @Flow\Inject
     * @var MarketEntryRepository
     */
    protected $marketRepository;

    /**
     * @Flow\Inject
     * @var LanguageRepository
     */
    protected $languageRepository;

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAll()
    {
        return $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_ASCENDING))->execute();
    }

//    /**
//     * @return \TYPO3\Flow\Persistence\QueryResultInterface
//     */
//    public function findAllOfInitiative()
//    {
//        $query = $this->createQuery()->setOrderings(array('created' => QueryInterface::ORDER_DESCENDING));
//        return $query->matching(
//            $query->equals('type', DDConst::OWNER_INI)
//        )->execute();
//    }
//
//    /**
//     * @return \TYPO3\Flow\Persistence\QueryResultInterface
//     */
//    public function findAllOfMarket()
//    {
//        $query = $this->createQuery()->setOrderings(array('created' => QueryInterface::ORDER_DESCENDING));
//        return $query->matching(
//            $query->equals('type', DDConst::OWNER_MARKET)
//        )->execute();
//    }
//
//    /**
//     * @return \TYPO3\Flow\Persistence\QueryResultInterface
//     */
//    public function findAllOfBasic()
//    {
//        $query = $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_DESCENDING));
//        return $query->matching(
//            $query->equals('type', DDConst::OWNER_BASIC)
//        )->execute();
//    }
//
//    /**
//     * @return \TYPO3\Flow\Persistence\QueryResultInterface
//     */
//    public function findAllOfEvent()
//    {
//        $query = $this->createQuery()->setOrderings(array('created' => QueryInterface::ORDER_DESCENDING));
//        return $query->matching(
//            $query->equals('type', DDConst::OWNER_EVENT)
//        )->execute();
//    }

//    /**
//     * @param string $locale
//     * @return mixed
//     */
//    public function findAllOfInitiativeLocalized($locale = DDConst::LOCALE_STD)
//    {
//        $query = $this->createQuery()->setOrderings(array('created' => QueryInterface::ORDER_DESCENDING));
//        $locations = $query->matching(
//            $query->logicalAnd(
//                $query->equals('type', DDConst::OWNER_INI),
//                $query->equals('locale', $locale)
//            )
//        )->execute();
//
//        return $this->includeLocales($locations);
//    }
//
//    /**
//     * @param string $locale
//     * @return mixed
//     */
//    public function findAllOfMarketLocalized($locale = DDConst::LOCALE_STD)
//    {
//        $query = $this->createQuery()->setOrderings(array('created' => QueryInterface::ORDER_DESCENDING));
//        $locations = $query->matching(
//            $query->logicalAnd(
//                $query->equals('type', DDConst::OWNER_MARKET),
//                $query->equals('locale', $locale)
//            )
//        )->execute();
//
//        return $this->includeLocales($locations);
//    }
//
//    /**
//     * @param string $locale
//     * @return mixed
//     */
//    public function findAllOfBasicLocalized($locale = DDConst::LOCALE_STD)
//    {
//        $query = $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_DESCENDING));
//        $locations = $query->matching(
//            $query->logicalAnd(
//                $query->equals('type', DDConst::OWNER_BASIC),
//                $query->equals('locale', $locale)
//            )
//        )->execute();
//
//        return $this->includeLocales($locations);
//    }
//
//    /**
//     * @param string $locale
//     * @return mixed
//     */
//    public function findAllOfEventLocalized($locale = DDConst::LOCALE_STD)
//    {
//        $query = $this->createQuery()->setOrderings(array('created' => QueryInterface::ORDER_DESCENDING));
//        $locations = $query->matching(
//            $query->logicalAnd(
//                $query->equals('type', DDConst::OWNER_EVENT),
//                $query->equals('locale', $locale)
//            )
//        )->execute();
//
//        return $this->includeLocales($locations);
//    }

    /**
     * @param string $locale
     * @param bool $onlyPublished
     * @return array
     */
    public function findAllSupplemented($locale, $onlyPublished = false)
    {
        //find German location, to make sure, that, every entry is included, even if not translated in $locale
        $locations = $this->findAllLocalized(DDConst::LOCALE_STD);

        $result = array();
        foreach ($locations as $l) {
            $l = $this->findOneSupplemented($l, $locale, $onlyPublished);

            if ($l != null)
                array_push($result, $l);
        }
        return $result;
    }

    /**
     * @param Location $location
     * @param string $locale
     * @param bool $onlyPublished
     * @return null|Location
     */
    public function findOneSupplemented(Location $location, $locale = null, $onlyPublished = false)
    {
        if ($onlyPublished && $location->getMarketEntry() != null && $location->getMarketEntry()->getPublished() != true) {
            return null;
        }

        if ($locale == null)
            $locale = $location->getLocale();

        return $this->addSupplementedOwner($this->hydrate($this->findOneLocalized($location), $locale, DDConst::LOCATION), $locale);
    }

    /**
     * @param Actor|Location $location
     * @param $locale
     * @return Actor|Location
     */
    public function addSupplementedOwner(Actor $location, $locale)
    {

        if ($location->getMarketEntry() != null) {

            $sourceReflection = new ReflectionObject($location);
            $ownerProp = $sourceReflection->getProperty("marketEntry");

            if ($ownerProp) {
                $ownerProp->setAccessible(true);
                $ownerProp->setValue($location, $this->marketRepository->findOneSupplemented($location->getMarketEntry(), $locale));
            }
        }

        return $location;
    }

//    /**
//     * @param Location|Actor $location
//     * @param $locale
//     * @return Location
//     */
//    public function supplementFromOwner(Location $location, $locale)
//    {
//        $owner = $this->marketRepository->hydrate($location->getMarketEntry(), $locale);
//
//        if ($owner == null)
//            return $location;
//
//        $parentReflection = new ReflectionObject($owner);
//        $sourceReflection = new ReflectionObject($location);
//
//        foreach (DDConst::LOCATION_SUPPLEMENT_PROPS as $property) {
//
//            $property->setAccessible(true);
//
//            $name = $property->getName();
//            if ($parentReflection->hasProperty($name)) {
//                $parentProperty = $parentReflection->getProperty($name);
//                $parentProperty->setAccessible(true);
//                $property->setValue($location, $parentProperty->getValue($owner));
//            }
//        }
//
//        $iniProp = $sourceReflection->getProperty("marketEntry");
//
//        if ($iniProp) {
//            $iniProp->setAccessible(true);
//            $iniProp->setValue($location, $owner);
//        }
//
//        return $location;
//    }

//    /**
//     * @param Actor|MarketEntry $owner
//     * @return boolean
//     */
//    public function existsReferringLocation(Actor $owner)
//    {
//        $query = $this->createQuery();
//
//        if ($owner instanceof MarketEntry)
//            $query->matching($query->equals('marketEntry', $owner->getPersistenceObjectIdentifier()));
//        else
//            return false;
//
//        echo $query->execute()->count();
//
//        return $query->execute()->count() != 0;
//    }
}