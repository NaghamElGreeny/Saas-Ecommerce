import { getRequestConfig } from "next-intl/server";
import {hasLocale} from 'next-intl';
import { routing } from "./routing";

// Can be imported from a shared config

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
console.log('localeeeee: ',locale)
  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
