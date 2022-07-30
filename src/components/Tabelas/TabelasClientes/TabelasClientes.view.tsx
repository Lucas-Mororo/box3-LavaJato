/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useClientesContext } from "../../../context/Usuarios/hooks/useClientes";
import Dialog from "../../Dialogs/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
// import InlineConfirmButton from "react-inline-confirm";
import MyImage from '../../../img/logo_Box3.png';

export default function TabelaClientesView(): React.ReactElement {
  const { stateReducer, deleteClient } = useClientesContext();
  // const textValues = ["Delete", "Are you sure?", "Deleting..."];
  // const isExecuting = true;
  // const confirmIconClass = `fa fa-${isExecuting ? "circle-o-notch fa-spin" : "fa fa-trash"}`;

  return (
    <>
      <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        margin: "10px"
      }}>
        <img src={MyImage} alt="logo" style={{ width: "10vw", height: "8vh" }} />
        <div style={{
          display: "flex",
          width: "88%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          margin: "15px",
          border: "#0195ff solid",
          borderRadius: "15px"
        }}>
          <Box>
            <Typography variant="h5" component="h6">
              Listagem de Usuários
            </Typography>
          </Box>
          <div style={{ display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "row", gap: "10px" }}>
            <Button variant="contained" style={{ backgroundColor: "#0195ff", color: "white" }}>
              <SearchIcon />
              Buscar
            </Button>
            <Dialog action={"CadastroCliente"} id={0} clientes={[]} />
          </div>
        </div>
      </div>
      <Paper >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="center" style={{ width: "5%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>Id&nbsp;</Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "25%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>Nome&nbsp;</Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "25%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>E-mail&nbsp;</Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "10%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>Ativo&nbsp;</Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "20%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>Ações&nbsp;</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stateReducer.clientes?.map((cliente, index) => (
                <TableRow key={index}>

                  <TableCell align="center" style={{
                    width: "5%",
                  }}>
                    <div style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: " center",
                    }}>
                      <Box
                        style={{
                          backgroundColor: "#0195ff",
                          color: "white",
                          width: "30px",
                          height: "30px",
                          alignSelf: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: " center",
                          borderRadius: "20%",
                        }}>
                        {cliente.id}
                      </Box>
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    {cliente.name}
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    {cliente.email}
                  </TableCell>
                  <TableCell align="center" style={{ width: "10%" }}>
                    {String(cliente.is_active)}
                  </TableCell>

                  <TableCell align="center">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: " center", gap: "10px" }}>
                      <Dialog
                        action={"AlterarCliente"}
                        id={cliente.id}
                        clientes={stateReducer.clientes} />

                      <Button variant="contained" style={{ backgroundColor: "#c82333", color: "white" }}
                        onClick={() => {
                          deleteClient(cliente.id);
                        }}
                      >
                        <DeleteForeverIcon
                        />
                        Deletar
                      </Button>
                    </div>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
