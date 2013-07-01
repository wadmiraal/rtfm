<?php

namespace RTFM\Block;

use RTFM\Block\IBlock;

class P implements IBlock
{
    protected $text;

    protected $formatted;

    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $text;
        $this->formatted = "\n<p>" . $text . '</p>';
    }

    /**
     *
     */
    public function output()
    {
        return $this->formatted;
    }
}
