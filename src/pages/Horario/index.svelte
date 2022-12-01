<script>
    import { Router, Link, Route } from "svelte-routing";
    import {
        fetch_get,
        fetch_patch,
        fetch_post,
    } from "../../helpers/fetch_utils.js";
    import {
        Alert,
        Card,
        CardBody,
        CardTitle,
        Col,
        Container,
        Form,
        FormGroup,
        Input,
        Label,
        Row,
    } from "sveltestrap";
    //Import Breadcrumb
    import Breadcrumbs from "../../common/Breadcrumb.svelte";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing/src/history.js";
    import moment from "moment";
    import Select from "svelte-select/src/Select.svelte";

    let horario = {};
    let cargandoHorarios = false;
    let psicologos = [];
    let especialidades = [];
    let especialidadesFilter = [];
    let especialidadesPsicologo = [];
    let isAgregando = false;

    async function changeFecha() {
        if (horario.psicologo) {
            fetchPsicologoFecha();
        }
    }

    async function onSubmit(e) {
        visibleSuccess = false;
        if (actualizar) {
            const data = await fetch_patch(
                `//api.psicomas.codeasi.info/api/v1/specialty/` + id,
                especialidad
            );
            if (data != null) {
                success();
            }
        } else {
            const data = await fetch_post(
                `//api.psicomas.codeasi.info/api/v1/specialty`,
                especialidad
            );
            if (data != null) {
                success();
            }
        }
    }

    let visibleSuccess = false;
    function success() {
        visibleSuccess = true;
        setTimeout(() => {
            visibleSuccess = false;
        }, 3000);
        if (!actualizar) {
            especialidad = {};
        }
    }

    function agregarEspecialidad() {
        if (especialidad.especialidad) {
            if (
                especialidad.psicologo.specialty.filter(
                    (s) => s.id == especialidad.especialidad.id
                ).length == 0
            ) {
                especialidad.psicologo.specialty.push(
                    especialidad.especialidad
                );
                especialidadesPsicologo = especialidad.psicologo.specialty;
                especialidadesFilter = especialidades.filter(
                    (e) =>
                        especialidad.psicologo.specialty.filter(
                            (s) => s.id == e.id
                        ).length == 0
                );
                fetch_post(
                    `//api.psicomas.codeasi.info/api/v1/psychologist/addSpecialist`,
                    {
                        psychologist: especialidad.psicologo.id,
                        specialty: especialidad.especialidad.id,
                    }
                );
                especialidad.especialidad = undefined;
            }
        }
    }

    function eliminarEspecialidad(specialty) {
        especialidad.psicologo.specialty =
            especialidad.psicologo.specialty.filter(
                (s) => s.id != specialty.id
            );
        especialidadesPsicologo = especialidad.psicologo.specialty;
        especialidadesFilter = especialidades.filter(
            (e) =>
                especialidad.psicologo.specialty.filter((s) => s.id == e.id)
                    .length == 0
        );
        fetch_post(`//api.psicomas.codeasi.info/api/v1/psychologist/deleteSpecialist`, {
            psychologist: especialidad.psicologo.id,
            specialty: specialty.id,
        });
    }

    function selectPsicologo() {
        if (horario.fecha) {
            fetchPsicologoFecha();
        }
    }

    async function fetchPsicologoFecha(){
        cargandoHorarios = true;
        const res = await fetch_post
            ("//api.psicomas.codeasi.info/api/v1/schedule/scheduleByPsychologistDate",
            {
                psychologist: horario.psicologo.id,
                fecha: horario.fecha,
            }
        );
        horariosFull = horariosFull.map(h=>{
            h.s = res.filter(r=>r.hourDay==h.h).length>0;
            return h;
        });
        cargandoHorarios = false;
    }

    let horariosFull = [
        {h:8,s:false,t:'m'},
        {h:9,s:false,t:'m'},
        {h:10,s:false,t:'m'},
        {h:11,s:false,t:'m'},
        {h:12,s:false,t:'t'},
        {h:13,s:false,t:'t'},
        {h:14,s:false,t:'t'},
        {h:15,s:false,t:'t'},
        {h:16,s:false,t:'t'},
        {h:17,s:false,t:'t'},
        {h:18,s:false,t:'n'},
        {h:19,s:false,t:'n'},
        {h:20,s:false,t:'n'},
        {h:21,s:false,t:'n'},
        {h:22,s:false,t:'n'},
    ];

    function clickHorario(hora){
        for (let index = 0; index < horariosFull.length; index++) {
            const horarioFull = horariosFull[index];
            if(horarioFull.h==hora.h){
                horarioFull.s=!hora.s;
                horariosFull[index]= horarioFull;
            }
        }
        if(hora.s){//desactivar
            fetch_post(
                `//api.psicomas.codeasi.info/api/v1/schedule/addSchedule`,
                {
                    psychologist: horario.psicologo.id,
                    fecha: horario.fecha,
                    hora: hora.h,
                }
            );
        }else{//activar
            fetch_post(
                `//api.psicomas.codeasi.info/api/v1/schedule/deleteSchedule`,
                {
                    psychologist: horario.psicologo.id,
                    fecha: horario.fecha,
                    hora: hora.h,
                }
            );
        }
    }

    onMount(async () => {
        const res = await fetch_get("//api.psicomas.codeasi.info/api/v1/psychologist", {});
        psicologos = res.map((item) => {
            item.name = item.user.firstName + " " + item.user.lastName;
            return item;
        });
        const resEspecialidades = await fetch_get(
            "//api.psicomas.codeasi.info/api/v1/specialty",
            {}
        );
        especialidades = resEspecialidades;
    });
