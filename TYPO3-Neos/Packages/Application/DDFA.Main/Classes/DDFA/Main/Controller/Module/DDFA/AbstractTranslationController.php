<?php

namespace DDFA\Main\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Object;
use DDFA\Main\Domain\Repository\AbstractTranslationRepository;
use DDFA\Main\Domain\Repository\LanguageRepository;
use DDFA\Main\Utility\DDConst;
use TYPO3\Neos\Controller\Module\AbstractModuleController;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Scope("singleton")
 */
abstract class AbstractTranslationController extends AbstractModuleController{

    /**
     * @Flow\Inject
     * @var LanguageRepository
     */
    protected $languageRepository;

    /**
     * @param \DDFA\Main\Domain\Model\Object $object
     */
    public function selectTranslationAction(Object $object)
    {
        $editLocale = $_POST['moduleArguments']['editLocale'];
        $viewLocale = $_POST['moduleArguments']['viewLocale'];

        if ($this->languageRepository->findByCode($viewLocale)->count() == 0 ||
            $this->languageRepository->findByCode($editLocale)->count() == 0) {
            $editObject = $this->getObjectRepository()->findOneLocalized($object, DDConst::LOCALE_STD);
            $this->redirect('simpleEdit', NULL, NULL, array('editObject' => $editObject));

        } else {
            $viewObject = $this->getObjectRepository()->findOneLocalized($object, $viewLocale);

            if ($viewObject == NULL) {
                $editObject = $this->getObjectRepository()->findOneLocalized($object, DDConst::LOCALE_STD);
                $this->redirect('simpleEdit', NULL, NULL, array('editObject' => $editObject));

            } else {
                $editObject = $this->getObjectRepository()->findOneLocalized($object, $editLocale);

                if ($editObject == NULL) {
                    $this->addTranslation($object->getEntryId(), $editLocale);
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
     */
    protected function addTranslation($entryID, $locale)
    {
        $object = $this->createTranslation();
        $object->setEntryId($entryID);
        $object->setLocale($locale);
        $this->persistTranslation($object);
    }

    /**
     * implement this method and create a new object of your class
     *
     * @return \DDFA\Main\Domain\Model\Object
     */
    abstract protected function createTranslation();

    /**
     * @param \DDFA\Main\Domain\Model\Object $object
     * @return mixed
     */
    abstract protected function persistTranslation(Object $object);

    abstract protected function getObjectRepository();
}