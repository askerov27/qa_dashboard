import { getBugsFromUserStory, getBugsFromRegress } from "./api.services.js";

const getBugs = async (taskNumber) => {
  return await getBugsFromUserStory(taskNumber);
};
const getRegressBugs = async (dataRange) => {
  return await getBugsFromRegress(dataRange);
};

export { getBugs, getRegressBugs };
