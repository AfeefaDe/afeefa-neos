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
use TYPO3\Flow\Resource\ResourceManager;
use TYPO3\Media\Domain\Repository\AssetRepository;

/**
 * @Flow\Scope("singleton")
 */
class InitiativeRepository extends AbstractTranslationRepository {
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
     * @param Initiative $object
     * @return string
     */
    private function getImgUri(Initiative $object) {
        $uri = "";
        if ($object->getImage()) {
            $uri = $this->resourceManager->getPersistentResourcesStorageBaseUri();
            $uri .= $this->assetRepository->findByIdentifier($object->getImage())->getResource()->getResourcepointer();
        }
        return $uri;
    }
}