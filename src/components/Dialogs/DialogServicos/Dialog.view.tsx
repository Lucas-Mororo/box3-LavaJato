import { Box, Button, Dialog, Typography } from "@material-ui/core";
import React from "react";
import Formulario from "../../Formularios/FormularioServicos/index";
import { Servicos } from "../../../models/servicos";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

export default function DialogView(props: { action: string, id: number, servicos: Servicos[] }): React.ReactElement {
    // const theme = useTheme();
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
                    // handleOpenCadastro();
                }}
            >
                {props.action === "CadastroServico" ?
                    <>
                        <AddIcon />
                        &nbsp;Cadastro
                    </>
                    :
                    <>
                        <EditIcon />
                        &nbsp;Alterar
                    </>
                }
            </Button>

            <Dialog open={open} onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >

                <div >
                    <div
                        style={{
                            // backgroundColor: theme.palette.primary.main,
                            // width: "100%",
                            backgroundColor: "#0195ff",
                            padding: "12px 24px",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        {props.action === "CadastroServico" ?
                            <Typography variant='body1'>Cadastro de dados da Marca</Typography>
                            : <Typography variant='body1'>Alteração de dados da Marca</Typography>
                        }
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
                            {props.action === "CadastroServico" ?
                                <>
                                    Preencha o formulário para cadastrar os dados da Marca no sistema
                                </>
                                :
                                <>
                                    Preencha o formulário para alterar os dados da Marca no sistema
                                </>
                            }
                        </Typography>
                        <Box
                            style={{ width: "100%", }}
                        >
                            {((props.action === "CadastroServico") || (props.action === "AlterarServico"))
                                ?
                                <Formulario setOpen={setOpen} action={props.action} id={props.id} servicos={props.servicos} />
                                :
                                <></>
                            }
                        </Box>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
