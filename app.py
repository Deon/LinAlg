__author__ = 'Deon Hua'
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

@app.route("/getReducedMatrix/", methods = ["POST"])
def getMatrix():
    entries = request.get_json()
    matrix = Matrix(entries)
    rrefmatrix = matrix.rref()[0]
    app.logger.debug(rrefmatrix)
    dict = {"original":latex(matrix, mode="equation", itex = True),
                "rref": latex(rrefmatrix, mode="equation", itex = True),
                "transpose": latex(matrix.T, mode="equation", itex = True),
                "rrefTranspose": latex(rrefmatrix.T, mode="equation", itex = True)}
    if matrix.shape[0] == matrix.shape[1]:
        dict["det"] = str(matrix.det())
        dict["rrefDet"] = str(rrefmatrix.det())
        if matrix.det() and rrefmatrix.det():
            dict["inverse"] = latex(matrix**-1, mode="equation", itex = True)
            dict["inverseTranspose"] = latex((matrix**-1).T, mode="equation", itex = True)
            dict["inverseDet"] = str((matrix**-1).det())


    app.logger.debug(dict)
    response = json.dumps(dict, sort_keys=True,indent=4, separators=(',', ': '))
    app.logger.debug(response)
    return response


if __name__ == ("__main__"):
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get("PORT", 5001)))