# AI Car Price Prediction System

A machine learning project that predicts the price of a used car from its details like brand, year, fuel type, and kilometers driven.

## About the Project

Many people find it hard to know the right price of a used car. This project solves that problem. It learns from past car sales data and gives a price estimate in seconds.

## Features

- Cleans and prepares raw car data
- Explores the data with charts and simple statistics
- Creates new useful features from the data
- Trains and compares different ML models
- Predicts the car price from user input
- Simple API to get predictions

## Tech Stack

- **Language:** Python
- **Libraries:** Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn
- **API:** FastAPI
- **Tools:** Jupyter Notebook

## Project Steps

1. **Data Cleaning:** Remove missing values, fix wrong data, and handle outliers.
2. **EDA:** Study the data and find patterns using charts.
3. **Feature Engineering:** Create new columns like car age.
4. **Model Training:** Train models such as Linear Regression and Random Forest.
5. **Evaluation:** Check models using R2 score, MAE, and RMSE.
6. **Prediction:** Save the best model and use it to predict prices.

## Project Structure

```
AI-Car-Price-Prediction-System/
├── data/          # Dataset
├── notebooks/     # Jupyter notebooks (EDA and model training)
├── model/         # Saved model file
├── app.py         # FastAPI app
├── requirements.txt
└── README.md
```

## How to Run

1. Clone the repository

   ```bash
   git clone https://github.com/pratikkachhadiya05/AI-Car-Price-Prediction-System.git
   cd AI-Car-Price-Prediction-System
   ```

2. Install the requirements

   ```bash
   pip install -r requirements.txt
   ```

3. Start the API

   ```bash
   uvicorn app:app --reload
   ```

4. Open `http://127.0.0.1:8000/docs` in your browser and test the prediction.

## Example Input

```json
{
  "brand": "Honda",
  "year": 2018,
  "fuel_type": "Petrol",
  "km_driven": 40000
}
```

## Results

- Best model: [add model name]
- R2 Score: [add score]
- MAE: [add value]


## Author

**Pratik Kachhadiya**
GitHub: [pratikkachhadiya05](https://github.com/pratikkachhadiya05)
