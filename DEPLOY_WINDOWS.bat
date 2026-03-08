@echo off
chcp 65001 >nul
echo ============================================
echo   SOLARIS CET - Deployment Script
echo ============================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ERROR: Nu s-a gasit package.json
    echo Te rog sa rulezi acest script din folderul 'app'
    pause
    exit /b 1
)

echo [1/5] Se sterge folderul docs vechi...
if exist "docs" (
    rmdir /s /q docs
    echo      ✓ Folderul docs a fost sters
) else (
    echo      ✓ Folderul docs nu exista
)

echo.
echo [2/5] Se copiaza fisierele din dist in docs...
if exist "dist" (
    xcopy /E /I /Y dist docs
    echo      ✓ Fisierele au fost copiate
) else (
    echo ERROR: Folderul dist nu exista! Ruleaza 'npm run build' mai intai.
    pause
    exit /b 1
)

echo.
echo [3/5] Se adauga fisierele in Git...
git add docs/
if %errorlevel% neq 0 (
    echo ERROR: Git add a esuat
    pause
    exit /b 1
)
echo      ✓ Fisierele au fost adaugate in Git

echo.
echo [4/5] Se face commit...
git commit -m "Fix: Update base path for GitHub Pages deployment"
if %errorlevel% neq 0 (
    echo      ! Commit a esuat (posibil nu sunt modificari noi)
)
echo      ✓ Commit realizat

echo.
echo [5/5] Se face push pe GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ERROR: Push a esuat
    pause
    exit /b 1
)
echo      ✓ Push realizat cu succes

echo.
echo ============================================
echo   ✅ DEPLOYMENT COMPLET!
echo ============================================
echo.
echo Site-ul tau va fi disponibil in 2-3 minute la:
echo https://aamclaudiu-hash.github.io/solaris-cet/
echo.
echo Nu uita sa:
echo 1. Asteapti 2-3 minute
echo 2. Stergi cache-ul browserului (Ctrl+Shift+R)
echo 3. Accesezi link-ul de mai sus
echo.
pause
