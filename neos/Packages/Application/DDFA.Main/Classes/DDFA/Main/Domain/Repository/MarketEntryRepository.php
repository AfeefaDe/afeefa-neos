<?php
namespace DDFA\Main\Domain\Repository;

/*                                                                        *
 * This script belongs to the TYPO3 Flow package "DDFA.Main".             *
 *                                                                        *
 *                                                                        */

use DDFA\Main\Domain\Model\Actor;
use DDFA\Main\Domain\Model\MarketEntry;
use DDFA\Main\Utility\DDConst;
use ReflectionObject;
use TYPO3\Flow\Annotations as Flow;

/**
 * @Flow\Scope("singleton")
 */
class MarketEntryRepository extends AbstractTranslationRepository
{
    /**
     * @Flow\Inject
     * @var LanguageRepository
     */
    protected $languageRepository;


    /**
     * @param $id
     * @return MarketEntry
     */
    public function findById($id)
    {
        $query = $this->createQuery();
        $query = $query->matching($query->equals('Persistence_Object_Identifier', $id));
        return $query->execute()->getFirst();
    }


    /**
     * @param string $locale
     * @param bool $onlyPublished
     * @return array
     */
    public function findAllSupplemented($locale, $onlyPublished = false, $hidePastEvents = false)
    {
        $all = $this->findByLocale(DDConst::LOCALE_STD);
        $result = array();
        foreach ($all as $o) {
            // filter past events
            if( $hidePastEvents && ($o->getType() == 1 || $o->getType() == 2) && $this->isPastEvent($o) )
                continue;
            
            // filter by published
            if (!$onlyPublished || $o->getPublished())
                array_push($result, $this->supplementFromParent($this->hydrate($o, $locale, DDConst::OWNER_MARKET)));
        }
        return $result;
    }

    public function isPastEvent( $marketEntry )
    {
        $dateFrom = $marketEntry->getDateFrom() ? strtotime($marketEntry->getDateFrom()) : null;
        $dateTo = $marketEntry->getDateTo() ? strtotime($marketEntry->getDateTo()) : null;

        if( $dateFrom || $dateTo ){
            // add one day to the event to make it comparable with today (only the date matters, not the hour)
            if($dateFrom) $dateFrom + (24 * 60 * 60);
            if($dateTo) $dateTo + (24 * 60 * 60);

            if( $dateTo && $dateTo < time() ) return true;
            if( $dateFrom && $dateFrom < time() ) return true;
        }
        return false;
    }

    public function findOneSupplemented($marketentry, $locale, $onlyPublished = false) {
        $object = $this->findOneLocalized($marketentry, DDConst::LOCALE_STD);
        if(!$onlyPublished || $object->getPublished())
            return $this->supplementFromParent($this->hydrate($object, $locale, DDConst::OWNER_MARKET));
        else
            return null;
    }

    /**
     * @param MarketEntry $marketentry
     * @return MarketEntry
     */
    public function supplementFromParent(MarketEntry $marketentry)
    {

        $emptyParams = $this->findEmptyMEParams($marketentry);
        if (sizeof($emptyParams) != 0) {
            $parent = $marketentry->getParentEntry();

            if ($parent != null) {
                $parent = $this->supplementFromParent($parent);

                $parentReflection = new ReflectionObject($parent);
                $sourceReflection = new ReflectionObject($marketentry);

                foreach ($sourceReflection->getProperties() as $property) {

                    if (in_array($property->getName(), $emptyParams)) {
                        $property->setAccessible(true);

                        $name = $property->getName();
                        if ($parentReflection->hasProperty($name)) {
                            $parentProperty = $parentReflection->getProperty($name);
                            $parentProperty->setAccessible(true);
                            $property->setValue($marketentry, $parentProperty->getValue($parent));
                        }
                    }
                }
            }
        }

        return $marketentry;
    }

    /**
     * @param MarketEntry $object
     * @return array
     */
    public function findEmptyMEParams(MarketEntry $object)
    {
        $props = [];
        $reflection = new ReflectionObject($object);

        foreach ($reflection->getProperties() as $property) {
            if (in_array($property->getName(), DDConst::ME_SUPPLEMENT_PROPS)) {
                $property->setAccessible(true);

                $value = $property->getValue($object);
                if ($value == null || $value == "") {
                    array_push($props, $property->getName());
                }
            }
        }
        return $props;
    }
}