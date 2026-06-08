from fastapi import FastAPI, UploadFile, File, Form

from fastapi.middleware.cors import CORSMiddleware

import os

import pandas as pd

#from backend.analytics_engine import analyze_dataset
from analytics_engine import analyze_dataset


#from backend.rag_engine import (
from rag_engine import (


    create_vector_store,

    search_documents,

    extract_text,

    generate_document_summary,

    extract_key_insights,

    extract_topics,

    extract_entities,

    extract_resume_skills,

    extract_experience,

    generate_resume_recommendations,
)

# ---------------------------------------------------
# FASTAPI APP
# ---------------------------------------------------

app = FastAPI()
app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "https://rag-project-gold.vercel.app",

        "http://localhost:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)
# ---------------------------------------------------
# WORKSPACE MEMORY
# ---------------------------------------------------

workspace_memory = {}

# ---------------------------------------------------
# ENABLE CORS
# ---------------------------------------------------

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ---------------------------------------------------
# ROOT API
# ---------------------------------------------------

@app.get("/")

def home():

    return {

        "message":

        "Enterprise AI Platform Backend Running"
    }

# ---------------------------------------------------
# FILE UPLOAD API
# ---------------------------------------------------

@app.post("/upload")

async def upload_files(

    workspace_id: str = Form(...),

    files: list[UploadFile] = File(...)
):

    uploaded_files = []

    dataset_analysis = []

    # ---------------------------------------------------
    # TEMP DIRECTORY
    # ---------------------------------------------------

    os.makedirs(

        "temp",

        exist_ok=True
    )

    # ---------------------------------------------------
    # INITIALIZE WORKSPACE
    # ---------------------------------------------------

    if workspace_id not in workspace_memory:

        workspace_memory[workspace_id] = {

            "vector_stores": {},

            "document_analysis": {},

            "dataset_context": [],

            "uploaded_files": [],
        }

    # ---------------------------------------------------
    # PROCESS FILES
    # ---------------------------------------------------

    for file in files:

        file_path = os.path.join(

            "temp",

            file.filename
        )

        # ---------------------------------------------------
        # SAVE FILE
        # ---------------------------------------------------

        with open(file_path, "wb") as f:

            content = await file.read()

            f.write(content)

        # ---------------------------------------------------
        # STORE FILE INFO
        # ---------------------------------------------------

        uploaded_files.append({

            "filename": file.filename,

            "path": file_path,

            "content_type": file.content_type,
        })

        # ---------------------------------------------------
        # VECTOR STORE
        # ---------------------------------------------------

        try:

            vector_store = create_vector_store(

                file_path
            )

            workspace_memory[workspace_id][

                "vector_stores"

            ][file.filename] = vector_store

        except Exception as e:

            print(

                f"Vector Store Error: {e}"
            )

        # ---------------------------------------------------
        # DOCUMENT ANALYSIS
        # ---------------------------------------------------

        try:

            extracted_text = extract_text(

                file_path
            )

            # ---------------------------------------------
            # SUMMARY
            # ---------------------------------------------

            summary = generate_document_summary(

                extracted_text
            )

            # ---------------------------------------------
            # INSIGHTS
            # ---------------------------------------------

            insights = extract_key_insights(

                extracted_text
            )

            # ---------------------------------------------
            # TOPICS
            # ---------------------------------------------

            topics = extract_topics(

                extracted_text
            )

            # ---------------------------------------------
            # ENTITIES
            # ---------------------------------------------

            entities = extract_entities(

                extracted_text
            )

            # ---------------------------------------------
            # SKILLS
            # ---------------------------------------------

            skills = extract_resume_skills(

                extracted_text
            )

            # ---------------------------------------------
            # EXPERIENCE
            # ---------------------------------------------

            experience = extract_experience(

                extracted_text
            )

            # ---------------------------------------------
            # RECOMMENDATIONS
            # ---------------------------------------------

            recommendations = generate_resume_recommendations(

                skills,

                experience
            )

            # ---------------------------------------------
            # STORE ANALYSIS
            # ---------------------------------------------

            workspace_memory[workspace_id][

                "document_analysis"

            ][file.filename] = {

                "summary": summary,

                "insights": insights,

                "topics": topics,

                "entities": entities,

                "skills": skills,

                "experience": experience,

                "recommendations": recommendations,
            }

        except Exception as e:

            print(

                f"Document Analysis Error: {e}"
            )

        # ---------------------------------------------------
        # CSV / EXCEL ANALYSIS
        # ---------------------------------------------------

        if (

            file.filename.endswith(".csv")

            or

            file.filename.endswith(".xlsx")

        ):

            try:

                # -----------------------------------------
                # DATASET ANALYTICS
                # -----------------------------------------

                analysis = analyze_dataset(

                    file_path
                )

                if analysis:

                    dataset_analysis.append({

                        "filename": file.filename,

                        "analysis": analysis,
                    })

                # -----------------------------------------
                # LOAD DATAFRAME
                # -----------------------------------------

                if file.filename.endswith(".csv"):

                    df = pd.read_csv(file_path)

                else:

                    df = pd.read_excel(file_path)

                # -----------------------------------------
                # COLUMN TYPES
                # -----------------------------------------

                numeric_columns = list(

                    df.select_dtypes(

                        include=['number']

                    ).columns
                )

                categorical_columns = list(

                    df.select_dtypes(

                        exclude=['number']

                    ).columns
                )

                # -----------------------------------------
                # STORE DATASET CONTEXT
                # -----------------------------------------

                workspace_memory[workspace_id][

                    "dataset_context"

                ].append({

                    "filename": file.filename,

                    "rows": len(df),

                    "columns": list(df.columns),

                    "numeric_columns":

                        numeric_columns,

                    "categorical_columns":

                        categorical_columns,

                    "sample_data":

                        df.head(5).to_dict(),
                })

            except Exception as e:

                print(

                    f"Dataset Error: {e}"
                )

    # ---------------------------------------------------
    # FINAL RESPONSE
    # ---------------------------------------------------

    return {

        "success": True,

        "files": uploaded_files,

        "dataset_analysis": dataset_analysis,

        "document_analysis":

        workspace_memory[workspace_id][

            "document_analysis"
        ],
    }

