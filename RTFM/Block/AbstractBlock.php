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
     * @inherit
     */
    abstract public static function register($string);

    /**
     * Constructor...
     *
     * @param  string $text
     */
    public function __construct($text)
    {
        $this->text = $text;
    }
}
