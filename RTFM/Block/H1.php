<?php

namespace RTFM\Block;

use RTFM\Block\IBlock;

class H1 implements IBlock
{
    protected $text;

    protected $formatted;

    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $text;
        $this->formatted = "\n<h1>" . preg_replace('/^!{6}/', '', $text) . '</h1>';
    }

    /**
     *
     */
    public function output()
    {
        return $this->formatted;
    }
}
