import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Roboto",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0195ff",
        }}
      >
        <Toolbar
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <Button color="inherit" onClick={() => navigate("/")}>
            <Typography variant="subtitle2" className="typographyButton">
              Dashboard
            </Typography>
          </Button>

          <Button color="inherit" onClick={() => navigate("/LavaJato/Marcas")}>
            <Typography variant="subtitle2" className="typographyButton">
              Marcas
            </Typography>
          </Button>

          <Button color="inherit" onClick={() => navigate("/LavaJato/Modelos")}>
            <Typography variant="subtitle2" className="typographyButton">
              Modelos
            </Typography>
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/LavaJato/Clientes")}
          >
            <Typography variant="subtitle2" className="typographyButton">
              Clientes
            </Typography>
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/LavaJato/Servicos")}
          >
            <Typography variant="subtitle2" className="typographyButton">
              Serviços
            </Typography>
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/LavaJato/Atendimentos")}
          >
            <Typography variant="subtitle2" className="typographyButton">
              Atendimentos
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
