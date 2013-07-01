<?php

namespace RTFM\Inline;

use RTFM\Inline\IInline;

class Link implements IInline
{
    protected $hashes;

    public function __construct()
    {
        $this->hashes = array();
    }

    public function ownEm($text)
    {
        $matches = array();
        // Formatted
        preg_match_all('/\(\([\w\-_\.\/\?\=\&]+(\|{1}[\w]+)?\)\)/', $text, $matches);
        if (!empty($matches[0])) {
            foreach ($matches[0] as $match) {
                $hash = md5($match);

                if (!isset($this->hashes[$hash])) {
                    $definition = trim(trim($match, '('), ')');
                    $parts = explode('|', $definition);
                    $url = array_shift($parts);
                    $link_title = count($parts) ? implode('|', $parts) : $url;
                    $link = '<a href="' . $url . '">' . $link_title . '</a>';
                    $this->hashes[$hash] = $link;
                }

                $text = str_replace($match, $hash, $text);
            }
        }

        // Inline URLs
        preg_match_all('/(https?:\/\/[\w\-_\.\/\?\=\&]+\s|www\.[\w\-_\.\/\?\=\&]+\s)/', $text, $matches);
        if (!empty($matches[0])) {
            foreach ($matches[0] as $match) {
                $match = trim($match);
                $hash = md5($match);

                if (!isset($this->hashes[$hash])) {
                    $url = (preg_match('/^https?:\/\//', $match) ? '' : 'http://') . $match;
                    $link = '<a href="' . $url . '">' . $match . '</a>';
                    $this->hashes[$hash] = $link;
                }

                $text = str_replace($match, $hash, $text);
            }
        }

        return $text;
    }

    public function insert($text)
    {
        foreach ($this->hashes as $hash => $link) {
            $text = str_replace($hash, $link, $text);
        }
        return $text;
    }
}
