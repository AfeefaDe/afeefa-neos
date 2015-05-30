<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Location as Location;
use DDFA\Main\Utility\DDConst;
use ReflectionObject;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Persistence\QueryInterface;

/**
 * @Flow\Scope("singleton")
 */
//TODO add docs
class LocationRepository extends AbstractTranslationRepository {
    /**
     * @Flow\Inject
     * @var InitiativeRepository
     */
    protected $initiativeRepository;

    public function findAll() {
        return $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_ASCENDING))->execute();
    }

    public function findAllOfInitiative() {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::LOCATION_INI)
        )->execute();
    }

    public function findAllOfMarket() {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::LOCATION_MARKET)
        )->execute();
    }

    public function findAllOfBasic() {
        $query = $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::LOCATION_BASIC)
        )->execute();
    }

    public function findAllOfEvent() {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        return $query->matching(
            $query->equals('type', DDConst::LOCATION_EVENT)
        )->execute();
    }

    public function findAllOfInitiativeLocalized($locale = DDConst::LOCALE_STD) {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::LOCATION_INI),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->includeLocales($locations);
    }

    public function findAllOfMarketLocalized($locale = DDConst::LOCALE_STD) {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::LOCATION_MARKET),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->includeLocales($locations);
    }

    public function findAllOfBasicLocalized($locale = DDConst::LOCALE_STD) {
        $query = $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_DESCENDING));
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::LOCATION_BASIC),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->includeLocales($locations);
    }

    public function findAllOfEventLocalized($locale = DDConst::LOCALE_STD) {
        $query = $this->createQuery()->setOrderings(array('updated' => QueryInterface::ORDER_DESCENDING));
        $locations = $query->matching(
            $query->logicalAnd(
                $query->equals('type', DDConst::LOCATION_EVENT),
                $query->equals('locale', $locale)
            )
        )->execute();

        return $this->includeLocales($locations);
    }

    public function findAllSupplemented($locale = DDConst::LOCALE_STD) {
        $locations = $this->findAllLocalized($locale);
        $result = array();
        foreach ($locations as $l) {
            array_push($result, $this->supplement($l));
        }
        return $result;
    }

    public function supplement(Location $location) {
        //TODO maybe better store props in another place... one day
        $LOCATION_SUPPLEMENT_PROPS = ["description", "mail", "web", "phone", "speakerPublic", "speakerPrivate", "facebook"];

        $owner = $this->$initiativeRepository->findOneHydrated($location->getInitiative(), $location->getLocale());
        $location = $this->hydrate($location);
        $parentReflection = new ReflectionObject($owner);
        $sourceReflection = new ReflectionObject($location);
        foreach ($sourceReflection->getProperties() as $property) {
            if (in_array($property->getName(), $LOCATION_SUPPLEMENT_PROPS)) {
                $property->setAccessible(true);
                $value = $property->getValue($location);
                if ($value == NULL || $value == "") {
                    $parentProperty = $parentReflection->getProperty($property->getName());
                    $parentProperty->setAccessible(true);
                    $property->setValue($location, $parentProperty->getValue($owner));
                }
            }
        }
        return $location;
    }
}