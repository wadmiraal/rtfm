<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH2 extends AbstractBlock
{
    /**
     * @{inheritDoc}
     */
    public static function register($string) {
        return !!preg_match('/^!{5}/', trim($string));
    }
}
