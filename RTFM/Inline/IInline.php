<?php

/**
 * @file
 * Defines the inline element interface.
 */ 

namespace RTFM\Inline;

interface IInline
{
    /**
     * Own all occurences of inline elements that appear in the string.
     *
     * @param  string $text.
     */
    public function ownEm($text);

    /**
     * Insert the rendered occurences of inline elements that appear in the string.
     *
     * @param  string $text.
     */
    public function insert($text);
}
