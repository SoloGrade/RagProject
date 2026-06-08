import { useState } from 'react'

import LandingPage from './pages/LandingPage'

import DashboardWorkspace from './components/DashboardWorkspace'

import DocumentWorkspace from './components/DocumentWorkspace'

import HybridWorkspace from './components/HybridWorkspace'

import Sidebar from './components/Sidebar'

import ChatBar from './components/ChatBar'

import { uploadFiles } from './services/fileService'

export default function App() {

  // ---------------------------------------------------
  // WORKSPACES
  // ---------------------------------------------------

  const [workspaces, setWorkspaces] =
    useState([])

  // ---------------------------------------------------
  // ACTIVE WORKSPACE
  // ---------------------------------------------------

  const [activeWorkspaceId, setActiveWorkspaceId] = useState(null)

  // ---------------------------------------------------
  // LOADING
  // ---------------------------------------------------

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [processing, setProcessing] = useState(false)
  // ---------------------------------------------------
  // HANDLE FILE UPLOADS
  // ---------------------------------------------------

  const handleFiles = async (files) => {

  const fileArray =
    Array.from(files)

  // ---------------------------------------------------
  // START UPLOAD
  // ---------------------------------------------------

  setUploading(true)

  setUploadProgress(0)

  setProcessing(false)

  try {

    // ---------------------------------------------------
    // WORKSPACE ID
    // ---------------------------------------------------

    const workspaceId =
      Date.now().toString()

    // ---------------------------------------------------
    // BACKEND UPLOAD
    // ---------------------------------------------------

    const response =
      await uploadFiles(

        files,

        workspaceId,

        (progress) => {

          setUploadProgress(
            progress
          )
        }
      )

    // ---------------------------------------------------
    // AI PROCESSING
    // ---------------------------------------------------

    setProcessing(true)

    console.log(
      'Backend Upload Response:',
      response
    )

    // ---------------------------------------------------
    // FILE TYPE DETECTION
    // ---------------------------------------------------

    const hasSpreadsheet =
      fileArray.some(file =>

        file.name.endsWith('.csv') ||

        file.name.endsWith('.xlsx')
      )

    const hasDocuments =
      fileArray.some(file =>

        file.name.endsWith('.pdf')
      )

    let workspaceType =
      'dashboard'

    if (
      hasSpreadsheet &&
      hasDocuments
    ) {

      workspaceType =
        'hybrid'
    }

    else if (
      hasDocuments
    ) {

      workspaceType =
        'documents'
    }

    // ---------------------------------------------------
    // CREATE WORKSPACE
    // ---------------------------------------------------

    const newWorkspace = {

      id: workspaceId,

      title:
        fileArray[0]?.name ||

        'Untitled Workspace',

      workspaceType,

      uploadedFiles:
        fileArray,

      analysisData:
        response.dataset_analysis || [],

      documentAnalysis:
        response.document_analysis || {},

      chatHistory: [],
    }

    // ---------------------------------------------------
    // SAVE WORKSPACE
    // ---------------------------------------------------

    setWorkspaces(prev => [

      newWorkspace,

      ...prev,
    ])

    // ---------------------------------------------------
    // ACTIVE WORKSPACE
    // ---------------------------------------------------

    setActiveWorkspaceId(
      workspaceId
    )

    // ---------------------------------------------------
    // FINISH
    // ---------------------------------------------------

    setTimeout(() => {

      setProcessing(false)

      setUploading(false)

    }, 1200)

  }

  catch (error) {

    console.error(
      'Upload Failed:',
      error
    )

    setUploading(false)

    setProcessing(false)
  }
}

  // ---------------------------------------------------
  // ACTIVE WORKSPACE OBJECT
  // ---------------------------------------------------

  const activeWorkspace =
    workspaces.find(

      workspace =>

        workspace.id ===
        activeWorkspaceId
    )

  // ---------------------------------------------------
  // GO HOME
  // ---------------------------------------------------

  const goHome = () => {

    setActiveWorkspaceId(null)
  }

  return (

    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* --------------------------------------------------- */}
      {/* SIDEBAR */}
      {/* --------------------------------------------------- */}

      <Sidebar

        workspaces={workspaces}

        activeWorkspaceId={
          activeWorkspaceId
        }

        setActiveWorkspaceId={
          setActiveWorkspaceId
        }

        goHome={goHome}

      />

      {/* --------------------------------------------------- */}
      {/* MAIN CONTENT */}
      {/* --------------------------------------------------- */}

      <div className="flex-1 overflow-y-auto">

        <div className="max-w-7xl mx-auto px-6 py-8 pb-40">

          {/* --------------------------------------------------- */}
          {/* LANDING PAGE */}
          {/* --------------------------------------------------- */}

          {!activeWorkspace && (

<LandingPage

  onFilesUpload={handleFiles}

  uploading={uploading}

  uploadProgress={uploadProgress}

  processing={processing}

/>
          )}

          {/* --------------------------------------------------- */}
          {/* DASHBOARD */}
          {/* --------------------------------------------------- */}

          {activeWorkspace?.workspaceType ===
            'dashboard' && (

            <DashboardWorkspace

              analysisData={
                activeWorkspace.analysisData
              }

            />
          )}

          {/* --------------------------------------------------- */}
          {/* DOCUMENTS */}
          {/* --------------------------------------------------- */}

          {activeWorkspace?.workspaceType ===
            'documents' && (
<DocumentWorkspace

  uploadedFiles={
    activeWorkspace.uploadedFiles
  }

  documentAnalysis={
    activeWorkspace.documentAnalysis
  }

/>
          )}

          {/* --------------------------------------------------- */}
          {/* HYBRID */}
          {/* --------------------------------------------------- */}

          {activeWorkspace?.workspaceType ===
            'hybrid' && (

<HybridWorkspace

  uploadedFiles={
    activeWorkspace.uploadedFiles
  }

  analysisData={
    activeWorkspace.analysisData
  }

  documentAnalysis={
    activeWorkspace.documentAnalysis
  }

/>
          )}

        </div>

        {/* --------------------------------------------------- */}
        {/* CHATBAR */}
        {/* --------------------------------------------------- */}

<ChatBar

  activeWorkspaceId={
    activeWorkspaceId
  }

  activeWorkspace={
    activeWorkspace
  }

  workspaces={
    workspaces
  }

  setWorkspaces={
    setWorkspaces
  }

/>

      </div>

    </div>
  )
}