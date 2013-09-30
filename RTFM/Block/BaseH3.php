<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH3 extends AbstractBlock
{
    /**
     * @inherit
     */
    public static function register($string) {
        return preg_match('/^!{4}/', $string);
    }

    /**
     * @inherit
     */
    public function output()
    {
        return preg_replace('/^!{4}/', '', $this->text);
    }
}
