<?php

require "RTFM/Parser.php";
require "RTFM/Block/IBlock.php";
require "RTFM/Block/H1.php";
require "RTFM/Block/H2.php";
require "RTFM/Block/H3.php";
require "RTFM/Block/H4.php";
require "RTFM/Block/H5.php";
require "RTFM/Block/H6.php";
require "RTFM/Block/Ul.php";
require "RTFM/Block/Ol.php";
require "RTFM/Block/Dl.php";
require "RTFM/Block/P.php";
require "RTFM/Inline/IInline.php";
require "RTFM/Inline/Link.php";

$text = "aslkdfjlksajdfkjsakfl ((asdlkjlasdlasldlasdljk|asdljklasdljkasd)) jasdlfjasd jkflkasdj dflasjdf asin(sadfkljlaskdjfl http://www.google.com/eee3ee http://www.google.com?sadkljasd&sadkjhasd=sadasd asdlkélsadélkasd www.google.com lasldk jalsdj s
skdfj lksajdf kljsaldfj ljsad flkjlasd jflkj
asélkdfj lkasjdfl asjkdlfjk asldfasdf)

!!!!!!h1

!!!!!h2

!!!!h3

!!!h4

!!h5

!h6

My paragraph asdlkj aslfdkjsdaklfj *sadkjfl* /sadlkfjl ksadfjksaldf/ kjaslkdjf sad\/ldjfls jfljdskaf _lksd falkjasd_ fjlaskjdf --lkasjdfoisa dfjias --dfojiasd jfiojiasdjf oijsadfo ioasdjf iaosdfj oasidfj aiosdjf asoidfj oasijdf osadjf oajsdf.

* list 1
* list 2
new line
* list 3
* list 4

# list 1
# list 2
# list 3

- df 1: definition 1
- df 1: : definition 1
- df 2:
definition 2
- df 3: definition 3
next line
- df 4 ::
definition 4
definition 4  next line";

$parser = new RTFM\Parser($text);

print $parser->output();
