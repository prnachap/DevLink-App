import { useAppDispatch } from "@/redux";
import { onSave } from "@/redux/features/linkSlice";
import { getLinksList } from "@/services/links";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useEffect } from "react";

const useFetchLinksList = () => {
  const dispatch = useAppDispatch();

  const queryResult = useQuery({
    queryKey: ["get-links"],
    queryFn: () => getLinksList(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isEmpty(queryResult.data?.data) && queryResult.isSuccess) {
      dispatch(onSave({ linksList: [] }));
    }

    if (!isEmpty(queryResult.data?.data) && queryResult.isSuccess) {
      const linksList = queryResult.data?.data?.linksList;
      dispatch(onSave({ linksList }));
    }
  }, [dispatch, queryResult.data, queryResult.isSuccess]);

  return queryResult;
};

export default useFetchLinksList;
