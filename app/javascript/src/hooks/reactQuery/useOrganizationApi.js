import { QUERY_KEYS } from "constants/query";

import organizationsApi from "apis/organizations";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useFetchOrganizations = () =>
  useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATIONS],
    queryFn: () => organizationsApi.fetch(),
  });

const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newOrganization => organizationsApi.create(newOrganization),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.ORGANIZATIONS]);
    },
  });
};
export { useFetchOrganizations, useCreateOrganization };
