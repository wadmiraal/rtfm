<?php

namespace RTFM\Block;

use RTFM\Block\BaseList;

class BaseOl extends BaseList
{
    /**
     * @{inheritDoc}
     */
    protected static $symbol = '#';

    /**
     * @{inheritDoc}
     */
    public function output()
    {
        $this->listIt();
        $output = '';
        if (!empty($this->list)) {
            foreach (array_values($this->list) as $i => $item) {
                $output .= ($i ? "\n" : '') . "$i.$item";
            }
        }
        return $output;
    }
}
