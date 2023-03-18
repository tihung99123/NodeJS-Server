import subprocess
from client import Ui_MainWindow


class runsteam(object):
    def RunGame(self, path, account, password):
        subprocess.run(''+path+' -login ' + account + ' ' + password,shell=True)
        Ui_MainWindow.logout(self)
    
    def CloseGame():
        CREATE_NO_WINDOW = 0x08000000
        subprocess.call('taskkill /F /IM steamhelper.exe', creationflags=CREATE_NO_WINDOW)
        subprocess.call('taskkill /F /IM steam.exe', creationflags=CREATE_NO_WINDOW)


        