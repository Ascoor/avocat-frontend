@echo off
echo === PC Performance Optimization ===
echo.

REM Clear Windows Temp Folder
cd %temp%
del /q /f /s *.* > nul

REM Clear User Temp Folder
cd C:\Users\%username%\AppData\Local\Temp
del /q /f /s *.* > nul

REM Clear Windows Update Cache
net stop wuauserv
net stop cryptSvc
net stop bits
net stop msiserver
ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
ren C:\Windows\System32\catroot2 catroot2.old
net start wuauserv
net start cryptSvc
net start bits
net start msiserver

REM Clear Windows Store Cache
wsreset.exe

REM Clear DNS Cache
ipconfig /flushdns

REM Clear Thumbnail Cache
del /f /s /q %LocalAppData%\Microsoft\Windows\Explorer\thumbcache_*.db > nul

REM Clear Internet Explorer Cache
RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 255

REM Reset virtual memory
wmic computersystem where name="%computername%" set AutomaticManagedPagefile=True

REM Display a message
echo Cache and temporary files have been cleared.
echo.

:: Optimize SSD (if applicable)
echo Running SSD optimization (TRIM)...
defrag.exe C: /O > nul
echo.

:: Defragment hard drives (if applicable)
echo Running disk defragmentation...
defrag.exe C: /O > nul
echo.

:: Disable Windows Search service
echo Disabling Windows Search service...
sc config wsearch start=disabled
echo.

:: Disable Superfetch service
echo Disabling Superfetch service...
sc config sysmain start=disabled
echo.

:: Optimize startup programs
echo Optimizing startup programs...
wmic startup get caption,command /format:list
echo.

echo === Optimization complete ===
echo.
pause
