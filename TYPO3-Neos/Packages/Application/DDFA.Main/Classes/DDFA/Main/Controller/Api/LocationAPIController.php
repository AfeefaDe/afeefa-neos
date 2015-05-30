<?php

namespace DDFA\Main\Controller\Api;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".              *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Location;
use DDFA\Main\Domain\Repository\LocationRepository;
use DDFA\Main\Utility\DDConst;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;
use TYPO3\Flow\Mvc\View\JsonView;
use TYPO3\Flow\Mvc\View\ViewInterface;

class LocationAPIController extends ActionController
{
    /**
     * @Flow\Inject
     * @var LocationRepository
     */
    protected $iniLocationRepository;

    protected $viewFormatToObjectNameMap = ['json' => JsonView::class];

    /**
     * @var array
     */
    protected $supportedMediaTypes = array('application/json');

    public function listAction()
    {
        //TODO include language
        $this->view->assign('value', ['locations' => $this->iniLocationRepository->findAllSupplemented(DDConst::LOCALE_STD)]);
    }

    public function showAction(Location $location)
    {
        $this->view->assign('value', ['location' => $location]);
    }

    protected function initializeView(ViewInterface $view)
    {
        if ($view instanceof JsonView) {
            $locationConfiguration = [
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
                    'locations' => ['_descendAll' => $locationConfiguration],
                    'location' => $locationConfiguration
                ]
            ]);
        }
    }
}