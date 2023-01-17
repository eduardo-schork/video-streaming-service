export interface FilterItem {
  key?: string;
  value?: string;
}
export interface FilterProps {
  filter?: FilterItem[] | null;
}

export const buildFilterObject = ({ filter }: { filter?: FilterItem[] }) => {
  let filterObject = {};

  if (filter != null) {
    filter.map(filterItem => {
      filterObject = {
        ...filterObject,
        [`${filterItem.key}`]: filterItem.value,
      };
    });

    return filterObject;
  }
};
