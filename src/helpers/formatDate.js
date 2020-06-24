export const formatDate = (value) => {
  const date = new Date(value);

  const format1 = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ].join('/');

  const format2 = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ].map((_) => _.toString().padStart(2, 0)).join(':');

  return `${format1} ${format2}`;
};
