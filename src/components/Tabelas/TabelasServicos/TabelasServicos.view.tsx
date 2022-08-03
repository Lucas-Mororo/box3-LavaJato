/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@material-ui/core";
import { useServicosContext } from "../../../context/Servico/hooks/useServicos";
import Dialog from "../../Dialogs/DialogServicos/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import MyImage from "../../../img/logo_Box3.png";
import './style.css';

export default function TabelasServicosView(): React.ReactElement {
    const { stateReducerServico, deleteServico } = useServicosContext();

    setTimeout(() => {
        if (stateReducerServico.servicos.length >= 0) {
            localStorage.setItem("@servicos", JSON.stringify(stateReducerServico.servicos));
        }
    }, 1000)


    return (
        <>
            <div className="div1-TabelasServicosView">
                <div className="div2-TabelasServicosView">
                    <div className="div3-TabelasServicosView">
                        <Box>
                            <Typography variant="h4" component="h6">
                                Servicos
                            </Typography>
                        </Box>
                        <div className="div4-TabelasServicosView">
                            <Dialog action={"CadastroServico"} id={0} servicos={stateReducerServico.servicos} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="div5-TabelasServicosView">
                <Paper style={{ width: "70%" }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell align="left" style={{ width: "35%" }}>
                                        <Typography className="typography-TabelasServicosView">
                                            Serviço
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" style={{ width: "35%" }}>
                                        <Typography className="typography-TabelasServicosView">
                                            Descrição
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" style={{ width: "15%" }}>
                                        <Typography className="typography-TabelasServicosView">
                                            Valor
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" style={{ width: "20%" }}>
                                        <Typography className="typography-TabelasServicosView">
                                            Ações
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stateReducerServico.servicos?.map((servico, index) => (
                                    <TableRow key={index}>

                                        <TableCell align="left" style={{ width: "25%" }}>
                                            {servico.servico}
                                        </TableCell>
                                        <TableCell align="center" style={{ width: "25%" }}>
                                            {servico.descricao}
                                        </TableCell>
                                        <TableCell align="center" style={{ width: "25%" }}>
                                            {servico.valor}
                                        </TableCell>

                                        <TableCell align="center">
                                            <div className="div6-TabelasServicosView">
                                                <Dialog
                                                    action={"AlterarServico"}
                                                    id={servico.id}
                                                    servicos={stateReducerServico.servicos}
                                                />

                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: "#c82333", color: "white" }}
                                                    onClick={() => {
                                                        deleteServico(servico.id);
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
