<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Tag;
use DDFA\Main\Domain\Repository\TagRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Neos\Controller\Module\AbstractModuleController;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class TagsModuleController extends AbstractModuleController {
    /**
     * @Flow\Inject
     * @var TagRepository
     */
    protected $objectRepository;

    /**
     * @return void
     */
    public function indexAction() {
    }

    /**
     * @param Tag $viewObject
     * @return void
     */
    public function viewAction(Tag $viewObject) {
    }

    /**
     * @return void
     */
    public function addAction() {
    }

    /**
     * @param Tag $newObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(Tag $newObject) {
    }


    /**
     * @param Tag $editObject
     */
    public function editAction(Tag $editObject) {
    }

    /**
     * @param Tag $editObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(Tag $editObject) {
    }

    /**
     * @param Tag $deleteObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(Tag $deleteObject) {
    }
}