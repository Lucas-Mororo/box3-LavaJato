/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button, FormControl, MenuItem, TextField, } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useClientesContext } from "../../../context/Usuarios/hooks/useClientes";
import { Clientes } from "../../../models/clientes";
import Notify from "../../../utils/Notification";
import axios, { AxiosResponse } from "axios";
import { EstadoBrasileiro } from "../../../models/estadoBrasileiro";
import { cepMask, CNPJ, CPF, phone } from "../../../utils/masks";

export default function FormularioView(props: { action: string, id: number, clientes: Clientes[], setOpen: any }): React.ReactElement {
    const { register, handleSubmit, control, getValues, setValue, reset, formState: { errors }, } = useForm({ mode: "onSubmit" });
    const [clientes, setClientes] = React.useState({} as Clientes);
    const [disabled, setDisabled] = React.useState(false);
    const { addClient, updateClient } = useClientesContext();
    const [cnpjCpf, setCnpjCpf] = React.useState<String>('');
    const [fone, setFone] = React.useState<String>('');
    const [cep, setCep] = React.useState<String>('');
    const [buscarCep, setBuscarCep] = React.useState<boolean>(false);
    const [estadosBrasileiros, setEstadosBrasileiros] = React.useState<EstadoBrasileiro[]>([]);

    async function action(data: Clientes) {
        if (props.action === "CadastroCliente") {
            props.setOpen(false);
            addClient(data);
            Notify("Usuário cadastrado com sucesso!", "success")
        } else {
            props.setOpen(false);
            updateClient(data);
            Notify("Usuário alterado com sucesso!", "success")
        }
    };

    React.useEffect(() => {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then((response) => {
                setEstadosBrasileiros(response.data);
            })
        if (props.action === "AlterarCliente") {
            const data = props.clientes.filter((value) => value.id === props.id)
            reset(data[0]);
            setCnpjCpf(data[0].CPFCNPJ.length === 11 ? CPF(data[0].CPFCNPJ) : CNPJ(data[0].CPFCNPJ));
            setFone(phone(data[0].telefone));
            setCep(cepMask(data[0].CEP));
            setClientes(data[0]);
        } else {
            if (getValues("CEP") !== undefined) {
                axios.get(`https://viacep.com.br/ws/${getValues("CEP")}/json/`)
                    .then(({ data }: AxiosResponse<any>) => {
                        reset({
                            logradouro: data.logradouro,
                            cidade: data.localidade,
                            bairro: data.bairro,
                            estado: data.uf,
                        });
                    });
            };
        }
    }, [props.action, props.id, props.clientes, reset, buscarCep, getValues, reset]);

    return (
        <form
            onSubmit={handleSubmit((data) => {
                if (props.action !== "CadastroCliente") {
                    if (JSON.stringify(clientes) !== JSON.stringify(data)) {
                        action({
                            name: data.name,
                            email: data.email,
                            is_active: data.is_active,
                            telefone: data.telefone,
                            CPFCNPJ: data.CPFCNPJ,
                            CEP: data.CEP,
                            logradouro: data.logradouro,
                            numero: data.numero,
                            complemento: data.complemento,
                            bairro: data.bairro,
                            cidade: data.cidade,
                            estado: data.estado,
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
                    const id = props.clientes.length + 1;
                    action({
                        name: data.name,
                        email: data.email,
                        is_active: data.is_active,
                        telefone: data.telefone,
                        CPFCNPJ: data.CPFCNPJ,
                        CEP: data.CEP,
                        logradouro: data.logradouro,
                        numero: data.numero,
                        complemento: data.complemento,
                        bairro: data.bairro,
                        cidade: data.cidade,
                        estado: data.estado,
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

                <div style={{
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
                            label='Digite seu nome*'
                            variant='outlined'
                            // className={classes.textField}
                            type='text'
                            style={{
                                width: "100%",
                            }}
                            {...register("name", { required: true })}
                            error={errors.name?.type === "required"}
                            helperText={
                                errors.name?.type === "required" &&
                                "O campo 'Nome' é obrigatório"
                            }
                        />
                    </FormControl>

                    <FormControl size='small' fullWidth>
                        <TextField
                            label='Digite seu e-mail*'
                            variant='outlined'
                            // className={classes.textField}
                            type='email'
                            style={{
                                width: "100%",
                            }}
                            {...register("email", { required: true })}
                            error={errors.email?.type === "required"}
                            helperText={
                                errors.email?.type === "required" &&
                                "O campo 'Email' é obrigatório"
                            }
                        />
                    </FormControl>

                    <FormControl size={"small"} fullWidth>
                        <TextField
                            variant='outlined'
                            label='Digite seu Telefone*'
                            type="text"
                            style={{
                                width: "100%",
                            }}
                            value={fone}
                            {...register("telefone", { required: true })}
                            inputProps={{
                                minLength: 15,
                                maxLength: 15,
                            }}
                            onChange={(e) => {
                                setFone(phone(e.target.value));
                            }}
                            error={errors.telefone?.type === "required"}
                            helperText={errors.telefone?.type === "required" && "O campo 'Telefone' é obrigatório!"}
                        />
                    </FormControl>

                    <FormControl size={"small"} fullWidth>
                        <TextField
                            variant='outlined'
                            label='Digite seu CPF/CNPJ*'
                            type="text"
                            value={cnpjCpf}
                            style={{
                                width: "100%",
                            }}
                            {...register("CPFCNPJ", { required: true })}
                            inputProps={{
                                minLength: 14,
                                maxLength: 18,
                            }}
                            onChange={(e) => {
                                switch (e.target.value.length) {
                                    case 14:
                                        setCnpjCpf(CPF(e.target.value));
                                        break;
                                    case 18:
                                        setCnpjCpf(CNPJ(e.target.value));
                                        break;
                                    default:
                                        setCnpjCpf(CPF(e.target.value));
                                        break;
                                }
                            }}
                            error={errors.CPFCNPJ?.type === "required"}
                            helperText={errors.CPFCNPJ?.type === "required" && "O campo 'CPF/CNPJ' é obrigatório"}
                        />
                    </FormControl>

                    <Controller
                        name='estado'
                        control={control}
                        rules={{ required: true }}
                        render={({
                            field: { value, onChange },
                        }) => (
                            <TextField
                                style={{ width: "100%", margin: "0px" }}
                                select
                                variant='outlined'
                                label='UF'
                                value={getValues("estado") ? value : ""}
                                onChange={(e) => {
                                    onChange(e);
                                }}
                                error={errors.estado?.type === "required"}
                                helperText={errors.estado?.type === "required" && "O campo 'estado' é obrigatório"}
                            >
                                <MenuItem value=""></MenuItem>
                                {
                                    estadosBrasileiros.map((estadoBrasileiro) => {
                                        return (
                                            <MenuItem
                                                key={estadoBrasileiro.id}
                                                value={estadoBrasileiro.sigla}
                                            >
                                                {estadoBrasileiro.nome}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </TextField>
                        )}
                    />

                    <Controller
                        name="is_active"
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { value, onChange }
                        }) => (
                            <TextField
                                style={{ width: "100%", margin: "0px" }}
                                // className={classes.textField}
                                label="Status do Usuário*"
                                select
                                variant='outlined'
                                fullWidth
                                margin="normal"
                                value={getValues("is_active") ? value : ""}
                                onChange={(e) => { onChange(e) }}
                                error={errors.is_active?.type === "required"}
                                helperText={errors.is_active?.type === "required" && <span>O campo "Status" é obrigatório!</span>}
                            >
                                <MenuItem value="">Selecione o status do usuário</MenuItem>
                                <MenuItem value="true">Ativado</MenuItem>
                                <MenuItem value="false">Desativado</MenuItem>
                            </TextField>
                        )}
                    />
                </div>

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
                            label='Digite seu CEP*'
                            variant='outlined'
                            // className={classes.textField}
                            type='text'
                            style={{
                                width: "100%",
                            }}
                            {...register("CEP", { required: true })}
                            onChange={(e) => {
                                if (e.target.value.includes("-")) {
                                    if (e.target.value.split("-")[1].length === 3) {
                                        setBuscarCep(!buscarCep);
                                    }
                                }
                                setValue(
                                    "CEP",
                                    cepMask(e.target.value),
                                );
                            }}
                            inputProps={{ maxLength: 9 }}
                            error={errors.CEP?.type === "required"}
                            helperText={
                                errors.CEP?.type === "required" &&
                                "O campo 'CEP' é obrigatório"
                            }
                        />
                    </FormControl>

                    <Controller
                        name="cidade"
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { value, onChange }
                        }) => (
                            <TextField
                                style={{ width: "100%", margin: "0px" }}
                                // className={classes.textField}
                                label="Cidade*"
                                variant='outlined'
                                fullWidth
                                margin="normal"
                                value={getValues("cidade") ? value : ""}
                                error={errors.cidade?.type === "required"}
                                helperText={errors.cidade?.type === "required" && <span>O campo "Status" é obrigatório!</span>}
                            />
                        )}
                    />

                    <Controller
                        name="bairro"
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { value, onChange }
                        }) => (
                            <TextField
                                style={{ width: "100%", margin: "0px" }}
                                label='Digite seu Bairro*'
                                variant='outlined'
                                fullWidth
                                margin="normal"
                                value={getValues("bairro") ? value : ""}
                                error={errors.bairro?.type === "required"}
                                helperText={errors.bairro?.type === "required" && "O campo 'bairro' é obrigatório"}
                            />
                        )}
                    />

                    <Controller
                        name="logradouro"
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { value, onChange }
                        }) => (
                            <TextField
                                style={{ width: "100%", margin: "0px" }}
                                label='Digite seu logradouro*'
                                variant='outlined'
                                fullWidth
                                margin="normal"
                                value={getValues("logradouro") ? value : ""}
                                error={errors.logradouro?.type === "required"}
                                helperText={errors.logradouro?.type === "required" && "O campo 'logradouro' é obrigatório"}
                            />
                        )}
                    />

                    <FormControl size='small' fullWidth>
                        <TextField
                            label='Digite seu Número'
                            variant='outlined'
                            // className={classes.textField}
                            type='number'
                            style={{
                                width: "100%",
                            }}
                            {...register("numero", { required: true })}
                            error={errors.numero?.type === "required"}
                            helperText={
                                errors.numero?.type === "required" &&
                                "O campo 'numero' é obrigatório"
                            }
                        />
                    </FormControl>

                    <FormControl size='small' fullWidth>
                        <TextField
                            label='Digite seu Complemento*'
                            variant='outlined'
                            // className={classes.textField}
                            type='text'
                            style={{
                                width: "100%",
                            }}
                            {...register("complemento", { required: true })}
                            error={errors.complemento?.type === "required"}
                            helperText={
                                errors.complemento?.type === "required" &&
                                "O campo 'complemento' é obrigatório"
                            }
                        />
                    </FormControl>

                </div>

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
                    {props.action === "CadastroCliente" ?
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