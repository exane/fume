<?php

setcookie("username","",time() - 999999999999999999, '/', NULL, 0 );  
setcookie("passwort","",time() - 999999999999999999, '/', NULL, 0 );
session_destroy("username");