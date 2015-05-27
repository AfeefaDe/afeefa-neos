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
        $this->view->assign('iniLocations', $this->locationRepository->findAllOfInitiativeLocalized(DDConst::LOCALE_STD));
        $this->view->assign('numLanguages', $this->languageRepository->findAll()->count() - 1);
    }

    /**
     * @param Location $viewLocation
     * @return void
     */
    public function viewAction(Location $viewLocation)
    {
        if(isset($_POST['viewLocale']) && $_POST['viewLocale'] != DDConst::LOCALE_STD) {
            $this->redirect('view', NULL, NULL, array('viewLocation' => $this->locationRepository->findOneLocalized($viewLocation, $_POST['viewLocale'])));
        } else {
            if ($viewLocation->getLocale() != DDConst::LOCALE_STD) {
                $viewLocation = $this->locationRepository->hydrate($viewLocation);
            }
            $this->view->assign('viewLocation', $viewLocation);
            $this->view->assign('languages', $this->locationRepository->findLocales($viewLocation));
        }
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
        $newLocation->setInitiative($this->initiativeRepository->findOneByName($_POST['moduleArguments']['ini']));

        $newLocation->setPersistenceObjectIdentifier(DDHelpers::createGuid());
        $newLocation->setEntryId(uniqid());
        $newLocation->setLocale(DDConst::LOCALE_STD);
        $newLocation->setType(DDConst::LOCATION_INI);
        $now = new DateTime();
        $newLocation->setCreated($now);
        $newLocation->setUpdated($now);

        $this->locationRepository->add($newLocation);
        $this->addFlashMessage('A new location has been created successfully.');

        if (isset($_POST['moduleArguments']['localize'])) {
            $editLocation = new Location();
            $editLocation->setPersistenceObjectIdentifier(DDHelpers::createGuid());
            $editLocation->setEntryId($newLocation->getEntryId());
            $editLocation->setLocale(DDConst::LOCALE_NXT);
            $editLocation->setType($newLocation->getType());
            $editLocation->setCreated($now);
            $editLocation->setUpdated($now);

            $this->locationRepository->add($editLocation);
            $this->addFlashMessage("A new 'en' translation has been added successfully.");

            $this->redirect('edit', NULL, NULL, array('editLocation' => $editLocation, 'viewLocation' => $newLocation));
        } else
            $this->redirect('index');
    }

    /**
     * @param Location $location
     * */
    public function selectTranslationAction(Location $location) {
        $editLocale = $_POST['moduleArguments']['editLocale'];
        $viewLocale = $_POST['moduleArguments']['viewLocale'];

        if($this->languageRepository->findByCode($viewLocale)->count() == 0 ||
            $this->languageRepository->findByCode($editLocale)->count() == 0) {
            $editLocation = $this->locationRepository->findOneLocalized($location, DDConst::LOCALE_STD);
            $this->redirect('simpleEdit', NULL, NULL, array('editLocation' => $editLocation));
        } else {

            $viewLocation = $this->locationRepository->findOneLocalized($location, $viewLocale);

            if ($viewLocation == NULL) {
                $editLocation = $this->locationRepository->findOneLocalized($location, DDConst::LOCALE_STD);
                $this->redirect('simpleEdit', NULL, NULL, array('editLocation' => $editLocation));
            } else {

                $editLocation = $this->locationRepository->findOneLocalized($location, $editLocale);

                if ($editLocation == NULL) {
                    $editLocation = new Location();
                    $editLocation->setPersistenceObjectIdentifier(DDHelpers::createGuid());
                    $editLocation->setEntryId($location->getEntryId());
                    $editLocation->setLocale($editLocale);
                    $editLocation->setType($location->getType());
                    $now = new DateTime();
                    $editLocation->setCreated($now);
                    $editLocation->setUpdated($now);

                    $this->locationRepository->add($editLocation);
                    $this->addFlashMessage("A new '".$editLocale."' translation has been added successfully.");
                }

                $this->redirect('edit', NULL, NULL,
                    ['editLocation' => ['__identity' => $editLocation->getPersistenceObjectIdentifier()],
                        'viewLocation' => ['__identity' => $viewLocation->getPersistenceObjectIdentifier()]]);
            }
        }
    }

    /**
     * @param Location $editLocation
     * @param Location $viewLocation
     */
    public function editAction(Location $editLocation, Location $viewLocation)
    {
        $this->view->assign('viewLocation', $viewLocation);
        $this->view->assign('editLocation', $editLocation);
        $this->view->assign('editLanguages', $this->languageRepository->findAll());
        $this->view->assign('viewLanguages', $this->locationRepository->findLocales($viewLocation));
    }

    public function simpleEditAction(Location $editLocation) {
        if($editLocation->getLocale() != DDConst::LOCALE_STD) {
            $viewLocation = $this->locationRepository->findOneLocalized($editLocation, DDConst::LOCALE_STD);
            $this->redirect('edit', NULL, NULL,
                ['editLocation' => ['__identity' => $editLocation->getPersistenceObjectIdentifier()],
                    'viewLocation' => ['__identity' => $viewLocation->getPersistenceObjectIdentifier()]]);
        } else {
            $this->view->assign('editLocation', $editLocation);
            $this->view->assign('inis', $this->initiativeRepository->findAll());
            $this->view->assign('languages', $this->languageRepository->findAll());
        }
    }

    /**
     * @param Location $editLocation
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(Location $editLocation)
    {
        if(isset($_POST['moduleArguments']['ini'])) {
            $ini = $_POST['moduleArguments']['ini'];
            $editLocation->setInitiative($this->initiativeRepository->findOneByName($ini));
            $this->addFlashMessage('The location has been updated successfully.');
        } else {
            $this->addFlashMessage('The translation has been updated successfully.');
        }
        $this->locationRepository->update($editLocation);
        $this->redirect('index');
    }

    /**
     * @param Location $location
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(Location $location)
    {
        foreach($this->locationRepository->findAllLocalisations($location) as $localisedLocation)
            $this->locationRepository->remove($localisedLocation);

        $this->addFlashMessage('The location including all its translations has been removed successfully.');
        $this->redirect('index');
    }

}