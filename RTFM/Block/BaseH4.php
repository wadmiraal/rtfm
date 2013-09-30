<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH4 extends AbstractBlock
{
    /**
     * @inherit
     */
    public static function register($string) {
        return preg_match('/^!{3}/', $string);
    }

    /**
     * @inherit
     */
    public function output()
    {
        return preg_replace('/^!{3}/', '', $this->text);
    }
}
