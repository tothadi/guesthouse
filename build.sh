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

cd ..
cp -r frontend/client/dist/* backend/frontend/client/
cp -r frontend/admin/dist/* backend/frontend/admin/
