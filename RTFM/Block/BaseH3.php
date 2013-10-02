<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH3 extends AbstractBlock
{
    /**
     * @{inheritDoc}
     */
    public static function register($string) {
        return !!preg_match('/^!{4}/', trim($string));
    }
}
