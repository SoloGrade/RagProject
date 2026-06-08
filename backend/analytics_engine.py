import pandas as pd

import numpy as np

# ---------------------------------------------------
# ENTERPRISE AI CHART ENGINE
# ---------------------------------------------------

def generate_ai_charts(df):

    charts = []

    numeric_columns = []

    categorical_columns = []

    date_columns = []

    # ---------------------------------------------------
    # DETECT COLUMN TYPES
    # ---------------------------------------------------

    for column in df.columns:

        # DATE DETECTION

        try:

            parsed = pd.to_datetime(

                df[column],

                errors='coerce'
            )

            if parsed.notna().sum() > len(df) * 0.6:

                date_columns.append(column)

                continue

        except:

            pass

        # NUMERIC

        if pd.api.types.is_numeric_dtype(

            df[column]
        ):

            numeric_columns.append(column)

        else:

            categorical_columns.append(column)

    # ---------------------------------------------------
    # REMOVE HIGH CARDINALITY
    # ---------------------------------------------------

    filtered_categories = []

    for column in categorical_columns:

        unique_count = df[column].nunique()

        if unique_count <= 20:

            filtered_categories.append(column)

    # ---------------------------------------------------
    # BAR CHARTS
    # ---------------------------------------------------

    for category_col in filtered_categories[:3]:

        for value_col in numeric_columns[:3]:

            try:

                grouped = df.groupby(

                    category_col

                )[value_col].mean().reset_index()

                grouped = grouped.head(15)

                charts.append({

                    "chart_type": "bar",

                    "title": f"{value_col} by {category_col}",

                    "x": grouped[category_col]

                    .astype(str)

                    .tolist(),

                    "y": grouped[value_col]

                    .fillna(0)

                    .tolist(),
                })

            except Exception as e:

                print(

                    f"Bar Chart Error: {e}"
                )

    # ---------------------------------------------------
    # LINE CHARTS
    # ---------------------------------------------------

    for date_col in date_columns[:2]:

        for value_col in numeric_columns[:2]:

            try:

                temp_df = df.copy()

                temp_df[date_col] = pd.to_datetime(

                    temp_df[date_col],

                    errors='coerce'
                )

                grouped = temp_df.groupby(

                    date_col

                )[value_col].sum().reset_index()

                grouped = grouped.sort_values(

                    by=date_col
                )

                grouped = grouped.head(100)

                charts.append({

                    "chart_type": "line",

                    "title": f"{value_col} Trend",

                    "x": grouped[date_col]

                    .astype(str)

                    .tolist(),

                    "y": grouped[value_col]

                    .fillna(0)

                    .tolist(),
                })

            except Exception as e:

                print(

                    f"Line Chart Error: {e}"
                )

    # ---------------------------------------------------
    # HISTOGRAMS
    # ---------------------------------------------------

    for column in numeric_columns[:3]:

        try:

            charts.append({

                "chart_type": "histogram",

                "title": f"Distribution of {column}",

                "x": df[column]

                .dropna()

                .head(1000)

                .tolist(),

                "y": [],
            })

        except Exception as e:

            print(

                f"Histogram Error: {e}"
            )

    # ---------------------------------------------------
    # PIE CHARTS
    # ---------------------------------------------------

    for category_col in filtered_categories[:2]:

        try:

            counts = df[category_col].value_counts().head(10)

            charts.append({

                "chart_type": "pie",

                "title": f"{category_col} Distribution",

                "x": counts.index.astype(str).tolist(),

                "y": counts.values.tolist(),
            })

        except Exception as e:

            print(

                f"Pie Chart Error: {e}"
            )

    return charts

# ---------------------------------------------------
# AI INSIGHTS
# ---------------------------------------------------

def generate_ai_insights(df, numeric_columns):

    insights = []

    for column in numeric_columns[:5]:

        try:

            mean_value = df[column].mean()

            max_value = df[column].max()

            min_value = df[column].min()

            insights.append(

                f"{column} has an average value of {round(mean_value, 2)}."
            )

            insights.append(

                f"Highest {column} observed is {round(max_value, 2)}."
            )

            insights.append(

                f"Lowest {column} observed is {round(min_value, 2)}."
            )

        except:

            pass

    return insights[:10]

