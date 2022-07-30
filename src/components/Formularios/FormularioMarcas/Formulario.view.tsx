/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useMarcasContext } from "../../../context/Marca/hooks/useMarcas";
import { Marcas } from "../../../models/marcas";
import Notify from "../../../utils/Notification";

export default function FormularioView(props: { action: string, id: number, marcas: Marcas[], setOpen: any }): React.ReactElement {
    const { register, handleSubmit, control, getValues, reset, formState: { errors }, } = useForm({ mode: "onSubmit" });
    const [marcas, setMarcas] = React.useState({} as Marcas);
    const [disabled, setDisabled] = React.useState(false);
    const { addMarca, updateMarca } = useMarcasContext();

    async function action(data: Marcas) {
        if (props.action === "CadastroMarca") {
            props.setOpen(false);
            addMarca(data);
            Notify("Marca cadastrada com sucesso!", "success")
        } else {
            props.setOpen(false);
            updateMarca(data);
            Notify("Marca alterada com sucesso!", "success")
        }
    };

    React.useEffect(() => {
        if (props.action === "AlterarMarca") {
            const data = props.marcas.filter((value) => value.id === props.id)
            reset(data[0]);
            setMarcas(data[0]);
        }
    }, [props.action, props.id, props.marcas, reset]);


    return (
        <form
            onSubmit={handleSubmit((data) => {
                if (props.action !== "CadastroMarca") {
                    if (JSON.stringify(marcas) !== JSON.stringify(data)) {
                        action({
                            name: data.name,
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
                    const id = props.marcas.length;
                    action({
                        name: data.name,
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
                        label='Digite a Marca*'
                        variant='outlined'
                        type='text'
                        style={{
                            width: "100%",
                        }}
                        {...register("name", { required: true })}
                        error={errors.name?.type === "required"}
                        helperText={
                            errors.name?.type === "required" &&
                            "O campo 'Marca' é obrigatório"
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