import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value(); //convert items to lodash array, slice list starting at the current place, then take the requested number per page of items, and finally return back as a js array, not a lodash array
}
