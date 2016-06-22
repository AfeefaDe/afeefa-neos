<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Actor;
use DDFA\Main\Domain\Model\MarketEntry;
use DDFA\Main\Utility\DDConst;
use ReflectionObject;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Log\Logger;
use TYPO3\Flow\Persistence\QueryInterface;
use TYPO3\Flow\Persistence\Repository;
use TYPO3\Flow\Resource\ResourceManager;
use TYPO3\Media\Domain\Repository\AssetRepository;

abstract class AbstractTranslationRepository extends Repository
{
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
     * returns all objects with a certain locale and adds number of translations (numLocales) and a string of the according locale codes (locales)
     * @param string $locale
     * @param bool $onlyPublished
     * @return mixed
     */
    public function findAllLocalized($locale = DDConst::LOCALE_STD, $onlyPublished = false)
    {
        $query = $this->createQuery()->setOrderings(array('created' => QueryInterface::ORDER_DESCENDING));

        if ($onlyPublished) {
            $query = $query->matching(
                $query->logicalAnd(
                    $query->equals('published', '1'), $query->equals('locale', $locale)
                )
            );

        } else {
            $query = $query->matching(
                $query->equals('locale', $locale)
            );
        }

        return $this->includeLocales($query->execute());
    }

    /**
     * @param null $area
     * @return mixed
     */
    public function findAllParents($area = null)
    {
        $query = $this->createQuery()->setOrderings(array('created' => QueryInterface::ORDER_DESCENDING));

        $locale = DDConst::LOCALE_STD;

        if ($area != null) {
            $query = $query->matching($query->logicalAnd(
                $query->equals('locale', $locale),
                $query->equals('parentEntry', null),
                $query->equals('area', $area)
            ));
        } else {
            $query = $query->matching($query->logicalAnd(
                $query->equals('locale', $locale),
                $query->equals('parentEntry', null)
            ));
        }

        return $this->includeLocales($query->execute());
    }

    /**
     * @param MarketEntry $me
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllParentsWithout(MarketEntry $me, $area = null)
    {
        $query = $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_ASCENDING));

        $locale = DDConst::LOCALE_STD;

        if ($area != null) {
            $query = $query->matching($query->logicalAnd(
                $query->equals('locale', $locale),
                $query->equals('parentEntry', null),
                $query->equals('area', $area),
                $query->equals('type', DDConst::OWNER_INI),
                $query->logicalNot($query->equals('Persistence_Object_Identifier', $me->getPersistenceObjectIdentifier()))
            ));
        } else {
            $query = $query->matching($query->logicalAnd(
                $query->equals('locale', $locale),
                $query->equals('parentEntry', null),
                $query->equals('type', DDConst::OWNER_INI),
                $query->logicalNot($query->equals('Persistence_Object_Identifier', $me->getPersistenceObjectIdentifier()))
            ));
        }

        return $query->execute();
    }


    /**
     * adds number of translations (numLocales) and a string of the according locale codes (locales) to a number of objects
     * @param $objects
     * @return mixed
     */
    protected function includeLocales($objects)
    {
        foreach ($objects as $o) {
            $locales = $this->findLocales($o);
            $o->numLocales = sizeof($locales);
            $o->locales = join(", ", $locales);
        }
        return $objects;
    }

    /**
     * returns array of all other locale codes of available translations of the object (without its locale)
     *
     * @param Actor $object
     * @return array
     */
    //TODO sophisticate and include real languages
    public function findLocales(Actor $object)
    {
        $r = array();
        $i = 0;
        foreach ($this->findAllLocalisations($object) as $localisation) {
            $locale = $localisation->getLocale();
            if ($object->getLocale() != $locale) {
                $r[$i] = $locale;
                ++$i;
            }
        }
        return $r;
    }

    /**
     * returns all localisations of an object including itself
     *
     * @param Actor $object
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllLocalisations(Actor $object)
    {
        $query = $this->createQuery()->setOrderings(array('locale' => QueryInterface::ORDER_ASCENDING));
        return $query->matching(
            $query->equals('entryId', $object->getEntryId())
        )->execute();
    }

    /**
     * returns array of locale codes of all available translations of the object
     *
     * @param Actor $object
     * @return array
     */
    public function findAllLocales(Actor $object)
    {
        $r = array();
        $i = 0;

        foreach ($this->findAllLocalisations($object) as $localisation) {
            $lan = $this->languageRepository->findByCode($localisation->getLocale())->getFirst();
            if ($lan != null) {
                $r[$i] = ['language' => $lan->getLanguage(), 'code' => $lan->getCode()];
                ++$i;
            }
        }

        return $r;
    }

