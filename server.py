import sqlite3
from flask import Flask, escape, request, render_template
import json

app = Flask(__name__, static_url_path='')

@app.route('/')
def hello():
    return render_template('index.html')
   

@app.route('/all-messages', methods=["GET", "POST"])
def allmessages():
    conn = sqlite3.connect("chat-app.db")
    c = conn.cursor()
    selected = c.execute("SELECT * from messages").fetchall()
    conn.close() 
    return json.dumps(selected)
    
@app.route('/message', methods=["POST"])
def message():
    conn = sqlite3.connect("chat-app.db")
    c = conn.cursor()
    print(request.form)
    username = request.form["username"]
    message = request.form["message"]
    c.execute("INSERT INTO messages(username, message) values (?,?)", (username, message))
    conn.commit()
    return "yay"



# conn = sqlite3.connect("chat-app.db")
# c = conn.cursor()
# c.execute("INSERT INTO messages(username, message) VALUES('Kevin', 'Guys I''m a godlike coder now google please hire me')")
# c.execute("INSERT INTO messages(username, message) VALUES('Ben', 'Shut the fuck up Kevin you can''t even handle for loops')")
# conn.commit()
# selected = c.execute("SELECT * from messages")
# print(selected.fetchall())
# conn.close()

if __name__ == '__main__':
    app.run()