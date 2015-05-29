<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Utility\DDHelpers;
use Doctrine\ORM\Mapping as ORM;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Entity
 * @ORM\MappedSuperclass()
 */
abstract class BasicEntity
{
    /**
     * @Flow\Identity
     * @var string
     * @ORM\Id
     * @ORM\Column(name="persistence_object_identifier", type="guid", length=40, unique=true, nullable=false)
     */
    protected $Persistence_Object_Identifier;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
     */
    protected $created;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
     */
    protected $updated;

    public function __construct() {
        $this->setPersistenceObjectIdentifier(DDHelpers::createGuid());
        $now = new DateTime();
        $this->setCreated($now);
        $this->setUpdated($now);
    }

    /**
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * @param \DateTime $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    /**
     * @return \DateTime
     */
    public function getUpdated()
    {
        return $this->updated;
    }

    /**
     * @param \DateTime $updated
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;
    }

    /**
     * @return mixed
     */
    public function getPersistenceObjectIdentifier()
    {
        return $this->Persistence_Object_Identifier;
    }


    /**
     * @param mixed $Persistence_Object_Identifier
     */
    public function setPersistenceObjectIdentifier($Persistence_Object_Identifier)
    {
        $this->Persistence_Object_Identifier = $Persistence_Object_Identifier;
    }
}