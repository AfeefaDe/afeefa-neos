<?php
namespace DDFA\Map\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Map".              *
 *                                                                        *
 *                                                                        */

use Doctrine\ORM\Mapping as ORM;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Entity
 */
class IniLocation extends \DDFA\Map\Domain\Model\Location
{

    /**
     * @var string
     */
    protected $openingHours;

    /**
     * @var \DDFA\Main\Domain\Model\Initiative
     * @ORM\ManyToOne(inversedBy="locations")
     */
    protected $initiative;


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
     * @return \DDFA\Main\Domain\Model\Initiative
     */
    public function getInitiative()
    {
        return $this->initiative;
    }

    /**
     * @param \DDFA\Main\Domain\Model\Initiative $initiative
     * @return void
     */
    public function setInitiative(\DDFA\Main\Domain\Model\Initiative $initiative)
    {
        $this->initiative = $initiative;
    }

}