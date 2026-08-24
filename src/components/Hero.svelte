<script>
import {onMount} from "svelte";
export let profile;
export let heroImage;
export let resumeUrl;
export let hasShowreels=true;
let menuOpen=false;
let navElement;

onMount(()=>{
  const closeOutside=event=>{
    if(menuOpen && navElement && !navElement.contains(event.target))menuOpen=false;
  };
  const closeOnEscape=event=>{
    if(event.key==="Escape")menuOpen=false;
  };
  document.addEventListener("pointerdown",closeOutside);
  document.addEventListener("keydown",closeOnEscape);
  return()=>{
    document.removeEventListener("pointerdown",closeOutside);
    document.removeEventListener("keydown",closeOnEscape);
  };
});
</script>
<header class="hero" id="top"><nav bind:this={navElement} class="hero-nav container" aria-label="Primary navigation"><a class="wordmark" href="#top">Robert Keith</a><button class="menu-button" aria-expanded={menuOpen} on:click={()=>menuOpen=!menuOpen}>{menuOpen?"Close":"Menu"}</button><div class:open={menuOpen} class="nav-links">{#if hasShowreels}<a href="#showreel">Showreel</a>{/if}<a href="#portraits">Portraits</a><a href="#credits">Credits</a><a href="#testimonials">Testimonials</a><a href="#about">About</a><a href="#contact">Contact</a></div><a class="resume-link" href={resumeUrl} download="Robert Keith Resume.doc">Download Resume ↓</a></nav>
<div class="hero-image-wrap">{#if heroImage}<img class="hero-img" src={heroImage} alt="Robert Keith, professional film, television and stage actor" />{/if}<div class="hero-shade"></div></div>
<div class="container hero-inner"><div class="hero-copy"><p class="eyebrow">Actor</p><h1>Robert<br><em>Keith</em></h1><div class="hero-credentials"><span>{profile.union}</span><span>Film · Television · Stage</span></div><div class="hero-actions">{#if hasShowreels}<a href="#showreel">Watch reel ↘</a>{/if}<a href="#credits">View credits ↘</a></div><a class="hero-download" href={resumeUrl} download="Robert Keith Resume.doc">Download resume ↓</a></div><p class="hero-location">Los Angeles <i></i> Texas</p></div></header>
