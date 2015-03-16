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
abstract class Entry {

	/**
	 * @var string
	 */
	protected $name;

	/**
	 * @var string
	 */
	protected $description;

	/**
	 * @var string
	 */
	protected $mail;

	/**
	 * @var string
	 */
	protected $web;

	/**
	 * @var string
	 */
	protected $phone;

	/**
	 * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Tag>
	 * @ORM\ManyToMany()
	 */
	protected $tags;


	/**
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * @param string $name
	 * @return void
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * @return string
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * @param string $description
	 * @return void
	 */
	public function setDescription($description) {
		$this->description = $description;
	}

	/**
	 * @return string
	 */
	public function getMail() {
		return $this->mail;
	}

	/**
	 * @param string $mail
	 * @return void
	 */
	public function setMail($mail) {
		$this->mail = $mail;
	}

	/**
	 * @return string
	 */
	public function getWeb() {
		return $this->web;
	}

	/**
	 * @param string $web
	 * @return void
	 */
	public function setWeb($web) {
		$this->web = $web;
	}

	/**
	 * @return string
	 */
	public function getPhone() {
		return $this->phone;
	}

	/**
	 * @param string $phone
	 * @return void
	 */
	public function setPhone($phone) {
		$this->phone = $phone;
	}

	/**
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getTags() {
		return $this->tags;
	}

	/**
	 * @param \Doctrine\Common\Collections\Collection $tags
	 * @return void
	 */
	public function setTags(\Doctrine\Common\Collections\Collection $tags) {
		$this->tags = $tags;
	}

}