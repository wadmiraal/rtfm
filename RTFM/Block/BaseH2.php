<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH2 extends AbstractBlock
{
    /**
     * @inherit
     */
    public static function register($string) {
        return preg_match('/^!{5}/', $string);
    }

    /**
     * @inherit
     */
    public function output()
    {
        return preg_replace('/^!{5}/', '', $this->text);
    }
}
