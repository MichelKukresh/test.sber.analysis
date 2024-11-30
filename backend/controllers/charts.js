module.exports.allCharts = (req, res, next) => {
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

  res.send({ data: db });
};
