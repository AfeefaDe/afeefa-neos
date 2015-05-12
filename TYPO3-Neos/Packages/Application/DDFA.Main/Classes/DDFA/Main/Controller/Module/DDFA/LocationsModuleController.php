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
        //$this->persistenceManager->persistAll();

        $this->addFlashMessage('A new location has been created successfully.');

        if (isset($_POST['moduleArguments']['localize'])) {
            $editLocation = new Location();
            $editLocation->setPersistenceObjectIdentifier(DDHelpers::createGuid());
            $editLocation->setEntryId($newLocation->getEntryId());
            $editLocation->setLocale("en");
            $editLocation->setType($newLocation->getType());
            $editLocation->setCreated($now);
            $editLocation->setUpdated($now);

            $this->locationRepository->add($editLocation);

            $this->redirect('edit', NULL, NULL, array('editLocation' => $editLocation, 'viewLocation' => $newLocation));
        } else
            $this->redirect('index');
    }

    /**
     * @param Location $location
     * */
    public function selectTranslationAction(Location $location) {
        $viewLocation = $this->locationRepository->findOneLocalized($location, $_POST['moduleArguments']['viewLocale']);
        $editLocation = $this->locationRepository->findOneLocalized($location, $_POST['moduleArguments']['editLocale']);

        if($editLocation == NULL) {
            $editLocation = new Location();
            $editLocation->setPersistenceObjectIdentifier(DDHelpers::createGuid());
            $editLocation->setEntryId($location->getEntryId());
            //TODO proof locale
            $editLocation->setLocale($_POST['moduleArguments']['editLocale']);
            $editLocation->setType($location->getType());
            $now = new DateTime();
            $editLocation->setCreated($now);
            $editLocation->setUpdated($now);

            $this->locationRepository->add($editLocation);
        }

        $this->redirect('edit', NULL, NULL,
            ['editLocation' => ['__identity' => $editLocation->getPersistenceObjectIdentifier()],
                'viewLocation' => ['__identity' => $viewLocation->getPersistenceObjectIdentifier()]]);
    }

    /**
     * @param Location $editLocation
     * @param Location $viewLocation
     */
    public function editAction(Location $editLocation, Location $viewLocation = NULL)
    {
        //die($editLocation->getLocale()." - ".$editLocation->getEntryId()." - ".$editLocation->getName());

        if($viewLocation == NULL || $viewLocation->getPersistenceObjectIdentifier() == $editLocation->getPersistenceObjectIdentifier()) {
            $this->redirect('simpleEdit', NULL, NULL, array('editLocation' => $editLocation));
        } else {
            $this->view->assign('viewLocation', $viewLocation);
            $this->view->assign('editLocation', $editLocation);
            $this->view->assign('inis', $this->initiativeRepository->findAll());
            $this->view->assign('languages', $this->languageRepository->findAll());
        }
    }

    public function simpleEditAction(Location $editLocation) {
        $this->view->assign('editLocation', $editLocation);
        $this->view->assign('inis', $this->initiativeRepository->findAll());
        $this->view->assign('languages', $this->languageRepository->findAll());
    }

    /**
     * @param Location $editLocation
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(Location $editLocation)
    {
        //TODO unsauber:
        $editLocation->setInitiative($this->initiativeRepository->findOneByName($_POST['moduleArguments']['ini']));
        $this->locationRepository->update($editLocation);
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
        $this->addFlashMessage('The location has been removed successfully.');
        $this->redirect('index');
    }

}