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
        $this->text = $text;
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
            $output .= "\n\n" . $block->output();
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
        $this->blocks = array();
        $block_strings = explode("\n\n", $this->text);

        foreach ($block_strings as $block_string) {
            foreach ($this->blockClasses() as $type => $class) {
                if ($class::register($block_string)) {
                    $this->blocks[] = new $class($block_string);
                    continue;
                }
            }
        }
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
        $block_classes = $this->blockClasses();
        return !empty($block_classes[$type]) ? $block_classes[$type] : NULL;
    }

    /**
     * Return a list of block classes.
     *
     * @return array
     */
    protected function blockClasses()
    {
        static $block_classes = array();

        if (empty($block_classes)) {
            foreach (array(
                self::H1 => 'RTFM\\Block\\BaseH1',
                self::H2 => 'RTFM\\Block\\BaseH2',
                self::H3 => 'RTFM\\Block\\BaseH3',
                self::H4 => 'RTFM\\Block\\BaseH4',
                self::H5 => 'RTFM\\Block\\BaseH5',
                self::H6 => 'RTFM\\Block\\BaseH6',
                self::UL => 'RTFM\\Block\\BaseUl',
                self::OL => 'RTFM\\Block\\BaseOl',
                self::DL => 'RTFM\\Block\\BaseDl',
                self::P  => 'RTFM\\Block\\BaseP',
            ) as $type => $class) {
                $block_classes[$type] = $class;
            }
        }

        return $block_classes;
    }

    /**
     * Helper method to fetch an inline class instance.
     * 
     * @param  string $type
     *         One of the inline element constants.
     *
     * @return InlineInterface|null
     */
    protected function fetchInlineClass($type)
    {
        $inline_classes = $this->inlineClasses();
        return !empty($inline_classes[$type]) ? $inline_classes[$type] : NULL;
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
            foreach (array(
                self::LINK => 'RTFM\\Inline\\Link', 
                self::BOLD => 'RTFM\\Inline\\Bold', 
                self::ITALIC => 'RTFM\\Inline\\Italic', 
                self::UNDERLINE => 'RTFM\\Inline\\Underline', 
                self::STRIKETHROUGH => 'RTFM\\Inline\\Strikethrough', 
                self::IMAGE => 'RTFM\\Inline\\Image'
            ) as $type) {
                $inline_classes[$type] = new $class();
            }
        }

        return $inline_classes;
    }
}
