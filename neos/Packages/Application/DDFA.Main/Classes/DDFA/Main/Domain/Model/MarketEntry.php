<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Utility\DDConst;
use Doctrine\ORM\Mapping as ORM;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Entity
 */
class MarketEntry extends Actor
{
    /**
     * @var boolean
     * @ORM\Column(nullable=true)
     */
    protected $offer;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $dateFrom;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $dateTo;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $timeFrom;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $timeTo;

    /**
     * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Location>
     * @ORM\OneToMany(mappedBy="marketEntry")
     */
    protected $locations;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $area;

    /**
     * @var int
     * @ORM\Column(nullable=false)
     */
    protected $type = DDConst::OWNER_MARKET;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLocations()
    {
        return $this->locations;
    }

    /**
     * @param \Doctrine\Common\Collections\Collection $locations
     * @return void
     */
    public function setLocations($locations)
    {
        $this->locations = $locations;
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
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param int $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return string
     */
    public function getArea()
    {
        return $this->area;
    }

    /**
     * @param string $area
     */
    public function setArea($area)
    {
        $this->area = $area;
    }

    /**
     * @return string
     */
    public function getDateFrom()
    {
        return $this->dateFrom;
    }

    /**
     * @param string $dateFrom
     */
    public function setDateFrom($dateFrom)
    {
        $this->dateFrom = $dateFrom;
    }

    /**
     * @return string
     */
    public function getDateTo()
    {
        return $this->dateTo;
    }

    /**
     * @param string $dateTo
     */
    public function setDateTo($dateTo)
    {
        $this->dateTo = $dateTo;
    }

    /**
     * @return string
     */
    public function getTimeFrom()
    {
        return $this->timeFrom;
    }

    /**
     * @param string $timeFrom
     */
    public function setTimeFrom($timeFrom)
    {
        $this->timeFrom = $timeFrom;
    }

    /**
     * @return string
     */
    public function getTimeTo()
    {
        return $this->timeTo;
    }

    /**
     * @param string $timeTo
     */
    public function setTimeTo($timeTo)
    {
        $this->timeTo = $timeTo;
    }
}