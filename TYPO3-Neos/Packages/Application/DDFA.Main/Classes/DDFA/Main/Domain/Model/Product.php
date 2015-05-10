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
 * @ORM\MappedSuperclass()
 */
abstract class Product extends \DDFA\Main\Domain\Model\Object
{

    /**
     * @var string
     */
    private $supportWanted;

    /**
     * @return string
     */
    public function getSupportWanted()
    {
        return $this->supportWanted;
    }

    /**
     * @param string $supportWanted
     * @return void
     */
    public function setSupportWanted($supportWanted)
    {
        $this->supportWanted = $supportWanted;
    }

}