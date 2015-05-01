<?php
namespace DDFA\Map\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Map".              *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Repository\InitiativeRepository;
use DDFA\Map\Domain\Model\IniLocation;
use DDFA\Map\Domain\Repository\IniLocationRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Persistence\Generic\PersistenceManager;
use TYPO3\Neos\Controller\Module\AbstractModuleController;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class LocationsModuleController extends AbstractModuleController
{
    /**
     * @Flow\Inject
     * @var PersistenceManager
     */
   protected $persistenceManager;

    /**
     * @Flow\Inject
     * @var IniLocationRepository
     */
    protected $iniLocationRepository;

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
        $this->view->assign('locations', $this->iniLocationRepository->findAll());
    }

    /**
     * @param IniLocation $location
     * @return void
     */
    public function viewAction(IniLocation $location)
    {
        $this->view->assign('l', $location);
    }

    /**
     * @return void
     */
    public function addAction()
    {
        $this->view->assign('inis', $this->initiativeRepository->findAll());
    }

    /**
     * @param IniLocation $newLocation
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(IniLocation $newLocation)
    {
        //TODO sicher unsauber:
        $newLocation->setInitiative($this->initiativeRepository->findOneByName($_POST['moduleArguments']['ini']));
        $this->iniLocationRepository->add($newLocation);
        $this->addFlashMessage('A new location has been created successfully.');
        $this->redirect('index');
    }

    /**
     * @param IniLocation $location
     * @return void
     */
    public function editAction(IniLocation $location)
    {
        $this->view->assign('updateLocation', $location);
        $this->view->assign('inis', $this->initiativeRepository->findAll());
    }

    /**
     * @param IniLocation $updateLocation
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(IniLocation $updateLocation)
    {
        //TODO sicher unsauber:
        $updateLocation->setInitiative($this->initiativeRepository->findOneByName($_POST['moduleArguments']['ini']));
        $this->iniLocationRepository->update($updateLocation);
        $this->addFlashMessage('The location has been updated successfully.');
        $this->redirect('index');
    }

    /**
     * @param IniLocation $location
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(IniLocation $location)
    {
        $this->iniLocationRepository->remove($location);
        $this->persistenceManager->persistAll();
        $this->addFlashMessage('The location has been removed successfully.');
        $this->redirect('index');
    }

}