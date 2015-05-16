<?php
namespace DDFA\Main\Domain\Model;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DateTime;
use DDFA\Main\Domain\Model\Category;
use DDFA\Main\Utility\DDConst;
use DDFA\Main\Utility\DDHelpers;
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
     * @Flow\Identity
     * @var string
     * @ORM\Id
     * @ORM\Column(name="persistence_object_identifier", type="guid", length=40, unique=true, nullable=false)
     */
    protected $Persistence_Object_Identifier;

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
     * @ORM\Column(nullable=true)
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
     * @var Collection<\DDFA\Main\Domain\Model\TargetGroup>
     * @ORM\ManyToMany()
     */
    protected $targetGroups;

    /**
     * @var string
     */
    protected $locale;

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
        $this->setEntryId(uniqid());
        $this->setLocale(DDConst::LOCALE_STD);
        $now = new DateTime();
        $this->setCreated($now);
        $this->setUpdated($now);
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