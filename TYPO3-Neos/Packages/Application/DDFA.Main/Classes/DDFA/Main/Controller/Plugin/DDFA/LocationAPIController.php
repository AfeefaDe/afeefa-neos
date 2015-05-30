<?php

namespace DDFA\Main\Controller\Plugin\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".              *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Repository\LocationRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;

//TODO unused??
class LocationAPIController extends ActionController
{
    /**
     * @Flow\Inject
     * @var LocationRepository
     */
    protected $locationRepository;

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
        $this->view->assign('value', $this->locationRepository->findAll());
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
        $this->view->assign('value', $this->locationRepository->findByIdentifier($id));
        $this->view->setConfiguration(
            array(
                'value' => array(
                    '_descend' => array(
                        'initiative' => array(
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