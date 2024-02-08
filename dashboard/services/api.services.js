import axios from "axios";

const getBugsFromUserStory = async (taskNumber) => {
  const { data } = await axios.get(
    `https://rallyup.tpondemand.com/api/v1/UserStories/${taskNumber}/bugs?&include=[Id,Severity,EntityState]`,
    {
      params: {
        skip: "0",
        take: "500",
        format: "json",
      },
      headers: {
        accept: "application/json",
        Authorization: "Basic amFza2Vyb3Y6RnVyaW9uMTIzNDU=",
      },
    }
  );
  return data;
};

const getBugsFromRegress = async (dataRange) => {
  const { data } = await axios.get(
    `https://rallyup.tpondemand.com/api/v1/Bugs?where=(Tags contains 'regress')and(CreateDate gt '${dataRange}')&include=[Id,Severity,EntityState]`,
    {
      params: {
        skip: "0",
        take: "500",
        format: "json",
      },
      headers: {
        accept: "application/json",
        Authorization: "Basic amFza2Vyb3Y6RnVyaW9uMTIzNDU=",
      },
    }
  );
  return data;
};

export { getBugsFromUserStory, getBugsFromRegress };
