<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Domain\Model\Language;
use DDFA\Main\Domain\Model\Location;
use DDFA\Main\Domain\Model\Object;
use DDFA\Main\Domain\Repository\InitiativeRepository;
use DDFA\Main\Domain\Repository\LanguageRepository;
use DDFA\Main\Domain\Repository\LocationRepository;
use DDFA\Main\Utility\DDConst;
use TYPO3\Flow\Annotations as Flow;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class LocationsModuleController extends AbstractTranslationController
{
    /**
     * @Flow\Inject
     * @var LocationRepository
     */
    protected $objectRepository;

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
        $this->view->assign('iniLocations', $this->objectRepository->findAllOfInitiativeLocalized(DDConst::LOCALE_STD));
        $this->view->assign('numLanguages', $this->languageRepository->findAll()->count() - 1);
    }

    /**
     * @param Location $viewObject
     * @return void
     */
    public function viewAction(Location $viewObject)
    {
        if (isset($_POST['viewLocale']) && $_POST['viewLocale'] != DDConst::LOCALE_STD) {
            $this->redirect('view', NULL, NULL, array('viewObject' => $this->objectRepository->findOneLocalized($viewObject, $_POST['viewLocale'])));

        } else {
            if ($viewObject->getLocale() != DDConst::LOCALE_STD)
                $viewObject = $this->objectRepository->hydrate($viewObject);

            $this->view->assign('viewObject', $viewObject);
            $this->view->assign('languages', $this->objectRepository->findLocales($viewObject));
        }
    }

    /**
     * @return void
     */
    public function addAction()
    {
        $this->view->assign('inis', $this->initiativeRepository->findAllLocalized());
    }

    /**
     * @param Location $newLocation
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(Location $newLocation)
    {
        $newLocation->setInitiative($this->initiativeRepository->findOneByName($_POST['moduleArguments']['ini']));
        $this->objectRepository->add($newLocation);
        $this->addFlashMessage('A new location has been created successfully.');

        if (isset($_POST['moduleArguments']['localize'])) {
            $editObject = $this->addTranslation($newLocation->getEntryId(), DDConst::LOCALE_NXT, $newLocation->getType());
            $this->objectRepository->add($editObject);
            $this->addFlashMessage("A new 'en' translation has been added successfully.");
            $this->redirect('edit', NULL, NULL, array('editObject' => $editObject, 'viewObject' => $newLocation));

        } else
            $this->redirect('index');
    }

    /**
     * @param Location $editObject
     * @param Location $viewObject
     */
    public function editAction(Location $editObject, Location $viewObject)
    {
        $this->view->assign('viewObject', $this->objectRepository->hydrate($viewObject));
        $this->view->assign('editObject', $editObject);
        $this->view->assign('editLanguages', $this->languageRepository->findAll());
        $this->view->assign('viewLanguages', $this->objectRepository->findAllLocales($viewObject));
    }

    public function simpleEditAction(Location $editObject)
    {
        if ($editObject->getLocale() != DDConst::LOCALE_STD) {
            $viewObject = $this->objectRepository->findOneLocalized($editObject, DDConst::LOCALE_STD);
            $this->redirect('edit', NULL, NULL,
                ['editObject' => ['__identity' => $editObject->getPersistenceObjectIdentifier()],
                    'viewObject' => ['__identity' => $viewObject->getPersistenceObjectIdentifier()]]);
        } else {
            $this->view->assign('editObject', $editObject);
            $this->view->assign('inis', $this->initiativeRepository->findAllLocalized());
            $this->view->assign('languages', $this->languageRepository->findAll());
        }
    }

    /**
     * @param Location $editObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(Location $editObject)
    {
        if (isset($_POST['moduleArguments']['ini'])) {
            $ini = $_POST['moduleArguments']['ini'];
            $editObject->setInitiative($this->initiativeRepository->findOneByName($ini));
            $editObject->setUpdated(new DateTime());
            $this->addFlashMessage('The location has been updated successfully.');

        } else {
            $this->addFlashMessage('The translation has been updated successfully.');
        }

        $this->objectRepository->update($editObject);
        $this->redirect('index');
    }

    /**
     * @param Location $location
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(Location $location)
    {
        foreach ($this->objectRepository->findAllLocalisations($location) as $localisedLocation)
            $this->objectRepository->remove($localisedLocation);

        $this->addFlashMessage('The location including all its translations has been removed successfully.');
        $this->redirect('index');
    }

    protected function createTranslation()
    {
        return new Location();
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