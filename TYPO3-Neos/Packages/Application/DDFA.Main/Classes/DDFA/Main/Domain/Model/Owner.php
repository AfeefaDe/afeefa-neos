<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 * @ORM\MappedSuperclass()
 */
abstract class Owner extends \DDFA\Main\Domain\Model\Entry {

	/**
	 * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Category>
	 * @ORM\ManyToMany()
	 */
	protected $categories;

	/**
	 * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\TargetGroup>
	 * @ORM\ManyToMany()
	 */
	protected $targetGroups;


	/**
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getCategories() {
		return $this->categories;
	}

	/**
	 * @param \Doctrine\Common\Collections\Collection $categories
	 * @return void
	 */
	public function setCategories(\Doctrine\Common\Collections\Collection $categories) {
		$this->categories = $categories;
	}

	/**
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getTargetGroups() {
		return $this->targetGroups;
	}

	/**
	 * @param \Doctrine\Common\Collections\Collection $targetGroups
	 * @return void
	 */
	public function setTargetGroups(\Doctrine\Common\Collections\Collection $targetGroups) {
		$this->targetGroups = $targetGroups;
	}

}