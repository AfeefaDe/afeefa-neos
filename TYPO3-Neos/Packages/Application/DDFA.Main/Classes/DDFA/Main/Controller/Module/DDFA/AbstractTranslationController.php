<?php

namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Neos\Controller\Module\AbstractModuleController;

//TODO improve abstraction of translatable entity controller
abstract class AbstractTranslationController extends AbstractModuleController {

    /**
     * @param $entryID
     * @param $locale
     */
    abstract protected function addTranslation($entryID, $locale);
}