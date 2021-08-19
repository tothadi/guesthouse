cd frontend/client
npm i
npm run build:app
cd ..

#cd admin
#npm i
#npm run build:app
#cd ..

cd ..
mkdir dist
npm i
cp -r frontend/admin/src/index.html dist/admin/