# ---------------------------------------------------
# CHAT API
# ---------------------------------------------------

@app.post("/chat")

async def chat(payload: dict):

    workspace_id = payload.get(

        "workspace_id"
    )

    message = payload.get(

        "message",

        ""
    )

    # ---------------------------------------------------
    # VALIDATE WORKSPACE
    # ---------------------------------------------------

    if workspace_id not in workspace_memory:

        return {

            "response":

            "Workspace not found."
        }

    workspace = workspace_memory[

        workspace_id
    ]

    # ---------------------------------------------------
    # DOCUMENT SEARCH
    # ---------------------------------------------------

    retrieved_chunks = []

    for filename, vector_store in workspace[

        "vector_stores"

    ].items():

        try:

            results = search_documents(

                vector_store,

                message
            )

            retrieved_chunks.extend(results)

        except Exception as e:

            print(

                f"Search Error: {e}"
            )

    # ---------------------------------------------------
    # LIMIT CONTEXT
    # ---------------------------------------------------

    retrieved_chunks = retrieved_chunks[:5]

    combined_context = "\n\n".join(

        retrieved_chunks
    )

    # ---------------------------------------------------
    # DATASET CONTEXT
    # ---------------------------------------------------

    dataset_context = workspace.get(

        "dataset_context",

        []
    )

    # ---------------------------------------------------
    # RESPONSE ENGINE
    # ---------------------------------------------------

    response = ""

    # ---------------------------------------------------
    # ROW QUESTIONS
    # ---------------------------------------------------

    if "row" in message.lower():

        for dataset in dataset_context:

            response += f"""

Dataset:
{dataset['filename']}

This dataset contains

{dataset['rows']} rows.

"""

    # ---------------------------------------------------
    # COLUMN QUESTIONS
    # ---------------------------------------------------

    elif "column" in message.lower():

        for dataset in dataset_context:

            response += f"""

Dataset:
{dataset['filename']}

Columns available:

{", ".join(dataset['columns'])}

"""

    # ---------------------------------------------------
    # SUMMARY QUESTIONS
    # ---------------------------------------------------

    elif "summary" in message.lower():

        # ---------------------------------------------
        # DATASET SUMMARY
        # ---------------------------------------------

        if dataset_context:

            for dataset in dataset_context:

                response += f"""

Dataset Summary

Dataset Name:
{dataset['filename']}

This dataset contains

{dataset['rows']} rows

and

{len(dataset['columns'])} columns.

Main columns include:

{", ".join(dataset['columns'][:5])}

"""

        # ---------------------------------------------
        # DOCUMENT SUMMARY
        # ---------------------------------------------

        elif workspace["document_analysis"]:

            for filename, analysis in workspace[

                "document_analysis"

            ].items():

                response += f"""

Document:
{filename}

Summary:
{analysis['summary']}

Key Insights:
{analysis['insights']}

Topics:
{analysis['topics']}

Skills:
{analysis['skills']}

Experience:
{analysis['experience']}

Recommendations:
{analysis['recommendations']}

"""

        else:

            response = f"""

Relevant Context:

{combined_context[:3000]}

"""

    # ---------------------------------------------------
    # RESUME QUESTIONS
    # ---------------------------------------------------

    elif (

        "resume" in message.lower()

        or

        "skill" in message.lower()

        or

        "candidate" in message.lower()
    ):

        response = f"""

Resume Intelligence Results

Relevant Resume Information:

{combined_context[:3000]}

"""

    # ---------------------------------------------------
    # DEFAULT RESPONSE
    # ---------------------------------------------------

    else:

        response = f"""

Enterprise AI Assistant

Relevant Context:

{combined_context[:3000]}

"""

    # ---------------------------------------------------
    # FINAL RESPONSE
    # ---------------------------------------------------

    return {

        "response": response
    }