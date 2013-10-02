<?php

/**
 * @file
 * Defines the abstract block element.
 */

namespace RTFM\Block;

use RTFM\Block\BlockInterface;

abstract class AbstractBlock implements BlockInterface
{
    /**
     * @var string 
     * Contains the block string.
     */
    protected $text;

    /**
     * @{inheritDoc}
     *
     * @throws Exception Method must be overriden.
     */
    public static function register($string)
    {
        throw new Exception("This method should be overriden.", 1);
    }

    /**
     * Constructor...
     *
     * @param  string $text
     */
    public function __construct($text)
    {
        $this->text = trim($text);
    }


    /**
     * @{inheritDoc}
     */
    public function output()
    {
        return $this->text;
    }
}
