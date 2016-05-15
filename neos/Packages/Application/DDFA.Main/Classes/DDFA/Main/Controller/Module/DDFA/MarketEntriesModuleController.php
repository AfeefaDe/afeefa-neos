<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Domain\Model\Location;
use DDFA\Main\Domain\Model\MarketEntry;
use DDFA\Main\Domain\Repository\CategoryRepository;
use DDFA\Main\Domain\Repository\LanguageRepository as LanguageRepository;
use DDFA\Main\Domain\Repository\LocationRepository;
use DDFA\Main\Domain\Repository\MarketEntryRepository;
use DDFA\Main\Utility\DDConst;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Error\Message;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class MarketEntriesModuleController extends AbstractTranslationController
{
    /**
     * @Flow\Inject
     * @var MarketEntryRepository
     */
    protected $objectRepository;

    /**
     * @Flow\Inject
     * @var LanguageRepository
     */
    protected $languageRepository;

    /**
     * @Flow\Inject
     * @var CategoryRepository
     */
    protected $categoryRepository;

    /**
     * @Flow\Inject
     * @var LocationRepository
     */
    protected $locationRepository;

    /**
     * @return void
     */
    public function indexAction()
    {
        $this->view->assign('entries', $this->objectRepository->findAllParents());
        $this->view->assign('numLanguages', $this->languageRepository->findAll()->count() - 1);
    }

    /**
     * @param MarketEntry $viewObject
     * @return void
     */
    public function viewAction(MarketEntry $viewObject)
    {
        if (isset($_POST['viewLocale']) && $_POST['viewLocale'] != DDConst::LOCALE_STD) {
            $this->redirect('view', NULL, NULL, array('viewObject' => $this->objectRepository->findOneLocalized($viewObject, $_POST['viewLocale'])));

        } else {
            $viewObject = $this->objectRepository->hydrate($viewObject, $viewObject->getLocale(), DDConst::OWNER_MARKET);

            $this->view->assign('viewObject', $viewObject);
            $this->view->assign('languages', $this->objectRepository->findLocales($viewObject));
        }
    }

    /**
     * @return void
     */
    public function addAction()
    {
        $this->view->assign('cats', $this->categoryRepository->findAll());
        $this->view->assign('parents', $this->objectRepository->findAllParents());
    }

    /**
     * @param MarketEntry $newObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(MarketEntry $newObject)
    {
        $this->objectRepository->add($newObject);
        $this->addFlashMessage('A new market entry has been created successfully.');

        if ($this->validateForm($newObject)) {
            if (isset($_POST['moduleArguments']['localize'])) {
                $editObject = $this->addTranslation($newObject->getEntryId(), DDConst::LOCALE_NXT);
                $this->redirect('edit', NULL, NULL, array('editObject' => $editObject, 'viewObject' => $newObject));
            } else
                $this->redirect('index');
        } else {
            $this->redirect('simpleEdit', NULL, NULL,
                ['editObject' => ['__identity' => $newObject->getPersistenceObjectIdentifier()]]);
        }
    }

    /**
     * @param $entryID
     * @param $locale
     * @return MarketEntry
     */
    protected function addTranslation($entryID, $locale)
    {
        $object = new MarketEntry();
        $object->setEntryId($entryID);
        $object->setLocale($locale);
        $this->objectRepository->add($object);
        $this->addFlashMessage("A new market entry translation has been added successfully.");
        return $object;
    }

    /**
     * @param MarketEntry $editObject
     * @param MarketEntry $viewObject
     */
    public function editAction(MarketEntry $editObject, MarketEntry $viewObject)
    {
        $this->view->assign('viewObject', $this->objectRepository->hydrate($viewObject, $viewObject->getLocale(), DDConst::OWNER_MARKET));
        $this->view->assign('editObject', $editObject);
        $this->view->assign('editLanguages', $this->languageRepository->findAll());
        $this->view->assign('viewLanguages', $this->objectRepository->findAllLocales($viewObject));
    }

    /**
     * @param MarketEntry $editObject
     */
    public function simpleEditAction(MarketEntry $editObject)
    {
        if ($editObject->getLocale() != DDConst::LOCALE_STD) {
            $viewObject = $this->objectRepository->findOneLocalized($editObject, DDConst::LOCALE_STD);
            $this->redirect('edit', NULL, NULL,
                ['editObject' => ['__identity' => $editObject->getPersistenceObjectIdentifier()],
                    'viewObject' => ['__identity' => $viewObject->getPersistenceObjectIdentifier()]]);
        } else {
            $this->view->assign('editObject', $editObject);
            $this->view->assign('languages', $this->languageRepository->findAll());
            $this->view->assign('location', $editObject->getLocation()->first());
            $this->view->assign('parents', $this->objectRepository->findAllParents());
            $this->view->assign('cats', $this->categoryRepository->findAll());
        }
    }

    /**
     * @param MarketEntry $editObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(MarketEntry $editObject)
    {
        $editObject->setUpdated(new DateTime());
        $this->objectRepository->update($editObject);

        if ($this->validateForm($editObject)) {
            $this->addFlashMessage('The market entry has been updated successfully.');
            $this->redirect('index');
        } else {
            $this->redirect('simpleEdit', NULL, NULL,
                ['editObject' => ['__identity' => $editObject->getPersistenceObjectIdentifier()]]);
        }
    }

    /**
     * @param MarketEntry $object
     */
    public function publishAction(MarketEntry $object)
    {
        $object->setPublished(true);
        $this->objectRepository->update($object);
        $this->addFlashMessage('The market entry has been published.');
        $this->redirect('index');
    }

    /**
     * @param MarketEntry $deleteObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(MarketEntry $deleteObject)
    {
        //update link of children
        foreach ($deleteObject->getChildEntries() as $child) {
            $child->setParentEntry($deleteObject->getParentEntry());
            $this->objectRepository->update($child);
            $this->addFlashMessage('Linked child entry has been moved.', 'Moved child', Message::SEVERITY_NOTICE);
        }

        //if there are locations: delete them all!!!1 buhahahaaa
        if ($deleteObject->getLocation() != null || $deleteObject->getLocation()->first() != null) {
            foreach ($this->locationRepository->findAllLocalisations($deleteObject->getLocation()->first()) as $localisedObject)
                $this->locationRepository->remove($localisedObject);
        }

        //delete entry itself
        foreach ($this->objectRepository->findAllLocalisations($deleteObject) as $localisedObject)
            $this->objectRepository->remove($localisedObject);

        $this->addFlashMessage('The market entry including all its translations and the location (and its translations) has been removed successfully.', 'Deleted', Message::SEVERITY_NOTICE);

        $this->redirect('index');
    }

    /**
     * @param MarketEntry $object
     * @return void
     */
    public function selectTranslationAction(MarketEntry $object)
    {
        $editLocale = $_POST['moduleArguments']['editLocale'];
        $viewLocale = $_POST['moduleArguments']['viewLocale'];

        if ($this->languageRepository->findByCode($viewLocale)->count() == 0 ||
            $this->languageRepository->findByCode($editLocale)->count() == 0
        ) {
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
     * @param MarketEntry $editObject
     * @return bool
     */
    protected function isCategoryTypeValid(MarketEntry $editObject)
    {
        if ($editObject->getCategory() != null) {

            if ($editObject->getType() == DDConst::OWNER_BASIC) {
                if ($editObject->getCategory()->getType() != DDConst::OWNER_BASIC) {
                    $this->addFlashMessage('The category type does not match the type of the entry (basic).', 'Type error', Message::SEVERITY_ERROR);
                    return false;
                }
            } else {
                if ($editObject->getCategory()->getType() != DDConst::OWNER_MARKET) {
                    $this->addFlashMessage('The category type does not match the type of the entry.', 'Type error', Message::SEVERITY_ERROR);
                    return false;
                }
            }

        }
        return true;
    }

    /**
     * @param MarketEntry $entry
     * @param $arguments
     * @return bool
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    protected function createLocation(MarketEntry $entry, &$arguments)
    {
        $location = new Location();

        $location->setMarketEntry($entry);

        $this->setLocationAttrs($location, $arguments);

        $check = $this->checkChords($location);

        $this->locationRepository->add($location);
        $this->addFlashMessage('A new location has been created successfully.');

        return $check;
    }

    /**
     * @param MarketEntry $entry
     * @param $arguments
     * @return bool
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    protected function updateLocation(MarketEntry $entry, $arguments)
    {
        $location = $entry->getLocation()->first();

        $this->setLocationAttrs($location, $arguments);

        $check = $this->checkChords($location);

        $location->setUpdated(new DateTime());
        $this->locationRepository->update($location);

        return $check;
    }

    /**
     * @param Location $location
     * @return bool
     */
    protected function checkChords(Location $location)
    {
        if (preg_match('/^[0-9]+\.[0-9]+,\s*[0-9]+\.[0-9]+/', $location->getLat())) {
            $cords = explode(',', $location->getLat(), 2);
            if (preg_match('/^[0-9]+\.[0-9]+/', trim($cords[0])) && preg_match('/^[0-9]+\.[0-9]+/', trim($cords[1]))) {
                $location->setLat(trim($cords[0]));
                $location->setLon(trim($cords[1]));
            }
        }

        if ($location->getLat() == '' || $location->getLon() == '') {
            $this->addFlashMessage('Coordinates missing in location attributes.', 'Missing Arguments', Message::SEVERITY_WARNING);
            return false;
        }
        return true;
    }

    /**
     * @param $arguments
     * @param $location
     */
    protected function setLocationAttrs(Location $location, &$arguments)
    {
        $location->setArrival($arguments['arrival']);
        $location->setCity($arguments['city']);
        $location->setLat($arguments['lat']);
        $location->setLon($arguments['lon']);
        $location->setOpeningHours($arguments['openingHours']);
        $location->setPlacename($arguments['placename']);
        $location->setStreet($arguments['street']);
        $location->setZip($arguments['zip']);
    }

    /**
     * @param MarketEntry $editObject
     * @return bool
     */
    protected function validateForm(MarketEntry $editObject)
    {
        $check = true;

        //check if category suits for selected type
        if (!$this->isCategoryTypeValid($editObject))
            $check = false;

        //check necessary attributes
        if ($editObject->getParentEntry() == null && ($editObject->getName() == null || $editObject->getName() == "")) {
            $this->addFlashMessage('This entry needs a name!', '', Message::SEVERITY_ERROR);
            $check = false;
        }

        //check location stuff
        if (isset($_POST['moduleArguments']['hasLocation'])) {
            if ($editObject->getLocation() == null || $editObject->getLocation()->first() == null) {
                if (!$this->createLocation($editObject, $_POST['moduleArguments']['location']))
                    $check = false;
            } else {
                if (!$this->updateLocation($editObject, $_POST['moduleArguments']['location']))
                    $check = false;
            }
        } else {
            if ($editObject->getLocation() != null && $editObject->getLocation()->first() != null) {
                foreach ($this->locationRepository->findAllLocalisations($editObject->getLocation()->first()) as $localisedObject)
                    $this->locationRepository->remove($localisedObject);

                $this->addFlashMessage('The location including all its translations has been removed successfully.', 'Deleted', Message::SEVERITY_NOTICE);
            }
        }
        return $check;
    }
}