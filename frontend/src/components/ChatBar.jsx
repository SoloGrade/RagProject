import {

  useState,

  useRef,

  useEffect

} from 'react'

import axios from 'axios'

export default function ChatBar({

  activeWorkspaceId,

  activeWorkspace,

  workspaces,

  setWorkspaces,
}) {

  // ---------------------------------------------------
  // STATES
  // ---------------------------------------------------

  const [message, setMessage] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [chatOpen, setChatOpen] =
    useState(false)

  // ---------------------------------------------------
  // WORKSPACE CHAT HISTORY
  // ---------------------------------------------------

  const messages =

    activeWorkspace?.chatHistory || []

  // ---------------------------------------------------
  // AUTO SCROLL
  // ---------------------------------------------------

  const messagesEndRef =
    useRef(null)

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({

      behavior: 'smooth'
    })

  }, [messages])

  // ---------------------------------------------------
  // SEND MESSAGE
  // ---------------------------------------------------

  const sendMessage = async () => {

    if (!message.trim()) return

    // ---------------------------------------------------
    // VALIDATE WORKSPACE
    // ---------------------------------------------------

    if (!activeWorkspaceId) {

      alert(

        'Please open a workspace first.'
      )

      return
    }

    // ---------------------------------------------------
    // USER MESSAGE
    // ---------------------------------------------------

    const userMessage = {

      role: 'user',

      content: message,
    }

    // ---------------------------------------------------
    // SAVE USER MESSAGE
    // ---------------------------------------------------

    setWorkspaces(prev =>

      prev.map(workspace => {

        if (

          workspace.id ===

          activeWorkspaceId
        ) {

          return {

            ...workspace,

            chatHistory: [

              ...workspace.chatHistory,

              userMessage,
            ],
          }
        }

        return workspace
      })
    )

    setLoading(true)

    try {

      // ---------------------------------------------------
      // SEND TO BACKEND
      // ---------------------------------------------------

      const response =
        await axios.post(

          'http://127.0.0.1:8000/chat',

          {

            workspace_id:

              activeWorkspaceId,

            message,
          }
        )

      console.log(

        'CHAT RESPONSE:',

        response
      )

      // ---------------------------------------------------
      // AI MESSAGE
      // ---------------------------------------------------

      const aiMessage = {

        role: 'assistant',

        content:

          response?.data?.response ||

          'AI response failed.',
      }

      // ---------------------------------------------------
      // SAVE AI MESSAGE
      // ---------------------------------------------------

      setWorkspaces(prev =>

        prev.map(workspace => {

          if (

            workspace.id ===

            activeWorkspaceId
          ) {

            return {

              ...workspace,

              chatHistory: [

                ...workspace.chatHistory,

                aiMessage,
              ],
            }
          }

          return workspace
        })
      )

    }

    catch (error) {

      console.error(error)

    }

    setMessage('')

    setLoading(false)
  }

  return (

    <>

      {/* --------------------------------------------------- */}
      {/* FLOATING AI BUTTON */}
      {/* --------------------------------------------------- */}

      {!chatOpen && (

        <button

          onClick={() => setChatOpen(true)}

          className="fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-2xl text-4xl hover:scale-110 transition-all flex items-center justify-center"

        >

          🤖

        </button>

      )}

      {/* --------------------------------------------------- */}
      {/* CHAT PANEL */}
      {/* --------------------------------------------------- */}

      {chatOpen && (

        <div

          className="

            fixed z-50

            bottom-6 right-6

            w-[95vw] sm:w-[420px] lg:w-[500px]

            h-[85vh] sm:h-[720px]

            bg-white/95 backdrop-blur-2xl

            rounded-[36px]

            shadow-2xl

            border border-white/40

            flex flex-col

            overflow-hidden

          "

        >

          {/* --------------------------------------------------- */}
          {/* HEADER */}
          {/* --------------------------------------------------- */}

          <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">

            <div>

              <h2 className="text-2xl font-black">

                AI Chat

              </h2>

              <p className="text-sm opacity-80 mt-1">

                {

                  activeWorkspace?.title ||

                  'Workspace-aware intelligence'
                }

              </p>

            </div>

            {/* CLOSE BUTTON */}

            <button

              onClick={() => setChatOpen(false)}

              className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-red-500 transition-all text-xl"

            >

              ✕

            </button>

          </div>

          {/* --------------------------------------------------- */}
          {/* CHAT HISTORY */}
          {/* --------------------------------------------------- */}

          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50">

            {/* EMPTY STATE */}

            {messages.length === 0 && (

              <div className="h-full flex flex-col items-center justify-center text-center px-8">

                <div className="text-7xl mb-6">

                  🤖

                </div>

                <h3 className="text-3xl font-black text-slate-900">

                  Enterprise AI Assistant

                </h3>

                <p className="text-slate-500 mt-4 leading-relaxed">

                  Ask questions about dashboards,

                  reports, PDFs, analytics,

                  resumes, and uploaded documents.

                </p>

              </div>

            )}

            {/* MESSAGES */}

            {messages.map((msg, index) => (

              <div

                key={index}

                className={`

                  max-w-[88%]

                  p-5 rounded-[28px]

                  shadow-lg

                  text-sm leading-relaxed

                  whitespace-pre-wrap

                  ${msg.role === 'user'

                    ? 'bg-indigo-600 text-white ml-auto'

                    : 'bg-white text-slate-800 mr-auto'

                  }

                `}

              >

                {msg.content}

              </div>

            ))}

            {/* LOADING */}

            {loading && (

              <div className="bg-white p-5 rounded-[28px] shadow-lg w-fit">

                <div className="flex items-center gap-3">

                  <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce">

                  </div>

                  <div className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce delay-100">

                  </div>

                  <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce delay-200">

                  </div>

                </div>

              </div>

            )}

            {/* AUTO SCROLL */}

            <div ref={messagesEndRef} />

          </div>

          {/* --------------------------------------------------- */}
          {/* INPUT AREA */}
          {/* --------------------------------------------------- */}

          <div className="p-5 border-t border-slate-200 bg-white">

            <div className="flex items-end gap-4">

              {/* INPUT */}

              <textarea

                placeholder="Ask AI about current workspace..."

                value={message}

                onChange={(e) => setMessage(e.target.value)}

                onKeyDown={(e) => {

                  if (

                    e.key === 'Enter' &&

                    !e.shiftKey
                  ) {

                    e.preventDefault()

                    sendMessage()
                  }
                }}

                rows={2}

                className="

                  flex-1

                  resize-none

                  rounded-3xl

                  border border-slate-200

                  px-6 py-4

                  text-slate-700

                  outline-none

                  focus:border-indigo-500

                  bg-slate-50

                "

              />

              {/* SEND */}

              <button

                onClick={sendMessage}

                className="

                  w-16 h-16

                  rounded-3xl

                  bg-gradient-to-r

                  from-indigo-600

                  to-cyan-500

                  text-white

                  text-2xl

                  shadow-xl

                  hover:scale-105

                  transition-all

                "

              >

                ↑

              </button>

            </div>

          </div>

        </div>

      )}

    </>

  )
}