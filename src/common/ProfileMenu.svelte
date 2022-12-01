<script>
	import { _ } from 'svelte-i18n';
	import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'sveltestrap';
	import { user_storage } from '../helpers/store';
	//import { auth } from '../helpers/firebase';
	import { navigate } from 'svelte-routing';

	if(!(localStorage.getItem("login") ?? false)){
		navigate('/login');
	}

	
	let user = JSON.parse(localStorage.getItem("user"))

	const handleLogOut = () => {
		localStorage.setItem("login",false);
		localStorage.removeItem("user");
		navigate('/login');
	};
</script>

<Dropdown class="dropdown d-inline-block">
	<DropdownToggle class="btn header-item headerbtn" id="page-header-user-dropdown" tag="button" color="">
		<img class="rounded-circle header-profile-user" src="/assets/images/users/avatar-6.jpg" alt="Header Avatar" />
		<span class="d-none d-xl-inline-block ms-1"> {user.user.firstName} {user.user.lastName}</span>
		<i class="mdi mdi-chevron-down d-none d-xl-inline-block" />
	</DropdownToggle>

	<DropdownMenu class="dropdown-menu-end">
		<h6 class="dropdown-header">Bienvenido</h6>
		<!--DropdownItem tag="a" href={'/'}
			><i class="mdi mdi-account-circle text-muted font-size-16 align-middle me-1" />
			<span class="align-middle" key="t-profile">{$_('navbar.dropdown.henry.list.profile')}</span>
		</DropdownItem>
		<DropdownItem tag="a" href={'#'}
			><i class="mdi mdi-message-text-outline text-muted font-size-16 align-middle me-1" />
			<span class="align-middle" key="t-messages">{$_('navbar.dropdown.henry.list.mywallet')}</span>
		</DropdownItem>
		<DropdownItem tag="a" href={'#'}
			><i class="mdi mdi-calendar-check-outline text-muted font-size-16 align-middle me-1" />
			<span class="align-middle" key="t-taskboard">{$_('navbar.dropdown.henry.list.settings')}</span>
		</DropdownItem>
		<DropdownItem tag="a" href={'/'}
			><i class="mdi mdi-lock text-muted font-size-16 align-middle me-1" />
			<span class="align-middle" key="t-lock-screen">{$_('navbar.dropdown.henry.list.lockscreen')}</span>
		</DropdownItem>
		<div class="dropdown-divider" /-->
		<DropdownItem tag="a" on:click={handleLogOut}
			><i class="mdi mdi-logout text-muted font-size-16 align-middle me-1" />
			<span class="align-middle" key="t-logout">Cerrar Sesión</span>
		</DropdownItem>
	</DropdownMenu>
</Dropdown>