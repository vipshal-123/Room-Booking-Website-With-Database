import mysql.connector
from flask import Flask, render_template, request, redirect, session, url_for, flash

app = Flask(__name__)
app.secret_key = 'qwertyuiop1234567890'
# MySQL database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'roombooking'
}

# Establish a connection to the MySQL database
db_conn = mysql.connector.connect(**db_config)
cursor = db_conn.cursor()

users = {}

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out')
    return redirect(url_for('login'))

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and users[username] == password:
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password')
            return render_template('login.html')
    else:
        return render_template('login.html')
    
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users:
            return render_template('register.html', error='Username already exists')
        else:
            users[username] = password
            flash('Registration successful')
            return redirect(url_for('login')) 
    else:
        return render_template('register.html')


@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    return render_template('index.html')

@app.route('/payment.html', methods=['GET', 'POST'])
def payment():
    
    selected_city = request.args.get('city')
    selected_hotel = request.args.get('hotel')
    selected_people = request.args.get('people')
    check_in_date = request.args.get('check-in-date')
    check_out_date = request.args.get('check-out-date')
    phone_number = request.args.get('number')
    hotel_price = request.args.get('hotel-price')
    return render_template('payment.html', city=selected_city, hotel=selected_hotel, people=selected_people,
                           check_in_date=check_in_date, check_out_date=check_out_date, number=phone_number,
                           price=hotel_price)

@app.route('/process_payment', methods=['POST'])
def process_payment():
    name = request.form.get('name')
    selected_city = request.form.get('selected-city')
    selected_hotel = request.form.get('selected-hotel')
    selected_people = request.form.get('selected-people')
    check_in_date = request.form.get('check-in-date')
    check_out_date = request.form.get('check-out-date')
    phone_number = request.form.get('number')
    price = request.form.get('hotel-price')
    payment_method = request.form.get('payment_method')

    # Store the form values in the database
    query = "INSERT INTO bookings (selected_city, selected_hotel, selected_people, check_in_date, check_out_date, phone_number, name, price, payment_method) " \
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (selected_city, selected_hotel, selected_people, check_in_date, check_out_date, phone_number, name, price, payment_method)
    cursor.execute(query, values)
    db_conn.commit()

    # Redirect to a success page or display a success message
    return redirect('/success')

@app.route('/success')
def success():
    return render_template('sucessfull.html')



if __name__ == '__main__':
    app.run(debug=True)
