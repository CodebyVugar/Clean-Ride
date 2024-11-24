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


app.use(cors());

const url = "https://8c3a-94-20-49-98.ngrok-free.app/co2-emissions";

// Send a GET request

const fetchData = async () => {
    try {
      const response = await fetch("https://8c3a-94-20-49-98.ngrok-free.app/co2-emissions");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const text = await response.text(); // Read the raw response as text
      console.log("Response Body:", text);
  
      try {
        // Attempt to parse JSON
        const data = JSON.parse(text);
        console.log("Parsed Data:", data);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  fetchData();
  

const transportation = "";
const shopping = "";
const lifeStyle = "";

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: [10, 8, 9],
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
    categories: ["Laptop", "Phone", "Monitor", "Headphones", "Camera"],
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
      name: "Purchase Orders",
      data: [31, 40, 28, 99, 100, 109, 100],
    },
    {
      name: "Sales Orders",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec"],
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
        text: "Purchase Orders",
      },
    },
    {
      opposite: true,
      title: {
        text: "Sales Orders",
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
