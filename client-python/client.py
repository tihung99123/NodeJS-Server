from PyQt6 import QtCore, QtGui, QtWidgets
import socketio
from tkinter import messagebox
import MacroRunGameLogin.LoginSteam as LoginRun
import os
import threading

typegame = "Steam"

try:
    client = socketio.Client()
    client.connect('http://localhost:3000')
    print('Đã kết nổi đến máy chủ')
except:
    messagebox.showinfo("Thông báo", "Kết nối máy chủ thất bại vui lòng vào lại")
    exit()

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(442, 194)
        font = QtGui.QFont()
        font.setFamily("Segoe UI")
        font.setPointSize(12)
        font.setBold(True)
        font.setWeight(75)
        MainWindow.setFont(font)
        self.centralwidget = QtWidgets.QWidget(parent=MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.comboBoxAccount = QtWidgets.QComboBox(parent=self.centralwidget)
        self.comboBoxAccount.setGeometry(QtCore.QRect(20, 30, 241, 22))
        self.comboBoxAccount.setFrame(True)
        self.comboBoxAccount.setObjectName("comboBoxAccount")
        self.btnrungame = QtWidgets.QPushButton(parent=self.centralwidget)
        self.btnrungame.setGeometry(QtCore.QRect(280, 30, 151, 121))
        font = QtGui.QFont()
        font.setFamily("Segoe UI")
        font.setPointSize(16)
        font.setBold(True)
        font.setWeight(75)
        self.btnrungame.setFont(font)
        self.btnrungame.setObjectName("btnrungame")
        self.label = QtWidgets.QLabel(parent=self.centralwidget)
        self.label.setGeometry(QtCore.QRect(20, 52, 241, 101))
        self.label.setWordWrap(True)
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(parent=self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(20, 4, 131, 20))
        self.label_2.setObjectName("label_2")
        self.btnrefresh = QtWidgets.QPushButton(parent=self.centralwidget)
        self.btnrefresh.setGeometry(QtCore.QRect(150, 4, 110, 24))
        self.btnrefresh.setObjectName("btnrefresh")
        self.btnlogout = QtWidgets.QPushButton(parent=self.centralwidget)
        self.btnlogout.setGeometry(QtCore.QRect(320, 4, 110, 24))
        self.btnlogout.setObjectName("btnlogout")
        self.btndonateaccount = QtWidgets.QPushButton(parent=self.centralwidget)
        self.btndonateaccount.setGeometry(QtCore.QRect(20, 160, 191, 26))
        self.btndonateaccount.setObjectName("btndonateaccount")
        MainWindow.setCentralWidget(self.centralwidget)
        app.aboutToQuit.connect(self.QuitAll)
        
        self.btnrungame.clicked.connect(self.f_btnrungame)
        self.btnrefresh.clicked.connect(self.f_btnrefresh)
        self.btnlogout.clicked.connect(self.f_btnlogout)
        self.btndonateaccount.clicked.connect(self.f_btndonateaccount)
        

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)
        self.client_load(typegame)
        
    def QuitAll(self):
        client.disconnect()
        exit()
        
    def client_load(self, typegame):
        client.emit('GETLISTACCOUNT',typegame)
        # DISCONNECT
        @client.event
        def disconnect():
            print('disconnect to server')
            client.disconnect()
            exit()
        # LISTACC
        @client.event
        def SENDLISTACC(data):
            print(data)
            self.ExportDataToComboBox(data)
        @client.event
        def MESSAGEUsed(data):
            messagebox.showinfo("Thông báo",data)
    
    def ExportDataToComboBox(self, data):
        i = 0
        while True:
            try:
                self.comboBoxAccount.addItem(data[i]['account'])
                i+=1
            except:
                break

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "Mượn tài khoản - NetBeHai"))
        self.btnrungame.setText(_translate("MainWindow", "Vào Game"))
        self.label.setText(_translate("MainWindow", "Nếu bạn có tài khoản muốn từ thiện thì liên hệ cho chủ tiệm để được thêm vào (Đồng thời được cày miễn phí đó nha :D)"))
        self.label_2.setText(_translate("MainWindow", "Chọn tài khoản:"))
        self.btnrefresh.setText(_translate("MainWindow", "Làm Mới"))
        self.btnlogout.setText(_translate("MainWindow", "Đăng Xuất"))
        self.btndonateaccount.setText(_translate("MainWindow", "Quyên góp tài khoản"))
        
    def f_btnrefresh(self):
        self.comboBoxAccount.clear()
        client.emit('GETLISTACCOUNT',typegame)
        
    def f_btnrungame(self):
        if self.comboBoxAccount.currentText() == "":
            messagebox.showinfo('Thông báo!', "Bạn chưa chọn tài khoản để vào")
        else:
            client.emit('LOGINACCOUNT',self.comboBoxAccount.currentText()+'|'+ os.environ['COMPUTERNAME'])
            @client.event
            def RUNGAMEACCOUNT(data):
                # print(data[0]["account"])
                thread = threading.Thread(target=LoginRun.runsteam.RunGame,args=(self,str('"C:\Program Files (x86)\Steam\steam.exe"'),data[0]["account"],data[0]["password"]))
                thread.start()
                self.btnrungame.setDisabled(True)
                self.btnrefresh.setDisabled(True)
                self.comboBoxAccount.setDisabled(True)
    
    def f_btnlogout(self):
        client.emit('LOGOUTACCOUNT',self.comboBoxAccount.currentText())
        LoginRun.runsteam.CloseGame()
        self.f_btnrefresh()
        self.btnrungame.setDisabled(False)
        self.btnrefresh.setDisabled(False)
        self.comboBoxAccount.setDisabled(False)
    
    def f_btndonateaccount(self):
        messagebox.showinfo('Thông báo','Tính năng này sẽ được phát triển tiếp vui lòng chờ')

if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec())
