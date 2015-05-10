<?php

namespace DDFA\Main\Controller\Api;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".              *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Repository\LocationRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;
use \DDFA\Main\Domain\Model\Location;
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

    protected function initializeView(ViewInterface $view) {
        if ($view instanceof JsonView) {
            $locationConfiguration = [
                '_exposeObjectIdentifier'     => TRUE,
                '_exposedObjectIdentifierKey' => 'identifier',
                '_descend'                    => [
                    'manufacturer' => [
                        '_exclude'                    => ['__isInitialized__'],
                        '_exposeObjectIdentifier'     => TRUE,
                        '_exposedObjectIdentifierKey' => 'identifier'
                    ]
                ]
            ];
            $view->setConfiguration([
                'value' => [
                    'locations' => ['_descendAll' => $locationConfiguration],
                    'location'  => $locationConfiguration
                ]
            ]);
        }
    }

    public function listAction() {
        $this->view->assign('value', $this->iniLocationRepository->findAll());
    }

    public function showAction(Location $location) {
        $this->view->assign('value', $this->iniLocationRepository->findAll());
    }

    /**
     * @return void
     */
    public function getAction()
    {
        /*$this->view->assign('value', $this->iniLocationRepository->findAll());*/
        $this->view->setConfiguration(
            array(
                'iniLocations' => array(
                    '_descendAll' => array(
                        '_descend' => array(
                            'initiative' => array(
                                '_only' => array('name'),
                                '_exposeObjectIdentifier' => TRUE,
                                '_exposedObjectIdentifierKey' => 'id'
                            )
                        ),
                        '_exposeObjectIdentifier' => TRUE,
                        '_exposedObjectIdentifierKey' => 'id'
                    )
                )
            )
        );
        $this->view->setVariablesToRender(array('iniLocations'));
        $this->view->assign('iniLocations', $this->iniLocationRepository->findAll());
    }

    /**
     * @param string $id
     * @return void
     */
    public function getByIdAction($id)
    {
        $this->view->assign('value', $this->iniLocationRepository->findByIdentifier($id));
        $this->view->setConfiguration(
            array(
                'value' => array(
                    '_descend' => array(
                        'initiative' => array(
                            '_only' => array('name'),
                            '_exposeObjectIdentifier' => TRUE,
                            '_exposedObjectIdentifierKey' => 'id'
                        )
                    ),
                    '_exposeObjectIdentifier' => TRUE,
                    '_exposedObjectIdentifierKey' => 'id'
                )
            )
        );
    }

    /**
     * @param Location $location
     * @return void
     */
    public function getByLocationAction(Location $location)
    {

        $this->view->setVariablesToRender(array('iniLocation'));
        $this->view->assign('iniLocation', $location);
        $this->view->setConfiguration(
            array(
                'iniLocation' => array(
                    '_descend' => array(
                        'initiative' => array(
                            '_only' => array('name'),
                            '_exposeObjectIdentifier' => TRUE,
                            '_exposedObjectIdentifierKey' => 'id'
                        )
                    ),
                    '_exposeObjectIdentifier' => TRUE,
                    '_exposedObjectIdentifierKey' => 'id'
                )
            )
        );
    }
}