<script>
import {onMount} from "svelte";
export let testimonials=[];
let shuffledTestimonials=[...testimonials];

onMount(()=>{
  const shuffled=[...testimonials];
  for(let index=shuffled.length-1;index>0;index-=1){
    const randomIndex=Math.floor(Math.random()*(index+1));
    [shuffled[index],shuffled[randomIndex]]=[shuffled[randomIndex],shuffled[index]];
  }
  shuffledTestimonials=shuffled;
});
</script>

<div class="testimonials-grid">
  {#each shuffledTestimonials as testimonial}
    <figure class="testimonial" data-reveal>
      <blockquote>“{testimonial.quote}”</blockquote>
      {#if testimonial.name || testimonial.title}<figcaption>
        {#if testimonial.name}<strong>{testimonial.name}</strong>{/if}
        {#if testimonial.title}<span>{testimonial.title}</span>{/if}
      </figcaption>{/if}
    </figure>
  {/each}
</div>
