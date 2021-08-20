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
mkdir dist/client/dist
mkdir dist/admin/dist

cd ..
cp -r frontend/client/dist/* backend/dist/client/dist/
cp -r frontend/admin/dist/* backend/dist/admin/dist/
