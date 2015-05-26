<?php

namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Object;
use TYPO3\Neos\Controller\Module\AbstractModuleController;
use TYPO3\Flow\Annotations as Flow;

//TODO improve abstraction of translatable entity controller
abstract class AbstractTranslationController extends AbstractModuleController{

    /**
     * @param \DDFA\Main\Domain\Model\Object $object
     */
    abstract protected function selectTranslationAction(Object $object);

    /**
     * @param $entryID
     * @param $locale
     */
    abstract protected function addTranslation($entryID, $locale);
}