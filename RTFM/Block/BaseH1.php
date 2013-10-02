<?php

/**
 * @file
 * Defines the base H1 block element.
 */

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH1 extends AbstractBlock
{
    /**
     * @{inheritDoc}
     */
    public static function register($string) {
        return !!preg_match('/^!{6}/', trim($string));
    }
}
