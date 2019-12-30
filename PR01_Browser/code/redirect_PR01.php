<!DOCTYPE html>
<html>
<head>
	<title>Mechanical Turk HIT</title>
	
</head>
<body>


<script>

function getParamFromURL(name)
{
  name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
  var regexS = "[\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
// Take the user to a random URL, selected from the pool below 
var links = [];
var usernameFromParamString = getParamFromURL( 'workerId' );

links[0]="card_task_01.php"+"?workerId="+usernameFromParamString; // Expt 1: Paranoia Reversals 11-30-2017



function randomizeURL(linkArray)
{
	window.location=linkArray[Math.floor(Math.random()*linkArray.length)];
}

randomizeURL(links);
</script>

</body>
</html>
