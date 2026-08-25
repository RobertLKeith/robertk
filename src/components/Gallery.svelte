<script>
  import { onMount, tick } from "svelte";

  const imageModules = import.meta.glob("/src/assets/gallery/*.{jpg,JPG,jpeg,JPEG,png,PNG}", { eager: true, import: "default" });
  const order = [
    "Screenshot 2026-06-17 at 11.11.52 AM copy",
    "Robert Keith-1561",
    "Robert Keith-5535_5x7_1500x2100 2",
    "Screenshot 2026-06-17 at 11.06.37 AM",
    "RobertKeith6779 2",
    "Robert Keith-4901_5x7_1500x2100 copy"
  ];
  const normalizeName = name => name.replace(/^\d+\s*[-_.]\s*/, "");
  const byName = new Map(Object.entries(imageModules).map(([path, src]) => [
    normalizeName(path.split("/").pop().replace(/\.[^.]+$/i, "")), src
  ]));
  const sourceImages = order
    .map(name => byName.get(name) ? { name, src: byName.get(name) } : null)
    .filter(Boolean)
    .concat(
      [...byName.entries()]
        .filter(([name]) => !order.includes(name))
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, src]) => ({ name, src }))
    );

  let images = [...sourceImages];
  let selectedIndex = null;
  let touchStartX = 0;
  let dialogEl;
  let opener;

  async function open(index, event) { opener = event.currentTarget; selectedIndex = index; document.body.style.overflow = "hidden"; await tick(); dialogEl?.focus(); }
  function close() { selectedIndex = null; document.body.style.overflow = ""; opener?.focus(); }
  function next() { if (selectedIndex !== null) selectedIndex = (selectedIndex + 1) % images.length; }
  function prev() { if (selectedIndex !== null) selectedIndex = (selectedIndex - 1 + images.length) % images.length; }
  function handleKey(event) {
    if (selectedIndex === null) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  }
  function handleTouchStart(event) { touchStartX = event.touches[0]?.clientX || 0; }
  function handleTouchEnd(event) {
    const distance = (event.changedTouches[0]?.clientX || 0) - touchStartX;
    if (Math.abs(distance) > 45) distance < 0 ? next() : prev();
  }

  onMount(() => {
    window.addEventListener("keydown", handleKey);
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  });
</script>

<section class="gallery" aria-label="Portrait gallery">
  {#each images as image, index}
    <button class="image-wrapper" on:click={(event) => open(index, event)} data-reveal aria-label={`Open portrait ${index + 1}`}>
      <img src={image.src} alt="Portrait of actor Robert Keith" loading="lazy" decoding="async" width="1200" height="1500" />
      <span class="overlay"><em>View portrait ↗</em></span>
    </button>
  {/each}
</section>

{#if selectedIndex !== null}
  <div bind:this={dialogEl} class="lightbox" role="dialog" aria-modal="true" aria-label="Portrait viewer" tabindex="-1" on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
    <button class="lightbox-backdrop" on:click={close} aria-label="Close portrait viewer"></button>
    <button class="lightbox-close" on:click|stopPropagation={close}>Close</button>
    <img src={images[selectedIndex].src} alt="Portrait of actor Robert Keith, full size" decoding="async" />
    <button class="nav left" on:click|stopPropagation={prev} aria-label="Previous portrait">‹</button>
    <button class="nav right" on:click|stopPropagation={next} aria-label="Next portrait">›</button>
  </div>
{/if}
