<?php

/**
 * @file
 * Defines the unit tests for the base P element.
 */

namespace RTFM\Test\Block;

use RTFM\Block\BaseP;
use RTFM\Test\RTFMTest;

class BasePTest extends RTFMTest 
{
    /**
     * Test registering a string.
     */
    public function testRegister()
    {
        $this->assertTrue(BaseP::register('sadjlsad'), 'The paragraph always registers a string.');
        $this->assertFalse(BaseP::register('   '), 'The paragraph does not register empty strings.');
    }

    /**
     * Test output, which should be identical, but trimmed.
     */
    public function testOutput()
    {
        foreach (array(
            "Hi there." => "Hi there.",
            "\nHi there.\r\n" => "Hi there.",
            "    Hi there.   " => "Hi there.",
        ) as $input => $output) {
            $p = new BaseP($input);
            $this->assertEquals($p->output(), $output, 'Output is as expected.');
        }
    }
}
