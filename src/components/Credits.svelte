<script>export let credits=[]; let expanded={}; const previewCount=8;</script>
<div class="credits">
{#each credits as group}{@const open=expanded[group.category]}{@const rows=open?group.items:group.items.slice(0,previewCount)}
<section class="credit-group" data-reveal><header class="credit-group-head"><h3>{group.category}</h3></header>
<div class="credit-table"><div class="credit-labels"><span>{group.columns[0]}</span><span>{group.columns[1]}</span><span>{group.columns[2]}</span></div>
{#each rows as item}<div class="credit-row"><strong>{item[0]}</strong><span>{item[1]}</span><span>{item[2]}</span></div>{/each}
{#if group.items.length>previewCount}<button class="credits-toggle" on:click={()=>expanded={...expanded,[group.category]:!open}}><span>{open?"Show fewer":"View More"}</span><b>{open?"−":"+"}</b></button>{/if}</div></section>{/each}
</div>
