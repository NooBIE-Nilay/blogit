export const getOprganizationOptions = organizations =>
  organizations?.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
