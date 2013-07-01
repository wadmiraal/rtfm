<?php

namespace RTFM\Block;

use RTFM\Block\IBlock;

class Ol implements IBlock
{
    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $text;
        $this->formatted = "\n<ol>" . $this->listIt() . "\n</ol>";
    }

    protected function listIt()
    {
        $list = '';
        $first = true;
        $items = explode("\n", $this->text);
        foreach ($items as $item) {
            // New item.
            if (preg_match('/^#{1}/', $item)) {
                $list .= ($first ? '' : '</li>') . "\n\t<li>" . ltrim(preg_replace('/^#{1}/', '', $item));
            }
            // Just a new line, but still the same item.
            else {
                $list .= "<br />\n\t" . ltrim($item);
            }

            if ($first) {
                $first = false;
            }
        }
        return $list . '</li>';
    }

    /**
     *
     */
    public function output()
    {
        return $this->formatted;
    }
}
