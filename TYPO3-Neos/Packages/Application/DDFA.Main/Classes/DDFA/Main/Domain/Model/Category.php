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
class Category extends BasicEntity
{
    /**
     * @var string
     * @ORM\Column(name="entry_id")
     */
    protected $entryId;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $description;

    public function __construct()
    {
        parent::__construct();
        $this->setEntryId(uniqid());
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return void
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     * @return void
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getEntryId()
    {
        return $this->entryId;
    }

    /**
     * @param string $entryId
     */
    public function setEntryId($entryId)
    {
        $this->entryId = $entryId;
    }
}