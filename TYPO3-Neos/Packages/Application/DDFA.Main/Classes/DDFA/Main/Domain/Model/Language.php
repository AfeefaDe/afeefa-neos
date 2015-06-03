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
class Language extends BasicEntity {
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
    public function getCode() {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode($code) {
        $this->code = $code;
    }

    /**
     * @return mixed
     */
    public function getLanguage() {
        return $this->language;
    }

    /**
     * @param mixed $language
     */
    public function setLanguage($language) {
        $this->language = $language;
    }

    /**
     * @return mixed
     */
    public function getRtl() {
        return $this->rtl;
    }

    /**
     * @param mixed $rtl
     */
    public function setRtl($rtl) {
        $this->rtl = $rtl;
    }
}