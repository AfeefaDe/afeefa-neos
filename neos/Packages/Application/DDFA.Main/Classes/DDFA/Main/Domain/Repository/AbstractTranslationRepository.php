<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Actor;
use DDFA\Main\Utility\DDConst;
use ReflectionObject;
use TYPO3\Flow\Annotations as Flow;
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
        $query = $this->createQuery()->setOrderings(array('name' => QueryInterface::ORDER_ASCENDING));


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
     * returns only all other localisations of an object, without itself
     *
     * @param Actor $object
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
//    public function findLocalisations(Actor $object)
//    {
//        $query = $this->createQuery()->setOrderings(array('locale' => QueryInterface::ORDER_ASCENDING));
//        return $query->matching(
//            $query->logicalAnd(
//                $query->equals('entryId', $object->getEntryId()),
//                $query->logicalNot(
//                    $query->equals('Persistence_Object_Identifier', $object->getPersistenceObjectIdentifier())
//                )
//            )
//        )->execute();
//    }

    /**
     * @param string $locale
     * @return array
     */
    protected function findAllHydrated($locale)
    {
        $allLocations = $this->findByLocale(DDConst::LOCALE_STD);
        $result = array();
        foreach ($allLocations as $location) {
            array_push($result, $this->hydrate($location, $locale));
        }
        return $result;
    }

    /**
     * @param Actor $object
     * @param string $locale
     * @return Actor
     */
    public function hydrate(Actor $object, $locale)
    {
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
                if ($objectNXT == null || sizeof($this->findEmptyParams($objectNXT)) == sizeof(DDConst::LOCATION_SUPPLEMENT_PROPS))
                    $returnVal = $objectSTD;
                else
                    $returnVal = $this->merge($objectSTD, $objectNXT);
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

                if ($objectNXT != null)
                    $returnVal = $this->merge($objectSTD, $this->merge($objectNXT, $object));
                else
                    $returnVal = $this->merge($objectSTD, $object);
                break;
        }

        return $this->convertImgUri($returnVal);
    }

//    public function hydrate(Actor $object, $locale) {
//        if ($object->getLocale() == DDConst::LOCALE_STD)
//            $objectSTD = $object;
//        else
//            $objectSTD = $this->findOneLocalized($object);
//
//        if ($object->getLocale() != $locale) {
//            $object = $this->findOneLocalized($object, $locale);
//            if($object == null)
//                $object = $objectSTD;
//        }
//
//        if ($object->getLocale() == DDConst::LOCALE_NXT) {
//            $returnVal = $this->merge($objectSTD, $object);
//
//        } else {
//            $objectNXT = $this->findOneLocalized($object, DDConst::LOCALE_NXT);
//            if ($objectNXT != null)
//                $returnVal = $this->merge($objectSTD, $this->merge($objectNXT, $object));
//            else
//                $returnVal = $this->merge($objectSTD, $object);
//        }
//
//        return $this->convertImgUri($returnVal);
//    }

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
     * @return array
     */
    public function findEmptyParams(Actor $object)
    {
        $props = [];
        $reflection = new ReflectionObject($object);

        foreach ($reflection->getProperties() as $property) {
            if (in_array($property->getName(), DDConst::LOCATION_SUPPLEMENT_PROPS)) {
                $property->setAccessible(true);

                $value = $property->getValue($object);
                if ($value == NULL || $value == "") {
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
            if ($hydrateReflection->hasProperty($property->getName())) {
                $hydrateProperty = $hydrateReflection->getProperty($property->getName());
                $hydrateProperty->setAccessible(true);
                $hydrateValue = $hydrateProperty->getValue($hydrateObject);
                if ($hydrateValue != NULL && $hydrateValue != "") {
                    $property->setValue($baseObject, $hydrateValue);
                }
            }
        }
        return $baseObject;
    }

    /**
     * @param Actor $object
     * @return Actor
     */
    protected function convertImgUri(Actor $object)
    {
        $reflection = new ReflectionObject($object);
        if ($reflection->hasProperty("image")) {
            $img = $reflection->getProperty("image");
            $img->setAccessible(true);
            $img->setValue($object, $this->getImgUri($object));
        }

        return $object;
    }

    /**
     * @param Actor $object
     * @return string
     */
    protected function getImgUri(Actor $object)
    {
        $uri = "";
        if ($object->getImage()) {
            $uri = $this->resourceManager->getPersistentResourcesStorageBaseUri();
            $uri .= $this->assetRepository->findByIdentifier($object->getImage())->getResource()->getResourcepointer();
        }
        return $uri;
    }
}