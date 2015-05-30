<?php
namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Domain\Model\Actor as Object;
use DDFA\Main\Domain\Model\Category;
use DDFA\Main\Domain\Model\Initiative as Initiative;
use DDFA\Main\Domain\Model\Language as Language;
use DDFA\Main\Domain\Repository\CategoryRepository as CategoryRepository;
use DDFA\Main\Domain\Repository\LanguageRepository as LanguageRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Neos\Controller\Module\AbstractModuleController;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class CategoriesModuleController extends AbstractModuleController {
    /**
     * @Flow\Inject
     * @var CategoryRepository
     */
    protected $objectRepository;

    /**
     * @Flow\Inject
     * @var LanguageRepository
     */
    protected $languageRepository;

    /**
     * @return void
     */
    public function indexAction() {
        $this->view->assign('cats', $this->objectRepository->findAll());
    }

    /**
     * @param Category $viewObject
     * @return void
     */
    public function viewAction(Category $viewObject) {
        $this->view->assign('viewObject', $viewObject);
    }

    /**
     * @return void
     */
    public function addAction() {
    }

    /**
     * @param Category $newObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function createAction(Category $newObject) {
        $this->objectRepository->add($newObject);
        $this->addFlashMessage('A new category has been created successfully.');
        if (isset($_POST['moduleArguments']['add'])) {
            $this->redirect('add');
        } else {
            $this->redirect('index');
        }
    }

    /**
     * @param Category $editObject
     */
    public function editAction(Category $editObject) {
        $this->view->assign('editObject', $editObject);
    }

    /**
     * @param Category $editObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function updateAction(Category $editObject) {
        $this->addFlashMessage('The category has been updated successfully.');
        $editObject->setUpdated(new DateTime());
        $this->objectRepository->update($editObject);
        $this->redirect('index');
    }

    /**
     * @param Category $deleteObject
     * @return void
     * @throws \TYPO3\Flow\Persistence\Exception\IllegalObjectTypeException
     */
    public function deleteAction(Category $deleteObject) {
        $this->objectRepository->remove($deleteObject);
        $this->addFlashMessage('The category has been removed successfully.');
        $this->redirect('index');
    }

    /**
     * @param $entryID
     * @param $locale
     * @return Initiative
     */
    protected function addTranslation($entryID, $locale) {
        //TODO make translatable... or delete this block
//        $object = new Category();
//        $object->setEntryId($entryID);
//        $object->setLocale($locale);
//        $this->objectRepository->add($object);
//        $this->addFlashMessage("A new initiative translation has been added successfully.");
//        return $object;
    }
}