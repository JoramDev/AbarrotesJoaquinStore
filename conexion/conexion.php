<?php

/* CONEXION BASE DE DATOS */

class Conexion
{
    /* -------- CONEXION SERVIDOR LOCAL -------- */
    private $serverName =  "localhost:3304";
	private $username = "root";
	private $password = "";
	private $database = "cocholo"; 

    private $conexion;

    public function __construct()
	{
		$this->conexion = mysqli_connect( $this->serverName, $this->username, $this->password, $this->database );
		$this->conexion->set_charset( "utf8" );
	}
	public function getConexion()
	{
		return $this->conexion;
	}
	public function CerrarConexion()
    {
        mysqli_close( $this->conexion );
    }
}

?>