<?php

namespace RTFM;

class Parser
{
    const H1 = 'h1';

    const H2 = 'h2';

    const H3 = 'h3';

    const H4 = 'h4';

    const H5 = 'h5';

    const H6 = 'h6';

    const UL = 'ul';

    const OL = 'ol';

    const DL = 'dl';

    const P  = 'p';


    protected $text;

    protected $blocks;

    /**
     *
     */
    public function __construct($text)
    {
        $this->text = $this->normalize($text);

        $this->blockify();
    }

    /**
     *
     */
    public function output()
    {
        $output = '';
        foreach ($this->blocks as $block) {
            $output .= $block->output();
        }
        return $output;
    }

    /**
     *
     */
    protected function normalize($text)
    {
        return str_replace(array("\r\n", "\r"), "\n", $text);
    }

    /**
     *
     */
    protected function blockify()
    {
        $blocks = array();
        $block_strings = explode("\n\n", $this->text);

        foreach ($block_strings as $block_string) {
            if (preg_match('/^!{6}/', $block_string)) {
                $type = self::H1;
            }
            elseif (preg_match('/^!{5}/', $block_string)) {
                $type = self::H2;
            }
            elseif (preg_match('/^!{4}/', $block_string)) {
                $type = self::H3;
            }
            elseif (preg_match('/^!{3}/', $block_string)) {
                $type = self::H4;
            }
            elseif (preg_match('/^!{2}/', $block_string)) {
                $type = self::H5;
            }
            elseif (preg_match('/^!/', $block_string)) {
                $type = self::H6;
            }
            elseif (preg_match('/^\*/', $block_string)) {
                $type = self::UL;
            }
            elseif (preg_match('/^#/', $block_string)) {
                $type = self::OL;
            }
            elseif (preg_match('/^-/', $block_string)) {
                $type = self::DL;
            }
            else {
                $type = self::P;
            }

            $class = $this->fetchBlockClass($type);
            $blocks[] = new $class($block_string);
        }

        $this->blocks = $blocks;
    }

    /**
     *
     */
    protected function fetchBlockClass($type)
    {
        switch ($type) {
            case self::H1:
                return 'RTFM\\Block\\H1';
            case self::H2:
                return 'RTFM\\Block\\H2';
            case self::H3:
                return 'RTFM\\Block\\H3';
            case self::H4:
                return 'RTFM\\Block\\H4';
            case self::H5:
                return 'RTFM\\Block\\H5';
            case self::H6:
                return 'RTFM\\Block\\H6';
            case self::UL:
                return 'RTFM\\Block\\Ul';
            case self::OL:
                return 'RTFM\\Block\\Ol';
            case self::DL:
                return 'RTFM\\Block\\Dl';
            default:
                return 'RTFM\\Block\\P';
        }
    }
}
