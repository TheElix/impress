SET IMPRESS_MODE=test

node --stack-trace-limit=1000 servertests.js

@REM Uncomment this to disable automatic GC and call gs() manually
@REM node --nouse-idle-notification --expose-gc server.js

pause
