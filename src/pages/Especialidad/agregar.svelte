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

    let especialidad = {};
    let psicologos = [];
    let especialidades = [];
    let especialidadesFilter = [];
    let especialidadesPsicologo = [];
    let isAgregando = false;

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
        especialidad.psicologo.specialty = especialidad.psicologo.specialty.filter((s) => s.id != specialty.id);
        especialidadesPsicologo = especialidad.psicologo.specialty;
        especialidadesFilter = especialidades.filter(e=>especialidad.psicologo.specialty.filter(s=>s.id==e.id).length==0);
        fetch_post(`//api.psicomas.codeasi.info/api/v1/psychologist/deleteSpecialist`, {
            psychologist: especialidad.psicologo.id,
            specialty: specialty.id,
        });
    }

    function selectPsicologo() {
        especialidadesPsicologo = especialidad.psicologo.specialty;
        especialidadesFilter = especialidades.filter(
            (e) =>
                especialidad.psicologo.specialty.filter((s) => s.id == e.id)
                    .length == 0
        );
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
                            <Col lg={12}>
                                <div class="mb-3 select2-container">
                                    <Label>Psicologo</Label>
                                    <Select
                                        items={psicologos}
                                        placeholder="Seleccionar..."
                                        bind:value={especialidad.psicologo}
                                        labelIdentifier="name"
                                        optionIdentifier="id"
                                        on:select={selectPsicologo}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <form
                                    on:submit|preventDefault={agregarEspecialidad}
                                >
                                    <div class="mb-3 select2-container">
                                        <Label>Especialidades</Label>
                                        <Select
                                            items={especialidadesFilter}
                                            placeholder="Seleccionar..."
                                            bind:value={especialidad.especialidad}
                                            labelIdentifier="name"
                                            optionIdentifier="id"
                                        />
                                        <button
                                            type="submit"
                                            class="btn btn-primary w-md"
                                            disabled={isAgregando ||
                                                !especialidad.psicologo ||
                                                !especialidad.especialidad}
                                            style="margin-top: 8px;"
                                        >
                                            "Agregar"
                                        </button>
                                    </div>
                                </form>
                            </Col>
                            <Col lg={6}>
                                <div class="mb-3 select2-container">
                                    <Label>Especialidades del Psicologo</Label>
                                    {#if especialidad.psicologo}
                                        {#each especialidadesPsicologo as specialty}
                                            <Card
                                                color="primary"
                                                inverse
                                                class="mb-3"
                                                style="padding-top: 4px; padding-bottom: 4px; padding-left: 8px; padding-right: 8px;"
                                            >
                                                <div
                                                    class="d-flex justify-content-between align-items-center"
                                                >
                                                    {specialty.name}
                                                    <button
                                                        class="btn btn-danger w-md"
                                                        on:click={() =>
                                                            eliminarEspecialidad(
                                                                specialty
                                                            )}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </Card>
                                        {/each}
                                    {/if}
                                </div>
                            </Col>
                        </Row>

                        <!--div>
                                {#if visibleSuccess}
                                    <div class="card bg-success text-white">
                                        <div class="card-header">Se {"Registro"} correctamente</div>
                                    </div>
                                {/if}
                                <button
                                    type="submit"
                                    class="btn btn-primary w-md"
                                    disabled={!isRegistrar}
                                >
                                    {"Registrar"}
                                </button>
                            </div-->
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
</div>
