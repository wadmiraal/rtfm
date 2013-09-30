<?php

/**
 * @file
 * Defines the HTML H1 block element.
 */

namespace RTFM\Html\Block;

use RTFM\Block\IBlock;
use RTFM\Block\BaseH1;

class HtmlBlockH1 extends BaseH1
{
    public function output() 
    {
        return "\n<h1>" . preg_replace('/^!{6}/', '', $this->text) . '</h1>';
    }
}
