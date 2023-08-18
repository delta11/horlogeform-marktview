<script lang='ts'>
    // The ordering of these imports is critical to your app working properly
    import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
    // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    // Most of your app wide CSS should be put in this file
    import '../app.postcss';
    import {autoModeWatcher, LightSwitch, storePopup} from "@skeletonlabs/skeleton";
    // Used for skeleton popup
    import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
    import WhatIsSite from "./WhatIsSite.svelte";

    storePopup.set({computePosition, autoUpdate, offset, shift, flip, arrow});
</script>

<svelte:head>
    <title>Horlogeforum.nl - marktview</title>
    {@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>
<LightSwitch class="float-right mr-2 mt-2"/>
<h2 class="text-2xl font-bold leading-7 dark:text-white text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight md:mb-5 mb-3 pl-1">
    <a href="https://www.horlogeforum.nl/c/horlogemarkt/12" target="_blank">Horlogeforum.nl - Horlogemarkt</a>
</h2>
<WhatIsSite></WhatIsSite>
<div class="md:mb-5 mb-3 pl-1">
    <slot/>
</div>
