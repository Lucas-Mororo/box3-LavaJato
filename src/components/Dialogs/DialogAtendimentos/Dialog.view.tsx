import { Box, Button, Dialog, Typography } from "@material-ui/core";
import React from "react";
import Formulario from "../../Formularios/FormularioAtendimentos/index";
import { Atendimentos } from "../../../models/atendimento";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FormularioAlteracao from "../../Formularios/Alteracao/FormularioAtendimentosAlteracao";

export default function DialogView(props: { action: string, id: number, atendimentos: Atendimentos[] }): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => { setOpen(true); };

    const handleClose = () => { setOpen(false); };

    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: "#0195ff", color: "white" }}
                onClick={() => {
                    handleClickOpen()
                }}
            >
                {props.action === "CadastroAtendimento" ?
                    <>
                        <AddIcon />
                        Cadastro
                    </>
                    :
                    <>
                        <EditIcon />
                        Alterar
                    </>
                }
            </Button>

            <Dialog open={open} onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"lg"}
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
                        {props.action === "CadastroAtendimento" ?
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
                            {props.action === "CadastroAtendimento" ?
                                <>
                                    Preencha o formulário para cadastrar os dados do Atendimento no sistema
                                </>
                                :
                                <>
                                    Preencha o formulário para alterar os dados do Atendimento no sistema
                                </>
                            }
                        </Typography>
                        <Box
                            style={{ width: "100%", }}
                        >
                            {((props.action === "CadastroAtendimento") || (props.action === "AlterarServico"))
                                ?
                                <Formulario setOpen={setOpen} id={props.id} atendimentos={props.atendimentos} />
                                :
                                <FormularioAlteracao setOpen={setOpen} id={props.id} atendimentos={props.atendimentos} />
                            }
                        </Box>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
