from flask import Flask, request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

# Konfiguration für MariaDB
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'nvr_system'

mysql = MySQL(app)

# Endpunkt zur Anzeige aller Kameras in der Datenbank
@app.route('/api/cameras', methods=['GET'])
def get_cameras():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM cameras")
    rows = cur.fetchall()
    cur.close()

    cameras = []
    for row in rows:
        cameras.append({'id': row[0], 'name': row[1], 'url': row[2]})
    return jsonify({'cameras': cameras})

# Endpunkt zum Hinzufügen einer neuen Kamera
@app.route('/api/cameras', methods=['POST'])
def add_camera():
    name = request.json['name']
    url = request.json['url']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO cameras (name, url) VALUES (%s, %s)", (name, url))
    mysql.connection.commit()
    cur.close()
    return jsonify({'success': True})

# Endpunkt zur Aktualisierung einer vorhandenen Kamera
@app.route('/api/cameras/<int:camera_id>', methods=['PUT'])
def update_camera(camera_id):
    name = request.json['name']
    url = request.json['url']
    cur = mysql.connection.cursor()
    cur.execute("UPDATE cameras SET name=%s, url=%s WHERE id=%s", (name, url, camera_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({'success': True})

# Endpunkt zum Löschen einer vorhandenen Kamera
@app.route('/api/cameras/<int:camera_id>', methods=['DELETE'])
def delete_camera(camera_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM cameras WHERE id=%s", (camera_id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({'success': True})
