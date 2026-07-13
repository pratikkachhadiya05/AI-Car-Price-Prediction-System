from flask import Flask, app, render_template, request
import pandas as pd
import pickle

car = pd.read_csv('Datasets/Cleaned_car_price.csv')
model = pickle.load(open('LinearRegressionModel.pkl', 'rb'))


app = Flask(__name__)       
@app.route('/', methods=['GET', 'POST'])
def index():
    companies= sorted(car['company'].unique())
    car_model = sorted(car['name'].unique())
    year = sorted(car['year'].unique(), reverse=True)
    fuel_type = car['fuel_type'].unique()

    predicted_price = None

    selected = {
        'company': None,
        'model': None,
        'year': None,
        'kms': None,
        'fuel': None
    }
    if request.method == 'POST':
        selected['company'] = request.form.get('companies')
        selected['model'] = request.form.get('car_model')
        selected['year'] = request.form.get('year')
        selected['kms'] = request.form.get('kms_driven')
        selected['fuel'] = request.form.get('fuel_type')


        input_df = pd.DataFrame([[
            selected['model'],
            selected['company'],
            selected['year'],
            selected['kms'],
            selected['fuel']
        ]], columns=['name', 'company', 'year', 'kms_driven', 'fuel_type'])

        predicted_price = round(model.predict(input_df)[0], 2)
        
    return  render_template('index.html', companies=companies, car_model=car_model, years=year, fuel_type=fuel_type,prediction=predicted_price, selected=selected)



if __name__ == "__main__":
    app.run(debug=True) 