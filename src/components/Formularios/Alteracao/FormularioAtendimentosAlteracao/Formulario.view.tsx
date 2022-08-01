/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useMarcasContext } from "../../../../context/Marca/hooks/useMarcas";
import { useModelosContext } from "../../../../context/Modelo/hooks/useModelos";
import { Atendimentos } from "../../../../models/atendimento";
import Notify from "../../../../utils/Notification";
import { useClientesContext } from "../../../../context/Usuarios/hooks/useClientes";
import axios, { AxiosResponse } from "axios";
import { EstadoBrasileiro } from "../../../../models/estadoBrasileiro";
import { useAtendimentoContext } from "../../../../context/Atendimento/hooks/useAtendimentos";
import { Modelos } from "../../../../models/modelos";
// import TabelasServicosAtendimento from "../../../Tabelas/TabelasServicosAtendimento";
import { cepMask, phone, Placa } from "../../../../utils/masks";
import Dialog from "../../../Dialogs/DialogServicosAtendimento/index";
import { useServicosAtendimentosContext } from "../../../../context/ServicoAtendimento/hooks/useServicos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import appReducer from "./AppReducerAtendimentosLocal";
import DialogFormularioServicos from "./DialogFormularioServicos";

export default function FormularioView(props: { id: number, atendimentos: Atendimentos[], setOpen: any }): React.ReactElement {

    // UseForm
    const { register, handleSubmit, control, getValues, setValue, reset, formState: { errors }, } = useForm({ mode: "onSubmit" });
    // Desabilitar Campo
    const [disabled, setDisabled] = React.useState(false);

    // Update do atendimento
    const { updateAtendimento } = useAtendimentoContext();

    // const { stateReducerServicoAtendimentos, deleteAllServicoAtendimento, deleteServicoAtendimento } = useServicosAtendimentosContext();

    //busca modelo e marca
    const { stateReducerModelo } = useModelosContext();
    const { stateReducerMarca } = useMarcasContext();
    const [atendimentos, setAtendimentos] = React.useState({} as Atendimentos);
    const [modeloMarcas, setModeloMarcas] = React.useState<Modelos[]>([]);
    // Busac do nome e telefone do Cliente
    const { stateReducer } = useClientesContext();
    const [nameCliente, setNameCliente] = React.useState<any>();
    const [foneCliente, setFoneCliente] = React.useState<any>([]);
    // Busca do cep
    const [cep, setCep] = React.useState<String>('');
    const [bairroCep, setBairroCep] = React.useState<string>("");
    const [ufCep, setUfCep] = React.useState<string>("");
    const [logradouroCep, setLogradouroCep] = React.useState<string>("");
    const [localidadeCep, setLocalidadeCep] = React.useState<string>("");
    const [estadosBrasileiros, setEstadosBrasileiros] = React.useState<EstadoBrasileiro[]>([]);
    const [buscarCep, setBuscarCep] = React.useState<boolean>(false);

    // Stado da Tabale da servicos
    const [tableServicos, setTableServicos] = React.useState<any>();
    // State reducer local para serviços do atendimento
    const initialState = { atendimentos: [] };
    const [stateReducerAtendimentosLocal, dispatch] = React.useReducer(appReducer, initialState);

    async function action(data: Atendimentos) {
        console.log(data);
        props.setOpen(false);
        updateAtendimento(data);
        Notify("Atendimento alterado com sucesso!", "success")
    };

    React.useEffect(() => {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then((response) => {
                setEstadosBrasileiros(response.data);
            })
        const data = props.atendimentos.filter((value) => value.id === props.id);
        reset(data[0]);
        setCep(cepMask(data[0].CEP));
        setFoneCliente(phone(data[0].telefone))
        setAtendimentos(data[0]);
        setNameCliente(data[0].cliente)
        setValue(
            "dataI",
            data[0].dataI
        )
        dispatch({
            type: "INITIALIZING",
            payload: {
                ...initialState,
                atendimentos: data[0].servicos
            }
        })

        if (getValues("marca") !== undefined) {
            const newModeloMarcasa = stateReducerModelo.modelos.filter((modelo: { marca: string; }) => {
                return modelo.marca === getValues("marca")
            })
            setModeloMarcas(newModeloMarcasa);
        }
    }, [props.id, props.atendimentos, reset, buscarCep, getValues]);

    function modelosMarca(e: any) {
        const newModeloMarcasa = stateReducerModelo.modelos.filter((modelo: { marca: string; }) => {
            return modelo.marca === e.target.value
        })
        setModeloMarcas(newModeloMarcasa);
    }

    function funcFoneCliente(e: any) {
        const newCliente = stateReducer.clientes.filter((cliente: { id: number; }) => {
            return cliente.id === e.target.value
        });
        const telefone = newCliente.map((cliente) => cliente.telefone);
        const clienteName = newCliente.map((cliente) => cliente.name);
        const clienteId = newCliente.map((cliente) => cliente.id);
        setNameCliente(clienteName[0]);
        setValue(
            "idCliente",
            clienteId[0]
        )
        setValue(
            "telefone",
            telefone[0]
        );
    }

    function viaCep(e: string) {
        axios.get(`https://viacep.com.br/ws/${e}/json/`)
            .then(({ data }: AxiosResponse<any>) => {
                setLogradouroCep(data.logradouro);
                setLocalidadeCep(data.localidade);
                setBairroCep(data.bairro);
                setUfCep(data.uf);
                setValue(
                    "logradouro",
                    data.logradouro
                );
                setValue(
                    "cidade",
                    data.localidade
                );
                setValue(
                    "bairro",
                    data.bairro
                );
                setValue(
                    "estado",
                    data.uf
                );
            });
    }

    function addServicoAtendimento(addAtend: any) {
        dispatch({
            type: "ADD",
            payload: addAtend,
        });
    }

    function deleteServicoAtendimento(id: number) {
        if (window.confirm("Deseja deletar este Serviço?")) {
            Notify("Evento deletado com sucesso!");
            dispatch({
                type: "DELETE",
                payload: id,
            });
        }
    }

    function valorTotal(): JSX.Element {
        const sum = stateReducerAtendimentosLocal.atendimentos?.reduce((accumulator: any, object: any) => {
            return accumulator + object.valor;
        }, 0);
        localStorage.setItem("valorT", sum.toString());

        return (
            <>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        margin: "20px 20px 0px 0px",
                    }}
                >
                    <Typography variant="h5" style={{ fontWeight: "bold", color: "black" }}>
                        Valor Total:&nbsp;
                    </Typography >
                    <Typography variant="h5">
                        {sum}
                    </Typography>
                </div>
            </>
        )
    }

    function isActive() {
        setValue(
            "state",
            false
        )
    }

    function dateAtual() {
        let aux;
        let aux2;
        let today = new Date().toLocaleString()
        // '01/08/2022 18:52:06'
        aux2 = today.split(" ")
        // (2) ['01/08/2022', '18:52:06']
        aux = aux2[0].split("/")
        // (3) ['01', '08', '2022']
        aux = aux.reverse().join("-")
        // '2022-08-01'
        let dataHr = aux + "T" + aux2[1]
        // '2022-08-01T18:52:06'
        return (dataHr)
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "20px"
            }}
        >
            <form
                onSubmit={handleSubmit((data) => {
                    if (JSON.stringify(atendimentos) !== JSON.stringify(data) || (stateReducerAtendimentosLocal.atendimentos !== atendimentos.servicos)) {
                        if (data.state === true) {
                            let valorTotal = localStorage.getItem("valorT");
                            setDisabled(true);
                            action({
                                dataI: data.dataI,
                                dataF: data.dataF,
                                cliente: nameCliente,
                                telefone: data.telefone,
                                marca: data.marca,
                                modelo: data.modelo,
                                placa: data.placa,
                                CEP: data.CEP,
                                logradouro: data.logradouro,
                                numero: data.numero,
                                complemento: data.complemento,
                                bairro: data.bairro,
                                cidade: data.cidade,
                                estado: data.estado,
                                servicos: stateReducerAtendimentosLocal.atendimentos,
                                valor: Number(valorTotal),
                                state: data.state,
                                id: data.id,
                                idCliente: data.idCliente,
                            });
                        } else {
                            let valorTotal = localStorage.getItem("valorT");
                            setDisabled(true);
                            const date = new Date().toJSON();
                            action({
                                dataI: data.dataI,
                                dataF: dateAtual(),
                                cliente: nameCliente,
                                telefone: data.telefone,
                                marca: data.marca,
                                modelo: data.modelo,
                                placa: data.placa,
                                CEP: data.CEP,
                                logradouro: data.logradouro,
                                numero: data.numero,
                                complemento: data.complemento,
                                bairro: data.bairro,
                                cidade: data.cidade,
                                estado: data.estado,
                                servicos: stateReducerAtendimentosLocal.atendimentos,
                                valor: Number(valorTotal),
                                state: data.state,
                                id: data.id,
                                idCliente: data.idCliente,
                            });
                        }
                    } else {
                        Notify(
                            "Para efetuar esta ação atualize pelo menos uma informação!",
                            "warning",
                        );
                    }
                })}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}>
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
                        <Controller
                            name="dataI"
                            control={control}
                            rules={{
                                required: false
                            }}
                            render={({
                                field: { value, onChange }
                            }) => (
                                <TextField
                                    disabled={true}
                                    label='Data de Registro'
                                    type='datetime-local'
                                    variant='outlined'
                                    fullWidth
                                    style={{ width: "100%", margin: "0px" }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    value={getValues("dataI") ? value : ""}
                                    onChange={(e) => { onChange(e) }}
                                    error={errors.dataI?.type === "required"}
                                    helperText={errors.dataI?.type === "required" && "O campo 'Data de Registro' é obrigatório"}
                                />
                            )}
                        />
                        <Controller
                            name="dataF"
                            control={control}
                            rules={{
                                required: false
                            }}
                            render={({
                                field: { value, onChange }
                            }) => (
                                <TextField
                                    disabled={true}
                                    label='Data finalização'
                                    type='datetime-local'
                                    variant='outlined'
                                    fullWidth
                                    style={{ width: "100%", margin: "0px" }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    value={getValues("dataF") ? value : ""}
                                    onChange={(e) => { onChange(e) }}
                                    error={errors.dataF?.type === "required"}
                                    helperText={errors.dataF?.type === "required" && "O campo 'Data finalização' é obrigatório"}
                                />
                            )}
                        />
                        <Controller
                            name="state"
                            control={control}
                            rules={{
                                required: false
                            }}
                            render={({
                                field: { value, onChange }
                            }) => (
                                <TextField
                                    disabled={true}
                                    style={{ width: "50%", margin: "0px" }}
                                    label="Status*"
                                    select
                                    variant='outlined'
                                    fullWidth
                                    margin="normal"
                                    value={getValues("state") ? value : ""}
                                    defaultValue={true}
                                    onChange={(e) => { isActive(); onChange(e) }}
                                    error={errors.state?.type === "required"}
                                    helperText={errors.state?.type === "required" && <span>O campo "Status" é obrigatório!</span>}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="true">Ativado</MenuItem>
                                    <MenuItem value="false">Desativado</MenuItem>
                                </TextField>
                            )}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            gap: "30px"
                        }}>
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
                                <Controller
                                    name="idCliente"
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({
                                        field: { value, onChange }
                                    }) => (
                                        <TextField
                                            disabled={getValues("state") ? false : true}
                                            style={{ width: "100%", margin: "0px" }}
                                            label="Cliente*"
                                            select
                                            variant='outlined'
                                            fullWidth
                                            margin="normal"
                                            value={getValues("idCliente") ? value : ""}
                                            onChange={(e) => { funcFoneCliente(e); onChange(e); }}
                                            error={errors.idCliente?.type === "required"}
                                            helperText={errors.idCliente?.type === "required" && "O campo 'Cliente' é obrigatório!"}
                                        >
                                            <MenuItem value="">Selecione o cliente</MenuItem>
                                            {
                                                stateReducer.clientes.map((cliente, index) => (
                                                    <MenuItem value={cliente.id} key={index}>
                                                        {cliente.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    )}
                                />
                                <Controller
                                    name="telefone"
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({
                                        field: { value, onChange }
                                    }) => (
                                        <TextField
                                            disabled={getValues("state") ? false : true}
                                            style={{ width: "100%", margin: "0px" }}
                                            label="Telefone*"
                                            variant='outlined'
                                            fullWidth
                                            margin="normal"
                                            inputProps={{
                                                minLength: 15,
                                                maxLength: 15,
                                            }}
                                            value={getValues("telefone") ? value : foneCliente}
                                            onChange={(e) => {
                                                setValue(
                                                    "telefone",
                                                    phone(e.target.value)
                                                );
                                            }}
                                            error={errors.telefone?.type === "required"}
                                            helperText={errors.telefone?.type === "required" && "O campo 'Telefone' é obrigatório!"}
                                        />
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
                                    flexDirection: "row",
                                    gap: "15px",
                                }}>
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
                                            disabled={getValues("state") ? false : true}
                                            style={{ width: "100%", margin: "0px" }}
                                            label="marca*"
                                            select
                                            variant='outlined'
                                            fullWidth
                                            margin="normal"
                                            value={getValues("marca") ? value : ""}
                                            onChange={(e) => { modelosMarca(e); onChange(e) }}
                                            error={errors.marca?.type === "required"}
                                            helperText={errors.marca?.type === "required" && "O campo 'marca' é obrigatório!"}
                                        >
                                            <MenuItem value="">Selecione o marca</MenuItem>
                                            {
                                                stateReducerMarca.marcas.map((marca, index) => (
                                                    <MenuItem value={marca.name} key={index}>
                                                        {marca.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    )}
                                />
                                <Controller
                                    name="modelo"
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({
                                        field: { value, onChange }
                                    }) => (
                                        <TextField
                                            disabled={getValues("state") ? false : true}
                                            style={{ width: "100%", margin: "0px" }}
                                            label="Modelo*"
                                            select
                                            variant='outlined'
                                            fullWidth
                                            margin="normal"
                                            value={getValues("modelo") ? value : ""}
                                            onChange={(e) => { onChange(e) }}
                                            error={errors.modelo?.type === "required"}
                                            helperText={errors.modelo?.type === "required" && "O campo 'Modelo' é obrigatório!"}
                                        >
                                            <MenuItem value="">Selecione o modelo</MenuItem>
                                            {
                                                modeloMarcas.map((modelo, index) => (
                                                    <MenuItem value={modelo.modelo} key={index}>
                                                        {modelo.modelo}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    )}
                                />
                                <FormControl size='small' fullWidth>
                                    <TextField
                                        disabled={getValues("state") ? false : true}
                                        label='Placa*'
                                        variant='outlined'
                                        type='text'
                                        style={{
                                            width: "100%",
                                        }}
                                        {...register("placa", { required: true })}
                                        onChange={(e) => {
                                            setValue(
                                                "placa",
                                                Placa(e.target.value),
                                            );
                                        }}
                                        error={errors.placa?.type === "required"}
                                        helperText={
                                            errors.placa?.type === "required" &&
                                            "O campo 'Placa' é obrigatório"
                                        }
                                    />
                                </FormControl>

                            </div>

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
                                        disabled={getValues("state") ? false : true}
                                        label='CEP*'
                                        variant='outlined'
                                        type='text'
                                        style={{
                                            width: "100%",
                                        }}
                                        {...register("CEP", { required: true })}
                                        onChange={(e) => {
                                            viaCep(e.target.value);
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
                                    name="logradouro"
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({
                                        field: { value, onChange }
                                    }) => (
                                        <TextField
                                            disabled={getValues("state") ? false : true}
                                            style={{ width: "100%", margin: "0px" }}
                                            label='Logradouro*'
                                            variant='outlined'
                                            fullWidth
                                            margin="normal"
                                            value={getValues("logradouro") ? value : logradouroCep}
                                            onChange={(e) => {
                                                setLogradouroCep(e.target.value);
                                            }}
                                            error={errors.logradouro?.type === "required"}
                                            helperText={errors.logradouro?.type === "required" && "O campo 'logradouro' é obrigatório"}
                                        />
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
                                    flexDirection: "row",
                                    gap: "15px",
                                }}>

                                <FormControl size='small' fullWidth>
                                    <TextField
                                        disabled={getValues("state") ? false : true}
                                        label='Complemento*'
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
                                            disabled={getValues("state") ? false : true}
                                            style={{ width: "100%", margin: "0px" }}
                                            label='Bairro*'
                                            variant='outlined'
                                            fullWidth
                                            margin="normal"
                                            value={getValues("bairro") ? value : bairroCep}
                                            onChange={(e) => {
                                                // setValue(
                                                //     "telefone",
                                                //     foneCliente
                                                // );
                                                setBairroCep(e.target.value);
                                            }}
                                            error={errors.bairro?.type === "required"}
                                            helperText={errors.bairro?.type === "required" && "O campo 'bairro' é obrigatório"}
                                        />
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
                                    flexDirection: "row",
                                    gap: "15px",
                                }}>
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
                                            disabled={getValues("state") ? false : true}
                                            style={{ width: "100%", margin: "0px" }}
                                            // className={classes.textField}
                                            label="Cidade*"
                                            variant='outlined'
                                            fullWidth
                                            margin="normal"
                                            onChange={(e) => {
                                                setLocalidadeCep(e.target.value);
                                            }}
                                            value={getValues("cidade") ? value : localidadeCep}
                                            error={errors.cidade?.type === "required"}
                                            helperText={errors.cidade?.type === "required" && <span>O campo "Status" é obrigatório!</span>}
                                        />
                                    )}
                                />
                                <Controller
                                    name='estado'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <TextField
                                            disabled={getValues("state") ? false : true}
                                            style={{ width: "100%", margin: "0px" }}
                                            select
                                            variant='outlined'
                                            label='UF*'
                                            value={getValues("estado") ? value : ufCep}
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
                                <FormControl size='small' fullWidth>
                                    <TextField
                                        disabled={getValues("state") ? false : true}
                                        label='Número*'
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
                            </div>

                        </div>
                    </div>

                </div>

                <div
                    style={{
                        marginTop: "10px",
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                    }}>
                    <Button
                        disableElevation
                        variant='contained'
                        disabled={disabled}
                        onClick={() => { props.setOpen(false) }}
                        style={{
                            backgroundColor: disabled === true ? "rgba(0, 0, 0, 0.26)" : "white",
                            color: disabled === true ? "rgba(0, 0, 0, 0.26)" : "black",
                            border: "1px solid #000",
                        }}>
                        {" "}
                        Cancelar
                    </Button>
                    {
                        getValues("state") ?
                            <Button
                                style={{
                                    backgroundColor: disabled === true ? "rgba(0, 0, 0, 0.26)" : "#2DE820",
                                    color: disabled === true ? "rgba(0, 0, 0, 0.26)" : "white",
                                }}
                                disableElevation
                                variant='contained'
                                type={"submit"}
                                disabled={disabled}
                            >
                                {" "}
                                Salvar
                            </Button>
                            :
                            <></>

                    }
                    {
                        getValues("state") ?
                            <Button
                                disableElevation
                                variant='contained'
                                type={"submit"}
                                disabled={disabled}
                                onClick={() => {
                                    isActive();
                                }}
                                style={{
                                    backgroundColor: disabled === true ? "rgba(0, 0, 0, 0.26)" : "#DB2F28",
                                    color: disabled === true ? "rgba(0, 0, 0, 0.26)" : "white",
                                }}>
                                {" "}
                                Finalizar
                            </Button>
                            :
                            <></>

                    }
                </div>
            </form>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "60vh",
                }}
            >
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            maxWidth: "100%",
                            margin: "10px",
                        }}
                    >
                        {
                            getValues("state") ?
                                <DialogFormularioServicos addServicoAtendimento={addServicoAtendimento} />
                                :
                                <></>
                        }
                    </div>

                    <Paper style={{ width: "100%" }} >
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        <TableCell align="center" style={{ width: "35%" }}>
                                            <Typography style={{ fontWeight: "bold", color: "black" }}>
                                                Serviço&nbsp;
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" style={{ width: "35%" }}>
                                            <Typography style={{ fontWeight: "bold", color: "black" }}>
                                                Valor&nbsp;
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" style={{ width: "20%" }}>
                                            <Typography style={{ fontWeight: "bold", color: "black" }}>
                                                Ações&nbsp;
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stateReducerAtendimentosLocal.atendimentos?.map((servico: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" style={{ width: "25%" }}>
                                                {servico.servico}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: "25%" }}>
                                                {servico.valor}
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
                                                    {
                                                        getValues("state") ?
                                                            <Button
                                                                variant="contained"
                                                                style={{ backgroundColor: "#c82333", color: "white" }}
                                                                onClick={() => {
                                                                    deleteServicoAtendimento(servico.id);
                                                                }}
                                                            >
                                                                <DeleteForeverIcon />
                                                            </Button>
                                                            :
                                                            <></>
                                                    }
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    {valorTotal()}
                </>
            </div>
        </div>
    );
};