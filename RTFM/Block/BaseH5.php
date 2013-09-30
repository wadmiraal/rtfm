<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH5 extends AbstractBlock
{
    /**
     * @inherit
     */
    public static function register($string) {
        return preg_match('/^!{2}/', $string);
    }

    /**
     * @inherit
     */
    public function output()
    {
        return preg_replace('/^!{2}/', '', $this->text);
    }
}
