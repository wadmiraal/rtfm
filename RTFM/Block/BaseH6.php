<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH6 extends AbstractBlock
{
    /**
     * @{inheritDoc}
     */
    public static function register($string) {
        return !!preg_match('/^!/', trim($string));
    }
}
