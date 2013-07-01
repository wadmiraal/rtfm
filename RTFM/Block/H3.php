<?php

namespace RTFM\Block;

use RTFM\Block\IBlock;

class H3 implements IBlock
{
    protected $text;

    protected $formatted;

    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $text;
        $this->formatted = "\n<h3>" . preg_replace('/^!{4}/', '', $text) . '</h3>';
    }

    /**
     *
     */
    public function output()
    {
        return $this->formatted;
    }
}
