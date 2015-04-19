<?php
namespace DDFA\Map\Controller\Module\DDFA;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Map".              *
 *                                                                        *
 *                                                                        */

use DDFA\Map\Controller\Module;
use DDFA\Map\Domain\Model\IniLocation;
use DDFA\Map\Domain\Repository\IniLocationRepository;
use TYPO3\Flow\Annotations as Flow;
use TYPO3\Neos\Controller\Module\AbstractModuleController;

/**
 * The TYPO3 User Settings module controller
 *
 * @Flow\Scope("singleton")
 */
class LocationsModuleController extends AbstractModuleController
{

    /**
     * @Flow\Inject
     * @var IniLocationRepository
     */
    protected $iniLocationRepository;

    /**
     * @return void
     */
    public function indexAction()
    {
        $locations = $this->iniLocationRepository->findAll();
        $this->view->assign('locations', $locations);
    }

    /**
     * @return void
     */
    public function addAction()
    {

    }

    /**
     * @return void
     */
    public function createAction(IniLocation $newLocation)
    {
        //TODO error occurs here...

        $this->iniLocationRepository->add($newLocation);
        $this->addFlashMessage('Created a new location. \\o/');
        $this->redirect('index');
    }

    /**
     * @return void
     */
    public function editAction()
    {

    }

    /**
     * @return void
     */
    public function updateAction()
    {
        $this->redirect('index');
    }

    /**
     * @return void
     */
    public function deleteAction()
    {
        $this->redirect('index');
    }

}