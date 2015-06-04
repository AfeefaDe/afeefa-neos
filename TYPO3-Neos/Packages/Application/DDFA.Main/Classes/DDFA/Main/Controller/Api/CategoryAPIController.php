<?php
/**
 * Created by IntelliJ IDEA.
 * User: brego
 * Date: 04.06.2015
 * Time: 18:22
 */

namespace DDFA\Main\Controller\Api;


use DDFA\Main\Domain\Model\Category;
use DDFA\Main\Domain\Repository\CategoryRepository;
use TYPO3\Flow\Mvc\Controller\ActionController;
use TYPO3\Flow\Mvc\View\JsonView;
use TYPO3\Flow\Mvc\View\ViewInterface;
use TYPO3\Flow\Annotations as Flow;

class CategoryAPIController extends ActionController {

    /**
     * @Flow\Inject
     * @var CategoryRepository
     */
    protected $categoryRepository;

    protected $viewFormatToObjectNameMap = ['json' => JsonView::class];

    /**
     * @var array
     */
    protected $supportedMediaTypes = array('application/json');

    public function listAction()
    {
        $this->view->assign('value', ['categories' => $this->categoryRepository->findAll()]);
    }

    public function showAction(Category $category)
    {
        $this->view->assign('value', ['category' => $category]);
    }

    protected function initializeView(ViewInterface $view)
    {
        if ($view instanceof JsonView) {
            $categoryconfig = [
                '_exposeObjectIdentifier' => TRUE,
                '_exposedObjectIdentifierKey' => 'identifier',

            ];
            $view->setConfiguration([
                'value' => [
                    'categories' => ['_descendAll' => $categoryconfig],
                    'category' => $categoryconfig
                ]
            ]);
        }
    }
}