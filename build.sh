npm i
mkdir dist
mkdir dist/client
mkdir dist/admin

cd frontend/client
npm i
npm run build:app
cd ..

cd admin
npm i
npm run build:app
cd ..
cd ..

cp -r frontend/client/dist/* dist/client
cp -r frontend/admin/dist/* dist/admin
