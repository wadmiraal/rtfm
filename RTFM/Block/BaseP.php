<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseP extends AbstractBlock
{
    /**
     * @{inheritDoc}
     */
    public static function register($string) 
    {
        $string = trim($string);
        return !empty($string);
    }
}
