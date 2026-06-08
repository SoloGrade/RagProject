export default function WorkspaceTabs({

  activeTab,

  setActiveTab,

  workspaceType,

}) {

  // ---------------------------------------------------
  // DASHBOARD TABS
  // ---------------------------------------------------

  const dashboardTabs = [

    'AI Dashboard',

    'Dataset Preview',

    'Statistics',

    'Column Analysis',

    'AI Insights',
  ]

  // ---------------------------------------------------
  // DOCUMENT TABS
  // ---------------------------------------------------

  const documentTabs = [

    'AI Summary',

    'Document Intelligence',

    'Semantic Search',

    'AI Insights',
  ]

  // ---------------------------------------------------
  // HYBRID TABS
  // ---------------------------------------------------

  const hybridTabs = [

    'Dashboard',

    'Documents',

    'AI Insights',

    'Semantic Search',
  ]

  let tabs = []

  // ---------------------------------------------------
  // WORKSPACE TYPE
  // ---------------------------------------------------

  if (workspaceType === 'dashboard') {

    tabs = dashboardTabs
  }

  else if (workspaceType === 'documents') {

    tabs = documentTabs
  }

  else if (workspaceType === 'hybrid') {

    tabs = hybridTabs
  }

  return (

    <div className="flex flex-wrap gap-4 mt-10">

      {tabs.map((tab, index) => (

        <button

          key={index}

          onClick={() => setActiveTab(tab)}

          className={`

            px-7 py-4 rounded-2xl text-lg font-bold transition-all

            ${activeTab === tab

              ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-2xl'

              : 'bg-white/70 backdrop-blur-xl border border-white/40 text-slate-700 shadow-lg hover:shadow-xl'

            }

          `}

        >

          {tab}

        </button>

      ))}

    </div>

  )
}