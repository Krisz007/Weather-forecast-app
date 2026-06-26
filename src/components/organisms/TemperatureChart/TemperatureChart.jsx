import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { getShortDay } from "@/utils/formatDate"
import { white } from "@/styles/colors"
import "./TemperatureChart.scss"

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="temp-chart__tooltip">
      <span className="temp-chart__tooltip-temp">{payload[0].value} °C</span>
      <span className="temp-chart__tooltip-day">{label}</span>
    </div>
  )
}

export const TemperatureChart = ({ days }) => {
  const data = days.map(day => ({
    day: getShortDay(day.date),
    max: day.tempMax
  }))

  return (
    <section className="temp-chart card">
      <h2 className="temp-chart__title">Hőmérséklet alakulása</h2>
      <div className="temp-chart__canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 12, right: 16, bottom: 4, left: 0 }}
            accessibilityLayer={false}
          >
            <defs>
              <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={white.solid} stopOpacity={0.45} />
                <stop offset="100%" stopColor={white.solid} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={white.a18} vertical={false} />
            <XAxis
              dataKey="day"
              stroke={white.a85}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              stroke={white.a85}
              tickLine={false}
              axisLine={false}
              width={40}
              tickMargin={6}
              unit="°"
            />
            <Tooltip
              cursor={{ stroke: white.a45, strokeWidth: 1 }}
              content={<ChartTooltip />}
            />
            <Area
              type="monotone"
              dataKey="max"
              stroke={white.solid}
              strokeWidth={2.5}
              fill="url(#tempFill)"
              dot={{ r: 3, fill: white.solid, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: white.solid, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
