<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Category;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Entity
 * @ORM\MappedSuperclass()
 */
abstract class Object
{

    /**
     * @var string
     * @ORM\Column(name="entry_id")
     */
    protected $entryId;

    /**
     * @var string
     * @Flow\Identity
     */
    protected $name;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var string
     * @Flow\Identity
     */
    protected $mail;

    /**
     * @var string
     */
    protected $web;

    /**
     * @var string
     */
    protected $phone;

    /**
     * @var integer
     */
    protected $rating;

    /**
     * @var Collection<\DDFA\Main\Domain\Model\Tag>
     * @ORM\ManyToMany()
     */
    protected $tags;

    /**
     * @var Category
     * @ORM\ManyToOne(targetEntity="DDFA\Main\Domain\Model\Category")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="persistence_object_identifier")
     */
    protected $category;

    /**
     * @var Collection<\DDFA\Main\Domain\Model\TargetGroup>
     * @ORM\ManyToMany()
     */
    protected $targetGroups;

    /**
     * @var string
     */
    protected $locale;

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
    public function getMail()
    {
        return $this->mail;
    }

    /**
     * @param string $mail
     * @return void
     */
    public function setMail($mail)
    {
        $this->mail = $mail;
    }

    /**
     * @return string
     */
    public function getWeb()
    {
        return $this->web;
    }

    /**
     * @param string $web
     * @return void
     */
    public function setWeb($web)
    {
        $this->web = $web;
    }

    /**
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param string $phone
     * @return void
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
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
     * @return Collection
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * @param Collection $tags
     * @return void
     */
    public function setTags(Collection $tags)
    {
        $this->tags = $tags;
    }

    /**
     * @return Collection
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param Collection $category
     * @return void
     */
    public function setCategory($category)
    {
        $this->category = $category;
    }

    /**
     * @return Collection
     */
    public function getTargetGroups()
    {
        return $this->targetGroups;
    }

    /**
     * @param Collection $targetGroups
     * @return void
     */
    public function setTargetGroups($targetGroups)
    {
        $this->targetGroups = $targetGroups;
    }

    /**
     * @return int
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * @param int $rating
     */
    public function setRating($rating)
    {
        $this->rating = $rating;
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