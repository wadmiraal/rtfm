<?php

namespace RTFM\Block;

use RTFM\Block\IBlock;

class H4 implements IBlock
{
    protected $text;

    protected $formatted;

    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $text;
        $this->formatted = "\n<h4>" . preg_replace('/^!{3}/', '', $text) . '</h4>';
    }

    /**
     *
     */
    public function output()
    {
        return $this->formatted;
    }
}
