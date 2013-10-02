<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH5 extends AbstractBlock
{
    /**
     * @{inheritDoc}
     */
    public static function register($string) {
        return !!preg_match('/^!{2}/', trim($string));
    }
}
