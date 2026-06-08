import { useState } from 'react'

export default function DocumentWorkspace({

  uploadedFiles,

  documentAnalysis,
}) {

  // ---------------------------------------------------
  // ACTIVE TAB
  // ---------------------------------------------------

  const [activeTab, setActiveTab] =
    useState('summary')

  // ---------------------------------------------------
  // FILE
  // ---------------------------------------------------

  const file =
    uploadedFiles?.[0]

  // ---------------------------------------------------
  // FIX FILENAME
  // ---------------------------------------------------

  const fileName =

    file?.filename ||

    file?.name ||

    ''

  // ---------------------------------------------------
  // FIX ANALYSIS
  // ---------------------------------------------------

  const analysis =

    documentAnalysis?.[

      fileName

    ] || {}

  return (

    <div className="p-8 space-y-10 bg-slate-50 min-h-screen">

      {/* --------------------------------------------------- */}
      {/* HEADER */}
      {/* --------------------------------------------------- */}

      <div className="bg-white rounded-[32px] p-10 shadow-lg">

        <h1 className="text-5xl font-black text-slate-900">

          AI Document Intelligence

        </h1>

        <p className="text-slate-500 text-xl mt-4">

          Semantic understanding and conversational document analysis.

        </p>

      </div>

      {/* --------------------------------------------------- */}
      {/* TABS */}
      {/* --------------------------------------------------- */}

      <div className="flex flex-wrap gap-4">

        {[
          'summary',
          'insights',
          'topics',
          'entities',
          'resume-analysis',
          'preview',
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

      {/* --------------------------------------------------- */}
      {/* SUMMARY TAB */}
      {/* --------------------------------------------------- */}

      {activeTab === 'summary' && (

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* DOCUMENT */}

          <div className="bg-white rounded-[32px] p-8 shadow-lg">

            <h2 className="text-4xl font-black text-slate-900 mb-8">

              Uploaded Document

            </h2>

            <div className="bg-slate-50 rounded-3xl p-8">

              <h3 className="text-2xl font-bold text-slate-900 break-words">

                {fileName}

              </h3>

              <p className="text-slate-500 mt-4">

                {

                  file?.size

                    ? `${(file.size / 1024).toFixed(2)} KB`

                    : 'Unknown Size'
                }

              </p>

            </div>

          </div>

          {/* AI SUMMARY */}

          <div className="bg-white rounded-[32px] p-8 shadow-lg">

            <h2 className="text-4xl font-black text-slate-900 mb-8">

              AI Summary

            </h2>

            <div className="bg-slate-50 rounded-3xl p-8">

              <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">

                {

                  analysis?.summary ||

                  'No summary available.'
                }

              </p>

            </div>

          </div>

        </div>
      )}

      {/* --------------------------------------------------- */}
      {/* INSIGHTS TAB */}
      {/* --------------------------------------------------- */}

      {activeTab === 'insights' && (

        <div className="bg-white rounded-[32px] p-10 shadow-lg">

          <h2 className="text-4xl font-black text-slate-900 mb-8">

            Key Insights

          </h2>

          <div className="space-y-6">

            {

              analysis?.insights?.length > 0

                ? analysis.insights.map(

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

                : (

                  <div className="bg-slate-50 rounded-3xl p-6">

                    <p className="text-lg text-slate-700">

                      No AI insights available.

                    </p>

                  </div>
                )
            }

          </div>

        </div>
      )}

      {/* --------------------------------------------------- */}
      {/* TOPICS TAB */}
      {/* --------------------------------------------------- */}

      {activeTab === 'topics' && (

        <div className="bg-white rounded-[32px] p-10 shadow-lg">

          <h2 className="text-4xl font-black mb-8">

            Key Topics

          </h2>

          <div className="flex flex-wrap gap-4">

            {

              analysis?.topics?.length > 0

                ? analysis.topics.map(

                    (topic, index) => (

                      <div

                        key={index}

                        className="px-6 py-4 bg-indigo-100 text-indigo-700 rounded-2xl font-bold"

                      >

                        {topic}

                      </div>
                    )
                  )

                : (

                  <div className="bg-slate-50 rounded-3xl p-6">

                    No topics found.

                  </div>
                )
            }

          </div>

        </div>
      )}

      {/* --------------------------------------------------- */}
      {/* ENTITIES TAB */}
      {/* --------------------------------------------------- */}

      {activeTab === 'entities' && (

        <div className="bg-white rounded-[32px] p-10 shadow-lg">

          <h2 className="text-4xl font-black mb-8">

            Extracted Entities

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {

              Object.entries(

                analysis?.entities || {}
              ).map(

                ([key, values], index) => (

                  <div

                    key={index}

                    className="bg-slate-50 rounded-3xl p-6"

                  >

                    <h3 className="text-xl font-bold text-slate-900 capitalize">

                      {key.replace('_', ' ')}

                    </h3>

                    <div className="mt-4 flex flex-wrap gap-3">

                      {

                        values.length > 0

                          ? values.map(

                              (item, idx) => (

                                <span

                                  key={idx}

                                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold"

                                >

                                  {item}

                                </span>
                              )
                            )

                          : (

                            <span className="text-slate-400">

                              No data found

                            </span>
                          )
                      }

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>
      )}

{/* --------------------------------------------------- */}
{/* RESUME ANALYSIS */}
{/* --------------------------------------------------- */}

{activeTab === 'resume-analysis' && (

  <div className="bg-white rounded-[32px] p-10 shadow-lg">

    <h2 className="text-4xl font-black mb-8">

      Resume Intelligence

    </h2>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* SKILLS */}

      <div className="bg-slate-50 rounded-3xl p-6">

        <h3 className="text-2xl font-bold">

          Skills

        </h3>

        <div className="mt-4 flex flex-wrap gap-3">

          {

            analysis?.skills?.length > 0

              ? analysis.skills.map(

                  (skill, index) => (

                    <span

                      key={index}

                      className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-xl text-sm font-semibold"

                    >

                      {skill}

                    </span>
                  )
                )

              : (

                <p className="text-slate-500">

                  No skills detected.

                </p>
              )
          }

        </div>

      </div>

      {/* EXPERIENCE */}

      <div className="bg-slate-50 rounded-3xl p-6">

        <h3 className="text-2xl font-bold">

          Experience

        </h3>

        <div className="mt-4 space-y-3">

          <div>

            <span className="font-semibold">

              Level:
            </span>

            {' '}

            {

              analysis?.experience?.level ||

              'Unknown'
            }

          </div>

          <div>

            <span className="font-semibold">

              Years:
            </span>

            {' '}

            {

              analysis?.experience?.years ||

              'Unknown'
            }

          </div>

          <div className="text-slate-600">

            {

              analysis?.experience?.details ||

              'No experience details available.'
            }

          </div>

        </div>

      </div>

      {/* RECOMMENDATIONS */}

      <div className="bg-slate-50 rounded-3xl p-6">

        <h3 className="text-2xl font-bold">

          Recommendations

        </h3>

        <div className="mt-4 space-y-3">

          {

            analysis?.recommendations?.length > 0

              ? analysis.recommendations.map(

                  (item, index) => (

                    <div

                      key={index}

                      className="bg-white rounded-2xl p-4 text-slate-700"

                    >

                      • {item}

                    </div>
                  )
                )

              : (

                <p className="text-slate-500">

                  No recommendations available.

                </p>
              )
          }

        </div>

      </div>

    </div>

  </div>
)}
{/* --------------------------------------------------- */}
{/* PREVIEW TAB */}
{/* --------------------------------------------------- */}

{activeTab === 'preview' && (

  <div className="bg-white rounded-[32px] p-10 shadow-lg">

    <h2 className="text-4xl font-black mb-8">

      Document Preview

    </h2>

    {

      file ? (

        <div className="w-full h-[900px] rounded-3xl overflow-hidden border border-slate-200">

          <iframe

            src={URL.createObjectURL(file)}

            title="PDF Preview"

            className="w-full h-full"

          />

        </div>

      ) : (

        <div className="bg-slate-50 rounded-3xl p-8">

          <p className="text-slate-700 text-lg">

            No preview available.

          </p>

        </div>
      )
    }

  </div>
)}

    </div>
  )
}