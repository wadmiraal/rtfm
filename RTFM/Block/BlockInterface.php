<?php

namespace RTFM\Block;

interface BlockInterface
{
    /**
     * Tell if the class is interested in registering the string.
     *
     * @param  string $string
     *
     * @return bool
     */
    public static function register($string);

    /**
     * Output the block.
     *
     * @return string
     */
    public function output();
}
