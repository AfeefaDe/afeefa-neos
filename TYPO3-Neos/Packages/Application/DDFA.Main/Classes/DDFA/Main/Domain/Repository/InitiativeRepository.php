<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Actor;
use DDFA\Main\Domain\Model\Initiative;
use DDFA\Main\Utility\DDConst;
use ReflectionObject;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Scope("singleton")
 */
class InitiativeRepository extends AbstractTranslationRepository {

    /**
     * @param Initiative $object
     * @param $locale
     * @return Initiative
     */
    public function findOneHydrated(Initiative $object, $locale = DDConst::LOCALE_STD) {
        $localizedObject = $this->findOneLocalized($object, $locale);
        return $localizedObject == NULL ? $object : $this->hydrate($localizedObject);
    }

    /**
     * hydrated the object, meaning this method fills all empty properties of a translation object with values of the original entry
     *
     * @param Initiative|Actor $object
     * @param string $baseLocale
     * @return Initiative
     */
    public function hydrate(Initiative $object, $baseLocale = DDConst::LOCALE_STD) {
        if ($object->getLocale() != $baseLocale) {

            //language fallback to English:
            if ($baseLocale != DDConst::LOCALE_NXT) {
                $object = $this->hydrate($object, DDConst::LOCALE_NXT);
            }

            $parentEntry = $this->findOneLocalized($object, $baseLocale);
            $parentReflection = new ReflectionObject($parentEntry);
            $sourceReflection = new ReflectionObject($object);
            foreach ($sourceReflection->getProperties() as $property) {
                $property->setAccessible(true);
                $value = $property->getValue($object);
                if ($value == NULL || $value == "") {
                    $parentProperty = $parentReflection->getProperty($property->getName());
                    $parentProperty->setAccessible(true);
                    $property->setValue($object, $parentProperty->getValue($parentEntry));
                }
            }
        }
        return $object;
    }
}