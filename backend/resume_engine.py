import re

# ---------------------------------------------------
# COMMON TECH SKILLS
# ---------------------------------------------------

COMMON_SKILLS = [

    "python",

    "java",

    "c++",

    "javascript",

    "react",

    "node.js",

    "fastapi",

    "django",

    "flask",

    "sql",

    "mongodb",

    "machine learning",

    "deep learning",

    "ai",

    "data science",

    "power bi",

    "excel",

    "tableau",

    "html",

    "css",

    "aws",

    "azure",

    "docker",

    "kubernetes",

    "git",

    "linux",
]

# ---------------------------------------------------
# DETECT RESUME
# ---------------------------------------------------

def is_resume(text):

    resume_keywords = [

        "education",

        "experience",

        "skills",

        "projects",

        "certifications",

        "resume",

        "work experience",
    ]

    text_lower = text.lower()

    score = 0

    for keyword in resume_keywords:

        if keyword in text_lower:

            score += 1

    return score >= 2

# ---------------------------------------------------
# EXTRACT SKILLS
# ---------------------------------------------------

def extract_skills(text):

    text_lower = text.lower()

    found_skills = []

    for skill in COMMON_SKILLS:

        pattern = r'\b' + re.escape(skill) + r'\b'

        if re.search(pattern, text_lower):

            found_skills.append(skill)

    return sorted(

        list(set(found_skills))
    )

# ---------------------------------------------------
# RESUME ANALYSIS
# ---------------------------------------------------

def analyze_resume(

    filename,

    text
):

    skills = extract_skills(text)

    return {

        "filename": filename,

        "is_resume": True,

        "skills": skills,

        "skills_count": len(skills),
    }