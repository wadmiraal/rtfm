<?php

namespace RTFM\Block;

use RTFM\Block\BaseList;

class BaseOl extends BaseList
{
    /**
     * @inherit
     */
    protected static $symbol = '#';

    /**
     * @inherit
     */
    public function output()
    {
        $this->listIt();
        return !empty($this->list) ? ' # ' . implode("\n # ", $this->list) : '';
    }
}