</script>

<div class="page-content">
    <Container fluid>
        <Breadcrumbs title="Especialidades" breadcrumbItem={"Registrar"} />
        <Row>
            <Col lg={12}>
                <Card>
                    <CardBody>
                        <CardTitle class="h4 mb-4"
                            >{"Registrar Especialidad a Psicologo"}</CardTitle
                        >
                        <Row>
                            <Col lg={6}>
                                <div class="mb-3 select2-container">
                                    <Label>Psicologo</Label>
                                    <Select
                                        items={psicologos}
                                        placeholder="Seleccionar..."
                                        bind:value={horario.psicologo}
                                        labelIdentifier="name"
                                        optionIdentifier="id"
                                        on:select={selectPsicologo}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div class="mb-3 select2-container">
                                    <Label>Fecha</Label>
                                    <Input
                                        bind:value={horario.fecha}
                                        on:change={changeFecha}
                                        type="date"
                                        class="form-control"
                                    />
                                </div>
                            </Col>
                        </Row>
                        {#if horario.psicologo && horario.fecha && !cargandoHorarios}
                            <Row>
                                <Col lg={4}>
                                    <div class="d-flex flex-column align-items-center">
                                        <h3>Mañana</h3>
                                        {#each horariosFull.filter(h=>h.t=='m') as horarioFull}
                                            <Card
                                                body
                                                color="{horarioFull.s ? "primary" : "light"}"
                                                inverse="{horarioFull.s}"
                                                class="mb-3 text-center"
                                                style="font-weight: bold; font-size: 16px; cursor: pointer;"
                                                on:click={()=>clickHorario(horarioFull)}
                                            >
                                                {horarioFull.h}:00 a.m.
                                            </Card>
                                        {/each}

                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div class="d-flex flex-column align-items-center">
                                        <h3>Tarde</h3>
                                        {#each horariosFull.filter(h=>h.t=='t') as horarioFull}
                                            <Card
                                                body
                                                color="{horarioFull.s ? "primary" : "light"}"
                                                inverse="{horarioFull.s}"
                                                class="mb-3 text-center"
                                                style="font-weight: bold; font-size: 16px; cursor: pointer;"
                                                on:click={()=>clickHorario(horarioFull)}
                                            >
                                                {horarioFull.h>12?horarioFull.h-12:horarioFull.h}:00 p.m.
                                            </Card>
                                        {/each}

                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div class="d-flex flex-column align-items-center">
                                        <h3>Noche</h3>
                                        {#each horariosFull.filter(h=>h.t=='n') as horarioFull}
                                            <Card
                                                body
                                                color="{horarioFull.s ? "primary" : "light"}"
                                                inverse="{horarioFull.s}"
                                                class="mb-3 text-center"
                                                style="font-weight: bold; font-size: 16px; cursor: pointer;"
                                                on:click={()=>clickHorario(horarioFull)}
                                            >
                                                {horarioFull.h>12?horarioFull.h-12:horarioFull.h}:00 p.m.
                                            </Card>
                                        {/each}

                                    </div>
                                </Col>
                            </Row> 
                        {/if}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
</div>
