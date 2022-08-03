/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useClientesContext } from "../../../context/Usuarios/hooks/useClientes";
import { useAtendimentoContext } from "../../../context/Atendimento/hooks/useAtendimentos";
import Dialog from "../../Dialogs/DialogCliente/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
// import InlineConfirmButton from "react-inline-confirm";
import MyImage from "../../../img/logo_Box3.png";
import Notify from "../../../utils/Notification";

export default function TabelaClientesView(): React.ReactElement {
  const { stateReducer, deleteClient } = useClientesContext();
  const { stateReducerAtendimentos } = useAtendimentoContext();

  setTimeout(() => {
    if (stateReducer.clientes.length >= 0) {
      localStorage.setItem("@clientes", JSON.stringify(stateReducer.clientes));
    }
  }, 1000)

  function deleCliente(id: number) {
    const verify = stateReducerAtendimentos.atendimentos.filter((atendimento) => {
      return (atendimento.idCliente === id)
    })
    if (verify.length > 0) {
      Notify("O cliente não pode ser deletado!", "error")
    } else {
      deleteClient(id);
    }
  }


  return (
    <>
      <div
        style={{
          width: "100%",
          flexDirection: "column",
          margin: "0px",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              margin: "20px 0px 20px 0px",
              borderRadius: "15px",
            }}
          >
            <Box>
              <Typography variant="h4" component="h6">
                Clientes
              </Typography>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <Dialog action={"CadastroCliente"} id={0} clientes={stateReducer.clientes} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>
        <Paper style={{ width: "70%" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {/* <TableCell align="center" style={{ width: "5%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>
                    Id&nbsp;
                  </Typography>
                </TableCell> */}
                  <TableCell align="left" style={{ width: "25%" }}>
                    <Typography style={{ fontWeight: "bold", color: "black" }}>
                      Nome&nbsp;
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    <Typography style={{ fontWeight: "bold", color: "black" }}>
                      Telefone&nbsp;
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    <Typography style={{ fontWeight: "bold", color: "black" }}>
                      CPF/CNPJ&nbsp;
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "20%" }}>
                    <Typography style={{ fontWeight: "bold", color: "black" }}>
                      Ações&nbsp;
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stateReducer.clientes?.map((cliente, index) => (
                  <TableRow key={index}>
                    {/* <TableCell
                    align="center"
                    style={{
                      width: "5%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: " center",
                      }}
                    >
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
                        }}
                      >
                        {cliente.id}
                      </Box>
                    </div>
                  </TableCell> */}
                    <TableCell align="left" style={{ width: "25%" }}>
                      {cliente.name}
                    </TableCell>
                    <TableCell align="center" style={{ width: "25%" }}>
                      {cliente.telefone}
                    </TableCell>
                    <TableCell align="center" style={{ width: "25%" }}>
                      {cliente.CPFCNPJ}
                    </TableCell>
                    <TableCell align="center">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: " center",
                          gap: "10px",
                        }}
                      >
                        <Dialog
                          action={"AlterarCliente"}
                          id={cliente.id}
                          clientes={stateReducer.clientes}
                        />

                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#c82333", color: "white" }}
                          onClick={() => {
                            deleCliente(cliente.id)
                          }}
                        >
                          <DeleteForeverIcon />
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
      </div>
    </>
  );
}
