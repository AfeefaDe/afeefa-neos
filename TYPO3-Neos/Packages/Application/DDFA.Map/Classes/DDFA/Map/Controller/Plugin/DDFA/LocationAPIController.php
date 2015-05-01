<?php

namespace DDFA\Map\Controller\Plugin\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Map".              *
 *                                                                        *
 *                                                                        */

use DDFA\Map\Domain\Repository\IniLocationRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;

class LocationAPIController extends ActionController
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

    /**
     * @return void
     */
    public function getAction()
    {
        $this->view->assign('value', $this->iniLocationRepository->findAll());
        $this->view->setConfiguration(
            array(
                'value' => array(
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
}