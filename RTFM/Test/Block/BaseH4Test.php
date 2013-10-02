<?php

/**
 * @file
 * Defines the unit tests for the base P element.
 */

namespace RTFM\Test\Block;

use RTFM\Block\BaseH4;
use RTFM\Test\RTFMTest;

class BaseH4Test extends RTFMTest 
{
    /**
     * Test registering a string.
     */
    public function testRegister()
    {
        $this->assertFalse(BaseH4::register('sadjlsad'), 'The string was correctly refused.');
        $this->assertFalse(BaseH4::register("\n!!sadkljaskldjasd"), 'The string was correctly refused.');
        $this->assertFalse(BaseH4::register(' !!sadkljaskldjasd'), 'The string was correctly refused.');
        $this->assertFalse(BaseH4::register('!!sadkljaskldjasd'), 'The string was correctly refused.');
        $this->assertTrue(BaseH4::register('  !!!sadkljaskldjasd'), 'The string was correctly registered.');
        $this->assertTrue(BaseH4::register('  !!!  sadkljaskldjasd'), 'The string was correctly registered.');
        $this->assertTrue(BaseH4::register("\n!!!sadkljaskldjasd"), 'The string was correctly registered.');
    }

    /**
     * Test output, which should be identical, but trimmed.
     */
    public function testOutput()
    {
        foreach (array(
            "!!!Hi there." => "!!!Hi there.",
            "\n!!!Hi there.\r\n" => "!!!Hi there.",
            "    !!!Hi there.   " => "!!!Hi there.",
        ) as $input => $output) {
            $p = new BaseH4($input);
            $this->assertEquals($p->output(), $output, 'Output is as expected.');
        }
    }
}
