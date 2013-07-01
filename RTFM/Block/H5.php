<?php

namespace RTFM\Block;

use RTFM\Block\IBlock;

class H5 implements IBlock
{
    protected $text;

    protected $formatted;

    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $text;
        $this->formatted = "\n<h5>" . preg_replace('/^!{2}/', '', $text) . '</h5>';
    }

    /**
     *
     */
    public function output()
    {
        return $this->formatted;
    }
}
