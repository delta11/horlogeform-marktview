import { c as create_ssr_component, a as subscribe, f as each, b as add_attribute, e as escape } from "../../chunks/index3.js";
import { p as page } from "../../chunks/stores.js";
import "../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="container flex flex-col items-center justify-center"><ul>${each($page.data.watches, (watch) => {
    return `<li><a target="_blank"${add_attribute("href", watch.url, 0)} rel="noreferrer">${escape(watch.name)} (€${escape(watch.price)})
                    <img${add_attribute("src", watch.pictureUrl, 0)} height="100" width="100"></a>
            </li>`;
  })}</ul></div>`;
});
export {
  Page as default
};
