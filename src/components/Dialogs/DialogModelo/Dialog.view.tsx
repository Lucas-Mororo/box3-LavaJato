import { Box, Button, Dialog, Typography } from "@material-ui/core";
import React from "react";
import Formulario from "../../Formularios/FormularioModelos/index";
import { Modelos } from "../../../models/modelos";
// import { useModalContext } from "context/modal/hooks/useModal";
// import FormularioCadastroPublicacoes from "components/Formularios/Cadastro/FormularioCadastroPublicacoes";
// import { useTheme } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

export default function DialogView(props: { action: string, id: number, modelos: Modelos[] }): React.ReactElement {
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
                {props.action === "CadastroModelo" ?
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
                        {props.action === "CadastroModelo" ?
                            <Typography variant='body1'>Cadastro de dados do Modelo</Typography>
                            : <Typography variant='body1'>Alteração de dados do Modelo</Typography>
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
                            {props.action === "CadastroModelo" ?
                                <>
                                    Preencha o formulário para cadastrar os dados do Modelo no sistema
                                </>
                                :
                                <>
                                    Preencha o formulário para alterar os dados do Modelo no sistema
                                </>
                            }
                        </Typography>
                        <Box
                            style={{ width: "100%", }}
                        >
                            {((props.action === "CadastroModelo") || (props.action === "AlterarModelo"))
                                ?
                                <Formulario setOpen={setOpen} action={props.action} id={props.id} modelos={props.modelos} />
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
