/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useAtendimentoContext } from "../../../context/Atendimento/hooks/useAtendimentos";
import Dialog from "../../Dialogs/DialogAtendimentos/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import MyImage from "../../../img/logo_Box3.png";

export default function TabelaAtendimentosView(): React.ReactElement {
  const { stateReducerAtendimentos, deleteAtendimento } = useAtendimentoContext();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
          margin: "10px",
        }}
      >
        <img
          src={MyImage}
          alt="logo"
          style={{ width: "10vw", height: "8vh" }}
        />
        <div
          style={{
            display: "flex",
            width: "88%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            margin: "15px",
            border: "#0195ff solid",
            borderRadius: "15px",
          }}
        >
          <Box>
            <Typography variant="h5" component="h6">
              Listagem de Atendimentos
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
            <Button
              variant="contained"
              style={{ backgroundColor: "#0195ff", color: "white" }}
            >
              <SearchIcon />
              Buscar
            </Button>
            <Dialog
              action={"CadastroAtendimento"}
              id={0}
              atendimentos={stateReducerAtendimentos.atendimentos}
            />
          </div>
        </div>
      </div>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="center" style={{ width: "5%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>
                    Id&nbsp;
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "25%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>
                    Cliente&nbsp;
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "25%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>
                    Telefone&nbsp;
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "25%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>
                    Status&nbsp;
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
              {stateReducerAtendimentos.atendimentos?.map((atendimento, index) => (
                <TableRow key={index}>
                  <TableCell
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
                        {atendimento.id}
                      </Box>
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    {atendimento.cliente}
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    {atendimento.telefone}
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    {
                      atendimento.state ?
                        <>
                          Ativo
                        </>
                        :
                        <>
                          Desativo
                        </>
                    }
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
                        action={"AlterarAtendimento"}
                        id={atendimento.id}
                        atendimentos={stateReducerAtendimentos.atendimentos}
                      />
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#c82333", color: "white" }}
                        onClick={() => {
                          deleteAtendimento(atendimento.id);
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
    </>
  );
}
