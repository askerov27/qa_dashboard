import axios from "axios";
import "dotenv/config";

const getBugsFromUserStory = async (taskNumber) => {
  const { data } = await axios.get(
    `https://rallyup.tpondemand.com/api/v1/UserStories/${taskNumber}/bugs`,
    {
      params: {
        take: "500",
        $select: "Id,Severity,EntityState",
      },
      headers: {
        Authorization: process.env.TP_TOKEN,
      },
    }
  );
  return data;
};

const getBugsFromRegress = async (dataRange) => {
  const { data } = await axios.get(
    `https://rallyup.tpondemand.com/api/v1/Bugs`,
    {
      params: {
        where:
          "('CustomFields.Testing Environment' eq 'Staging')and(CreateDate gt '" +
          dataRange +
          "')",
        include: "[Id,Severity,EntityState]",
        skip: "0",
        take: "500",
        format: "json",
      },
      headers: {
        accept: "application/json",
        Authorization: process.env.TP_TOKEN,
      },
    }
  );
  return data;
};

export { getBugsFromUserStory, getBugsFromRegress };
