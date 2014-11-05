'''
By: Deon Hua
Date: 28 February 2013
Description: This program is GUI-based, and allows the user to make their own 
story depending on their inputs. It uses entry fields, radio buttons, and check
buttons.
'''
import tkinter

class StoryMaker:
    '''The StoryMaker class is a GUI that forms a story, depending on the user's
    selections and entries.'''
    def __init__(self):
        ''' This method creates the GUI that the program is based around. It has
        one parameter, self, and does not return any values.'''
        self.main_window = tkinter.Tk()
    
        #Create frames
        self.frame1 = tkinter.Frame()
        self.frame2 = tkinter.Frame()
        self.frame3 = tkinter.Frame()
        self.frame4 = tkinter.Frame()
        self.frame5 = tkinter.Frame()
        self.frame6 = tkinter.Frame()
        self.frame7 = tkinter.Frame()
        self.frame8 = tkinter.Frame()
        
        #Create widget for frame 1
        self.label1 = tkinter.Label(self.frame1, text="Please enter information for a new story, "
                                                      "then press the 'Make Story!' button.")
        
        #Pack frame 1 widgets
        self.label1.pack()
        
        #Create widgets for frame 2
        self.label2 = tkinter.Label(self.frame2, text = "Name: ")
        self.entry1 = tkinter.Entry(self.frame2, width = 50)
        
        #Pack frame 2 widgets
        self.label2.pack(side = "left")
        self.entry1.pack(side = "left")
        
        #Create widgets for frame 3
        self.label3 = tkinter.Label(self.frame3, text = "City:     ")
        self.entry2 = tkinter.Entry(self.frame3, width = 50)
        
        #Pack frame 3 widgets
        self.label3.pack(side = "left")
        self.entry2.pack(side = "left")
        
        #Create widgets for frame 4
        self.label4 = tkinter.Label(self.frame4, text = "-ING Verb")
        self.entry3 = tkinter.Entry(self.frame4, width = 50)
        
        #Pack frame 4 widgets
        self.label4.pack(side = "left")
        self.entry3.pack(side = "left")
        
        #Create widgets for frame 5
        self.check_var1 = tkinter.IntVar()
        self.check_var2 = tkinter.IntVar()
        self.check_var3 = tkinter.IntVar()
        
        self.label4 = tkinter.Label(self.frame5, text = "Items:")
        self.cb1 = tkinter.Checkbutton(self.frame5, text = "Towel", \
                                           variable = self.check_var1)
        self.cb2 = tkinter.Checkbutton(self.frame5, text = "Drinks", \
                                           variable = self.check_var2)
        self.cb3 = tkinter.Checkbutton(self.frame5, text = "Coat", \
                                           variable = self.check_var3)
        
        #Pack frame 5 widgets
        self.label4.pack(side = "left")
        self.cb1.pack(side = "left")
        self.cb2.pack(side = "left")
        self.cb3.pack(side = "left")
        
        #Create frame 6 widgets
        self.radio_var = tkinter.IntVar()
        self.radio_var.set(1)
        
        self.label5 = tkinter.Label(self.frame6, text = "Weather:")
        self.rb1 = tkinter.Radiobutton(self.frame6, text = "Sunny", \
                                           variable = self.radio_var, 
                                           value = 1)
        self.rb2 = tkinter.Radiobutton(self.frame6, text = "Rainy", \
                                           variable = self.radio_var,
                                           value = 2)
        self.rb3 = tkinter.Radiobutton(self.frame6, text = "Snowy", \
                                           variable = self.radio_var,
                                           value = 3)
        
        #Pack frame 6 widgets
        self.label5.pack(side = "left")
        self.rb1.pack(side = "left")
        self.rb2.pack(side = "left")
        self.rb3.pack(side = "left")                                           
        
        #Create widgets for frame 7
        self.story_button = tkinter.Button(self.frame7, text = "Make Story!",\
                                           command = self.make_story)
        
        #Pack frame 7 widgets
        self.story_button.pack()
        
        #Create frame 8 widget
        self.text = tkinter.Text(self.frame8, wrap = "word")
        
        #Pack frame 8 widget
        self.text.pack()
        
        #Pack frames
        self.frame1.pack(anchor = "nw")
        self.frame2.pack(anchor = "nw")
        self.frame3.pack(anchor = "nw")
        self.frame4.pack(anchor = "nw")
        self.frame5.pack(anchor = "nw")
        self.frame6.pack(anchor = "nw")
        self.frame7.pack(anchor = "nw")
        self.frame8.pack(anchor = "nw")
                
        #Run main loop
        tkinter.mainloop()        
            
    def make_story(self):
        '''This method forms the story, given the choices of the user. The story
        varies depending on what the user enters/chooses. It has one parameter, 
        self, and does not return any values.'''
        self.string = ""
        self.name = self.entry1.get().title()
        self.city = self.entry2.get().title()
        self.verb = self.entry3.get().lower()
        self.check = [bool(self.check_var1.get()), bool(self.check_var2.get()), bool(self.check_var3.get())]
        self.count = 0
        for item in self.check:
            if item:
                self.count += 1 
        self.string += self.name + " woke up on a "
        
        #Text of story changes given different weather conditions.
        if self.radio_var.get() == 1:
            self.string += "sunny day and wanted to go to the beach. "
        else:
            self.string += "somewhat cloudy day and wanted to go to the beach. "
            
        self.string += self.name + " decided to turn on the TV and switched to the weather channel." \
               + " The TV anchor, Barbara Wattingson, said, 'We'll be expecting "
        
        if self.radio_var.get() == 1:
            self.string += "clear skies"
        else:
            self.string += "some precipitation later on"
            
        self.string += " in the city of " + self.city + "'. "
        #Adds list of items packed.
        self.string += self.name + " decided to pack swimwear"
        if self.count > 1:
            self.string += ", "
        elif self.count == 1:
            self.string += " and "            
        if self.check[0]:
            self.string += "a towel"
        if self.count == 3 :
            self.string += ", "
        elif (self.count == 2) and self.check[0] and (not self.check[2]):
            self.string += ", and "
        if self.check[1]:
            self.string += "some drinks"
        if (self.count > 1) and self.check[2]:
            self.string += ", and "
        if self.check[2]:
            self.string += "a coat"

        self.string += ". After packing the bags, " + self.name + " went " + self.verb + \
               " towards " + self.city + " Beach. After a relatively nice swim, " \
               + "it was about noon. 'Time for lunch!' " + self.name + " said. "
        #Additional text if towel is brought along
        if self.check[0]:
            self.string += "Luckily, " + self.name + " brought a towel along, and dried" \
                   + " themselves off. "
            
        #Text varies depending if drinks were brought
        self.string += self.name + " was quite thirsty after swimming "
        if self.check[1]:
            self.string += "and had brought some drinks along. "
        else:
            self.string += "and had to go buy a drink from the store. "
            
        #Concludes story, based on weather conditions and if you chose to bring a coat.    
        if self.radio_var.get() == 1:
            self.string += "The rest of the day went without incident and " + self.name \
                   + " went " + self.verb + " home. What an fun day at the beach!"
        elif self.radio_var.get() == 2:
            self.string += "A few hours later, it started raining, and " + self.name + \
                   " was getting soaked "
            if self.check[2]:
                self.string += " but " + self.name + " had brought a coat and went " + \
                       self.verb + " home. What an interesting day at the beach!"
            else:
                self.string += " but " + self.name + " had not brought a coat and" \
                       + " went " + self.verb + " miserably, to complain to the weather channel."
        elif self.radio_var.get() == 3:
            self.string += "A few hours later, it started snowing, and " + self.name + \
                   " was really cold "
            if self.check[2]:
                self.string += " but " + self.name + " had brought a coat and went " + \
                       self.verb + " home. What an interesting day at the beach!"
            else:
                self.string += " but " + self.name + " had not brought a coat and" \
                       + " went " + self.verb + " home freezingly, to complain to the weather channel."
        
        self.text.delete(0.0, tkinter.END)
        self.text.insert(tkinter.INSERT, self.string)                   
        
my_story = StoryMaker()    