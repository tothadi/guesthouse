cd frontend/client
npm i
npm run build:app

#cd ..
#cd admin
#'/usr/src/app/frontend/admin'
#npm i
#npm run build:app

cd ..
cd ..
cd backend
npm i
npm run build

cd ..
mkdir run
mkdir run/client
mkdir run/admin
cp -r backend/dist/* run/
cp -r frontend/client/dist/* run/client/
cp -r frontend/admin/src/index.html run/admin/

