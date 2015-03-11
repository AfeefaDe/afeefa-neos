<?php
namespace FELIX\Map\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "FELIX.Map".             *
 *                                                                        *
 *                                                                        */

use TYPO3\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 */
class Location {

	/**
	 * @var string
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $lon;

	/**
	 * @var  string
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $lat;

	/**
	 * @var string
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $name;

	/**
	 * @var string
	 */
	protected $street;

	/**
	 * @var  string
	 */
	protected $zip;

	/**
	 * @var  string
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $city;

	/**
	 * @var integer
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $rating;

	/**
	 * @var string
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $range;

	/**
	 * @var string
	 */
	protected $email;

	/**
	 * @var string
	 */
	protected $website;

	/**
	 * @var string
	 */
	protected $phone;

	/**
	 * @var \DateTime
	 */
	protected $date;

	/**
	 * @var string
	 */
	protected $description;

	/**
	 * @var string
	 */
	protected $tags;

	/**
	 * @var string
	 */
	protected $openingHours;

	public function __construct()
    {
         $this->date = new \DateTime('now');
    }

	/**
	 * @return string
	 */
	public function getLon() {
		return $this->lon;
	}

	/**
	 * @param string $lon
	 * @return void
	 */
	public function setLon($lon) {
		$this->lon = $lon;
	}

	/**
	 * @return  string
	 */
	public function getLat() {
		return $this->lat;
	}

	/**
	 * @param  string $lat
	 * @return void
	 */
	public function setLat($lat) {
		$this->lat = $lat;
	}

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
	 * @return  string
	 */
	public function getZip() {
		return $this->zip;
	}

	/**
	 * @param  string $zip
	 * @return void
	 */
	public function setZip($zip) {
		$this->zip = $zip;
	}

	/**
	 * @return  string
	 */
	public function getCity() {
		return $this->city;
	}

	/**
	 * @param  string $city
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
	public function getRange() {
		return $this->range;
	}

	/**
	 * @param string $range
	 * @return void
	 */
	public function setRange($range) {
		$this->range = $range;
	}

	/**
	 * @return string
	 */
	public function getEmail() {
		return $this->email;
	}

	/**
	 * @param string $email
	 * @return void
	 */
	public function setEmail($email) {
		$this->email = $email;
	}

	/**
	 * @return string
	 */
	public function getWebsite() {
		return $this->website;
	}

	/**
	 * @param string $website
	 * @return void
	 */
	public function setWebsite($website) {
		$this->website = $website;
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
	 * @return \DateTime
	 */
	public function getDate() {
		return $this->date;
	}

	/**
	 * @param \DateTime $date
	 * @return void
	 */
	public function setDate(\DateTime $date) {
		$this->date = $date;
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
	public function getTags() {
		return $this->tags;
	}

	/**
	 * @param string $tags
	 * @return void
	 */
	public function setTags($tags) {
		$this->tags = $tags;
	}

	/**
	 * @return string
	 */
	public function getOpeningHours() {
		return $this->openingHours;
	}

	/**
	 * @param string $openingHours
	 * @return void
	 */
	public function setOpeningHours($openingHours) {
		$this->openingHours = $openingHours;
	}

}