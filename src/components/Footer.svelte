<script>
  export let profile;

  function shareProfile() {
    // Guard for SSR/build environments
    if (typeof window === "undefined") return;

    const url = window.location.href;

    const name = (profile && profile.name) ? profile.name : "Actor";
    const title = `${name} | Actor Profile`;
    const text = "View showreel, headshots, credits, and contact.";

    // Prefer native share if available
    if (navigator && typeof navigator.share === "function") {
      navigator
        .share({ title, text, url })
        .catch(() => {
          // user cancelled or share failed, do nothing
        });
      return;
    }

    // Fallback: email share
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${text}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
</script>

<footer class="footer">
  <div class="container inner">
    <div class="left">
      <p class="name">{profile?.name || "Actor"}</p>
      <p class="muted">Actor · {profile?.location || "London, UK"}</p>
      <p class="design-credit">
  Design by 
  <a href="https://sanrokuku.com" target="_blank" rel="noopener noreferrer">
    San Roku Ku
  </a>
</p>
    </div>

    <nav class="nav" aria-label="Footer navigation">
      <a href="#showreel">Showreel</a>
      <a href="#headshots">Headshots</a>
      <a href="#credits">Credits</a>
      <a href="#contact">Contact</a>
    </nav>

    <div class="right">
      {#if profile?.spotlightUrl}
        <a class="pill" href={profile.spotlightUrl} target="_blank" rel="noreferrer">Spotlight</a>
      {/if}
      {#if profile?.imdbUrl}
        <a class="pill" href={profile.imdbUrl} target="_blank" rel="noreferrer">IMDb</a>
      {/if}

      <a class="pill" href="/cv.pdf" download>CV</a>

  <button
  type="button"
  class="pill"
  on:click={shareProfile}
  aria-label="Share this profile"
>
  Share Profile
</button>
    </div>
  </div>
</footer>
