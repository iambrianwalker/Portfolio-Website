"use client";

import type {
  AnalyticsChartData,
  AnalyticsDailyPoint,
  AnalyticsTypeBreakdown,
} from "@/types/admin";

interface AnalyticsChartsProps {
  data: AnalyticsChartData;
}

function TypeBarChart({ breakdown }: { breakdown: AnalyticsTypeBreakdown[] }) {
  const maxCount = Math.max(...breakdown.map((item) => item.count), 1);

  return (
    <div className="space-y-4">
      {breakdown.map((item) => {
        const width = `${Math.max((item.count / maxCount) * 100, item.count > 0 ? 4 : 0)}%`;

        return (
          <div key={item.eventType}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-zinc-300">{item.label}</span>
              <span className="font-semibold text-white">{item.count}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-zinc-950/80">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width, backgroundColor: item.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DailyTrendChart({ series }: { series: AnalyticsDailyPoint[] }) {
  const maxTotal = Math.max(...series.map((point) => point.total), 1);
  const chartHeight = 160;
  const chartWidth = 640;
  const padding = 16;
  const innerWidth = chartWidth - padding * 2;
  const innerHeight = chartHeight - padding * 2;
  const step = series.length > 1 ? innerWidth / (series.length - 1) : innerWidth;

  const points = series.map((point, index) => {
    const x = padding + index * step;
    const y =
      padding +
      innerHeight -
      (point.total / maxTotal) * innerHeight;

    return { ...point, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? padding} ${
    chartHeight - padding
  } L ${points[0]?.x ?? padding} ${chartHeight - padding} Z`;

  const tickIndexes = [0, Math.floor(series.length / 2), series.length - 1];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="min-w-full"
          role="img"
          aria-label="Daily analytics trend chart"
        >
          <defs>
            <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(34, 211, 238, 0.35)" />
              <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding + innerHeight * (1 - ratio);
            return (
              <line
                key={ratio}
                x1={padding}
                x2={chartWidth - padding}
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            );
          })}

          <path d={areaPath} fill="url(#trendFill)" />
          <path
            d={linePath}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point) => (
            <circle
              key={point.date}
              cx={point.x}
              cy={point.y}
              r={point.total > 0 ? 4 : 2}
              fill={point.total > 0 ? "#22d3ee" : "#52525b"}
            />
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        {tickIndexes.map((index) => (
          <span key={series[index]?.date ?? index}>{series[index]?.label}</span>
        ))}
      </div>
    </div>
  );
}

function EventMixLegend({ breakdown }: { breakdown: AnalyticsTypeBreakdown[] }) {
  const total = breakdown.reduce((sum, item) => sum + item.count, 0);

  if (total === 0) {
    return (
      <p className="text-sm text-zinc-400">
        No analytics events recorded yet. Traffic will appear here once visitors interact with the site.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {breakdown.map((item) => {
        const percentage = Math.round((item.count / total) * 100);

        return (
          <div
            key={item.eventType}
            className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-sm text-zinc-300">{item.label}</p>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{item.count}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
              {percentage}% of tracked activity
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  const recentTotal = data.dailySeries.reduce((sum, point) => sum + point.total, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-400">
            Event mix
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">{data.summary.totalEvents}</p>
          <p className="mt-1 text-sm text-zinc-400">Total tracked events in DynamoDB</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-400">
            Last 30 days
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">{recentTotal}</p>
          <p className="mt-1 text-sm text-zinc-400">
            {data.summary.latestEventDate
              ? `Latest event ${new Date(data.summary.latestEventDate).toLocaleString()}`
              : "Waiting for the first tracked event"}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">Engagement by event type</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Live counts from the portfolio-analytics DynamoDB table.
          </p>
        </div>
        <TypeBarChart breakdown={data.typeBreakdown} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">Daily activity trend</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Combined event volume over the last 30 days.
          </p>
        </div>
        <DailyTrendChart series={data.dailySeries} />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Event distribution</h3>
        <EventMixLegend breakdown={data.typeBreakdown} />
      </div>
    </div>
  );
}
