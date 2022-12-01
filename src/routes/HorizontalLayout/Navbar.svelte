<script>
	import { Link } from 'svelte-routing';
	import { onDestroy, onMount } from 'svelte'
	import { globalHistory } from 'svelte-routing/src/history';

	import { _ } from 'svelte-i18n';

	export let show;

	let pathname = window.location.pathname;
    let unsub;

    onMount(() => {
        unsub = globalHistory.listen(({ location, action }) => {
            pathname = location.pathname;
        });

		let matchingMenuItem = null

		const ul1 = document.getElementById("navigation")
		
		if(ul1.getElementsByTagName("a").length > 0){

		const items1 = ul1.getElementsByTagName("a")
		
		for (let i = 0; i < items1.length; ++i) {
			
		  if (pathname === items1[i].pathname) {

			matchingMenuItem = items1[i]
			break

		  }
		}
		if (matchingMenuItem) {
		  activateParentDropdown(matchingMenuItem)
		}
		}
    });

    onDestroy(() => {
        unsub();
    });

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

	const activateParentDropdown = item => {
		item.classList.add("active")
		const parent = item.parentElement
		
		if (item) {
		  parent.classList.add("active") // li
		  const parent2 = parent.parentElement
		  parent2.classList.add("active") // li
		  const parent3 = parent2.parentElement
		  if (parent3) {
			parent3.classList.add("active") // li
			const parent4 = parent3.parentElement
			if (parent4) {
			  parent4.classList.add("active") // li
			  const parent5 = parent4.parentElement
			  if (parent5) {
				parent5.classList.add("active") // li
				const parent6 = parent5.parentElement
				if (parent6) {
				  parent6.classList.add("active") // li
				}
			  }
			}
		  }
		}
		return false
	}

</script>

