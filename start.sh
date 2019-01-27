sudo npm install -g yarn
cd client
yarn install
cd ..
rake db:create
rake db:migrate
foreman start -f Procfile.dev
