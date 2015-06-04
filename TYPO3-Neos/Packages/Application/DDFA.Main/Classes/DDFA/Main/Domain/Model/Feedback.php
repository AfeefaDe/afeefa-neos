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
abstract class Feedback extends BasicEntity {

    /**
     * @var string
     */
    protected $author;

    /**
     * @var string
     */
    protected $mail;

    /**
     * @var string
     * @ORM\Column(type="text")
     *
     */
    protected $message;

    /**
     * @var string
     * @ORM\Column()
     */
    protected $metaData;

    public function __construct() {
        parent::__construct();
    }

    /**
     * @return string
     */
    public function getMail() {
        return $this->mail;
    }

    /**
     * @param string $mail
     */
    public function setMail($mail) {
        $this->mail = $mail;
    }

    /**
     * @return string
     */
    public function getAuthor() {
        return $this->author;
    }

    /**
     * @param string $author
     */
    public function setAuthor($author) {
        $this->author = $author;
    }

    /**
     * @return string
     */
    public function getMessage() {
        return $this->message;
    }

    /**
     * @param string $message
     */
    public function setMessage($message) {
        $this->message = $message;
    }
}