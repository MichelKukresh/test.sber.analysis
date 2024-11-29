
// преобразование данных
function transformToInputObject(db) {
  const inputObject = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };

  db.forEach((item) => {
    inputObject.labels.push(item.labels);
    inputObject.datasets[0].data.push(item.values);
    inputObject.datasets[0].backgroundColor.push(item.colors);
  });

  return inputObject;
}

// Заглушка данных
const db = [
  { labels: "Личный транспорт", values: 24, colors: "#11808b" },
  { labels: "Транспорт", values: 18, colors: "#31c1a6" },
  { labels: "Аптеки", values: 14, colors: "#0574e0" },
  { labels: "Непродовольственные магазины", values: 10, colors: "#7f67e1" },
  { labels: "Предоставление услуг", values: 9, colors: "#3bb2cd" },
  { labels: "Кафе/бары/рестораны", values: 6, colors: "#47a2fd" },
  { labels: "Развлечения", values: 5, colors: "#fe9702" },
  { labels: "Продовольственные магазины", values: 4, colors: "#dc1438" },
  { labels: "Средства размещения", values: 3, colors: "#4d2bd6" },
  { labels: "Прочее", values: 22, colors: "#d0d7dd" },
];

const dataSheets = transformToInputObject(db);
const tableSheets = db;

export { dataSheets, tableSheets };
