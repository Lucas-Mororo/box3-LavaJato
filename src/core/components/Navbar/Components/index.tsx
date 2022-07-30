import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Roboto"
  },
}));

export default function Navbar() {
  const classes = useStyles();
  // const history = useNavigate();

  function handleClientes() {
    console.log("asdasdasdasd");
    // navigate("../lavaJato/clientes");
  }

  // function handleMarcas() {
  //   navigate("/LavaJato/Marcas");
  // }

  // function handleModelos() {
  //   navigate("/LavaJato/Modelos");
  // }

  // function handleServicos() {
  //   navigate("/LavaJato/Servicos");
  // }

  // function handleAtendimentos() {
  //   navigate("/LavaJato/Atendimentos");
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0195ff" }}>
        <Toolbar style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>


          <Button color="inherit" >
            <Typography variant='subtitle2' className='typographyButton'>
              Dashboard
            </Typography>
          </Button>


          <Button color="inherit"
            // onClick={handleMarcas}
            // onClick={() => history("/lavaJato/marcas")}
            >
            <Typography variant='subtitle2' className='typographyButton'>
              Marcas
            </Typography>
          </Button>


          <Button color="inherit"
            // onClick={handleModelos}
            >
            <Typography variant='subtitle2' className='typographyButton'>
              Modelos
            </Typography>
          </Button>


          <Button color="inherit"
            onClick={handleClientes}
            >
            <Typography variant='subtitle2' className='typographyButton'>
              Clientes
            </Typography>
          </Button>


          <Button color="inherit"
            // onClick={handleServicos}
            >
            <Typography variant='subtitle2' className='typographyButton'>
              Serviços
            </Typography>
          </Button>


          <Button color="inherit"
            // onClick={handleAtendimentos}
            >
            <Typography variant='subtitle2' className='typographyButton'>
              Atendimentos
            </Typography>
          </Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}
