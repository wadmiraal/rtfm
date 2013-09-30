<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseP extends AbstractBlock
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
