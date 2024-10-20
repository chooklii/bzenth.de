import { flatten } from "flat"

import en from "./en.json"
import de from "./de.json"

export const translations = {
    "de": flatten(de),
    "en": flatten(en)
}
