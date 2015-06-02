<?php
/**
 * Created by IntelliJ IDEA.
 * User: brego
 * Date: 24.05.2015
 * Time: 13:26
 */

namespace DDFA\Main\Controller\Api;


use DateTime;
use DDFA\Main\Domain\Repository\InitiativeRepository;
use DDFA\Main\Utility\DDConst;
use DDFA\Main\Utility\DDHelpers;
use TYPO3\Flow\Mvc\Controller\ActionController;
use TYPO3\Flow\Annotations as Flow;
use \DDFA\Main\Domain\Model\Initiative;
use TYPO3\Flow\Mvc\View\JsonView;
use TYPO3\Flow\Mvc\View\ViewInterface;
use TYPO3\Flow\Property\TypeConverter\PersistentObjectConverter;

class InitiativeAPIController extends ActionController {

    /**
     * @Flow\Inject
     * @var InitiativeRepository
     */
    protected $iniRepository;

    protected $viewFormatToObjectNameMap = ['json' => JsonView::class];

    /**
     * @var array
     */
    protected $supportedMediaTypes = array('application/json');

    protected function initializeView(ViewInterface $view) {
        if ($view instanceof JsonView) {
            $iniConfiguration = [
                '_exposeObjectIdentifier' => TRUE,
                '_exposedObjectIdentifierKey' => 'identifier',
                '_descend' => [
                    'manufacturer' => [
                        '_exclude' => ['__isInitialized__'],
                        '_exposeObjectIdentifier' => TRUE,
                        '_exposedObjectIdentifierKey' => 'identifier'
                    ]
                ]
            ];
            $view->setConfiguration([
                'value' => [
                    'initiatives' => ['_descendAll' => $iniConfiguration],
                    'initiative' => $iniConfiguration
                ]
            ]);
        }
    }

    /**
     * @param string $locale
     */
    public function listAction($locale) {
        $this->view->assign('value', ['initiatives' => $this->iniRepository->findAll()]);
    }

    /**
     * @param Initiative $initiative
     * @param string $locale
     */
    public function showAction(Initiative $initiative, $locale) {
        $initiative = $this->iniRepository->findOneLocalized($initiative, $locale);
        $this->view->assign('value', ['initiative' => $initiative]);
    }

    protected function initializeCreateAction() {
        $config = $this->arguments['initiative']->getPropertyMappingConfiguration();
        $config->setTypeConverterOption('TYPO3\Flow\Property\TypeConverter\PersistentObjectConverter', PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, TRUE);
        $config->allowAllProperties();
    }

    public function createAction(Initiative $initiative) {
        $now = new DateTime();
        $initiative->setCreated($now);
        $initiative->setUpdated($now);
        $initiative->setPersistenceObjectIdentifier(DDHelpers::createGuid());
        $this->iniRepository->add($initiative);
        $this->response->setStatus(201);
        $this->view->assign('value', ['initiative' => $initiative]);
    }

}