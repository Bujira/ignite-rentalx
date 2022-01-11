FROM node

WORKDIR /users/yurifcorrea/app

COPY package.json /users/yurifcorrea/app/

RUN npm install

COPY . /users/yurifcorrea/app/

EXPOSE 3000

CMD ["npm", "run", "dev"]