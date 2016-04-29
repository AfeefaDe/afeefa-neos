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
 * @ORM\MappedSuperclass()
 */
abstract class Actor extends BasicEntity
{
    /**
     * @var string
     * @ORM\Column(name="entry_id")
     */
    protected $entryId;

    /**
     * @var string
     */
    protected $locale;

    public function __construct()
    {
        parent::__construct();
        $this->setEntryId(uniqid());
        $this->setLocale(DDConst::LOCALE_STD);
    }


    /**
     * @return string
     */
    public function getLocale()
    {
        return $this->locale;
    }

    /**
     * @param string $locale
     * @return void
     */
    public function setLocale($locale)
    {
        $this->locale = $locale;
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