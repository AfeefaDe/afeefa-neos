<?php
namespace FELIX\Map\Controller;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "FELIX.Map".             *
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;
use FELIX\Map\Domain\Model\Location;

class LocationController extends ActionController {

	/**
	 * @Flow\Inject
	 * @var \FELIX\Map\Domain\Repository\LocationRepository
	 */
	protected $locationRepository;

	/**
	 * @return void
	 */
	public function indexAction() {
		$this->view->assign('locations', $this->locationRepository->findAll());
	}

	/**
	 * @param \FELIX\Map\Domain\Model\Location $location
	 * @return void
	 */
	public function showAction(Location $location) {
		$this->view->assign('location', $location);
	}

	/**
	 * @return void
	 */
	public function newAction() {
	}

	/**
	 * @param \FELIX\Map\Domain\Model\Location $newLocation
	 * @return void
	 */
	public function createAction(Location $newLocation) {
		$this->locationRepository->add($newLocation);
		$this->addFlashMessage('Created a new location.');
		$this->redirect('index');
	}

	/**
	 * @param \FELIX\Map\Domain\Model\Location $location
	 * @return void
	 */
	public function editAction(Location $location) {
		$this->view->assign('location', $location);
	}

	/**
	 * @param \FELIX\Map\Domain\Model\Location $location
	 * @return void
	 */
	public function updateAction(Location $location) {
		$this->locationRepository->update($location);
		$this->addFlashMessage('Updated the location.');
		$this->redirect('index');
	}

	/**
	 * @param \FELIX\Map\Domain\Model\Location $location
	 * @return void
	 */
	public function deleteAction(Location $location) {
		$this->locationRepository->remove($location);
		$this->addFlashMessage('Deleted a location.');
		$this->redirect('index');
	}

}