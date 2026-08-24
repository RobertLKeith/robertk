<script>
  import { onMount } from "svelte";

  const imageModules = import.meta.glob("/src/assets/onset/*.{jpg,JPG,jpeg,JPEG,png,PNG}", { eager: true, import: "default" });
  const order = [
    "Mr. Cash",
    "Captiva Island",
    "DSC09290",
    "2A7A6239",
    "IMG_3181",
    "IMG_0006",
    "IMG_8863",
    "358361098_10112657669480858_818895361522870702_n",
    "743768",
    "2A7A4215",
    "IMG_7235"
  ];
  const byName = new Map(Object.entries(imageModules).map(([path, src]) => [
    path.split("/").pop().replace(/\.[^.]+$/i, ""), src
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
  const initialCount = 9;
  const batchSize = 8;

  let images = [...sourceImages];
  let visibleCount = Math.min(initialCount, images.length);
  let selectedIndex = null;
  let touchStartX = 0;
  let galleryWidth = 0;
  let resizeTimer = null;
  let galleryEl = null;

  $: visibleImages = images.slice(0, visibleCount);
  $: hasMore = visibleCount < images.length;
  $: rows = buildRows(visibleImages, galleryWidth);

  function loadMore() {
    visibleCount = Math.min(visibleCount + batchSize, images.length);
  }

  function buildRows(items, width) {
    if (!width || width < 320) return [];
    const perRowMax = 3;
    const gap = width < 800 ? 7 : 12;
    const tile = Math.round((width - (perRowMax - 1) * gap) / perRowMax);

    const ready = items.map((item, index) => ({ ...item, index }));
    const rows = [];
    for (let i = 0; i < ready.length; i += perRowMax) {
      rows.push({
        gap,
        items: ready.slice(i, i + perRowMax).map((item) => ({ ...item, width: tile, height: tile }))
      });
    }
    return rows;
  }

  function open(index) { selectedIndex = index; document.body.style.overflow = "hidden"; }
  function close() { selectedIndex = null; document.body.style.overflow = ""; }
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
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      galleryWidth = galleryEl?.getBoundingClientRect().width || 0;
    }, 120);
  }

  onMount(() => {
    galleryWidth = galleryEl?.getBoundingClientRect().width || 0;
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  });
</script>

<section class="gallery gallery-squares" bind:this={galleryEl} aria-label="On set gallery">
  {#each rows as row}
    <div class="gallery-row" style={`gap:${row.gap}px;margin-bottom:${row.gap}px`}>
      {#each row.items as image}
        <button class="image-wrapper" style={`width:${image.width}px;height:${image.height}px`} on:click={() => open(image.index)} data-reveal aria-label={`Open on set photo ${image.index + 1}`}>
          <img src={image.src} alt="Robert Keith on set" loading="lazy" decoding="async" />
          <span class="overlay"><em>View photo ↗</em></span>
        </button>
      {/each}
    </div>
  {/each}
</section>

{#if hasMore}
  <div class="gallery-more">
    <button type="button" on:click={loadMore}>Load more photos</button>
    <p>{visibleCount} of {images.length}</p>
  </div>
{/if}

{#if selectedIndex !== null}
  <div class="lightbox" role="dialog" aria-modal="true" aria-label="On set photo viewer" tabindex="-1" on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
    <button class="lightbox-backdrop" on:click={close} aria-label="Close photo viewer"></button>
    <button class="lightbox-close" on:click|stopPropagation={close}>Close</button>
    <img src={images[selectedIndex].src} alt="Robert Keith on set, full size" decoding="async" />
    <button class="nav left" on:click|stopPropagation={prev} aria-label="Previous photo">‹</button>
    <button class="nav right" on:click|stopPropagation={next} aria-label="Next photo">›</button>
  </div>
{/if}