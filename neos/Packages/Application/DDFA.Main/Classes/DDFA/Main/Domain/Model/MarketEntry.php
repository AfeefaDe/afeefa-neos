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
 */
class MarketEntry extends Actor
{
    /**
     * @var boolean
     * @ORM\Column(nullable=true)
     */
    protected $offer;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $dateFrom;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $dateTo;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $timeFrom;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $timeTo;

    /**
     * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\Location>
     * @ORM\OneToMany(mappedBy="marketEntry")
     */
    protected $location;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $area;

    /**
     * @var MarketEntry
     * @ORM\ManyToOne(targetEntity="DDFA\Main\Domain\Model\MarketEntry")
     * @ORM\JoinColumn(name="parent_entry_id", referencedColumnName="persistence_object_identifier")
     */
    protected $parentEntry;

    /**
     * @var \Doctrine\Common\Collections\Collection<\DDFA\Main\Domain\Model\MarketEntry>
     * @ORM\OneToMany(mappedBy="parentEntry")
     */
    protected $childEntries;

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
     * @var Category
     * @ORM\ManyToOne(targetEntity="DDFA\Main\Domain\Model\Category")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="persistence_object_identifier")
     * @ORM\Column(nullable=true)
     */
    protected $category;

    /**
     * @var string
     * @ORM\Column(nullable=true)
     */
    protected $subCategory;

    /**
     * @var int
     * @ORM\Column(nullable=false)
     */
    protected $type = DDConst::OWNER_MARKET;

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

    /**
     * @var boolean
     * @ORM\Column(nullable=false),
     */
    protected $certified = false;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * @param \Doctrine\Common\Collections\Collection $location
     * @return void
     */
    public function setLocation($location)
    {
        $this->location = $location;
    }

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

    /**
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param int $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return string
     */
    public function getArea()
    {
        return $this->area;
    }

    /**
     * @param string $area
     */
    public function setArea($area)
    {
        $this->area = $area;
    }

    /**
     * @return string
     */
    public function getDateFrom()
    {
        return $this->dateFrom;
    }

    /**
     * @param string $dateFrom
     */
    public function setDateFrom($dateFrom)
    {
        $this->dateFrom = $dateFrom;
    }

    /**
     * @return string
     */
    public function getDateTo()
    {
        return $this->dateTo;
    }

    /**
     * @param string $dateTo
     */
    public function setDateTo($dateTo)
    {
        $this->dateTo = $dateTo;
    }

    /**
     * @return string
     */
    public function getTimeFrom()
    {
        return $this->timeFrom;
    }

    /**
     * @param string $timeFrom
     */
    public function setTimeFrom($timeFrom)
    {
        $this->timeFrom = $timeFrom;
    }

    /**
     * @return string
     */
    public function getTimeTo()
    {
        return $this->timeTo;
    }

    /**
     * @param string $timeTo
     */
    public function setTimeTo($timeTo)
    {
        $this->timeTo = $timeTo;
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
     * @return Category
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

    /**
     * @return Collection
     */
    public function getChildEntries()
    {
        return $this->childEntries;
    }

    /**
     * @param Collection $childEntries
     */
    public function setChildEntries($childEntries)
    {
        $this->childEntries = $childEntries;
    }

    /**
     * @return MarketEntry
     */
    public function getParentEntry()
    {
        return $this->parentEntry;
    }

    /**
     * @param MarketEntry $parentEntry
     */
    public function setParentEntry($parentEntry)
    {
        $this->parentEntry = $parentEntry;
    }

    /**
     * @return boolean
     */
    public function isCertified()
    {
        return $this->certified;
    }

    /**
     * @param boolean $certified
     */
    public function setCertified($certified)
    {
        $this->certified = $certified;
    }
}