/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useMarcasContext } from "../../../context/Marca/hooks/useMarcas";
import { useModelosContext } from "../../../context/Modelo/hooks/useModelos";
import { Atendimentos } from "../../../models/atendimento";
import Notify from "../../../utils/Notification";
import { useClientesContext } from "../../../context/Usuarios/hooks/useClientes";
import axios, { AxiosResponse } from "axios";
import { EstadoBrasileiro } from "../../../models/estadoBrasileiro";
import { useServicosContext } from "../../../context/Servico/hooks/useServicos";
import { useAtendimentoContext } from "../../../context/Atendimento/hooks/useAtendimentos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Modelos } from "../../../models/modelos";

export default function FormularioView(props: { action: string, id: number, atendimentos: Atendimentos[], setOpen: any }): React.ReactElement {
    const { register, handleSubmit, control, getValues, setValue, reset, formState: { errors }, } = useForm({ mode: "onSubmit" });
    const [marcas, setMarcas] = React.useState({} as Atendimentos);
    const [disabled, setDisabled] = React.useState(false);
    const { stateReducerMarca } = useMarcasContext();
    const { stateReducerModelo } = useModelosContext();
    const { stateReducer } = useClientesContext();
    const [cep, setCep] = React.useState<String>('');
    const [buscarCep, setBuscarCep] = React.useState<boolean>(false);
    const [estadosBrasileiros, setEstadosBrasileiros] = React.useState<EstadoBrasileiro[]>([]);
    const { stateReducerServico } = useServicosContext();
    const [modeloMarcas, setModeloMarcas] = React.useState<Modelos[]>([]);
    const [foneCliente, setFoneCliente] = React.useState<any>([]);
    const [logradouroCep, setLogradouroCep] = React.useState<string>("");
    const [localidadeCep, setLocalidadeCep] = React.useState<string>("");
    const [bairroCep, setBairroCep] = React.useState<string>("");
    const [ufCep, setUfCep] = React.useState<string>("");
    const [nameCliente, setNameCliente] = React.useState<any>();
    const { addAtendimento, updateAtendimento } = useAtendimentoContext();

    async function action(data: Atendimentos) {
        if (props.action === "CadastroAtendimento") {
            console.log(data);
            props.setOpen(false);
            addAtendimento(data);
            Notify("Atendimento cadastrado com sucesso!", "success")
        } else {
            props.setOpen(false);
            updateAtendimento(data);
            Notify("Atendimento alterado com sucesso!", "success")
        }
    };

    React.useEffect(() => {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then((response) => {
                setEstadosBrasileiros(response.data);
            })
        if (props.action === "AlterarAtendimento") {
            const data = props.atendimentos.filter((value) => value.id === props.id)
            reset(data[0]);
            setCep(cepMask(data[0].CEP));
            setMarcas(data[0]);
        }
    }, [props.action, props.id, props.atendimentos, reset, buscarCep, getValues]);

    function phone(value: string) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
    }

    function cepMask(value: string) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    }

    function Placa(v: string) {
        v = v.toUpperCase();
        return v;
    }

    function modelosMarca(e: any) {
        const newModeloMarcasa = stateReducerModelo.modelos.filter((modelo: { marca: string; }) => {
            return modelo.marca === e.target.value
        })
        setModeloMarcas(newModeloMarcasa);
    }

    function funcFoneCliente(e: any) {
        const newCliente = stateReducer.clientes.filter((cliente: { id: number; }) => {
            return cliente.id === e.target.value
        })
        const telefone = newCliente.map((cliente) => cliente.telefone);
        const cliente = newCliente.map((cliente) => cliente.name);
        setNameCliente(cliente);
        setValue(
            "telefone",
            telefone
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

    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log(data);
                if (props.action !== "CadastroAtendimento") {
                    // if (JSON.stringify(marcas) !== JSON.stringify(data)) {
                    //     action({
                    //         name: data.name,
                    //         id: (props.id),
                    //     });
                    // } else {
                    //     Notify(
                    //         "Para efetuar esta ação atualize pelo menos uma informação!",
                    //         "warning",
                    //     );
                    // }
                } else {
                    setDisabled(true);
                    const id = props.atendimentos.length + 1;
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
                        servicos: [
                            {
                                servico: "Cristalização de vidros",
                                valor: "50,00",
                                id: 0,
                            },
                        ],
                        state: data.state,
                        id: id,
                    });
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
                    <FormControl size='small' fullWidth>
                        <TextField
                            label='Data de Registro'
                            variant='outlined'
                            type='datetime-local'
                            style={{
                                width: "100%",
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("dataI", { required: true })}
                            error={errors.dataI?.type === "required"}
                            helperText={
                                errors.dataI?.type === "required" &&
                                "O campo 'Data de Registro' é obrigatório"
                            }
                        />
                    </FormControl>
                    <FormControl size='small' fullWidth>
                        <TextField
                            label='Data finalização'
                            variant='outlined'
                            type='datetime-local'
                            style={{
                                width: "100%",
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("dataF", { required: true })}
                            error={errors.dataF?.type === "required"}
                            helperText={
                                errors.dataF?.type === "required" &&
                                "O campo 'Data finalização' é obrigatório"
                            }
                        />
                    </FormControl>
                    <Controller
                        name="state"
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { value, onChange }
                        }) => (
                            <TextField
                                style={{ width: "50%", margin: "0px" }}
                                label="Status*"
                                select
                                variant='outlined'
                                fullWidth
                                margin="normal"
                                value={getValues("state") ? value : ""}
                                onChange={(e) => { onChange(e) }}
                                error={errors.state?.type === "required"}
                                helperText={errors.state?.type === "required" && <span>O campo "Status" é obrigatório!</span>}
                            >
                                <MenuItem value="">Selecione o status</MenuItem>
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
                        gap: "50px"
                    }}>
                    <div
                        style={{
                            width: "40%",
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
                                name="cliente"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({
                                    field: { value, onChange }
                                }) => (
                                    <TextField
                                        style={{ width: "100%", margin: "0px" }}
                                        label="Cliente*"
                                        select
                                        variant='outlined'
                                        fullWidth
                                        margin="normal"
                                        value={getValues("cliente") ? value : ""}
                                        onChange={(e) => { funcFoneCliente(e); onChange(e); }}
                                        error={errors.cliente?.type === "required"}
                                        helperText={errors.cliente?.type === "required" && "O campo 'Cliente' é obrigatório!"}
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
                                            // setValue(
                                            //     "telefone",
                                            //     foneCliente
                                            // );
                                            setFoneCliente(phone(e.target.value));
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
                    <Paper style={{ width: "50%" }} >
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        <TableCell align="center" style={{ width: "35%" }}>
                                            <Typography style={{ fontWeight: "bold", color: "black" }}>
                                                Serviço&nbsp;
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
                                    {stateReducerServico.servicos?.map((servico, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" style={{ width: "25%" }}>
                                                {servico.servico}
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
                                                    {/* <Dialog
                                                    action={"AlterarServico"}
                                                    id={servico.id}
                                                    servicos={stateReducerServico.servicos}
                                                /> */}

                                                    {/* <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: "#c82333", color: "white" }}
                                                // onClick={() => {
                                                //     deleteServico(servico.id);
                                                // }}
                                                >
                                                    <DeleteForeverIcon />
                                                    Deletar
                                                </Button> */}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
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
                    {props.action === "CadastroAtendimento" ?
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