    /**
     * @param Actor $object
     * @param string $locale
     * @param $type
     * @return Actor
     */
    public function hydrate(Actor $object, $locale, $type)
    {
        $returnVal = null;
        $objectNXT = null;
        if ($object->getLocale() == DDConst::LOCALE_NXT)
            $objectNXT = $object;

        if ($object->getLocale() == DDConst::LOCALE_STD)
            $objectSTD = $object;
        else {
            $objectSTD = $this->findOneLocalized($object);
        }

        switch ($locale) {
            case DDConst::LOCALE_STD:
                $returnVal = $objectSTD;
                break;
            case DDConst::LOCALE_NXT:
                if ($objectNXT == null)
                    $objectNXT = $this->findOneLocalized($object, DDConst::LOCALE_NXT);

                //todo: second test maybe not efficient
                switch ($type) {
                    case DDConst::OWNER_MARKET:
                        $params = DDConst::ME_SUPPLEMENT_PROPS;
                        break;
                    case DDConst::LOCATION:
                        $params = DDConst::L_HYDRATE_PROPS;
                        break;
                    default:
                        $params = [];
                }

                if ($objectNXT == null || sizeof($this->findEmptyParams($objectNXT, $params)) == sizeof($params))
                    $returnVal = $objectSTD;
                else {
                    switch ($type) {
                        case DDConst::OWNER_MARKET:
                            $returnVal = $this->mergeME($objectSTD, $objectNXT);

                            break;
                        case DDConst::LOCATION:
                            $returnVal = $this->merge($objectSTD, $objectNXT);

                            break;
                    }
                }


                break;
            default:
                if ($objectNXT == null)
                    $objectNXT = $this->findOneLocalized($object, DDConst::LOCALE_NXT);

                if ($object->getLocale() != $locale) {
                    $realObject = $this->findOneLocalized($object, $locale);
                    if ($realObject != null)
                        $object = $realObject;
                    else {
                        if ($objectNXT != null)
                            $object = $objectNXT;
                        else
                            $object = $objectSTD;
                    }
                }

                if ($objectNXT != null) {
                    switch ($type) {
                        case DDConst::OWNER_MARKET:
                            $returnVal = $this->mergeME($objectSTD, $this->merge($objectNXT, $object));
                            break;
                        case DDConst::LOCATION:
                            $returnVal = $this->merge($objectSTD, $this->merge($objectNXT, $object));
                            break;
                    }
                } else {
                    switch ($type) {
                        case DDConst::OWNER_MARKET:
                            $returnVal = $this->mergeME($objectSTD, $object);
                            break;
                        case DDConst::LOCATION:
                            $returnVal = $this->merge($objectSTD, $object);
                            break;
                    }
                }
                break;
        }

        return $returnVal;
    }

    /**
     * returns a specific localisation of the object (or nothing if requested locale does not exist)
     *
     * @param Actor $object
     * @param $locale
     * @return Actor
     */
    public function findOneLocalized(Actor $object, $locale = DDConst::LOCALE_STD)
    {
        if ($object->getLocale() == $object)
            return $object;

        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd(
                $query->equals('entryId', $object->getEntryId()),
                $query->equals('locale', $locale)
            )
        )->execute()->getFirst();
    }

    /**
     * @param Actor $object
     * @param $params
     * @return array
     */
    public function findEmptyParams(Actor $object, $params)
    {
        if (sizeof($params) == 0)
            return [];

        $props = [];
        $reflection = new ReflectionObject($object);

        foreach ($reflection->getProperties() as $property) {
            if (in_array($property->getName(), $params)) {
                $property->setAccessible(true);

                $value = $property->getValue($object);
                if ($value == null || $value == "") {
                    array_push($props, $property->getName());
                }
            }
        }
        return $props;
    }

    /**
     * @param Actor $baseObject
     * @param Actor $hydrateObject
     * @return Actor
     */
    protected function merge(Actor $baseObject, Actor $hydrateObject)
    {
        if ($baseObject->getLocale() == $hydrateObject->getLocale()) {
            return $baseObject;
        }

        $baseReflection = new ReflectionObject($baseObject);
        $hydrateReflection = new ReflectionObject($hydrateObject);
        foreach ($baseReflection->getProperties() as $property) {
            $property->setAccessible(true);
            $name = $property->getName();

            if ($hydrateReflection->hasProperty($name)) {
                $hydrateProperty = $hydrateReflection->getProperty($name);
                $hydrateProperty->setAccessible(true);
                $hydrateValue = $hydrateProperty->getValue($hydrateObject);
                if ($hydrateValue != NULL && $hydrateValue != "") {
                    if ($name != "location") {
                        $property->setValue($baseObject, $hydrateValue);
                    }
                }
            }
        }

        return $baseObject;
    }

    /**
     * @param Actor $baseObject
     * @param Actor $hydrateObject
     * @return Actor
     */
    protected function mergeME(Actor $baseObject, Actor $hydrateObject)
    {
        if ($baseObject->getLocale() == $hydrateObject->getLocale()) {
            return $baseObject;
        }

        $baseObject->getLocation()->first();

        $baseReflection = new ReflectionObject($baseObject);
        $hydrateReflection = new ReflectionObject($hydrateObject);
        foreach ($baseReflection->getProperties() as $property) {
            $property->setAccessible(true);
            $name = $property->getName();

            if ($hydrateReflection->hasProperty($name)) {
                $hydrateProperty = $hydrateReflection->getProperty($name);
                $hydrateProperty->setAccessible(true);
                $hydrateValue = $hydrateProperty->getValue($hydrateObject);
                if ($hydrateValue != NULL && $hydrateValue != "") {
                    if ($name != "location") {
                        $property->setValue($baseObject, $hydrateValue);
                    }
                }
            }
        }

        return $baseObject;
    }

}