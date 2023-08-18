<script lang="ts">
    import type {PopupSettings} from '@skeletonlabs/skeleton';
    import {popup} from "@skeletonlabs/skeleton";

    ;

    const popupClick: PopupSettings = {
        event: 'click',
        target: 'popupClick',
        placement: 'top'
    };
</script>

<span class="ml-2 mb-3 cursor-pointer" use:popup={popupClick}>Wat is deze site?</span>
<div class="card p-4 variant-filled-primary dark:text-white" data-popup="popupClick">
    <p>Een onofficiële alternatieve weergave van
        <a href="https://www.horlogeforum.nl/c/horlogemarkt/12" target="_blank" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600
        dark:text-gray-50 dark:hover:text-gray-200 dark:visited:text-purple-200">
            HorlogeForum.nl
        </a>
        's - Horloge markt
    </p>
    <p>
        Gemaakt door
        <a href="https://www.linkedin.com/in/thomas-van-putten/" target="_blank" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600
        dark:text-gray-50 dark:hover:text-gray-200 dark:visited:text-purple-200">Thomas van Putten</a>.<br/>
        Als klein hobby projectje, code beschikbaar op
        <a href="https://github.com/delta11/horlogeform-marktview" target="_blank" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600
        dark:text-gray-50 dark:hover:text-gray-200 dark:visited:text-purple-200">Github</a>.
    </p>
</div>
