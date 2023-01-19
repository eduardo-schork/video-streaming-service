export type FilterItem = {
  key?: string;
  value?: string;
};
export type FilterProps = {
  filter?: FilterItem[] | null;
};

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
