import { Box, Button, Dialog, Typography } from "@material-ui/core";
import React from "react";
import Formulario from "../../Formularios/FormularioServicosAtendimentos/index";
import { Servicos } from "../../../models/servicos";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

export default function DialogView(): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: "#0195ff", color: "white" }}
                onClick={() => {
                    handleClickOpen()
                }}
            >
                <AddIcon />
                Cadastro
            </Button>

            <Dialog open={open} onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >

                <div >
                    <div
                        style={{
                            backgroundColor: "#0195ff",
                            padding: "12px 24px",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        <Typography variant='body1'>Cadastro de dados do Serviços</Typography>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        padding: "10px",
                    }} >
                        <Typography variant='body1' style={{
                            margin: "10px 0px 10px 0px"
                        }}>
                            Preencha o formulário para cadastrar os dados da Marca no sistema
                        </Typography>
                        <Box
                            style={{ width: "100%", }}
                        >
                            <Formulario setOpen={setOpen} />
                        </Box>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
