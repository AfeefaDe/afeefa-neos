<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Entity
 */
class MarketEntry extends Actor {
    /**
     * @var boolean
     */
    protected $offer;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
     */
    protected $dateFrom;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
     */
    protected $dateTo;

    /**
     * @var int
     */
    protected $dateDay;

    /**
     * @var int
     */
    protected $datePeriodic;

    /**
     * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Location>
     * @ORM\OneToMany(mappedBy="event")
     */
    protected $locations;

    public function __construct() {
        parent::__construct();
    }

    /**
     * @return DateTime
     */
    public function getDateFrom() {
        return $this->dateFrom;
    }

    /**
     * @param DateTime $dateFrom
     * @return void
     */
    public function setDateFrom($dateFrom) {
        $this->dateFrom = $dateFrom;
    }

    /**
     * @return DateTime
     */
    public function getDateTo() {
        return $this->dateTo;
    }

    /**
     * @param DateTime $dateTo
     * @return void
     */
    public function setDateTo($dateTo) {
        $this->dateTo = $dateTo;
    }

    /**
     * @return int
     */
    public function getDateDay() {
        return $this->dateDay;
    }

    /**
     * @param int $dateDay
     * @return void
     */
    public function setDateDay($dateDay) {
        $this->dateDay = $dateDay;
    }

    /**
     * @return int
     */
    public function getDatePeriodic() {
        return $this->datePeriodic;
    }

    /**
     * @param int $datePeriodic
     * @return void
     */
    public function setDatePeriodic($datePeriodic) {
        $this->datePeriodic = $datePeriodic;
    }

    /**
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLocations() {
        return $this->locations;
    }

    /**
     * @param \Doctrine\Common\Collections\Collection $locations
     * @return void
     */
    public function setLocations($locations) {
        $this->locations = $locations;
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
}