/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useModelosContext } from "../../../context/Modelo/hooks/useModelos";
import { useMarcasContext } from "../../../context/Marca/hooks/useMarcas";
import { Modelos } from "../../../models/modelos";
import Notify from "../../../utils/Notification";

export default function FormularioView(props: { action: string, id: number, modelos: Modelos[], setOpen: any }): React.ReactElement {
    const { register, handleSubmit, control, getValues, reset, formState: { errors }, } = useForm({ mode: "onSubmit" });
    const [modelos, setModelos] = React.useState({} as Modelos);
    const [disabled, setDisabled] = React.useState(false);
    const { addModelo, updateModelo } = useModelosContext();
    const { stateReducer } = useMarcasContext();

    async function action(data: Modelos) {
        console.log(data);
        if (props.action === "CadastroModelo") {
            props.setOpen(false);
            addModelo(data);
            Notify("Modelo cadastrada com sucesso!", "success")
        } else {
            props.setOpen(false);
            updateModelo(data);
            Notify("Modelo alterada com sucesso!", "success")
        }
    };

    React.useEffect(() => {
        if (props.action === "AlterarModelo") {
            const data = props.modelos.filter((value) => value.id === props.id)
            reset(data[0]);
            setModelos(data[0]);
        }
    }, [props.action, props.id, props.modelos, reset]);


    return (
        <form
            onSubmit={handleSubmit((data) => {
                if (props.action !== "CadastroModelo") {
                    if (JSON.stringify(modelos) !== JSON.stringify(data)) {
                        action({
                            modelo: data.modelo,
                            marca: data.marca,
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
                    const id = props.modelos.length;
                    console.log(props.modelos.length);
                    action({
                        modelo: data.modelo,
                        marca: data.marca,
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
                    flexDirection: "row",
                    gap: "15px",
                }}>
                <FormControl size='small' fullWidth>
                    <TextField
                        label='Digite o Modelo*'
                        variant='outlined'
                        type='text'
                        style={{
                            width: "100%",
                        }}
                        {...register("modelo", { required: true })}
                        error={errors.modelo?.type === "required"}
                        helperText={
                            errors.modelo?.type === "required" &&
                            "O campo 'Modelo' é obrigatório"
                        }
                    />
                </FormControl>

                <Controller
                    name="marca"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({
                        field: { value, onChange }
                    }) => (
                        <TextField
                            style={{ width: "100%", margin: "0px" }}
                            label="Status do Usuário*"
                            select
                            variant='outlined'
                            fullWidth
                            margin="normal"
                            value={getValues("marca") ? value : ""}
                            onChange={(e) => { onChange(e) }}
                            error={errors.marca?.type === "required"}
                            helperText={errors.marca?.type === "required" && <span>O campo "Marca" é obrigatório!</span>}
                        >
                            <MenuItem value="">Selecione o status do usuário</MenuItem>
                            {
                                stateReducer.marcas.map((marca, index) => (
                                    <MenuItem value={marca.name} key={index}>{marca.name}</MenuItem>
                                ))
                            }
                        </TextField>
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
                    {props.action === "CadastroMarca" ?
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
<MenuItem value="">Selecione uma empresa</MenuItem>
