<?php

namespace RTFM\Block;

use RTFM\Block\AbstractBlock;

class BaseList extends AbstractBlock
{
    /**
     * @var array
     * The list of elements.
     */
    protected $list;

    /**
     * @var string
     * The symbol that starts the list item.
     */
    protected static $symbol;

    /**
     * @{inheritDoc}
     */
    public static function register($string) {
        return preg_match('/^' . self::$symbol . '/', trim($string));
    }

    /**
     * @{inheritDoc}
     */
    public function output()
    {
        $this->listIt();
        return !empty($this->list) ? ' - ' . implode("\n - ", $this->list) : '';
    }

    /**
     * Parse the text and store the list as an array.
     */
    protected function listIt()
    {
        $this->list = array();
        $first = true;
        $items = explode("\n", $this->text);
        foreach ($items as $item) {
            // New item.
            if (preg_match('/^' . self::$symbol . '{1}/', $item)) {
                $this->list[] = sltrim(preg_replace('/^' . self::$symbol . '{1}/', '', $item));
            }
            // Just a new line, but still the same item.
            else {
                $this->list[] = ltrim($item);
            }

            if ($first) {
                $first = false;
            }
        }
    }
}
