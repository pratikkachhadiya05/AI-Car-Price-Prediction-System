from flask import Flask, render_template, request
import pandas as pd
import pickle

app = Flask(__name__)

car = pd.read_csv('Datasets/Cleaned_car_price.csv')
model = pickle.load(open('LinearRegressionModel.pkl', 'rb'))


@app.route('/', methods=['GET', 'POST'])
def predict():
    companies = sorted(car['company'].unique())
    car_model = sorted(car['name'].unique())
    year = sorted(car['year'].unique(), reverse=True)
    kms_driven = sorted(car['kms_driven'].unique())
    fuel_type = car['fuel_type'].unique()

    predicted_price = None
    error = None

    # NOTE: keys match the <select>/<input> "name" attributes in predict.html
    selected = {
        'company': None,
        'car_model': None,
        'year': None,
        'kms_driven': None,
        'fuel_type': None
    }

    if request.method == 'POST':
        selected['company'] = request.form.get('company')
        selected['car_model'] = request.form.get('car_model')
        selected['year'] = request.form.get('year')
        selected['kms_driven'] = request.form.get('kms_driven')
        selected['fuel_type'] = request.form.get('fuel_type')

        if not all(selected.values()):
            error = "Please fill in every field before predicting."
        else:
            try:
                input_df = pd.DataFrame([[
                    selected['car_model'],
                    selected['company'],
                    int(selected['year']),
                    int(selected['kms_driven']),
                    selected['fuel_type']
                ]], columns=['name', 'company', 'year', 'kms_driven', 'fuel_type'])

                prediction = model.predict(input_df)[0]
                predicted_price = int(round(prediction))
            except ValueError:
                error = "Year and kilometers driven must be valid numbers."
            except Exception as e:
                error = f"Couldn't generate a prediction for that combination: {e}"

    return render_template(
        'predict.html',
        companies=companies,
        car_model=car_model,
        year=year,
        kms_driven=kms_driven,
        fuel_type=fuel_type,
        prediction=predicted_price,
        error=error,
        selected=selected
    )


if __name__ == "__main__":
    app.run(debug=True)
