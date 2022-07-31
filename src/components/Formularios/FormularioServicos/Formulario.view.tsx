/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useServicosContext } from "../../../context/Servico/hooks/useServicos";
import { Servicos } from "../../../models/servicos";
import Notify from "../../../utils/Notification";

export default function FormularioView(props: { action: string, id: number, servicos: Servicos[], setOpen: any }): React.ReactElement {
    const { register, handleSubmit, control, getValues, reset, formState: { errors }, } = useForm({ mode: "onSubmit" });
    const [servicos, setServicos] = React.useState({} as Servicos);
    const [disabled, setDisabled] = React.useState(false);
    const { addServico, updateServico } = useServicosContext();

    async function action(data: Servicos) {
        if (props.action === "CadastroServico") {
            props.setOpen(false);
            addServico(data);
            Notify("Usuário cadastrado com sucesso!", "success")
        } else {
            props.setOpen(false);
            updateServico(data);
            Notify("Usuário alterado com sucesso!", "success")
        }
    };

    React.useEffect(() => {
        if (props.action === "AlterarServico") {
            const data = props.servicos.filter((value) => value.id === props.id)
            reset(data[0]);
            setServicos(data[0]);
        }
    }, [props.action, props.id, props.servicos, reset]);


    return (
        <form
            onSubmit={handleSubmit((data) => {
                if (props.action !== "CadastroServico") {
                    if (JSON.stringify(servicos) !== JSON.stringify(data)) {
                        action({
                            servico: data.servico,
                            descricao: data.descricao,
                            valor: data.valor,
                            id: (props.id),
                        });
                    } else {
                        Notify(
                            "Para efetuar esta ação atualize pelo menos uma informação!",
                            "warning",
                        );
                    }
                } else {
                    setDisabled(true);
                    const id = props.servicos.length+1;
                    action({
                        servico: data.servico,
                        descricao: data.descricao,
                        valor: data.valor,
                        id: id,
                    });
                }
            })}
        >

            <div
                style={{
                    width: "100%",
                    padding: "10px 0 10px 0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "15px",
                }}>

                <FormControl size='small' fullWidth>
                    <TextField
                        label='Digite o Serviço*'
                        variant='outlined'
                        type='text'
                        style={{
                            width: "100%",
                        }}
                        {...register("servico", { required: true })}
                        error={errors.servico?.type === "required"}
                        helperText={
                            errors.servico?.type === "required" &&
                            "O campo 'Servico' é obrigatório"
                        }
                    />
                </FormControl>

                <FormControl size='small' fullWidth>
                    <TextField
                        label='Digite a Descrição do serviço*'
                        variant='outlined'
                        type='text'
                        multiline={true}
                        rows={4}
                        style={{
                            width: "100%",
                        }}
                        {...register("descricao", { required: true })}
                        error={errors.descricao?.type === "required"}
                        helperText={
                            errors.descricao?.type === "required" &&
                            "O campo 'Descrição' é obrigatório"
                        }
                    />
                </FormControl>

                <FormControl size='small' fullWidth>
                    <TextField
                        label='Digite o valor Serviço*'
                        variant='outlined'
                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        style={{
                            width: "40%",
                        }}
                        {...register("valor", { required: true })}
                        error={errors.valor?.type === "required"}
                        helperText={
                            errors.valor?.type === "required" &&
                            "O campo 'Valor' é obrigatório"
                        }
                    />
                </FormControl>

               
            </div>
            <div style={{ marginTop: "10px", display: "flex", width: "100%", justifyContent: "flex-end", alignItems: "center" }}>
                <Button
                    style={{
                        backgroundColor: disabled === true ? "rgba(0, 0, 0, 0.26)" : "#0195ff",
                        color: disabled === true ? "rgba(0, 0, 0, 0.26)" : "white",
                    }}
                    disableElevation
                    variant='contained'
                    type={"submit"}
                    disabled={disabled}
                >
                    {" "}
                    {props.action === "CadastroServico" ?
                        <>
                            Cadastro
                        </>
                        :
                        <>
                            Alterar
                        </>
                    }
                </Button>
            </div>
        </form>
    );
};