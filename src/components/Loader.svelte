<script>
import { createEventDispatcher, onMount } from "svelte";

const dispatch = createEventDispatcher();
let closing = false;

onMount(() => {
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    requestAnimationFrame(() => {
      closing = true;
      window.setTimeout(() => dispatch("complete"), 320);
    });
  };

  if (document.readyState === "complete") finish();
  else window.addEventListener("load", finish, { once: true });

  const fallback = window.setTimeout(finish, 2500);

  return () => {
    window.removeEventListener("load", finish);
    window.clearTimeout(fallback);
  };
});
</script>

<div class:closing class="loader" role="status" aria-label="Loading Robert Keith website">
  <div class="loader-mark" aria-hidden="true"><span>R</span><i></i><span>K</span></div>
  <div class="loader-name"><span>Robert</span><span>Keith</span></div>
  <div class="loader-footer"><span>Actor</span><div class="loader-track"><i></i></div><span>Film · Television · Stage</span></div>
</div>
