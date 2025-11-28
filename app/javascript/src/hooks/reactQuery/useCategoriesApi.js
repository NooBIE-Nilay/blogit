import { QUERY_KEYS } from "constants/query";

import categoriesApi from "apis/categories";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => categoriesApi.fetch(),
  });

const useCreateCategory = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newCategory => categoriesApi.create(newCategory),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};

export { useFetchCategories, useCreateCategory };
