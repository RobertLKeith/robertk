<script>
  export let seo;
  export let profile;

  function upsertMeta(selector, attrs){
    let el = document.querySelector(selector);
    if (!el){
      el = document.createElement("meta");
      Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    } else {
      Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k, v));
    }
  }

  function upsertLink(rel, href){
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el){
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  }

  $: {
    if (typeof document !== "undefined"){
      document.title = seo?.title || `${profile?.name || "Actor"} | Showreel, Headshots, Credits`;
      upsertMeta('meta[name="description"]', { name: "description", content: seo?.description || "" });
      upsertLink("canonical", seo?.canonical);

      upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo?.ogTitle || profile?.name || "" });
      upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo?.ogDescription || seo?.description || "" });
      upsertMeta('meta[property="og:url"]', { property: "og:url", content: seo?.canonical || "" });
      upsertMeta('meta[property="og:image"]', { property: "og:image", content: seo?.ogImage || "" });
      upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: "Portrait of actor Robert Keith" });
      upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Robert Keith" });

      upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo?.ogTitle || profile?.name || "" });
      upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo?.ogDescription || seo?.description || "" });
      upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: seo?.ogImage || "" });
      upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: "Portrait of actor Robert Keith" });
    }
  }
</script>
