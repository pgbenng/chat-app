import sqlite3
conn = sqlite3.connect("chat-app.db")
c = conn.cursor()

c.execute('CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT, username text not null, message text not null)');
conn.commit()
conn.close()

