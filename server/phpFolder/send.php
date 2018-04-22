<?php
$url = 'localhost:5000/login';

$ch = curl_init($url);

$data = array(
    'email' => $_POST["username"],
    'password' => $_POST["password"]
);
$payload = json_encode($data);

curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

//set the content type to application/json
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

//return response instead of outputting
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//execute the POST request
$result = curl_exec($ch);
//echo $result;

$result1 = json_decode($result);
print "$result";
if((string)$result1->login=="False")
  {
    print "$result1->login";
    header("Location: http://www.localhost:5000/second.html");
    die();
  }
//close cURL resource

curl_close($ch);

?>