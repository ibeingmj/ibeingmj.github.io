<?Php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');

$dbservertype='mysql';
$servername='localhost';
$dbusername='root';
$dbpassword='';
$dbname='gitblog';

////////////////////////////////////////
////// DONOT EDIT BELOW  /////////
///////////////////////////////////////

connecttodb($servername,$dbname,$dbusername,$dbpassword);
function connecttodb($servername,$dbname,$dbuser,$dbpassword)
{
global $link;
$link=mysql_connect ("$servername","$dbuser","$dbpassword");
if(!$link){die("Could not connect to MySQL");}
mysql_select_db("$dbname",$link) or die ("could not open db".mysql_error());

}

?>