# Finance Tracker Web App

A simple yet powerful finance tracking web application built with Python's Flask framework and connected to a MySQL database.

## Features
- User authentication and account management
- Record and categorize transactions
- View financial summaries and reports
- Secure MySQL database integration
- Responsive and intuitive UI

## Technologies Used
- **Backend:** Flask (Python), Flask-SQLAlchemy
- **Database:** MySQL
- **Frontend:** HTML, CSS, Bootstrap
- **Deployment:** Docker, Gunicorn (optional)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/finance-tracker.git
   cd finance-tracker

2. Create a virtual environment and install dependencies

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

3. Set up MySQL database and update config.py with credentials.

4. Initialize the database:
flask db init
flask db migrate
flask db upgrade

5. Run the application:
flask run

Usage
- Sign up or log in
- Add transactions with categories
- View financial reports and insights


Contributing
Feel free to fork the repository and submit pull requests!
Contact
For any questions, reach out at [bwalker37837@gmail.com].
