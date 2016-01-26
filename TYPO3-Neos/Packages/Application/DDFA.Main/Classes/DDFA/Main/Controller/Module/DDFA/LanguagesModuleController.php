<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Language;
use DDFA\Main\Domain\Repository\LanguageRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Neos\Controller\Module\AbstractModuleController;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class LanguagesModuleController extends AbstractModuleController {
    /**
     * @Flow\Inject
     * @var LanguageRepository
     */
    protected $objectRepository;

    /**
     * @return void
     */
    public function indexAction() {
    }

    /**
     * @param Language $viewObject
     * @return void
     */
    public function viewAction(Language $viewObject) {
    }

    /**
     * @return void
     */
    public function addAction() {
    }

    /**
     * @param Language $newObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(Language $newObject) {
    }


    /**
     * @param Language $editObject
     */
    public function editAction(Language $editObject) {
    }

    /**
     * @param Language $editObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(Language $editObject) {
    }

    /**
     * @param Language $deleteObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(Language $deleteObject) {
    }
}