from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_community.vectorstores import FAISS

from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_core.documents import Document

from pypdf import PdfReader

import pandas as pd

import re

from collections import Counter

# ---------------------------------------------------
# LOAD PDF
# ---------------------------------------------------

def extract_pdf_text(file_path):

    text = ""

    pdf = PdfReader(file_path)

    for page in pdf.pages:

        extracted = page.extract_text()

        if extracted:

            text += extracted + "\n"

    return text

# ---------------------------------------------------
# LOAD CSV / EXCEL
# ---------------------------------------------------

def extract_table_text(file_path):

    if file_path.endswith(".csv"):

        df = pd.read_csv(file_path)

    elif file_path.endswith(".xlsx"):

        df = pd.read_excel(file_path)

    else:

        return ""

    return df.to_string()

# ---------------------------------------------------
# UNIVERSAL TEXT EXTRACTOR
# ---------------------------------------------------

def extract_text(file_path):

    if file_path.endswith(".pdf"):

        return extract_pdf_text(file_path)

    if (

        file_path.endswith(".csv")

        or

        file_path.endswith(".xlsx")
    ):

        return extract_table_text(file_path)

    return ""

# ---------------------------------------------------
# CREATE VECTOR STORE
# ---------------------------------------------------

def create_vector_store(file_path):

    text = extract_text(file_path)

    splitter = RecursiveCharacterTextSplitter(

        chunk_size=1000,

        chunk_overlap=200
    )

    chunks = splitter.split_text(text)

    documents = [

        Document(page_content=chunk)

        for chunk in chunks
    ]

    embeddings = HuggingFaceEmbeddings(

        model_name='sentence-transformers/all-MiniLM-L6-v2'
    )

    vector_store = FAISS.from_documents(

        documents,

        embeddings
    )

    return vector_store

# ---------------------------------------------------
# SEARCH VECTOR STORE
# ---------------------------------------------------

def search_documents(

    vector_store,

    query
):

    results = vector_store.similarity_search(

        query,

        k=4
    )

    return [

        doc.page_content

        for doc in results
    ]

# ---------------------------------------------------
# CLEAN TEXT
# ---------------------------------------------------

def clean_text(text):

    text = text.replace("\n", " ")

    text = re.sub(r"\s+", " ", text)

    return text.strip()

# ---------------------------------------------------
# GENERATE DOCUMENT SUMMARY
# ---------------------------------------------------

def generate_document_summary(text):

    text = clean_text(text)

    short_text = text[:6000]

    sentences = short_text.split(".")

    sentences = [

        s.strip()

        for s in sentences

        if len(s.strip()) > 20
    ]

    if not sentences:

        return "No meaningful summary could be generated."

    summary = ". ".join(

        sentences[:10]
    )

    return summary + "."

# ---------------------------------------------------
# EXTRACT KEY INSIGHTS
# ---------------------------------------------------

def extract_key_insights(text):

    insights = []

    lines = text.split("\n")

    for line in lines:

        line = line.strip()

        if (

            len(line) > 80

            and

            len(line) < 300
        ):

            insights.append(line)

        if len(insights) >= 5:

            break

    return insights

# ---------------------------------------------------
# EXTRACT TOPICS
# ---------------------------------------------------

def extract_topics(text):

    words = re.findall(

        r'\b[A-Za-z]{5,}\b',

        text.lower()
    )

    stop_words = {

        'which', 'their', 'there',

        'about', 'would', 'could',

        'should', 'these', 'those',

        'where', 'while', 'using',

        'document', 'analysis',

        'system', 'platform'
    }

    filtered_words = [

        word

        for word in words

        if word not in stop_words
    ]

    common_words = Counter(

        filtered_words
    ).most_common(10)

    return [

        word

        for word, count in common_words
    ]

# ---------------------------------------------------
# EXTRACT ENTITIES
# ---------------------------------------------------

def extract_entities(text):

    entities = {

        "emails": [],

        "phone_numbers": [],

        "dates": [],
    }

    # EMAILS

    emails = re.findall(

        r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}',

        text
    )

    # PHONES

    phones = re.findall(

        r'\+?\d[\d\s\-]{8,}\d',

        text
    )

    # DATES

    dates = re.findall(

        r'\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})\b',

        text,

        re.IGNORECASE
    )

    entities["emails"] = list(set(emails))[:10]

    entities["phone_numbers"] = list(set(phones))[:10]

    entities["dates"] = list(set(dates))[:10]

    return entities

