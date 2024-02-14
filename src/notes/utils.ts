export const getCreatedAtValue = (created_at) => {
  if (!created_at) {
    return {};
  }
  if (created_at.type === '>') {
    return { created_at: { $gt: created_at.value } };
  }
  if (created_at.type === '<') {
    return { created_at: { $lt: created_at.value } };
  }
};
