import { useState } from 'react'

import {

  PieChart,
  Pie,
  Cell,

  BarChart,
  Bar,

  LineChart,
  Line,

  AreaChart,
  Area,

  ScatterChart,
  Scatter,

  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,

  RadialBarChart,
  RadialBar,

  ComposedChart,

  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,

} from 'recharts'

export default function DashboardWorkspace({

  analysisData,
}) {

  // ---------------------------------------------------
  // ACTIVE TAB
  // ---------------------------------------------------

  const [activeTab, setActiveTab] =
    useState('overview')

  // ---------------------------------------------------
  // CHART TYPE STATE
  // ---------------------------------------------------

  const [chartTypes, setChartTypes] =
    useState({})

  // ---------------------------------------------------
  // DATASET
  // ---------------------------------------------------

  const currentDataset =
    analysisData?.[0]?.analysis

  // ---------------------------------------------------
  // COLORS
  // ---------------------------------------------------

  const COLORS = [

    '#4F46E5',
    '#06B6D4',
    '#8B5CF6',
    '#14B8A6',
    '#F59E0B',
    '#EF4444',
  ]

  // ---------------------------------------------------
  // FALLBACK
  // ---------------------------------------------------

  if (!currentDataset) {

    return (

      <div className="p-10 text-2xl text-slate-600">

        No dashboard data available.

      </div>
    )
  }

  return (

    <div className="p-8 space-y-10 bg-slate-50 min-h-screen">

      {/* HEADER */}

      <div className="bg-white rounded-[32px] p-10 shadow-lg">

        <h1 className="text-5xl font-black text-slate-900">

          Adaptive AI Dashboard

        </h1>

        <p className="text-slate-500 text-xl mt-4">

          Enterprise AI-powered analytics workspace

        </p>

      </div>

      {/* TABS */}

      <div className="flex flex-wrap gap-4">

        {[
          'overview',
          'visualizations',
          'insights',
          'preview',
          'ai-analysis',
        ].map((tab) => (

          <button

            key={tab}

            onClick={() =>
              setActiveTab(tab)
            }

            className={`px-6 py-3 rounded-2xl font-bold capitalize transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'
                : 'bg-white text-slate-700'
            }`}
          >

            {tab.replace('-', ' ')}

          </button>
        ))}

      </div>

      {/* OVERVIEW */}

      {activeTab === 'overview' && (

        <div className="space-y-8">

          {/* BASIC KPIs */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white rounded-[28px] p-8 shadow-lg">

              <h2 className="text-slate-500 text-lg font-semibold">

                Rows

              </h2>

              <p className="text-5xl font-black mt-4">

                {currentDataset.rows}

              </p>

            </div>

            <div className="bg-white rounded-[28px] p-8 shadow-lg">

              <h2 className="text-slate-500 text-lg font-semibold">

                Columns

              </h2>

              <p className="text-5xl font-black mt-4">

                {currentDataset.columns}

              </p>

            </div>

            <div className="bg-white rounded-[28px] p-8 shadow-lg">

              <h2 className="text-slate-500 text-lg font-semibold">

                Numeric Columns

              </h2>

              <p className="text-5xl font-black mt-4">

                {currentDataset.numeric_columns}

              </p>

            </div>

            <div className="bg-white rounded-[28px] p-8 shadow-lg overflow-hidden">

              <h2 className="text-slate-500 text-lg font-semibold">

                Categories

              </h2>

              <p className="text-lg font-bold mt-4 break-words">

                {Array.isArray(
                  currentDataset.categorical_columns
                )

                  ? currentDataset.categorical_columns.join(', ')

                  : 'None'}

              </p>

            </div>

          </div>

          {/* AI KPI CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {

              currentDataset.kpis?.map(

                (kpi, index) => (

                  <div

                    key={index}

                    className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-[28px] p-8 shadow-lg"

                  >

                    <h2 className="text-lg font-semibold opacity-80">

                      {kpi.title}

                    </h2>

                    <p className="text-4xl font-black mt-4 break-words">

                      {kpi.value}

                    </p>

                    <p className="mt-3 text-sm opacity-80">

                      Avg: {kpi.average}

                    </p>

                  </div>
                )
              )
            }

          </div>

        </div>
      )}

      {/* VISUALIZATIONS */}

      {activeTab === 'visualizations' && (

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {currentDataset.charts?.map(

            (chart, index) => {

              const chartData =
                chart.x.map((item, i) => ({

                  name: item,

                  value: chart.y[i],
                }))

              const selectedType =
                chartTypes[index] ||
                chart.chart_type

              return (

                <div

                  key={index}

                  className="bg-white rounded-[32px] p-8 shadow-lg"

                >

                  {/* HEADER */}

                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

                    <h2 className="text-2xl font-black text-slate-900">

                      {chart.title}

                    </h2>

                    <select

                      value={selectedType}

                      onChange={(e) =>

                        setChartTypes({

                          ...chartTypes,

                          [index]:
                            e.target.value,
                        })
                      }

                      className="px-4 py-2 rounded-xl bg-slate-100"

                    >

                      <option value="pie">Pie</option>

                      <option value="bar">Bar</option>

                      <option value="line">Line</option>

                      <option value="area">Area</option>

                      <option value="scatter">Scatter</option>

                      <option value="radar">Radar</option>

                      <option value="radial">Radial</option>

                      <option value="composed">Composed</option>

                      <option value="donut">Donut</option>

                    </select>

                  </div>

                  {/* CHART AREA */}

                  <div className="w-full h-[420px]">

                    <ResponsiveContainer>

                      {/* PIE */}

                      {selectedType === 'pie' && (

                        <PieChart>

                          <Pie

                            data={chartData}

                            dataKey="value"

                            nameKey="name"

                            outerRadius={140}

                            label

                          >

                            {chartData.map((_, i) => (

                              <Cell

                                key={i}

                                fill={
                                  COLORS[
                                    i %
                                    COLORS.length
                                  ]
                                }

                              />
                            ))}

                          </Pie>

                          <Tooltip />

                        </PieChart>
                      )}

                      {/* DONUT */}

                      {selectedType === 'donut' && (

                        <PieChart>

                          <Pie

                            data={chartData}

                            dataKey="value"

                            nameKey="name"

                            innerRadius={80}

                            outerRadius={140}

                            label

                          >

                            {chartData.map((_, i) => (

                              <Cell

                                key={i}

                                fill={
                                  COLORS[
                                    i %
                                    COLORS.length
                                  ]
                                }

                              />
                            ))}

                          </Pie>

                          <Tooltip />

                        </PieChart>
                      )}

                      {/* BAR */}

                      {selectedType === 'bar' && (

                        <BarChart data={chartData}>

                          <CartesianGrid strokeDasharray="3 3" />

                          <XAxis dataKey="name" />

                          <YAxis />

                          <Tooltip />

                          <Legend />

                          <Bar

                            dataKey="value"

                            fill="#4F46E5"

                          />

                        </BarChart>
                      )}

                      {/* LINE */}

                      {selectedType === 'line' && (

                        <LineChart data={chartData}>

                          <CartesianGrid strokeDasharray="3 3" />

                          <XAxis dataKey="name" />

                          <YAxis />

                          <Tooltip />

                          <Legend />

                          <Line

                            type="monotone"

                            dataKey="value"

                            stroke="#06B6D4"

                          />

                        </LineChart>
                      )}

                      {/* AREA */}

                      {selectedType === 'area' && (

                        <AreaChart data={chartData}>

                          <CartesianGrid strokeDasharray="3 3" />

                          <XAxis dataKey="name" />

                          <YAxis />

                          <Tooltip />

                          <Area

                            type="monotone"

                            dataKey="value"

                            stroke="#8B5CF6"

                            fill="#C4B5FD"

                          />

                        </AreaChart>
                      )}

                      {/* SCATTER */}

                      {selectedType === 'scatter' && (

                        <ScatterChart>

                          <CartesianGrid />

                          <XAxis dataKey="value" />

                          <YAxis dataKey="value" />

                          <Tooltip />

                          <Scatter

                            data={chartData}

                            fill="#8B5CF6"

                          />

                        </ScatterChart>
                      )}

                      {/* RADAR */}

                      {selectedType === 'radar' && (

                        <RadarChart data={chartData}>

                          <PolarGrid />

                          <PolarAngleAxis dataKey="name" />

                          <PolarRadiusAxis />

                          <Radar

                            dataKey="value"

                            stroke="#4F46E5"

                            fill="#818CF8"

                            fillOpacity={0.6}

                          />

                          <Legend />

                        </RadarChart>
                      )}

                      {/* RADIAL */}

                      {selectedType === 'radial' && (

                        <RadialBarChart

                          innerRadius="20%"

                          outerRadius="90%"

                          data={chartData}

                        >

                          <RadialBar

                            dataKey="value"

                            background

                          />

                          <Legend />

                          <Tooltip />

                        </RadialBarChart>
                      )}

                      {/* COMPOSED */}

                      {selectedType === 'composed' && (

                        <ComposedChart data={chartData}>

                          <CartesianGrid stroke="#f5f5f5" />

                          <XAxis dataKey="name" />

                          <YAxis />

                          <Tooltip />

                          <Legend />

                          <Bar

                            dataKey="value"

                            fill="#4F46E5"

                          />

                          <Line

                            type="monotone"

                            dataKey="value"

                            stroke="#06B6D4"

                          />

                        </ComposedChart>
                      )}

                    </ResponsiveContainer>

                  </div>

                </div>
              )
            }
          )}

        </div>
      )}

      {/* INSIGHTS */}

      {activeTab === 'insights' && (

        <div className="space-y-8">

          {/* AI INSIGHTS */}

          <div className="bg-white rounded-[32px] p-10 shadow-lg">

            <h2 className="text-3xl font-black mb-8">

              AI Insights

            </h2>

            <div className="space-y-4">

              {

                currentDataset.ai_insights?.map(

                  (insight, index) => (

                    <div

                      key={index}

                      className="bg-slate-50 rounded-3xl p-6"

                    >

                      <p className="text-lg text-slate-700">

                        • {insight}

                      </p>

                    </div>
                  )
                )
              }

            </div>

          </div>

          {/* ANOMALIES */}

          <div className="bg-white rounded-[32px] p-10 shadow-lg">

            <h2 className="text-3xl font-black mb-8">

              Anomaly Detection

            </h2>

            <div className="space-y-4">

              {

                currentDataset.anomalies?.length > 0

                  ? currentDataset.anomalies.map(

                      (item, index) => (

                        <div

                          key={index}

                          className="bg-red-50 rounded-3xl p-6"

                        >

                          <p className="text-lg text-red-700">

                            ⚠ {item}

                          </p>

                        </div>
                      )
                    )

                  : (

                    <div className="bg-green-50 rounded-3xl p-6">

                      <p className="text-lg text-green-700">

                        No major anomalies detected.

                      </p>

                    </div>
                  )
              }

            </div>

          </div>

          {/* CORRELATIONS */}

          <div className="bg-white rounded-[32px] p-10 shadow-lg">

            <h2 className="text-3xl font-black mb-8">

              Correlations

            </h2>

            <div className="space-y-4">

              {

                currentDataset.correlations?.length > 0

                  ? currentDataset.correlations.map(

                      (item, index) => (

                        <div

                          key={index}

                          className="bg-indigo-50 rounded-3xl p-6"

                        >

                          <p className="text-lg text-indigo-700">

                            • {item}

                          </p>

                        </div>
                      )
                    )

                  : (

                    <div className="bg-slate-50 rounded-3xl p-6">

                      <p className="text-lg text-slate-700">

                        No strong correlations detected.

                      </p>

                    </div>
                  )
              }

            </div>

          </div>

        </div>
      )}

      {/* PREVIEW */}

      {activeTab === 'preview' && (

        <div className="bg-white rounded-[32px] p-8 shadow-lg overflow-auto">

          <h2 className="text-3xl font-black mb-6">

            Dataset Preview

          </h2>

          <pre className="text-sm whitespace-pre-wrap text-slate-700">

            {JSON.stringify(

              currentDataset.preview_data?.slice(0, 5),

              null,

              2
            )}

          </pre>

        </div>
      )}

      {/* AI ANALYSIS */}

      {activeTab === 'ai-analysis' && (

        <div className="bg-white rounded-[32px] p-10 shadow-lg">

          <h2 className="text-3xl font-black mb-8">

            Enterprise AI Analysis

          </h2>

          <div className="space-y-6">

            <div className="bg-slate-50 rounded-3xl p-6">

              <p className="text-lg text-slate-700">

                Dataset contains
                {' '}
                {currentDataset.rows}
                {' '}
                records and
                {' '}
                {currentDataset.columns}
                {' '}
                columns.

              </p>

            </div>

            <div className="bg-slate-50 rounded-3xl p-6">

              <p className="text-lg text-slate-700">

                AI engine identified
                {' '}
                {currentDataset.charts?.length}
                {' '}
                adaptive visualizations.

              </p>

            </div>

            <div className="bg-slate-50 rounded-3xl p-6">

              <p className="text-lg text-slate-700">

                Statistical intelligence and anomaly
                detection completed successfully.

              </p>

            </div>

            <div className="bg-slate-50 rounded-3xl p-6">

              <p className="text-lg text-slate-700">

                Dashboard is ready for enterprise
                AI Copilot interactions.

              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}