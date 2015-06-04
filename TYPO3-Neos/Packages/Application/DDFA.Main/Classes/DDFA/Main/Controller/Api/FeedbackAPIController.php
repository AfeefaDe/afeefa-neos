<?php
/**
 * Created by IntelliJ IDEA.
 * User: brego
 * Date: 04.06.2015
 * Time: 19:13
 */

namespace DDFA\Main\Controller\Api;


use DDFA\Main\Domain\Model\Feedback;
use DDFA\Main\Domain\Repository\FeedbackRepository;
use TYPO3\Flow\Mvc\Controller\ActionController;
use TYPO3\Flow\Mvc\View\JsonView;
use TYPO3\Flow\Mvc\View\ViewInterface;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Property\TypeConverter\PersistentObjectConverter;

class FeedbackAPIController extends ActionController {

    /**
     * @Flow\Inject
     * @var FeedbackRepository
     */
    protected $feedbackRepository;

    protected $viewFormatToObjectNameMap = ['json' => JsonView::class];

    /**
     * @var array
     */
    protected $supportedMediaTypes = array('application/json');

    public function listAction()
    {
        $this->view->assign('value', ['feedbacks' => $this->feedbackRepository->findAll()]);
    }

    public function showAction(Feedback $feedback)
    {
        $this->view->assign('value', ['feedback' => $feedback]);
    }

    public function createAction(Feedback $feedback) {
        $this->feedbackRepository->add($feedback);
        $this->response->setStatus(201);
        $this->view->assign('value', ['feedback' => $feedback]);
    }

    protected function initializeView(ViewInterface $view)
    {
        if ($view instanceof JsonView) {
            $feedbackconfig = [
                '_exposeObjectIdentifier' => TRUE,
                '_exposedObjectIdentifierKey' => 'identifier',

            ];
            $view->setConfiguration([
                'value' => [
                    'feedbacks' => ['_descendAll' => $feedbackconfig],
                    'feedback' => $feedbackconfig
                ]
            ]);
        }
    }

    protected function initializeCreateAction() {
        $config = $this->arguments['feedback']->getPropertyMappingConfiguration();
        $config->setTypeConverterOption('TYPO3\Flow\Property\TypeConverter\PersistentObjectConverter', PersistentObjectConverter::CONFIGURATION_CREATION_ALLOWED, TRUE);
        $config->allowAllProperties();
    }
}