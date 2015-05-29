<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Actor as Object;
use DDFA\Main\Domain\Model\Actor;
use DDFA\Main\Utility\DDConst;
use ReflectionObject;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Persistence\Repository;

abstract class AbstractTranslationRepository extends Repository
{
    /**
     * returns all objects with a certain locale and adds number of translations (numLocales) and a string of the according locale codes (locales)
     * @return mixed
     */
    public function findAllLocalized()
    {
        $locale = func_num_args() > 0 ? func_get_arg(0) : DDConst::LOCALE_STD;

        $query = $this->createQuery();

        $objects = $query->matching(
            $query->equals('locale', $locale)
        )->execute();

        return $this->includeLocales($objects);
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
    //TODO sophisticate
    //TODO include real languages
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
            $r[$i] = $localisation->getLocale();
            ++$i;
        }
        return $r;
    }

    /**
     * returns a specific localisation of the object (or nothing if requested locale does not exist)
     *
     * @param Actor $object
     * @param $locale
     * @return Object
     */
    public function findOneLocalized(Actor $object, $locale)
    {
        if($object->getLocale() == $object)
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
     * returns only all other localisations of an object, without itself
     *
     * @param Actor $object
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findLocalisations(Actor $object)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->logicalAnd(
                $query->equals('entryId', $object->getEntryId()),
                $query->logicalNot(
                    $query->equals('Persistence_Object_Identifier', $object->getPersistenceObjectIdentifier())
                )
            )
        )->execute();
    }

    /**
     * returns all localisations of an object including itself
     *
     * @param Actor $object
     * @return \TYPO3\Flow\Persistence\QueryResultInterface
     */
    public function findAllLocalisations(Actor $object)
    {
        $query = $this->createQuery();
        return $query->matching(
            $query->equals('entryId', $object->getEntryId())
        )->execute();

    }

    /**
     * hydrated the object, meaning this method fills all empty properties of a translation object with values of the original entry
     *
     * @param Actor $object
     * @return Object
     */
    public function hydrate(Actor $object) {
        if($object->getLocale() != DDConst::LOCALE_STD) {
            $parentEntry = $this->findOneLocalized($object, DDConst::LOCALE_STD);
            $parentReflection = new ReflectionObject($parentEntry);
            $sourceReflection = new ReflectionObject($object);
            foreach($sourceReflection->getProperties() as $property) {
                $property->setAccessible(true);
                $value = $property->getValue($object);
                if($value == NULL || $value == "") {
                    $parentProperty = $parentReflection->getProperty($property->getName());
                    $parentProperty->setAccessible(true);
                    $property->setValue($object, $parentProperty->getValue($parentEntry));
                }
            }
        }
        return $object;
    }
}