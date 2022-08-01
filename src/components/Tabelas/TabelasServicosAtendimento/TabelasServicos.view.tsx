/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import Dialog from "../../Dialogs/DialogServicosAtendimento/index";
import { useServicosAtendimentosContext } from "../../../context/ServicoAtendimento/hooks/useServicos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function TabelasServicosAtendimentoView(): React.ReactElement {
    const { stateReducerServicoAtendimentos, deleteServicoAtendimento } = useServicosAtendimentosContext();

    function valorTotal(): JSX.Element {
        const sum = stateReducerServicoAtendimentos.servicosAtendimentos.reduce((accumulator, object) => {
            return accumulator + object.valor;
        }, 0);

        localStorage.setItem("valorT", sum.toString());

        return (
            <>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: "20px"
                    }}
                >
                    <Typography style={{ fontWeight: "bold", color: "black" }}>
                        Valor Total:&nbsp;
                    </Typography>
                    <Typography>
                        {sum}
                    </Typography>
                </div>
            </>
        )
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    maxWidth: "100%",
                    margin: "10px",
                }}
            >
                <Dialog />
            </div>

            <Paper style={{ width: "100%" }} >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell align="center" style={{ width: "35%" }}>
                                    <Typography style={{ fontWeight: "bold", color: "black" }}>
                                        Serviço&nbsp;
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" style={{ width: "35%" }}>
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
                            {stateReducerServicoAtendimentos.servicosAtendimentos?.map((servico, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" style={{ width: "25%" }}>
                                        {servico.servico}
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
                                            <Button
                                                variant="contained"
                                                style={{ backgroundColor: "#c82333", color: "white" }}
                                                onClick={() => {
                                                    deleteServicoAtendimento(servico.id);
                                                }}
                                            >
                                                <DeleteForeverIcon />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {valorTotal()}
        </>
    );
}
