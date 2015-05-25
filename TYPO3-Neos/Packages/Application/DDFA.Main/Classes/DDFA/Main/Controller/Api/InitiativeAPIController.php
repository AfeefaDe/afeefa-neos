<?php
/**
 * Created by IntelliJ IDEA.
 * User: brego
 * Date: 24.05.2015
 * Time: 13:26
 */

namespace DDFA\Main\Controller\Api;


use DDFA\Main\Domain\Repository\InitiativeRepository;
use TYPO3\Flow\Mvc\Controller\ActionController;
use TYPO3\Flow\Annotations as Flow;
use \DDFA\Main\Domain\Model\Initiative;
use TYPO3\Flow\Mvc\View\JsonView;
use TYPO3\Flow\Mvc\View\ViewInterface;

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
                    'initiatives' => ['_descendAll' => $iniConfiguration],
                    'initiative'  => $iniConfiguration
                ]
            ]);
        }
    }

    public function listAction() {
        $this->view->assign('value', ['initiatives' => $this->iniRepository->findAll()]);
    }

    public function showAction(Initiative $initiative) {
        print_r($this->request->getHttpRequest()->getHeaders());
        $this->view->assign('value', ['initiative' => $initiative]);
    }

}