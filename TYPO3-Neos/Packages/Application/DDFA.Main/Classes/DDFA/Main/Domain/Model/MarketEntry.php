<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use Doctrine\ORM\Mapping as ORM;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Entity
 */
class MarketEntry extends Event {
    /**
     * @var boolean
     */
    protected $offer;

    /**
     * @var boolean
     */
    protected $released;

    /**
     * @var Location
     * @ORM\OneToMany(mappedBy="initiative")
     */
    protected $location;

    public function __construct() {
        parent::__construct();
    }

    /**
     * @return boolean
     */
    public function isOffer() {
        return $this->offer;
    }

    /**
     * @param boolean $offer
     */
    public function setOffer($offer) {
        $this->offer = $offer;
    }

    /**
     * @return Location
     */
    public function getLocation() {
        return $this->location;
    }

    /**
     * @param Location $location
     */
    public function setLocation($location) {
        $this->location = $location;
    }

    /**
     * @return mixed
     */
    public function getReleased() {
        return $this->released;
    }

    /**
     * @param mixed $released
     */
    public function setReleased($released) {
        $this->released = $released;
    }
}