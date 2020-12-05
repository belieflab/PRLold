<?php
//======================================================================
// DATABASE CONNECTION [root]onmibus/php/config.php
//======================================================================
// RPH 2020/08/16   Catch all MySQL errors
//                  standard function to re-connect to the database 

// include_once( ROOT_PATH.'/php/path.php' );

/* -- Set Up Error Handling, Dev View, User View, Error Level, Logging -- */
/* Important - Comment Error Reporting Section out before going live!!!   */
/*             No. Do not supress errors. 
               Certainly hide error messages from users, but provide an explanation
                 of the situation.
               LOG ERRORS, especially in production. Users do not read, undersand, or record
                 error messages. So log them so support can fix the problem.
               [https://phpdelusions.net/mysqli/error_reporting] seems to understand
                 the situation.
*/
error_reporting( E_ALL );
ini_set( 'display_errors', 0 ); // RPH: set this to 0 in Production once
                                //      logging is set up
// ini_set( 'log_errors ', 1 ); //      This sets up logging. TODO
// there are other ways to set up these two flags
/* --------------------------------------------------------------------- */

/* -- Set Up Database Interaction, CONNECT, reCONNECT, Errors, etc. ---- */
// Database Connection Parameters

if ( file_exists( $_SERVER[ "DOCUMENT_ROOT" ] . '/omnibus.dev' ) ) { // development machine; please add 'omnibus.dev' to htdocs
  DEFINE( 'DB_HOST',     "localhost" );
} else {
  DEFINE( 'DB_HOST',     "24.218.193.14" );
}

DEFINE( 'DB_USER',     "jason" );
DEFINE( 'DB_PASSWORD', "dingdong" ); // Note: this should be your root password
DEFINE( 'DB_NAME',     "omnibus" );
DEFINE( 'SALT',        "graduate" );

// RPH 2020/08/16
/*
    https://stackoverflow.com/questions/22662488/mysqli-fetch-assoc-expects-parameter-call-to-a-member-function-bind-param
  Sometimes your MySQLi code produces an error like mysqli_fetch_assoc() expects parameter..., Call to a member function bind_param()... or similar. Or even without any error, but the query doesn't work all the same. It means that your query failed to execute.

  Every time a query fails, MySQL has an error message that explains the reason. Unfortunately, by default such errors are not transferred to PHP, and all you've got is a cryptic error message mentioned above. Hence it is very important to configure PHP and MySQLi to report MySQL errors to you. And once you get the error message, fixing it will be a piece of cake.
 */
// mysqli configured to throw a PHP exception in case of any mysql error
mysqli_report( MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT );
define( "MYSQL_CONN_ERROR", "Unable to connect to database." );

try {
    $db_connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
    OR die("Connection failed: " . $db_connection->connect_error);
    // 2020/08/17 Leonard Pinth Garnell: Bad, very bad. RAID 8 drives will simultaineously
    //              develop errors on all platters when this goes into production.
    $db_connection->set_charset( "utf8mb4" ); // RPH The correct 4 byte character set.
} catch ( Exception $e ) {
  echo 'Caught exception: ',  $e->getMessage(), "\n";
} 
/* --------------------------------------------------------------------- */
  
?>
