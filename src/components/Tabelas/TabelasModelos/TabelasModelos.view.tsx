/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useModelosContext } from "../../../context/Modelo/hooks/useModelos";
// import Dialog from "../../Dialogs/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
// import InlineConfirmButton from "react-inline-confirm";


export default function TabelasModelosView(): React.ReactElement {
  const { stateReducer, deleteModelo } = useModelosContext();
  const textValues = ["Delete", "Are you sure?", "Deleting..."];
  // const isExecuting = true;
  // const confirmIconClass = `fa fa-${isExecuting ? "circle-o-notch fa-spin" : "fa fa-trash"}`;

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        margin: "10px"
      }}>
        <img src={"logoBox3.png"} alt="logo" style={{ width: "10vw", height: "8vh" }} />
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
              Listagem de Modelos
            </Typography>
          </Box>
          <div style={{ display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "row", gap: "10px" }}>
            <Button variant="contained" style={{ backgroundColor: "#0195ff", color: "white" }}>
              <SearchIcon />
              Buscar
            </Button>
            {/* <Dialog action={"Cadastro"} id={0} clientes={[]} /> */}
          </div>
        </div>
      </div>
      <Paper >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow hover role="checkbox" tabIndex={-1}>
                {/* <TableCell align="center" style={{ width: "20%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>Id&nbsp;</Typography>
                </TableCell> */}
                <TableCell align="center" style={{ width: "30%" }}>
                  <Typography style={{ fontWeight: "bold", color: "black" }}>Modelo&nbsp;</Typography>
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
              {stateReducer.modelos?.map((modelo, index) => (
                <TableRow key={index}>
                  {/* 
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
                        {modelo.id}
                      </Box>
                    </div>
                  </TableCell> */}
                  <TableCell align="center" style={{ width: "25%" }}>
                    {modelo.modelo}
                  </TableCell>
                  <TableCell align="center" style={{ width: "25%" }}>
                    {modelo.marca}
                  </TableCell>
                  <TableCell align="center">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: " center", gap: "10px" }}>
                      {/* <Dialog
                        action={"Alterar"}
                        id={modelo.id}
                        modelos={stateReducer.modelos}
                      /> */}

                      <Button variant="contained" style={{ backgroundColor: "#c82333", color: "white" }}
                      // onClick={() => {
                      //   deleteModelos(modelo.id);
                      // }}
                      >
                        <DeleteForeverIcon
                        />
                        Deletar
                      </Button>
                      {/* <InlineConfirmButton className="btn btn-default" textValues={textValues} showTimer isExecuting={isExecuting} onClick={handleClick}>
                        <i className={confirmIconClass}></i>
                      </InlineConfirmButton> */}
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
