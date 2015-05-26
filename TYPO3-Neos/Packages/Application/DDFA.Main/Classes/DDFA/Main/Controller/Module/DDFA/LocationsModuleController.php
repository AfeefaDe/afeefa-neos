<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Domain\Model\Location as Location;
use DDFA\Main\Domain\Model\Object as Object;
use DDFA\Main\Domain\Repository\InitiativeRepository as InitiativeRepository;
use DDFA\Main\Domain\Repository\LanguageRepository as LanguageRepository;
use DDFA\Main\Domain\Repository\LocationRepository as LocationRepository;
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
     * @param Location $newObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(Location $newObject)
    {
        $newObject->setInitiative($this->initiativeRepository->findOneByName($_POST['moduleArguments']['ini']));
        $this->objectRepository->add($newObject);
        $this->addFlashMessage('A new location has been created successfully.');

        if (isset($_POST['moduleArguments']['localize'])) {
            $editObject = $this->addTranslation($newObject->getEntryId(), DDConst::LOCALE_NXT);
            $this->redirect('edit', NULL, NULL, array('editObject' => $editObject, 'viewObject' => $newObject));

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

    /**
     * @param Location $editObject
     */
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
        }

        $this->addFlashMessage('The location has been updated successfully.');
        $editObject->setUpdated(new DateTime());
        $this->objectRepository->update($editObject);
        $this->redirect('index');
    }

    /**
     * @param Location $deleteObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(Location $deleteObject)
    {
        foreach ($this->objectRepository->findAllLocalisations($deleteObject) as $localisedObject)
            $this->objectRepository->remove($localisedObject);

        $this->addFlashMessage('The location including all its translations has been removed successfully.');
        $this->redirect('index');
    }

    /**
     * @param Location $object
     * @return void
     */
    public function selectTranslationAction(Location $object)
    {
        $editLocale = $_POST['moduleArguments']['editLocale'];
        $viewLocale = $_POST['moduleArguments']['viewLocale'];

        if ($this->languageRepository->findByCode($viewLocale)->count() == 0 ||
            $this->languageRepository->findByCode($editLocale)->count() == 0) {
            $editObject = $this->objectRepository->findOneLocalized($object, DDConst::LOCALE_STD);
            $this->redirect('simpleEdit', NULL, NULL, array('editObject' => $editObject));

        } else {
            $viewObject = $this->objectRepository->findOneLocalized($object, $viewLocale);

            if ($viewObject == NULL) {
                $editObject = $this->objectRepository->findOneLocalized($object, DDConst::LOCALE_STD);
                $this->redirect('simpleEdit', NULL, NULL, array('editObject' => $editObject));

            } else {
                $editObject = $this->objectRepository->findOneLocalized($object, $editLocale);

                if ($editObject == NULL) {
                    $editObject = $this->addTranslation($object->getEntryId(), $editLocale);
                }

                $this->redirect('edit', NULL, NULL,
                    ['editObject' => ['__identity' => $editObject->getPersistenceObjectIdentifier()],
                        'viewObject' => ['__identity' => $viewObject->getPersistenceObjectIdentifier()]]);
            }
        }
    }

    /**
     * @param $entryID
     * @param $locale
     * @return Location
     */
    protected function addTranslation($entryID, $locale)
    {
        $object = new Location();
        $object->setEntryId($entryID);
        $object->setLocale($locale);
        $this->objectRepository->add($object);
        $this->addFlashMessage("A new location translation has been added successfully.");
        return $object;
    }
}