/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useMarcasContext } from "../../../context/Marca/hooks/useMarcas";
import Dialog from "../../Dialogs/DialogMarca/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useModelosContext } from "../../../context/Modelo/hooks/useModelos";
import Notify from "../../../utils/Notification";
import './style.css';

export default function TabelasMarcasView(): React.ReactElement {
    const { stateReducerMarca, deleteMarca } = useMarcasContext();
    const { stateReducerModelo } = useModelosContext();

    setTimeout(() => {
        if (stateReducerMarca.marcas.length >= 0) {
            localStorage.setItem("@marcas", JSON.stringify(stateReducerMarca.marcas));
        }
    }, 1000)

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
        <div className="div1-TabelasMarcasView" >
            <div className="div2-TabelasMarcasView">
                <div className="div3-TabelasMarcasView">
                    <Box>
                        <Typography variant="h4" component="h6">
                            Marcas
                        </Typography>
                    </Box>
                    <div className="div4-TabelasMarcasView">
                        <Dialog action={"CadastroMarca"} id={0} marcas={stateReducerMarca.marcas} />
                    </div>
                </div>
            </div>
            <div className="div5-TabelasMarcasView" style={{}}>
                <Paper style={{ width: "70%" }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell align="left" style={{ width: "60%" }}>
                                        <Typography className="typography-TabelasMarcasView">
                                            Marca
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" style={{ width: "40%" }}>
                                        <Typography className="typography-TabelasMarcasView">
                                            Ações
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
                                            <div className="div6-TabelasMarcasView">
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
