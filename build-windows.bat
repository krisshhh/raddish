@echo off
cd client
call npm run build
call npm run movefiles
cd ..
go generate
go build -ldflags "-H windowsgui" -o build/raddish.exe
echo OKAY :)
