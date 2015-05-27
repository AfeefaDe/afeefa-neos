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
class Language
{
    /**
     * @var string
     * @ORM\Id
     * @ORM\Column(name="persistence_object_identifier", type="string", length=40)
     * @Flow\Identity
     */
    protected $Persistence_Object_Identifier;

    /**
     * @var string
     * @Flow\Identity
     */
    protected $code;

    /**
     * @var string
     */
    protected $language;

    /**
     * @var bool
     */
    protected $rtl;

    /**
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode($code)
    {
        $this->code = $code;
    }

    /**
     * @return mixed
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * @param mixed $language
     */
    public function setLanguage($language)
    {
        $this->language = $language;
    }

    /**
     * @return string
     */
    public function getPersistenceObjectIdentifier()
    {
        return $this->Persistence_Object_Identifier;
    }

    /**
     * @param string $Persistence_Object_Identifier
     */
    public function setPersistenceObjectIdentifier($Persistence_Object_Identifier)
    {
        $this->Persistence_Object_Identifier = $Persistence_Object_Identifier;
    }

    /**
     * @return mixed
     */
    public function getRtl()
    {
        return $this->rtl;
    }

    /**
     * @param mixed $rtl
     */
    public function setRtl($rtl)
    {
        $this->rtl = $rtl;
    }
}