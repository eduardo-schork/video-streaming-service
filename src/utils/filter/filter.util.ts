export type FilterProps = {
  filter?: FilterItem[] | null;
};

export type FilterItem = {
  key?: string;
  value?: string;
};

export const buildFilterObject = ({ filter }: { filter?: FilterItem[] }) => {
  let filterObject = {};

  if (filter) {
    filter.map((filterItem) => {
      filterObject = {
        ...filterObject,
        [`${filterItem.key}`]: filterItem.value,
      };
    });

    return filterObject;
  }
};
