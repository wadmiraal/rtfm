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

    const LINK = 'a';

    const BOLD = 'strong';

    const ITALIC = 'em';

    const UNDERLINE = 'u';

    const STRIKETHROUGH = 'del';

    const IMAGE = 'img';

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
        foreach ($this->inlineClasses() as $instance) {
            $output = $instance->insert($output);
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

            $block_string = $this->inlinify($block_string);

            $class = $this->fetchBlockClass($type);

            $blocks[] = new $class($block_string);
        }

        $this->blocks = $blocks;
    }

    /**
     *
     */
    protected function inlinify($string)
    {
        foreach ($this->inlineClasses() as $instance) {
            $string = $instance->ownEm($string);
        }
        return $string;
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

    /**
     *
     */
    protected function fetchInlineClass($type)
    {
        switch ($type) {
            case self::LINK:
            default:
                return 'RTFM\\Inline\\Link';
                /*
            case self::BOLD:
                return 'RTFM\\Inline\\Bold';
            case self::ITALIC:
                return 'RTFM\\Inline\\Italic';
            case self::UNDERLINE:
                return 'RTFM\\Block\\Underline';
            case self::STRIKETHROUGH:
                return 'RTFM\\Block\\Strikethrough';
            case self::IMAGE:
                return 'RTFM\\Block\\Image';
                */
        }
    }

    /**
     *
     */
    protected function inlineClasses()
    {
        static $inline_classes = array();

        if (empty($inline_classes)) {
            foreach (array(self::LINK, self::BOLD, self::ITALIC, self::UNDERLINE, self::STRIKETHROUGH, self::IMAGE) as $type) {
                $class = $this->fetchInlineClass($type);
                $inline_classes[$type] = new $class();
            }
        }

        return $inline_classes;
    }
}
