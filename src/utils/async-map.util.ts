/* eslint-disable no-return-await */

const asyncMap = async <ArrayItemType, IteratorReturnType>(
  array: ArrayItemType[],
  iterator: (
    value: ArrayItemType,
    index?: number,
  ) => Promise<IteratorReturnType>,
): Promise<IteratorReturnType[]> => {
  return await Promise.all(array.map(iterator));
};

export default asyncMap;
