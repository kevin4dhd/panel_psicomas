<script>
  import { onMount } from "svelte";

  import { Link } from "svelte-routing";

  import { _ } from "svelte-i18n";

  let current = "dashboard";
  let current_child = "dashboard";

  function changeClassAttribute(attribute, child = null) {
    if (child && child === current_child) {
      current_child = null;
    } else if (attribute === current && child === null) {
      current = null;
      current_child = null;
    } else {
      current = attribute;
      current_child = child;
    }

    return false;
  }

  onMount(() => {
    menuActivation();
  });

  function menuActivation() {
    var links = document.getElementsByClassName("side-nav-link-ref");
    var matchingMenuItem = null;
    const paths = [];

    for (var i = 0; i < links.length; i++) {
      paths.push(links[i]["pathname"]);
    }
    var itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf("/");
      const item = window.location.pathname.substr(0, strIndex).toString();

      matchingMenuItem = links[paths.indexOf(item)];
    } else {
      matchingMenuItem = links[itemIndex];
    }
    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");
      var parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add("mm-active");
        const parent2 = parent.parentElement.closest("ul");
        if (parent2 && parent2.id !== "side-menu") {
          parent2.classList.add("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add("mm-active");
            var childAnchor = parent3.querySelector(".has-arrow");
            var childDropdown = parent3.querySelector(".has-dropdown");
            if (childAnchor) childAnchor.classList.add("mm-active");
            if (childDropdown) childDropdown.classList.add("mm-active");

            const parent4 = parent3.parentElement;
            if (parent4 && parent4.id !== "side-menu") {
              parent4.classList.add("mm-show");
              const parent5 = parent4.parentElement;
              if (parent5 && parent5.id !== "side-menu") {
                parent5.classList.add("mm-active");
                const childanchor = parent5.querySelector(".is-parent");
                if (childanchor && parent5.id !== "side-menu") {
                  childanchor.classList.add("mm-active");
                }
              }
            }
          }
        }
      }
    }
    return false;
  }
  
</script>

<!-- ========== Left Sidebar Start ========== -->
<div class="vertical-menu">
  <div data-simplebar class="h-100">
    <!--- Sidemenu -->
    <div id="sidebar-menu">
      <!-- Left Menu Start -->
      <ul class="metismenu list-unstyled" id="side-menu">
        <li class="menu-title" key="t-menu">{$_("menuitems.menu.text")}</li>

        <li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("dashboards")}>
            <i class="bx bx-home-circle" />
            <span key="t-dashboards">Principal</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'dashboards'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="/dashboard" key="t-default" class="side-nav-link-ref">Dashboard</Link>
            </li>
            <!--li>
              <Link class="side-nav-link-ref" to="/" key="t-saas">{$_("menuitems.dashboards.list.saas")}</Link>
            </li>
            <li>
              <Link
                class="side-nav-link-ref"
                to="/"
                key="t-crypto">{$_("menuitems.dashboards.list.crypto")}</Link>
            </li>
            <li>
              <Link class="side-nav-link-ref" to="/" key="t-blog">{$_("menuitems.dashboards.list.blog")}</Link>
            </li>
            <li>
              <Link class="side-nav-link-ref" to="/" key="t-jobs">
                <span class="badge rounded-pill text-bg-success float-end" key="t-new">New</span>
                <span>{$_("menuitems.dashboards.list.jobs")}</span>
              </Link>
            </li-->
          </ul>
        </li>

        <li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("psicologo")}>
            <i class="bx bx-user-circle" />
            <span key="t-psicologo">Psicologos</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'psicologo'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="psicologo" key="t-psicologo-listar" class="side-nav-link-ref">Listar</Link>
            </li>
            <li>
              <Link to="psicologo-registrar" key="t-psicologo-registrar" class="side-nav-link-ref">Registrar</Link>
            </li>
          </ul>
        </li>

        <!--li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("matricula")}>
            <i class="bx bxs-dock-left" />
            <span key="t-matricula">Matriculas</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'matricula'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="matricula" key="t-matricula-listar" class="side-nav-link-ref">Listar</Link>
            </li>
            <li>
              <Link to="matricula-registrar" key="t-matricula-registrar" class="side-nav-link-ref">Registrar</Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("asistencia")}>
            <i class="bx bx-spreadsheet" />
            <span key="t-asistencia">Asistencia</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'asistencia'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="asistencia" key="t-asistencia-listar" class="side-nav-link-ref">Listar</Link>
            </li>
            <li>
              <Link to="asistencia-gestionar" key="t-asistencia-gestionar" class="side-nav-link-ref">Gestionar</Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("tarjeta")}>
            <i class="bx bx-id-card" />
            <span key="t-tarjeta">Tarjetas</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'tarjeta'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="tarjeta" key="t-tarjeta-listar" class="side-nav-link-ref">Listar</Link>
            </li>
          </ul>
        </li-->

        
        <li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("metodologia")}>
            <i class="bx bx-message-square-dots" />
            <span key="t-metodologia">Metodologias</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'metodologia'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="metodologia" key="t-metodologia-listar" class="side-nav-link-ref">Listar</Link>
            </li>
            <li>
              <Link to="metodologia-registrar" key="t-metodologia-registrar" class="side-nav-link-ref">Registrar</Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("especialidad")}>
            <i class="bx bx-message-square-dots" />
            <span key="t-especialidad">Especialidades</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'especialidad'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="especialidad" key="t-especialidad-listar" class="side-nav-link-ref">Listar</Link>
            </li>
            <li>
              <Link to="especialidad-registrar" key="t-especialidad-registrar" class="side-nav-link-ref">Registrar</Link>
            </li>
            <li>
              <Link to="especialidad-agregar-psicologos" key="t-especialidad-agregar-psicologos" class="side-nav-link-ref">Agregar a Psicologos</Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("horario")}>
            <i class="bx bx-message-square-dots" />
            <span key="t-horario">Horarios</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'horario'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="horario" key="t-horario-gestionar" class="side-nav-link-ref">Gestionar</Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("citas")}>
            <i class="bx bx-message-square-dots" />
            <span key="t-citas">Citas</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'citas'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="citas" key="t-citas-listar" class="side-nav-link-ref">Listar</Link>
            </li>
          </ul>
        </li>

        <!--li>
          <a
            href={null}
            class="has-arrow waves-effect"
            on:click={() => changeClassAttribute("metodologia")}>
            <i class="bx bx-message-square-dots" />
            <span key="t-metodologia">Metodologias</span>
          </a>
          <ul
            class="sub-menu mm-collapse {current == 'metodologia'
              ? 'mm-show'
              : ''}"
            aria-expanded="false">
            <li>
              <Link to="metodologia" key="t-metodologia-listar" class="side-nav-link-ref">Listar metodologias</Link>
            </li>
            <li>
              <Link to="metodologia-registrar" key="t-metodologia-registrar" class="side-nav-link-ref">Registrar metodologia</Link>
            </li>
            <li>
              <Link to="grado" key="t-grado-listar" class="side-nav-link-ref">Listar Grados</Link>
            </li>
            <li>
              <Link to="grado-registrar" key="t-grado-registrar" class="side-nav-link-ref">Registrar Grado</Link>
            </li>
            <li>
              <Link to="seccion" key="t-seccion-listar" class="side-nav-link-ref">Listar Secciones</Link>
            </li>
            <li>
              <Link to="seccion-registrar" key="t-seccion-registrar" class="side-nav-link-ref">Registrar Seccion</Link>
            </li>
          </ul>
        </li-->

      </ul>
    </div>
    <!-- Sidebar -->
  </div>
</div>
<!-- Left Sidebar End -->