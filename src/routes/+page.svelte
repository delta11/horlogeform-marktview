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
                offset: (({rects}) => {
                    return (
                        -rects.reference.height / 2 - rects.floating.height / 2
                    );
                })
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
  .watch-card {
    height: 440px;
  }
</style>

<div class="grid place-items-center 2xl:grid-cols-13 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 md:gap-y-6 md:gap-x-8 gap-y-4 gap-x-6">
    {#each watches as watch}
        <a target="_blank" href="{watch.url}" rel="noreferrer" class="card watch-card card-hover p-4 w-80
        underline text-blue-600 hover:text-blue-800 visited:text-purple-600
        dark:text-gray-50 dark:hover:text-gray-200 dark:visited:text-purple-300">
            <header class="card-header max-h-[200px] flex justify-between">
                <span>{watch.name}</span>
                {#if watch.price != '-'}
                    <span>(€{watch.price})</span>
                {/if}
            </header>
            <section class="p-4 h-full flex items-center justify-center">
                <div class="[&>*]:pointer-events-none" use:popup={watch.popupSettings}>
                    <img src="{watch.pictureUrl}" class="watch-image" loading="lazy"
                         alt="Picture for {watch.name}"/>
                    <div class="p-4 variant-filled-secondary h-fit" data-popup="{watch.popupSettings.target}">
                        <img src="{watch.pictureUrl}" class="max-w-xl max-h-l" alt="Picture for {watch.name}"/>
                    </div>
                </div>
            </section>
        </a>
    {/each}
</div>
