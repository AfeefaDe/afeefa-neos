<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Domain\Model\Initiative;
use DDFA\Main\Domain\Repository\InitiativeRepository;
use DDFA\Main\Utility\DDHelpers;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Persistence\Generic\PersistenceManager;
use TYPO3\Neos\Controller\Module\AbstractModuleController;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class InitiativesModuleController extends AbstractModuleController
{
    /**
     * @Flow\Inject
     * @var PersistenceManager
     */
    protected $persistenceManager;

    /**
     * @Flow\Inject
     * @var InitiativeRepository
     */
    protected $initiativeRepository;

    /**
     * @return void
     */
    public function indexAction()
    {
        $this->view->assign('inis', $this->initiativeRepository->findAll());
    }

    /**
     * @param Initiative $ini
     * @return void
     */
    public function viewAction(Initiative $ini)
    {
        $this->view->assign('ini', $ini);
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
        $newInitiative->setEntryId(uniqid());
        $newInitiative->setLocale(DDConst::DE_LOCALE);
        $newInitiative->setRating(0);

        $now = new DateTime();
        $newInitiative->setCreated($now);
        $newInitiative->setUpdated($now);
        $newInitiative->setPersistenceObjectIdentifier(DDHelpers::createGuid());

        $this->initiativeRepository->add($newInitiative);
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
    public function updateAction(Initiative $updateInitiative)
    {
        $updateInitiative->setUpdated(new DateTime());

        $this->initiativeRepository->update($updateInitiative);
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
        $this->initiativeRepository->remove($ini);
        $this->addFlashMessage('A new initiative has been removed successfully.');
        $this->redirect('index');
    }

}