cd frontend/client
npm i
npm run build:app
cd ..

cd admin
npm i
npm run build:app
cd ..

cd ..
cd backend
npm i
npm run build
mkdir dist
mkdir dist/client
mkdir dist/admin

cd ..
cp -r frontend/client/dist/* backend/dist/client/
cp -r frontend/admin/dist/* backend/dist/admin/
