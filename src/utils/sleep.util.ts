/* eslint-disable no-promise-executor-return */
/* eslint-disable no-return-await */

const sleep = async (timeInMs: number): Promise<void> => {
  return await new Promise(resolve => setTimeout(resolve, timeInMs));
};

export default sleep;
