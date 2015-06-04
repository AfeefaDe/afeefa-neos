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
use TYPO3\Flow\Persistence\QueryInterface;

/**
 * @Flow\Scope("singleton")
 */
class LocationRepository extends AbstractTranslationRepository {
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
    public function findAll() {
        return $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_ASCENDING))->execute();
    }

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllOfInitiative() {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::OWNER_INI)
        )->execute();
    }

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllOfMarket() {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::OWNER_MARKET)
        )->execute();
    }

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllOfBasic() {
        $query = $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::OWNER_BASIC)
        )->execute();
    }

    /**
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllOfEvent() {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::OWNER_EVENT)
        )->execute();
    }

    /**
     * @param string $locale
     * @return mixed
     */
    public function findAllOfInitiativeLocalized($locale = DDConst::LOCALE_STD) {
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
    public function findAllOfMarketLocalized($locale = DDConst::LOCALE_STD) {
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
    public function findAllOfBasicLocalized($locale = DDConst::LOCALE_STD) {
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
    public function findAllOfEventLocalized($locale = DDConst::LOCALE_STD) {
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
    public function findAllSupplemented($locale) {
        $locations = $this->findAllHydrated($locale);
        $result = array();
        foreach ($locations as $l) {
            array_push($result, $this->supplement($l));
        }
        return $result;
    }

    /**
     * @param Location $object
     * @return Location
     */
    public function supplement(Location $object) {
        //TODO maybe better store props in another place... one day
        $LOCATION_SUPPLEMENT_PROPS = ["description", "mail", "web", "facebook", "phone", "rating", "category", "speakerPublic", "speakerPrivate", "image", "imageType", "spokenLanguages"];

        if ($object->getMarketEntry() == null && $object->getInitiative() == null && $object->getEvent() == null)
            return $object;

        switch ($object->getType()) {
            case DDConst::OWNER_INI:
                $owner = $this->initiativeRepository->hydrate($object->getInitiative(), $object->getLocale());
                break;
            case DDConst::OWNER_MARKET:

                $owner = $this->marketRepository->findByIdentifier($object->getMarketEntry()->getPersistenceObjectIdentifier());
                break;
            case DDConst::OWNER_EVENT:
                $owner = $this->eventRepository->findByIdentifier($object->getEvent()->getPersistenceObjectIdentifier());
                break;
            default:
                return $object;
        }

        $parentReflection = new ReflectionObject($owner);
        $sourceReflection = new ReflectionObject($object);

        foreach ($sourceReflection->getProperties() as $property) {
            if (in_array($property->getName(), $LOCATION_SUPPLEMENT_PROPS)) {
                $property->setAccessible(true);

                $value = $property->getValue($object);
                if ($value == NULL || $value == "") {
                    $name = $property->getName();
                    if ($parentReflection->hasProperty($name)) {
                        $parentProperty = $parentReflection->getProperty($name);
                        $parentProperty->setAccessible(true);
                        $property->setValue($object, $parentProperty->getValue($owner));
                    }
                }
            }
            //TODO: add hydrated owner in every case, not only if initiative
            if ($object->getType() == DDConst::OWNER_INI) {
                $iniProp = $sourceReflection->getProperty("initiative");
                $iniProp->setAccessible(true);
                $iniProp->setValue($object, $owner);
            }
        }

        return $object;
    }
}