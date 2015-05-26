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
class MarketEntry extends \DDFA\Main\Domain\Model\Event
{

    /**
     * @var boolean
     */
    protected $offer;

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
}