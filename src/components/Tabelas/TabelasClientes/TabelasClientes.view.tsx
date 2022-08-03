/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useClientesContext } from "../../../context/Usuarios/hooks/useClientes";
import { useAtendimentoContext } from "../../../context/Atendimento/hooks/useAtendimentos";
import Dialog from "../../Dialogs/DialogCliente/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Notify from "../../../utils/Notification";
import './style.css';

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
      <div className="div1-TabelaClientesView">
        <div className="div2-TabelaClientesView">
          <div className="div3-TabelaClientesView">
            <Box>
              <Typography variant="h4" component="h6">
                Clientes
              </Typography>
            </Box>
            <div className="div4-TabelaClientesView">
              <Dialog action={"CadastroCliente"} id={0} clientes={stateReducer.clientes} />
            </div>
          </div>
        </div>
      </div>
      <div className="div5-TabelaClientesView">
        <Paper style={{ width: "70%" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell align="left" style={{ width: "25%" }}>
                    <Typography className="typography-TabelaClientesView">
                      Nome
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    <Typography className="typography-TabelaClientesView">
                      Telefone
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    <Typography className="typography-TabelaClientesView">
                      CPF/CNPJ
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "20%" }}>
                    <Typography className="typography-TabelaClientesView">
                      Ações
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stateReducer.clientes?.map((cliente, index) => (
                  <TableRow key={index}>
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
                      <div className="div6-TabelaClientesView">
                        <Dialog action={"AlterarCliente"} id={cliente.id} clientes={stateReducer.clientes}
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
