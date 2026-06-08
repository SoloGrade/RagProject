import { motion } from 'framer-motion'
import ChatBar from '../components/ChatBar'
import {

  Brain,

  MessageSquare,

  FileText,

  BarChart3,

  Sparkles,

  Send,

} from 'lucide-react'

export default function LandingPage({

  onFilesUpload,

  uploading,

  uploadProgress,

  processing,
}) {
  const features = [

    {
      icon: Brain,
      title: 'AI Dashboard Generation',
      description:
        'Automatically generate intelligent dashboards from uploaded datasets.',
    },

    {
      icon: FileText,
      title: 'Document Intelligence',
      description:
        'Semantic understanding for PDFs, resumes, reports, and enterprise files.',
    },

    {
      icon: MessageSquare,
      title: 'Conversational Analytics',
      description:
        'Chat with your data using enterprise AI-powered conversational intelligence.',
    },

    {
      icon: BarChart3,
      title: 'Adaptive Visualizations',
      description:
        'AI selects optimal charts and insights dynamically based on schema patterns.',
    },

  ]

  return (

    <div className="min-h-screen pb-40 bg-gradient-to-br from-slate-100 via-indigo-50 to-cyan-50 overflow-hidden">

      {/* Background Effects */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-300/20 blur-3xl" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* Navbar */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-xl">

              <Sparkles className="w-7 h-7 text-white" />

            </div>

            <div>

              <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">

                Enterprise AI Platform

              </h1>

              <p className="text-sm text-slate-500 font-medium">

                AI Analytics + Document Intelligence

              </p>

            </div>

          </div>

          <button className="px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg font-semibold text-slate-700">

            Enterprise Workspace

          </button>

        </div>

        {/* Hero Section */}

        <div className="text-center mt-20">

          <motion.h1

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.7 }}

            className="text-7xl xl:text-8xl font-black leading-tight text-slate-900"

          >

            AI-Powered

            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">

              {' '}Analytics

            </span>

            <br />

            Intelligence Platform

          </motion.h1>

          <motion.p

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8 }}

            className="text-slate-500 text-xl mt-10 max-w-4xl mx-auto leading-relaxed"

          >

            Upload datasets, enterprise reports, PDFs, and documents
            to generate intelligent dashboards, executive insights,
            semantic search, and conversational AI analytics.

          </motion.p>

        </div>

        {/* AI Chat Box */}

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.9 }}

          className="max-w-5xl mx-auto mt-16"

        >

          <div className="bg-white/70 backdrop-blur-2xl rounded-[36px] p-5 shadow-2xl border border-white/40">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-lg">

                <Brain className="w-7 h-7 text-white" />

              </div>

              <input

                type="text"

                placeholder="Ask anything about your enterprise data, reports, or analytics..."

                className="flex-1 bg-transparent outline-none text-lg text-slate-700 placeholder:text-slate-400"

              />

              <button className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-xl hover:scale-105 transition-all">

                <Send className="w-6 h-6 text-white" />

              </button>

            </div>

          </div>

        </motion.div>

        {/* Upload Section */}

        <motion.div

          initial={{ opacity: 0, scale: 0.96 }}

          animate={{ opacity: 1, scale: 1 }}

          transition={{ duration: 0.8 }}

          className="mt-20"

        >

          <div className="bg-white/70 backdrop-blur-2xl rounded-[40px] p-12 shadow-2xl border border-white/40">

            <div className="text-center">

              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 mx-auto flex items-center justify-center shadow-2xl">

                <span className="text-5xl text-white">

                  ↑

                </span>

              </div>

              <h2 className="text-5xl font-black text-slate-900 mt-10">

                Upload Enterprise Files

              </h2>

              <p className="text-slate-500 text-xl mt-6 max-w-3xl mx-auto leading-relaxed">

                Upload multiple CSV, Excel, and PDF files together.
                Our AI engine intelligently analyzes schema relationships,
                semantic patterns, and enterprise document intelligence automatically.

              </p>

              {/* Upload Button */}

              <label className="mt-12 inline-block">

                <input

                  type="file"

                  multiple

                  accept=".csv,.xlsx,.pdf"

                  className="hidden"

                  onChange={(e) => onFilesUpload(e.target.files)}

                />

<div className={`rounded-3xl px-12 py-6 text-2xl font-black text-white shadow-2xl transition-all ${
  uploading

    ? 'bg-slate-400 cursor-not-allowed'

    : 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:scale-105 cursor-pointer'
}`}>
{
  uploading

    ? processing

      ? 'AI Processing...'

      : `Uploading ${uploadProgress}%`

    : 'Upload Documents'
}
                </div>

              </label>
              {/* UPLOAD PROGRESS */}

{uploading && (

  <div className="mt-10 max-w-2xl mx-auto">

    {/* PROGRESS BAR */}

    <div className="w-full h-5 bg-slate-200 rounded-full overflow-hidden">

      <div

        className="h-full bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 transition-all duration-300"

        style={{

          width: `${uploadProgress}%`
        }}

      />

    </div>

    {/* PROCESSING */}

    {processing && (

      <div className="flex items-center justify-center gap-3 mt-6">

        <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce" />

        <div className="w-4 h-4 rounded-full bg-violet-500 animate-bounce delay-150" />

        <div className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce delay-300" />

      </div>
    )}

  </div>
)}

              {/* File Types */}

              <div className="flex flex-wrap justify-center gap-5 mt-12">

                <div className="px-6 py-4 rounded-full bg-white shadow-lg font-bold text-slate-700">

                  PDF Documents

                </div>

                <div className="px-6 py-4 rounded-full bg-white shadow-lg font-bold text-slate-700">

                  CSV Datasets

                </div>

                <div className="px-6 py-4 rounded-full bg-white shadow-lg font-bold text-slate-700">

                  Excel Reports

                </div>

                <div className="px-6 py-4 rounded-full bg-white shadow-lg font-bold text-slate-700">

                  Multi-File Uploads

                </div>

              </div>

            </div>

          </div>

        </motion.div>

        {/* Features Section */}

        <div className="mt-28">

          <div className="text-center">

            <h2 className="text-5xl font-black text-slate-900">

              Enterprise AI Intelligence

            </h2>

            <p className="text-slate-500 text-xl mt-6 max-w-3xl mx-auto leading-relaxed">

              Unified analytics, conversational intelligence,
              semantic search, and adaptive dashboard generation.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

            {features.map((feature, index) => {

              const Icon = feature.icon

              return (

                <motion.div

                  key={index}

                  initial={{ opacity: 0, y: 20 }}

                  animate={{ opacity: 1, y: 0 }}

                  transition={{

                    duration: 0.5,

                    delay: index * 0.1,

                  }}

                  className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/40 hover:-translate-y-2 transition-all"

                >

                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-xl">

                    <Icon className="w-10 h-10 text-white" />

                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mt-8">

                    {feature.title}

                  </h3>

                  <p className="text-slate-600 mt-5 leading-relaxed">

                    {feature.description}

                  </p>

                </motion.div>

              )

            })}

          </div>

        </div>

      </div>
<ChatBar />
    </div>

  )
}