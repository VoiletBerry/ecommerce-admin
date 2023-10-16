"use client";

import { useOrign } from "@/hooks/use-origin";
import ApiAlert from "./api-alert";
import { useSearchParams } from "next/navigation";

interface ApiListProps {
  dataName: string;
  dataId: string;
  title: string;
  titleById: string;
  storeId: string;
}

const ApiList: React.FC<ApiListProps> = ({
  dataName,
  dataId,
  title,
  titleById,
  storeId,
}) => {
  const orign = useOrign();

  const baseurl = `${orign}/api/stores/${storeId}/${dataName}`;

  return (
    <>
      <ApiAlert title={`GET_${title}`} link={baseurl} variant="public" />
      <ApiAlert
        title={`GET_${title}_BY_ID`}
        link={`${baseurl}/{${dataId}}`}
        variant="public"
      />
      <ApiAlert
        title={`PATCH_${titleById}_BY_ID`}
        link={`${baseurl}/{${dataId}}`}
        variant="admin"
      />
      <ApiAlert
        title={`POST_${titleById}`}
        link={`${baseurl}`}
        variant="admin"
      />
      <ApiAlert
        title={`DELETE_${titleById}_BY_ID`}
        link={`${baseurl}/{${dataId}}`}
        variant="admin"
      />
    </>
  );
};

export default ApiList;
