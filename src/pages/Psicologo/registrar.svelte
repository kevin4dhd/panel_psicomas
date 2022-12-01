<script>
    import { Router, Link, Route } from "svelte-routing";
    import { fetch_get, fetch_patch, fetch_post } from "../../helpers/fetch_utils.js";
    import {
        Alert,
        Card,
        CardBody,
        CardImg,
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
    import Select from "svelte-select/src/Select.svelte";
    import generos from "../../common/data/generos.js";
    import moment from "moment";

    export let id;
    let actualizar = id != null;
    let psicologo = {};
    let metodologias = [];
    let fileinput;
    let registrando = false;
    let opcionales = [];

    $: isRegistrar = (actualizar
        ? Object.keys(psicologo).filter((v) =>
              v == "password" ? false : ("" + psicologo[v]).trim() === "" && !opcionales.includes(v)
          ).length == 0
        : Object.keys(psicologo).filter((v) => (!psicologo[v] || ("" + psicologo[v]).trim() === "") && !opcionales.includes(v))
              .length == 0) && !registrando;

    async function onSubmit(e) {
        registrando = true;
        let psicologoUpload = {
            ...psicologo,
        };
        psicologoUpload.gender = psicologoUpload.gender.value;
        if (actualizar) {
            const data = await fetch_patch(
                `//api.psicomas.codeasi.info/api/v1/psychologist/`+id,
                psicologoUpload
            );
            if (data != null) {
                success();
            }
        } else {
            const data = await fetch_post(
                `//api.psicomas.codeasi.info/api/v1/psychologist`,
                psicologoUpload
            );
            if (data != null) {
                success();
            }
        }
        registrando = false;
    }

    let visibleSuccess = false;
    function success() {
        visibleSuccess = true;
        setTimeout(() => {
            visibleSuccess = false;
        }, 3000);
        if (!actualizar) {
            fileinput.value = '';
            let v = Object.assign({}, psicologo);
            for( let k in v ) v[k] = "";
            psicologo = v;
            //fetchTarjetas();
        }
    }

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        resizeImage(image);
    };

    function resizeImage(file) {
        if (
            window.File &&
            window.FileReader &&
            window.FileList &&
            window.Blob
        ) {
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    var img = document.createElement("img");
                    img.onload = function () {                    
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);

                        var MAX_WIDTH = 400;
                        var MAX_HEIGHT = 400;
                        var width = img.width;
                        var height = img.height;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);

                        let dataurl = canvas.toDataURL(file.type);
                        psicologo.photo = dataurl;
                        //document.getElementById("output").src = dataurl;
                    };
                    img.src = e.target.result;
                };
            }
        } else {
            alert("The File APIs are not fully supported in this browser.");
        }
    }

    async function fechMetodologias(){
        metodologias = [];
        const res = await fetch_get(
            "//api.psicomas.codeasi.info/api/v1/therapyMethodology",
            {}
        );
        metodologias = res;
    }

    onMount(async () => {
        await fechMetodologias();
        if (actualizar) {
            const data = await fetch_get(
                `//api.psicomas.codeasi.info/api/v1/psychologist/`+id,
            );
            let dataTemp = {};
            dataTemp.firstName = data.user.firstName;
            dataTemp.lastName = data.user.lastName;
            dataTemp.email = data.user.email;
            dataTemp.dni = data.user.dni;
            dataTemp.phone = data.user.phone;
            dataTemp.costPerHour = data.costPerHour;
            dataTemp.about = data.about;
            /*if(data.tarjeta){
                tarjetas.push(data.tarjeta);
                dataTemp.tarjeta = data.tarjeta;
            }*/
            dataTemp.gender = generos.valueToEstado(data.user.gender);
            if(data.user.photo){
                dataTemp.photo = data.user.photo.path;
            }
            if(data.user.birthday){
                dataTemp.birthday = moment(data.user.birthday).utc(false).format('yyyy-MM-DD');
            }
            if(data.therapyMethodology){
                dataTemp.therapyMethodology = data.therapyMethodology;
            }
            psicologo = dataTemp;
        }
    });
</script>

<div class="page-content">
    <Container fluid>
        <Breadcrumbs
            title="psicologos"
            breadcrumbItem={actualizar ? "Actualizar" : "Registrar"}
        />
        <Row>
            <Col lg={12}>
                <Card>
                    <CardBody>
                        <CardTitle class="h4 mb-4"
                            >{actualizar
                                ? "Actualizar psicologo"
                                : "Registrar psicologo"}</CardTitle
                        >

                        <form on:submit|preventDefault={onSubmit}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup class="mb-3">
                                        <Label>Nombre</Label>
                                        <Input
                                            bind:value={psicologo.firstName}
                                            type="text"
                                            class="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup class="mb-3">
                                        <Label>Apellidos</Label>
                                        <Input
                                            bind:value={psicologo.lastName}
                                            type="text"
                                            class="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <FormGroup class="mb-3">
                                        <Label>Correo</Label>
                                        <Input
                                            bind:value={psicologo.email}
                                            type="email"
                                            class="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup class="mb-3">
                                        <Label>Contraseña</Label>
                                        <Input
                                            bind:value={psicologo.password}
                                            type="password"
                                            class="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4}>
                                    <FormGroup class="mb-3">
                                        <Label>DNI</Label>
                                        <Input
                                            bind:value={psicologo.dni}
                                            type="text"
                                            class="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <div class="mb-3 select2-container">
                                        <Label>Genero</Label>
                                        <Select
                                            items={generos.generos}
                                            placeholder="Seleccionar..."
                                            bind:value={psicologo.gender}
                                        />
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <FormGroup class="mb-3">
                                        <Label>Fecha de nacimiento</Label>
                                        <Input
                                            bind:value={psicologo.birthday}
                                            type="date"
                                            class="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            
                            <Row>
                                <Col md={4}>
                                    <div class="mb-3 select2-container">
                                        <Label>Metodologia</Label>
                                        <Select
                                            items={metodologias}
                                            placeholder="Seleccionar..."
                                            bind:value={psicologo.therapyMethodology}
                                            labelIdentifier="name" 
                                            optionIdentifier="id"
                                        />
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div class="mb-3 select2-container">
                                        <Label>Costo por hora</Label>
                                        <Input
                                            bind:value={psicologo.costPerHour}
                                            class="form-control"
                                        />
                                    </div>
                                </Col>
                            </Row>
                                <Col md={12}>
                                    <FormGroup class="mb-3">
                                        <Label>Informacion sobre el psicologo </Label>
                                        <textarea
                                            bind:value={psicologo.about}
                                            class="form-control"
                                            rows="4"
                                        />
                                    </FormGroup>
                                </Col>
                            <Row>
                                
                            </Row>

                            <Row>
                                <Col md={4}>
                                    <FormGroup class="mb-3">
                                        <Label>Telefono</Label>
                                        <Input
                                            bind:value={psicologo.phone}
                                            type="text"
                                            class="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup class="mb-3">
                                        <Label>Foto</Label>
                                        <input
                                            accept="image/png, image/jpeg"
                                            on:change={(e) => onFileSelected(e)}
                                            bind:this={fileinput}
                                            type="file"
                                            class="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    {#if psicologo.photo}
                                        <CardImg
                                            src={psicologo.photo}
                                            alt="Skote"
                                            class="rounded avatar-lg mb-3"
                                            style="object-fit: scale-down;"
                                        />
                                    {/if}
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
                                        on:click={() => navigate("/psicologo")}
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
