<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Owner as Owner;
use Doctrine\ORM\Mapping as ORM;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Entity
 */
class Initiative extends Owner
{
    /**
     * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Location>
     * @ORM\OneToMany(mappedBy="initiative")
     */
    protected $locations;

    /**
     * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Event>
     * @ORM\OneToMany(mappedBy="initiative")
     */
    protected $events;

    /**
     * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\MarketEntry>
     * @ORM\OneToMany(mappedBy="initiative")
     */
    protected $entries;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Location>
     */
    public function getLocations()
    {
        return $this->locations;
    }

    /**
     * @param \Doctrine\Common\Collections\Collection $locations
     */
    public function setLocations($locations)
    {
        $this->locations = $locations;
    }
}