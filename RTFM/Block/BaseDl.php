<?php

namespace RTFM\Block;

use RTFM\Block\BaseList;

class BaseDl extends BaseList
{
    /**
     * @inherit
     */
    protected static $symbol = '-';

    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $text;
        $this->formatted = "\n<dl>" . $this->listIt() . "\n</dl>";
    }

    protected function __listIt()
    {
        $list = '';
        $first = true;
        $items = explode("\n", $this->text);
        foreach ($items as $item) {
            // New item.
            if (preg_match('/^\-{1}/', $item)) {
                $parts = explode(':', $item);
                $definition = array_pop($parts);
                $title = implode(':', $parts);
                $list .= ($first ? '' : '</dd>') . "\n\t<dt>" . trim(preg_replace('/^\-{1}/', '', $title)) . "</dt>\n\t<dd>" . trim($definition);
            }
            // Just a new line, but still the same item.
            else {
                $list .= "<br />\n\t" . ltrim($item);
            }

            if ($first) {
                $first = false;
            }
        }
        return $list . '</dd>';
    }

    /**
     *
     */
    public function output()
    {
        return $this->formatted;
    }
}
