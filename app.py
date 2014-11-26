__author__ = 'Owner'
from flask import *
import os
import json
from sympy import *
init_printing()


app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/about.html")
def about():
    return render_template("about.html")

@app.route("/getTime/")
def getTime():
    figured = logic.getTime()
    app.logger.debug(figured)
    time = json.dumps(figured)
    app.logger.debug(time)
    return time

@app.route("/getReducedMatrix/")
def getMatrix():
    entries = [[3,4], [1,2]]
    matrix = Matrix(entries)
    app.logger.debug(latex(matrix, mode = "equation", itex = True))
    return latex(matrix, mode = "equation", itex = True)

if __name__ == ("__main__"):
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get("PORT", 5000)))