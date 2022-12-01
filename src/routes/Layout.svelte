<svelte:head>
	<script src="//unpkg.com/simplebar@latest/dist/simplebar.min.js"></script>
	<script src="//cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.min.js"></script>
</svelte:head>
<script>
  import HorizontalLayout from "../routes/HorizontalLayout/Index.svelte";
  import VerticalLayout from "../routes/VerticalLayout/Index.svelte";

  let layoutType = "vertical";

  let component = layoutType == "vertical" ? VerticalLayout : HorizontalLayout;

  if (layoutType == "horizontal") {
    document.body.setAttribute("data-layout", "horizontal");
  }
</script>

<svelte:component this={component}>
  <slot />
</svelte:component>