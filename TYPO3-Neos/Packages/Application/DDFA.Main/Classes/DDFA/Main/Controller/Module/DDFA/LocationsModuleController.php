<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".              *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Domain\Model\Language;
use DDFA\Main\Domain\Model\Location;
use DDFA\Main\Domain\Repository\InitiativeRepository;
use DDFA\Main\Domain\Repository\LanguageRepository;
use DDFA\Main\Domain\Repository\LocationRepository;
use DDFA\Main\Utility\DDConst;
use DDFA\Main\Utility\DDHelpers;
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
        $this->view->assign('numLanguages', $this->languageRepository->findAll()->count());
    }

    /**
     * @param Location $location
     * @return void
     */
    public function viewAction(Location $location)
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
     * @param Location $newLocation
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(Location $newLocation)
    {
        //TODO unsauber:
        $newLocation->setInitiative($this->initiativeRepository->findOneByName($_POST['moduleArguments']['ini']));

        $newLocation->setEntryId(uniqid());
        $newLocation->setLocale("de");
        $newLocation->setType(DDConst::LOCATION_INI);

        $now = new DateTime();
        $newLocation->setCreated($now);
        $newLocation->setUpdated($now);

        $newLocation->setPersistenceObjectIdentifier(DDHelpers::createGuid());

        $this->locationRepository->add($newLocation);
        $this->addFlashMessage('A new location has been created successfully.');

        if (isset($_POST['moduleArguments']['localize']))
            $this->redirect('edit', NULL, NULL, array('location' => $newLocation));
        else
            $this->redirect('index');
    }

    /**
     * @param Location $location
     * @return void
     */
    public function editAction(Location $location)
    {
        $this->locationRepository->findLocalisations($location);

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