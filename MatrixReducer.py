__author__ = 'Deon Hua'
__date__ = '2 November 2014'
'''
This GUI-based program will row-reduce a matrix to RREF form.
It will ask the user to enter the size of the matrix (rows and columns), with their preferred output format.
'''
import tkinter


class Reducer:
    '''
    Takes user input of a matrix and row-reduces it to RREF.

    GUI-Based interface that asks the user for the # of rows and columns, as well as output formatting.
    The program can output as a fraction or a decimal with a specified number of decimals.
    '''


    def __init__(self):
        '''
        Initializes the GUI interface that asks the user for input.

        No parameters or returns.
        '''

        self.main_window = tkinter.Tk().wm_title("Matrix Format Setup")

        #Initalize frames.
        self.info_frame = tkinter.Frame()
        self.size_frame = tkinter.Frame()
        self.format_frame = tkinter.Frame()
        self.digit_frame = tkinter.Frame()
        self.button_frame = tkinter.Frame()

        #Object for the information frame.
        self.info_label = tkinter.Label(self.info_frame, text="Enter the number of rows and columns, your preferred output format,"
                                               " and the number of trailing decimals if applicable.", justify="left",
                                        wraplength=275).pack()

        #Objects for the size frame - the matrix's rows/columns are set here.
        self.row_label = tkinter.Label(self.size_frame, text="Rows:").pack(side="left")
        self.row = tkinter.Entry(self.size_frame, width=3).pack(side="left")
        self.col_label = tkinter.Label(self.size_frame, text="Columns:").pack(side="left")
        self.col = tkinter.Entry(self.size_frame, width=3).pack(side="left")

        #Objects for the digit frame
        self.digit_label = tkinter.Label(self.digit_frame, text="Digits:")
        self.digit = tkinter.Entry(self.digit_frame, width=3)
        #Objects for the format frame - the output formatting is specified here.
        self.output_var = tkinter.IntVar()
        self.output_var.set(0)

        self.fraction = tkinter.Radiobutton(self.format_frame, text="Fraction", variable=self.output_var, value=0,
                                            command=self.hide_digits).pack(side="left")

        self.decimal = tkinter.Radiobutton(self.format_frame, text="Decimal", variable=self.output_var, value=1,
                                           command=self.show_digits).pack(side="left")

        #Object for the bottom frame

        self.button = tkinter.Button(self.button_frame, text="Next", command=self.reduce).pack()

        #Pack frames.
        self.info_frame.pack(anchor="nw")
        self.size_frame.pack(anchor="nw")
        self.format_frame.pack(anchor="nw")
        self.digit_frame.pack(anchor="nw")
        self.button_frame.pack(anchor="nw")

        tkinter.mainloop()

    def show_digits(self):


        self.digit_label = tkinter.Label(self.digit_frame, text="Digits:")
        self.digit = tkinter.Entry(self.digit_frame, width=3)
        self.digit_label.pack(side="left")
        self.digit.pack(side="left")

    def hide_digits(self):

        self.digit_label.destroy()
        self.digit.destroy()

    def reduce(self):
        pass



reducer = Reducer()