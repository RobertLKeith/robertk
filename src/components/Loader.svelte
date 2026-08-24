<script>
import {createEventDispatcher,onMount} from "svelte";

const dispatch=createEventDispatcher();
let closing=false;

onMount(()=>{
  const started=performance.now();
  const minimumDuration=1100;
  let finished=false;

  const finish=()=>{
    if(finished)return;
    finished=true;
    const remaining=Math.max(0,minimumDuration-(performance.now()-started));
    window.setTimeout(()=>{
      closing=true;
      window.setTimeout(()=>dispatch("complete"),700);
    },remaining);
  };

  if(document.readyState==="complete")finish();
  else window.addEventListener("load",finish,{once:true});
  const fallback=window.setTimeout(finish,3500);

  return()=>{
    window.removeEventListener("load",finish);
    window.clearTimeout(fallback);
  };
});
</script>

<div class:closing class="loader" role="status" aria-label="Loading Robert Keith website">
  <div class="loader-mark" aria-hidden="true"><span>R</span><i></i><span>K</span></div>
  <div class="loader-name"><span>Robert</span><span>Keith</span></div>
  <div class="loader-footer"><span>Actor</span><div class="loader-track"><i></i></div><span>Film · Television · Stage</span></div>
</div>
