import axios from "axios";

const getBugsStatisticFromStaging = async (
  env,
  firstMonthDate,
  lastMonthDate,
) => {
  console.log(env);
  const { data } = await axios.get(
    "https://rallyup.tpondemand.com/api/v1/bugs",
    {
      params: {
        where: `('CustomFields.Testing Environment' eq '${env}')and(CreateDate gte '${firstMonthDate}')and(CreateDate lte '${lastMonthDate}')`,
        include: "[Id,Severity, EntityState]",
        skip: "0",
        take: "500",
        format: "json",
      },
      headers: {
        accept: "application/json",
        Authorization: "Basic amFza2Vyb3Y6RnVyaW9uMTIzNDU=",
      },
    },
  );
  return data;
};

export { getBugsStatisticFromStaging };
