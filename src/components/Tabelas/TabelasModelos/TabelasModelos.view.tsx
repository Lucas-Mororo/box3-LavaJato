/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useModelosContext } from "../../../context/Modelo/hooks/useModelos";
import Dialog from "../../Dialogs/DialogModelo/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import MyImage from "../../../img/logo_Box3.png";

export default function TabelasModelosView(): React.ReactElement {
  const { stateReducerModelo, deleteModelo } = useModelosContext();

  setTimeout(() => {
    if (stateReducerModelo.modelos.length >= 0) {
      localStorage.setItem("@modelos", JSON.stringify(stateReducerModelo.modelos));
    }
  }, 1000)

  return (
    <>
      <div style={{
        width: "100%",
        flexDirection: "column",
        margin: "0px",
        padding: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
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
            }}>
            <Box>
              <Typography variant="h4" component="h6">
                Modelos
              </Typography>
            </Box>
            <div style={{ display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "row", gap: "10px" }}>
              <Dialog action={"CadastroModelo"} id={0} modelos={stateReducerModelo.modelos} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>
        <Paper style={{ width: "70%" }} >
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell align="left" style={{ width: "30%" }}>
                    <Typography style={{ fontWeight: "bold", color: "black" }}>Nome&nbsp;</Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "30%" }}>
                    <Typography style={{ fontWeight: "bold", color: "black" }}>Marca&nbsp;</Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "40%" }}>
                    <Typography style={{ fontWeight: "bold", color: "black" }}>Ações&nbsp;</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stateReducerModelo.modelos?.map((modelo, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" style={{ width: "25%" }}>
                      {modelo.modelo}
                    </TableCell>
                    <TableCell align="center" style={{ width: "25%" }}>
                      {modelo.marca}
                    </TableCell>
                    <TableCell align="center">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: " center", gap: "10px" }}>
                        <Dialog
                          action={"AlterarModelo"}
                          id={modelo.id}
                          modelos={stateReducerModelo.modelos}
                        />
                        <Button variant="contained" style={{ backgroundColor: "#c82333", color: "white" }}
                          onClick={() => {
                            deleteModelo(modelo.id);
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
      </div>
    </>
  );
}
