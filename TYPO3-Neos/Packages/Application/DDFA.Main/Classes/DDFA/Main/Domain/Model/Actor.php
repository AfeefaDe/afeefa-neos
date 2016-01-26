<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Utility\DDConst;
use Doctrine\Common\Collections\Collection as Collection;
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
     * @ORM\Column(nullable=true)
     */
    protected $name;

    /**
     * @var string
     * @ORM\Column(nullable=true,type="text")
     */
    protected $description;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $mail;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $web;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $facebook;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $phone;

    /**
     * @var integer
     * @ORM\Column(nullable=true)
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
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $subCategory;

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
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $speakerPublic;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $speakerPrivate;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $image;

    //TODO: change to type enum
    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $imageType;

    /**
     * @var boolean
     * @ORM\Column(nullable=true)
     */
    protected $supportWanted;

    /**
     * @var boolean
     * @ORM\Column(nullable=true)
     */
    protected $forChildren;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $spokenLanguages;

    /**
     * @var boolean
     * @ORM\Column(nullable=true)
     */
    protected $published;

    /**
     * @var string
     * @ORM\Column(nullable=true,type="text")
     */
    protected $internalComment;

    public function __construct()
    {
        parent::__construct();
        $this->setEntryId(uniqid());
        $this->setLocale(DDConst::LOCALE_STD);
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

    /**
     * @return string
     */
    public function getSpeakerPublic()
    {
        return $this->speakerPublic;
    }

    /**
     * @param string $speakerPublic
     */
    public function setSpeakerPublic($speakerPublic)
    {
        $this->speakerPublic = $speakerPublic;
    }

    /**
     * @return string
     */
    public function getSpeakerPrivate()
    {
        return $this->speakerPrivate;
    }

    /**
     * @param string $speakerPrivate
     */
    public function setSpeakerPrivate($speakerPrivate)
    {
        $this->speakerPrivate = $speakerPrivate;
    }

    /**
     * @return string
     */
    public function getFacebook()
    {
        return $this->facebook;
    }

    /**
     * @param string $facebook
     */
    public function setFacebook($facebook)
    {
        $this->facebook = $facebook;
    }

    /**
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param string $image
     */
    public function setImage($image)
    {
        $this->image = $image;
    }

    /**
     * @return string
     */
    public function getImageType()
    {
        return $this->imageType;
    }

    /**
     * @param string $imageType
     */
    public function setImageType($imageType)
    {
        $this->imageType = $imageType;
    }

    /**
     * @return boolean
     */
    public function isSupportWanted()
    {
        return $this->supportWanted;
    }

    /**
     * @param boolean $supportWanted
     */
    public function setSupportWanted($supportWanted)
    {
        $this->supportWanted = $supportWanted;
    }

    /**
     * @return string
     */
    public function getSpokenLanguages()
    {
        return $this->spokenLanguages;
    }

    /**
     * @param string $spokenLanguages
     */
    public function setSpokenLanguages($spokenLanguages)
    {
        $this->spokenLanguages = $spokenLanguages;
    }

    /**
     * @return mixed
     */
    public function getPublished()
    {
        return $this->published;
    }

    /**
     * @param mixed $published
     */
    public function setPublished($published)
    {
        $this->published = $published;
    }

    /**
     * @return string
     */
    public function getSubCategory()
    {
        return $this->subCategory;
    }

    /**
     * @param string $subCategory
     */
    public function setSubCategory($subCategory)
    {
        $this->subCategory = $subCategory;
    }

    /**
     * @return mixed
     */
    public function getInternalComment()
    {
        return $this->internalComment;
    }

    /**
     * @param mixed $internalComment
     */
    public function setInternalComment($internalComment)
    {
        $this->internalComment = $internalComment;
    }

    /**
     * @return boolean
     */
    public function isForChildren()
    {
        return $this->forChildren;
    }

    /**
     * @param boolean $forChildren
     */
    public function setForChildren($forChildren)
    {
        $this->forChildren = $forChildren;
    }
}