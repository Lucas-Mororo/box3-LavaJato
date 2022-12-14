/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Chart } from "primereact/chart";
import { useAtendimentoContext } from "../../context/Atendimento/hooks/useAtendimentos";
import { useServicosContext } from "../../context/Servico/hooks/useServicos";
import { useForm } from "react-hook-form";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import Notify from "../../utils/Notification";
import './style.css';

const Dashboard = () => {
    const { stateReducerAtendimentos } = useAtendimentoContext();
    const { stateReducerServico } = useServicosContext();
    const [chartData, setChartData] = useState<any>();
    const [lightOptions, setLightOptions] = useState<any>();
    const [verify, setVerify] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, } = useForm({ mode: "onSubmit" });
    const [media, setMedia] = React.useState<any>();

    let array: { atendimentoId: number; servicoId: number }[] = [];
    const count: { name: string; quant: number; id: number }[] = [];

    React.useEffect(() => {
        stateReducerServico.servicos.map((serv) => {
            stateReducerAtendimentos.atendimentos.map((atend) => {
                atend.servicos?.map((element) => {
                    if (serv.id === element.id) {
                        array.push({
                            atendimentoId: atend.id,
                            servicoId: serv.id,
                        });
                    }
                });
            });
            count.push({ name: serv.servico, quant: 0, id: serv.id });
        });


        count.map((count) => {
            array.map((array) => {
                if (count.id === array.servicoId) {
                    count.quant = ++count.quant;
                }
            });
        })

        const labelsChard = count.filter((value) => value.quant > 0)
        const datasetsChard = count.filter((value) => value.quant > 0)

        if (count !== []) {
            setVerify(true)
            setChartData({
                labels: labelsChard.map((elemento: any) => elemento.name),
                datasets: [
                    {
                        data: datasetsChard.map((elemento: any) => elemento.quant),
                        backgroundColor: [
                            "#42A5F5",
                            "#66BB6A",
                            "#3E67B5",
                            "#FFA726",
                            "#AE5BB5",
                            "#7794B5",
                        ],
                        hoverBackgroundColor: [
                            "#64B5F6",
                            "#81C784",
                            "#538CF5",
                            "#FFB74D",
                            "#EB7BF5",
                            "#A1C8F5",
                        ],
                    },
                ],
            })

            setLightOptions({
                plugins: {
                    legend: {
                        labels: {
                            color: "#495057",
                        },
                    },
                },
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verify])

    async function action(data: any, array: any, count: any) {
        let countMedia = 0;
        let sum = 0;

        stateReducerServico.servicos.map((serv) => {
            stateReducerAtendimentos.atendimentos.map((atend) => {
                if (atend.state === false) {
                    if (atend.dataI >= data.dataI && atend.dataF <= data.dataF) {
                        atend.servicos?.map((element) => {
                            if (serv.id === element.id) {
                                array.push({
                                    atendimentoId: atend.id,
                                    servicoId: serv.id,
                                });
                            }
                        });
                    }
                }
            });
            count.push({ name: serv.servico, quant: 0, id: serv.id });
        });

        count.map((count: any) => {
            array.map((array: any) => {
                if (count.id === array.servicoId) {
                    count.quant = ++count.quant;
                }
            });
        })

        const labelsChard = count.filter((value: any) => value.quant > 0)
        const datasetsChard = count.filter((value: any) => value.quant > 0)

        if (count !== []) {
            setVerify(true)
            setChartData({
                labels: labelsChard.map((elemento: any) => elemento.name),
                datasets: [
                    {
                        data: datasetsChard.map((elemento: any) => elemento.quant),
                        backgroundColor: [
                            "#42A5F5",
                            "#66BB6A",
                            "#3E67B5",
                            "#FFA726",
                            "#AE5BB5",
                            "#7794B5",
                        ],
                        hoverBackgroundColor: [
                            "#64B5F6",
                            "#81C784",
                            "#538CF5",
                            "#FFB74D",
                            "#EB7BF5",
                            "#A1C8F5",
                        ],
                    },
                ],
            })

            setLightOptions({
                plugins: {
                    legend: {
                        labels: {
                            color: "#495057",
                        },
                    },
                },
            })
        }

        function millisToMinutesAndSeconds(millis: any) {
            var minutes: any = Math.floor(millis / 60000);
            var seconds: any = ((millis % 60000) / 1000).toFixed(0);
            localStorage.setItem('@medai', minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
            setMedia(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
            // return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
        stateReducerAtendimentos.atendimentos.map((element: any) => {
            if (element.state === false) {
                if (element.dataI >= data.dataI && element.dataF <= data.dataF) {
                    // // MEDIA // //
                    let dataInical, aux;
                    aux = element.dataI.split("T");
                    dataInical = aux.join(" ");
                    var inicialDate: any = new Date(dataInical);
                    let dataFinal, aux2;
                    aux2 = element.dataF.split("T");
                    dataFinal = aux2.join(" ");
                    var finalDate: any = new Date(dataFinal);
                    var dateDifference;
                    dateDifference = finalDate - inicialDate;
                    sum = sum + dateDifference;
                    countMedia = countMedia + 1;
                }
            }
        })
        sum = sum / countMedia
        millisToMinutesAndSeconds(sum);
    };

    return (
        <>
            <div className="div1-Dashboard card flex justify-content-center">
                <div className="div2-Dashboard">
                    <div className="div3-Dashboard">
                        <form onSubmit={handleSubmit((data) => {
                            if (data.dataI > data.dataF) {
                                setChartData([]);
                                setLightOptions([]);
                                Notify("Data de busca invalida!", "warning")
                            } else {
                                action({
                                    dataI: data.dataI,
                                    dataF: data.dataF,
                                }, array, count);
                            }
                        })}
                        >
                            <div className="div4-Dashboard">
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
                                            "O campo 'Data de Registro' ?? obrigat??rio"
                                        }
                                    />
                                </FormControl>
                                <FormControl size='small' fullWidth>
                                    <TextField
                                        label='Data finaliza????o'
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
                                            "O campo 'Data finaliza????o' ?? obrigat??rio"
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="div5-Dashboard">
                                <Button
                                    style={{
                                        backgroundColor: "#0195ff",
                                        color: "white",
                                    }}
                                    disableElevation
                                    variant='contained'
                                    type={"submit"}
                                >
                                    {" "}
                                    Pesquisar
                                </Button>
                            </div>
                        </form>
                        <div className="div6-Dashboard">
                            {
                                media === undefined
                                    ?
                                    <Typography
                                        className="typography1-Dashboard"
                                        variant="h5"
                                        component="h6">
                                        Fa??a uma pesquisa para saber o tempo m??dio de atendimento.
                                    </Typography>
                                    :
                                    <>
                                        <Typography className="typography1-Dashboard" variant="h5" component="h6">
                                            M??dia de atendimentos para o per??odo:
                                        </Typography>
                                        <div>
                                            {
                                                media === undefined || NaN
                                                    ?
                                                    <></>
                                                    :
                                                    <Typography className="typography1-Dashboard" variant="h5" component="h6">
                                                        {media} minutos
                                                    </Typography>
                                            }
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    <Chart
                        type="pie"
                        data={chartData}
                        options={lightOptions}
                        style={{ position: "relative", width: "40%" }}
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
