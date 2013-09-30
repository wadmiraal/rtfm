<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseH6 extends AbstractBlock
{
    /**
     * @inherit
     */
    public static function register($string) {
        return preg_match('/^!/', $string);
    }

    /**
     * @inherit
     */
    public function output()
    {
        return preg_replace('/^!/', '', $this->text);
    }
}
