<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Domain\Model\Initiative;
use DDFA\Main\Domain\Model\Object;
use DDFA\Main\Domain\Repository\InitiativeRepository;
use TYPO3\Flow\Annotations as Flow;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class InitiativesModuleController extends AbstractTranslationController
{
    /**
     * @Flow\Inject
     * @var InitiativeRepository
     */
    protected $objectRepository;

    /**
     * @return void
     */
    public function indexAction()
    {
        $this->view->assign('inis', $this->objectRepository->findAll());
    }

    /**
     * @param Initiative $ini
     * @return void
     */
    public function viewAction(Initiative $viewObject)
    {
        $this->view->assign('viewObject', $viewObject);
    }

    /**
     * @return void
     */
    public function addAction()
    {

    }

    /**
     * @param Initiative $newInitiative
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(Initiative $newInitiative)
    {
        //TODO rating
        $newInitiative->setRating(0);

        $this->objectRepository->add($newInitiative);
        $this->addFlashMessage('A new initiative has been created successfully.');
        $this->redirect('index');
    }

    /**
     * @param Initiative $ini
     * @return void
     */
    public function editAction(Initiative $ini)
    {
        $this->view->assign('updateInitiative', $ini);
    }

    /**
     * @param Initiative $updateInitiative
     * @return void
     */
    public function updateAction(Initiative $editObject)
    {
        $editObject->setUpdated(new DateTime());

        $this->objectRepository->update($editObject);
        $this->addFlashMessage('A new initiative has been updated successfully.');
        $this->redirect('index');
    }

    /**
     * @param Initiative $ini
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(Initiative $ini)
    {
        $this->objectRepository->remove($ini);
        $this->addFlashMessage('A new initiative has been removed successfully.');
        $this->redirect('index');
    }

    /**
     * implement this method and create a new object of your class
     *
     * @return \DDFA\Main\Domain\Model\Object
     */
    protected function createTranslation()
    {
        return new Initiative();
    }

    /**
     * @param \DDFA\Main\Domain\Model\Object $object
     * @return mixed
     */
    protected function persistTranslation(Object $object)
    {
        $this->objectRepository->add($object);
        $this->addFlashMessage("A new '" . $object . "' translation has been added successfully.");
    }

    protected function getObjectRepository()
    {
        return $this->objectRepository;
    }
}