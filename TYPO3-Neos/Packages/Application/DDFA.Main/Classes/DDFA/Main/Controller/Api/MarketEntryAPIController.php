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
use TYPO3\Flow\Mvc\Controller\ActionController;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\View\JsonView;
use TYPO3\Flow\Mvc\View\ViewInterface;

class MarketEntryAPIController extends ActionController {

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

    protected function initializeView(ViewInterface $view) {
        if ($view instanceof JsonView) {
            $marketentryconfig = [
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
                    'marketentries' => ['_descendAll' => $marketentryconfig],
                    'marketentry'  => $marketentryconfig
                ]
            ]);
        }
    }

    public function listAction() {
        $this->view->assign('value', ['marketentries' => $this->marketEntryRepository->findAll()]);
    }

    public function showAction(MarketEntry $marketentry) {
        $this->view->assign('value', ['marketentry' => $marketentry]);
    }
}