<script lang="ts">
    import {page} from '$app/stores';
    import type {PopupSettings} from '@skeletonlabs/skeleton';
    import {popup} from "@skeletonlabs/skeleton";

    const watches = $page.data.watches.map(watch => {

        const popupSettings: PopupSettings = {
            event: 'hover',
            target: `popupHover-${watch.name}`,
            middleware: {
                // https://floating-ui.com/docs/offset
                offset: -300, // or { ... }

                // https://floating-ui.com/docs/shift
                // shift: { ... },
            }
        };
        return {...watch, popupSettings}
    })
</script>

<style lang="scss">
  .watch-image {
    max-width: 280px;
    max-height: 300px;
  }
</style>

<div class="grid 2xl:grid-cols-13 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 md:gap-6 gap-4">
    {#each watches as watch}
        <a target="_blank" href="{watch.url}" rel="noreferrer" class="card card-hover p-4 w-80">
            <header class="card-header flex justify-between">
                <span>{watch.name}</span>
                {#if watch.price != '-'}
                    <span>(€{watch.price})</span>
                {/if}
            </header>
            <section class="p-4">
                <div class="[&>*]:pointer-events-none" use:popup={watch.popupSettings}>
                    <img src="{watch.pictureUrl}" class="watch-image" loading="lazy"
                         alt="Picture for {watch.name}"/>
                    <div class="card p-4 variant-filled-secondary" data-popup="{watch.popupSettings.target}">
                        <img src="{watch.pictureUrl}" class="max-w-xl max-h-l" alt="Picture for {watch.name}"/>
                    </div>
                </div>

            </section>
        </a>
    {/each}
</div>
