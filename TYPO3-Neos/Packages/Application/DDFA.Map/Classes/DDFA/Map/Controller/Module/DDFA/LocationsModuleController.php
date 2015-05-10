<?php
namespace DDFA\Map\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Map".              *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Language;
use DDFA\Main\Domain\Repository\InitiativeRepository;
use DDFA\Main\Domain\Repository\LanguageRepository;
use DDFA\Main\Utility\DDConst;
use DDFA\Map\Domain\Model\Location;
use DDFA\Map\Domain\Repository\LocationRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Persistence\Generic\PersistenceManager;
use TYPO3\Flow\Resource\ResourceManager;
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
     * @var LocationRepository
     */
    protected $locationRepository;

    /**
     * @Flow\Inject
     * @var InitiativeRepository
     */
    protected $initiativeRepository;
    /**
     * @Flow\Inject
     * @var LanguageRepository
     */
    protected $languageRepository;

    /**
     * @return void
     */
    public function indexAction()
    {
        $this->view->assign('locations', $this->locationRepository->findAllLocalized("de"));
        $languages = $this->languageRepository->findAll();
        $this->view->assign('numLanguages', $languages->count());
    }

    /**
     * @param Location $location
     * @return void
     */
    public function viewAction(Location $location)
    {
        $this->view->assign('l', $location);
        $this->view->assign('num', $this->locationRepository->countLocalisations($location->getEntryId()));
    }

    /**
     * @return void
     */
    public function addAction()
    {
        $this->view->assign('inis', $this->initiativeRepository->findAll());
    }

    /**
     * @param Location $newLocation
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(Location $newLocation)
    {
        //TODO sicher unsauber:
        $newLocation->setInitiative($this->initiativeRepository->findOneByName($_POST['moduleArguments']['ini']));

        //TODO id überdenken
        $newLocation->setEntryId(uniqid());

        $newLocation->setLocale("de");

        $newLocation->setType(DDConst::LOCATION_INI);

        $this->locationRepository->add($newLocation);
        $this->addFlashMessage('A new location has been created successfully.');
        $this->redirect('index');
    }

    /**
     * @param Location $location
     * @return void
     */
    public function editAction(Location $location)
    {
        $this->view->assign('updateLocation', $location);
        $this->view->assign('inis', $this->initiativeRepository->findAll());
    }

    /**
     * @param Location $updateLocation
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(Location $updateLocation)
    {
        //TODO sicher unsauber:
        $updateLocation->setInitiative($this->initiativeRepository->findOneByName($_POST['moduleArguments']['ini']));
        $this->locationRepository->update($updateLocation);
        $this->addFlashMessage('The location has been updated successfully.');
        $this->redirect('index');
    }

    /**
     * @param Location $location
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(Location $location)
    {
        $this->locationRepository->remove($location);
        //$this->persistenceManager->persistAll();
        $this->addFlashMessage('The location has been removed successfully.');
        $this->redirect('index');
    }

}