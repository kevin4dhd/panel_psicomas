<script>
    import { Router, Link, Route } from "svelte-routing";
    import { fetch_get, fetch_patch, fetch_post } from "../../helpers/fetch_utils.js";
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

    export let id;
    let actualizar = id != null;
    let metodologia = {};

    $: isRegistrar =
        Object.keys(metodologia).filter((v) => ("" + metodologia[v]).trim() === "")
            .length == 0;

    async function onSubmit(e) {
        visibleSuccess = false;
        if (actualizar) {
            const data = await fetch_patch(
                `//api.psicomas.codeasi.info/api/v1/specialty/`+id,
                metodologia
            );
            if (data != null) {
                success();
            }
        } else {
            const data = await fetch_post(
                `//api.psicomas.codeasi.info/api/v1/specialty`,
                metodologia
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
            metodologia = {};
        }
    }

    onMount(async () => {
        if (actualizar) {
            const data = await fetch_get(
                `//api.psicomas.codeasi.info/api/v1/specialty/`+id,
            );
            metodologia = data;
        }
    });
</script>

<div class="page-content">
    <Container fluid>
        <Breadcrumbs
            title="Especialidades"
            breadcrumbItem={actualizar ? "Actualizar" : "Registrar"}
        />
        <Row>
            <Col lg={12}>
                <Card>
                    <CardBody>
                        <CardTitle class="h4 mb-4"
                            >{actualizar
                                ? "Actualizar Especialidad"
                                : "Registrar Especialidad"}</CardTitle
                        >

                        <form on:submit|preventDefault={onSubmit}>
                            <Row>
                                <Col lg={12}>
                                    <FormGroup class="mb-3">
                                        <Label>Nombre</Label>
                                        <Input
                                            bind:value={metodologia.name}
                                            type="text"
                                            class="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <div>
                                {#if visibleSuccess}
                                    <div class="card bg-success text-white">
                                        <div class="card-header">Se {actualizar ? "Actualizo" : "Registro"} correctamente</div>
                                    </div>
                                {/if}
                                {#if actualizar}
                                    <button
                                        type="submit"
                                        class="btn btn-secondary w-md"
                                        on:click={() => navigate("/metodologia")}
                                    >
                                        Atras
                                    </button>
                                {/if}
                                <button
                                    type="submit"
                                    class="btn btn-primary w-md"
                                    disabled={!isRegistrar}
                                >
                                    {actualizar ? "Actualizar" : "Registrar"}
                                </button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
</div>
