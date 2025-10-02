import CardDefault from "@components/Card/CardDefault";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TransactionChart = ({ transaction, className = "" }) => {
  return (
    <>
      <CardDefault className={"w-full col-span-2 " + className}>
        <h2 className="text-xl font-semibold mb-4">
          Total Transaksi per Bulan
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={transaction.monthly_balances}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => value.toLocaleString("id-ID")} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const { month, formatted_total } = payload[0].payload;
                  return (
                    <div className="bg-white border rounded shadow p-2 text-sm">
                      <p className="font-semibold">{month}</p>
                      <p>{formatted_total}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="total" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardDefault>
    </>
  );
};

export default TransactionChart;
