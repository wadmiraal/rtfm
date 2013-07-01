<?php

namespace RTFM\Block;

use RTFM\Block\IBlock;

class H2 implements IBlock
{
    protected $text;

    protected $formatted;

    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $text;
        $this->formatted = "\n<h2>" . preg_replace('/^!{5}/', '', $text) . '</h2>';
    }

    /**
     *
     */
    public function output()
    {
        return $this->formatted;
    }
}
