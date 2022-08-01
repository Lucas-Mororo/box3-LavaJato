/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import { useMarcasContext } from "../../../context/Marca/hooks/useMarcas";
import Dialog from "../../Dialogs/DialogMarca/index";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import MyImage from "../../../img/logo_Box3.png";
import { useModelosContext } from "../../../context/Modelo/hooks/useModelos";
import Notify from "../../../utils/Notification";

export default function TabelasMarcasView(): React.ReactElement {
    const { stateReducerMarca, deleteMarca } = useMarcasContext();
    const { stateReducerModelo } = useModelosContext();

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
                {/* <img
                    src={MyImage}
                    alt="logo"
                    style={{ width: "10vw", height: "8vh" }}
                /> */}
                <div
                    style={{
                        display: "flex",
                        width: "88%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        margin: "15px",
                        // border: "#0195ff solid",
                        borderRadius: "15px",
                    }}
                >
                    <Box>
                        <Typography variant="h4" component="h6">
                            Listagem de Marcas
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
                        <Dialog action={"CadastroMarca"} id={0} marcas={stateReducerMarca.marcas} />
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                <Paper style={{ width: "70%" }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    {/* <TableCell align="center" style={{ width: "20%" }}>
                                    <Typography style={{ fontWeight: "bold", color: "black" }}>Id&nbsp;</Typography>
                                </TableCell> */}
                                    <TableCell align="center" style={{ width: "60%" }}>
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
                                        <TableCell align="center" style={{ width: "25%" }}>
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
        </>
    );
}
