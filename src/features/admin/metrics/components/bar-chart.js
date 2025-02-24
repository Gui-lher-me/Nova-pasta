"use client";

import { Card } from "@/components/card";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend, // To fix the "category" scale error
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
  CategoryScale, // Fixes "category" scale error
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export function BarChart({ chartData }) {
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "LCP Value (secs)", // Label for the X-axis
        },
        ticks: {
          callback: (value) => {
            return `${value}`;
          },
        },
      },
      y: {
        title: {
          display: false,
          text: "LCP Value (secs)", // Label for the Y-axis
        },
        beginAtZero: true, // Start Y-axis at zero
        ticks: {
          // Optional: Set the tick callback to display values in seconds
          callback: (value) => {
            return `${value}s`; // Append 's' to y-axis ticks
          },
        },
      },
    },
  };

  return (
    <Card>
      <Bar data={chartData} options={options} />
    </Card>
  );
}
