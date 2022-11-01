const contentful = require("contentful");

export const contentfulClient = contentful.createClient({
    space: "rp32l5jc0v2q",
    accessToken: "YM9qVLJOWVU-PtyUvFIs8RqwyxoBLuUL2NAsMskpaV4",
  });

export const formatHeaderData = (entries) => {
    const fields =  entries.map(x => x.fields)
    return fields.reduce(
        (obj, item) => Object.assign(obj, { [item.key]: item.name }), {});
}