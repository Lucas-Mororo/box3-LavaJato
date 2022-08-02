/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useMarcasContext } from "../../../context/Marca/hooks/useMarcas";
import Dialog from "../../Dialogs/DialogMarca/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useModelosContext } from "../../../context/Modelo/hooks/useModelos";
import Notify from "../../../utils/Notification";

export default function TabelasMarcasView(): React.ReactElement {
    const { stateReducerMarca, deleteMarca } = useMarcasContext();
    const { stateReducerModelo } = useModelosContext();

    if(stateReducerMarca.marcas.length > 0){
        localStorage.setItem("@marcas", JSON.stringify(stateReducerMarca.marcas));
    }

    function deleMarca(id: number, marcaName: string) {
        const verify = stateReducerModelo.modelos.filter((modelo) => {
            return (modelo.marca === marcaName)
        })
        if (verify.length > 0) {
            Notify("A marca não pode ser deletada!", "error")
        } else {
            deleteMarca(id);
        }
    }

    return (
        <div
            style={{
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
                    }}
                >
                    <Box>
                        <Typography variant="h4" component="h6">
                            Marcas
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
                        <Dialog action={"CadastroMarca"} id={0} marcas={stateReducerMarca.marcas} />
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Paper style={{ width: "70%" }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    {/* <TableCell align="center" style={{ width: "20%" }}>
                                    <Typography style={{ fontWeight: "bold", color: "black" }}>Id&nbsp;</Typography>
                                </TableCell> */}
                                    <TableCell align="left" style={{ width: "60%" }}>
                                        <Typography style={{ fontWeight: "bold", color: "black" }}>
                                            Marca&nbsp;
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" style={{ width: "40%" }}>
                                        <Typography style={{ fontWeight: "bold", color: "black" }}>
                                            Ações&nbsp;
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stateReducerMarca.marcas?.map((marca, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left" style={{ width: "25%" }}>
                                            {marca.name}
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
                                                    action={"AlterarMarca"}
                                                    id={marca.id}
                                                    marcas={stateReducerMarca.marcas}
                                                />
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: "#c82333", color: "white" }}
                                                    onClick={() => {
                                                        deleMarca(marca.id, marca.name);
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
        </div>
    );
}
