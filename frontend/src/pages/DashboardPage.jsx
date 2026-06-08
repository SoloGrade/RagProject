export default function DashboardPage({ uploadedFiles }) {

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-cyan-50 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black text-slate-900">

          AI Analytics Dashboard

        </h1>

        <p className="text-slate-500 text-lg mt-4">

          Intelligent analytics generated from uploaded files.

        </p>

        {/* Uploaded Files */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">

          {uploadedFiles.map((file, index) => (

            <div

              key={index}

              className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40"

            >

              <h2 className="text-xl font-black text-slate-900">

                {file.name}

              </h2>

              <p className="text-slate-500 mt-3">

                {(file.size / 1024).toFixed(2)} KB

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}