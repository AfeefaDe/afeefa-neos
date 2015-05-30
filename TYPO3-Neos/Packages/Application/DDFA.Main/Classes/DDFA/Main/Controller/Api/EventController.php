<?php
/**
 * Created by IntelliJ IDEA.
 * User: brego
 * Date: 25.05.2015
 * Time: 16:16
 */

namespace DDFA\Main\Controller\Api;


use DDFA\Main\Domain\Model\Event;
use DDFA\Main\Domain\Repository\EventRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;
use TYPO3\Flow\Mvc\View\JsonView;
use TYPO3\Flow\Mvc\View\ViewInterface;

class EventController extends ActionController
{

    /**
     * @Flow\Inject
     * @var EventRepository
     */
    protected $eventRepository;

    protected $viewFormatToObjectNameMap = ['json' => JsonView::class];

    /**
     * @var array
     */
    protected $supportedMediaTypes = array('application/json');

    public function listAction()
    {
        $this->view->assign('value', ['events' => $this->eventRepository->findAll()]);
    }

    public function showAction(Event $event)
    {
        $this->view->assign('value', ['event' => $event]);
    }

    protected function initializeView(ViewInterface $view)
    {
        if ($view instanceof JsonView) {
            $eventconfig = [
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
                    'events' => ['_descendAll' => $eventconfig],
                    'event' => $eventconfig
                ]
            ]);
        }
    }


}