# ---------------------------------------------------
# RESUME SKILLS
# ---------------------------------------------------

def extract_resume_skills(text):

    if not text:

        return []

    skill_keywords = [

        # LANGUAGES

        "Python",
        "Java",
        "C",
        "C++",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",

        # FRONTEND

        "React",
        "Angular",
        "Vue",

        # BACKEND

        "FastAPI",
        "Django",
        "Flask",
        "Node.js",
        "Spring Boot",
        "REST API",

        # DATABASES

        "SQL",
        "MySQL",
        "PostgreSQL",
        "MongoDB",

        # DATA / AI

        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "NLP",
        "AI",
        "Data Science",
        "Pandas",
        "NumPy",

        # CLOUD

        "AWS",
        "Azure",
        "GCP",
        "Docker",
        "Kubernetes",

        # ANALYTICS

        "Power BI",
        "Excel",
        "Tableau",

        # DEVOPS

        "Git",
        "Linux",
        "CI/CD",

        # SOFT SKILLS

        "Communication",
        "Leadership",
        "Problem Solving",
    ]

    detected_skills = []

    lower_text = text.lower()

    for skill in skill_keywords:

        if skill.lower() in lower_text:

            detected_skills.append(skill)

    return list(set(detected_skills))

# ---------------------------------------------------
# EXPERIENCE EXTRACTION
# ---------------------------------------------------

def extract_experience(text):

    if not text:

        return {

            "level": "Unknown",

            "years": "Unknown",

            "details":

            "No experience information found."
        }

    lower_text = text.lower()

    # -----------------------------------------
    # YEARS EXPERIENCE
    # -----------------------------------------

    experience_patterns = re.findall(

        r'(\d+)\+?\s*(years|year)',

        lower_text
    )

    if experience_patterns:

        years = experience_patterns[0][0]

        return {

            "level": "Experienced",

            "years": f"{years}+ Years",

            "details":

            f"Candidate has approximately {years}+ years of experience."
        }

    # -----------------------------------------
    # FRESHER DETECTION
    # -----------------------------------------

    fresher_keywords = [

        "fresher",
        "entry level",
        "recent graduate",
    ]

    for keyword in fresher_keywords:

        if keyword in lower_text:

            return {

                "level": "Fresher",

                "years": "0 Years",

                "details":

                "Entry level / fresher candidate detected."
            }

    # -----------------------------------------
    # INTERNSHIP DETECTION
    # -----------------------------------------

    if (

        "internship" in lower_text

        or

        "intern" in lower_text
    ):

        return {

            "level": "Internship Experience",

            "years": "Internship",

            "details":

            "Candidate has internship experience."
        }

    return {

        "level": "Unknown",

        "years": "Unknown",

        "details":

        "Experience information unavailable."
    }

# ---------------------------------------------------
# RESUME RECOMMENDATIONS
# ---------------------------------------------------

def generate_resume_recommendations(

    skills,

    experience
):

    recommendations = []

    # -----------------------------------------
    # SKILL GAPS
    # -----------------------------------------

    if len(skills) < 5:

        recommendations.append(

            "Add more technical skills to strengthen the resume."
        )

    if "Python" not in skills:

        recommendations.append(

            "Learning Python can improve backend and AI opportunities."
        )

    if "SQL" not in skills:

        recommendations.append(

            "Database knowledge like SQL is highly recommended."
        )

    if "Git" not in skills:

        recommendations.append(

            "Version control tools like Git can improve software engineering readiness."
        )

    # -----------------------------------------
    # EXPERIENCE
    # -----------------------------------------

    if experience["level"] == "Fresher":

        recommendations.append(

            "Add academic projects and internships to strengthen fresher profile."
        )

    if experience["level"] == "Internship Experience":

        recommendations.append(

            "Highlight internship achievements with measurable impact."
        )

    # -----------------------------------------
    # STRONG PROFILE
    # -----------------------------------------

    if (

        len(skills) >= 8

        and

        experience["level"] == "Experienced"
    ):

        recommendations.append(

            "Resume profile appears technically strong and industry-ready."
        )

    return recommendations