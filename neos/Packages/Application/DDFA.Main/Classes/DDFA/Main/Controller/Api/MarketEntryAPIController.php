<?php
/**
 * Created by IntelliJ IDEA.
 * User: brego
 * Date: 25.05.2015
 * Time: 16:06
 */

namespace DDFA\Main\Controller\Api;


use DDFA\Main\Domain\Model\MarketEntry;
use DDFA\Main\Domain\Repository\MarketEntryRepository;
use DDFA\Main\Utility\DDConst;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;
use TYPO3\Flow\Mvc\View\JsonView;
use TYPO3\Flow\Mvc\View\ViewInterface;
use TYPO3\Flow\Property\TypeConverter\PersistentObjectConverter;

class MarketEntryAPIController extends ActionController
{

    /**
     * @Flow\Inject
     * @var MarketEntryRepository
     */
    protected $marketEntryRepository;

    protected $viewFormatToObjectNameMap = ['json' => JsonView::class];

    /**
     * @var array
     */
    protected $supportedMediaTypes = array('application/json');

    public function listAction()
    {
        $this->view->assign('value', ['marketentries' => $this->marketEntryRepository->findAllLocalized(DDConst::LOCALE_STD, true)]);
    }

    public function showAction(MarketEntry $marketentry)
    {
        $this->view->assign('value', ['marketentry' => $marketentry]);
    }

    public function createAction(MarketEntry $marketentry) {
        $this->marketEntryRepository->add($marketentry);
        $this->response->setStatus(201);
        $this->view->assign('value', ['marketentry' => $marketentry]);
    }

    protected function initializeView(ViewInterface $view)
    {
        if ($view instanceof JsonView) {
            $marketentryconfig = [
                '_exposeObjectIdentifier' => TRUE,
                '_exposedObjectIdentifierKey' => 'identifier',
                '_descend' => [
                    'dateFrom' => [
                        '_exclude' => ['__isInitialized__'],
                        '_exposeObjectIdentifier' => TRUE,
                        '_exposedObjectIdentifierKey' => 'identifier'
                    ],
                    'dateTo' => [
                        '_exclude' => ['__isInitialized__'],
                        '_exposeObjectIdentifier' => TRUE,
                        '_exposedObjectIdentifierKey' => 'identifier'
                    ],

                ],
                '_descendAll' => [
                    'locations' => [
                        '_exclude' => ['__isInitialized__'],
                        '_exposeObjectIdentifier' => TRUE,
                        '_exposedObjectIdentifierKey' => 'identifier'
                    ]
                ]
            ];
            $view->setConfiguration([
                'value' => [
                    'marketentries' => ['_descendAll' => $marketentryconfig],
                    'marketentry' => $marketentryconfig
                ]
            ]);
        }
    }

    protected function initializeCreateAction()
    {
        $config = $this->arguments['marketentry']->getPropertyMappingConfiguration();
        $config->setTypeConverterOption('TYPO3\Flow\Property\TypeConverter\PersistentObjectConverter', PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, TRUE);
        $config->allowAllProperties();
    }
}