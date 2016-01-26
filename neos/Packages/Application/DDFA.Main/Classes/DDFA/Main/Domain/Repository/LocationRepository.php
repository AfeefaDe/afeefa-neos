<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Actor;
use DDFA\Main\Domain\Model\Event;
use DDFA\Main\Domain\Model\Initiative;
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
     * @param bool $onlyPublished
     * @return array
     */
    public function findAllSupplemented($locale, $onlyPublished = false)
    {
        //find German location, to make sure, that, every entry is included, even if not translated in $locale
        $locations = $this->findAllLocalized(DDConst::LOCALE_STD, $onlyPublished);

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
        // comment in, if only display locations with published owner, otherwise published attribute of owner is ignored:

        if ($onlyPublished) {
            $owner = $this->findOwner($location);
            if ($owner != null && ($owner->getPublished() == null || $owner->getPublished() != 1))
                return null;
        }

        if ($locale == null)
            $locale = $location->getLocale();

        return $this->supplementFromOwner($this->hydrate($this->findOneLocalized($location, DDConst::LOCALE_STD), $locale), $locale);
    }

    /**
     * @param Location $location
     * @return null|Actor
     */
    public function findOwner(Location $location)
    {
        if ($location->getMarketEntry() == null && $location->getInitiative() == null && $location->getEvent() == null)
            return null;

        switch ($location->getType()) {
            case DDConst::OWNER_INI:
                return $this->initiativeRepository->findByIdentifier($location->getInitiative()->getPersistenceObjectIdentifier());
            case DDConst::OWNER_MARKET:
                return $this->marketRepository->findByIdentifier($location->getMarketEntry()->getPersistenceObjectIdentifier());
            case DDConst::OWNER_EVENT:
                return $this->eventRepository->findByIdentifier($location->getEvent()->getPersistenceObjectIdentifier());
        }

        return null;
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

    /**
     * @param Location|Actor $location
     * @param $locale
     * @return null|Actor
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

    /**
     * @param Actor|Initiative|MarketEntry|Event $owner
     * @return boolean
     */
    public function existsReferringLocation(Actor $owner)
    {
        $query = $this->createQuery();

        if ($owner instanceof MarketEntry)
            $query->matching($query->equals('marketEntry', $owner->getPersistenceObjectIdentifier()));
        else if ($owner instanceof Initiative)
            $query->matching($query->equals('initiative', $owner->getPersistenceObjectIdentifier()));
        else if ($owner instanceof Event)
            $query->matching($query->equals('event', $owner->getPersistenceObjectIdentifier()));
        else
            return false;

        echo $query->execute()->count();

        return $query->execute()->count() != 0;
    }
}