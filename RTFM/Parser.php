<?php

/**
 * @file
 * Defines the RTFM format main parser.
 *
 * The Parser takes a string and transforms it to HTML output. 
 * Form more information about the syntax, check the README.rtfm file.
 */

namespace RTFM;

class Parser
{
    /**
     * @const string
     * Defines an 1st level title block element.
     */
    const H1 = 'h1';

    /**
     * @const string
     * Defines a 2nd level title block element.
     */
    const H2 = 'h2';

    /**
     * @const string
     * Defines a 3rd level title block element.
     */
    const H3 = 'h3';

    /**
     * @const string 
     * Defines a 4th level title block element.
     */
    const H4 = 'h4';

    /**
     * @const string
     * Defines a 5th level title block element.
     */
    const H5 = 'h5';

    /**
     * @const string
     * Defines a 6th level title block element.
     */
    const H6 = 'h6';

    /**
     * @const string
     * Defines an unordered list block element.
     */
    const UL = 'ul';

    /**
     * @const string
     * Defines an ordered list block element.
     */
    const OL = 'ol';

    /**
     * @const string
     * Defines a definition list block element.
     */
    const DL = 'dl';

    /**
     * @const string
     * Defines a paragraph block element.
     */
    const P  = 'p';

    /**
     * @const string
     * Defines a link inline element.
     */
    const LINK = 'a';

    /**
     * @const string
     * Defines a blod inline element.
     */
    const BOLD = 'strong';

    /**
     * @const string
     * Defines a emphasize inline element.
     */
    const ITALIC = 'em';

    /**
     * @const string
     * Defines a underline inline element.
     */
    const UNDERLINE = 'u';

    /**
     * @const string
     * Defines a striked through inline element.
     */
    const STRIKETHROUGH = 'del';

    /**
     * @const string
     * Defines a image inline element.
     */
    const IMAGE = 'img';

    /**
     * @var array
     * Contains the text to parse.
     */
    protected $text;

    /**
     * @var array
     * Contains the list of block element instances.
     */
    protected $blocks;

    /**
     * Constructor...
     *
     * @param  string $text
     */
    public function __construct($text)
    {
        $this->normalize();
        $this->blockify();
    }

    /**
     * Outputs the parsed text.
     *
     * @return string
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
     * Normalize the line feeds by converting all \r and \r\n to \n.
     */
    protected function normalize()
    {
        $this->text = str_replace(array("\r\n", "\r"), "\n", $this->text);
    }

    /**
     * Parse the text and seperate it into block elements.
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
     * Call all available inline classes and make them register their string instances.
     * 
     * @param  string $string
     *
     * @return string
     */
    protected function inlinify($string)
    {
        foreach ($this->inlineClasses() as $instance) {
            $string = $instance->ownEm($string);
        }
        return $string;
    }

    /**
     * Helper method to fetch the used block class.
     * 
     * @param  string $type
     *         One of the block element constants.
     *
     * @return string
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
     * Helper method to fetch an inline class.
     * 
     * @param  string $type
     *         One of the inline element constants.
     *
     * @return string
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
     * Return a list of inline element class instances.
     *
     * @return array
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