# ---------------------------------------------------
# ANOMALY DETECTION
# ---------------------------------------------------

def detect_anomalies(df, numeric_columns):

    anomalies = []

    for column in numeric_columns[:5]:

        try:

            mean = df[column].mean()

            std = df[column].std()

            threshold = mean + (2 * std)

            outliers = df[

                df[column] > threshold
            ]

            if len(outliers) > 0:

                anomalies.append(

                    f"{len(outliers)} potential outliers detected in {column}."
                )

        except:

            pass

    return anomalies

# ---------------------------------------------------
# CORRELATIONS
# ---------------------------------------------------

def generate_correlations(df, numeric_columns):

    correlations = []

    if len(numeric_columns) < 2:

        return correlations

    try:

        corr_matrix = df[

            numeric_columns
        ].corr()

        for col1 in numeric_columns:

            for col2 in numeric_columns:

                if col1 != col2:

                    corr = corr_matrix.loc[col1, col2]

                    if abs(corr) > 0.7:

                        correlations.append(

                            f"{col1} and {col2} are strongly correlated ({round(corr,2)})."
                        )

    except:

        pass

    return list(set(correlations))[:10]

# ---------------------------------------------------
# KPI CARDS
# ---------------------------------------------------

def generate_kpis(df, numeric_columns):

    kpis = []

    for column in numeric_columns[:4]:

        try:

            kpis.append({

                "title": column,

                "value": round(

                    float(df[column].sum()),

                    2
                ),

                "average": round(

                    float(df[column].mean()),

                    2
                )
            })

        except:

            pass

    return kpis

# ---------------------------------------------------
# ANALYZE DATASET
# ---------------------------------------------------

def analyze_dataset(file_path):

    # ---------------------------------------------------
    # LOAD DATAFRAME
    # ---------------------------------------------------

    if file_path.endswith(".csv"):

        df = pd.read_csv(file_path)

    elif file_path.endswith(".xlsx"):

        df = pd.read_excel(file_path)

    else:

        return None

    # ---------------------------------------------------
    # BASIC METRICS
    # ---------------------------------------------------

    rows = df.shape[0]

    columns = df.shape[1]

    # ---------------------------------------------------
    # COLUMN TYPES
    # ---------------------------------------------------

    numeric_columns = []

    categorical_columns = []

    for column in df.columns:

        if pd.api.types.is_numeric_dtype(

            df[column]
        ):

            numeric_columns.append(column)

        else:

            categorical_columns.append(column)

    # ---------------------------------------------------
    # PREVIEW DATA
    # ---------------------------------------------------

    preview_data = df.head(

        10

    ).fillna("").to_dict(

        orient="records"
    )

    # ---------------------------------------------------
    # STATISTICS
    # ---------------------------------------------------

    statistics = {}

    for column in numeric_columns:

        try:

            statistics[column] = {

                "mean": float(

                    df[column].mean()
                ),

                "max": float(

                    df[column].max()
                ),

                "min": float(

                    df[column].min()
                ),
            }

        except Exception as e:

            print(

                f"Statistics Error: {e}"
            )

    # ---------------------------------------------------
    # AI FEATURES
    # ---------------------------------------------------

    ai_insights = generate_ai_insights(

        df,

        numeric_columns
    )

    anomalies = detect_anomalies(

        df,

        numeric_columns
    )

    correlations = generate_correlations(

        df,

        numeric_columns
    )

    kpis = generate_kpis(

        df,

        numeric_columns
    )

    # ---------------------------------------------------
    # GENERATE CHARTS
    # ---------------------------------------------------

    charts = generate_ai_charts(df)

    # ---------------------------------------------------
    # FINAL RESPONSE
    # ---------------------------------------------------

    return {

        "rows": rows,

        "columns": columns,

        "numeric_columns": len(numeric_columns),

        "categorical_columns": categorical_columns,

        "preview_data": preview_data,

        "statistics": statistics,

        "charts": charts,

        "ai_insights": ai_insights,

        "anomalies": anomalies,

        "correlations": correlations,

        "kpis": kpis,
    }