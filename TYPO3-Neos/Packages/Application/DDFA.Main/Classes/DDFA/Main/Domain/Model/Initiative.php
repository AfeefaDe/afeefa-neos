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
class Initiative extends \DDFA\Main\Domain\Model\Owner
{

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $speaker;

    /**
     * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Location>
     * @ORM\OneToMany(mappedBy="initiative")
     */
    protected $locations;

    public function __construct() {
        parent::__construct();
    }

    /**
     * @return string
     */
    public function getSpeaker()
    {
        return $this->speaker;
    }

    /**
     * @param string $speaker
     * @return void
     */
    public function setSpeaker($speaker)
    {
        $this->speaker = $speaker;
    }

    /**
     * @return \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Location>
     */
    public function getLocations()
    {
        return $this->locations;
    }
}