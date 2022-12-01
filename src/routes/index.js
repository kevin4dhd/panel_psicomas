// Authentication related pages
import Login from "../pages/Authentication/Login.svelte";
import Register from "../pages/Authentication/Register.svelte";

// Dashboard
import Dashboard from "../pages/Dashboard/index.svelte";

//Psicologos
import Psicologo from "../pages/Psicologo/index.svelte";
import PsicologosRegistrar from "../pages/Psicologo/registrar.svelte";

//Metodologias
import Metodologia from "../pages/Metodologia/index.svelte";
import MetodologiaRegistrar from "../pages/Metodologia/registrar.svelte";

//Especialidades
import Especialidades from "../pages/Especialidad/index.svelte";
import EspecialidadesRegistrar from "../pages/Especialidad/registrar.svelte";
import EspecialidadesAgregar from "../pages/Especialidad/agregar.svelte";

import Horario from "../pages/Horario/index.svelte";

const authProtectedRoutes = [
  { path: "/", component: Dashboard },
  { path: "/index", component: Dashboard },
  { path: "/dashboard", component: Dashboard },

  { path: "/psicologo", component: Psicologo },
  { path: "/psicologo-registrar", component: PsicologosRegistrar },
  { path: "/psicologo-actualizar/:id", component: PsicologosRegistrar },

  { path: "/metodologia", component: Metodologia },
  { path: "/metodologia-registrar", component: MetodologiaRegistrar },
  { path: "/metodologia-actualizar/:id", component: MetodologiaRegistrar },

  { path: "/especialidad", component: Especialidades },
  { path: "/especialidad-registrar", component: EspecialidadesRegistrar },
  { path: "/especialidad-actualizar/:id", component: EspecialidadesRegistrar },
  { path: "/especialidad-agregar-psicologos", component: EspecialidadesAgregar },

  { path: "/horario", component: Horario },

  /*{ path: "/matricula", component: Matricula },
  { path: "/matricula-registrar", component: MatriculaRegistrar },
  { path: "/matricula-actualizar/:id", component: MatriculaRegistrar },

  { path: "/asistencia", component: Asistencia },
  { path: "/asistencia-gestionar", component: AsistenciaGestionar },
  { path: "/asistencia-actualizar/:id", component: AsistenciaGestionar },

  { path: "/tarjeta", component: Tarjeta },

  { path: "/aula", component: Aula },
  { path: "/aula-registrar", component: AulaRegistrar },
  { path: "/aula-actualizar/:id", component: AulaRegistrar },
  { path: "/nivel", component: Nivel },
  { path: "/nivel-registrar", component: NivelRegistrar },
  { path: "/nivel-actualizar/:id", component: NivelRegistrar },
  { path: "/grado", component: Grado },
  { path: "/grado-registrar", component: GradoRegistrar },
  { path: "/grado-actualizar/:id", component: GradoRegistrar },
  { path: "/seccion", component: Seccion },
  { path: "/seccion-registrar", component: SeccionRegistrar },
  { path: "/seccion-actualizar/:id", component: SeccionRegistrar },*/

];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const MOCK_DATA = {
  authProtectedRoutes,
  publicRoutes,
};

export default MOCK_DATA;