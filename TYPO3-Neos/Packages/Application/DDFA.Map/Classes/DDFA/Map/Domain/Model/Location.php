<?php
namespace DDFA\Map\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Map".              *
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 * @ORM\MappedSuperclass()
 */
abstract class Location extends \DDFA\Main\Domain\Model\Entry {

	/**
	 * @var string
	 */
	protected $long;

	/**
	 * @var string
	 */
	protected $lat;

	/**
	 * @var string
	 */
	protected $street;

	/**
	 * @var string
	 */
	protected $zip;

	/**
	 * @var string
	 */
	protected $city;

	/**
	 * @var integer
	 */
	protected $rating;

	/**
	 * @var string
	 */
	protected $scope;


	/**
	 * @return string
	 */
	public function getLong() {
		return $this->long;
	}

	/**
	 * @param string $long
	 * @return void
	 */
	public function setLong($long) {
		$this->long = $long;
	}

	/**
	 * @return string
	 */
	public function getLat() {
		return $this->lat;
	}

	/**
	 * @param string $lat
	 * @return void
	 */
	public function setLat($lat) {
		$this->lat = $lat;
	}

	/**
	 * @return string
	 */
	public function getStreet() {
		return $this->street;
	}

	/**
	 * @param string $street
	 * @return void
	 */
	public function setStreet($street) {
		$this->street = $street;
	}

	/**
	 * @return string
	 */
	public function getZip() {
		return $this->zip;
	}

	/**
	 * @param string $zip
	 * @return void
	 */
	public function setZip($zip) {
		$this->zip = $zip;
	}

	/**
	 * @return string
	 */
	public function getCity() {
		return $this->city;
	}

	/**
	 * @param string $city
	 * @return void
	 */
	public function setCity($city) {
		$this->city = $city;
	}

	/**
	 * @return integer
	 */
	public function getRating() {
		return $this->rating;
	}

	/**
	 * @param integer $rating
	 * @return void
	 */
	public function setRating($rating) {
		$this->rating = $rating;
	}

	/**
	 * @return string
	 */
	public function getScope() {
		return $this->scope;
	}

	/**
	 * @param string $scope
	 * @return void
	 */
	public function setScope($scope) {
		$this->scope = $scope;
	}

}