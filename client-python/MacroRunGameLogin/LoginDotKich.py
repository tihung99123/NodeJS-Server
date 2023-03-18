from python_imagesearch.imagesearch import imagesearch_numLoop
import pyautogui
import pygetwindow
import time
from ctypes import *
from tkinter import messagebox
import subprocess
from client import Ui_MainWindow

class LoginRun(object):
    def RunGame(self , pathgame, account, password):
        subprocess.run(pathgame)
        while True:
            time.sleep(1)
            try:
                hwnd = pygetwindow.getWindowsWithTitle("CROSSFIRE")[0]
                if hwnd != 0:
                    time.sleep(15)
                    hwnd.activate()
                    print(hwnd)
                    break
            except:
                print("no")
                continue
        login = imagesearch_numLoop("./a.png", 1, 60)
        if login[0] != -1:
            windll.user32.BlockInput(True)
            print("Vi tri : ", login[0], login[1])
            currentpoision = pyautogui.position()
            pyautogui.click(login[0] ,login[1] - 80,2)
            pyautogui.write(account)
            pyautogui.click(login[0] ,login[1] - 30,2)
            pyautogui.write(password)
            pyautogui.press("enter")
            pyautogui.moveTo(currentpoision[0],currentpoision[1])
            logincomplete = imagesearch_numLoop("./b-c.png", 1, 5)
            if logincomplete[0] != -1:
                windll.user32.BlockInput(False)
                print("Thanh Cong : ", logincomplete[0], logincomplete[1])
            else:
                print("Khong Co anh")
        else:
            print("Khong Co anh")
        loginfailed = imagesearch_numLoop("./b.png", 1, 10)
        if loginfailed[0] != -1:
            print("Vi tri : ", loginfailed[0], loginfailed[1])
            currentpoision = pyautogui.position()
            pyautogui.click(loginfailed[0] - 75,loginfailed[1] - 150,2)
            pyautogui.moveTo(currentpoision[0],currentpoision[1])
            windll.user32.BlockInput(False)
            LoginRun.CloseGame()
            messagebox.showinfo("Thông báo","Đăng nhập thất bại tài khoản hoặc mật khẩu sai hoặc có người sử dụng"+
                                " vui lòng báo cáo cho chủ tiệm để được xử lí")
        else:
            print("Khong Co anh")
        while True:
            time.sleep(1)
            try:
                hwnd = pygetwindow.getWindowsWithTitle("CROSSFIRE")[0]
                if hwnd != 0:
                    continue
            except:
                Ui_MainWindow.logout(self)
                break
            
            
    def CloseGame():
        CREATE_NO_WINDOW = 0x08000000
        subprocess.call('taskkill /F /IM crossfire.dat', creationflags=CREATE_NO_WINDOW)
        subprocess.call('taskkill /F /IM webviewprocess_x64.exe', creationflags=CREATE_NO_WINDOW)
        subprocess.call('taskkill /F /IM xxd-0.xem', creationflags=CREATE_NO_WINDOW)
        subprocess.call('taskkill /F /IM xcoronahost.xem', creationflags=CREATE_NO_WINDOW)