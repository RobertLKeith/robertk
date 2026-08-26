<script>
import {onMount} from "svelte"; import Seo from "./components/Seo.svelte"; import Loader from "./components/Loader.svelte"; import Hero from "./components/Hero.svelte"; import Gallery from "./components/Gallery.svelte"; import GalleryOnSet from "./components/GalleryOnSet.svelte"; import Showreel from "./components/Showreel.svelte"; import Credits from "./components/Credits.svelte"; import Testimonials from "./components/Testimonials.svelte"; import {profile,agency,showreels,seo} from "./data/profile"; import {credits} from "./data/credits"; import {testimonials} from "./data/testimonials";
import eamLogo from "./assets/other/EAM.png";
const resumeModules=import.meta.glob(["./assets/resume/*","!./assets/resume/.*"],{eager:true,query:"?url",import:"default"});
const resumePath=Object.keys(resumeModules).sort()[0];
const resumeUrl=resumePath ? resumeModules[resumePath] : null;
const resumeFilename=resumePath ? resumePath.split("/").pop() : null;
const heroModules=import.meta.glob("./assets/hero/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP,avif,AVIF}",{eager:true,import:"default"});
const preferredHeroPath=Object.keys(heroModules).find(path=>/\/main\.(jpe?g|png)$/i.test(path));
const heroImage=(preferredHeroPath ? heroModules[preferredHeroPath] : Object.values(heroModules)[0])||null;
const availableReels=showreels.filter(reel=>reel?.embedUrl?.trim());
const currentYear=new Date().getFullYear();
let loading=true;
onMount(()=>{
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  }),{threshold:.05});

  const observeReveals=root=>{
    if(root.nodeType!==Node.ELEMENT_NODE)return;
    if(root.matches("[data-reveal]"))revealObserver.observe(root);
    root.querySelectorAll("[data-reveal]").forEach(element=>revealObserver.observe(element));
  };

  observeReveals(document.documentElement);
  const domObserver=new MutationObserver(records=>records.forEach(record=>{
    record.addedNodes.forEach(observeReveals);
  }));
  domObserver.observe(document.body,{childList:true,subtree:true});

  return()=>{
    domObserver.disconnect();
    revealObserver.disconnect();
  };
});
</script>
<svelte:head>{#if heroImage}<link rel="preload" as="image" href={heroImage} fetchpriority="high" />{/if}</svelte:head>
<Seo {seo} {profile}/>{#if loading}<Loader on:complete={()=>loading=false}/>{/if}<Hero {profile} {agency} {heroImage} {resumeUrl} {resumeFilename} hasShowreels={availableReels.length > 0}/><main>
{#if availableReels.length}<section id="showreel" class="section"><div class="container"><header class="section-head" data-reveal><div><p class="eyebrow">Selected work</p><h2>Showreel</h2></div><p>Robert Keith<br>Acting Reels</p></header><Showreel reels={availableReels} fallbackPoster={heroImage}/></div></section>{/if}
<section id="portraits" class="section dark"><div class="container"><header class="section-head" data-reveal><div><p class="eyebrow">Selected photography</p><h2>Portraits</h2></div><p>Headshots and<br>portraits.</p></header><Gallery/></div></section>
<section id="credits" class="section"><div class="container"><header class="section-head" data-reveal><div><p class="eyebrow">Résumé</p><h2>Credits</h2></div></header><Credits {credits}/><div class="link-row" data-reveal>{#if resumeUrl}<a href={resumeUrl} download={resumeFilename}>Download full resume ↓</a>{/if}<a href={profile.imdbUrl} target="_blank" rel="noopener noreferrer">IMDb ↗</a><a href={profile.actorsAccessUrl} target="_blank" rel="noopener noreferrer">Actors Access ↗</a></div></div></section>
<section id="onset" class="section dark"><div class="container"><header class="section-head" data-reveal><div><p class="eyebrow">Behind the scenes</p><h2>On Set</h2></div><p>Production stills and<br>behind the scenes imagery.</p></header><GalleryOnSet/></div></section>
{#if testimonials.length}<section id="testimonials" class="section testimonials-section"><div class="container"><header class="section-head" data-reveal><div><p class="eyebrow">In their words</p><h2>Testimonials</h2></div><p>Directors and collaborators<br>on working with Robert.</p></header><Testimonials {testimonials}/></div></section>{/if}
<section id="about" class="section about"><div class="container"><header class="section-head" data-reveal><div><p class="eyebrow">About</p><h2>Robert<br>Keith</h2></div></header><div class="about-grid" data-reveal><div class="about-copy"><p class="lead">Robert Keith is a Texas-born actor with decades of experience in film, television, and stage. Los Angeles-trained and equally at home in contemporary, Western, and character-driven roles, his credits include <em>The Accountant 2</em>, <em>The Mask</em>, <em>Wild Bill</em>, <em>Beverly Hills, 90210</em>, <em>Dr. Quinn, Medicine Woman</em>, and <em>Babylon 5</em>. An accomplished horseman and martial artist, Robert brings a lifetime of professional experience and a genuine passion for the work to every role.</p><p>Born in Fort Worth, Robert Keith is a veteran actor whose career has spanned decades and taken him around the world. Proud to call himself a native Texan, Robert spent many years performing in Southern California, building an extensive body of work in the film industry. During that time, he trained under respected acting coaches James Best, Bobby Hoffman, and Brian Reise, and studied at the Beverly Hills Playhouse with noted director Milton Katselas.</p><p>Robert's film credits include <em>The Accountant 2</em>, <em>The Mask</em>, <em>Wild Orchid II</em>, and <em>Wild Bill</em>, among others. His television work includes appearances on <em>Paradise</em>, <em>The New WKRP</em>, <em>Legend</em>, <em>The Adventures of Brisco County, Jr.</em>, <em>Babylon 5</em>, <em>Beverly Hills, 90210</em>, and <em>Dr. Quinn, Medicine Woman</em>.</p><p>Equally comfortable in contemporary, Western, dramatic, and character-driven roles, Robert brings a commanding presence, natural authority, and lived-in authenticity to his work.</p><p>Today, Robert remains focused on the work that first captured his imagination — acting. Whether on film, television, or stage, he brings the same preparation, professionalism, and genuine love of performing that have defined his career from the beginning.</p></div><dl class="profile-list"><div><dt>Union</dt><dd>{profile.union}</dd></div><div><dt>Based</dt><dd>{profile.location}</dd></div><div><dt>Working</dt><dd>{profile.working}</dd></div><div><dt>Hair / Eyes</dt><dd>{profile.hair} / {profile.eyes}</dd></div><div><dt>Special skills</dt><dd>{profile.skills}</dd></div><div><dt>Casting</dt><dd>{profile.casting}</dd></div></dl></div></div></section>
<section class="profiles"><div class="container"><p class="eyebrow">Professional profiles</p><div>{#if profile.imdbUrl}<a href={profile.imdbUrl} target="_blank" rel="noopener noreferrer">IMDb ↗</a>{/if}{#if profile.actorsAccessUrl}<a href={profile.actorsAccessUrl} target="_blank" rel="noopener noreferrer">Actors Access ↗</a>{/if}{#if profile.instagramUrl}<a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram ↗</a>{/if}{#if profile.facebookUrl}<a href={profile.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook ↗</a>{/if}</div></div></section>
<section id="contact" class="section contact"><div class="container"><p class="eyebrow">Contact</p><h2 data-reveal>Let's Work<br><em>Together</em></h2><p>For casting, production and professional enquiries.</p><div class="direct-contact"><span>Direct enquiries</span><a class="email" href={`mailto:${profile.email}`}>{profile.email}</a></div><div class="representation"><span>Representation</span><div class="representation-details"><img class="representation-logo" src={eamLogo} alt="Established Artists Management" loading="lazy" decoding="async" /><strong>{agency.name}</strong><p>{agency.representative}</p><p>{agency.address}</p><div class="representation-links"><a href={`mailto:${agency.email}`}>{agency.email}</a><a href={`tel:${agency.office.replaceAll("-","")}`}>Office {agency.office}</a><a href={`tel:${agency.mobile.replaceAll("-","")}`}>Mobile {agency.mobile}</a></div></div></div></div></section></main>
<footer><div class="container footer-top"><div><strong>Robert Keith</strong><span>Actor</span></div><nav>{#if profile.imdbUrl}<a href={profile.imdbUrl} target="_blank" rel="noopener noreferrer">IMDb ↗</a>{/if}{#if profile.actorsAccessUrl}<a href={profile.actorsAccessUrl} target="_blank" rel="noopener noreferrer">Actors Access ↗</a>{/if}{#if profile.instagramUrl}<a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram ↗</a>{/if}{#if profile.facebookUrl}<a href={profile.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook ↗</a>{/if}</nav><div>{#if resumeUrl}<a href={resumeUrl} download={resumeFilename}>Resume ↓</a>{/if}<a href="#top">Back to top ↑</a></div></div><div class="container footer-bottom"><span>© {currentYear} Robert Keith</span><a href="https://sanrokuku.com" target="_blank" rel="noopener noreferrer">Website by San Roku Ku</a></div></footer>
