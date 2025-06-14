from flask import Flask, render_template, jsonify
from datetime import datetime
import pytz

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_time')
def get_time():
    ist = pytz.timezone('Asia/Kolkata')  # Use IST time zone
    current_time = datetime.now(ist).strftime('%H:%M:%S')
    return jsonify({'time': current_time})

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)