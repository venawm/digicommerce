import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiProductHuntLine } from "react-icons/ri";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Function to fetch user count
async function getUser() {
  try {
    const response = await fetch(`${process.env.API}/user/count`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error("Error while fetching the data, please reload the page");
      return null;
    }
    return data;
  } catch (error) {
    toast.error(
      "An error occurred while fetching the data, please reload the page"
    );
    return null;
  }
}

// Function to fetch lifetime sales
async function getLifetimeSales() {
  try {
    const response = await fetch(`${process.env.API}/product/total`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error("Error while fetching the data, please reload the page");
      return null;
    }
    return data;
  } catch (error) {
    toast.error(
      "An error occurred while fetching the data, please reload the page"
    );
    return null;
  }
}

// Function to fetch product chart data
async function getProductChartData() {
  try {
    const response = await fetch(`${process.env.API}/product/chart`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error("Error while fetching the data, please reload the page");
      return null;
    }
    return data;
  } catch (error) {
    toast.error(
      "An error occurred while fetching the data, please reload the page"
    );
    return null;
  }
}

const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
};

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [lifetimeSales, setLifetimeSales] = useState(0);
  const [productChartData, setProductChartData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await getUser();
      if (userRes) {
        setUserCount(userRes.totalUsers); // assuming res has a structure like { totalUsers: 123 }
      }

      const salesRes = await getLifetimeSales();
      if (salesRes) {
        setLifetimeSales(salesRes.total); // assuming res has a structure like { totalAmount: 123456 }
      }

      const chartDataRes = await getProductChartData();
      if (chartDataRes) {
        setProductChartData(chartDataRes); // assuming res has a structure like [{ name: 'Product 1', sales: 400 }, ...]
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const countTotalStock = () => {
      let sum = 0;
      productChartData?.products?.forEach((e) => {
        sum += e.stock;
      });
      return sum;
    };

    if (productChartData.products) {
      setTotalProducts(countTotalStock());
    }
  }, [productChartData]);

  return (
    <div>
      <div className="flex justify-evenly">
        <div className="border border-slate-100 rounded-md shadow-sm flex flex-col justify-center items-center font-semibold text-2xl p-16">
          <div className="flex justify-center items-center">
            <CiUser className="text-3xl" />
            <p>{userCount}</p>
          </div>
          <p>Current Users</p>
        </div>
        <div className="border border-slate-100 rounded-md shadow-sm flex flex-col justify-center items-center font-semibold text-2xl p-16">
          <div className="flex justify-center items-center">
            <RiMoneyDollarCircleLine className="text-3xl" />
            <p>${lifetimeSales.toFixed(2)}</p>{" "}
            {/* Assuming the amount is in cents */}
          </div>
          <p>Lifetime Sales</p>
        </div>
        <div className="border border-slate-100 rounded-md shadow-sm flex flex-col justify-center items-center font-semibold text-2xl p-16">
          <div className="flex justify-center items-center">
            <RiProductHuntLine className="text-3xl" />
            <p>{totalProducts}</p>
            {/* Assuming the amount is in cents */}
          </div>
          <p>Total Products</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Product Sales Chart</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={productChartData.products}>
            <XAxis dataKey="title" tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sold" fill="#8884d8" />
            <Bar dataKey="stock" fill="#ff0000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
