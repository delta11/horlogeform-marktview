<script lang="ts">
    import { page } from '$app/stores';
    import {json} from "@sveltejs/kit";
</script>

<div class="container flex flex-col items-center justify-center">
    <ul>
        {#each $page.data.watches as watch}
            <li>
                <a target="_blank" href="{watch.url}" rel="noreferrer">
                    {watch.name} (€{watch.price})
                    <img src="{watch.pictureUrl}" height="100" width="100"/>
                </a>
            </li>
        {/each}
    </ul>
</div>
