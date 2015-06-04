<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Domain\Model\Initiative;
use DDFA\Main\Domain\Repository\CategoryRepository;
use DDFA\Main\Domain\Repository\InitiativeRepository as InitiativeRepository;
use DDFA\Main\Domain\Repository\LanguageRepository as LanguageRepository;
use DDFA\Main\Utility\DDConst;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Media\Domain\Repository\AssetRepository;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class InitiativesModuleController extends AbstractTranslationController {
    /**
     * @Flow\Inject
     * @var InitiativeRepository
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
     * @var AssetRepository
     */
    protected $assetRepository;

    /**
     * @return void
     */
    public function indexAction() {
        $this->view->assign('inis', $this->objectRepository->findAllLocalized());
        $this->view->assign('numLanguages', $this->languageRepository->findAll()->count() - 1);

    }

    /**
     * @param Initiative $viewObject
     * @return void
     */
    public function viewAction(Initiative $viewObject) {
        if (isset($_POST['viewLocale']) && $_POST['viewLocale'] != DDConst::LOCALE_STD) {
            $this->redirect('view', NULL, NULL, array('viewObject' => $this->objectRepository->findOneLocalized($viewObject, $_POST['viewLocale'])));

        } else {
            $viewObject = $this->objectRepository->hydrate($viewObject, $viewObject->getLocale());

            $this->view->assign('viewObject', $viewObject);
            $this->view->assign('languages', $this->objectRepository->findLocales($viewObject));
        }
    }

    /**
     * @return void
     */
    public function addAction() {
        $this->view->assign('cats', $this->categoryRepository->findByType(DDConst::OWNER_INI));
        $this->view->assign('imgs', $this->assetRepository->findAll());
    }

    /**
     * @param Initiative $newObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(Initiative $newObject) {
        //TODO refactor:
        if (isset($_POST['moduleArguments']['cat'])) {
            $newObject->setCategory($this->categoryRepository->findOneByName($_POST['moduleArguments']['cat']));
        }

        $this->objectRepository->add($newObject);
        $this->addFlashMessage('A new initiative has been created successfully.');

        if (isset($_POST['moduleArguments']['localize'])) {
            $editObject = $this->addTranslation($newObject->getEntryId(), DDConst::LOCALE_NXT);
            $this->redirect('edit', NULL, NULL, array('editObject' => $editObject, 'viewObject' => $newObject));

        } else
            $this->redirect('index');
    }

    /**
     * @param $entryID
     * @param $locale
     * @return Initiative
     */
    protected function addTranslation($entryID, $locale) {
        $object = new Initiative();
        $object->setEntryId($entryID);
        $object->setLocale($locale);
        $this->objectRepository->add($object);
        $this->addFlashMessage("A new initiative translation has been added successfully.");
        return $object;
    }

    /**
     * @param Initiative $editObject
     * @param Initiative $viewObject
     */
    public function editAction(Initiative $editObject, Initiative $viewObject) {
        $this->view->assign('viewObject', $this->objectRepository->hydrate($viewObject, $viewObject->getLocale()));
        $this->view->assign('editObject', $editObject);
        $this->view->assign('editLanguages', $this->languageRepository->findAll());
        $this->view->assign('viewLanguages', $this->objectRepository->findAllLocales($viewObject));
    }

    /**
     * @param Initiative $editObject
     */
    public function simpleEditAction(Initiative $editObject) {
        if ($editObject->getLocale() != DDConst::LOCALE_STD) {
            $viewObject = $this->objectRepository->findOneLocalized($editObject, DDConst::LOCALE_STD);
            $this->redirect('edit', NULL, NULL,
                ['editObject' => ['__identity' => $editObject->getPersistenceObjectIdentifier()],
                    'viewObject' => ['__identity' => $viewObject->getPersistenceObjectIdentifier()]]);
        } else {
            $this->view->assign('editObject', $editObject);
            $this->view->assign('languages', $this->languageRepository->findAll());
            $this->view->assign('cats', $this->categoryRepository->findByType(DDConst::OWNER_INI));
            $this->view->assign('imgs', $this->assetRepository->findAll());
        }
    }

    /**
     * @param Initiative $editObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(Initiative $editObject) {
        $editObject->setUpdated(new DateTime());

        //TODO refactor:
        if (isset($_POST['moduleArguments']['cat'])) {
            $editObject->setCategory($this->categoryRepository->findOneByName($_POST['moduleArguments']['cat']));
        }

        $this->addFlashMessage('The initiative has been updated successfully.');
        $this->objectRepository->update($editObject);
        $this->redirect('index');
    }

    /**
     * @param Initiative $deleteObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(Initiative $deleteObject) {
        //TODO check if locations refer to initiative
        foreach ($this->objectRepository->findAllLocalisations($deleteObject) as $localisedObject)
            $this->objectRepository->remove($localisedObject);

        $this->addFlashMessage('The initiative including all its translations has been removed successfully.');
        $this->redirect('index');
    }

    /**
     * @param Initiative $object
     * @return void
     */
    public function selectTranslationAction(Initiative $object) {
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
}