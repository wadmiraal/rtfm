<?php

/**
 * @file
 * Defines the base H1 block element.
 */

namespace RTFM\Block;

use RTFM\Block\IBlock;

class BaseH1 extends AbstractBlock
{
    /**
     * @inherit
     */
    public static function register($string) {
        return preg_match('/^!{6}/', $string);
    }

    /**
     * @inherit
     */
    public function output()
    {
        return preg_replace('/^!{6}/', '', $this->text);
    }
}
