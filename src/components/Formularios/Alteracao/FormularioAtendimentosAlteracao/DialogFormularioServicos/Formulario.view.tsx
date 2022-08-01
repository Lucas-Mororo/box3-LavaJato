/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useServicosContext } from "../../../../../context/Servico/hooks/useServicos";
import { useServicosAtendimentosContext } from "../../../../../context/ServicoAtendimento/hooks/useServicos";
import { ServicosAtendimentos } from "../../../../../models/servicos";
import Notify from "../../../../../utils/Notification";

export default function FormularioView(props: { setOpen: any, addServicoAtendimento: any }): React.ReactElement {
    const { handleSubmit, control, getValues, setValue, reset, formState: { errors }, } = useForm({ mode: "onSubmit" });
    const [disabled, setDisabled] = React.useState(false);
    const { stateReducerServico } = useServicosContext();
    const [id, setId] = React.useState(Number);
    const [nameServico, setNameServico] = React.useState<any>();

    async function action(data: ServicosAtendimentos) {
        props.setOpen(false);
        props.addServicoAtendimento(data)
        Notify("Serviço cadastrado com sucesso!", "success")
    };

    function funcServico(e: any) {
        const newCliente = stateReducerServico.servicos.filter((servico: { id: number; }) => {
            return servico.id === e.target.value
        })
        const servico = newCliente.map((servico) => servico.servico);
        const descricaoServic = newCliente.map((servico) => servico.descricao);
        const valorServic = newCliente.map((servico) => servico.valor);
        const id = newCliente.map((servico) => servico.id);
        setId(id[0]);
        setNameServico(servico[0]);
        setValue(
            "descricao",
            descricaoServic[0]
        );
        setValue(
            "valor",
            valorServic[0]
        );
    }

    return (
        <form
            onSubmit={handleSubmit((data) => {
                setDisabled(true);
                action({
                    servico: nameServico,
                    valor: data.valor,
                    id: id,
                });
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

                <Controller
                    name="servico"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({
                        field: { value, onChange }
                    }) => (
                        <TextField
                            style={{ width: "100%", margin: "0px" }}
                            label="Servico*"
                            select
                            variant='outlined'
                            fullWidth
                            margin="normal"
                            value={getValues("servico") ? value : ""}
                            onChange={(e) => { funcServico(e); onChange(e); }}
                            error={errors.cliente?.type === "required"}
                            helperText={errors.cliente?.type === "required" && "O campo 'Servico' é obrigatório!"}
                        >
                            <MenuItem value="">Selecione o servico</MenuItem>
                            {
                                stateReducerServico.servicos.map((servico, index) => (
                                    <MenuItem value={servico.id} key={index}>
                                        {servico.servico}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    )}
                />

                <Controller
                    name="descricao"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({
                        field: { value, onChange }
                    }) => (
                        <TextField
                            variant='outlined'
                            type='text'
                            multiline={true}
                            rows={4}
                            style={{
                                width: "100%",
                            }}
                            label='Digite a Descrição do serviço*'
                            fullWidth
                            margin="normal"
                            value={getValues("descricao") ? value : ""}
                            error={errors.descricao?.type === "required"}
                            helperText={errors.descricao?.type === "required" && "O campo 'Descrição' é obrigatório"}
                        />
                    )}
                />

                <Controller
                    name="valor"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({
                        field: { value, onChange }
                    }) => (
                        <TextField
                            variant='outlined'
                            type='text'
                            style={{
                                width: "40%",
                            }}
                            label='Digite o valor Serviço*'
                            fullWidth
                            margin="normal"
                            value={getValues("valor") ? value : ""}
                            error={errors.valor?.type === "required"}
                            helperText={errors.valor?.type === "required" && "O campo 'Valor' é obrigatório"}
                        />
                    )}
                />

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
                    Cadastro
                </Button>
            </div>
        </form>
    );
};