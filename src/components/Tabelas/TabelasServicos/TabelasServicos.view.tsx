/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@material-ui/core";
import { useServicosContext } from "../../../context/Servico/hooks/useServicos";
import Dialog from "../../Dialogs/DialogServicos/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import MyImage from "../../../img/logo_Box3.png";

export default function TabelasMservicosView(): React.ReactElement {
    const { stateReducerServico, deleteServico } = useServicosContext();

    if (stateReducerServico.servicos.length > 0) {
        localStorage.setItem("@servicos", JSON.stringify(stateReducerServico.servicos));
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
                                Servicos
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
                            <Dialog action={"CadastroServico"} id={0} servicos={stateReducerServico.servicos} />
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
                                    <TableCell align="left" style={{ width: "35%" }}>
                                        <Typography style={{ fontWeight: "bold", color: "black" }}>
                                            Serviço&nbsp;
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" style={{ width: "35%" }}>
                                        <Typography style={{ fontWeight: "bold", color: "black" }}>
                                            Descrição&nbsp;
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" style={{ width: "15%" }}>
                                        <Typography style={{ fontWeight: "bold", color: "black" }}>
                                            Valor&nbsp;
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
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: " center",
                                                    gap: "10px",
                                                }}
                                            >
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
