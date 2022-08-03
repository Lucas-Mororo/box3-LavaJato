/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useModelosContext } from "../../../context/Modelo/hooks/useModelos";
import Dialog from "../../Dialogs/DialogModelo/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import './style.css';

export default function TabelasModelosView(): React.ReactElement {
  const { stateReducerModelo, deleteModelo } = useModelosContext();

  setTimeout(() => {
    if (stateReducerModelo.modelos.length >= 0) {
      localStorage.setItem("@modelos", JSON.stringify(stateReducerModelo.modelos));
    }
  }, 1000)

  return (
    <>
      <div className="div1-TabelasModelosView">
        <div className="div2-TabelasModelosView">
          <div className="div3-TabelasModelosView">
            <Box>
              <Typography variant="h4" component="h6">
                Modelos
              </Typography>
            </Box>
            <div className="div4-TabelasModelosView">
              <Dialog action={"CadastroModelo"} id={0} modelos={stateReducerModelo.modelos} />
            </div>
          </div>
        </div>
      </div>
      <div className="div5-TabelasModelosView">
        <Paper style={{ width: "70%" }} >
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell align="left" style={{ width: "30%" }}>
                    <Typography className="typography-TabelasModelosView" >Nome</Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "30%" }}>
                    <Typography className="typography-TabelasModelosView" >Marca</Typography>
                  </TableCell>
                  <TableCell align="center" style={{ width: "40%" }}>
                    <Typography className="typography-TabelasModelosView" >Ações</Typography>
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
