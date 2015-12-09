<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Actor;
use DDFA\Main\Domain\Model\Location;
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
     * @var InitiativeRepository
     */
    protected $initiativeRepository;

    /**
     * @Flow\Inject
     * @var MarketEntryRepository
     */
    protected $marketRepository;

    /**
     * @Flow\Inject
     * @var EventRepository
     */
    protected $eventRepository;

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAll()
    {
        return $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_ASCENDING))->execute();
    }

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllOfInitiative()
    {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::OWNER_INI)
        )->execute();
    }

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllOfMarket()
    {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::OWNER_MARKET)
        )->execute();
    }

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllOfBasic()
    {
        $query = $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::OWNER_BASIC)
        )->execute();
    }

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllOfEvent()
    {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::OWNER_EVENT)
        )->execute();
    }

    /**
     * @param string $locale
     * @return mixed
     */
    public function findAllOfInitiativeLocalized($locale = DDConst::LOCALE_STD)
    {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::OWNER_INI),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->includeLocales($locations);
    }

    /**
     * @param string $locale
     * @return mixed
     */
    public function findAllOfMarketLocalized($locale = DDConst::LOCALE_STD)
    {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::OWNER_MARKET),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->includeLocales($locations);
    }

    /**
     * @param string $locale
     * @return mixed
     */
    public function findAllOfBasicLocalized($locale = DDConst::LOCALE_STD)
    {
        $query = $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_DESCENDING));
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::OWNER_BASIC),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->includeLocales($locations);
    }

    /**
     * @param string $locale
     * @return mixed
     */
    public function findAllOfEventLocalized($locale = DDConst::LOCALE_STD)
    {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::OWNER_EVENT),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->includeLocales($locations);
    }

    /**
     * @param string $locale
     * @return array
     */
    public function findAllSupplemented($locale)
    {
        $locations = $this->findAllLocalized();

        $result = array();
        foreach ($locations as $l) {
            $l = $this->findOneSupplemented($l, $locale);

            if ($l != null)
                array_push($result, $l);
        }
        return $result;
    }

    /**
     * @param Location $location
     * @param string $locale
     * @return Actor|Location
     */
    public function findOneSupplemented(Location $location, $locale = null)
    {
        if ($locale == null)
            $locale = $location->getLocale();

        //find German location, to make sure, that, every entry is included, even if not translated in $locale
        return $this->supplementFromOwner($this->hydrate($this->findOneLocalized($location, DDConst::LOCALE_STD), $locale), $locale);
    }

    /**
     * @param Location|Actor $location
     * @param $locale
     * @return Location
     */
    public function supplementFromOwner(Location $location, $locale)
    {
        $emptyParams = $this->findEmptyParams($location);
        if (sizeof($emptyParams) != 0) {
            $owner = $this->findHydratedOwner($location, $locale);

            if ($owner == null || sizeof($emptyParams) == 0)
                return $location;

            $parentReflection = new ReflectionObject($owner);
            $sourceReflection = new ReflectionObject($location);

            foreach ($sourceReflection->getProperties() as $property) {
                if (in_array($property->getName(), $emptyParams)) {
                    $property->setAccessible(true);

                    $name = $property->getName();
                    if ($parentReflection->hasProperty($name)) {
                        $parentProperty = $parentReflection->getProperty($name);
                        $parentProperty->setAccessible(true);
                        $property->setValue($location, $parentProperty->getValue($owner));
                    }
                }
            }

            $iniProp = null;
            switch ($location->getType()) {
                case DDConst::OWNER_INI:
                    $iniProp = $sourceReflection->getProperty("initiative");
                    break;
                case DDConst::OWNER_MARKET:
                    $iniProp = $sourceReflection->getProperty("marketEntry");
                    break;
                case DDConst::OWNER_EVENT:
                    $iniProp = $sourceReflection->getProperty("event");
                    break;
            }

            if ($iniProp) {
                $iniProp->setAccessible(true);
                $iniProp->setValue($location, $owner);
            }
        } // else: everything is fine, there are no empty params so supplement from owner

        return $location;
    }
//    public function findAllSupplemented($locale) {
//        $locations = $this->findAllHydrated($locale);
//        $result = array();
//        foreach ($locations as $l) {
//            array_push($result, $this->supplement($l));
//        }
//        return $result;
//    }

    /**
     * @param Location|Actor $location
     * @param $locale
     * @return Actor|null|object
     */
    public function findHydratedOwner(Location $location, $locale)
    {
        if ($location->getMarketEntry() == null && $location->getInitiative() == null && $location->getEvent() == null)
            return null;

        switch ($location->getType()) {
            case DDConst::OWNER_INI:
                return $this->initiativeRepository->hydrate($location->getInitiative(), $locale);
            case DDConst::OWNER_MARKET:
                return $this->marketRepository->findByIdentifier($location->getMarketEntry()->getPersistenceObjectIdentifier());
            case DDConst::OWNER_EVENT:
                return $this->eventRepository->findByIdentifier($location->getEvent()->getPersistenceObjectIdentifier());
        }

        return null;
    }

//    public function supplement(Location $object)
//    {
//        $LOCATION_SUPPLEMENT_PROPS = ["description", "mail", "web", "facebook", "phone", "rating", "category", "speakerPublic", "speakerPrivate", "image", "imageType", "spokenLanguages"];
//
//        if ($object->getMarketEntry() == null && $object->getInitiative() == null && $object->getEvent() == null)
//            return $object;
//
//        switch ($object->getType()) {
//            case DDConst::OWNER_INI:
//                $owner = $this->initiativeRepository->hydrate($object->getInitiative(), $object->getLocale());
//                break;
//            case DDConst::OWNER_MARKET:
//
//                $owner = $this->marketRepository->findByIdentifier($object->getMarketEntry()->getPersistenceObjectIdentifier());
//                break;
//            case DDConst::OWNER_EVENT:
//                $owner = $this->eventRepository->findByIdentifier($object->getEvent()->getPersistenceObjectIdentifier());
//                break;
//            default:
//                return $object;
//        }
//
//        $parentReflection = new ReflectionObject($owner);
//        $sourceReflection = new ReflectionObject($object);
//
//        foreach ($sourceReflection->getProperties() as $property) {
//            if (in_array($property->getName(), $LOCATION_SUPPLEMENT_PROPS)) {
//                $property->setAccessible(true);
//
//                $value = $property->getValue($object);
//                if ($value == NULL || $value == "") {
//                    $name = $property->getName();
//                    if ($parentReflection->hasProperty($name)) {
//                        $parentProperty = $parentReflection->getProperty($name);
//                        $parentProperty->setAccessible(true);
//                        $property->setValue($object, $parentProperty->getValue($owner));
//                    }
//                }
//            }
//            if ($object->getType() == DDConst::OWNER_INI) {
//                $iniProp = $sourceReflection->getProperty("initiative");
//                $iniProp->setAccessible(true);
//                $iniProp->setValue($object, $owner);
//            }
//        }
//
//        return $object;
//    }
}