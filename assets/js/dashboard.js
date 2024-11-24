// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

// console.log("test");

// ---------- CHARTS ----------

const url = "https://e61d-94-20-49-98.ngrok-free.app/emissions";

const fetchData = async () => {
  const response = await fetch(url);

  const data = await response.json();

  console.log(data, "data");
};

fetchData();

const transportation = parseFloat(
  localStorage.getItem("transportEmissionKg")
).toFixed(2);
const shopping = parseFloat(localStorage.getItem("shopEmissionKg")).toFixed(2);
const lifeStyle = parseFloat(localStorage.getItem("lifeEmissionKg")).toFixed(2);

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: [transportation, shopping, lifeStyle],
    },
  ],
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1"],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ["Transportation", "Shopping", "Life Style"],
  },
  yaxis: {
    title: {
      text: "Count",
    },
  },
};

const barChart = new ApexCharts(
  document.querySelector("#bar-chart"),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: "Transportation",
      data: [0, transportation],
    },
    {
      name: "Shopping",
      data: [0, shopping],
    },
    {
      name: "Life Style",
      data: [0, lifeStyle],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec", "#fa56e7"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: "Transportation",
      },
    },
    {
      title: {
        text: "Shopping",
      },
    },
    {
      title: {
        text: "Life Style",
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

const areaChart = new ApexCharts(
  document.querySelector("#area-chart"),
  areaChartOptions
);
areaChart.render();
