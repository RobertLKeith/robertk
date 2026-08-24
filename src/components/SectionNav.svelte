<script>
  import { onMount } from "svelte";

  export let showTestimonials = false;
  let active = "top";
  let hasScrolled = false;

  $: links = [
    { id: "top", label: "Home" },
    { id: "showreel", label: "Showreel" },
    { id: "headshots", label: "Stills" },
    { id: "credits", label: "Credits" },
    ...(showTestimonials ? [{ id: "testimonials", label: "Words" }] : []),
    { id: "contact", label: "Contact" }
  ];

  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  onMount(() => {
    const sections = links.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const update = () => {
      hasScrolled = window.scrollY > 240;
      const marker = window.innerHeight * 0.38;
      let current = "top";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      }
      active = current;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  });
</script>

<nav class:visible={hasScrolled} class="section-nav" aria-label="Page sections">
  <ol>
    {#each links as link, index}
      <li class:active={active === link.id}>
        <button type="button" aria-current={active === link.id ? "location" : undefined} on:click={() => goTo(link.id)}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>{link.label}</b>
        </button>
      </li>
    {/each}
  </ol>
  <button class="to-top" type="button" on:click={() => goTo("top")} aria-label="Scroll to top">
    <span>Top</span><b aria-hidden="true">↑</b>
  </button>
</nav>
