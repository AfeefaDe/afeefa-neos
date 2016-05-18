<?php
/**
 * Created by IntelliJ IDEA.
 * User: brego
 * Date: 25.05.2015
 * Time: 16:06
 */

namespace DDFA\Main\Controller\Api;


use DDFA\Main\Domain\Model\Location;
use DDFA\Main\Domain\Model\MarketEntry;
use DDFA\Main\Domain\Repository\LocationRepository;
use DDFA\Main\Domain\Repository\MarketEntryRepository;
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

    /**
     * @Flow\Inject
     * @var LocationRepository
     */
    protected $locationRepository;

    protected $viewFormatToObjectNameMap = ['json' => JsonView::class];

    /**
     * @var array
     */
    protected $supportedMediaTypes = array('application/json');

    /**
     * @param string $locale
     */
    public function listAction($locale = 'de')
    {
        $this->view->assign('value', ['marketentries' => $this->marketEntryRepository->findAllSupplemented($locale, true)]);
    }

    /**
     * @param MarketEntry $marketentry
     * @param string $locale
     */
    public function showAction(MarketEntry $marketentry, $locale = 'de')
    {
        $this->view->assign('value', ['marketentry' => $this->marketEntryRepository->findOneSupplemented($marketentry, $locale, true)]);
    }

    /**
     * @param MarketEntry $marketentry
     */
    public function createAction(MarketEntry $marketentry, Location $location)
    {
        if ($location->getType() == 0 || $location->getType() == 1 || $location->getType() == 2) {
            $this->marketEntryRepository->add($marketentry);
            $this->locationRepository->add($location);
            $this->response->setStatus(201);
            $this->view->assign('value', ['marketentry' => $marketentry, 'location' => $location]);
        } else {
            $this->response->setStatus(412);
        }
    }


    public function publishAction(MarketEntry $id)
    {
        $marketentry = $this->marketEntryRepository->findById($id);
        if ($marketentry != null) {
            $marketentry->setPublished(true);
            $this->marketEntryRepository->update($marketentry);
            $this->view->assign('value', true);
        } else {
            $this->view->assign('value', false);
        }
    }

    public function lockAction(MarketEntry $id)
    {
        $marketentry = $this->marketEntryRepository->findById($id);
        if ($marketentry != null) {
            $marketentry->setPublished(false);
            $this->marketEntryRepository->update($marketentry);
            $this->view->assign('value', true);
        } else {
            $this->view->assign('value', false);
        }
    }

    protected function initializeView(ViewInterface $view)
    {
        if ($view instanceof JsonView) {
            $marketentryconfig = [
                '_descend' => [
                    'category' => [
                        '_exclude' => [
                            '__isInitialized__',
                            'description',
                            'locale'
                        ]
//                        ,'_exposeObjectIdentifier' => TRUE, '_exposedObjectIdentifierKey' => 'identifier'
                    ],

                    'location' => [
                        '_descend' => [
                            '_exclude' => [
                                '__isInitialized__',
                                'locale'
                            ]
                        ]
                    ]
                ],
                '_exclude' => [
                    'internalComment',
                    'locale',
                    'parentEntry',
                    'published',
                    'speakerPrivate'
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
        $config = $this->arguments['location']->getPropertyMappingConfiguration();
        $config->setTypeConverterOption('TYPO3\Flow\Property\TypeConverter\PersistentObjectConverter', PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, TRUE);
        $config->allowAllProperties();
    }
}