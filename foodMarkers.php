<?php
require("dbinfo.php");
$dbname = foodtrucks;
// Start XML file, create parent node
$tree = new DOMDocument('1.0', 'UTF-8');
/*create root element of xml tree*/
$root = $tree->createElement("markers");
/*append to doc created*/
$root = $tree -> appendChild($root);

$currentMarker = $tree->createElement("marker");
$currentMarker = $root -> appendChild("currentMarker");


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


// Select all the rows in the markers table
$sql = "SELECT * FROM foodtrucks WHERE 1";
echo "<br> $sql";
$result = $conn->query($sql);
if (!$result) {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each
while ($row = $result->fetch_assoc()){
  // ADD TO XM DOCUMENT NODE
  $currentMarker->appendChild($domtree->createElement("marker"));
  $currentMarker->createAttribute('name',$row['name']));
  $currentMarker->createAttribute('address',$row['address']));
  $currentMarker->createAttribute('address',$row['address']));
  $currentMarker->createAttribute('lat',$row['lat']));
  $currentMarker->createAttribute('lng',$row['lng']));
  $currentMarker->createAttribute('type',$row['type']));
}
/*print xml*/
echo $domtree -> saveXML();

?>