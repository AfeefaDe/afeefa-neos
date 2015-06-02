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
use TYPO3\Flow\Resource\ResourceManager;
use TYPO3\Media\Domain\Repository\AssetRepository;

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
     * @Flow\Inject
     * @var ResourceManager
     */
    protected $resourceManager;

    /**
     * @Flow\Inject
     * @var AssetRepository
     */
    protected $assetRepository;

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
     * @param Location $object
     * @param $locale
     * @return Location
     */
    public function findOneHydrated(Location $object, $locale = DDConst::LOCALE_STD) {
        $localizedObject = $this->findOneLocalized($object, $locale);
        return $localizedObject == NULL ? $object : $this->hydrate($localizedObject);
    }

    /**
     * hydrated the object, meaning this method fills all empty properties of a translation object with values of the original entry
     *
     * @param Location|Actor $object
     * @param string $baseLocale
     * @return Location
     */
    public function hydrate(Location $object, $baseLocale = DDConst::LOCALE_STD) {
        $sourceReflection = new ReflectionObject($object);
        if ($object->getLocale() != $baseLocale) {

            //language fallback to English:
            if ($baseLocale != DDConst::LOCALE_NXT) {
                $object = $this->hydrate($object, DDConst::LOCALE_NXT);
            }

            $parentEntry = $this->findOneLocalized($object, $baseLocale);
            $parentReflection = new ReflectionObject($parentEntry);
            foreach ($sourceReflection->getProperties() as $property) {
                $property->setAccessible(true);
                $value = $property->getValue($object);
                if ($value == NULL || $value == "") {
                    if ($parentReflection->hasProperty($property->getName())) {
                        $parentProperty = $parentReflection->getProperty($property->getName());
                        $parentProperty->setAccessible(true);
                        $property->setValue($object, $parentProperty->getValue($parentEntry));
                    }
                }
            }

        }

        $img = $sourceReflection->getProperty("image");
        $img->setAccessible(true);
        $img->setValue($object, $this->getImgUri($object));
        return $object;
    }


    /**
     * @param Location $object
     * @return string
     */
    private function getImgUri(Location $object) {
        $uri = "";
        if ($object->getImage()) {
            $uri = $this->resourceManager->getPersistentResourcesStorageBaseUri();
            $uri .= $this->assetRepository->findByIdentifier($object->getImage())->getResource()->getResourcepointer();
        }
        return $uri;
    }

    /**
     * @param string $locale
     * @return array
     */
    public function findAllSupplemented($locale = DDConst::LOCALE_STD) {
        $locations = $this->findAllLocalized($locale);
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

        $object = $this->hydrate($object);

        switch ($object->getType()) {
            case DDConst::OWNER_INI:
                $owner = $this->initiativeRepository->findOneHydrated($object->getInitiative(), $object->getLocale());
                break;
            case DDConst::OWNER_MARKET:
                if ($object->getMarketEntry() == null)
                    return $object;
                $owner = $this->marketRepository->findByIdentifier($object->getMarketEntry()->getPersistenceObjectIdentifier());
                break;
            case DDConst::OWNER_EVENT:
                if ($object->getEvent() == null)
                    return $object;
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
                    $parentProperty = $parentReflection->getProperty($property->getName());
                    $parentProperty->setAccessible(true);
                    $property->setValue($object, $parentProperty->getValue($owner));
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