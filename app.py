__author__ = 'Deon Hua'
from flask import *
import os
import json
from sympy import *
init_printing()

app = Flask(__name__)

#Page rendering
@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/about.html")
def about():
    return render_template("about.html")

@app.route("/complex.html")
def complex():
    return render_template("complex.html")

#Matrix calculations
@app.route("/getReducedMatrix/", methods = ["POST"], origin = "*")
def getMatrix():
    entries = request.get_json()
    matrix = Matrix(entries)

    rrefmatrix = matrix.rref()[0]
    app.logger.debug(rrefmatrix)
    dict = {"original":latex(matrix, mode="equation", itex = True),
                "rref": latex(rrefmatrix, mode="equation", itex = True),
                "transpose": latex(matrix.T, mode="equation", itex = True),
                "rrefTranspose": latex(rrefmatrix.T, mode="equation", itex = True),
                "rank":str(matrix.rank()),
                "nullity": str(matrix.shape[1]-matrix.rank()),
                "nullspace": latexNullspace(matrix),
                "colspace": latexColspace(matrix),
                "rowspace": latexRowspace(matrix)}

    #Square Matrix
    if matrix.is_square:
        dict["det"] = str(matrix.det())
        dict["rrefDet"] = str(rrefmatrix.det())
        dict["trace"] = str(calcTrace(matrix))
        dict["rrefTrace"] = str(calcTrace(rrefmatrix))

        #Determinants != 0
        if matrix.det() and rrefmatrix.det():
            dict["inverse"] = latex(matrix**-1, mode="equation", itex = True)
            dict["inverseTranspose"] = latex((matrix**-1).T, mode="equation", itex = True)
            dict["inverseDet"] = str((matrix**-1).det())
            dict["inverseTrace"] = str(calcTrace(matrix**-1))


    app.logger.debug(dict)
    response = json.dumps(dict, sort_keys=True,indent=4, separators=(',', ': '))
    app.logger.debug(response)
    return response


#Supporting methods
def calcTrace(matrix):
    trace = 0
    for i in range (matrix.shape[0]):
        trace += matrix[i, i]
    return trace

def latexNullspace (matrix):
    rawNull = matrix.nullspace()
    nullspace = []
    for vector in range(len(rawNull)):
        nullspace.append(latex(rawNull[vector], mode = "equation", itex= True))
    return nullspace

def latexColspace(matrix):
    colspace = []
    for value in matrix.rref()[1]:
        colspace.append(matrix.col(value))

    for i in range (len(colspace)):
        colspace[i] = latex(colspace[i], mode = "equation", itex = True)

    return colspace

def latexRowspace(matrix):
    rowspace = []
    for col in matrix.rref()[1]:
        for row in range(matrix.shape[0]):
            if matrix.rref()[0][row, col] == 1:
                rowspace.append(matrix.rref()[0].row(row))

    for row in range (len(rowspace)):
        rowspace[row] = latex(rowspace[row], mode = "equation", itex = True)

    return rowspace



if __name__ == ("__main__"):
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get("PORT", 5001)))
