export default function Sidebar({

  workspaces,

  activeWorkspaceId,

  setActiveWorkspaceId,

  goHome,
}) {

  return (

    <div className="w-[320px] bg-white border-r border-slate-200 h-screen overflow-y-auto p-6 flex flex-col">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-black text-slate-900">

          AI Workspace

        </h1>

        <p className="text-slate-500 mt-2">

          Enterprise Analytics Platform

        </p>

      </div>

      {/* HOME BUTTON */}

      <button

        onClick={goHome}

        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-4 rounded-2xl font-bold mb-8"

      >

        + New Workspace

      </button>

      {/* WORKSPACES */}

      <div className="space-y-4">

        {workspaces.map((workspace) => (

          <button

            key={workspace.id}

            onClick={() =>

              setActiveWorkspaceId(

                workspace.id
              )
            }

            className={`w-full text-left p-5 rounded-2xl transition-all border ${
              activeWorkspaceId === workspace.id

                ? 'bg-indigo-50 border-indigo-400'

                : 'bg-slate-50 border-transparent'
            }`}
          >

            <h2 className="font-bold text-slate-900 text-lg">

              {workspace.title}

            </h2>

            <p className="text-slate-500 text-sm mt-1 capitalize">

              {workspace.workspaceType}

            </p>

          </button>
        ))}

      </div>

    </div>
  )
}