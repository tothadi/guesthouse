npm i -g @angular/cli
mkdir dist
mkdir dist/client
mkdir dist/admin

cd frontend/client
npm i
ls node_modules/@angular/cli/bin
ng build --prod
cd ..

cd admin
npm i
ng build --prod
cd ..
cd ..

cp -r frontend/client/dist/* dist/client
cp -r frontend/admin/dist/* dist/admin
