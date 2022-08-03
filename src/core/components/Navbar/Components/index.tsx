import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#0195ff",
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log("🚀 ~ file: index.tsx ~ line 29 ~ handleChange ~ newValue", newValue)
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/")
        return
      case 1:
        navigate("/LavaJato/Marcas")
        return
      case 2:
        navigate("/LavaJato/Modelos")
        return
      case 3:
        navigate("/LavaJato/Clientes")
        return
      case 4:
        navigate("/LavaJato/Servicos")
        return
      case 5:
        navigate("/LavaJato/Atendimentos")
        return
      default:
        navigate("/")
    }
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab style={{ color: "white" }} label="Dashboard" />
        <Tab style={{ color: "white" }} label="Marcas" />
        <Tab style={{ color: "white" }} label="Modelos" />
        <Tab style={{ color: "white" }} label="Clientes" />
        <Tab style={{ color: "white" }} label="Serviços" />
        <Tab style={{ color: "white" }} label="Atendimentos" />

      </Tabs>
    </Paper >
  );
}
