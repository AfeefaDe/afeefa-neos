<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Event as Event;
use Doctrine\ORM\Mapping as ORM;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Entity
 */
class MarketEntry extends Event
{
    /**
     * @var boolean
     */
    protected $offer;

    /**
     * @var Location
     * @ORM\OneToMany(mappedBy="initiative")
     */
    protected $location;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return boolean
     */
    public function isOffer()
    {
        return $this->offer;
    }

    /**
     * @param boolean $offer
     */
    public function setOffer($offer)
    {
        $this->offer = $offer;
    }

    /**
     * @return Location
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * @param Location $location
     */
    public function setLocation($location)
    {
        $this->location = $location;
    }
}