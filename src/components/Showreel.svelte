<script>
  import { onMount } from "svelte";

  export let reels = [];
  export let fallbackPoster = "";
  let playing = {};

  function toEmbed(url) {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) return `https://www.youtube-nocookie.com/embed/${parsed.pathname.replace("/", "")}?autoplay=1`;
      if (parsed.hostname.includes("youtube.com")) {
        const id = parsed.searchParams.get("v") || parsed.pathname.split("/embed/")[1];
        return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` : "";
      }
      if (parsed.hostname.includes("vimeo.com")) {
        const id = parsed.pathname.split("/").filter(Boolean).pop();
        return /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}?autoplay=1` : url;
      }
      return url;
    } catch { return ""; }
  }

  function closeReel() {
    playing = {};
  }

  function handleKey(event) {
    if (Object.keys(playing).length === 0) return;
    if (event.key === "Escape") closeReel();
  }

  onMount(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  $: availableReels = reels
    .filter(reel => reel?.embedUrl?.trim())
    .map(reel => ({ ...reel, src: toEmbed(reel.embedUrl) }))
    .filter(reel => reel.src);

  $: activeIndex = Object.keys(playing).length > 0 ? parseInt(Object.keys(playing)[0]) : null;
</script>

<div class:single={availableReels.length === 1} class="showreels">
  {#each availableReels as reel, index}
    <article class="showreel-wrap" data-reveal>
      <p>{reel.title || `Reel ${index + 1}`}</p>
      <div class="frame">
        <button class="reel-poster" type="button" on:click={() => playing = {...playing, [index]: true}} aria-label={`Play ${reel.title || `reel ${index + 1}`}`}>
          {#if reel.thumbnail || fallbackPoster}<img src={reel.thumbnail || fallbackPoster} alt="" loading="lazy" decoding="async" />{/if}
          <span class="reel-poster-shade"></span><span class="reel-play"><b>Play reel</b><i>▶</i></span>
        </button>
      </div>
    </article>
  {/each}
</div>

{#if activeIndex !== null}
  <div class="reel-fullscreen" role="dialog" aria-modal="true" aria-label="Video player">
    <button class="reel-backdrop" on:click={closeReel} aria-label="Close video"></button>
    <div class="reel-player">
      <button class="reel-close" on:click={closeReel} aria-label="Close">Close</button>
      <iframe src={availableReels[activeIndex].src} title={availableReels[activeIndex].title || `Robert Keith reel`} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  </div>
{/if}
