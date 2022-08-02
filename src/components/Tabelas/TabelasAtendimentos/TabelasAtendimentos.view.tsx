/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useAtendimentoContext } from "../../../context/Atendimento/hooks/useAtendimentos";
import Dialog from "../../Dialogs/DialogAtendimentos/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import MyImage from "../../../img/logo_Box3.png";
import './style.css';

export default function TabelaAtendimentosView(): React.ReactElement {
  const { stateReducerAtendimentos, deleteAtendimento } = useAtendimentoContext();

  if (stateReducerAtendimentos.atendimentos.length > 0) {
    localStorage.setItem("@atendimentos", JSON.stringify(stateReducerAtendimentos.atendimentos));
  }

  return (
    <>
      <div className="div1-TabelaAtendimentosView">
        <div className="div2-TabelaAtendimentosView" >
          <div className="div3-TabelaAtendimentosView" >
            <Box><Typography variant="h4" component="h6">Atendimentos</Typography></Box>
            <div className="div4-TabelaAtendimentosView" >
              <Dialog action={"CadastroAtendimento"} id={0} atendimentos={stateReducerAtendimentos.atendimentos} />
            </div>
          </div>
        </div>
      </div>
      <div className="div5-TabelaAtendimentosView" >
        <Paper style={{ width: "70%" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center" style={{ width: "5%" }}>
                    <Typography className="typographyTableCell" >
                      #&nbsp;
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    <Typography className="typographyTableCell" >
                      Cliente&nbsp;
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    <Typography className="typographyTableCell" >
                      Telefone&nbsp;
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    <Typography className="typographyTableCell" >
                      Status&nbsp;
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "20%" }}>
                    <Typography className="typographyTableCell">
                      Ações&nbsp;
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stateReducerAtendimentos.atendimentos?.map((atendimento, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" style={{ width: "5%" }}>
                      <div className="div6-TabelaAtendimentosView">
                        <Box className="div7-TabelaAtendimentosView">{atendimento.id}</Box>
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ width: "25%" }}>
                      {atendimento.cliente}
                    </TableCell>
                    <TableCell align="center" style={{ width: "25%" }}>
                      {atendimento.telefone}
                    </TableCell>
                    <TableCell align="center" style={{ width: "25%" }}>
                      {atendimento.state ? <>Ativo</> : <>Desativo</>}
                    </TableCell>
                    <TableCell align="center">
                      <div className="div8-TabelaAtendimentosView">
                        <Dialog action={"AlterarAtendimento"} id={atendimento.id} atendimentos={stateReducerAtendimentos.atendimentos} />
                        <Button variant="contained" style={{ backgroundColor: "#c82333", color: "white" }} onClick={() => { deleteAtendimento(atendimento.id) }}>
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