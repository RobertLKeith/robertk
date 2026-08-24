<script>
  export let agency;
  export let profile;

  const fmtPhone = (p) => (p || "").replace(/\s+/g, " ").trim();

  const hasAgency =
    !!(agency?.name || agency?.agent || agency?.email || agency?.phone || agency?.website);
</script>

<section class="enq">
  <header class="head">
    <!-- <h2 class="title">Enquiries</h2> -->
    <p class="sub">
      For bookings and availability, please contact representation. <br> Direct enquiries are welcome when appropriate.
    </p>
  </header>

  <div class="cols">
    <!-- Representation -->
    <div class="col">
      <div class="kicker">Representation</div>

      {#if hasAgency}
        <div class="primary">
          <div class="name">{agency?.name || "Agency"}</div>
          {#if agency?.agent}
            <div class="meta">Agent: {agency.agent}</div>
          {/if}
        </div>

        <div class="lines">
          {#if agency?.email}
            <div class="line">
              <span class="label">Email</span>
              <a class="value" href={"mailto:" + agency.email}>{agency.email}</a>
            </div>
          {/if}

          {#if agency?.phone}
            <div class="line">
              <span class="label">Phone</span>
              <a class="value" href={"tel:" + agency.phone}>{fmtPhone(agency.phone)}</a>
            </div>
          {/if}

          {#if agency?.website}
            <div class="line">
              <span class="label">Website</span>
              <a class="value" href={agency.website} target="_blank" rel="noreferrer">Visit agency</a>
            </div>
          {/if}

          {#if !agency?.email && !agency?.phone && !agency?.website}
            <p class="empty">Add representation details in <code>src/data/profile.js</code>.</p>
          {/if}
        </div>
      {:else}
        <p class="empty">Add representation details in <code>src/data/profile.js</code>.</p>
      {/if}
    </div>

    <!-- Direct -->
    <div class="col">
      <div class="kicker">Direct enquiries</div>

      <div class="primary">
        <div class="name">Email</div>
        <div class="meta">For press, collaborations, or non-booking enquiries.</div>
      </div>

      {#if profile?.email}
        <div class="lines">
          <div class="line">
            <span class="label">Send</span>
            <a class="value" href={"mailto:" + profile.email}>{profile.email}</a>
          </div>
          <p class="note">Replies are typically within 1 to 2 working days.</p>
        </div>
      {:else}
        <p class="empty">Add <code>profile.email</code> in <code>src/data/profile.js</code>.</p>
      {/if}
    </div>
  </div>
</section>
