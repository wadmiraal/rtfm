<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH4 extends AbstractBlock
{
    /**
     * @{inheritDoc}
     */
    public static function register($string) {
        return !!preg_match('/^!{3}/', trim($string));
    }
}