<div class="topnav">
	<div class="container-fluid">
		<nav class="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">

			<div class="collapse navbar-collapse {show === true ? 'show' : ''}" id="topnav-menu-content">
				<ul class="navbar-nav">

					<li class="nav-item dropdown">
						<Link class="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-dashboard" role="button" on:click={() => changeClassAttribute("dashboards")}>
							<i class="bx bx-home-circle me-2"></i><span key="t-dashboards">{$_("menuitems.dashboards.text")}</span> <div class="arrow-down"></div>
						</Link>
						<div class="dropdown-menu {current == 'dashboards'
						? 'show'
						: ''}" aria-labelledby="topnav-dashboard">

							<Link to="/index" class="dropdown-item" key="t-default">{$_("menuitems.dashboards.list.default")}</Link>
							<Link to="/" class="dropdown-item" key="t-saas">{$_("menuitems.dashboards.list.saas")}</Link>
							<Link to="/" class="dropdown-item" key="t-crypto">{$_("menuitems.dashboards.list.crypto")}</Link>
							<Link to="/" class="dropdown-item" key="t-blog">{$_("menuitems.dashboards.list.blog")}</Link>
							<Link to="/" class="dropdown-item" key="t-jobs">{$_("menuitems.dashboards.list.jobs")}</Link>
						</div>
					</li>

					<li class="nav-item dropdown">
						<Link class="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-uielement" role="button" on:click={() => changeClassAttribute("uielements")}>
							<i class="bx bx-tone me-2"></i>
							<span key="t-ui-elements"> {$_("menuitems.uielements.text")}</span> 
							<div class="arrow-down"></div>
						</Link>

						<div class="dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl {current === 'uielements'
						? 'show'
						: ''}"
							aria-labelledby="topnav-uielement">
							<div class="row">
								<div class="col-lg-4">
									<div>
										<Link to="/" class="dropdown-item" key="t-alerts">{$_("menuitems.uielements.list.alerts")}</Link>
										<Link to="/" class="dropdown-item" key="t-buttons">{$_("menuitems.uielements.list.buttons")}</Link>
										<Link to="/" class="dropdown-item" key="t-cards">{$_("menuitems.uielements.list.cards")}</Link>
										<Link to="/" class="dropdown-item" key="t-carousel">{$_("menuitems.uielements.list.carousel")}</Link>
										<Link to="/" class="dropdown-item" key="t-dropdowns">{$_("menuitems.uielements.list.dropdowns")}</Link>
										<Link to="/" class="dropdown-item" key="t-offcanvas">{$_("menuitems.uielements.list.offcanvas")}</Link>
										<Link to="/" class="dropdown-item" key="t-grid">{$_("menuitems.uielements.list.grid")}</Link>
									</div>
								</div>
								<div class="col-lg-4">
									<div>
										<Link to="/" class="dropdown-item" key="t-grid">{$_("menuitems.uielements.list.placeholders")}</Link>
										<Link to="/" class="dropdown-item" key="t-images">{$_("menuitems.uielements.list.images")}</Link>
										<Link to="/" class="dropdown-item" key="t-modals">{$_("menuitems.uielements.list.modals")}</Link>
										<Link to="/" class="dropdown-item" key="t-range-slider">{$_("menuitems.uielements.list.rangeslider")}</Link>
										<Link to="/" class="dropdown-item" key="t-session-timeout">{$_("menuitems.uielements.list.session-timeout")}</Link>
										<Link to="/" class="dropdown-item" key="t-progress-bars">{$_("menuitems.uielements.list.progressbar")}</Link>
										<Link to="/" class="dropdown-item" key="t-sweet-alert">{$_("menuitems.uielements.list.sweetalert")}</Link>
									</div>
								</div>
								<div class="col-lg-4">
									<div>
										<Link to="/" class="dropdown-item" key="t-grid">{$_("menuitems.uielements.list.utility")}</Link>
										<Link to="/" class="dropdown-item" key="t-tabs-accordions">{$_("menuitems.uielements.list.tabs")}</Link>
										<Link to="/" class="dropdown-item" key="t-typography">{$_("menuitems.uielements.list.typography")}</Link>
										<Link to="/" class="dropdown-item" key="t-video">{$_("menuitems.uielements.list.video")}</Link>
										<Link to="/" class="dropdown-item" key="t-general">{$_("menuitems.uielements.list.general")}</Link>
										<Link to="/" class="dropdown-item" key="t-colors">{$_("menuitems.uielements.list.colors")}</Link>
										<Link to="/" class="dropdown-item" key="t-toast">{$_('menuitems.uielements.list.toast')}</Link>
									</div>
								</div>
							</div>

						</div>
					</li>

					<li class="nav-item dropdown">
						<Link class="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-pages" role="button" on:click={() => changeClassAttribute("apps")}>
							<i class="bx bx-customize me-2"></i><span key="t-apps">{$_("menuitems.apps.text")}</span> <div class="arrow-down"></div>
						</Link>
						<div class="dropdown-menu {current == "apps" ? "show" : ""}" aria-labelledby="topnav-pages">

							<Link to="/" class="dropdown-item" key="t-calendar">{$_("menuitems.calendar.text")}</Link>
							<Link to="/" class="dropdown-item" key="t-chat">{$_("menuitems.chat.text")}</Link>
							<Link to="/" class="dropdown-item" key="t-file-manager">{$_("menuitems.filemanager.text")}</Link>
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-email"
								on:click={() => changeClassAttribute("apps", "email")}
									role="button">
									<span key="t-email">{$_("menuitems.email.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child == "email" ? "show" : ""}" aria-labelledby="topnav-email">
									<Link to="/" class="dropdown-item" key="t-inbox">{$_("menuitems.email.list.inbox")}</Link>
									<Link to="/" class="dropdown-item" key="t-read-email">{$_("menuitems.email.list.reademail")}</Link>

									<div class="dropdown">
										<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-blog"
											role="button">
											<span key="t-email-templates">{$_("menuitems.email.list.template.text")}</span> <div class="arrow-down"></div>
										</Link>
										<div class="dropdown-menu" aria-labelledby="topnav-blog">
											<Link to="/" class="dropdown-item" key="t-basic-action">{$_("menuitems.email.list.template.list.basic")}</Link>
											<Link to="/" class="dropdown-item" key="t-alert-email">{$_("menuitems.email.list.template.list.alert")}</Link>
											<Link to="/" class="dropdown-item" key="t-bill-email">{$_("menuitems.email.list.template.list.billing")}</Link>
										</div>
									</div>
								</div>
							</div>
				
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-ecommerce"
								on:click={() => changeClassAttribute("apps", "ecommerce")}
									role="button">
									<span key="t-ecommerce">{$_("menuitems.ecommerce.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child == "ecommerce" ? "show" : ""}" aria-labelledby="topnav-ecommerce">
									<Link to="/" class="dropdown-item" key="t-products">{$_("menuitems.ecommerce.list.products")}</Link>
									<Link to="/" class="dropdown-item" key="t-product-detail">{$_("menuitems.ecommerce.list.productdetail")}</Link>
									<Link to="/" class="dropdown-item" key="t-orders">{$_("menuitems.ecommerce.list.orders")}</Link>
									<Link to="/" class="dropdown-item" key="t-customers">{$_("menuitems.ecommerce.list.customers")}</Link>
									<Link to="/" class="dropdown-item" key="t-cart">{$_("menuitems.ecommerce.list.cart")}</Link>
									<Link to="/" class="dropdown-item" key="t-checkout">{$_("menuitems.ecommerce.list.checkout")}</Link>
									<Link to="/" class="dropdown-item" key="t-shops">{$_("menuitems.ecommerce.list.shops")}</Link>
									<Link to="/" class="dropdown-item" key="t-add-product">{$_("menuitems.ecommerce.list.addproduct")}</Link>
								</div>
							</div>

							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-crypto"
									on:click={() => changeClassAttribute("apps", "crypto")}
									role="button">
									<span key="t-crypto">{$_("menuitems.crypto.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child == "crypto" ? "show" : ""}" aria-labelledby="topnav-crypto">
									<Link to="/" class="dropdown-item" key="t-wallet">{$_("menuitems.crypto.list.wallet")}</Link>
									<Link to="/" class="dropdown-item" key="t-buy">{$_("menuitems.crypto.list.buy/sell")}</Link>
									<Link to="/" class="dropdown-item" key="t-exchange">{$_("menuitems.crypto.list.exchange")}</Link>
									<Link to="/" class="dropdown-item" key="t-lending">{$_("menuitems.crypto.list.lending")}</Link>
									<Link to="/" class="dropdown-item" key="t-orders">{$_("menuitems.crypto.list.orders")}</Link>
									<Link to="/" class="dropdown-item" key="t-kyc">{$_("menuitems.crypto.list.kycapplication")}</Link>
									<Link to="/" class="dropdown-item" key="t-ico">{$_("menuitems.crypto.list.icolanding")}</Link>
								</div>
							</div>
				
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-project"
									on:click={() => changeClassAttribute("apps", "projects")}
									role="button">
									<span key="t-projects">{$_("menuitems.projects.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child == "projects" ? "show" : ""}" aria-labelledby="topnav-project">
									<Link to="/" class="dropdown-item" key="t-p-grid">{$_("menuitems.projects.list.grid")}</Link>
									<Link to="/" class="dropdown-item" key="t-p-list">{$_("menuitems.projects.list.projectlist")}</Link>
									<Link to="/" class="dropdown-item" key="t-p-overview">{$_("menuitems.projects.list.overview")}</Link>
									<Link to="/" class="dropdown-item" key="t-create-new">{$_("menuitems.projects.list.create")}</Link>
								</div>
							</div>
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-task"
									on:click={() => changeClassAttribute("apps", "tasks")}
									role="button">
									<span key="t-tasks">{$_("menuitems.tasks.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child == "tasks" ? "show" : ""}" aria-labelledby="topnav-task">
									<Link to="/" class="dropdown-item" key="t-task-list">{$_("menuitems.tasks.list.tasklist")}</Link>
									<Link to="/" class="dropdown-item" key="t-create-task">{$_("menuitems.tasks.list.createtask")}</Link>
								</div>
							</div>
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-contact"
									on:click={() => changeClassAttribute("apps", "contacts")}
									role="button">
									<span key="t-contacts">{$_("menuitems.contacts.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child == "contacts" ? "show" : ""}" aria-labelledby="topnav-contact">
									<Link to="/" class="dropdown-item" key="t-user-grid">{$_("menuitems.contacts.list.usergrid")}</Link>
									<Link to="/" class="dropdown-item" key="t-user-list">{$_("menuitems.contacts.list.userlist")}</Link>
									<Link to="/" class="dropdown-item" key="t-profile">{$_("menuitems.contacts.list.profile")}</Link>
								</div>
							</div>

							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-blog"
									on:click={() => changeClassAttribute("apps", "blog")}
									role="button">
									<span key="t-blog">{$_("menuitems.blog.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child == "blog" ? "show" : ""}" aria-labelledby="topnav-blog">
									<Link to="/" class="dropdown-item" key="t-blog-list">{$_("menuitems.blog.list.bloglist")}</Link>
									<Link to="/" class="dropdown-item" key="t-blog-grid">{$_("menuitems.blog.list.grid")}</Link>
									<Link to="/" class="dropdown-item" key="t-blog-details">{$_("menuitems.blog.list.detail")}</Link>
								</div>
							</div>
						</div>
					</li>

					<li class="nav-item dropdown">
						<Link class="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-components" role="button" on:click={() => changeClassAttribute("components")}>
							<i class="bx bx-collection me-2"></i><span key="t-components">{$_("menuitems.components.text")}</span> <div class="arrow-down"></div>
						</Link>
						<div class="dropdown-menu {current == "components" ? "show" : ""}" aria-labelledby="topnav-components">
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-form" 
									on:click={() => changeClassAttribute("components", "forms")}
									role="button">
									<span key="t-forms">{$_("menuitems.forms.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child === "forms" ? "show" : ""}" aria-labelledby="topnav-form">
									<Link to="/" class="dropdown-item" key="t-form-elements">{$_("menuitems.forms.list.elements")}</Link>
									<Link to="/" class="dropdown-item" key="t-form-layouts">{$_("menuitems.forms.list.layouts")}</Link>
									<Link to="/" class="dropdown-item" key="t-form-advanced">{$_("menuitems.forms.list.advanced")}</Link>
									<Link to="/" class="dropdown-item" key="t-form-editors">{$_("menuitems.forms.list.editor")}</Link>
									<Link to="/" class="dropdown-item" key="t-form-upload">{$_("menuitems.forms.list.fileupload")}</Link>
									<Link to="/" class="dropdown-item" key="t-form-repeater">{$_("menuitems.forms.list.repeater")}</Link>
									<Link to="/" class="dropdown-item" key="t-form-wizard">{$_("menuitems.forms.list.wizard")}</Link>
								</div>
							</div>
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-table"
									role="button" on:click={() => changeClassAttribute("components", "tables")}>
									<span key="t-tables">{$_("menuitems.tables.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child === "tables" ? "show" : ""}" aria-labelledby="topnav-table">
									<Link to="/" class="dropdown-item" key="t-basic-tables">{$_("menuitems.tables.list.basic")}</Link>
									<Link to="/" class="dropdown-item" key="t-data-tables">{$_("menuitems.tables.list.datatable")}</Link>
									<Link to="/" class="dropdown-item" key="t-editable-table">{$_("menuitems.tables.list.editabletable")}</Link>
								</div>
							</div>
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-charts"
									role="button" on:click={() => changeClassAttribute("components", "charts")}>
									<span key="t-charts">{$_("menuitems.charts.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child === "charts" ? "show" : ""}" aria-labelledby="topnav-charts">
									<Link to="/" class="dropdown-item" key="t-apex-charts">{$_("menuitems.charts.list.apex")}</Link>
									<Link to="/" class="dropdown-item" key="t-chartjs-charts">{$_("menuitems.charts.list.chartjs")}</Link>
								</div>
							</div>
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-icons"
									role="button" on:click={() => changeClassAttribute("components", "icons")}>
									<span key="t-icons">{$_("menuitems.icons.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child === "icons" ? "show" : ""}" aria-labelledby="topnav-icons">
									<Link to="/" class="dropdown-item" key="t-boxicons">{$_("menuitems.icons.list.boxicons")}</Link>
									<Link to="/" class="dropdown-item" key="t-material-design">{$_("menuitems.icons.list.materialdesign")}</Link>
									<Link to="/" class="dropdown-item" key="t-dripicons">{$_("menuitems.icons.list.dripicons")}</Link>
									<Link to="/" class="dropdown-item" key="t-font-awesome">{$_("menuitems.icons.list.fontawesome")}</Link>
								</div>
							</div>
						</div>
					</li>

					<li class="nav-item dropdown">
						<Link class="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-more" role="button" on:click={() => changeClassAttribute("pages")}
						>
							<i class="bx bx-file me-2"></i><span key="t-extra-pages">{$_("navbar.dropdown.megamenu.extrapages.title")}</span> <div class="arrow-down"></div>
						</Link>
						<div class="dropdown-menu {current === "pages" ? "show" : ""}" aria-labelledby="topnav-more">
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-invoice"
									on:click={() => changeClassAttribute("pages", "invoice")}
									role="button">
									<span key="t-invoices">{$_("menuitems.invoices.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child === "invoice" ? "show" : ""}" aria-labelledby="topnav-invoice">
									<Link to="/" class="dropdown-item" key="t-invoice-list">{$_("menuitems.invoices.list.invoicelist")}</Link>
									<Link to="/" class="dropdown-item" key="t-invoice-detail">{$_("menuitems.invoices.list.invoicedetail")}</Link>
								</div>
							</div>
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-auth"
									on:click={() => changeClassAttribute("pages", "authentication")}
									role="button">
									<span key="t-authentication">{$_("menuitems.authentication.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child === "authentication" ? "show" : ""}" aria-labelledby="topnav-auth">
									<Link to="/" class="dropdown-item" key="t-login">{$_("menuitems.authentication.list.login")}</Link>
									<Link to="/" class="dropdown-item" key="t-login-2">{$_("menuitems.authentication.list.login-2")}</Link>
									<Link to="/" class="dropdown-item" key="t-register">{$_("menuitems.authentication.list.register")}</Link>
									<Link to="/" class="dropdown-item" key="t-register-2">{$_("menuitems.authentication.list.register-2")}</Link>
									<Link to="/" class="dropdown-item" key="t-recover-password">{$_("menuitems.authentication.list.recoverpwd")}</Link>
									<Link to="/" class="dropdown-item" key="t-recover-password-2">{$_("menuitems.authentication.list.recoverpwd-2")}</Link>
									<Link to="/" class="dropdown-item" key="t-lock-screen">{$_("menuitems.authentication.list.lockscreen")}</Link>
									<Link to="/" class="dropdown-item" key="t-lock-screen-2">{$_("menuitems.authentication.list.lockscreen-2")}</Link>
									<Link to="/" class="dropdown-item" key="t-confirm-mail">{$_("menuitems.authentication.list.confirm-mail")}</Link>
									<Link to="/" class="dropdown-item" key="t-confirm-mail-2">{$_("menuitems.authentication.list.confirm-mail-2")}</Link>
									<Link to="/" class="dropdown-item" key="t-email-verification">{$_("menuitems.authentication.list.verification")}</Link>
									<Link to="/" class="dropdown-item" key="t-email-verification-2">{$_("menuitems.authentication.list.verification-2")}</Link>
									<Link to="/" class="dropdown-item" key="t-two-step-verification">{$_("menuitems.authentication.list.verification-step")}</Link>
									<Link to="/" class="dropdown-item" key="t-two-step-verification-2">{$_("menuitems.authentication.list.verification-step-2")}</Link>
								</div>
							</div>
							<div class="dropdown">
								<Link class="dropdown-item dropdown-toggle arrow-none" to="/#" on:click={() => changeClassAttribute("pages", "utility")} id="topnav-utility"
									role="button">
									<span key="t-utility">{$_("menuitems.utility.text")}</span> <div class="arrow-down"></div>
								</Link>
								<div class="dropdown-menu {current_child === "utility" ? "show" : ""}" aria-labelledby="topnav-utility">
									<Link to="/" class="dropdown-item" key="t-starter-page">{$_("menuitems.utility.list.starter")}</Link>
									<Link to="/" class="dropdown-item" key="t-maintenance">{$_("menuitems.utility.list.maintenance")} </Link>
									<Link to="/" class="dropdown-item" key="t-coming-soon">{$_("navbar.dropdown.megamenu.extrapages.list.comingsoon")}</Link>
									<Link to="/" class="dropdown-item" key="t-timeline">{$_("navbar.dropdown.megamenu.extrapages.list.timeline")}</Link>
									<Link to="/" class="dropdown-item" key="t-faqs">{$_("navbar.dropdown.megamenu.extrapages.list.faqs")}</Link>
									<Link to="/" class="dropdown-item" key="t-pricing">{$_("menuitems.utility.list.pricing")}</Link>
									<Link to="/" class="dropdown-item" key="t-error-404">{$_("menuitems.utility.list.error404")}</Link>
									<Link to="/" class="dropdown-item" key="t-error-500">{$_("menuitems.utility.list.error500")}</Link>
								</div>
							</div>
						</div>
					</li>

				</ul>
			</div>
		</nav>
	</div>
</div><!-- Left Sidebar End -->