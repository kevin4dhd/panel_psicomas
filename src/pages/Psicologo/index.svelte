<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { Datatable } from "svelte-simple-datatables";
    import { Card, CardBody, Col, Container, Row, Table } from "sveltestrap";
    //Import Breadcrumb
    import Breadcrumbs from "../../common/Breadcrumb.svelte";
    import generos from "../../common/data/generos";
    import { fetch_get, fetch_post } from "../../helpers/fetch_utils";

    let data = [];

    const settings = {
        labels: {
            search: "Buscar...", // search input placeholer
            filter: "Filtrar", // filter inputs placeholder
            noRows: "No se ha encontrado ningun psicologo",
            info: 'Mostrando pagina {start} de {end} de {rows} psicologos',
            previous: "Anterior",
            next: "Siguiente",
        },
        sortable: true,
        pagination: true,
        rowsPerPage: 10,
        columnFilter: true,
    };

    const handleEditar = async (item) => {
        console.log(item);
		navigate('/psicologo-actualizar/'+item.id);
	};

    onMount(async () => {
        const res = await fetch_get(
            "//api.psicomas.codeasi.info/api/v1/psychologist",
            {}
        );
        data = res.map(v=>{
            v.user.genero = generos.valueToLabel(v.user.gender);
            return v;
        });
    });
    let rows;
</script>

<div class="page-content">
    <Container fluid>
        <Breadcrumbs title="psicologos" breadcrumbItem="Listar" />

        <Row>
            <Col sm={12}>
                <Card>
                    <CardBody>
                        <div class="h4 card-title">Lista de psicologos</div>
                        {#if data.length>0}
                            <Datatable {settings} {data} bind:dataRows={rows}>
                                <thead>
                                    <th data-key="(row) => row.user.email">Correo</th>
                                    <th data-key="(row) => row.user.firstName + ' ' + row.user.lastName">Nombre</th>
                                    <th data-key="genero">Genero</th>
                                    <th data-key="genero">Telefono</th>
                                    <th>Acciones</th>
                                </thead>
                                <tbody>
                                    {#if rows}
                                        {#each $rows as item}
                                            <tr>
                                                <th scope="row">{item.user.email}</th>
                                                <td>{item.user.firstName} {item.user.lastName}</td>
                                                <td>{item.user.genero}</td>
                                                <td>{item.user.phone}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        class="btn btn-light btn-sm"
                                                        on:click={handleEditar(item)}
                                                        >Editar</button
                                                    >
                                                    <button
                                                        type="button"
                                                        class="btn btn-light btn-sm"
                                                        >Eliminar</button
                                                    >
                                                </td>
                                            </tr>
                                        {/each}
                                    {/if}
                                </tbody>
                            </Datatable>
                        {/if}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
</div>
