export const deepCopy = (d) => JSON.parse(JSON.stringify(d));

export const filterDate = (res, d) =>
  res.filter((x) => new Date(x.date).toDateString() === d.toDateString());

export const upsertSet = (
  targetSet,
  value,
  isAdd = true,
  triggerChange = true
) => {
  if (isAdd) {
    targetSet.add(value);
  } else {
    targetSet.delete(value);
  }
  if (triggerChange) {
    return new Set([...targetSet]);
  }
  return targetSet;
};

export const removeDataAtIndex = (arr, index) => {
  const dupl = [...arr];
  dupl.splice(index, 1);
  return dupl;
};
