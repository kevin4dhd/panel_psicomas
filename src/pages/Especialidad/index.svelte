<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { Datatable } from "svelte-simple-datatables";
    import { Card, CardBody, Col, Container, Row, Table } from "sveltestrap";
    //Import Breadcrumb
    import Breadcrumbs from "../../common/Breadcrumb.svelte";
    import moment from "moment";
    import { fetch_get, fetch_post } from "../../helpers/fetch_utils";

    let data = [];

    const settings = {
        labels: {
            search: "Buscar...", // search input placeholer
            filter: "Filtrar", // filter inputs placeholder
            noRows: "No se ha encontrado ninguna metodologia",
            info: 'Mostrando pagina {start} de {end} de {rows} Especialidades',
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
		navigate('/metodologia-actualizar/'+item.id);
	};

    onMount(async () => {
        const res = await fetch_get(
            "//api.psicomas.codeasi.info/api/v1/specialty",
            {}
        );
        data = res;
    });
    let rows;
</script>

<div class="page-content">
    <Container fluid>
        <Breadcrumbs title="Especialidades" breadcrumbItem="Listar" />

        <Row>
            <Col sm={12}>
                <Card>
                    <CardBody>
                        <div class="h4 card-title">Especialidades</div>
                        {#if data.length>0}
                            <Datatable {settings} {data} bind:dataRows={rows}>
                                <thead>
                                    <th data-key="id">ID</th>
                                    <th data-key="name">Nombre</th>
                                    <th>Acciones</th>
                                </thead>
                                <tbody>
                                    {#if rows}
                                        {#each $rows as item}
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
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
