export function transformData(data) {
  const transformedData = data.data.reduce(
    (acc, item) => {
      // Convert the LCP value from milliseconds to seconds
      const valueInSeconds = item.value / 1000; // Convert to seconds
      const roundedValue = valueInSeconds.toFixed(2); // Round to 2 decimal places

      acc.labels.push(`${item.path}`);

      // Append the values to the datasets
      acc.datasets[0].data.push(roundedValue);

      return acc;
    },
    {
      labels: [],
      datasets: [
        {
          label: "LCP",
          backgroundColor: data.data.map((item) =>
            item.value === data.p75
              ? "rgba(255, 99, 132, 0.6)"
              : "rgba(75,192,192,0.2)",
          ), // Chart colors
          borderColor: data.data.map((item) =>
            item.value === data.p75
              ? "rgba(255, 99, 132, 1)"
              : "rgba(75,192,192,1)",
          ),
          borderWidth: 1,
          data: [], // Dynamic data will be added here
        },
      ],
    },
  );

  return transformedData;
}
