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
class Location extends Actor
{
    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $lon;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $lat;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $street;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $district;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $zip;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $city;

    /**
     * @var boolean
     * @ORM\Column(nullable=true)
     */
    protected $scope;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $placename;

    /**
     * @var string
     * @ORM\Column(nullable=true,type="text")
     */
    protected $openingHours;

    /**
     * @var string
     * @ORM\Column(nullable=true,type="text")
     */
    protected $arrival;

    //TODO: remove type and ini and event relation
    /**
     * @var int
     */
    protected $type;

    /**
     * @var MarketEntry
     * @ORM\ManyToOne(targetEntity="DDFA\Main\Domain\Model\MarketEntry")
     * @ORM\JoinColumn(name="market_entry_id", referencedColumnName="persistence_object_identifier")
     */
    protected $marketEntry;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return string
     */
    public function getOpeningHours()
    {
        return $this->openingHours;
    }

    /**
     * @param string $openingHours
     * @return void
     */
    public function setOpeningHours($openingHours)
    {
        $this->openingHours = $openingHours;
    }

    /**
     * @return string
     */
    public function getLon()
    {
        return $this->lon;
    }

    /**
     * @param string $lon
     * @return void
     */
    public function setLon($lon)
    {
        $this->lon = $lon;
    }

    /**
     * @return string
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * @param string $lat
     * @return void
     */
    public function setLat($lat)
    {
        $this->lat = $lat;
    }

    /**
     * @return string
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * @param string $street
     * @return void
     */
    public function setStreet($street)
    {
        $this->street = $street;
    }

    /**
     * @return string
     */
    public function getDistrict()
    {
        return $this->district;
    }

    /**
     * @param string $district
     * @return void
     */
    public function setDistrict($district)
    {
        $this->district = $district;
    }

    /**
     * @return string
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * @param string $zip
     * @return void
     */
    public function setZip($zip)
    {
        $this->zip = $zip;
    }

    /**
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param string $city
     * @return void
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * @return string
     */
    public function getScope()
    {
        return $this->scope;
    }

    /**
     * @param string $scope
     * @return void
     */
    public function setScope($scope)
    {
        $this->scope = $scope;
    }

    /**
     * @return MarketEntry
     */
    public function getMarketEntry()
    {
        return $this->marketEntry;
    }

    /**
     * @param MarketEntry $marketEntry
     */
    public function setMarketEntry($marketEntry)
    {
        $this->marketEntry = $marketEntry;
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
    public function getArrival()
    {
        return $this->arrival;
    }

    /**
     * @param string $arrival
     */
    public function setArrival($arrival)
    {
        $this->arrival = $arrival;
    }

    /**
     * @return string
     */
    public function getPlacename()
    {
        return $this->placename;
    }

    /**
     * @param string $placename
     */
    public function setPlacename($placename)
    {
        $this->placename = $placename;
    }
}