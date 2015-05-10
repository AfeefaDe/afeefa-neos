<?php

namespace DDFA\Map\Controller\Plugin\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Map".              *
 *                                                                        *
 *                                                                        */

use DDFA\Map\Domain\Repository\IniLocationRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\RestController;
use \DDFA\Map\Domain\Model\IniLocation;
use \DDFA\Map\Domain\Model\Location;

class LocationAPIController extends RestController
{
    /**
     * @Flow\Inject
     * @var IniLocationRepository
     */
    protected $iniLocationRepository;

    /**
     * @var string
     */
    protected $defaultViewObjectName = 'TYPO3\Flow\Mvc\View\JsonView';

    /**
     * @var array
     */
    protected $supportedMediaTypes = array('application/json');

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
     * @param IniLocation $location
     * @return void
     */
    public function getByLocationAction(IniLocation $location)
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