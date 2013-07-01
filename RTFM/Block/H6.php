<?php

namespace RTFM\Block;

use RTFM\Block\IBlock;

class H6 implements IBlock
{
    protected $text;

    protected $formatted;

    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $text;
        $this->formatted = "\n<h6>" . preg_replace('/^!/', '', $text) . '</h6>';
    }

    /**
     *
     */
    public function output()
    {
        return $this->formatted;
    }
}
